import Constants from './constants';
import find from './find';
import * as Utils from './utils';
import { State } from '../core/state';

const Elements = (function myElements() {
  const Found = {};

  // Contrast exclusion tiers.
  const contrastExcludedTags = new Set([
    'AUDIO',
    'VIDEO',
    'IFRAME',
    'SVG',
    'SCRIPT',
    'STYLE',
    'NOSCRIPT',
    'TEMPLATE',
    'HEAD',
    'TITLE',
    'META',
    'BASE',
    'DATALIST',
    'PROGRESS',
    'METER',
    'LINK',
    'HR',
    'OPTION',
  ]);
  const contrastAncestorSelector = 'audio,video,meter,progress,datalist,head,svg';
  let contrastAttrSelector = '';
  function buildContrastAttrSelector() {
    const base = ['input[type="color"]', 'input[type="range"]'];
    if (State.option.contrastIgnore) {
      const userSelectors = State.option.contrastIgnore
        .split(',')
        .map((s) => s.trim())
        .flatMap((s) => [s, `${s} *`]);
      base.push(...userSelectors);
    }
    contrastAttrSelector = base.join(',');
  }

  // Lazy getters for expensive computations:
  let _pageTextComputed = false;
  let _pageTextValue = null;
  let _readabilityComputed = false;
  let _readabilityValue = null;

  Object.defineProperty(Found, 'pageText', {
    get() {
      if (!_pageTextComputed) {
        _pageTextValue = computePageText();
        _pageTextComputed = true;
      }
      return _pageTextValue;
    },
    set(val) {
      _pageTextValue = val;
      _pageTextComputed = true;
    },
    configurable: true,
    enumerable: true,
  });

  Object.defineProperty(Found, 'Readability', {
    get() {
      if (!_readabilityComputed) {
        _readabilityValue = computeReadabilityText();
        _readabilityComputed = true;
      }
      return _readabilityValue;
    },
    set(val) {
      _readabilityValue = val;
      _readabilityComputed = true;
    },
    configurable: true,
    enumerable: true,
  });

  function computePageText() {
    const elementSet = new Set(Found.Everything);
    return Found.Everything.filter(($el) => {
      if ($el instanceof HTMLImageElement) return true;
      // Prevent duplication: skip if any ancestor is also in the set.
      let parent = $el.parentElement;
      while (parent) {
        if (elementSet.has(parent)) return false;
        parent = parent.parentElement;
      }
      return true;
    })
      .map(($el) => {
        let text = '';
        if ($el instanceof HTMLImageElement) {
          text = $el.alt || '';
        } else if ($el.tagName === 'LI') {
          text = Array.from($el.childNodes)
            .filter((n) => n.nodeType === 3)
            .map((n) => n.textContent)
            .join(' ');
        } else {
          // Exclude elements with a 'lang' attribute for initial language confidence check.
          const clone = $el.cloneNode(true);
          if (clone.querySelectorAll) {
            const nestedLangNodes = clone.querySelectorAll('[lang]');
            for (const node of nestedLangNodes) node.remove();
          }
          text = Utils.getText(Utils.fnIgnore(clone));
        }
        return Utils.normalizeString(text);
      })
      .filter(Boolean);
  }

  function computeReadabilityText() {
    const readabilityExclusions = ($el) =>
      Constants.Root.Readability.some((rootEl) => rootEl.contains($el)) &&
      !Constants.Exclusions.Readability.some((selector) => $el.matches(selector));
    return [
      ...Found.Paragraphs.filter(readabilityExclusions),
      ...Found.Lists.filter(readabilityExclusions),
    ]
      .map(($el) => Utils.getText(Utils.fnIgnore($el)))
      .filter(Boolean);
  }

  // Main initialization
  function initializeElements() {
    // Reset lazy caches.
    _pageTextComputed = false;
    _pageTextValue = null;
    _readabilityComputed = false;
    _readabilityValue = null;

    // Build dynamic Contrast attribute selector for this run.
    buildContrastAttrSelector();

    // Pre-split QA bad link sources.
    const badLinkSourcesRaw = State.option.checks.QA_BAD_LINK.sources;
    const badLinkSelectors = badLinkSourcesRaw.length
      ? badLinkSourcesRaw.split(',').map((s) => s.trim())
      : [];

    const nestedSources =
      State.option.checks.QA_NESTED_COMPONENTS.sources || '[role="tablist"], details';

    // Single DOM query for all elements.
    Found.Everything = find('*', 'root', Constants.Exclusions.Sa11yElements);

    // Initialize arrays.
    Found.Images = [];
    Found.Links = [];
    Found.Paragraphs = [];
    Found.Lists = [];
    Found.Blockquotes = [];
    Found.Tables = [];
    Found.StrongItalics = [];
    Found.Subscripts = [];
    Found.Buttons = [];
    Found.Inputs = [];
    Found.Labels = [];
    Found.iframes = [];
    Found.Svg = [];
    Found.Contrast = [];
    Found.TabIndex = [];
    Found.NestedComponents = [];
    Found.CustomErrorLinks = [];
    Found.LangTags = [];

    const imageRoles = new Set(['img', 'graphics-document', 'graphics-symbol', 'graphics-object']);

    // Iterate on Found.Everything based on tag name.
    for (let i = 0; i < Found.Everything.length; i++) {
      const $el = Found.Everything[i];
      const tag = $el.tagName;
      const role = $el.getAttribute('role')?.trim().toLowerCase();
      let handledByRole = false;

      // Role overrides.
      if (role) {
        if (imageRoles.has(role) && !Constants.Exclusions.Images.some((s) => $el.matches(s))) {
          Found.Images.push($el);
          handledByRole = true;
        } else if (role === 'link' && !Constants.Exclusions.Links.some((s) => $el.matches(s))) {
          Found.Links.push($el);
          handledByRole = true;
        } else if (role === 'button') {
          Found.Buttons.push($el);
          handledByRole = true;
        }
      }

      if (!handledByRole) {
        switch (tag) {
          case 'IMG':
            if (!Constants.Exclusions.Images.some((s) => $el.matches(s))) Found.Images.push($el);
            break;
          case 'A': // HTML anchor
          case 'a': // SVG anchor (lowercase in SVG namespace)
            if (
              $el.hasAttribute('href') &&
              !$el.matches('[role="button"]') &&
              !Constants.Exclusions.Links.some((s) => $el.matches(s))
            ) {
              Found.Links.push($el);
              // Check custom error link sources while we have the link.
              if (badLinkSelectors.length > 0 && badLinkSelectors.some((s) => $el.matches(s))) {
                Found.CustomErrorLinks.push($el);
              }
            }
            break;
          case 'P':
            if (!Constants.Exclusions.Paragraphs.some((s) => $el.matches(s)))
              Found.Paragraphs.push($el);
            break;
          case 'LI':
            Found.Lists.push($el);
            break;
          case 'BLOCKQUOTE':
            Found.Blockquotes.push($el);
            break;
          case 'TABLE':
            if (!$el.matches('[role="presentation"],[role="none"]')) Found.Tables.push($el);
            break;
          case 'STRONG':
          case 'EM':
            Found.StrongItalics.push($el);
            break;
          case 'SUP':
          case 'SUB':
            Found.Subscripts.push($el);
            break;
          case 'BUTTON': {
            Found.Buttons.push($el);
            break;
          }
          case 'INPUT':
          case 'SELECT':
          case 'TEXTAREA':
          case 'METER':
          case 'PROGRESS':
            Found.Inputs.push($el);
            break;
          case 'LABEL':
            Found.Labels.push($el);
            break;
          case 'IFRAME':
          case 'AUDIO':
          case 'VIDEO':
            Found.iframes.push($el);
            break;
          case 'svg':
            Found.Svg.push($el);
            break;
        }
      }

      // Cross-cutting: tabindex
      if ($el.hasAttribute('tabindex') && $el.tabIndex >= 0) Found.TabIndex.push($el);

      // Cross-cutting: Nested components.
      if (nestedSources && $el.matches(nestedSources)) Found.NestedComponents.push($el);

      // Cross-cutting: Contrast (tiered exclusion).
      if (!contrastExcludedTags.has(tag)) {
        if (!Utils.getCachedClosest($el, contrastAncestorSelector)) {
          if (!contrastAttrSelector || !$el.matches(contrastAttrSelector)) {
            Found.Contrast.push($el);
          }
        }
      }

      // Cross-cutting: lang attributes.
      if ($el.hasAttribute('lang')) {
        Found.LangTags.push($el);
      }
    }

    // Headings
    const headingScope =
      State.option.ignoreContentOutsideRoots || State.option.fixedRoots ? 'root' : 'document';

    Found.Headings = find(
      'h1, h2, h3, h4, h5, h6, [role="heading"][aria-level]',
      headingScope,
      Constants.Exclusions.Headings,
    );

    // Derive HeadingOne from Headings instead of a separate DOM query.
    Found.HeadingOne = Found.Headings.filter(
      ($el) =>
        $el.tagName === 'H1' ||
        ($el.matches('[role="heading"]') && $el.getAttribute('aria-level') === '1'),
    );

    Found.HeadingOverrideStart = new WeakMap();
    Found.HeadingOverrideEnd = new WeakMap();
    if (State.option.initialHeadingLevel) {
      State.option.initialHeadingLevel.forEach((section) => {
        const headingsInSection = find(
          `${section.selector} :is(h1,h2,h3,h4,h5,h6,[aria-role=heading][aria-level])`,
          headingScope,
          Constants.Exclusions.Headings,
        );
        if (headingsInSection.length > 0) {
          Found.HeadingOverrideStart.set(headingsInSection[0], section.previousHeading);
          Found.HeadingOverrideEnd.set(headingsInSection.pop(), section.previousHeading);
        }
      });
    }

    // Single pass for heading exclusions (replaces 2 separate .filter() calls).
    Found.ExcludedHeadings = [];
    Found.ExcludedOutlineHeadings = [];
    for (const heading of Found.Headings) {
      if (Constants.Exclusions.Headings.some((ex) => heading.matches(ex)))
        Found.ExcludedHeadings.push(heading);
      if (Constants.Exclusions.Outline.some((ex) => heading.matches(ex)))
        Found.ExcludedOutlineHeadings.push(heading);
    }
    Found.OutlineIgnore = Found.ExcludedOutlineHeadings.concat(Found.ExcludedHeadings);

    // Embedded content.
    Found.Videos = [];
    Found.Audio = [];
    Found.Visualizations = [];
    Found.EmbeddedContent = [];
    for (const $el of Found.iframes) {
      let matched = false;
      if ($el.matches(Constants.Global.VideoSources)) {
        Found.Videos.push($el);
        matched = true;
      }
      if ($el.matches(Constants.Global.AudioSources)) {
        Found.Audio.push($el);
        matched = true;
      }
      if ($el.matches(Constants.Global.VisualizationSources)) {
        Found.Visualizations.push($el);
        matched = true;
      }
      if (!matched) {
        Found.EmbeddedContent.push($el);
      }
    }

    // Query <html> for lang attribute (may change on SPA navigation).
    Found.html = document.querySelector('html');
    Found.Language = Found.html.getAttribute('lang')?.trim();

    // All focusable elements.
    Found.Focusable = [
      ...(Elements.Found.Links || []),
      ...(Elements.Found.Buttons || []),
      ...(Elements.Found.Inputs || []),
      ...(Elements.Found.TabIndex || []),
    ];
  }

  // Initialize.
  function initializeFilterElements() {
    buildContrastAttrSelector();
    Found.Everything = find('*', 'root', Constants.Exclusions.Sa11yElements);
    Found.Images = [];
    Found.Links = [];
    Found.Contrast = [];

    for (let i = 0; i < Found.Everything.length; i++) {
      const $el = Found.Everything[i];
      const tag = $el.tagName;

      switch (tag) {
        case 'IMG':
          if (!Constants.Exclusions.Images.some((s) => $el.matches(s))) Found.Images.push($el);
          break;
        case 'A':
        case 'a':
          if (
            $el.hasAttribute('href') &&
            !$el.matches('[role="button"]') &&
            !Constants.Exclusions.Links.some((s) => $el.matches(s))
          ) {
            Found.Links.push($el);
          }
          break;
      }

      // Contrast (same tiered exclusion as full init)
      if (!contrastExcludedTags.has(tag)) {
        if (!Utils.getCachedClosest($el, contrastAncestorSelector)) {
          if (!contrastAttrSelector || !$el.matches(contrastAttrSelector)) {
            Found.Contrast.push($el);
          }
        }
      }
    }

    // Headings.
    Found.Headings = find(
      'h1, h2, h3, h4, h5, h6, [role="heading"][aria-level]',
      'root',
      Constants.Exclusions.Headings,
    );

    // Single-pass heading exclusions.
    Found.ExcludedHeadings = [];
    Found.ExcludedOutlineHeadings = [];
    for (const heading of Found.Headings) {
      if (Constants.Exclusions.Headings.some((ex) => heading.matches(ex)))
        Found.ExcludedHeadings.push(heading);
      if (Constants.Exclusions.Outline.some((ex) => heading.matches(ex)))
        Found.ExcludedOutlineHeadings.push(heading);
    }
    Found.OutlineIgnore = Found.ExcludedOutlineHeadings.concat(Found.ExcludedHeadings);
  }

  /* ************* */
  /*  Annotations  */
  /* ************* */
  const Annotations = {};
  function initializeAnnotations() {
    Annotations.Array = find('sa11y-annotation', 'document');
    Annotations.Array.forEach((annotation, i) => {
      annotation.setAttribute('data-sa11y-position', i);
    });
  }

  return {
    initializeElements,
    initializeFilterElements,
    Found,
    initializeAnnotations,
    Annotations,
  };
})();

export default Elements;
