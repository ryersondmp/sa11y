import { Sa11y, Lang } from '../../dist/js/sa11y.esm.js';

// Translations
import Sa11yLangBg from '../../dist/js/lang/bg.js';
import Sa11yLangCs from '../../dist/js/lang/cs.js';
import Sa11yLangDa from '../../dist/js/lang/da.js';
import Sa11yLangDe from '../../dist/js/lang/de.js';
import Sa11yLangEl from '../../dist/js/lang/el.js';
import Sa11yLangEn from '../../dist/js/lang/en.js';
import Sa11yLangEnUS from '../../dist/js/lang/enUS.js';
import Sa11yLangEs from '../../dist/js/lang/es.js';
import Sa11yLangEt from '../../dist/js/lang/et.js';
import Sa11yLangFi from '../../dist/js/lang/fi.js';
import Sa11yLangFr from '../../dist/js/lang/fr.js';
import Sa11yLangHu from '../../dist/js/lang/hu.js';
import Sa11yLangId from '../../dist/js/lang/id.js';
import Sa11yLangIt from '../../dist/js/lang/it.js';
import Sa11yLangJa from '../../dist/js/lang/ja.js';
import Sa11yLangKo from '../../dist/js/lang/ko.js';
import Sa11yLangLt from '../../dist/js/lang/lt.js';
import Sa11yLangLv from '../../dist/js/lang/lv.js';
import Sa11yLangNb from '../../dist/js/lang/nb.js';
import Sa11yLangNl from '../../dist/js/lang/nl.js';
import Sa11yLangPl from '../../dist/js/lang/pl.js';
import Sa11yLangPtBR from '../../dist/js/lang/ptBR.js';
import Sa11yLangPtPT from '../../dist/js/lang/ptPT.js';
import Sa11yLangRo from '../../dist/js/lang/ro.js';
import Sa11yLangSk from '../../dist/js/lang/sk.js';
import Sa11yLangSl from '../../dist/js/lang/sl.js';
import Sa11yLangSv from '../../dist/js/lang/sv.js';
import Sa11yLangTr from '../../dist/js/lang/tr.js';
import Sa11yLangUa from '../../dist/js/lang/ua.js';
import Sa11yLangZh from '../../dist/js/lang/zh.js';

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

function compareLanguageFilesWithEn(language) {
  const enKeys = Object.keys(Sa11yLangEn.strings);
  let langKeysGood;
  const langCodes = [];
  language.forEach(({ lang, obj }) => {
    langCodes.push((lang));
    const langKeys = Object.keys(obj.strings);
    const missingKeys = [];
    enKeys.forEach((key) => {
      if (!langKeys.includes(key)) {
        missingKeys.push(key); // If the key is missing, add it to the list
      }
    });

    // Log the missing keys for the current language
    if (missingKeys.length > 0) {
      // eslint-disable-next-line no-alert
      alert(`⚠️ MISSING LANGUAGE KEYS IN ${lang}: "${missingKeys}"`);
    } else {
      langKeysGood = true;
    }
  });
  if (langKeysGood) {
    console.log(`All ${languages.length} language files have the same keys! 👍`);
    const langCodesArray = langCodes.toString().replaceAll(',', ', ').toLowerCase();
    const langOk = document.getElementById('lang-ok');
    if (langOk) {
      langOk.innerHTML = `
      <ul>
        <li>All <strong>${languages.length}</strong> language files have the same keys! 👍</li>
        <li>There are <strong>${Object.keys(Sa11yLangEn.strings).length}</strong> strings in total.</li>
        <li><strong>Languages:</strong> ${langCodesArray}</li>
      </ul>`;
    }
  }
}
compareLanguageFilesWithEn(languages);

/**
 * Passing custom checks as an object before instantiating.
 */

/*
let results = [];
const root = document.querySelector('main');

const $checkAnnouncement = root.querySelectorAll('.sa11y-announcement-component');
if ($checkAnnouncement.length > 1) {
  for (let i = 1; i < $checkAnnouncement.length; i++) {
    results.push({
      element: $checkAnnouncement[i],
      type: 'warning',
      content: 'More than one Announcement component found! The Announcement component should be used strategically and sparingly. It should be used to get attention or indicate that something is important. Misuse of this component makes it less effective or impactful. Secondly, this component is semantically labeled as an Announcement for people who use screen readers.',
      inline: false,
      position: 'beforebegin',
      developer: false,
    });
  }
}

const $checkAccordions = root.querySelectorAll('.sa11y-accordion-example');
$checkAccordions.forEach(($el) => {
  const checkForm = $el.querySelector('form');
  if (!!checkForm && checkForm.length) {
    results.push({
      element: $el,
      type: 'error',
      content: 'Do <strong>not nest forms</strong> within the Accordion component. If the form contains validation issues, a person may not see the form feedback since the accordion panel goes back to its original closed state.',
      inline: false,
      position: 'beforebegin',
      developer: true,
    });
  }
});
*/

// Instantiate
Lang.addI18n(Sa11yLangEn.strings);
const sa11y = new Sa11y({
  checkRoot: 'body',
  headerIgnore: '#nothing-ignore-this-heading *',
  linkIgnoreSpan: '.sr-only-example',
  linkIgnoreStrings: '(External)',
  imageIgnore: '.logo',
  contrastIgnore: '.background-image-component',
  showHinPageOutline: 1,

  exportResultsPlugin: true,
  autoDetectShadowComponents: true,
  developerChecksOnByDefault: true,

  checks: {
    QA_BAD_LINK: {
      sources: 'a[href*="dev."]',
    },
  },
});

/* Console all results */
document.addEventListener('sa11y-check-complete', (e) => {
  console.log(e.detail);
});

/**
 * Custom checks via event listeners.
 */
document.addEventListener('sa11y-custom-checks', () => {
  const $checkAnnouncement = sa11y.find('.sa11y-announcement-component', 'root');
  if ($checkAnnouncement.length > 1) {
    for (let i = 1; i < $checkAnnouncement.length; i++) {
      const key = sa11y.prepareDismissal($checkAnnouncement[i].textContent);
      sa11y.results.push({
        element: $checkAnnouncement[i],
        type: 'warning',
        content: 'More than one Announcement component found! The Announcement component should be used strategically and sparingly. It should be used to get attention or indicate that something is important. Misuse of this component makes it less effective or impactful. Secondly, this component is semantically labeled as an Announcement for people who use screen readers.',
        inline: false,
        position: 'beforebegin',
        dismiss: key,
      });
    }
  }

  const $checkAccordions = sa11y.find('.sa11y-accordion-example', 'root');
  $checkAccordions.forEach(($el) => {
    const checkForm = $el.querySelector('form');
    if (!!checkForm && checkForm.length) {
      sa11y.results.push({
        element: $el,
        type: 'error',
        content: 'Do <strong>not nest forms</strong> within the Accordion component. If the form contains validation issues, a person may not see the form feedback since the accordion panel goes back to its original closed state.',
        inline: false,
        position: 'beforebegin',
      });
    }
  });

  const allDone = new CustomEvent('sa11y-resume');
  document.dispatchEvent(allDone);
});
