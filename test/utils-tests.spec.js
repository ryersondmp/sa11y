import { test, expect } from '@playwright/test';

/* Unit tests for the text-matching helpers in src/js/utils/utils.js. */
let page;
test.describe('Sa11y utils', () => {
  test.beforeAll(async ({ browser }) => {
    page = await browser.newPage();
    await page.goto('http://localhost:8080/test/pages/no-props.html');
  });

  test.afterAll(async () => {
    await page.close();
  });

  // Runs `fn(utils)` in the page against the live ES modules.
  const withUtils = (fn) => page.evaluate(async (source) => {
    const utils = await import('/src/js/utils/utils.js');
    // eslint-disable-next-line no-new-func
    return new Function('utils', `return (${source})(utils);`)(utils);
  }, fn.toString());

  test('hasAriaHiddenAncestor checks the element itself and its ancestors', async () => {
    const result = await withUtils((u) => {
      const parent = document.createElement('div');
      const child = document.createElement('span');
      parent.append(child);
      const visible = u.hasAriaHiddenAncestor(child);
      parent.setAttribute('aria-hidden', ' TRUE ');
      const hiddenParent = u.hasAriaHiddenAncestor(child);
      child.setAttribute('aria-hidden', 'false');
      const cannotOverrideParent = u.hasAriaHiddenAncestor(child);
      parent.removeAttribute('aria-hidden');
      child.setAttribute('aria-hidden', 'true');
      const hiddenSelf = u.hasAriaHiddenAncestor(child);
      return { visible, hiddenParent, cannotOverrideParent, hiddenSelf };
    });
    expect(result).toEqual({
      visible: false,
      hiddenParent: true,
      cannotOverrideParent: true,
      hiddenSelf: true,
    });
  });

  test.describe('generateRegexString', () => {
    test('a standalone RegExp matches the same way as that RegExp inside an array', async () => {
      const result = await withUtils((u) => {
        const alone = u.generateRegexString(/^Image \d+$/);
        const inArray = u.generateRegexString([/^Image \d+$/]);
        return {
          sameSource: alone.source === inArray.source && alone.flags === inArray.flags,
          caseInsensitiveAlone: alone.test('image 12'),
          caseInsensitiveInArray: inArray.test('IMAGE 12'),
        };
      });
      expect(result.sameSource).toBe(true);
      expect(result.caseInsensitiveAlone).toBe(true);
      expect(result.caseInsensitiveInArray).toBe(true);
    });

    test('drops g, y, m, s flags and keeps u', async () => {
      const result = await withUtils((u) => {
        const warnings = [];
        const original = console.warn;
        console.warn = (...args) => warnings.push(args.join(' '));
        const combined = u.generateRegexString(['Image', /\p{L}+/gu, /^line$/ms]);
        console.warn = original;
        return {
          flags: combined.flags,
          stateless: combined.test('Image') && combined.test('Image'),
          warned: warnings.length,
        };
      });
      expect(result.flags).toBe('iu');
      expect(result.stateless).toBe(true);
      expect(result.warned).toBe(1);
    });

    test('with matchStart, literals are prefix-anchored but RegExp entries keep their own anchors', async () => {
      const result = await withUtils((u) => {
        const combined = u.generateRegexString(['Image', /placeholder/, /^alt \d+$/], true);
        return {
          literalAtStart: combined.test('Image of a dog'),
          literalElsewhere: combined.test('An Image of a dog'),
          unanchoredAnywhere: combined.test('My placeholder text'),
          anchoredWhole: combined.test('alt 7'),
          anchoredPartial: combined.test('alt 7 extra'),
        };
      });
      expect(result.literalAtStart).toBe(true);
      expect(result.literalElsewhere).toBe(false);
      expect(result.unanchoredAnywhere).toBe(true);
      expect(result.anchoredWhole).toBe(true);
      expect(result.anchoredPartial).toBe(false);
    });

    test('escapes literals and ignores empty entries', async () => {
      const result = await withUtils((u) => ({
        csv: u.generateRegexString('(External), [draft]').test('see [draft] copy'),
        noWildcard: u.generateRegexString(['a.b']).test('axb'),
        empty: u.generateRegexString(['', /(?:)/]),
        emptyString: u.generateRegexString(''),
      }));
      expect(result.csv).toBe(true);
      expect(result.noWildcard).toBe(false);
      expect(result.empty).toBeNull();
      expect(result.emptyString).toBeNull();
    });
  });

  test.describe('stripBidiControls', () => {
    test('removes direction marks at the start, middle and around a variable part', async () => {
      const result = await withUtils((u) => {
        const rlm = '‏';
        const lri = '⁦';
        const pdi = '⁩';
        const template = `${rlm}לתמונה אין טקסט חלופי; שם הקובץ הוא ${lri}photo.jpg${pdi}${rlm}`;
        return {
          cleaned: u.stripBidiControls(template),
          leading: u.stripBidiControls('‎abc'),
          middle: u.stripBidiControls('ab‫cd‬'),
        };
      });
      expect(result.cleaned).toBe('לתמונה אין טקסט חלופי; שם הקובץ הוא photo.jpg');
      expect(result.leading).toBe('abc');
      expect(result.middle).toBe('abcd');
    });

    test('keeps ZWJ and ZWNJ, and passes non-strings through', async () => {
      const result = await withUtils((u) => ({
        zwnj: u.stripBidiControls('می‌خواهم'),
        zwj: u.stripBidiControls('a‍b'),
        regex: u.stripBidiControls(/x/) instanceof RegExp,
      }));
      expect(result.zwnj).toBe('می‌خواهم');
      expect(result.zwj).toBe('a‍b');
      expect(result.regex).toBe(true);
    });
  });

  test.describe('foldForMatching and normalizeStopWord', () => {
    test('folds Turkish and Greek capitals to their stop-word entries', async () => {
      const result = await withUtils((u) => ({
        tr: u.foldForMatching('DAHA FAZLA BİLGİ İÇİN TIKLAYIN') === u.foldForMatching('daha fazla bilgi için tıklayın'),
        el: u.foldForMatching('ΚΆΝΤΕ ΚΛΙΚ ΕΔΏ') === u.foldForMatching('κάντε κλικ εδώ'),
        keepsDiacritics: u.foldForMatching('Résumé'),
        tamil: u.normalizeStopWord('படம்'),
      }));
      expect(result.tr).toBe(true);
      expect(result.el).toBe(true);
      expect(result.keepsDiacritics).toBe('résumé');
      expect(result.tamil).toBe('படம்');
    });

    test('normalizeStopWord strips punctuation on both sides of a comparison', async () => {
      const result = await withUtils((u) => ({
        entry: u.normalizeStopWord('cliquer ici pour plus d’informations'),
        text: u.normalizeStopWord('  Cliquer ici  pour plus\nd’informations! '),
      }));
      expect(result.entry).toBe('cliquer ici pour plus dinformations');
      expect(result.text).toBe(result.entry);
    });
  });
});
