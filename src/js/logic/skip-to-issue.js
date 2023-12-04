import * as Utils from '../utils/utils';
import find from '../utils/find';
import Lang from '../utils/lang';
import Constants from '../utils/constants';
import Elements from '../utils/elements';

/* ************************************************************ */
/*  Skip to Issue button logic within panel.                    */
/* ************************************************************ */

// When annotations are hidden and tooltip message is displayed in control panel, the previous visible tooltip remains. Function is called during getHiddenParent();
const closeAnyActiveTooltips = () => {
  const tooltip = document.querySelector('sa11y-tooltips').shadowRoot;
  const button = tooltip.querySelector('button');
  if (button !== null) button.click();
};

// Find the most visible parent of an annotation.
const getHiddenParent = ($el) => {
  const shadowHost = $el.getRootNode().host;
  const visibleParent = Utils.findVisibleParent(shadowHost, 'display', 'none');
  if (visibleParent !== null) {
    const hiddenParent = visibleParent.previousElementSibling;
    if (hiddenParent) {
      Utils.addPulse(hiddenParent);
    } else {
      Utils.addPulse(visibleParent.parentNode);
    }
  }
};

// Find scroll position.
const getScrollPosition = ($el) => {
  const offsetTopPosition = $el.offsetTop;
  if (offsetTopPosition === 0) {
    const shadowParent = $el.getRootNode().host;
    const visiblePosition = Utils.findVisibleParent(shadowParent, 'display', 'none');

    // Alert if tooltip is hidden.
    getHiddenParent($el);
    const tooltip = $el.getAttribute('data-tippy-content');
    Utils.createAlert(`${Lang._('NOT_VISIBLE_ALERT')}`, tooltip);

    closeAnyActiveTooltips();

    // Get as close to the hidden parent as possible.
    if (visiblePosition) {
      const prevSibling = visiblePosition.previousElementSibling;
      const { parentNode } = visiblePosition;
      if (prevSibling) {
        return Utils.offsetTop(prevSibling).top - 150;
      }
      return Utils.offsetTop(parentNode).top - 150;
    }
  } else {
    Utils.removeAlert();
    Constants.Panel.skipButton.focus();
  }
  return Utils.offsetTop($el).top - 150;
};

let index = -1;

const determineIndex = () => {
  // Index of last dismissed item.
  const latestDismissed = Utils.store.getItem('sa11y-latest-dismissed');
  if (latestDismissed !== null) index = parseInt(latestDismissed, 10) - 1;
  Utils.store.removeItem('sa11y-latest-dismissed');

  // Index of last opened tooltip.
  const opened = find('[data-sa11y-opened]', 'root');
  if (opened[0]) index = parseInt(opened[0].getAttribute('data-sa11y-position'), 10);
};

const goToNext = () => {
  determineIndex();
  const issues = Elements.Annotations.Array;

  // Go back to first issue.
  if (index >= issues.length - 1) index = -1;

  const annotation = issues[index + 1];
  const button = annotation.shadowRoot.querySelector('button');
  const scrollPos = getScrollPosition(button);

  window.scrollTo({
    top: scrollPos,
    behavior: `${Constants.Global.scrollBehaviour}`,
  });

  if (button.offsetTop !== 0) {
    button.focus();
    button.click();
  }

  // Increase position by 1.
  index += 1;
};

const goToPrev = () => {
  determineIndex();
  if (index > 0) {
    const button = Elements.Annotations.Array[index - 1].shadowRoot.querySelector('button');
    const scrollPos = getScrollPosition(button);

    window.scrollTo({
      top: scrollPos,
      behavior: `${Constants.Global.scrollBehaviour}`,
    });

    if (button.offsetTop !== 0) {
      button.focus();
      button.click();
    }

    // Decrease position by 1
    index -= 1;

    // If index is -1, it means that it cycled back to the first annotation. This is needed for when user wants to go to previous annotation from the very last annotation on the page.
    if (index === -1) index = Elements.Annotations.Array.length - 1;
  }
};

function keyboardShortcut(e) {
  if (
    Elements.Annotations.Array.length
    && !Constants.Panel.skipButton.hasAttribute('disabled')
  ) {
    if (e.altKey && e.code === 'KeyS') {
      e.preventDefault();
      goToNext();
    } else if (e.altKey && e.code === 'KeyW') {
      e.preventDefault();
      goToPrev();
    }
  }
}

function handleSkipButton() {
  goToNext();
}

const keyboardShortcutHandler = (event) => keyboardShortcut(event);
const handleSkipButtonHandler = (event) => handleSkipButton(event);

export function skipToIssue() {
  // Attach keyboard and click event listeners.
  document.addEventListener('keydown', keyboardShortcutHandler);
  Constants.Panel.skipButton.addEventListener('click', handleSkipButtonHandler);
}

// Imported by reset.js
export function removeSkipBtnListeners() {
  document.removeEventListener('keydown', keyboardShortcutHandler);
  Constants.Panel.skipButton.removeEventListener('click', handleSkipButtonHandler);
}
