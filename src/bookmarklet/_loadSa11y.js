/* eslint-disable no-alert */
/* eslint-disable no-new */
/* eslint-disable no-undef */

const styles = `
:host {
  position: fixed; display: block; bottom: 50px; right: 50px; margin: auto 0px; width: 560px; z-index: 10000; background-color: rgb(255, 255, 255); border: 5px solid #0a2051; font-family: system-ui, sans-serif !important; box-shadow: rgba(154, 161, 177, 0.15) 0px 0px 20px 4px, rgba(36, 40, 47, 0.25) 0px 4px 80px -8px, rgba(91, 94, 105, 0.15) 0px 4px 4px -2px; border-radius: 5px;z-index:99999;
}

*:not(style) {
  all: unset;
  box-sizing: border-box !important;
}

#sa11y-update {
  padding: 15px 80px 15px 15px;
}

div {
  display: block;
}

h2 {
  display: block;
  font-size: 22px;
  font-weight: bold;
}
h3 {
  margin-top: 5px;
  display: block;
  font-size: 19px;
  font-weight: bold;
}
p {
  display: block;
  font-size: 17px;
}
a {
  display: inline-block;
  font-size: 22px;
  margin-top: 15px;
  margin-bottom: 15px;
  padding: 8px 12px;
  background-color: #0a2051;
  color: #fff;
  border-radius: 5px;
  cursor: pointer;
}
a:hover, a:focus {
  background-color: #0f3a9a;
  outline: -webkit-focus-ring-color auto 2px;
}

#sa11y-csp-close {
  position: absolute; top: 10px; right: 10px; padding: 5px 10px; background-color: rgb(246, 246, 246); border: 2px solid rgb(148, 148, 148); border-radius: 5px; cursor: pointer; font-size: 15px;
}
#sa11y-csp-close:focus {
  outline: -webkit-focus-ring-color auto 2px;
}`;

const newBookmarklet = `
javascript:(function(){
  const sa11yDialog = document.getElementById(&quot;sa11y-csp&quot;);
  const sa11yScripts = document.querySelectorAll(&quot;script[src*='sa11y']&quot;);

  const createAlert = (message) => {
    const sa11yDialog = document.createElement(&quot;div&quot;);
    sa11yDialog.id = &quot;sa11y-csp&quot;;
    sa11yDialog.role = &quot;dialog&quot;;
    sa11yDialog.textContent = message;
    sa11yDialog.style.position = &quot;fixed&quot;;
    sa11yDialog.style.display = &quot;block&quot;;
    sa11yDialog.style.bottom = &quot;50px&quot;;
    sa11yDialog.style.right = &quot;50px&quot;;
    sa11yDialog.style.margin = &quot;auto 0&quot;;
    sa11yDialog.style.width = &quot;400px&quot;;
    sa11yDialog.style.zIndex = &quot;10000&quot;;
    sa11yDialog.style.padding = &quot;10px 80px 10px 10px&quot;;
    sa11yDialog.style.backgroundColor = &quot;#fff&quot;;
    sa11yDialog.style.border = &quot;5px solid #ff0000&quot;;
    sa11yDialog.style.fontWeight = &quot;bold&quot;;
    sa11yDialog.style.fontSize = &quot;17px&quot;;
    sa11yDialog.style.fontFamily = &quot;system-ui, sans-serif&quot;;
    sa11yDialog.style.boxShadow = &quot;0 0 20px 4px rgba(154,161,177,.15),0 4px 80px -8px rgba(36,40,47,.25),0 4px 4px -2px
    rgba(91,94,105,.15)&quot;;
    sa11yDialog.style.borderRadius = &quot;5px&quot;;
    sa11yDialog.setAttribute(&quot;role&quot;, &quot;alert&quot;);
    document.body.appendChild(sa11yDialog);

    const closeButton = document.createElement(&quot;button&quot;);
    closeButton.id = &quot;csp-close&quot;;
    closeButton.textContent = &quot;Close&quot;;
    closeButton.style.position = &quot;absolute&quot;;
    closeButton.style.top = &quot;10px&quot;;
    closeButton.style.color = &quot;#000&quot;;
    closeButton.style.right = &quot;10px&quot;;
    closeButton.style.padding = &quot;5px 10px&quot;;
    closeButton.style.backgroundColor = &quot;#f6f6f6&quot;;
    closeButton.style.border = &quot;2px solid #949494&quot;;
    closeButton.style.borderRadius = &quot;5px&quot;;
    closeButton.style.cursor = &quot;pointer&quot;;
    closeButton.style.fontSize = &quot;15px&quot;;
    sa11yDialog.appendChild(closeButton);

    closeButton.addEventListener(&quot;click&quot;, () => {
      sa11yDialog.remove();
    });

    const close = document.getElementById(&quot;csp-close&quot;);
    setTimeout(() => close.focus(), 300);

    document.addEventListener(&quot;keyup&quot;, (event) => {
      if (event.key === 'Escape') {
      sa11yDialog.remove();
      }
    });
  };

  const securityListener = () => {
    if (typeof sa11y === 'undefined') {
      createAlert('This website has a security policy that prevents Sa11y from working on its pages. Press Escape to dismiss this message.');
    }
  };

  const url = window.location.href;
  if (url.includes('bookmarklet') && url.includes('sa11y')) {
    createAlert('Drag the &quot;Sa11y&quot; button into your bookmarks bar. Then click the bookmark on any webpage.');
  } else if (sa11yDialog == null && sa11yScripts.length === 0) {
    const inject = document.createElement(&quot;script&quot;);
    inject.src = &quot;https://cdn.jsdelivr.net/gh/ryersondmp/sa11y@latest/bookmarklet/v2.js&quot;;
    document.body.appendChild(inject);
  } else {
    location.reload();
  }

  document.addEventListener(&quot;securitypolicyviolation&quot;, securityListener);
  setTimeout(() => document.removeEventListener(&quot;securitypolicyviolation&quot;, securityListener), 100);
})();
`;

export function loadSa11y(langCode, message) {
  const createAlert = (language) => {
    const dialog = document.createElement('div');
    dialog.id = 'sa11y-csp';
    dialog.lang = langCode;
    dialog.setAttribute('role', 'alert');
    const shadowRoot = dialog.attachShadow({ mode: 'open' });

    // Styles
    const style = document.createElement('style');
    style.innerHTML = styles;
    shadowRoot.appendChild(style);

    // Close button for dialog.
    const closeButton = document.createElement('button');
    closeButton.id = 'sa11y-csp-close';
    closeButton.textContent = language.close;
    shadowRoot.appendChild(closeButton);

    // Set focus on close button.
    setTimeout(() => {
      const close = shadowRoot.getElementById('sa11y-csp-close');
      close.focus();
    }, 300);

    // Remove existing Sa11y scripts from page upon dismissal of modal.
    const sa11yScripts = document.querySelectorAll('script[src*="sa11y"]');
    const removeScripts = () => { sa11yScripts.forEach((script) => script.remove()); };

    // Upon click delete pop-up and remove all scripts.
    closeButton.addEventListener('click', () => {
      dialog.remove();
      removeScripts();
    });

    // On escape delete pop-up and remove all scripts.
    shadowRoot.addEventListener('keyup', (event) => {
      if (event.key === 'Escape') {
        dialog.remove();
        removeScripts();
      }
    });

    // Set dialog content.
    const content = document.createElement('div');
    content.id = 'sa11y-update';
    content.innerHTML = `
      <h2>${language.heading}</h2>
      <p>${language.message}</p>
      <p><a href="${newBookmarklet}">Sa11y</a></p>
      <h2>${language.features}</h2>
      <h3>${language.a}</h3>
      <p>${language.aContent}</p>
      <h3>${language.b}</h3>
      <p>${language.bContent}</p>
    `;
    shadowRoot.appendChild(content);

    // Add dialog to end of page.
    document.body.appendChild(dialog);
  };
  createAlert(message);
}
