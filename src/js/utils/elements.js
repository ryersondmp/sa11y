import Constants from './constants';
import find from './find';

const Elements = (function myElements() {
  const Found = {};
  function initializeElements(option) {
    // Since 4.0.0: For performance, we filter elements instead of dozens of querySelectors on the DOM.
    Found.Everything = find('*', 'root', Constants.Exclusions.Sa11yElements);

    Found.Contrast = Found.Everything.filter(($el) => {
      const matchesSelector = Constants.Exclusions.Contrast.some((exclusion) => $el.matches(exclusion));
      return !matchesSelector && !Constants.Exclusions.Contrast.includes($el);
    });

    Found.Images = Found.Everything.filter(($el) => $el.tagName === 'IMG'
      && !Constants.Exclusions.Images.some((selector) => $el.matches(selector)));

    Found.Links = Found.Everything.filter(($el) => ($el.tagName === 'A' || $el.tagName === 'a')
      && $el.hasAttribute('href')
      && !$el.matches('[role="button"]') // Exclude links with [role="button"]
      && !Constants.Exclusions.Links.some((selector) => $el.matches(selector)));

    // We want headings from the entire document for the Page Outline.
    Found.Headings = find(
      'h1, h2, h3, h4, h5, h6, [role="heading"][aria-level]',
      'document',
      Constants.Exclusions.Headings,
    );
    Found.HeadingOne = find(
      'h1, [role="heading"][aria-level="1"]',
      'document',
      Constants.Exclusions.Headings,
    );
    Found.ExcludedHeadings = Found.Headings.filter((heading) => Constants.Exclusions.Headings.some((exclusion) => heading.matches(exclusion)));

    // Quality assurance module.
    Found.Paragraphs = Found.Everything.filter(($el) => $el.tagName === 'P'
      && !$el.closest('table'));

    Found.Lists = Found.Everything.filter(($el) => $el.tagName === 'LI');

    Found.Blockquotes = Found.Everything.filter(($el) => $el.tagName === 'BLOCKQUOTE');

    Found.Tables = Found.Everything.filter(($el) => $el.tagName === 'TABLE' && !$el.matches('[role="presentation"]') && !$el.matches('[role="none"]'));

    Found.StrongItalics = Found.Everything.filter(($el) => ['STRONG', 'EM'].includes($el.tagName));

    Found.Subscripts = Found.Everything.filter(($el) => ['SUP', 'SUB'].includes($el.tagName));

    const badLinkSources = option.checks.QA_BAD_LINK.sources;
    Found.CustomErrorLinks = badLinkSources.length
      ? Found.Links.filter(($el) => badLinkSources.split(',').some((selector) => $el.matches(selector.trim()))) : [];

    // Readability.
    const readabilityExclusions = ($el) => Constants.Root.Readability.contains($el)
      && !Constants.Exclusions.Readability.some((selector) => $el.matches(selector));
    Found.Readability = [
      ...Found.Paragraphs.filter(readabilityExclusions),
      ...Found.Lists.filter(readabilityExclusions),
    ];

    // Developer checks.
    const nestedSources = option.checks.QA_NESTED_COMPONENTS.sources || '[role="tablist"], details';
    Found.NestedComponents = nestedSources
      ? Found.Everything.filter(($el) => $el.matches(nestedSources)) : [];

    Found.TabIndex = Found.Everything.filter(($el) => $el.hasAttribute('tabindex')
      && $el.getAttribute('tabindex') !== '0'
      && !$el.getAttribute('tabindex').startsWith('-'));

    Found.Svg = Found.Everything.filter(($el) => $el.tagName === 'svg');

    Found.Buttons = Found.Everything.filter(($el) => $el.tagName === 'BUTTON' || $el.matches('[role="button"]'));

    Found.Inputs = Found.Everything.filter(($el) => ['INPUT', 'SELECT', 'TEXTAREA', 'METER', 'PROGRESS'].includes($el.tagName));

    Found.Labels = Found.Everything.filter(($el) => $el.tagName === 'LABEL');

    // iFrames.
    Found.iframes = Found.Everything.filter(($el) => ['IFRAME', 'AUDIO', 'VIDEO'].includes($el.tagName));
    Found.Videos = Found.iframes.filter(($el) => $el.matches(Constants.Global.VideoSources));
    Found.Audio = Found.iframes.filter(($el) => $el.matches(Constants.Global.AudioSources));
    Found.Visualizations = Found.iframes.filter(($el) => $el.matches(Constants.Global.VisualizationSources));
    Found.EmbeddedContent = Found.iframes.filter(($el) => !$el.matches(Constants.Global.AllEmbeddedContent));

    // Query select <HTML> given that the lang may change on an SPA.
    const html = document.querySelector('html');
    Found.Language = html.getAttribute('lang');
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
    Found,
    initializeAnnotations,
    Annotations,
  };
}());

export default Elements;
