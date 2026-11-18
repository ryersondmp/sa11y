import { test, expect } from '@playwright/test';

/* Unit tests for the text-matching helpers in src/js/utils/utils.js. */
let page;
test.describe('Sa11y utils', () => {
  test.beforeAll(async ({ browser }) => {
    page = await browser.newPage();
    await page.goto('/test/pages/no-props.html');
  });

  test.afterAll(async () => {
    await page.close();
  });

  // Runs `fn(utils, arg)` in the page against the live ES modules. `arg` must be serializable.
  const withUtils = (fn, arg) =>
    page.evaluate(
      async ({ source, arg }) => {
        const utils = await import('/src/js/utils/utils.js');
        // eslint-disable-next-line no-new-func
        return new Function('utils', 'arg', `return (${source})(utils, arg);`)(utils, arg);
      },
      { source: fn.toString(), arg },
    );

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

  test('isInert checks ancestors and continues from a shadow root to its host', async () => {
    const result = await withUtils((u) => {
      // Separate elements per case: getCachedClosest caches its result per element for the
      // duration of a check, so toggling inert on the same element would read the cache.
      const plain = document.createElement('div');
      const plainChild = document.createElement('button');
      plain.append(plainChild);
      const container = document.createElement('div');
      container.setAttribute('inert', '');
      const child = document.createElement('button');
      container.append(child);
      document.body.append(plain, container);
      const notInert = u.isInert(plainChild);
      const inertAncestor = u.isInert(child);
      const inertSelf = u.isInert(container);

      const host = document.createElement('div');
      const shadowButton = document.createElement('button');
      host.attachShadow({ mode: 'open' }).append(shadowButton);
      document.body.append(host);
      const shadowNotInert = u.isInert(shadowButton);
      const inertHost = document.createElement('div');
      const inertShadowButton = document.createElement('button');
      inertHost.attachShadow({ mode: 'open' }).append(inertShadowButton);
      inertHost.setAttribute('inert', '');
      document.body.append(inertHost);
      const shadowInert = u.isInert(inertShadowButton);

      plain.remove();
      container.remove();
      host.remove();
      inertHost.remove();
      return {
        notInert,
        inertAncestor,
        inertSelf,
        shadowNotInert,
        shadowInert,
        nullSafe: u.isInert(null),
      };
    });
    expect(result).toEqual({
      notInert: false,
      inertAncestor: true,
      inertSelf: true,
      shadowNotInert: false,
      shadowInert: true,
      nullSafe: false,
    });
  });

  test.describe('getReferencedDuplicateIds', () => {
    // Builds `html` in a fresh container and returns the flagged ids (2nd+ occurrences).
    const flagged = (html, exclude) =>
      withUtils(
        (u, { html, exclude }) => {
          const container = document.createElement('div');
          container.innerHTML = html;
          document.body.append(container);
          try {
            return u.getReferencedDuplicateIds(container, exclude).map((el) => el.id);
          } finally {
            container.remove();
          }
        },
        { html, exclude },
      );

    test('references must match the id exactly, not as a substring', async () => {
      const result = await flagged(`
        <button id="play">Play</button><button id="play">Play</button>
        <button aria-controls="autoplay-video">Pause</button>
        <span id="name"></span><span id="name"></span>
        <label for="username">User</label>
        <p id="team"></p><p id="team"></p>
        <a href="/about/team">Team</a>`);
      expect(result).toEqual([]);
    });

    test('label[for], every ARIA id reference, and same-page links count as references', async () => {
      const result = await flagged(`
        <label for="a">A</label><input id="a"><input id="a">
        <button aria-labelledby="x b">B</button><span id="b"></span><span id="b"></span>
        <button aria-describedby="c">C</button><span id="c"></span><span id="c"></span>
        <div role="listbox" aria-activedescendant="d"></div><span id="d"></span><span id="d"></span>
        <a href="#e">E</a><span id="e"></span><span id="e"></span><span id="e"></span>
        <span id="unreferenced"></span><span id="unreferenced"></span>`);
      expect(result).toEqual(['a', 'b', 'c', 'd', 'e', 'e']);
    });

    test('links: same-page absolute URLs and encoded fragments count; other pages do not', async () => {
      const result = await withUtils((u) => {
        const container = document.createElement('div');
        const here = document.URL.split('#')[0];
        container.innerHTML = `
          <a href="${here}#same">Same page</a><i id="same"></i><i id="same"></i>
          <a href="#caf%C3%A9">Encoded</a><i id="café"></i><i id="café"></i>
          <a href="/another-page.html#other">Other page</a><i id="other"></i><i id="other"></i>
          <a href="#">Top</a>`;
        document.body.append(container);
        try {
          return u.getReferencedDuplicateIds(container).map((el) => el.id);
        } finally {
          container.remove();
        }
      });
      expect(result).toEqual(['same', 'café']);
    });

    test('ids with quotes or backslashes do not throw', async () => {
      const result = await withUtils((u) => {
        const container = document.createElement('div');
        for (const id of ['say-"hi"', 'back\\slash']) {
          const button = document.createElement('button');
          button.setAttribute('aria-describedby', id);
          container.append(button);
          for (let i = 0; i < 2; i++) {
            const span = document.createElement('span');
            span.id = id;
            container.append(span);
          }
        }
        document.body.append(container);
        try {
          return u.getReferencedDuplicateIds(container).map((el) => el.id);
        } finally {
          container.remove();
        }
      });
      expect(result).toEqual(['say-"hi"', 'back\\slash']);
    });

    test('ignores ids in excluded containers; shadow roots are separate scopes', async () => {
      const excluded = await flagged(
        `<label for="z">Z</label><input id="z"><div class="skip"><input id="z"></div>`,
        '.skip, .skip *',
      );
      const shadow = await withUtils((u) => {
        const host = document.createElement('div');
        host.innerHTML = '<span id="s"></span>';
        host.attachShadow({ mode: 'open' }).innerHTML =
          '<slot></slot><label for="s">S</label><input id="s">';
        document.body.append(host);
        try {
          // Light DOM and shadow root each have one "s": not duplicates of each other.
          return [
            ...u.getReferencedDuplicateIds(host),
            ...u.getReferencedDuplicateIds(host.shadowRoot),
          ].length;
        } finally {
          host.remove();
        }
      });
      expect({ excluded, shadow }).toEqual({ excluded: [], shadow: 0 });
    });
  });

  test.describe('getUndescriptiveTitleType', () => {
    // Runs against the real word lists of a language file.
    const classify = (code, titles) =>
      page.evaluate(
        async ({ code, titles }) => {
          const utils = await import('/src/js/utils/utils.js');
          const { strings } = (await import(`/src/lang/${code}.js`)).default;
          return Object.fromEntries(
            titles.map((title) => [
              title,
              utils.getUndescriptiveTitleType(
                title,
                strings.META_TITLE_UNDESCRIPTIVE_STRINGS,
                strings.META_TITLE_UNDESCRIPTIVE_PREFIXES,
              ),
            ]),
          );
        },
        { code, titles },
      );

    test('a list entry alone or with a number is an error', async () => {
      const titles = [
        'Untitled',
        'PAGE',
        'Page 2',
        'Untitled-1',
        'Document (3)',
        'My  Site',
        'New',
      ];
      const result = await classify('en', titles);
      for (const title of titles) expect.soft(result[title], title).toBe('error');
    });

    test('only the prefix list is matched at the start of a longer title', async () => {
      const result = await classify('en', [
        'Untitled document | Acme',
        'Placeholder page',
        'Insert title here - WordPress',
        'Untitledness',
      ]);
      expect(result).toEqual({
        'Untitled document | Acme': 'warning',
        'Placeholder page': 'warning',
        'Insert title here - WordPress': 'warning',
        // A prefix must end at a word boundary.
        Untitledness: null,
      });
    });

    test('generic words at the start of descriptive titles are not flagged', async () => {
      const titles = [
        'New York Times',
        'New Student Orientation 2026',
        'New-Hire Guide v2',
        'Title IX Office',
        'Index of Publications',
        'Document Library',
        'Default Settings | Acme',
        'Pages of History',
        'Newsletter 5',
      ];
      const result = await classify('en', titles);
      for (const title of titles) expect.soft(result[title], title).toBeNull();
    });

    test('scripts without spaces match prefixes without a word boundary', async () => {
      const result = await classify('ja', ['無題のドキュメント', 'ページ2', 'ページの歴史']);
      expect(result).toEqual({
        無題のドキュメント: 'warning',
        ページ2: 'error',
        ページの歴史: null,
      });
    });

    test('folds case and accents like the other word lists', async () => {
      const result = await classify('el', ['ΧΩΡΙΣ ΤΙΤΛΟ', 'Χωρίς τίτλο - Εταιρεία']);
      expect(result).toEqual({
        'ΧΩΡΙΣ ΤΙΤΛΟ': 'error',
        'Χωρίς τίτλο - Εταιρεία': 'warning',
      });
    });

    test('missing lists and empty titles are not flagged', async () => {
      const result = await withUtils((u) => ({
        noLists: u.getUndescriptiveTitleType('Untitled'),
        notArrays: u.getUndescriptiveTitleType('Untitled', 'META_TITLE_UNDESCRIPTIVE_STRINGS'),
        empty: u.getUndescriptiveTitleType('  ', ['untitled'], ['untitled']),
      }));
      expect(result).toEqual({ noLists: null, notArrays: null, empty: null });
    });
  });

  test('Lang.list returns an empty array for a missing or malformed word list', async () => {
    const result = await page.evaluate(async () => {
      const { default: Lang } = await import('/src/js/utils/lang.js');
      const saved = Lang.langStrings;
      try {
        Lang.langStrings = { LIST: ['a', 1, 'b'], STRING: 'not a list' };
        return {
          list: Lang.list('LIST'),
          string: Lang.list('STRING'),
          missing: Lang.list('MISSING'),
        };
      } finally {
        Lang.langStrings = saved;
      }
    });
    expect(result).toEqual({ list: ['a', 'b'], string: [], missing: [] });
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
        tr:
          u.foldForMatching('DAHA FAZLA BİLGİ İÇİN TIKLAYIN') ===
          u.foldForMatching('daha fazla bilgi için tıklayın'),
        el: u.foldForMatching('ΚΆΝΤΕ ΚΛΙΚ ΕΔΏ') === u.foldForMatching('κάντε κλικ εδώ'),
        keepsDiacritics: u.foldForMatching('Résumé'),
        tamil: u.normalizeStopWord('படம்'),
      }));
      expect(result.tr).toBe(true);
      expect(result.el).toBe(true);
      expect(result.keepsDiacritics).toBe('résumé');
      expect(result.tamil).toBe('படம்');
    });

    test('folds optional Arabic harakat and tatweel, but keeps hamza and madda letters', async () => {
      const result = await withUtils((u) => ({
        shadda: u.normalizeStopWord('تعرّف على المزيد') === u.normalizeStopWord('تعرف على المزيد'),
        tanwin: u.foldForMatching('يحدد لاحقًا') === u.foldForMatching('يحدد لاحقا'),
        fullyVowelled: u.foldForMatching('اِقْرَأْ المَزِيدَ'),
        tatweel: u.foldForMatching('المـــزيد'),
        superscriptAlef: u.foldForMatching('هٰذا'),
        hamzaLetters: u.foldForMatching('أكمل إلى آخر مؤقت قائمة'),
      }));
      expect(result.shadda).toBe(true);
      expect(result.tanwin).toBe(true);
      expect(result.fullyVowelled).toBe('اقرأ المزيد');
      expect(result.tatweel).toBe('المزيد');
      expect(result.superscriptAlef).toBe('هذا');
      // أ إ آ ؤ ئ decompose under NFD into a base letter + U+0653–U+0655; those must survive.
      expect(result.hamzaLetters).toBe('أكمل إلى آخر مؤقت قائمة');
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

  test.describe('containsWord', () => {
    test('matches whole words in any script, ignoring case', async () => {
      const mismatches = await withUtils((u) => {
        // [text, word, expected]
        const cases = [
          ['Submit button', 'button', true],
          ['Submit Button', 'button', true],
          ['Unbutton the coat', 'button', false],
          ['Κουμπί αναζήτησης', 'κουμπί', true],
          ['Botón de búsqueda', 'botón', true],
          ['زر البحث', 'زر', true], // "search button"
          ['السماء الزرقاء', 'زر', false], // "the blue sky"
          ['زيارة المزرعة', 'زر', false], // "visit the farm"
          ['搜索按钮', '按钮', true],
          ['検索ボタン', 'ボタン', true],
          ['검색 버튼', '버튼', true],
          ['button', '', false],
        ];
        return cases.filter(([text, word, expected]) => u.containsWord(text, word) !== expected);
      });
      expect(mismatches).toEqual([]);
    });

    test('getWordSegmenter caches per locale and survives invalid language tags', async () => {
      const result = await withUtils((u) => {
        const ar = u.getWordSegmenter('ar');
        return {
          cached: ar === u.getWordSegmenter('ar'),
          perLocale: ar !== u.getWordSegmenter('ja'),
          locale: ar.resolvedOptions().locale,
          // Lang._() returns the key itself when strings are not loaded.
          invalid: u.getWordSegmenter('LANG_CODE') instanceof Intl.Segmenter,
          missing: u.getWordSegmenter() instanceof Intl.Segmenter,
        };
      });
      expect(result).toEqual({
        cached: true,
        perLocale: true,
        locale: 'ar',
        invalid: true,
        missing: true,
      });
    });

    // The fallback is reached by passing a null segmenter, so the built-in Intl is never mutated.
    test('regex fallback (no Intl.Segmenter) matches whole words in spaced scripts', async () => {
      const mismatches = await withUtils((u) => {
        // [text, word, expected]
        const cases = [
          ['Submit Button', 'button', true],
          ['button', 'button', true],
          ['(button)', 'button', true],
          ['Unbutton the coat', 'button', false],
          ['buttons', 'button', false],
          ['button2', 'button', false],
          ['زر البحث', 'زر', true],
          ['البحث زر', 'زر', true],
          ['السماء الزرقاء', 'زر', false],
          ['a.b c', 'a.b', true], // Regex metacharacters in the word are escaped.
          ['axb c', 'a.b', false],
          ['button', '', false],
        ];
        return cases.filter(
          ([text, word, expected]) => u.containsWord(text, word, null) !== expected,
        );
      });
      expect(mismatches).toEqual([]);
    });
  });

  test.describe('prepareDismissal', () => {
    test('keeps letters and digits in every script, so non-Latin keys do not collide', async () => {
      const result = await withUtils((u) => ({
        arabicA: u.prepareDismissal('LANG_MISMATCH' + 'مرحبا بالعالم'),
        arabicB: u.prepareDismissal('LANG_MISMATCH' + 'شكرا لك'),
        accented: u.prepareDismissal('Événements à venir'),
        punctuation: u.prepareDismissal('click here, deadlines & fees!'),
        truncated: u.prepareDismissal('a'.repeat(300)).length,
      }));
      expect(result.arabicA).not.toBe(result.arabicB);
      expect(result.arabicA).toBe('LANGMISMATCHمرحبابالعالم');
      expect(result.accented).toBe('Événementsàvenir');
      expect(result.punctuation).toBe('clickheredeadlinesfees');
      expect(result.truncated).toBe(256);
    });
  });

  test.describe('whitespace and control characters', () => {
    test('getText turns line breaks into spaces instead of joining words', async () => {
      const text = await withUtils((u) => {
        const link = document.createElement('a');
        link.textContent = 'Click\nhere\r\nnow';
        return u.getText(link);
      });
      expect(text).toBe('Click here now');
    });

    test('normalizeString keeps word breaks and strips control and private-use characters', async () => {
      const result = await withUtils((u) => ({
        newline: u.normalizeString('Bonjour\nle\tmonde'),
        control: u.normalizeString('a\u0007b\u009Fc'),
        icon: u.normalizeString('\uF007 Menu'),
      }));
      expect(result).toEqual({ newline: 'Bonjour le monde', control: 'abc', icon: 'Menu' });
    });

    test('stripAllSpecialCharacters keeps combining marks', async () => {
      const result = await withUtils((u) => ({
        hindiDistinct: u.stripAllSpecialCharacters('कि') !== u.stripAllSpecialCharacters('के'),
        hindi: u.stripAllSpecialCharacters('यहाँ क्लिक करें!'),
        latin: u.stripAllSpecialCharacters('Hello,   world! (new tab)'),
      }));
      expect(result).toEqual({
        hindiDistinct: true,
        hindi: 'यहाँ क्लिक करें',
        latin: 'Hello world new tab',
      });
    });

    test('foldForMatching folds Turkish dotted and dotless i in one pass', async () => {
      const result = await withUtils((u) => [
        u.foldForMatching('İNDİR'),
        u.foldForMatching('tıkla'),
      ]);
      expect(result).toEqual(['indir', 'tikla']);
    });
  });

  test.describe('isVisibleTextInAccName', () => {
    test('ignores emoji sequences, including variation selectors and ZWJ joiners', async () => {
      const result = await withUtils((u) => {
        const make = (text) => {
          const button = document.createElement('button');
          button.textContent = text;
          document.body.append(button);
          const mismatch = u.isVisibleTextInAccName(button, 'Like');
          button.remove();
          return mismatch;
        };
        return {
          heart: make('❤️'),
          family: make('👨‍👩‍👧'),
          thumb: make('👍🏽'),
          text: make('Share'),
        };
      });
      expect(result).toEqual({ heart: false, family: false, thumb: false, text: true });
    });
  });

  test('generateSelectorPath escapes ids and class names so the selector can be queried', async () => {
    const result = await withUtils((u) => {
      const wrapper = document.createElement('div');
      wrapper.id = '1st:section';
      const inner = document.createElement('p');
      inner.className = 'md:flex  w-1/2 [&>a]:underline';
      wrapper.append(document.createElement('span'), inner);
      document.body.append(wrapper);
      try {
        const selector = u.generateSelectorPath(inner);
        return document.querySelector(selector) === inner;
      } catch {
        return false;
      } finally {
        wrapper.remove();
      }
    });
    expect(result).toBe(true);
  });

  test.describe('sanitizeURL', () => {
    test('only lets base64 image data URIs skip sanitizing', async () => {
      const result = await withUtils((u) => ({
        png: u.sanitizeURL('data:image/png;base64,iVBORw0KGgo='),
        html: u.sanitizeURL('data:text/html;base64,PHNjcmlwdD5hbGVydCgxKTwvc2NyaXB0Pg=='),
        svg: u.sanitizeURL('data:image/svg+xml;base64,PHN2Zz48L3N2Zz4='),
      }));
      expect(result).toEqual({
        png: 'data:image/png;base64,iVBORw0KGgo=',
        html: 'about:blank',
        svg: 'about:blank',
      });
    });

    test('reads the scheme up to the first colon, so http URLs with ports are normalized', async () => {
      const result = await withUtils((u) => [
        u.sanitizeURL('https://Example.COM:8080/a:b?c=d:e'),
        u.sanitizeURL('mailto:someone@example.com?subject=a:b'),
        u.sanitizeURL('myapp://open/item'),
        u.sanitizeURL('/relative/path'),
      ]);
      expect(result).toEqual([
        'https://example.com:8080/a:b?c=d:e',
        'mailto:someone@example.com?subject=a:b',
        'myapp://open/item',
        '/relative/path',
      ]);
    });

    test('decodes decimal and hex character references before checking the scheme', async () => {
      const result = await withUtils((u) => ({
        hex: u.sanitizeURL('&#x6A;avascript:alert(1)'),
        // No semicolon: the reference ends at the first non-hex character ("r"), as in browsers.
        hexNoSemicolon: u.sanitizeURL('javas&#x63ript:alert(1)'),
        decimalNoSemicolon: u.sanitizeURL('&#106avascript:alert(1)'),
        named: u.sanitizeURL('javascript&colon;alert(1)'),
        hexInPath: u.sanitizeURL('https://example.com/caf&#xE9;'),
        outOfRange: u.sanitizeURL('https://example.com/&#99999999;'),
      }));
      expect(result).toEqual({
        hex: 'about:blank',
        hexNoSemicolon: 'about:blank',
        decimalNoSemicolon: 'about:blank',
        named: 'about:blank',
        hexInPath: 'https://example.com/caf%C3%A9',
        outOfRange: 'https://example.com/%EF%BF%BD',
      });
    });

    test('data: URI security cases', async () => {
      const mismatches = await withUtils((u) => {
        const png = 'data:image/png;base64,iVBORw0KGgo=';
        // [input, expected]
        const cases = [
          // Allowed: raster MIME types, any casing, surrounding whitespace, wrapped base64.
          [png, png],
          [`  ${png}\n`, png],
          ['DATA:IMAGE/PNG;BASE64,iVBORw0KGgo=', 'DATA:IMAGE/PNG;BASE64,iVBORw0KGgo='],
          ['data:image/jpg;base64,/9j/4AAQ', 'data:image/jpg;base64,/9j/4AAQ'],
          ['data:image/png;base64,iVBO\nRw0K\nGgo=', 'data:image/png;base64,iVBO\nRw0K\nGgo='],
          // Rejected: payload is not base64 (would otherwise be returned verbatim).
          ['data:image/png;base64,AAAA"><script>alert(1)</script>', 'about:blank'],
          ['data:image/png;base64,AAAA%22%3E%3Cscript%3E', 'about:blank'],
          // Rejected: malformed or non-allowlisted data URIs.
          ['data:image/png,iVBORw0KGgo=', 'about:blank'],
          ['data:image/png;charset=utf-8;base64,iVBORw0KGgo=', 'about:blank'],
          ['data: image/png;base64,iVBORw0KGgo=', 'about:blank'],
          ['data:image/pngx;base64,iVBORw0KGgo=', 'about:blank'],
          ['data:image/svg+xml;base64,PHN2Zz48L3N2Zz4=', 'about:blank'],
          ['data:image/svg+xml,<svg onload=alert(1)>', 'about:blank'],
          ['data:image/svg+xml;utf8,%3Csvg%20onload%3Dalert(1)%3E', 'about:blank'],
          ['data:text/html,<script>alert(1)</script>', 'about:blank'],
          ['data:text/html;base64,PHNjcmlwdD5hbGVydCgxKTwvc2NyaXB0Pg==', 'about:blank'],
          // Rejected: obfuscated "data:" schemes.
          ['%64ata:text/html,<script>alert(1)</script>', 'about:blank'],
          ['&#100;ata:text/html,<script>alert(1)</script>', 'about:blank'],
          ['&#x64;ata:text/html,x', 'about:blank'],
          ['da\tta:text/html,x', 'about:blank'],
          ['data&colon;text/html,x', 'about:blank'],
          ['\u0000data:text/html,x', 'about:blank'],
          ['\u200Bdata:text/html,x', 'about:blank'],
        ];
        return cases
          .map(([input, expected]) => [input, u.sanitizeURL(input), expected])
          .filter(([, actual, expected]) => actual !== expected);
      });
      expect(mismatches).toEqual([]);
    });

    test('rejects obfuscated javascript: and vbscript: schemes', async () => {
      const mismatches = await withUtils((u) => {
        const inputs = [
          'JaVaScRiPt:alert(1)',
          ' javascript:alert(1)',
          'java\nscript:alert(1)',
          'java&Tab;script:alert(1)',
          'java&NewLine;script:alert(1)',
          'java%0Ascript:alert(1)',
          'java%5Ctscript:alert(1)',
          '&#0000106;avascript:alert(1)',
          '&#X6A;avascript:alert(1)',
          '%26%23x6A%3Bavascript:alert(1)', // URL-encoded character reference.
          'vbscript:msgbox(1)',
        ];
        return inputs.filter((input) => u.sanitizeURL(input) !== 'about:blank');
      });
      expect(mismatches).toEqual([]);
    });
  });

  // Pins current output: it is also a dismiss key that Editoria11y syncs, so a change must be deliberate.
  test('standardizeHref output is stable (used as a dismiss key)', async () => {
    const result = await withUtils((u) => {
      const href = (value) => {
        const a = document.createElement('a');
        a.setAttribute('href', value);
        return u.standardizeHref(a);
      };
      return [
        href('https://www.example.com/about.html'),
        href('https://example.com/about.HTML?x=1'),
        href('https://example.com/about.htm#top'),
        href('//www.example.com/about/'),
        href('https://example.com/file.html.zip'),
        href('https://www.sub.example.com/page.aspx'),
      ];
    });
    expect(result).toEqual([
      'example.com/about',
      'example.com/about.html?x=1',
      'example.com/about.htm#top',
      '//www.example.com/about',
      'example.com/file.html.zip',
      'sub.example.com/page',
    ]);
  });

  test.describe('getBestImageSource', () => {
    // Builds an <img> (optionally inside <picture>) and returns the resolved thumbnail URL.
    const pick = (attrs, pictureSrcset) =>
      withUtils(
        (u, [a, p]) => {
          const img = document.createElement('img');
          for (const [name, value] of Object.entries(a)) img.setAttribute(name, value);
          let root = img;
          if (p) {
            root = document.createElement('picture');
            const source = document.createElement('source');
            source.setAttribute('srcset', p);
            root.append(source, img);
          }
          document.body.append(root);
          const src = u.getBestImageSource(img);
          root.remove();
          return src.replace(location.origin, '');
        },
        [attrs, pictureSrcset ?? null],
      );

    test('picks the smallest candidate by width or density', async () => {
      expect(await pick({ srcset: 'a.jpg 600w, b.jpg 300w, c.jpg 900w' })).toBe(
        '/test/pages/b.jpg',
      );
      expect(await pick({ srcset: 'a.jpg 2x,b.jpg 1.5x' })).toBe('/test/pages/b.jpg');
      expect(await pick({ srcset: 'a.jpg, b.jpg 2x' })).toBe('/test/pages/a.jpg');
      expect(await pick({ srcset: 'a.jpg 0.5x, b.jpg' })).toBe('/test/pages/a.jpg');
    });

    test('keeps commas that are part of a URL', async () => {
      const srcset =
        'https://cdn.example.com/w_600,h_400/a.jpg 600w, https://cdn.example.com/w_300,h_200/a.jpg 300w';
      expect(await pick({ srcset })).toBe('https://cdn.example.com/w_300,h_200/a.jpg');
      expect(await pick({ 'data-src': 'https://cdn.example.com/w_300,h_200/b.jpg' })).toBe(
        'https://cdn.example.com/w_300,h_200/b.jpg',
      );
    });

    test('falls back to <picture> sources, then src', async () => {
      expect(await pick({ src: 'fallback.jpg' }, 'big.webp 1200w, small.webp 400w')).toBe(
        '/test/pages/small.webp',
      );
      expect(await pick({ src: 'fallback.jpg' })).toBe('/test/pages/fallback.jpg');
      expect(await pick({ src: 'fallback.jpg', srcset: ' , ' })).toBe('/test/pages/fallback.jpg');
    });

    test('drops srcset candidates with invalid descriptors, as browsers do', async () => {
      // Each invalid candidate is listed with the smallest size, so picking it would be visible.
      const valid = 'ok.jpg 500w';
      const invalid = [
        'zero.jpg 0w',
        'fraction.jpg 1.5w',
        'mixed.jpg 100w 2x',
        'duplicate.jpg 100w 200w',
        'unknown.jpg 100w 50q',
        'uppercase.jpg 100W',
        'negative.jpg -100w',
        'heightOnly.jpg 100h',
        'zeroHeight.jpg 100w 0h',
      ];
      for (const candidate of invalid) {
        expect(await pick({ srcset: `${candidate}, ${valid}` }), candidate).toBe(
          '/test/pages/ok.jpg',
        );
      }
      // Density: zero, negative, duplicate and density with height are invalid.
      for (const candidate of [
        'zero.jpg 0x',
        'neg.jpg -1x',
        'dup.jpg 0.5x 0.5x',
        'h.jpg 0.5x 10h',
      ]) {
        expect(await pick({ srcset: `${candidate}, ok.jpg 2x` }), candidate).toBe(
          '/test/pages/ok.jpg',
        );
      }
      // Valid forms: width with height, float densities with exponent or leading dot.
      expect(await pick({ srcset: 'a.jpg 600w 400h, b.jpg 300w 200h' })).toBe('/test/pages/b.jpg');
      expect(await pick({ srcset: 'a.jpg 2x, b.jpg .5x' })).toBe('/test/pages/b.jpg');
      expect(await pick({ srcset: 'a.jpg 2x, b.jpg 5e-1x' })).toBe('/test/pages/b.jpg');
      // Every candidate invalid: fall back to src.
      expect(await pick({ src: 'fallback.jpg', srcset: 'a.jpg 0w, b.jpg 1x 1x' })).toBe(
        '/test/pages/fallback.jpg',
      );
    });

    test('treats data-src as a single URL, not a srcset', async () => {
      // A srcset parser would split this at the space and return "a".
      expect(await pick({ 'data-src': 'a b.jpg', srcset: 'c.jpg 1x' })).toBe(
        '/test/pages/a%20b.jpg',
      );
      expect(await pick({ 'data-src': '  a.jpg  ' })).toBe('/test/pages/a.jpg');
      // data-srcset (lazy loading) wins over the placeholder srcset and src.
      expect(
        await pick({
          'data-srcset': 'big.jpg 800w, small.jpg 200w',
          srcset: 'ph.gif 1x',
          src: 'ph.gif',
        }),
      ).toBe('/test/pages/small.jpg');
      expect(await pick({ 'data-src': 'lazy.jpg', 'data-srcset': 'small.jpg 200w' })).toBe(
        '/test/pages/lazy.jpg',
      );
      // Empty data-src falls through to srcset.
      expect(await pick({ 'data-src': '  ', srcset: 'c.jpg 1x' })).toBe('/test/pages/c.jpg');
      // An unparseable URL falls through instead of throwing.
      expect(await pick({ 'data-src': 'http://[bad', src: 'fallback.jpg' })).toBe(
        '/test/pages/fallback.jpg',
      );
    });
  });
});
