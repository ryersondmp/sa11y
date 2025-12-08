// Empty anchors appended to the hidden heading's visible parent.
export class HeadingAnchor extends HTMLElement {
  connectedCallback() {
    this.attachShadow({ mode: 'open' });
  }
}

// Visible heading annotations.
export class HeadingLabel extends HTMLElement {
  connectedCallback() {
    const shadow = this.attachShadow({ mode: 'open' });
    const style = document.createElement('style');
    style.textContent = `
      span.heading-label {
        background-color: #777678;
        background-image: linear-gradient(to bottom right, #b629ce, #16aec2);
        border-radius: 5px;
        border: 1px solid #36a5c3;
        color: white;
        display: inline-block;
        font-family: var(--sa11y-font-face);
        font-weight: 500;
        font-size: 18px;
        line-height: normal;
        letter-spacing: normal;
        margin: -5px 0 0 5px;
        padding: 3px;
        position: absolute;
        text-shadow: 1px 1px black;
        -webkit-text-fill-color: white;
        word-break: keep-all;
        z-index: 200;
      }
      @media screen and (forced-colors: active) {
        span.heading-label {
          border: 2px solid transparent;
        }
      }`;
    shadow.appendChild(style);
  }
}
