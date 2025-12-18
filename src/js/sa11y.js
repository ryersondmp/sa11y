// Options, language object, constants, and utilities.
import defaultOptions from './utils/default-options';
import Lang from './utils/lang';
import Constants from './utils/constants';
import Elements from './utils/elements';
import find from './utils/find';
import findShadowComponents from './logic/find-shadow-components';
import { removeAlert } from './interface/alert';
import * as Utils from './utils/utils';

// Extras
import ConsoleErrors from './interface/console-error';
import detectPageChanges from './features/detect-page-changes';
import {
  dismissLogic,
  dismissButtons,
  removeDismissListeners,
} from './features/dismiss-annotations';
import { addColourFilters, resetColourFilters } from './features/colour-filters';
import { exportResults, removeExportListeners } from './features/export-results';

// Create UI/interface elements
import mainToggle from './logic/main-toggle-logic';
import ControlPanel from './interface/control-panel';
import settingsPanelToggles from './logic/settings-panel-logic';
import initializePanelToggles from './logic/control-panel-logic';
import generatePageOutline from './interface/page-outline';
import generateImageOutline from './interface/image-outline';
import { updatePanel, updateBadge, updateCount } from './logic/update-panel';
import { AnnotationTooltips, PanelTooltips } from './interface/tooltips';
import { Annotations, annotate } from './interface/annotations';
import { HeadingAnchor, HeadingLabel } from './interface/heading-labels';
import { skipToIssue, removeSkipBtnListeners } from './logic/skip-to-issue';

// Checks/rulesets
import checkImages from './rulesets/images';
import checkHeaders from './rulesets/headers';
import checkLinkText from './rulesets/link-text';
import checkContrast from './contrast/checkContrast';
import checkLabels from './rulesets/labels';
import checkReadability from './rulesets/readability';
import checkEmbeddedContent from './rulesets/embedded-content';
import checkQA from './rulesets/quality-assurance';
import checkDeveloper from './rulesets/developer';
import checkCustom from './sa11y-custom-checks';

class Sa11y {
  constructor(options) {
    const option = {
      ...defaultOptions,
      ...options,
      checks: {
        ...defaultOptions.checks,
        ...options.checks,
      },
    };

    /* *********************************************************** */
    /*  Initialize: Start your engines.                            */
    /* *********************************************************** */
    this.initialize = () => {
      // Do not run Sa11y if any supplied elements detected on page.
      const checkRunPrevent = () => {
        const { doNotRun } = option;
        return doNotRun.trim().length > 0 ? document.querySelector(doNotRun) : false;
      };

      if (!checkRunPrevent()) {
        // Register web components
        customElements.define('sa11y-heading-label', HeadingLabel);
        customElements.define('sa11y-heading-anchor', HeadingAnchor);
        customElements.define('sa11y-annotation', Annotations);
        customElements.define('sa11y-tooltips', AnnotationTooltips);
        customElements.define('sa11y-panel-tooltips', PanelTooltips);
        customElements.define('sa11y-control-panel', ControlPanel);
        customElements.define('sa11y-console-error', ConsoleErrors);

        // Initialize global constants and exclusions.
        Constants.initializeGlobal(option);
        Constants.initializeReadability(option);
        Constants.initializeExclusions(option);

        // Make "Developer checks" on by default or if toggle switch is visually hidden.
        if (option.developerChecksOnByDefault) {
          if (Utils.store.getItem('sa11y-developer') === null || option.checkAllHideToggles) {
            Utils.store.setItem('sa11y-developer', 'On');
          }
        }

        // Once document has fully loaded.
        Utils.documentLoadingCheck(() => {
          if (option.headless) {
            // Headless: Perform all checks without loading UI.
            this.checkAll();
            Utils.store.removeItem('sa11y-dismissed');
          } else {
            // Save panel position preference if not already set or if position changes via props.
            const rememberPosition = Utils.store.getItem('sa11y-position');
            const { panelPosition } = option;
            if (
              option.showMovePanelToggle &&
              (!rememberPosition ||
                !rememberPosition.includes('top') !== !panelPosition.includes('top'))
            ) {
              Utils.store.setItem('sa11y-position', panelPosition);
            }

            // Build control panel.
            const controlPanel = new ControlPanel();
            document.body.appendChild(controlPanel);

            // Initialize control panel.
            settingsPanelToggles(this.checkAll, this.resetAll);
            initializePanelToggles();
            addColourFilters();

            // Detect page changes (for SPAs).
            detectPageChanges(option.detectSPArouting, this.checkAll, this.resetAll);

            // Initialize panel tooltips.
            this.panelTooltips = new PanelTooltips();
            document.body.appendChild(this.panelTooltips);

            // Disable toggle initially.
            Constants.Panel.toggle.disabled = false;

            // Initial check once page is done loading.
            setTimeout(() => {
              this.resetAll(); // Make sure there's a clean slate.
              this.checkAll();
            }, option.delayCheck);

            // Disable button if user needs to wait longer than 700ms.
            if (option.delayCheck >= 700) {
              Constants.Panel.toggle.disabled = true;
            }

            // Initialize main toggle
            mainToggle(this.checkAll, this.resetAll);
          }
        });
      }
    };

    /* *********************************************************** */
    /*  Check All: Where all the magic happens.                    */
    /* *********************************************************** */
    this.checkAll = async (
      desiredRoot = option.checkRoot,
      desiredReadabilityRoot = option.readabilityRoot,
      fixedRoots = option.fixedRoots,
    ) => {
      try {
        this.results = [];
        this.headingOutline = [];
        this.errorCount = 0;
        this.warningCount = 0;
        this.customChecksRunning = false;

        // Initialize root areas to check.
        Constants.initializeRoot(desiredRoot, desiredReadabilityRoot, fixedRoots);

        // Find all web components on the page.
        findShadowComponents(option);

        // Find and cache elements.
        Elements.initializeElements(option);

        // Ruleset checks
        checkHeaders(this.results, option, this.headingOutline);
        checkLinkText(this.results, option);
        checkImages(this.results, option);
        checkLabels(this.results, option);
        checkQA(this.results, option);
        checkDeveloper(this.results, option);
        if (option.embeddedContentPlugin) {
          checkEmbeddedContent(this.results, option);
        }
        if (option.contrastPlugin) {
          checkContrast(this.results, option);
        }
        if (option.readabilityPlugin && Utils.store.getItem('sa11y-readability') === 'On') {
          checkReadability(this.results);
        }

        // Build array of images to be used for image panel.
        this.imageResults = Elements.Found.Images.map((image) => {
          const match = this.results.find((i) => i.element === image);
          return (
            match && {
              element: image,
              type: match.type,
              dismiss: match.dismiss,
              developer: match.developer,
            }
          );
        }).filter(Boolean);

        /* Custom checks */
        if (option.customChecks === true) {
          // Option 1: Provide via sa11y-custom-checks.js
          checkCustom(this.results);
        } else if (typeof option.customChecks === 'object') {
          // Option 2: Provide as an object when instantiated.
          this.results.push(...option.customChecks);
        } else if (option.customChecks === 'listen') {
          // Option 3: Provide via event listener. Yoinked from Editoria11y!
          this.customChecksRunning = true;
          this.customChecksFinished = 0;
          document.addEventListener('sa11y-resume', () => {
            this.customChecksFinished += 1;
            if (this.customChecksFinished === 1) {
              this.customChecksRunning = false;
              this.updateResults();
            }
          });
          window.setTimeout(() => {
            if (this.customChecksRunning === true) {
              this.customChecksRunning = false;
              this.updateResults();
              throw Error('Sa11y: No custom checks were returned.');
            }
          }, option.delayCustomCheck);
          window.setTimeout(() => {
            const customChecks = new CustomEvent('sa11y-custom-checks');
            document.dispatchEvent(customChecks);
          }, 0);
        }

        // No custom checks running.
        if (!this.customChecksRunning) {
          this.updateResults();
        }
      } catch (error) {
        const consoleErrors = new ConsoleErrors(error);
        document.body.appendChild(consoleErrors);
        throw Error(error);
      }
    };

    this.updateResults = () => {
      // Filter out heading issues that are outside of the target root.
      this.results = this.results.filter((heading) => heading.isWithinRoot !== false);

      // Filter out "Developer checks" if toggled off or if using externally supplied developer checks.
      const devChecks =
        Utils.store.getItem('sa11y-developer') === 'Off' ||
        Utils.store.getItem('sa11y-developer') === null;
      if (devChecks || option.externalDeveloperChecks === true) {
        this.results = this.results.filter((issue) => issue.developer !== true);
      }

      // Filter out external vendor results based on "Developer checks" state.
      if (devChecks) {
        this.results = this.results.filter((issue) => issue.external !== true);
      }

      // Generate HTML path, and optionally CSS selector path of element.
      this.results.forEach(($el, id) => {
        const cssPath = option.selectorPath ? Utils.generateSelectorPath($el.element) : '';
        const htmlPath = $el.element?.outerHTML.replace(/\s{2,}/g, ' ').trim() || '';
        Object.assign($el, { htmlPath, cssPath, id });
      });

      if (option.headless === false) {
        // Check for dismissed items and update results array.
        const dismiss = dismissLogic(
          this.results,
          this.panelTooltips,
          this.checkAll,
          this.resetAll,
        );
        this.results = dismiss.updatedResults;
        this.dismissed = dismiss.dismissedIssues;
        this.dismissedPageResults = dismiss.dismissedResults;

        // Update count & badge.
        const count = updateCount(this.results, this.errorCount, this.warningCount);
        updateBadge(count.error, count.warning);

        /* If panel is OPENED. */
        if (Utils.store.getItem('sa11y-panel') === 'Opened') {
          // Paint the page with annotations.
          const counts = new Map();
          this.results.forEach((issue) => {
            let updatedIssue = issue;
            // Dynamically alter margins if an element has multiple issues.
            if (issue.element && !issue.margin) {
              const index = counts.get(issue.element) || 0;
              counts.set(issue.element, index + 1);
              const offset = issue.inline ? 0 : 15;
              updatedIssue = { ...issue, margin: `${index * 20 + offset}px` };
            }
            annotate(updatedIssue, option);
          });

          // After annotations are painted, find & cache.
          Elements.initializeAnnotations();

          // Initialize tooltips
          const tooltipComponent = new AnnotationTooltips();
          document.body.appendChild(tooltipComponent);

          dismissButtons(this.results, this.dismissed, this.checkAll, this.resetAll);

          generatePageOutline(this.dismissedPageResults, this.headingOutline, option);

          if (option.showImageOutline) {
            generateImageOutline(this.dismissedPageResults, this.imageResults, option);
          }

          updatePanel(dismiss.dismissCount, count.error, count.warning);

          // Initialize Skip to Issue button.
          skipToIssue(this.results);

          // Initialize Export Results plugin.
          if (option.exportResultsPlugin) {
            exportResults(this.results, dismiss.dismissedResults);
          }

          // Page issues: add gradient if scrollable list.
          Utils.isScrollable(Constants.Panel.pageIssuesList, Constants.Panel.pageIssuesContent);
        }

        // Make sure toggle isn't disabled after checking.
        Constants.Panel.toggle.disabled = false;
      }

      // Dispatch custom event that stores the results array.
      window.sa11yCheckComplete = null;
      const event = new CustomEvent('sa11y-check-complete', {
        detail: {
          results: this.results,
          page: window.location.pathname,
        },
      });
      window.sa11yCheckComplete = event.detail;
      document.dispatchEvent(event);
    };

    /* *********************************************************** */
    /*  Reset all: Clears everything and resets the panel.         */
    /* *********************************************************** */
    this.resetAll = (restartPanel = true) => {
      Constants.Global.html.removeAttribute('data-sa11y-active');

      // Remove from page.
      Utils.remove(
        [
          'sa11y-annotation',
          'sa11y-heading-label',
          'sa11y-heading-anchor',
          'sa11y-image-anchor',
          'sa11y-tooltips',
        ],
        'document',
      );

      // Remove Sa11y anchor positioning markup (while preserving any existing anchors).
      if (Utils.supportsAnchorPositioning()) {
        find('[data-sa11y-error], [data-sa11y-warning], [data-sa11y-good]', 'document').forEach(
          ($el) => {
            const anchor = $el;
            const anchors = (anchor.style.anchorName || '')
              .split(',')
              .map((s) => s.trim())
              .filter((s) => s && !s.startsWith('--sa11y-anchor'));
            if (anchors.length) {
              anchor.style.anchorName = anchors.join(', ');
            } else {
              anchor.style.removeProperty('anchor-name');
              if (!anchor.style.length) {
                anchor.removeAttribute('style');
              }
            }
          },
        );
      }

      // Reset all data attributes.
      Utils.resetAttributes(
        [
          'data-sa11y-parent',
          'data-sa11y-error',
          'data-sa11y-warning',
          'data-sa11y-good',
          'data-sa11y-overflow',
          'data-sa11y-image',
          'data-sa11y-pulse-border',
          'data-sa11y-filter',
          'data-sa11y-has-shadow-root',
        ],
        'document',
      );

      // Remove from panel.
      Constants.Panel.outlineList.innerHTML = '';
      if (option.showImageOutline) {
        Constants.Panel.imagesList.innerHTML = '';
      }
      Constants.Panel.pageIssuesList.innerHTML = '';
      Constants.Panel.readabilityInfo.innerHTML = '';
      Constants.Panel.readabilityDetails.innerHTML = '';
      Constants.Panel.panel.classList.remove('has-page-issues');
      Constants.Panel.pageIssues.classList.remove('active');
      Constants.Panel.settingsContent.classList.remove('hide-settings-border');
      Constants.Panel.panel.querySelector('#readability-alert')?.remove();

      // Remove any active alerts from panel.
      removeAlert();

      // Remove EventListeners.
      removeSkipBtnListeners();
      removeExportListeners();
      removeDismissListeners();

      // Reset colour filters.
      resetColourFilters();

      // Main panel warning and error count.
      while (Constants.Panel.status.firstChild) {
        Constants.Panel.status.removeChild(Constants.Panel.status.firstChild);
      }

      // Remove data attribute from shadow root elements.
      document.querySelectorAll('[data-sa11y-has-shadow-root]').forEach((el) => {
        el.shadowRoot.querySelectorAll('style.sa11y-css-utilities').forEach((style) => {
          style.remove();
        });
        el.removeAttribute('data-sa11y-has-shadow-root');
      });

      if (restartPanel) {
        Constants.Panel.panel.classList.remove('active');
      }
    };

    /* *********************************************************** */
    /*  Methods: Useful utilities for integrations.                */
    /* *********************************************************** */

    // Method: temporarily disable toggle.
    this.disabled = () => {
      setTimeout(() => {
        if (Utils.store.getItem('sa11y-panel') === 'Opened') {
          Constants.Panel.toggle.click();
        }
        Constants.Panel.toggle.disabled = true;
      }, option.delayCheck + 10);
    };

    // Method: re-enable toggle.
    this.enabled = () => {
      if (Constants.Panel.toggle) {
        Constants.Panel.toggle.disabled = false;
      }
    };

    // Method: find utility.
    this.find = (selector, desiredRoot, exclude) => find(selector, desiredRoot, exclude);

    // Method: prepare dismissal keys.
    this.prepareDismissal = (string) => Utils.prepareDismissal(string);

    // Method: sanitize HTML.
    this.sanitizeHTML = (string) => Utils.sanitizeHTML(string);

    // Method: truncate string.
    this.truncateString = (string, maxLength) => Utils.truncateString(string, maxLength);

    /* *********************************************************** */
    /*  Initialize Sa11y.                                          */
    /* *********************************************************** */
    this.initialize();
  }
}

export { Lang, Sa11y };
