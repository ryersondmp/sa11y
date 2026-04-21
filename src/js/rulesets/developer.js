/** biome-ignore-all lint/complexity/noUselessEscapeInRegex: Ignore. */
import { computeAccessibleName } from '../utils/computeAccessibleName';
import Constants from '../utils/constants';
import Elements from '../utils/elements';
import Lang from '../utils/lang';
import * as Utils from '../utils/utils';
import { State } from '../core/state';
import { pushResult } from '../utils/pushResult';

export default function checkDeveloper() {
  /* *************************************************************** */
  /* Error: Missing or invalid language tag.                        */
  /* *************************************************************** */
  if (!Elements.Found.Language) {
    pushResult({ test: 'META_LANG' });
  } else {
    const { valid, suggest } = Utils.validateLang(Elements.Found.Language, Lang._('LANG_CODE'));
    if (!valid) {
      if (suggest) {
        pushResult({
          test: 'META_LANG_SUGGEST',
          args: [Elements.Found.Language, suggest],
          developer: true,
        });
      } else {
        pushResult({
          test: 'META_LANG_VALID',
          args: ['html', Elements.Found.Language],
          developer: true,
        });
      }
    }
  }

  // Validate all [lang] attributes on the page.
  if (Elements.Found.LangTags?.length > 0) {
    Elements.Found.LangTags.forEach(($el) => {
      const langValue = $el.getAttribute('lang')?.trim();
      const { valid, suggest } = Utils.validateLang(langValue, Lang._('LANG_CODE'));
      if (!valid) {
        const text =
          $el.tagName === 'IMG'
            ? $el.getAttribute('alt') || ''
            : $el.nodeType === 3
              ? Utils.getText($el)
              : '';
        if (suggest) {
          pushResult({
            test: 'META_LANG_SUGGEST',
            element: $el,
            args: [langValue, suggest],
            developer: true,
            dismiss: langValue + text,
          });
        } else {
          pushResult({
            test: 'META_LANG_VALID',
            element: $el,
            args: [$el.tagName.toLowerCase(), langValue],
            developer: true,
            dismiss: langValue + text,
          });
        }
      }
    });
  }

  /* *************************************************************** */
  /*  Check for missing meta page title <title>                      */
  /* *************************************************************** */
  const metaTitle = document.querySelector('title:not(svg title)');
  if (!metaTitle || Utils.getText(metaTitle).length === 0) {
    pushResult({ test: 'META_TITLE', developer: true });
  }

  /* ********************************************* */
  /*  Zooming and scaling must not be disabled.    */
  /* ********************************************* */
  const content = document.querySelector('meta[name="viewport"]')?.getAttribute('content');
  if (content) {
    // Parse the content attribute to extract parameters.
    const params = content.split(',').reduce((acc, param) => {
      const [key, value] = param.split('=').map((s) => s.trim());
      acc[key] = value;
      return acc;
    }, {});

    // Check for user-scalable parameter.
    if (['no', '0'].includes(params['user-scalable'])) {
      pushResult({ test: 'META_SCALABLE', developer: true });
    }

    // Check maximum-scale parameter.
    const maxScale = parseFloat(params['maximum-scale']);
    if (!Number.isNaN(maxScale) && maxScale < 2) {
      pushResult({ test: 'META_MAX', developer: true });
    }
  }

  /* ****************************************** */
  /*  Page shouldn't automatically refresh.     */
  /* ****************************************** */
  const actuallyRefreshes = Array.from(
    document.querySelectorAll('meta[http-equiv="refresh" i]'),
  ).some((tag) => parseInt(tag.getAttribute('content'), 10) > 0);
  if (actuallyRefreshes) {
    pushResult({ test: 'META_REFRESH', developer: true });
  }

  /* *************************************************************** */
  /*  Check for duplicate IDs that are referenced by other elements. */
  /* *************************************************************** */
  if (State.option.checks.DUPLICATE_ID) {
    document.querySelectorAll('body, [data-sa11y-has-shadow-root]').forEach((dom) => {
      const allIds = new Set();
      const findDuplicateIds = (ids, withinDOM) => {
        ids.forEach(($el) => {
          const { id } = $el;
          if (typeof id !== 'string' || id.trim().length === 0) return;
          if (!allIds.has(id)) {
            allIds.add(id);
          } else {
            const ariaReference = Array.from(
              withinDOM.querySelectorAll(
                `a[href*="${id}"], label[for*="${id}"], [aria-labelledby*="${id}"], [aria-controls*="${id}"], [aria-owns*="${id}"]`,
              ),
            );
            if (ariaReference.length > 0) {
              pushResult({
                test: 'DUPLICATE_ID',
                element: $el,
                args: [id],
                dismiss: `${id}${$el.textContent}`,
                developer: true,
              });
            }
          }
        });
      };

      if (dom.shadowRoot) {
        const shadowRootIds = Array.from(
          dom.shadowRoot.querySelectorAll(`[id]:not(${Constants.Exclusions.Container})`),
        );
        findDuplicateIds(shadowRootIds, dom.shadowRoot);
      }
      const regularIds = Array.from(
        dom.querySelectorAll(`[id]:not(${Constants.Exclusions.Container})`),
      );
      findDuplicateIds(regularIds, dom);
    });
  }

  /* ********************************************* */
  /*  Buttons must have an accessible name.        */
  /* ********************************************* */
  Elements.Found.Buttons.forEach(($el) => {
    // Ignore explicitly hidden.
    const presentation = Utils.isPresentational($el) && Utils.isDisabled($el);
    if (presentation || Utils.isHiddenAndUnfocusable($el) || Utils.isElementHidden($el)) return;

    // Has ARIA.
    const accName = computeAccessibleName($el);
    const buttonText = accName.replace(/['"-\.\s]+/g, '').toLowerCase();
    const textContent = Utils.getText($el);
    const dismissBase = $el.tagName + $el.id + $el.className;
    const hasAria =
      $el.querySelector(':scope [aria-labelledby], :scope [aria-label]') ||
      $el.getAttribute('aria-labelledby') ||
      $el.getAttribute('aria-label');
    const hasAriaLabelledby =
      $el.querySelector(':scope [aria-labelledby]') || $el.getAttribute('aria-labelledby');

    // Button doesn't have an accessible name.
    if (buttonText.length === 0) {
      if (hasAriaLabelledby) {
        pushResult({
          test: 'BTN_EMPTY_LABELLEDBY',
          element: $el,
          content: Lang._('BTN_EMPTY_LABELLEDBY') + Lang._('BTN_TIP'),
          dismiss: dismissBase + accName,
          developer: true,
        });
      } else {
        pushResult({
          test: 'BTN_EMPTY',
          element: $el,
          content: Lang._('BTN_EMPTY') + Lang._('BTN_TIP'),
          dismiss: dismissBase,
          developer: true,
        });
      }
      return;
    }

    // Button must have visible label as part of their accessible name.
    const isVisibleTextInAccName = Utils.isVisibleTextInAccName($el, accName);
    if (hasAria && isVisibleTextInAccName) {
      pushResult({
        test: 'LABEL_IN_NAME',
        element: $el,
        type: 'warning',
        args: [textContent, accName],
        content: Lang._('LABEL_IN_NAME') + Lang._('ACC_NAME_TIP'),
        dismiss: dismissBase + accName,
        developer: true,
      });
      return;
    }

    // Has "button" in the accessible name.
    if (accName.includes(Lang._('BTN'))) {
      pushResult({
        test: 'BTN_ROLE_IN_NAME',
        element: $el,
        type: 'warning',
        args: [accName],
        content: Lang._('BTN_ROLE_IN_NAME') + Lang._('ACC_NAME_TIP') + Lang._('BTN_TIP'),
        dismiss: dismissBase + accName,
        developer: true,
      });
    }
  });

  /* ********************************************************** */
  /* <li> elements must be contained in a <ul>/<ol>/<menu>.     */
  /* ********************************************************** */
  Elements.Found.Lists.forEach(($el) => {
    if (!Utils.getCachedClosest($el, 'ul, ol, menu')) {
      const text = Utils.getText($el);
      pushResult({
        test: 'UNCONTAINED_LI',
        element: $el,
        args: [text],
        dismiss: text,
        developer: true,
      });
    }
  });

  /* ****************************************** */
  /*  No tabindex values greater than 0.        */
  /* ****************************************** */
  Elements.Found.TabIndex.forEach(($el) => {
    if ($el.tabIndex > 0) {
      pushResult({
        test: 'TABINDEX_ATTR',
        element: $el,
        dismiss: $el.tagName + $el.id + $el.className,
        developer: true,
      });
    }
  });

  /* *************************************************************** */
  /* Error: Focusable content hidden from screen readers.            */
  /* *************************************************************** */
  const flaggedForAriaHidden = new Set();
  Elements.Found.Focusable.forEach(($el) => {
    if (
      flaggedForAriaHidden.has($el) ||
      Utils.isDisabled($el) ||
      Utils.isNegativeTabindex($el) ||
      Utils.isElementHidden($el)
    ) {
      return;
    }

    const ariaHiddenContainer = Utils.getCachedClosest($el, '[aria-hidden="true"]');
    if (ariaHiddenContainer) {
      // Only push error if container is not hidden.
      const isContainerHidden = Utils.isElementHidden(ariaHiddenContainer);
      if (!isContainerHidden) {
        pushResult({
          test: 'HIDDEN_FOCUSABLE',
          element: $el,
          args: [Utils.truncateString($el.outerHTML, 100)],
          dismiss: $el.tagName + $el.id + $el.className,
          developer: true,
          margin: '0',
        });
        flaggedForAriaHidden.add($el);
      }
    }
  });
}
