/* eslint-disable no-alert */
import { loadSa11y } from './_loadSa11y';

const langCode = 'fi';

if (typeof Sa11y !== 'object') {
  loadSa11y(langCode);
} else {
  alert('Vedä "Sa11y"-painike kirjanmerkkipalkkiin. Napsauta sitten kirjanmerkkiä millä tahansa verkkosivulla.');
}
