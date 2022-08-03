import Lang from './translation';
import { ERROR, WARNING, GOOD } from './constants';
import { escapeHTML as utilities } from './utilities';

// Templating for Error, Warning and Pass buttons.
export function annotate(type, content, inline = false) {
  let message = content;

  const validTypes = [
    ERROR,
    WARNING,
    GOOD,
  ];

  if (validTypes.indexOf(type) === -1) {
    throw Error(`Invalid type [${type}] for annotation`);
  }

  // Update error or warning count.
  [type].forEach(($el) => {
    if ($el === ERROR) {
      Sa11y.errorCount += 1;
    } else if ($el === WARNING) {
      Sa11y.warningCount += 1;
    }
  });

  const CSSName = {
    [validTypes[0]]: 'error',
    [validTypes[1]]: 'warning',
    [validTypes[2]]: 'good',
  };

  // Make translations easier.
  message = message
    .replaceAll(/<hr>/g, '<hr aria-hidden="true">')
    .replaceAll(/<a[\s]href=/g, '<a target="_blank" rel="noopener noreferrer" href=')
    .replaceAll(/<\/a>/g, `<span class="sa11y-visually-hidden"> (${Lang._('NEW_TAB')})</span></a>`)
    .replaceAll(/{r}/g, 'class="sa11y-red-text"');
  message = utilities.escapeHTML(message);

  return `<div class=${inline ? 'sa11y-instance-inline' : 'sa11y-instance'}>
                <button data-sa11y-annotation type="button" aria-label="${[type]}" class="sa11y-btn sa11y-${CSSName[type]}-btn${inline ? '-text' : ''}" data-tippy-content="<div lang='${Lang._('LANG_CODE')}'><div class='sa11y-header-text'>${[type]}</div>${message}</div>"></button>
              </div>`;
}

// Templating for full-width banners.
export function annotateBanner(type, content) {
  let message = content;

  const validTypes = [
    ERROR,
    WARNING,
    GOOD,
  ];

  if (validTypes.indexOf(type) === -1) {
    throw Error(`Invalid type [${type}] for annotation`);
  }

  const CSSName = {
    [validTypes[0]]: 'error',
    [validTypes[1]]: 'warning',
    [validTypes[2]]: 'good',
  };

  // Update error or warning count.
  [type].forEach(($el) => {
    if ($el === ERROR) {
      Sa11y.errorCount += 1;
    } else if ($el === WARNING) {
      Sa11y.warningCount += 1;
    }
  });

  // Check if content is a function & make translations easier.
  if (message && {}.toString.call(message) === '[object Function]') {
    message = message
      .replaceAll(/<hr>/g, '<hr aria-hidden="true">')
      .replaceAll(/<a[\s]href=/g, '<a target="_blank" rel="noopener noreferrer" href=')
      .replaceAll(/<\/a>/g, `<span class="sa11y-visually-hidden"> (${Lang._('NEW_TAB')})</span></a>`)
      .replaceAll(/{r}/g, 'class="sa11y-red-text"');
    message = utilities.escapeHTML(message);
  }

  return `<div class="sa11y-instance sa11y-${CSSName[type]}-message-container"><div role="region" data-sa11y-annotation tabindex="-1" aria-label="${[type]}" class="sa11y-${CSSName[type]}-message" lang="${Lang._('LANG_CODE')}">${message}</div></div>`;
}
