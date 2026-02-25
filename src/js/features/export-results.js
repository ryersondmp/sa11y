/** biome-ignore-all lint/correctness/noUndeclaredVariables: experimental browser api */
import exportResultsStyles from '../../css/export-results.css?inline';
import Constants from '../utils/constants';
import Lang from '../utils/lang';
import * as Utils from '../utils/utils';
import { State } from '../core/state';

/* ************************************************************ */
/*  Export results as CSV or HTML via Blob API.                 */
/* ************************************************************ */

/**
 * Safe DOM element factory.
 * Sets text via textContent (never innerHTML) and attributes via setAttribute.
 * Accepts child nodes or plain strings (converted to TextNodes).
 *
 * @param {string} tag - HTML tag name
 * @param {Object} props - { className, textContent, href, ... }
 * @param {...(Node|string)} children
 * @returns {HTMLElement}
 */
function el(tag, props = {}, ...children) {
  const node = document.createElement(tag);
  for (const [key, val] of Object.entries(props)) {
    if (key === 'textContent') {
      node.textContent = val;
    } else if (key === 'className') {
      node.className = val;
    } else {
      node.setAttribute(key, val);
    }
  }
  for (const child of children) {
    if (child == null) continue;
    if (typeof child === 'string') {
      node.appendChild(document.createTextNode(child));
    } else {
      node.appendChild(child);
    }
  }
  return node;
}

/**
 * Sanitize a DOM node or HTML string and return a sanitized DocumentFragment.
 * @param {Node|string} node
 * @returns {Promise<DocumentFragment>}
 */
async function sanitizeToFragment(node) {
  const wrapper = document.createElement('div');
  wrapper.appendChild(node.cloneNode(true));
  const raw = wrapper.innerHTML; // READ only.
  const fragment = document.createDocumentFragment();

  // Utilize brand new sanitizer API if it's available.
  if (typeof window.Sanitizer === 'function') {
    const sanitizer = new Sanitizer();
    const target = document.createElement('div');
    target.setHTML(raw, { sanitizer });
    while (target.firstChild) fragment.appendChild(target.firstChild);
    return fragment;
  }

  // DOMParser creates a completely separate document — no scripts execute.
  const safeHTML = Utils.sanitizeHTML(raw);
  const parsed = new DOMParser().parseFromString(safeHTML, 'text/html');
  const imported = document.importNode(parsed.body, true);
  while (imported.firstChild) fragment.appendChild(imported.firstChild);
  return fragment;
}

// Generate metadata used in both HTML and CSV exports.
function generateMetaData() {
  const today = new Date();
  const day = String(today.getDate()).padStart(2, '0');
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const year = today.getFullYear();
  const date = new Date().toLocaleString();
  const numericDate = `${month}-${day}-${year}`;
  const title = document.querySelector('head title');
  const titleCheck = !title || title.textContent.trim().length === 0;
  const metaTitle = !titleCheck ? title.textContent : '';
  const pageURL = Utils.sanitizeURL(window.location.href);
  return { date, numericDate, titleCheck, metaTitle, pageURL };
}

// Sanitize a CSV cell value against CSV injection and escape internal quotes.
function sanitizeCSVCell(value) {
  const strValue = String(value ?? '');
  const escaped = strValue.replaceAll('"', '""');
  if (/^[=+\-@\t\r]/.test(escaped)) {
    return `'${escaped}`;
  }
  return escaped;
}

/* ------------------------------------------------------------------ */
/*  HTML export                                                       */
/* ------------------------------------------------------------------ */

/**
 * Build a <fragment> containing an <h2> heading and an <ol> (or
 * <details>/<ol> for dismissed) for a list of issues.
 * All user-derived values are inserted via textContent or through
 * sanitizeToFragment (which returns a safe DocumentFragment).
 * @param {Array}  issues
 * @param {string} type  'error' | 'warning' | 'dismissed'
 * @returns {Promise<DocumentFragment|null>}
 */
async function generateList(issues, type) {
  if (!issues.length) return null;

  const typeLabels = {
    error: Lang._('ERRORS'),
    warning: Lang._('WARNINGS'),
    dismissed: Lang._('DISMISSED'),
  };

  const fragment = document.createDocumentFragment();
  fragment.appendChild(el('h2', { textContent: typeLabels[type] }));

  const ol = el('ol', { className: type });

  for (const issue of issues) {
    const li = document.createElement('li');

    // Issue message — sanitizeToFragment returns a DocumentFragment, appended directly.
    const msgContainer = document.createElement('div');
    const msgFragment = await sanitizeToFragment(issue.content);
    msgContainer.appendChild(msgFragment);
    li.appendChild(msgContainer);

    const ul = document.createElement('ul');

    if (issue.element) {
      const allowedTags = ['IMG'];

      // Image preview — serialized & sanitized.
      if (allowedTags.includes(issue.element.tagName)) {
        const previewLi = document.createElement('li');
        const strong = el('strong', { textContent: `${Lang._('PREVIEW')}: ` });
        previewLi.appendChild(strong);

        const previewNode = await Utils.generateElementPreview(issue, true);
        const previewFragment = await sanitizeToFragment(previewNode);
        const previewContainer = document.createElement('span');
        previewContainer.appendChild(previewFragment);
        previewLi.appendChild(previewContainer);
        ul.appendChild(previewLi);
      }

      // Element path — textContent escapes all HTML special characters.
      const elemLi = document.createElement('li');
      elemLi.appendChild(el('strong', { textContent: `${Lang._('ELEMENT')}: ` }));
      const elemPre = document.createElement('pre');
      elemPre.appendChild(el('code', { textContent: issue.htmlPath }));
      elemLi.appendChild(elemPre);
      ul.appendChild(elemLi);
    }

    // CSS path — textContent escapes all HTML special characters.
    if (issue.cssPath) {
      const pathLi = document.createElement('li');
      pathLi.appendChild(el('strong', { textContent: `${Lang._('PATH')}: ` }));
      const pathPre = document.createElement('pre');
      pathPre.appendChild(el('code', { textContent: issue.cssPath }));
      pathLi.appendChild(pathPre);
      ul.appendChild(pathLi);
    }

    li.appendChild(ul);
    ol.appendChild(li);
  }

  // Dismissed issues are wrapped in a <details> element.
  if (type === 'dismissed') {
    const details = document.createElement('details');
    details.appendChild(
      el('summary', {
        textContent: Lang.sprintf('PANEL_DISMISS_BUTTON', State.counts.dismissed),
      }),
    );
    details.appendChild(ol);
    fragment.appendChild(details);
  } else {
    fragment.appendChild(ol);
  }

  return fragment;
}

/**
 * Build the full export HTML document using the DOM API.
 * User-supplied values (page title, URL, issue content) are never
 * interpolated directly into HTML strings — they go through textContent
 * or serializeNode. XMLSerializer produces the final string only once
 * the DOM tree is complete and trusted.
 */
async function generateHTMLTemplate() {
  const errors = State.results.filter((issue) => issue.type === 'error');
  const warnings = State.results.filter((issue) => issue.type === 'warning');
  const meta = generateMetaData();

  // Create an isolated document so our work doesn't touch the live page.
  const doc = document.implementation.createHTMLDocument('');
  doc.documentElement.setAttribute('lang', Lang._('LANG_CODE'));

  // Create the <head> of the document.
  el('meta', { charset: 'UTF-8' });
  const existingMeta = doc.querySelector('meta[charset]');
  if (existingMeta) {
    existingMeta.setAttribute('charset', 'UTF-8');
  } else {
    doc.head.insertBefore(el('meta', { charset: 'UTF-8' }), doc.head.firstChild);
  }
  doc.head.appendChild(
    el('meta', { name: 'viewport', content: 'width=device-width, initial-scale=1.0' }),
  );

  // Page title.
  const titleEl = doc.createElement('title');
  titleEl.textContent = `${Lang._('RESULTS')}: ${meta.metaTitle}`;
  doc.head.appendChild(titleEl);

  // Inject page styles.
  const styleEl = doc.createElement('style');
  styleEl.textContent = exportResultsStyles;
  doc.head.appendChild(styleEl);

  // Build page <header>.
  const header = doc.createElement('header');
  header.appendChild(el('h1', { textContent: Lang._('RESULTS') }));
  const dl = el('dl', { className: 'two-columns' });

  // Left column: page metadata.
  const leftCol = el('div', { className: 'column' });
  if (!meta.titleCheck) {
    leftCol.appendChild(el('dt', { textContent: Lang._('PAGE_TITLE') }));
    leftCol.appendChild(el('dd', { textContent: meta.metaTitle }));
  }
  leftCol.appendChild(el('dt', { textContent: 'URL' }));
  const urlAnchor = el('a', { href: meta.pageURL, textContent: meta.pageURL });
  leftCol.appendChild(el('dd', {}, urlAnchor));
  leftCol.appendChild(el('dt', { textContent: Lang._('DATE') }));
  leftCol.appendChild(el('dd', { textContent: meta.date }));
  dl.appendChild(leftCol);

  // Right column: Issue counts.
  const rightCol = el('div', { className: 'column count' });
  if (State.counts.error !== 0) {
    rightCol.appendChild(el('dt', { textContent: Lang._('ERRORS') }));
    rightCol.appendChild(el('dd', { textContent: String(State.counts.error) }));
  }
  if (State.counts.warning !== 0) {
    rightCol.appendChild(el('dt', { textContent: Lang._('WARNINGS') }));
    rightCol.appendChild(el('dd', { textContent: String(State.counts.warning) }));
  }
  if (State.counts.dismissed !== 0) {
    rightCol.appendChild(el('dt', { textContent: Lang._('DISMISSED') }));
    rightCol.appendChild(el('dd', { textContent: String(State.counts.dismissed) }));
  }
  dl.appendChild(rightCol);

  // Append all meta data and issue counts.
  header.appendChild(dl);

  // Create main content area.
  const main = doc.createElement('main');
  const listEntries = [
    [errors, 'error'],
    [warnings, 'warning'],
    [State.dismissedResults, 'dismissed'],
  ];

  for (const [issues, type] of listEntries) {
    const fragment = await generateList(issues, type);
    if (fragment) main.appendChild(fragment);
  }

  // Create page footer.
  const footer = document.createElement('footer');
  const generatedBy = Lang.sprintf('GENERATED');
  footer.appendChild(generatedBy);

  // Append all to page.
  doc.body.appendChild(header);
  doc.body.appendChild(main);
  doc.body.appendChild(footer);

  // Serialize the fully constructed DOM to a string.
  return new XMLSerializer().serializeToString(doc);
}

/* ------------------------------------------------------------------ */
/*  Blob helpers                                                        */
/* ------------------------------------------------------------------ */

// Trigger an HTML file download.
async function downloadHTMLTemplate() {
  const htmlContent = await generateHTMLTemplate();
  const meta = generateMetaData();
  const blob = new Blob([htmlContent], { type: 'text/html' });
  const link = document.createElement('a');
  const title = !meta.titleCheck ? `_${meta.metaTitle.trim().replace(/ /g, '')}` : '';
  link.href = window.URL.createObjectURL(blob);
  link.download = `Sa11y_${meta.numericDate + title}.html`;
  document.body.appendChild(link);
  link.click();
  setTimeout(() => {
    document.body.removeChild(link);
    window.URL.revokeObjectURL(link.href);
  }, 100);
}

// Trigger a CSV file download.
function downloadCSVTemplate() {
  const meta = generateMetaData();

  const filteredObjects = State.results
    .filter((issue) => issue.type === 'warning' || issue.type === 'error')
    .map((issue) => {
      const { type, content, htmlPath, cssPath } = issue;

      // Strip HTML and decode entities to produce plain text for the CSV.
      const clone = content.cloneNode(true);
      clone.querySelectorAll('.visually-hidden').forEach((n) => {
        n.remove();
      });
      clone.querySelectorAll('hr').forEach((hr) => {
        hr.replaceWith(' | ');
      });
      const encoded = clone.textContent.replaceAll('"', '""');

      // Column headers.
      const columns = {
        Title: `"${sanitizeCSVCell(meta.metaTitle)}"`,
        URL: `"${sanitizeCSVCell(meta.pageURL)}"`,
        Type: `"${sanitizeCSVCell(String(type))}"`,
        Issue: `"${sanitizeCSVCell(encoded)}"`,
        Element: `"${sanitizeCSVCell(htmlPath)}"`,
      };

      // CSS path of item.
      if (cssPath) {
        columns.Path = `"${sanitizeCSVCell(cssPath)}"`;
      }

      return columns;
    });

  const headers = Object.keys(filteredObjects[0]);
  const csvContent = `${headers.join(',')}\n${filteredObjects
    .map((obj) => headers.map((header) => obj[header] ?? '""').join(','))
    .join('\n')}`;

  // BOM ensures Excel opens UTF-8 files correctly.
  const bom = new Uint8Array([0xef, 0xbb, 0xbf]);
  const blob = new Blob([bom, csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  const fileNameTitle = !meta.titleCheck ? `_${meta.metaTitle.trim().replace(/ /g, '')}` : '';
  link.setAttribute('download', `Sa11y_${meta.numericDate + fileNameTitle}.csv`);
  document.body.appendChild(link);
  link.click();

  setTimeout(() => {
    document.body.removeChild(link);
    window.URL.revokeObjectURL(link.href);
  }, 100);
}

let exportHTMLHandler;
let exportCSVHandler;

export function exportResults() {
  if (!State.option.exportResultsPlugin) return;

  exportHTMLHandler = async () => {
    await downloadHTMLTemplate();
  };
  exportCSVHandler = () => {
    downloadCSVTemplate();
  };

  Constants.Panel.exportHTML.addEventListener('click', exportHTMLHandler);
  Constants.Panel.exportCSV.addEventListener('click', exportCSVHandler);
}

// Imported by Reset function.
export function removeExportListeners() {
  if (State.option.exportResultsPlugin) {
    Constants.Panel.exportHTML.removeEventListener('click', exportHTMLHandler);
    Constants.Panel.exportCSV.removeEventListener('click', exportCSVHandler);
  }
}
