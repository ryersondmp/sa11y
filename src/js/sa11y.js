// Options, language object, constants, and utilities.
import defaultOptions from './utils/default-options';
import Lang from './utils/lang';
import * as Utils from './utils/utils';
import Constants from './utils/constants';
import Elements from './utils/elements';

// Extras
import detectPageChanges from './logic/detect-page-changes';
import { dismissAnnotationsLogic, dismissAnnotationsButtons } from './logic/dismiss-annotations';
import addColourFilters from './logic/colour-filters';
import ConsoleErrors from './interface/console-error';

// Create UI/interface elements
import mainToggle from './logic/main-toggle-logic';
import ControlPanel from './interface/control-panel';
import settingsPanelToggles from './logic/settings-panel-logic';
import initializePanelToggles from './logic/control-panel-logic';
import generatePageOutline from './interface/page-outline';
import { updatePanel, updateBadge, updateCount } from './logic/update-panel';
import { TooltipComponent, DismissTooltip } from './interface/tooltips';
import { Annotations, annotate, detectOverflow, nudge } from './interface/annotations';
import { HeadingAnchor, HeadingLabel } from './interface/heading-labels';
import { skipToIssue, removeSkipBtnListeners } from './logic/skip-to-issue';

// Checks/rulesets
import checkImages from './rulesets/images';
import checkHeaders from './rulesets/headers';
import checkLinkText from './rulesets/link-text';
import checkContrast from './rulesets/contrast';
import checkLabels from './rulesets/labels';
import checkLinksAdvanced from './rulesets/links-advanced';
import checkReadability from './rulesets/readability';
import checkEmbeddedContent from './rulesets/embedded-content';
import checkQA from './rulesets/quality-assurance';
import checkCustom from './sa11y-custom-checks';

class Sa11y {
  constructor(options) {
    const option = {
      ...defaultOptions,
      ...options,
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
        customElements.define('sa11y-tooltips', TooltipComponent);
        customElements.define('sa11y-dismiss-tooltip', DismissTooltip);
        customElements.define('sa11y-control-panel', ControlPanel);
        customElements.define('sa11y-console-error', ConsoleErrors);

        // Initialize global constants and exclusions.
        Constants.initializeGlobal(option);
        Constants.initializeReadability(option);
        Constants.initializeExclusions(option);
        Constants.initializeEmbeddedContent(option);

        // Once document has fully loaded.
        Utils.documentLoadingCheck(() => {
          if (option.headless === true) {
            // Headless: Perform all checks without loading UI.
            this.checkAll();
            Utils.store.removeItem('sa11y-dismissed');
          } else {
            // Build control panel.
            const controlPanel = new ControlPanel();
            document.body.appendChild(controlPanel);

            // Initialize control panel.
            settingsPanelToggles(
              this.checkAll,
              this.resetAll,
            );
            initializePanelToggles();

            addColourFilters();

            // Detect page changes (for SPAs).
            detectPageChanges(
              option.detectSPArouting,
              this.checkAll,
              this.resetAll,
            );

            // Initialize dismiss tooltip.
            this.dismissTooltip = new DismissTooltip();
            document.body.appendChild(this.dismissTooltip);

            // Disable toggle initially.
            Constants.Panel.toggle.disabled = false;

            // Check page once page is done loading.
            this.checkAll();
            mainToggle(
              this.checkAll,
              this.resetAll,
            );
          }
        });
      }
    };

    /* *********************************************************** */
    /*  Check All: Where all the magic happens.                    */
    /* *********************************************************** */
    this.checkAll = async () => {
      try {
        this.results = [];
        this.headingOutline = [];
        this.errorCount = 0;
        this.warningCount = 0;

        // Panel alert if root doesn't exist.
        const root = document.querySelector(option.checkRoot);
        if (!root) {
          Utils.createAlert(`${Lang.sprintf('ERROR_MISSING_ROOT_TARGET', option.checkRoot)}`);
        }

        // Find all web components on the page.
        Constants.initializeShadowSearch(
          option.checkRoot,
          option.autoDetectShadowComponents,
          option.shadowComponents,
        );

        // Find and cache elements.
        Elements.initializeElements(option.linksToFlag);

        // Ruleset checks
        checkHeaders(
          this.results,
          option.nonConsecutiveHeadingIsError,
          option.flagLongHeadings,
          option.missingH1,
          this.headingOutline,
        );
        checkLinkText(
          this.results,
          option.showGoodLinkButton,
          option.linksToDOI,
        );
        checkImages(this.results);
        checkContrast(this.results, option);
        checkLabels(this.results, option);
        checkLinksAdvanced(this.results, option);
        checkQA(this.results, option);
        checkEmbeddedContent(this.results, option);
        checkReadability();

        // Custom checks
        if (option.customChecks === true) {
          checkCustom(this.results);
        }

        // Optional: Generate CSS selector path of element.
        if (option.selectorPath === true) {
          this.results.forEach(($el) => {
            if ($el.element !== undefined) {
              const path = Utils.generateSelectorPath($el.element);
              Object.assign($el, { cssPath: path });
            }
          });
        }

        if (option.headless === false) {
          // Check for dismissed items and update results array.
          const dismiss = dismissAnnotationsLogic(this.results, this.dismissTooltip);
          this.results = dismiss.updatedResults;
          this.dismissed = dismiss.dismissedIssues;
          this.dismissedCount = dismiss.dismissCount;

          // Update count.
          const count = updateCount(this.results, this.errorCount, this.warningCount);
          this.errorCount = count.error;
          this.warningCount = count.warning;

          // Update badge.
          updateBadge(this.errorCount, this.warningCount);

          /* If panel is OPENED. */
          if (Utils.store.getItem('sa11y-remember-panel') === 'Opened') {
            // Paint the page with annotations.
            this.results.forEach(($el, i) => {
              Object.assign($el, { id: i });
              annotate(
                $el.element,
                $el.type,
                $el.content,
                $el.inline,
                $el.position,
                $el.id,
                option.dismissAnnotations,
              );
            });

            // After annotations are painted, find & cache.
            Elements.initializeAnnotations();

            // Initialize tooltips
            const tooltipComponent = new TooltipComponent();
            document.body.appendChild(tooltipComponent);

            dismissAnnotationsButtons(
              option.dismissAnnotations,
              this.results,
              this.dismissed,
              this.checkAll,
              this.resetAll,
            );

            generatePageOutline(
              this.dismissed,
              this.headingOutline,
            );

            updatePanel(
              this.dismissedCount,
              this.errorCount,
              this.warningCount,
            );

            // Initialize Skip to Issue button.
            skipToIssue();

            // Extras
            detectOverflow();
            nudge();
          }
        }

        // Dispatch custom event that stores the results array.
        const event = new CustomEvent('sa11y-check-complete', {
          detail: {
            results: this.results,
            page: Constants.Global.currentPage,
          },
        });
        document.dispatchEvent(event);
      } catch (error) {
        const consoleErrors = new ConsoleErrors(error);
        document.body.appendChild(consoleErrors);
        // eslint-disable-next-line no-console
        console.error(error);
      }
    };

    /* *********************************************************** */
    /*  Reset all: Clears everything and resets the panel.         */
    /* *********************************************************** */
    this.resetAll = (restartPanel = true) => {
      Constants.Global.html.removeAttribute('data-sa11y-active');

      // Reset all data attributes.
      Utils.resetAttributes([
        'data-sa11y-parent',
        'data-sa11y-error',
        'data-sa11y-warning',
        'data-sa11y-good',
        'data-sa11y-error-inline',
        'data-sa11y-warning-inline',
        'data-sa11y-overflow',
        'data-sa11y-pulse-border',
        'data-sa11y-filter',
      ], 'document');

      // Remove from page.
      Utils.remove([
        'sa11y-annotation',
        'sa11y-heading-label',
        'sa11y-heading-anchor',
        'sa11y-tooltips',
        '[data-sa11y-readability-period]',
        '[data-sa11y-clone-image-text]',
        '.sa11y-css-utilities',
      ], 'document');

      // Remove from panel.
      Constants.Panel.outlineList.innerHTML = '';
      Constants.Panel.pageIssuesList.innerHTML = '';
      Constants.Panel.readabilityInfo.innerHTML = '';
      Constants.Panel.readabilityDetails.innerHTML = '';
      Constants.Panel.panel.classList.remove('has-page-issues');

      // Remove any active alerts from panel.
      Utils.removeAlert();

      // Remove skip-to-issue EventListeners
      removeSkipBtnListeners();

      // Reset colour filters
      if (option.colourFilterPlugin === true) {
        Constants.Panel.colourFilterSelect.value = 0;
        Constants.Panel.colourPanel.classList.remove('active');
        Constants.Panel.colourFilterSelect.classList.remove('active');
        Constants.Panel.content.hidden = false;
      }

      // Main panel warning and error count.
      while (Constants.Panel.status.firstChild) Constants.Panel.status.removeChild(Constants.Panel.status.firstChild);

      if (restartPanel) {
        Constants.Panel.panel.classList.remove('active');
      }
    };

    // Initialize Sa11y.
    this.initialize();
  }
}

export {
  Lang,
  Sa11y,
};
