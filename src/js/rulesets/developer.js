import { computeAccessibleName } from '../utils/computeAccessibleName';
import Constants from '../utils/constants';
import Elements from '../utils/elements';
import Lang from '../utils/lang';
import * as Utils from '../utils/utils';
import { State } from '../core/state';

export default function checkDeveloper() {
  /* *************************************************************** */
  /*  Error: Missing or invalid language tag.                        */
  /* *************************************************************** */
  const report = (key, ...args) => {
    const rule = State.option.checks[key];
    if (!rule) return;
    State.results.push({
      test: key,
      type: rule.type || 'error',
      content: Lang.sprintf(rule.content || key, ...args),
      dismiss: Utils.prepareDismissal(key),
      developer: rule.developer || true,
    });
  };

  // 1. Check if missing.
  if (!Elements.Found.Language) {
    report('META_LANG');
  } else {
    const { valid, suggest } = Utils.validateLang(Elements.Found.Language, Lang._('LANG_CODE'));
    if (!valid) {
      // 2. Suggest valid (en_us to en-us).
      if (suggest) {
        report('META_LANG_SUGGEST', Elements.Found.Language, suggest);
      } else {
        // 3. Not valid at all.
        report('META_LANG_VALID', Elements.Found.Language);
      }
    }
  }

  /* *************************************************************** */
  /*  Check for missing meta page title <title>                      */
  /* *************************************************************** */
  if (State.option.checks.META_TITLE) {
    const metaTitle = document.querySelector('title:not(svg title)');
    if (!metaTitle || metaTitle.textContent.trim().length === 0) {
      State.results.push({
        test: 'META_TITLE',
        type: State.option.checks.META_TITLE.type || 'error',
        content: Lang.sprintf(State.option.checks.META_TITLE.content || 'META_TITLE'),
        dismiss: Utils.prepareDismissal('META_TITLE'),
        developer: State.option.checks.META_TITLE.developer || true,
      });
    }
  }

  /* ********************************************* */
  /*  Zooming and scaling must not be disabled.    */
  /* ********************************************* */
  if (State.option.checks.META_SCALABLE || State.option.checks.META_MAX) {
    const metaViewport = document.querySelector('meta[name="viewport"]');
    if (metaViewport) {
      const content = metaViewport.getAttribute('content');
      if (content) {
        // Parse the content attribute to extract parameters.
        const params = content.split(',').reduce((acc, param) => {
          const [key, value] = param.split('=').map((s) => s.trim());
          acc[key] = value;
          return acc;
        }, {});

        // Check for user-scalable parameter.
        if (
          State.option.checks.META_SCALABLE &&
          (params['user-scalable'] === 'no' || params['user-scalable'] === '0')
        ) {
          State.results.push({
            test: 'META_SCALABLE',
            type: State.option.checks.META_SCALABLE.type || 'error',
            content: Lang.sprintf(State.option.checks.META_SCALABLE.content || 'META_SCALABLE'),
            dismiss: Utils.prepareDismissal('META_SCALABLE'),
            developer: State.option.checks.META_SCALABLE.developer || true,
          });
        }

        // Check maximum-scale parameter.
        const maxScale = parseFloat(params['maximum-scale']);
        if (State.option.checks.META_MAX && !Number.isNaN(maxScale) && maxScale < 2) {
          State.results.push({
            test: 'META_MAX',
            type: State.option.checks.META_MAX.type || 'error',
            content: Lang.sprintf(State.option.checks.META_MAX.content || 'META_MAX'),
            dismiss: Utils.prepareDismissal('META_MAX'),
            developer: State.option.checks.META_MAX.developer || true,
          });
        }
      }
    }
  }

  /* ****************************************** */
  /*  Page shouldn't automatically refresh.     */
  /* ****************************************** */
  if (State.option.checks.META_REFRESH) {
    const metaRefresh = document.querySelector('meta[http-equiv="refresh"]');
    if (metaRefresh) {
      State.results.push({
        test: 'META_REFRESH',
        type: State.option.checks.META_REFRESH.type || 'error',
        content: Lang.sprintf(State.option.checks.META_REFRESH.content || 'META_REFRESH'),
        dismiss: Utils.prepareDismissal('META_REFRESH'),
        developer: State.option.checks.META_REFRESH.developer || true,
      });
    }
  }

  /* *************************************************************** */
  /*  Check for duplicate IDs that are referenced by other elements. */
  /* *************************************************************** */
  if (State.option.checks.DUPLICATE_ID) {
    // Look for duplicate IDs within each DOM.
    const doms = document.querySelectorAll('body, [data-sa11y-has-shadow-root]');
    doms.forEach((dom) => {
      const allIds = new Set();
      const findDuplicateIds = (ids, withinDOM) => {
        ids.forEach(($el) => {
          const { id } = $el;

          // Ignore empty IDs.
          if (typeof id !== 'string' || id.trim().length === 0) {
            return;
          }

          // Only flag duplicate IDs being referenced by same-page links, aria or a label.
          // Reference: https://accessibilityinsights.io/info-examples/web/duplicate-id-aria/
          if (id && !allIds.has(id)) {
            allIds.add(id);
          } else {
            const ariaReference = Array.from(
              withinDOM.querySelectorAll(`
                a[href*="${id}"],
                label[for*="${id}"],
                [aria-labelledby*="${id}"],
                [aria-controls*="${id}"],
                [aria-owns*="${id}"]`),
            );
            if (ariaReference.length > 0) {
              State.results.push({
                test: 'DUPLICATE_ID',
                element: $el,
                type: State.option.checks.DUPLICATE_ID.type || 'error',
                content: Lang.sprintf(
                  State.option.checks.DUPLICATE_ID.content || 'DUPLICATE_ID',
                  id,
                ),
                dismiss: Utils.prepareDismissal(`DUPLICATE_ID ${id}${$el.textContent}`),
                dismissAll: State.option.checks.DUPLICATE_ID.dismissAll ? 'DUPLICATE_ID' : false,
                developer: State.option.checks.DUPLICATE_ID.developer || true,
              });
            }
          }
        });
      };

      // Look for duplicate IDs within shadow DOMs.
      if (dom.shadowRoot) {
        const shadowRootIds = Array.from(
          dom.shadowRoot.querySelectorAll(`[id]:not(${Constants.Exclusions.Container})`),
        );
        findDuplicateIds(shadowRootIds, dom.shadowRoot);
      }

      // Look for duplicates IDs in document body.
      const regularIds = Array.from(
        dom.querySelectorAll(`[id]:not(${Constants.Exclusions.Container})`),
      );
      findDuplicateIds(regularIds, dom);
    });
  }

  /* ********************************************* */
  /*  Buttons must have an accessible name.        */
  /* ********************************************* */
  if (
    State.option.checks.BTN_EMPTY ||
    State.option.checks.BTN_EMPTY_LABELLEDBY ||
    State.option.checks.BTN_LABEL ||
    State.option.checks.HIDDEN_FOCUSABLE ||
    State.option.checks.LABEL_IN_NAME
  ) {
    Elements.Found.Buttons.forEach(($el) => {
      const accName = computeAccessibleName($el);
      const buttonText = accName.replace(/'|"|-|\.|\s+/g, '').toLowerCase();

      // Has ARIA
      const hasAria =
        $el.querySelector(':scope [aria-labelledby], :scope [aria-label]') ||
        $el.getAttribute('aria-labelledby') ||
        $el.getAttribute('aria-label');
      const hasAriaLabelledby =
        $el.querySelector(':scope [aria-labelledby]') || $el.getAttribute('aria-labelledby');
      const ariaHidden = $el.getAttribute('aria-hidden') === 'true';
      const negativeTabindex = $el.getAttribute('tabindex') === '-1';

      // Button has aria-hidden but is still focusable.
      if (ariaHidden) {
        if (!negativeTabindex) {
          if (State.option.checks.HIDDEN_FOCUSABLE) {
            State.results.push({
              test: 'HIDDEN_FOCUSABLE',
              element: $el,
              type: State.option.checks.HIDDEN_FOCUSABLE.type || 'error',
              content: Lang.sprintf(
                State.option.checks.HIDDEN_FOCUSABLE.content || 'HIDDEN_FOCUSABLE',
              ),
              dismiss: Utils.prepareDismissal(
                `HIDDEN_FOCUSABLE ${$el.tagName + $el.id + $el.className + accName}`,
              ),
              dismissAll: State.option.checks.HIDDEN_FOCUSABLE.dismissAll
                ? 'BTN_HIDDEN_FOCUSABLE'
                : false,
              developer: State.option.checks.HIDDEN_FOCUSABLE.developer || true,
            });
          }
        }
        return;
      }

      // Button doesn't have an accessible name.
      if (buttonText.length === 0) {
        if (State.option.checks.BTN_EMPTY_LABELLEDBY && hasAriaLabelledby) {
          State.results.push({
            test: 'BTN_EMPTY_LABELLEDBY',
            element: $el,
            type: State.option.checks.BTN_EMPTY_LABELLEDBY.type || 'error',
            content: Lang.sprintf(
              State.option.checks.BTN_EMPTY_LABELLEDBY.content ||
              Lang._('BTN_EMPTY_LABELLEDBY') + Lang._('BTN_TIP'),
            ),
            dismiss: Utils.prepareDismissal(
              `BTN_EMPTY_LABELLEDBY ${$el.tagName + $el.id + $el.className + accName}`,
            ),
            dismissAll: State.option.checks.BTN_EMPTY_LABELLEDBY.dismissAll
              ? 'BTN_EMPTY_LABELLEDBY'
              : false,
            developer: State.option.checks.BTN_EMPTY_LABELLEDBY.developer || true,
          });
        } else if (State.option.checks.BTN_EMPTY) {
          State.results.push({
            test: 'BTN_EMPTY',
            element: $el,
            type: State.option.checks.BTN_EMPTY.type || 'error',
            content: Lang.sprintf(State.option.checks.BTN_EMPTY.content
              || Lang._('BTN_EMPTY') + Lang._('BTN_TIP')),
            dismiss: Utils.prepareDismissal(
              `BTN_EMPTY ${$el.tagName + $el.id + $el.className + accName}`,
            ),
            dismissAll: State.option.checks.BTN_EMPTY.dismissAll ? 'BTN_EMPTY' : false,
            developer: State.option.checks.BTN_EMPTY.developer || true,
          });
        }
        return;
      }

      /* Button must have visible label as part of their accessible name. */
      const isVisibleTextInAccName = Utils.isVisibleTextInAccName($el, accName);
      if (State.option.checks.LABEL_IN_NAME && hasAria && isVisibleTextInAccName) {
        const escapedText = Utils.escapeHTML(accName);
        State.results.push({
          test: 'LABEL_IN_NAME',
          element: $el,
          type: State.option.checks.LABEL_IN_NAME.type || 'warning',
          content: State.option.checks.LABEL_IN_NAME.content
            ? Lang.sprintf(State.option.checks.LABEL_IN_NAME.content, escapedText)
            : Lang.sprintf(
              Lang._('LABEL_IN_NAME') + Lang._('ACC_NAME_TIP'), escapedText
            ),
          dismiss: Utils.prepareDismissal(
            `LABEL_IN_NAME ${$el.tagName + $el.id + $el.className + accName}`,
          ),
          dismissAll: State.option.checks.LABEL_IN_NAME.dismissAll ? 'BTN_LABEL_IN_NAME' : false,
          developer: State.option.checks.LABEL_IN_NAME.developer || true,
        });
        return;
      }

      // Has "button" in the accessible name.
      if (State.option.checks.BTN_ROLE_IN_NAME && accName.includes(Lang._('BTN'))) {
        State.results.push({
          test: 'BTN_ROLE_IN_NAME',
          element: $el,
          type: State.option.checks.BTN_ROLE_IN_NAME.type || 'warning',
          content: Lang.sprintf(
            State.option.checks.BTN_ROLE_IN_NAME.content ||
            Lang._('BTN_ROLE_IN_NAME') + Lang._('BTN_TIP'),
          ),
          dismiss: Utils.prepareDismissal(
            `BTN_ROLE_IN_NAME ${$el.tagName + $el.id + $el.className + accName}`,
          ),
          dismissAll: State.option.checks.BTN_ROLE_IN_NAME.dismissAll ? 'BTN_ROLE_IN_NAME' : false,
          developer: State.option.checks.BTN_ROLE_IN_NAME.developer || true,
        });
      }
    });
  }

  /* ********************************************************** */
  /* <li> elements must be contained in a <ul>/<ol>/<menu>.     */
  /* ********************************************************** */
  if (State.option.checks.UNCONTAINED_LI) {
    Elements.Found.Lists.forEach(($el) => {
      if (!$el.closest('ul, ol, menu')) {
        State.results.push({
          test: 'UNCONTAINED_LI',
          element: $el,
          type: State.option.checks.UNCONTAINED_LI.type || 'error',
          content: Lang.sprintf(State.option.checks.UNCONTAINED_LI.content || 'UNCONTAINED_LI'),
          dismiss: Utils.prepareDismissal(`UNCONTAINED_LI ${$el.textContent}`),
          dismissAll: State.option.checks.UNCONTAINED_LI.dismissAll ? 'UNCONTAINED_LI' : false,
          developer: State.option.checks.UNCONTAINED_LI.developer || true,
        });
      }
    });
  }

  /* ****************************************** */
  /*  No tabindex values greater than 0.        */
  /* ****************************************** */
  if (State.option.checks.TABINDEX_ATTR) {
    Elements.Found.TabIndex.forEach(($el) => {
      State.results.push({
        test: 'TABINDEX_ATTR',
        element: $el,
        type: State.option.checks.TABINDEX_ATTR.type || 'error',
        content: Lang.sprintf(State.option.checks.TABINDEX_ATTR.content || 'TABINDEX_ATTR'),
        dismiss: Utils.prepareDismissal(`TABINDEX_ATTR ${$el.tagName + $el.id + $el.className}`),
        dismissAll: State.option.checks.TABINDEX_ATTR.dismissAll ? 'TABINDEX_ATTR' : false,
        developer: State.option.checks.TABINDEX_ATTR.developer || true,
      });
    });
  }

  return State.results;
}
