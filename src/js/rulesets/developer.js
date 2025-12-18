import { computeAccessibleName } from '../utils/computeAccessibleName';
import Constants from '../utils/constants';
import Elements from '../utils/elements';
import Lang from '../utils/lang';
import * as Utils from '../utils/utils';

export default function checkDeveloper(results, option) {
  /* *************************************************************** */
  /*  Error: Missing language tag. Lang should be at least 2 chars.  */
  /* *************************************************************** */
  if (option.checks.META_LANG) {
    if (!Elements.Found.Language || Elements.Found.Language.length < 2) {
      results.push({
        test: 'META_LANG',
        type: option.checks.META_LANG.type || 'error',
        content: Lang.sprintf(option.checks.META_LANG.content || 'META_LANG'),
        dismiss: Utils.prepareDismissal('LANG'),
        developer: option.checks.META_LANG.developer || true,
      });
    }
  }

  /* *************************************************************** */
  /*  Check for missing meta page title <title>                      */
  /* *************************************************************** */
  if (option.checks.META_TITLE) {
    const metaTitle = document.querySelector('title:not(svg title)');
    if (!metaTitle || metaTitle.textContent.trim().length === 0) {
      results.push({
        test: 'META_TITLE',
        type: option.checks.META_TITLE.type || 'error',
        content: Lang.sprintf(option.checks.META_TITLE.content || 'META_TITLE'),
        dismiss: Utils.prepareDismissal('TITLE'),
        developer: option.checks.META_TITLE.developer || true,
      });
    }
  }

  /* ********************************************* */
  /*  Zooming and scaling must not be disabled.    */
  /* ********************************************* */
  if (option.checks.META_SCALABLE || option.checks.META_MAX) {
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
          option.checks.META_SCALABLE &&
          (params['user-scalable'] === 'no' || params['user-scalable'] === '0')
        ) {
          results.push({
            test: 'META_SCALABLE',
            type: option.checks.META_SCALABLE.type || 'error',
            content: Lang.sprintf(option.checks.META_SCALABLE.content || 'META_SCALABLE'),
            dismiss: Utils.prepareDismissal('SCALABLE'),
            developer: option.checks.META_SCALABLE.developer || true,
          });
        }

        // Check maximum-scale parameter.
        const maxScale = parseFloat(params['maximum-scale']);
        if (option.checks.META_MAX && !Number.isNaN(maxScale) && maxScale < 2) {
          results.push({
            test: 'META_MAX',
            type: option.checks.META_MAX.type || 'error',
            content: Lang.sprintf(option.checks.META_MAX.content || 'META_MAX'),
            dismiss: Utils.prepareDismissal('MAXSCALE'),
            developer: option.checks.META_MAX.developer || true,
          });
        }
      }
    }
  }

  /* ****************************************** */
  /*  Page shouldn't automatically refresh.     */
  /* ****************************************** */
  if (option.checks.META_REFRESH) {
    const metaRefresh = document.querySelector('meta[http-equiv="refresh"]');
    if (metaRefresh) {
      results.push({
        test: 'META_REFRESH',
        type: option.checks.META_REFRESH.type || 'error',
        content: Lang.sprintf(option.checks.META_REFRESH.content || 'META_REFRESH'),
        dismiss: Utils.prepareDismissal('REFRESH'),
        developer: option.checks.META_REFRESH.developer || true,
      });
    }
  }

  /* *************************************************************** */
  /*  Check for duplicate IDs that are referenced by other elements. */
  /* *************************************************************** */
  if (option.checks.DUPLICATE_ID) {
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
              results.push({
                test: 'DUPLICATE_ID',
                element: $el,
                type: option.checks.DUPLICATE_ID.type || 'error',
                content: Lang.sprintf(option.checks.DUPLICATE_ID.content || 'DUPLICATE_ID', id),
                dismiss: Utils.prepareDismissal(`DUPLICATEID${id}${$el.textContent}`),
                dismissAll: option.checks.DUPLICATE_ID.dismissAll ? 'DUPLICATE_ID' : false,
                developer: option.checks.DUPLICATE_ID.developer || true,
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
    option.checks.BTN_EMPTY ||
    option.checks.BTN_EMPTY_LABELLEDBY ||
    option.checks.BTN_LABEL ||
    option.checks.HIDDEN_FOCUSABLE ||
    option.checks.LABEL_IN_NAME
  ) {
    Elements.Found.Buttons.forEach(($el) => {
      const accName = computeAccessibleName($el);
      const buttonText = accName.replace(/'|"|-|\.|\s+/g, '').toLowerCase();

      // Dismissal key.
      const key = Utils.prepareDismissal(`BTN${$el.tagName + $el.id + $el.className + accName}`);

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
          if (option.checks.HIDDEN_FOCUSABLE) {
            results.push({
              test: 'HIDDEN_FOCUSABLE',
              element: $el,
              type: option.checks.HIDDEN_FOCUSABLE.type || 'error',
              content: Lang.sprintf(option.checks.HIDDEN_FOCUSABLE.content || 'HIDDEN_FOCUSABLE'),
              dismiss: key,
              dismissAll: option.checks.HIDDEN_FOCUSABLE.dismissAll
                ? 'BTN_HIDDEN_FOCUSABLE'
                : false,
              developer: option.checks.HIDDEN_FOCUSABLE.developer || true,
            });
          }
        }
        return;
      }

      // Button doesn't have an accessible name.
      if (buttonText.length === 0) {
        if (option.checks.BTN_EMPTY_LABELLEDBY && hasAriaLabelledby) {
          results.push({
            test: 'BTN_EMPTY_LABELLEDBY',
            element: $el,
            type: option.checks.BTN_EMPTY_LABELLEDBY.type || 'error',
            content: option.checks.BTN_EMPTY_LABELLEDBY.content
              ? Lang.sprintf(option.checks.BTN_EMPTY_LABELLEDBY.content)
              : `${Lang.sprintf('BTN_EMPTY_LABELLEDBY')} ${Lang.sprintf('BTN_TIP')}`,
            dismiss: Utils.prepareDismissal(key),
            dismissAll: option.checks.BTN_EMPTY_LABELLEDBY.dismissAll
              ? 'BTN_EMPTY_LABELLEDBY'
              : false,
            developer: option.checks.BTN_EMPTY_LABELLEDBY.developer || true,
          });
        } else if (option.checks.BTN_EMPTY) {
          results.push({
            test: 'BTN_EMPTY',
            element: $el,
            type: option.checks.BTN_EMPTY.type || 'error',
            content: option.checks.BTN_EMPTY.content
              ? Lang.sprintf(option.checks.BTN_EMPTY.content)
              : `${Lang.sprintf('BTN_EMPTY')} ${Lang.sprintf('BTN_TIP')}`,
            dismiss: key,
            dismissAll: option.checks.BTN_EMPTY.dismissAll ? 'BTN_EMPTY' : false,
            developer: option.checks.BTN_EMPTY.developer || true,
          });
        }
        return;
      }

      /* Button must have visible label as part of their accessible name. */
      const isVisibleTextInAccName = Utils.isVisibleTextInAccName($el, accName);
      if (option.checks.LABEL_IN_NAME && hasAria && isVisibleTextInAccName) {
        const sanitizedText = Utils.sanitizeHTML(accName);
        results.push({
          test: 'LABEL_IN_NAME',
          element: $el,
          type: option.checks.LABEL_IN_NAME.type || 'warning',
          content: option.checks.LABEL_IN_NAME.content
            ? Lang.sprintf(option.checks.LABEL_IN_NAME.content, sanitizedText)
            : `${Lang.sprintf('LABEL_IN_NAME', sanitizedText)} ${Lang.sprintf('ACC_NAME_TIP')}`,
          dismiss: key,
          dismissAll: option.checks.LABEL_IN_NAME.dismissAll ? 'BTN_LABEL_IN_NAME' : false,
          developer: option.checks.LABEL_IN_NAME.developer || true,
        });
        return;
      }

      // Has "button" in the accessible name.
      if (option.checks.BTN_ROLE_IN_NAME && accName.includes(Lang._('BTN'))) {
        results.push({
          test: 'BTN_ROLE_IN_NAME',
          element: $el,
          type: option.checks.BTN_ROLE_IN_NAME.type || 'warning',
          content: option.checks.BTN_ROLE_IN_NAME.content
            ? Lang.sprintf(option.checks.BTN_ROLE_IN_NAME.content)
            : `${Lang.sprintf('BTN_ROLE_IN_NAME')} ${Lang.sprintf('BTN_TIP')}`,
          dismiss: key,
          dismissAll: option.checks.BTN_ROLE_IN_NAME.dismissAll ? 'BTN_ROLE_IN_NAME' : false,
          developer: option.checks.BTN_ROLE_IN_NAME.developer || true,
        });
      }
    });
  }

  /* ********************************************************** */
  /* <li> elements must be contained in a <ul>/<ol>/<menu>.     */
  /* ********************************************************** */
  if (option.checks.UNCONTAINED_LI) {
    Elements.Found.Lists.forEach(($el) => {
      if (!$el.closest('ul, ol, menu')) {
        results.push({
          test: 'UNCONTAINED_LI',
          element: $el,
          type: option.checks.UNCONTAINED_LI.type || 'error',
          content: Lang.sprintf(option.checks.UNCONTAINED_LI.content || 'UNCONTAINED_LI'),
          dismiss: Utils.prepareDismissal(`UNCONTAINEDLI${$el.textContent}`),
          dismissAll: option.checks.UNCONTAINED_LI.dismissAll ? 'UNCONTAINED_LI' : false,
          developer: option.checks.UNCONTAINED_LI.developer || true,
        });
      }
    });
  }

  /* ****************************************** */
  /*  No tabindex values greater than 0.        */
  /* ****************************************** */
  if (option.checks.TABINDEX_ATTR) {
    Elements.Found.TabIndex.forEach(($el) => {
      results.push({
        test: 'TABINDEX_ATTR',
        element: $el,
        type: option.checks.TABINDEX_ATTR.type || 'error',
        content: Lang.sprintf(option.checks.TABINDEX_ATTR.content || 'TABINDEX_ATTR'),
        dismiss: Utils.prepareDismissal(`TABINDEX${$el.tagName + $el.id + $el.className}`),
        dismissAll: option.checks.TABINDEX_ATTR.dismissAll ? 'TABINDEX_ATTR' : false,
        developer: option.checks.TABINDEX_ATTR.developer || true,
      });
    });
  }

  return results;
}
