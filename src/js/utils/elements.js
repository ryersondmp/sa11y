import Constants from './constants';
import find from './find';

const Elements = (function myElements() {
  const Found = {};
  function initializeElements(linksToFlag) {
    // Main selectors
    Found.Images = find(
      'img',
      'root',
      Constants.Exclusions.Images,
    );

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

    Found.Links = find(
      'a[href]',
      'root',
      Constants.Exclusions.Links,
    );

    // Toggleable rulesets
    Found.Inputs = find(
      'input, select, textarea',
      'root',
      Constants.Exclusions.Container,
    );

    Found.Contrast = find(
      '*',
      'root',
      Constants.Exclusions.Contrast,
    );

    Found.Labels = find(
      'label',
      'root',
      Constants.Exclusions.Container,
    );

    Found.Readability = find(
      'p, li',
      'readability',
      Constants.Exclusions.Readability,
    );

    // Quality assurance module.
    Found.Paragraphs = find(
      'p',
      'root',
      Constants.Exclusions.Container,
    );

    Found.Lists = find(
      'li',
      'root',
      Constants.Exclusions.Container,
    );

    Found.Spans = find(
      'span',
      'root',
      Constants.Exclusions.Container,
    );

    Found.Blockquotes = find(
      'blockquote',
      'root',
      Constants.Exclusions.Container,
    );

    Found.Tables = find(
      'table:not([role="presentation"])',
      'root',
      Constants.Exclusions.Container,
    );

    Found.StrongItalics = find(
      'strong, em',
      'root',
      Constants.Exclusions.Container,
    );

    Found.Ids = find(
      '[id]',
      'document',
      Constants.Exclusions.Container,
    );

    Found.Underlines = find(
      'u',
      'root',
      Constants.Exclusions.Container,
    );

    Found.Subscripts = find(
      'sup, sub',
      'root',
      Constants.Exclusions.Container,
    );

    Found.Language = Constants.Global.html.getAttribute('lang');

    Found.CustomErrorLinks = linksToFlag ? find(
      linksToFlag,
      'root',
      Constants.Exclusions.Container,
    ) : [];

    // iFrames
    Found.iframes = find(
      'iframe:not(hidden), audio, video',
      'root',
      Constants.Exclusions.Container,
    );

    Found.Videos = Found.iframes.filter(($el) => $el.matches(Constants.EmbeddedContent.Video));
    Found.Audio = Found.iframes.filter(($el) => $el.matches(Constants.EmbeddedContent.Audio));
    Found.Visualizations = Found.iframes.filter(($el) => $el.matches(Constants.EmbeddedContent.Visualization));
    Found.EmbeddedContent = Found.iframes.filter(($el) => !$el.matches(Constants.EmbeddedContent.All));
  }

  /* ***************** */
  /* Annotations */
  /* ***************** */
  const Annotations = {};
  function initializeAnnotations() {
    Annotations.Array = find('sa11y-annotation', 'root');
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
