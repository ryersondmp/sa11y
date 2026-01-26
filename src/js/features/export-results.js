import exportResultsStyles from '../../css/export-results.css?inline';
import Constants from '../utils/constants';
import Lang from '../utils/lang';
import * as Utils from '../utils/utils';
import { State } from '../core/state';

/* ************************************************************ */
/*  Export results as CSV or HTML via Blob API.                 */
/* ************************************************************ */

// Generate meta date for both HTML and CSV templates.
function generateMetaData() {
  const today = new Date();
  const day = String(today.getDate()).padStart(2, '0');
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const year = today.getFullYear();
  const date = new Date().toLocaleString();
  const numericDate = `${month}-${day}-${year}`;

  // Page title & URL
  const title = document.querySelector('head title');
  const titleCheck = !title || title.textContent.trim().length === 0;
  const metaTitle = !titleCheck ? title.textContent : '';
  const pageURL = window.location.href;

  return { date, numericDate, titleCheck, metaTitle, pageURL };
}

// Generate HTML template for download.
async function generateHTMLTemplate() {
  const errors = State.results.filter((issue) => issue.type === 'error');
  const warnings = State.results.filter((issue) => issue.type === 'warning');

  async function generateList(issues, type) {
    const types = {
      error: Lang._('ERRORS'),
      warning: Lang._('WARNINGS'),
      dismissed: Lang._('DISMISSED'),
    };
    const heading = types[type];
    const hasIssues = issues.length > 0;

    if (!hasIssues) return '';

    let list = `<h2>${heading}</h2>`;
    let listOpeningTag = `<ol class="${type}">`;
    let listClosingTag = '</ol>';

    if (type === 'dismissed') {
      listOpeningTag = `<details><summary>${Lang.sprintf('PANEL_DISMISS_BUTTON', State.counts.dismissed)}</summary><ol>`;
      listClosingTag = '</details>';
    }

    // Opening tag.
    list += listOpeningTag;

    // Create an array of promises and wait for all of them to resolve.
    const issuePromises = issues.map(async (issue) => {
      let elementPreview = '';
      if (issue.element) {
        const allowedTags = ['IMG', 'IFRAME', 'AUDIO', 'VIDEO'];
        const preview = await Utils.generateElementPreview(issue, true);
        if (allowedTags.includes(issue.element.tagName)) {
          elementPreview = `<li><strong>${Lang._('PREVIEW')}:</strong> ${preview}</li><li><strong>${Lang._('ELEMENT')}:</strong> <pre><code>${Utils.escapeHTML(issue.htmlPath)}</code></pre></li>`;
        } else {
          elementPreview = `<li><strong>${Lang._('ELEMENT')}:</strong> <pre><code>${Utils.escapeHTML(issue.htmlPath)}</code></pre></li>`;
        }
      }
      const cssPath = issue.cssPath
        ? `<li><strong>${Lang._('PATH')}:</strong> <pre><code>${issue.cssPath}</code></pre></li>`
        : '';
      return `<li>${issue.content} <ul>${elementPreview}${cssPath}</ul></li>`;
    });

    // Wait for all promises to resolve.
    const resolvedIssues = await Promise.all(issuePromises);

    // Add resolved issues to the list.
    list += resolvedIssues.join('');

    // Closing tag.
    list += listClosingTag;
    return list;
  }

  const errorsList = await generateList(errors, 'error');
  const warningList = await generateList(warnings, 'warning');
  const dismissedList = await generateList(State.dismissedResults, 'dismissed');

  // Meta information
  const meta = generateMetaData();
  const metaTitle = !meta.titleCheck
    ? `<dt>${Lang._('PAGE_TITLE')}</dt><dd>${meta.metaTitle}</dd>`
    : '';
  const metaErrors =
    State.counts.error !== 0 ? `<dt>${Lang._('ERRORS')}</dt><dd>${State.counts.error}</dd>` : '';
  const metaWarnings =
    State.counts.warning !== 0
      ? `<dt>${Lang._('WARNINGS')}</dt><dd>${State.counts.warning}</dd>`
      : '';
  const metaDismissed =
    State.counts.dismissed !== 0
      ? `<dt>${Lang._('DISMISSED')}</dt><dd>${State.counts.dismissed}</dd>`
      : '';
  const tool = '<a href="https://sa11y.netlify.app">Sa11y</a>';

  const htmlTemplate = `
      <!DOCTYPE html>
      <html lang="${Lang._('LANG_CODE')}">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${Lang._('RESULTS')}: ${meta.metaTitle}</title>
        <style>${exportResultsStyles}</style>
      </head>
      <body>
        <header>
          <h1>${Lang._('RESULTS')}</h1>
          <dl class="two-columns">
            <div class="column">
              ${metaTitle}
              <dt>URL</dt>
              <dd><a href="${meta.pageURL}">${meta.pageURL}</a></dd>
              <dt>${Lang._('DATE')}</dt>
              <dd>${meta.date}</dd>
            </div>
            <div class="column count">
              ${metaErrors}
              ${metaWarnings}
              ${metaDismissed}
            </div>
        </dl>
        </header>
        <main>
          ${errorsList}
          ${warningList}
          ${dismissedList}
        </main>
        <footer>
          <p>${Lang.sprintf('GENERATED', tool)}</p>
        </footer>
      </body>
      </html>
    `;
  return htmlTemplate;
}

/* HTML Blob */
async function downloadHTMLTemplate() {
  const htmlContent = await generateHTMLTemplate();
  const meta = generateMetaData();

  // Create blob
  const blob = new Blob([htmlContent], { type: 'text/html' });
  const link = document.createElement('a');
  const title = !meta.titleCheck ? `_${meta.metaTitle.trim().replace(/ /g, '')}` : '';
  link.href = window.URL.createObjectURL(blob);
  link.download = `Sa11y_${meta.numericDate + title}.html`;
  document.body.appendChild(link);
  link.click();

  // Remove blob
  setTimeout(() => {
    document.body.removeChild(link);
    window.URL.revokeObjectURL(link.href);
  }, 100);
}

/* CSV Blob */
function downloadCSVTemplate() {
  const meta = generateMetaData();
  // CSV header row
  const filteredObjects = State.results
    .filter((issue) => issue.type === 'warning' || issue.type === 'error')
    .map((issue) => {
      const { type, content, htmlPath, cssPath } = issue;

      // Make issue messages more readable in CSV format.
      const prepContent = content
        .replaceAll(/<span\s+class="visually-hidden"[^>]*>.*?<\/span>/gi, '')
        .replaceAll('<hr aria-hidden="true">', ' | ')
        .replaceAll(/"/g, '""');
      const stripHTML = Utils.stripHTMLtags(String(prepContent));
      const encoded = Utils.decodeHTML(stripHTML);

      // Column headers.
      const columns = {
        Title: `"${meta.metaTitle}"`,
        URL: `"${meta.pageURL}"`,
        Type: `"${String(type)}"`,
        Issue: `"${encoded}"`,
        Element: `"${htmlPath}"`,
      };
      if (cssPath) {
        columns.Path = `"${cssPath}"`;
      }
      return columns;
    });

  // CSV content
  const headers = Object.keys(filteredObjects[0]);
  const csvContent = `${headers.join(',')}\n${filteredObjects.map((obj) => headers.map((header) => obj[header]).join(',')).join('\n')}`;

  // Create blob.
  const bom = new Uint8Array([0xef, 0xbb, 0xbf]);
  const blob = new Blob([bom, csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.href = window.URL.createObjectURL(blob);
  const fileNameTitle = !meta.titleCheck ? `_${meta.metaTitle.trim().replace(/ /g, '')}` : '';
  link.setAttribute('download', `Sa11y_${meta.numericDate + fileNameTitle}.csv`);
  document.body.appendChild(link);
  link.click();

  // Remove blob.
  setTimeout(() => {
    document.body.removeChild(link);
    window.URL.revokeObjectURL(link.href);
  }, 100);
}

// Attach event listeners.
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
