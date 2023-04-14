/**
 * Sa11y, the accessibility quality assurance assistant.
 * @version: 3.0.0
 * @author: Development led by Adam Chaboryk, CPWA. <adam.chaboryk@torontomu.ca>
 * @license: https://github.com/ryersondmp/sa11y/blob/master/LICENSE.md
 * @acknowledgements https://sa11y.netlify.app/acknowledgements/
 * @copyright (c) 2020 - 2022 Toronto Metropolitan University (formerly Ryerson University).
 * The above copyright notice shall be included in all copies or substantial portions of the Software.
*/

// Options, language object, constants, and utilities.
import defaultOptions from './utils/default-options';
import Lang from './utils/lang';
import * as Utils from './utils/utils';
import Constants from './utils/constants';
import Elements from './utils/elements';

// Extras
import detectPageChanges from './logic/detect-page-changes';
import dismissAnnotations from './logic/dismiss-annotations';
import addColourFilters from './logic/colour-filters';

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
    this.option = {
      ...defaultOptions,
      ...options,
    };

    // Initialize Sa11y's script.
    this.initialize = () => {
      // Do not run Sa11y if any supplied elements detected on page.
      const checkRunPrevent = () => {
        const { doNotRun } = this.option;
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

        // Initialize global constants and exclusions.
        Constants.initializeGlobal(
          this.option.checkRoot,
          this.option.contrastPlugin,
          this.option.formLabelsPlugin,
          this.option.readabilityPlugin,
          this.option.linksAdvancedPlugin,
          this.option.colourFilterPlugin,
          this.option.checkAllHideToggles,
          this.option.headless,
        );
        Constants.initializeReadability(
          this.option.readabilityRoot,
          this.option.readabilityLang,
        );
        Constants.initializeExclusions(
          this.option.containerIgnore,
          this.option.contrastIgnore,
          this.option.readabilityIgnore,
          this.option.headerIgnore,
          this.option.outlineIgnore,
          this.option.imageIgnore,
          this.option.linkIgnore,
          this.option.linkIgnoreSpan,
        );
        Constants.initializeEmbeddedContent(
          this.option.videoContent,
          this.option.audioContent,
          this.option.dataVizContent,
        );

        // Once document has fully loaded.
        Utils.documentLoadingCheck(() => {
          if (this.option.headless === true) {
            // Headless: Perform all checks without loading UI.
            this.checkAll();
            Utils.store.removeItem('sa11y-dismissed');
          } else {
            // Build control panel.
            const controlPanel = new ControlPanel(
              this.option.checkAllHideToggles,
              this.option.colourFilterPlugin,
              this.option.readabilityPlugin,
            );
            document.body.appendChild(controlPanel);

            // Initialize control panel.
            settingsPanelToggles(
              this.checkAll,
              this.resetAll,
            );
            initializePanelToggles();

            addColourFilters(
              this.option.colourFilterPlugin,
            );

            // Detect page changes (for SPAs).
            detectPageChanges(
              this.option.detectSPArouting,
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

    // ----------------------------------------------------------------------
    // Check all: Where all the magic happens.
    // ----------------------------------------------------------------------
    this.checkAll = async () => {
      this.results = [];
      this.headingOutline = [];
      this.errorCount = 0;
      this.warningCount = 0;

      // Find and get all dismissed elements (if not headless).
      if (this.option.headless === false) {
        // Get dismissed items and re-parse back into object.
        this.dismissed = Utils.store.getItem('sa11y-dismissed');
        this.dismissed = this.dismissed ? JSON.parse(this.dismissed) : [];

        // Get count and show dismiss panel.
        this.dismissCount = this.dismissed.filter((item) => item.href === Constants.Global.currentPage).length;
        if (this.dismissCount) Constants.Panel.dismissButton.classList.add('active');
        Constants.Panel.dismissTooltip.innerText = Lang.sprintf('PANEL_DISMISS_BUTTON', this.dismissCount);
        this.dismissTooltip.object.setContent(Lang.sprintf('PANEL_DISMISS_BUTTON', this.dismissCount));
      }

      // Panel alert if root doesn't exist.
      const root = document.querySelector(this.option.checkRoot);
      if (!root) {
        Utils.createAlert(`${Lang.sprintf('ERROR_MISSING_ROOT_TARGET', this.option.checkRoot)}`);
      }

      // Find all web components on the page.
      Constants.initializeShadowSearch(
        this.option.checkRoot,
        this.option.autoDetectShadowComponents,
        this.option.shadowComponents,
      );

      // Find and cache elements.
      Elements.initializeElements(
        this.option.linksToFlag,
      );

      // Ruleset checks
      checkHeaders(
        this.results,
        this.option.nonConsecutiveHeadingIsError,
        this.option.flagLongHeadings,
        this.headingOutline,
      );
      checkLinkText(
        this.results,
        this.option.showGoodLinkButton,
      );
      checkImages(this.results);
      checkContrast(this.results);
      checkLabels(this.results);
      checkLinksAdvanced(this.results);
      checkReadability();
      checkEmbeddedContent(
        this.results,
        this.option.embeddedContentAll,
        this.option.embeddedContentAudio,
        this.option.embeddedContentVideo,
        this.option.embeddedContentDataViz,
        this.option.embeddedContentTitles,
        this.option.embeddedContentGeneral,
      );
      checkQA(
        this.results,
        this.dismissed,
        this.option.badLinksQA,
        this.option.strongItalicsQA,
        this.option.pdfQA,
        this.option.langQA,
        this.option.blockquotesQA,
        this.option.tablesQA,
        this.option.fakeHeadingsQA,
        this.option.fakeListQA,
        this.option.allCapsQA,
        this.option.duplicateIdQA,
        this.option.underlinedTextQA,
        this.option.pageTitleQA,
        this.option.subscriptQA,
      );

      // Custom checks
      if (this.option.customChecks === true) {
        checkCustom(
          this.results,
        );
      }

      // Optional: Generate CSS selector path of element.
      if (this.option.selectorPath === true) {
        this.results.forEach(($el) => {
          if ($el.element !== undefined) {
            const path = Utils.generateSelectorPath($el.element);
            Object.assign($el, { cssPath: path });
          }
        });
      }

      if (this.option.headless === false) {
        // Return element from results array that matches dismiss key and dismiss url. Then filter through matched objects.
        const findKey = this.dismissed.map((e) => {
          const found = this.results.find((f) => (e.key.includes(f.dismiss) && e.href === Constants.Global.currentPage));
          if (found === undefined) return '';
          return found;
        });
        this.results = this.results.filter((issue) => !findKey.find((e) => e.dismiss === issue.dismiss));

        // Update count
        const count = updateCount(this.results, this.errorCount, this.warningCount);
        this.errorCount = count.error;
        this.warningCount = count.warning;

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
              this.option.dismissAnnotations,
            );
          });

          // After annotations are painted, find & cache.
          Elements.initializeAnnotations();

          // Initialize tooltips
          const tooltipComponent = new TooltipComponent();
          document.body.appendChild(tooltipComponent);

          dismissAnnotations(
            this.option.dismissAnnotations,
            this.results,
            this.dismissTooltip,
            this.dismissed,
            this.checkAll,
            this.resetAll,
          );

          generatePageOutline(
            this.dismissed,
            this.headingOutline,
            this.option.checkRoot,
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
    };

    // ============================================================
    // Reset all
    // ============================================================
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
      Utils.remove([
        '#page-errors .page-error',
        '#outline-list li',
        '#readability-details li',
      ], 'panel');

      Constants.Panel.readabilityInfo.innerHTML = '';

      // Remove any active alerts from panel.
      Utils.removeAlert();

      // Remove skip-to-issue EventListeners
      removeSkipBtnListeners();

      // Reset colour filters
      if (this.option.colourFilterPlugin === true) {
        Constants.Panel.colourFilterSelect.value = 0;
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
