/** biome-ignore-all lint/correctness/noUndeclaredVariables: Sa11yVersion swapped on compilation. */
import styles from '../../css/console-errors.css?inline';
import sharedStyles from '../../css/shared.css?inline';
import Constants from '../utils/constants';
import Lang from '../utils/lang';
import { sanitizeURL } from '../utils/utils';

export default class ConsoleErrors extends HTMLElement {
  constructor(error) {
    super();
    this.error = error;
  }

  connectedCallback() {
    const shadow = this.attachShadow({ mode: 'open' });

    // Styles
    const style = document.createElement('style');
    style.textContent = styles + sharedStyles;
    shadow.appendChild(style);

    // Container
    const content = document.createElement('div');
    content.setAttribute('id', 'dialog');
    content.setAttribute('tabindex', '-1');

    // Google Form & GitHub error link.
    const url = sanitizeURL(window.location.href);
    const google = 'https://forms.gle/sjzK9XykETaoqZv99';

    // GitHub template
    const template = `## Error Description
\`\`\`javascript
${this.error.stack}
\`\`\`

## Details
- **URL:** ${url}
- **Version:** ${Sa11yVersion}

## Comments
`;
    const encodedTemplate = encodeURIComponent(template);
    const github = `https://github.com/ryersondmp/sa11y/issues/new?title=Bug%20report&body=${encodedTemplate}`;

    // 1. Create the Close Button.
    const closeBtn = document.createElement('button');
    closeBtn.className = 'close-btn';
    closeBtn.setAttribute('aria-label', Lang._('ALERT_CLOSE'));

    // 2. Create the Heading.
    const h2 = document.createElement('h2');
    h2.textContent = Lang._('ERROR');

    // 3. Create the main message.
    const p1 = document.createElement('p');
    p1.append(Lang.sprintf('CONSOLE_ERROR', google, github));

    // 4. Create the Error Details (Stack trace and version).
    const p2 = document.createElement('p');
    p2.className = 'error';

    // Use line breaks and text nodes to avoid parsing strings as HTML.
    p2.append(
      this.error.stack,
      document.createElement('br'),
      document.createElement('br'),
      `Version: ${Sa11yVersion}`,
      document.createElement('br'),
      `URL: ${url}`
    );

    // 5. Assemble and append.
    content.append(closeBtn, h2, p1, p2);
    shadow.appendChild(content);

    // 6. Set focus and hide Sa11y's toggle.
    setTimeout(() => {
      Constants.Panel.toggle.style.display = 'none';
      const container = document.querySelector('sa11y-console-error');
      const dialog = container.shadowRoot.getElementById('dialog');
      dialog.focus();

      const close = container.shadowRoot.querySelector('.close-btn');
      close.addEventListener('click', () => {
        container.remove();
      });
    }, 0);
  }
}
