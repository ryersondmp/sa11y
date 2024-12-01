import { test, expect } from '@playwright/test';

// Translations
import Sa11yLangBg from '../dist/js/lang/bg.js';
import Sa11yLangCs from '../dist/js/lang/cs.js';
import Sa11yLangDa from '../dist/js/lang/da.js';
import Sa11yLangDe from '../dist/js/lang/de.js';
import Sa11yLangEl from '../dist/js/lang/el.js';
import Sa11yLangEn from '../dist/js/lang/en.js';
import Sa11yLangEnUS from '../dist/js/lang/enUS.js';
import Sa11yLangEs from '../dist/js/lang/es.js';
import Sa11yLangEt from '../dist/js/lang/et.js';
import Sa11yLangFi from '../dist/js/lang/fi.js';
import Sa11yLangFr from '../dist/js/lang/fr.js';
import Sa11yLangHu from '../dist/js/lang/hu.js';
import Sa11yLangId from '../dist/js/lang/id.js';
import Sa11yLangIt from '../dist/js/lang/it.js';
import Sa11yLangJa from '../dist/js/lang/ja.js';
import Sa11yLangKo from '../dist/js/lang/ko.js';
import Sa11yLangLt from '../dist/js/lang/lt.js';
import Sa11yLangLv from '../dist/js/lang/lv.js';
import Sa11yLangNb from '../dist/js/lang/nb.js';
import Sa11yLangNl from '../dist/js/lang/nl.js';
import Sa11yLangPl from '../dist/js/lang/pl.js';
import Sa11yLangPtBR from '../dist/js/lang/ptBR.js';
import Sa11yLangPtPT from '../dist/js/lang/ptPT.js';
import Sa11yLangRo from '../dist/js/lang/ro.js';
import Sa11yLangSk from '../dist/js/lang/sk.js';
import Sa11yLangSl from '../dist/js/lang/sl.js';
import Sa11yLangSv from '../dist/js/lang/sv.js';
import Sa11yLangTr from '../dist/js/lang/tr.js';
import Sa11yLangUa from '../dist/js/lang/ua.js';
import Sa11yLangZh from '../dist/js/lang/zh.js';

test.describe.configure({ mode: 'serial' });

/* i18n tests */
test.describe('Sa11y i18n tests', () => {
  test('Check language files.', async () => {
    const languages = [
      { lang: 'BG', obj: Sa11yLangBg },
      { lang: 'CS', obj: Sa11yLangCs },
      { lang: 'DA', obj: Sa11yLangDa },
      { lang: 'DE', obj: Sa11yLangDe },
      { lang: 'EL', obj: Sa11yLangEl },
      { lang: 'EN', obj: Sa11yLangEn },
      { lang: 'US', obj: Sa11yLangEnUS },
      { lang: 'ES', obj: Sa11yLangEs },
      { lang: 'ET', obj: Sa11yLangEt },
      { lang: 'FI', obj: Sa11yLangFi },
      { lang: 'FR', obj: Sa11yLangFr },
      { lang: 'HU', obj: Sa11yLangHu },
      { lang: 'ID', obj: Sa11yLangId },
      { lang: 'IT', obj: Sa11yLangIt },
      { lang: 'JA', obj: Sa11yLangJa },
      { lang: 'KO', obj: Sa11yLangKo },
      { lang: 'LT', obj: Sa11yLangLt },
      { lang: 'LV', obj: Sa11yLangLv },
      { lang: 'NB', obj: Sa11yLangNb },
      { lang: 'NL', obj: Sa11yLangNl },
      { lang: 'PL', obj: Sa11yLangPl },
      { lang: 'PTBR', obj: Sa11yLangPtBR },
      { lang: 'PTPT', obj: Sa11yLangPtPT },
      { lang: 'RO', obj: Sa11yLangRo },
      { lang: 'SK', obj: Sa11yLangSk },
      { lang: 'SL', obj: Sa11yLangSl },
      { lang: 'SV', obj: Sa11yLangSv },
      { lang: 'TR', obj: Sa11yLangTr },
      { lang: 'UA', obj: Sa11yLangUa },
      { lang: 'ZH', obj: Sa11yLangZh },
    ];

    function compareLanguageFilesWithEn(languageFiles) {
      const enKeys = Object.keys(Sa11yLangEn.strings);
      const issues = [];

      languageFiles.forEach(({ lang, obj }) => {
        const langKeys = Object.keys(obj.strings);
        const missingKeys = enKeys.filter((key) => !langKeys.includes(key));

        if (missingKeys.length > 0) {
          issues.push(`🚩 MISSING LANGUAGE KEYS IN ${lang}: ${missingKeys.join(', ')}`);
        }
      });

      if (issues.length > 0) {
        console.log(issues.join('\n'));
        expect(issues).toHaveLength(0);
      } else {
        console.log(`✅ All ${languageFiles.length} language files have ${enKeys.length} keys. `);
      }
    }
    compareLanguageFilesWithEn(languages);
  });
});
