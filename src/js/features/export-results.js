import Constants from '../utils/constants';
import Lang from '../utils/lang';
import { stripHTMLtags, decodeHTML, escapeHTML, generateElementPreview } from '../utils/utils';
import exportResultsStyles from '../../../dist/css/export-results.min.css';

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
function generateHTMLTemplate(results, dismissResults) {
  const errors = results.filter((issue) => issue.type === 'error');
  const warnings = results.filter((issue) => issue.type === 'warning');
  const count = { error: errors.length, warning: warnings.length, dismiss: dismissResults.length };

  function generateList(issues, type) {
    const types = {
      error: Lang._('ERRORS'),
      warning: Lang._('WARNINGS'),
      dismissed: Lang._('DISMISSED'),
    };
    const heading = types[type];
    const hasIssues = issues.length > 0;

    if (!hasIssues) return '';

    let list = `<h2>${heading}</h2>`;
    let listOpeningTag = '<ol>';
    let listClosingTag = '</ol>';

    if (type === 'dismissed') {
      listOpeningTag = `<details><summary>${Lang.sprintf('PANEL_DISMISS_BUTTON', count.dismiss)}</summary><ol>`;
      listClosingTag = '</details>';
    }

    // Opening tag
    list += listOpeningTag;

    issues.forEach((issue) => {
      let elementPreview = '';
      if (issue.element) {
        const allowedTags = ['IMG', 'IFRAME', 'AUDIO', 'VIDEO'];
        if (allowedTags.includes(issue.element.tagName)) {
          elementPreview = `
              <li>
                <strong>${Lang._('PREVIEW')}:</strong>
                ${generateElementPreview(issue)}
              </li>
              <li>
                <strong>${Lang._('ELEMENT')}:</strong>
                <pre><code>${escapeHTML(issue.htmlPath)}</code></pre>
              </li>`;
        } else {
          elementPreview = `
              <li>
                <strong>${Lang._('ELEMENT')}:</strong>
                <pre><code>${escapeHTML(issue.htmlPath)}</code></pre>
              </li>`;
        }
      }
      const cssPath = issue.cssPath
        ? `<li>
            <strong>${Lang._('PATH')}:</strong>
            <pre><code>${issue.cssPath}</code></pre>
          </li>` : '';

      list += `<li>
                <p>${issue.content.replace('<hr aria-hidden="true">', ' | ')}</p>
                <ul>${elementPreview}${cssPath}</ul>
              </li>`;
    });

    // Closing tag.
    list += listClosingTag;
    return list;
  }

  const errorsList = generateList(errors, 'error');
  const warningList = generateList(warnings, 'warning');
  const dismissedList = generateList(dismissResults, 'dismissed');

  // Meta information.
  const meta = generateMetaData();
  const metaTitle = !meta.titleCheck
    ? `<dt>${Lang._('PAGE_TITLE')}</dt><dd>${meta.metaTitle}</dd>` : '';
  const metaErrors = count.error !== 0
    ? `<dt>${Lang._('ERRORS')}</dt><dd>${count.error}</dd>` : '';
  const metaWarnings = count.warning !== 0
    ? `<dt>${Lang._('WARNINGS')}</dt><dd>${count.warning}</dd>` : '';
  const metaDismissed = count.dismiss !== 0
    ? `<dt>${Lang._('DISMISSED')}</dt><dd>${count.dismiss}</dd>` : '';
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
        ${errorsList}
        ${warningList}
        ${dismissedList}
        <footer>
          <p>${Lang.sprintf('GENERATED', tool)}</p>
        </footer>
      </body>
      </html>
    `;
  return htmlTemplate;
}

/* HTML Blob */
function downloadHTMLTemplate(results, dismissResults) {
  const htmlContent = generateHTMLTemplate(results, dismissResults);
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
function downloadCSVTemplate(results) {
  const meta = generateMetaData();
  // CSV header row
  const filteredObjects = results.filter((issue) => issue.type === 'warning' || issue.type === 'error')
    .map((issue) => {
      const { type, content, htmlPath, cssPath } = issue;

      // Make issue messages more readable in CSV format.
      const prepContent = content
        .replaceAll(/<span\s+class="visually-hidden"[^>]*>.*?<\/span>/gi, '')
        .replaceAll('<hr aria-hidden="true">', ' | ')
        .replaceAll(/"/g, '""');
      const stripHTML = stripHTMLtags(String(prepContent));
      const encoded = decodeHTML(stripHTML);

      // Column headers.
      const columns = {
        Title: `"${meta.metaTitle}"`,
        URL: `"${meta.pageURL}"`,
        Type: `"${String(type)}"`,
        Issue: `"${encoded}"`,
        Element: `"${htmlPath}"`,
      };
      if (cssPath) columns.Path = `"${cssPath}"`;
      return columns;
    });

  // CSV content
  const headers = Object.keys(filteredObjects[0]);
  const csvContent = `${headers.join(',')}\n${filteredObjects.map((obj) => headers.map((header) => obj[header]).join(',')).join('\n')}`;

  // Create blob
  const bom = new Uint8Array([0xEF, 0xBB, 0xBF]);
  const blob = new Blob([bom, csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.href = window.URL.createObjectURL(blob);
  const fileNameTitle = !meta.titleCheck ? `_${meta.metaTitle.trim().replace(/ /g, '')}` : '';
  link.setAttribute('download', `Sa11y_${meta.numericDate + fileNameTitle}.csv`);
  document.body.appendChild(link);
  link.click();

  // Remove blob
  setTimeout(() => {
    document.body.removeChild(link);
    window.URL.revokeObjectURL(link.href);
  }, 100);
}

// Attach event listeners.
let exportHTMLHandler;
let exportCSVHandler;
export function exportResults(results, dismissResults) {
  if (Constants.Global.exportResultsPlugin) {
    exportHTMLHandler = () => {
      downloadHTMLTemplate(results, dismissResults);
    };
    exportCSVHandler = () => {
      downloadCSVTemplate(results, dismissResults);
    };

    Constants.Panel.exportHTML.addEventListener('click', exportHTMLHandler);
    Constants.Panel.exportCSV.addEventListener('click', exportCSVHandler);
  }
}

// Imported by Reset function.
export function removeExportListeners() {
  if (Constants.Global.exportResultsPlugin) {
    Constants.Panel.exportHTML.removeEventListener('click', exportHTMLHandler);
    Constants.Panel.exportCSV.removeEventListener('click', exportCSVHandler);
  }
}
