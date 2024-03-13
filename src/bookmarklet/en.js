import { loadSa11y } from './_loadSa11y';

const langCode = 'en';
const message = {
  close: 'Close',
  heading: 'Update required',
  message: 'Please update the Sa11y bookmarklet by adding the following link to your bookmarks bar.',
  features: 'New bookmarklet features',
  a: 'Automatic page language detection',
  aContent: 'This bookmarklet automatically displays a translated version of Sa11y based on the page language. If the language is not supported, it will default to English.',
  b: 'Security policy warning',
  bContent: 'A warning will appear if the website enforces security policies that restrict Sa11y from working on its pages.',
};
loadSa11y(langCode, message);
