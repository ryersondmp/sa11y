import { test, expect } from '@playwright/test';

test.describe.configure({ mode: 'serial' });

/**
 * Check contents of tooltip.
 * @param {page} page Page provides methods to interact with a single tab.
 * @param {string} elementId The ID on the test page.
 * @param {string} expectedText The expected tooltip message.
 * @returns {Promise<boolean>} True if the tooltip text matches, false otherwise.
 */
async function checkTooltip(page, elementId, expectedText) {
  const tooltipMatches = await page.evaluate(({ id, text }) => {
    const element = document.getElementById(id);
    if (!element) return false;
    const annotations = element.querySelectorAll('sa11y-annotation');
    let foundMatch = false;
    annotations.forEach((annotation) => {
      const annotationShadow = annotation.shadowRoot;
      if (annotationShadow) {
        const message = annotationShadow.querySelector('button')?.getAttribute('data-tippy-content');
        if (message && message.includes(text)) {
          foundMatch = true;
        }
      }
    });
    return foundMatch;
  }, { id: elementId, text: expectedText });
  return tooltipMatches;
}

/**
 * Check to ensure there's no annotation!
 * @param {class} page Page provides methods to interact with a single tab.
 * @param {selector} elementId The ID on the test page.
 */
async function noAnnotation(page, elementId) {
  const result = await page.evaluate((id) => {
    const element = document.getElementById(id);
    if (!element) return false;
    const annotation = element.querySelector('sa11y-annotation');
    return !annotation; // Return true if annotation is absent.
  }, elementId);
  return result;
}

/* Unit test suite. */
let page;
test.describe('Sa11y Unit Tests', () => {
  test.beforeAll(async ({ browser }) => {
    page = await browser.newPage();
    // page.on('console', (msg) => console.log(msg.text()));
  });

  // Close everything down after running through all tests.
  test.afterAll(async () => {
    await page.evaluate(() => {
      localStorage.clear();
      sessionStorage.clear();
    });
    await page.close();
  });

  test('Navigate to unit test page and toggle Sa11y', async () => {
    // Navigate to unit tests page.
    await page.goto('http://localhost:8080/test/pages/unit-tests.html');

    // Toggle main toggle.
    await page.evaluate(async () => {
      await new Promise((resolve) => {
        setTimeout(() => {
          const panel = document.querySelector('sa11y-control-panel').shadowRoot;
          const toggle = panel.querySelector('#toggle');
          toggle.click();
          resolve();
        }, 100);
      });
    });
  });

  test('Open status panel', async () => {
    const panelOpen = await page.evaluate(() => {
      const panel = document.querySelector('sa11y-control-panel').shadowRoot;
      const item = panel.getElementById('panel');
      return item.classList.contains('active');
    });
    expect(panelOpen).toBe(true);
  });

  test('Open Page Outline', async () => {
    // Click on the outline toggle.
    const outlinePanelActive = await page.evaluate(() => {
      const panel = document.querySelector('sa11y-control-panel').shadowRoot;
      const toggle = panel.getElementById('outline-toggle');
      toggle.click();

      return new Promise((resolve) => {
        setTimeout(() => {
          const outlinePanel = panel.getElementById('outline-panel');
          const isActive = outlinePanel.classList.contains('active');
          resolve(isActive);
        }, 100);
      });
    });
    expect(outlinePanelActive).toBe(true);
  });

  test('Open Settings', async () => {
    // Click on the outline toggle.
    const settingsPanelActive = await page.evaluate(() => {
      const panel = document.querySelector('sa11y-control-panel').shadowRoot;
      const toggle = panel.getElementById('settings-toggle');
      toggle.click();

      return new Promise((resolve) => {
        setTimeout(() => {
          const settingsPanel = panel.getElementById('settings-panel');
          const isActive = settingsPanel.classList.contains('active');
          resolve(isActive);
        }, 100);
      });
    });
    expect(settingsPanelActive).toBe(true);
  });

  /* Toggle all toggleable buttons. Needed for other unit tests! */
  test('Toggle setting buttons', async () => {
    const toggleSettings = await page.evaluate(async () => {
      const panel = document.querySelector('sa11y-control-panel').shadowRoot;
      const settings = [
        'readability-toggle',
        'theme-toggle',
      ];

      const isActivePromises = settings.map((setting) => {
        const toggle = panel.getElementById(setting);
        toggle.click();

        return new Promise((resolve) => {
          setTimeout(() => {
            const isActive = toggle.getAttribute('aria-pressed') === 'true';
            resolve(isActive);
          }, 100);
        });
      });

      return Promise.all(isActivePromises);
    });

    const allTogglesActive = toggleSettings.every((isActive) => isActive === true);
    expect(allTogglesActive).toBeTruthy();
  });

  /* **************** */
  /*  Headings        */
  /* **************** */

  test('Empty heading', async () => {
    const issue = await checkTooltip(
      page, 'error-empty-heading', 'Empty heading found',
    );
    expect(issue).toBe(true);
  });

  test('Skipped heading', async () => {
    const issue = await checkTooltip(
      page, 'error-skipped-heading', 'Headings should not skip',
    );
    expect(issue).toBe(true);
  });

  test('Ignored heading should have no annotation', async () => {
    const issue = await noAnnotation(
      page, 'nothing-ignore-this-heading',
    );
    expect(issue).toBe(true);
  });

  test('Heading too long', async () => {
    const issue = await checkTooltip(
      page, 'warning-headings-too-long', 'Heading is long!',
    );
    expect(issue).toBe(true);
  });

  test('Blockquote as heading', async () => {
    const issue = await checkTooltip(
      page, 'warning-blockquote-headings', 'Blockquotes should be used for quotes only.',
    );
    expect(issue).toBe(true);
  });

  test('Blockquote should have no annotation', async () => {
    const issue = await noAnnotation(
      page, 'nothing-blockquote-long-enough',
    );
    expect(issue).toBe(true);
  });

  test('Empty heading contains a decorative image', async () => {
    const issue = await checkTooltip(
      page, 'error-empty-heading-decorative-image', 'Heading has no text, but contains an image.',
    );
    expect(issue).toBe(true);
  });

  test('Heading contains an image with alt text', async () => {
    const issue = await checkTooltip(
      page, 'pass-heading-image-alt', 'Good',
    );
    expect(issue).toBe(true);
  });

  test('Skipped heading in the shadow DOM', async () => {
    const shadow = await page.evaluate(async () => {
      const shadowTest = document.querySelector('shadow-test').shadowRoot;
      const annotation = shadowTest.querySelector('sa11y-annotation').shadowRoot;
      const message = annotation.querySelector('button').getAttribute('data-tippy-content');
      return message.includes('Headings should not skip');
    });
    expect(shadow).toBe(true);
  });

  test('<p><b>Bolded text used as heading</b></p>', async () => {
    const issue = await checkTooltip(
      page, 'warning-bold-fake-heading', 'A line of bold or large text might look like a heading',
    );
    expect(issue).toBe(true);
  });

  test('<p><b>Bolded text</b><br> as heading</p>', async () => {
    const issue = await checkTooltip(
      page, 'warning-bold-heading-br', 'A line of bold or large text might look like a heading',
    );
    expect(issue).toBe(true);
  });

  test('No annotation for long bolded sentence', async () => {
    const issue = await noAnnotation(
      page, 'nothing-long-bold-text',
    );
    expect(issue).toBe(true);
  });

  test('Large paragraph text as heading', async () => {
    const issue = await checkTooltip(
      page, 'warning-large-p-heading', 'A line of bold or large text might look like a heading',
    );
    expect(issue).toBe(true);
  });

  test('No annotation for large paragraph with punctuation', async () => {
    const issue = await noAnnotation(
      page, 'nothing-large-p-punctuation',
    );
    expect(issue).toBe(true);
  });

  /* **************** */
  /*  Images          */
  /* **************** */

  test('Image has alt text', async () => {
    const issue = await checkTooltip(
      page, 'pass-image-has-alt-text', 'Good',
    );
    expect(issue).toBe(true);
  });

  test('Alt text has suspicious stop word', async () => {
    const issue = await checkTooltip(
      page, 'warning-alt-text-has-suspicious-stop-word', 'Assistive technologies already indicate that this is an image',
    );
    expect(issue).toBe(true);
  });

  test('Alt text has suspicious stop word in the end', async () => {
    const issue = await checkTooltip(
      page, 'pass-alt-text-has-suspicious-stop-word-end', 'Good',
    );
    expect(issue).toBe(true);
  });

  test('Decorative image', async () => {
    const issue = await checkTooltip(
      page, 'warning-image-is-decorative', 'Image is marked as <strong>decorative</strong>',
    );
    expect(issue).toBe(true);
  });

  test('Decorative image within a carousel component', async () => {
    const issue = await checkTooltip(
      page, 'warning-image-decorative-carousel', 'images in a carousel or gallery',
    );
    expect(issue).toBe(true);
  });

  test('Decorative image in a carousel, but only one image', async () => {
    const issue = await checkTooltip(
      page, 'warning-carousel-decorative', 'Image is marked as <strong>decorative</strong>',
    );
    expect(issue).toBe(true);
  });

  test('Alt text is too long', async () => {
    const issue = await checkTooltip(
      page, 'warning-alt-text-is-too-long', 'Alt text description is <strong>too long</strong>',
    );
    expect(issue).toBe(true);
  });

  test('Missing alt text', async () => {
    const issue = await checkTooltip(
      page, 'error-missing-alt-text', 'Missing alt text!',
    );
    expect(issue).toBe(true);
  });

  test('Image using empty space as alt', async () => {
    const issue = await checkTooltip(
      page, 'error-unpronounceable-empty-space', 'contains unpronounceable',
    );
    expect(issue).toBe(true);
  });

  test('Image using unpronounceable character for alt', async () => {
    const issue = await checkTooltip(
      page, 'error-unpronounceable-character', 'contains unpronounceable',
    );
    expect(issue).toBe(true);
  });

  test('Linked image using unpronounceable character for alt', async () => {
    const issue = await checkTooltip(
      page, 'error-unpronounceable-character-linked', 'linked image only contains unpronounceable',
    );
    expect(issue).toBe(true);
  });

  test('Linked image using unpronounceable character for alt with surrounding text', async () => {
    const issue = await checkTooltip(
      page, 'warning-unpronounceable-character-with-surrounding-text', 'both alt text and surrounding link text',
    );
    expect(issue).toBe(true);
  });

  test('Alt has file extension', async () => {
    const issue = await checkTooltip(
      page, 'error-alt-text-has-file-extension', 'Alt text should not include file extensions or image dimensions',
    );
    expect(issue).toBe(true);
  });

  test('Alt has image dimensions', async () => {
    const issue = await checkTooltip(
      page, 'error-alt-text-has-image-dimensions', 'Alt text should not include file extensions or image dimensions',
    );
    expect(issue).toBe(true);
  });

  test('Alt has placeholder text', async () => {
    const issue = await checkTooltip(
      page, 'error-alt-text-has-placeholder-text', 'Non-descript or placeholder alt text found.',
    );
    expect(issue).toBe(true);
  });

  test('Linked decorative image with surrounding link text', async () => {
    const issue = await checkTooltip(
      page, 'pass-linked-decorative-image-surrounding-text', 'Image is marked as decorative, although the link is using the surrounding text as a descriptive label.',
    );
    expect(issue).toBe(true);
  });

  test('Linked image with alt text', async () => {
    const issue = await checkTooltip(
      page, 'warning-link-has-alt-text', 'Image link contains alt text. Does the alt text describe where the link takes you?',
    );
    expect(issue).toBe(true);
  });

  test('Linked image has alt text that contains a stop word', async () => {
    const issue = await checkTooltip(
      page, 'warning-alt-stop-word', 'Ensure the alt text describes the destination of the link, not a literal description of the image.',
    );
    expect(issue).toBe(true);
  });

  test('Linked image has long alt', async () => {
    const issue = await checkTooltip(
      page, 'warning-link-alt-too-long', 'Alt text description on a linked image is <strong>too long</strong>',
    );
    expect(issue).toBe(true);
  });

  test('Linked image contains both alt and link text', async () => {
    const issue = await checkTooltip(
      page, 'warning-alt-and-link-text', 'Image link contains <strong>both alt text and surrounding link text.</strong>',
    );
    expect(issue).toBe(true);
  });

  test('Linked image missing alt text', async () => {
    const issue = await checkTooltip(
      page, 'error-missing-alt', 'Image is being used as a link but is missing alt text!',
    );
    expect(issue).toBe(true);
  });

  test('Linked image missing alt text and has aria-hidden="true"', async () => {
    const issue = await checkTooltip(
      page, 'error-missing-alt-but-aria-hidden', 'Image is being used as a link but is missing alt text!',
    );
    expect(issue).toBe(true);
  });

  test('Linked image missing alt text and has presentation role', async () => {
    const issue = await checkTooltip(
      page, 'error-missing-alt-but-presentation-role', 'Image is being used as a link but is missing alt text!',
    );
    expect(issue).toBe(true);
  });

  test('Linked image missing alt text but has aria-hidden with surrounding text', async () => {
    const issue = await noAnnotation(
      page, 'nothing-missing-alt-but-aria-hidden-and-surrounding-text',
    );
    expect(issue).toBe(true);
  });

  test('Linked image missing alt text but has presentation role with surrounding text', async () => {
    const issue = await noAnnotation(
      page, 'nothing-missing-alt-but-presentation-role-and-surrounding-text',
    );
    expect(issue).toBe(true);
  });

  test('Regular image with missing alt but has aria-hidden', async () => {
    const issue = await noAnnotation(
      page, 'nothing-missing-alt-but-aria-hidden',
    );
    expect(issue).toBe(true);
  });

  test('Regular image with missing alt but has role="presentation"', async () => {
    const issue = await noAnnotation(
      page, 'nothing-missing-alt-presentation-role',
    );
    expect(issue).toBe(true);
  });

  test('Linked decorative image', async () => {
    const issue = await checkTooltip(
      page, 'error-linked-decorative-image', 'Image within link is marked as decorative and there is no link text.',
    );
    expect(issue).toBe(true);
  });

  test('Linked image using empty space', async () => {
    const issue = await checkTooltip(
      page, 'error-linked-empty-space', 'linked image only contains unpronounceable',
    );
    expect(issue).toBe(true);
  });

  test('Linked image with missing alt and contains link text', async () => {
    const issue = await checkTooltip(
      page, 'error-missing-alt-contains-link-text', 'Image is being used as a link with surrounding text, although the alt attribute should be marked as decorative.',
    );
    expect(issue).toBe(true);
  });

  test('Linked image has alt text containing placeholder stop words', async () => {
    const issue = await checkTooltip(
      page, 'error-linked-alt-placeholder-stopword', 'Non-descript or placeholder alt text within a linked image found.',
    );
    expect(issue).toBe(true);
  });

  test('Linked image has alt text containing file extension', async () => {
    const issue = await checkTooltip(
      page, 'error-linked-alt-file-extension', 'Alt text should not include file extensions or image dimensions. Ensure the alt text describes the destination of the link, not a literal description of the image.',
    );
    expect(issue).toBe(true);
  });

  test('Figure image with different alt and caption text', async () => {
    const issue = await checkTooltip(
      page, 'pass-figure-different-alt-caption', 'Good',
    );
    expect(issue).toBe(true);
  });

  test('Figure image with alt but without figcaption', async () => {
    const issue = await checkTooltip(
      page, 'pass-figure-without-figcaption', 'Good',
    );
    expect(issue).toBe(true);
  });

  test('Decorative figure image', async () => {
    const issue = await checkTooltip(
      page, 'warning-decorative-figure-element', 'Image is marked as <strong>decorative</strong>',
    );
    expect(issue).toBe(true);
  });

  test('Decorative figure image and figcaption', async () => {
    const issue = await checkTooltip(
      page, 'warning-decorative-figure-element-with-figcaption', '<strong>caption</strong> was provided, the image should also have alt text in most cases',
    );
    expect(issue).toBe(true);
  });

  test('Figure element has duplicate alt and caption text', async () => {
    const issue = await checkTooltip(
      page, 'warning-figure-duplicate-alt-caption', 'Do not use the exact same words for both the alt and caption text',
    );
    expect(issue).toBe(true);
  });

  test('Linked figure with alt but without figcaption', async () => {
    const issue = await checkTooltip(
      page, 'warning-linked-figure-alt-without-figcaption', 'Image link contains alt text. Does the alt text describe where the link takes you?',
    );
    expect(issue).toBe(true);
  });

  test('Linked image opens in new tab', async () => {
    const issue = await checkTooltip(
      page, 'warning-hyperlinked-image-opens-in-new-tab', 'Link opens in a new tab or window without warning.',
    );
    expect(issue).toBe(true);
  });

  test('Linked image opens in new tab, alt text provides warning', async () => {
    const issue = await checkTooltip(
      page, 'warning-linked-image-opens-in-new-tab', 'Image link contains alt text. Does the alt text describe where the link takes you?',
    );
    expect(issue).toBe(true);
  });

  test('Linked image should ignore text within link', async () => {
    const issue = await checkTooltip(
      page, 'warning-image-link-should-ignore-text-within-link', 'Image link contains alt',
    );
    expect(issue).toBe(true);
  });

  test('Linked image should ignore text within link via string match exclusion prop ', async () => {
    const issue = await checkTooltip(
      page, 'warning-image-link-should-ignore-text-within-link-string-match', 'Image link contains alt',
    );
    expect(issue).toBe(true);
  });

  test('Linked image has aria-hidden, but still focusable', async () => {
    const issue = await checkTooltip(
      page, 'error-hyperlinked-image-aria-hidden-focusable', 'still keyboard focusable.',
    );
    expect(issue).toBe(true);
  });

  test('Image has aria-hidden', async () => {
    const issue = await noAnnotation(
      page, 'nothing-image-has-aria-hidden-true',
    );
    expect(issue).toBe(true);
  });

  test('Linked image has aria-hidden and negative tabindex', async () => {
    const issue = await noAnnotation(
      page, 'nothing-linked-image-aria-hidden-negative-tabindex',
    );
    expect(issue).toBe(true);
  });

  test('Linked image with aria-hidden, negative tabindex, and alt', async () => {
    const issue = await noAnnotation(
      page, 'nothing-hyperlinked-image-aria-hidden-negative-tabindex-alt',
    );
    expect(issue).toBe(true);
  });

  test('Image has alt supplied via aria-label', async () => {
    const issue = await checkTooltip(
      page, 'pass-alt-via-aria-label', 'A square box rectangle thing.',
    );
    expect(issue).toBe(true);
  });

  test('Image with empty aria-label', async () => {
    const issue = await checkTooltip(
      page, 'error-image-empty-aria-label', 'Missing alt text!',
    );
    expect(issue).toBe(true);
  });

  test('Image with empty space for aria-label', async () => {
    const issue = await checkTooltip(
      page, 'error-image-empty-space-aria-label', 'Missing alt text!',
    );
    expect(issue).toBe(true);
  });

  test('Image with invalid aria-labelledby as alt', async () => {
    const issue = await checkTooltip(
      page, 'error-image-invalid-aria-labelledby', 'Missing alt text!',
    );
    expect(issue).toBe(true);
  });

  test('Image with valid aria-labelledby as alt', async () => {
    const issue = await checkTooltip(
      page, 'pass-image-valid-aria-labelledby', '</strong> Learn more about apples',
    );
    expect(issue).toBe(true);
  });

  test('Linked image with valid aria-label as alt', async () => {
    const issue = await checkTooltip(
      page, 'warning-image-link-valid-aria-label', 'Image link contains alt text. Does the alt text describe',
    );
    expect(issue).toBe(true);
  });

  test('Ignore tracking pixels', async () => {
    const issue = await noAnnotation(
      page, 'nothing-tracking-pixel',
    );
    expect(issue).toBe(true);
  });

  test('Image excluded via prop', async () => {
    const issue = await noAnnotation(
      page, 'nothing-image-ignore-prop',
    );
    expect(issue).toBe(true);
  });

  test('Image has bad alt text', async () => {
    const issue = await checkTooltip(page, 'error-bad-alt', 'Alt text may not provide useful information or contains non-descript text.');
    expect(issue).toBe(true);
  });

  test('Non-english characters, single word, long alt text', async () => {
    const issue = await checkTooltip(page, 'pass-bad-alt', 'Good');
    expect(issue).toBe(true);
  });

  test('Linked image has bad alt text', async () => {
    const issue = await checkTooltip(page, 'error-bad-alt-linked', 'Image link has alt text that may not provide useful information or contains non-descript text. Ensure the alt text describes the destination of the link.');
    expect(issue).toBe(true);
  });

  test('Placeholder alt text (e.g. hero image 1) with trailing numbers', async () => {
    const issue = await checkTooltip(page, 'error-bad-alt-placeholder', 'Non-descript or placeholder alt text found. Replace the following alt text with something more meaningful.');
    expect(issue).toBe(true);
  });

  test('Linked placeholder alt text (e.g. hero image 1) with trailing numbers', async () => {
    const issue = await checkTooltip(page, 'error-bad-alt-placeholder-link', 'Non-descript or placeholder alt text within a linked image found. Ensure the alt text describes the destination of the link, not a literal description of the image. Replace the following alt text.');
    expect(issue).toBe(true);
  });

  test('Placeholder alt text (e.g. hero image 1 and something) with other words', async () => {
    const issue = await checkTooltip(page, 'pass-bad-alt-placeholder', 'Good');
    expect(issue).toBe(true);
  });

  /* **************** */
  /*  Links           */
  /* **************** */

  test('Non descript link text', async () => {
    const ids = [
      'error-non-descript-link-1',
      'error-non-descript-link-2',
      'error-non-descript-link-3',
    ];
    ids.forEach(async (id) => {
      const issue = await checkTooltip(page, id, 'Link text may not be descriptive enough out of context');
      expect(issue).toBe(true);
    });
  });

  test('Non descript link text - i18n (non-Latin characters)', async () => {
    const ids = [
      'error-non-descript-cyrillic',
    ];
    ids.forEach(async (id) => {
      const issue = await checkTooltip(page, id, 'Link text may not be descriptive enough out of context');
      expect(issue).toBe(true);
    });
  });

  test('Non descript link text based on "new tab" or option.linkIgnoreString phrases', async () => {
    const ids = [
      'error-new-tab-link-text-1',
      'error-new-tab-link-text-2',
      'error-new-tab-link-text-3',
      'error-new-tab-link-text-4',
    ];
    ids.forEach(async (id) => {
      const issue = await checkTooltip(page, id, 'Link text may not be descriptive enough out of context');
      expect(issue).toBe(true);
    });
  });

  test('Descriptive link text', async () => {
    const issue = await noAnnotation(
      page, 'nothing-descriptive-link',
    );
    expect(issue).toBe(true);
  });

  test('Non descript links using exclusions prop', async () => {
    const issue = await checkTooltip(
      page, 'error-non-descript-exclusions-prop', 'Link text may not be descriptive',
    );
    expect(issue).toBe(true);
  });

  test('Link pointing to a dev environment via linksToFlag prop', async () => {
    const issue = await checkTooltip(
      page, 'error-custom-error-links', 'Bad link found.',
    );
    expect(issue).toBe(true);
  });

  test('Non descript link using string match exclusion prop', async () => {
    const issue = await checkTooltip(
      page, 'error-non-descript-string-exclusions-prop', 'Link text may not be descriptive',
    );
    expect(issue).toBe(true);
  });

  test('Non descript link check strips "new tab" or similar phrases', async () => {
    const issue = await checkTooltip(
      page, 'error-non-descript-text-strip-new-tab-phrase', 'Link text may not be descriptive',
    );
    expect(issue).toBe(true);
  });

  test('Empty links', async () => {
    const issue1 = await checkTooltip(page, 'error-empty-1', 'Remove empty links');
    expect(issue1).toBe(true);
    const issue2 = await checkTooltip(page, 'error-empty-2', 'Remove empty links');
    expect(issue2).toBe(true);
    const issue3 = await checkTooltip(page, 'error-empty-3', 'Remove empty links');
    expect(issue3).toBe(true);
    const issue4 = await checkTooltip(page, 'error-empty-4', 'Remove empty links');
    expect(issue4).toBe(true);
    const issue5 = await checkTooltip(page, 'error-empty-5', 'Remove empty links');
    expect(issue5).toBe(true);
  });

  test('Empty icon links', async () => {
    const ids = [
      'error-empty-icon-link-1',
      'error-empty-icon-link-2',
      'error-empty-icon-link-3',
      'error-empty-icon-link-4',
    ];
    ids.forEach(async (id) => {
      const issue = await checkTooltip(page, id, 'icon link');
      expect(issue).toBe(true);
    });
  });

  test('Empty hyperlinks with accessible name via title attribute', async () => {
    const ids = [
      'nothing-link-title-1',
      'nothing-link-title-2',
      'nothing-link-title-3',
      'nothing-link-title-4',
      'nothing-link-title-5',
      'nothing-link-title-6',
      'nothing-link-title-7',
    ];
    ids.forEach(async (id) => {
      const issue = await noAnnotation(page, id);
      expect(issue).toBe(true);
    });
  });

  test('Link text contains click here text', async () => {
    const ids = [
      'warning-link-word-1',
    ];
    ids.forEach(async (id) => {
      const issue = await checkTooltip(page, id, 'focus on mouse mechanics');
      expect(issue).toBe(true);
    });
  });

  test('Link text contains symbol', async () => {
    const ids = [
      'warning-link-word-2',
      'warning-link-word-3',
      'warning-link-word-4',
    ];
    ids.forEach(async (id) => {
      const issue = await checkTooltip(page, id, 'Avoid using symbols');
      expect(issue).toBe(true);
    });
  });

  test('Long URLs used as link text', async () => {
    const issue = await checkTooltip(
      page, 'warning-long-url-link-text', 'Longer, less intelligible URLs',
    );
    expect(issue).toBe(true);
  });

  test('Short URLs used as link text', async () => {
    const issue = await noAnnotation(
      page, 'nothing-short-url-link-text',
    );
    expect(issue).toBe(true);
  });

  test('Links that have the same name but different URL', async () => {
    const issue = await checkTooltip(
      page, 'warning-same-name-diff-url-1', 'Link has identical text as another link',
    );

    // Uses ARIA-label
    const issue2 = await checkTooltip(
      page, 'warning-same-name-diff-url-2', 'Link has identical text as another link',
    );
    expect(issue).toBe(true);
    expect(issue2).toBe(true);
  });

  test('Links to DOI', async () => {
    const issue = await checkTooltip(
      page, 'warning-links-to-doi', 'DOI',
    );
    expect(issue).toBe(true);
  });

  test('Links to DOI (doi.org) without trailing characters', async () => {
    const issue = await noAnnotation(
      page, 'nothing-doi',
    );
    expect(issue).toBe(true);
  });

  test('Link opens in new tab WITHOUT warning', async () => {
    const issue = await checkTooltip(
      page, 'warning-link-new-tab', 'Link opens in a new tab or window without warning',
    );
    expect(issue).toBe(true);
  });

  test('Link opens in new tab WITH warning', async () => {
    const issue = await noAnnotation(
      page, 'nothing-link-new-tab',
    );
    expect(issue).toBe(true);
  });

  test('Links to file without warning', async () => {
    const issue = await checkTooltip(
      page, 'warning-link-file', 'Link points to a PDF or downloadable file',
    );
    expect(issue).toBe(true);
  });

  test('Links to file with warning', async () => {
    const issue = await noAnnotation(
      page, 'nothing-link-file',
    );
    expect(issue).toBe(true);
  });

  test('Links with aria-label', async () => {
    const issue1 = await checkTooltip(page, 'pass-aria-link-1',
      'Learn more about dogs');
    expect(issue1).toBe(true);

    const issue2 = await checkTooltip(page, 'pass-aria-link-2',
      'Learn more about WCAG');
    expect(issue2).toBe(true);

    const issue3 = await checkTooltip(page, 'pass-aria-link-3',
      'Learn more about accessibility &#40;Links externally&#41;');
    expect(issue3).toBe(true);

    const issue4 = await checkTooltip(page, 'pass-aria-link-4',
      'about apples');
    expect(issue4).toBe(true);

    const issue5 = await checkTooltip(page, 'pass-aria-link-5',
      'Learn more about apples and oranges');
    expect(issue5).toBe(true);

    const issue6 = await checkTooltip(page, 'pass-aria-link-6',
      'Learn more about Lord of the Rings and the Return of the King');
    expect(issue6).toBe(true);

    const issue7 = await checkTooltip(page, 'pass-aria-link-7',
      'Learn more about the Return of the King &#40;LOTR&#41;');
    expect(issue7).toBe(true);
  });

  test('Links with aria-hidden, but focusable', async () => {
    const issue = await checkTooltip(
      page, 'error-link-aria-hidden-focusable', 'still keyboard focusable',
    );
    expect(issue).toBe(true);
  });

  test('Links with aria-hidden, unfocusable', async () => {
    const issue = await noAnnotation(
      page, 'nothing-link-aria-hidden-unfocusable',
    );
    expect(issue).toBe(true);
  });

  test('Link with aria-labelledby referencing invalid ID', async () => {
    const issue = await checkTooltip(
      page, 'error-arialabelledby-invalid-reference', 'Link has an <code>aria-labelledby',
    );
    expect(issue).toBe(true);
  });

  test('Link with aria-label that does not contain visible text', async () => {
    const issue = await checkTooltip(
      page, 'warning-link-label-in-name', 'The visible text for this element appears to be different than the accessible name',
    );
    expect(issue).toBe(true);
  });

  test('Pass label-in-name check with linkIgnoreStrings prop', async () => {
    const issue = await checkTooltip(
      page, 'pass-link-label-in-name-linkIgnoreStrings', 'Good',
    );
    expect(issue).toBe(true);
  });

  /* **************** */
  /*  QA              */
  /* **************** */

  test('Table without issues', async () => {
    const ids = [
      'nothing-table-1',
      'nothing-table-2',
      'nothing-table-3',
    ];
    ids.forEach(async (id) => {
      const issue = await noAnnotation(page, id);
      expect(issue).toBe(true);
    });
  });

  test('Missing table headers, but focusable', async () => {
    const issue = await checkTooltip(
      page, 'error-table-missing-headers', 'Missing table headers!',
    );
    expect(issue).toBe(true);
  });

  test('Empty table headers', async () => {
    const issue = await checkTooltip(
      page, 'error-empty-table-header', 'Empty table header found!',
    );
    expect(issue).toBe(true);
  });

  test('Table with semantic headings', async () => {
    const issue = await checkTooltip(
      page, 'error-table-has-semantic-headings', 'Semantic headings such as',
    );
    expect(issue).toBe(true);
  });

  test('PDF link', async () => {
    const issue = await checkTooltip(
      page, 'warning-pdf', 'Unable to check PDFs',
    );
    expect(issue).toBe(true);
  });

  test('PDF link with trialing characters', async () => {
    const issue = await checkTooltip(
      page, 'warning-pdf-trailing-characters', 'Unable to check PDFs',
    );
    expect(issue).toBe(true);
  });

  test('Links to Google Sheet', async () => {
    const issue = await checkTooltip(
      page, 'warning-google-doc', 'Unable to check document',
    );
    expect(issue).toBe(true);
  });

  test('Links to Word document', async () => {
    const issue = await checkTooltip(
      page, 'warning-word-doc', 'Unable to check document',
    );
    expect(issue).toBe(true);
  });

  test('Justify-aligned text', async () => {
    const issue = await checkTooltip(
      page, 'warning-justify', 'Avoid using justified text',
    );
    expect(issue).toBe(true);
  });

  test('Small text but no warning', async () => {
    const ids = [
      'nothing-small-text-1',
      'nothing-small-text-2',
    ];
    ids.forEach(async (id) => {
      const issue = await noAnnotation(page, id);
      expect(issue).toBe(true);
    });
  });

  test('Small text size warning', async () => {
    const ids = [
      'warning-small-text-1',
      'warning-small-text-1',
    ];
    ids.forEach(async (id) => {
      const issue = await checkTooltip(page, id, 'Small text is harder to read');
      expect(issue).toBe(true);
    });
  });

  test('Small text size warning (no annotation', async () => {
    const issue = await noAnnotation(
      page, 'nothing-small-text',
    );
    expect(issue).toBe(true);
  });

  test('Uppercase text', async () => {
    const ids = [
      'warning-allcaps-1',
      'warning-allcaps-2',
      'warning-allcaps-3',
      'warning-allcaps-4',
    ];
    ids.forEach(async (id) => {
      const issue = await checkTooltip(page, id, 'Found all caps');
      expect(issue).toBe(true);
    });
  });

  test('Inconsistent all caps (no annotation)', async () => {
    const issue = await noAnnotation(
      page, 'nothing-allcaps',
    );
    expect(issue).toBe(true);
  });

  test('Underlined text', async () => {
    const ids = [
      'warning-underline-1',
      'warning-underline-2',
      'warning-underline-3',
      'warning-underline-4',
      'warning-underline-5',
    ];
    ids.forEach(async (id) => {
      const issue = await checkTooltip(page, id, 'Underlined text can be confused');
      expect(issue).toBe(true);
    });
  });

  test('Fake lists', async () => {
    const ids = [
      'warning-list-1',
      'warning-list-2',
      'warning-list-3',
      'warning-list-4',
      'warning-list-5',
      'warning-list-6',
      'warning-list-7',
      'warning-list-8',
      'warning-list-9',
    ];
    ids.forEach(async (id) => {
      const issue = await checkTooltip(page, id, 'trying to create a list?');
      expect(issue).toBe(true);
    });
  });

  test('Uncontained list items', async () => {
    const issue = await checkTooltip(
      page, 'error-uncontained-list-items', 'list items must be placed inside',
    );
    expect(issue).toBe(true);
  });

  test('Table with numbers should not be flagged as fake list', async () => {
    const issue = await noAnnotation(
      page, 'nothing-warning-list-table',
    );
    expect(issue).toBe(true);
  });

  test('Link with empty href or <a href>', async () => {
    const issue = await checkTooltip(
      page, 'error-broken-same-page-empty-href', 'Broken same-page link',
    );
    expect(issue).toBe(true);
  });

  test('Link used as button without roles (a href=#)', async () => {
    const issue = await checkTooltip(
      page, 'error-broken-same-page', 'Broken same-page link',
    );
    expect(issue).toBe(true);
  });

  test('Elements with duplicate IDs but not referenced by anything', async () => {
    const issue = await noAnnotation(
      page, 'nothing-duplicate-id',
    );
    expect(issue).toBe(true);
  });

  test('Same-page link referencing duplicate IDs', async () => {
    const issue = await checkTooltip(
      page, 'error-broken-same-page-duplicate-id', 'Duplicate ID',
    );
    expect(issue).toBe(true);
  });

  test('Link with button role, aria-controls, or has onclick', async () => {
    const ids = [
      'nothing-same-page-with-role',
      'nothing-same-page-onclick',
      'nothing-same-page-ariacontrols',
      'nothing-same-page-name-attr',
    ];
    ids.forEach(async (id) => {
      const issue = await noAnnotation(page, id);
      expect(issue).toBe(true);
    });
  });

  test('Valid in-page links with various encoded or decoded href and id', async () => {
    const ids = [
      'nothing-encoded-id-and-href',
      'nothing-encoded-href',
      'nothing-encoded-id',
      'nothing-emoji-href',
      'nothing-encoded-emoji-href-id',
      'nothing-encoded-emoji-href-decoded-id',
    ];
    ids.forEach(async (id) => {
      const issue = await noAnnotation(page, id);
      expect(issue).toBe(true);
    });
  });

  test('Interactive element using aria-labelledby referencing duplicate IDs', async () => {
    const issue = await checkTooltip(
      page, 'error-same-aria-labelledby-duplicate-ids', 'Duplicate ID',
    );
    expect(issue).toBe(true);
  });

  test('Two buttons with same id', async () => {
    const issue = await noAnnotation(
      page, 'nothing-duplicate-button-ids',
    );
    expect(issue).toBe(true);
  });

  test('Duplicate ID within the Shadow DOM', async () => {
    const shadow = await page.evaluate(async () => {
      const shadowTest = document.querySelector('shadow-test-duplicate-id').shadowRoot;
      const annotation = shadowTest.querySelector('sa11y-annotation').shadowRoot;
      const message = annotation.querySelector('button').getAttribute('data-tippy-content');
      return message.includes('Duplicate ID');
    });
    expect(shadow).toBe(true);
  });

  test('Subscript and superscript paragraphs', async () => {
    const ids = [
      'warning-supsub-1',
      'warning-supsub-2',
    ];
    ids.forEach(async (id) => {
      const issue = await checkTooltip(page, id, 'subscript');
      expect(issue).toBe(true);
    });
  });

  test('Nested layout components', async () => {
    const ids = [
      'warning-nested-1',
      'warning-nested-2',
    ];
    ids.forEach(async (id) => {
      const issue = await checkTooltip(page, id, 'Avoid nesting interactive layout');
      expect(issue).toBe(true);
    });
  });

  test('Contrast issues', async () => {
    const ids = [
      'error-contrast-1',
      'error-contrast-2',
      'error-contrast-3',
      'error-contrast-4',
      'error-contrast-5',
      'error-contrast-6',
    ];
    ids.forEach(async (id) => {
      const issue = await checkTooltip(page, id, 'enough contrast');
      expect(issue).toBe(true);
    });
  });

  test('Contrast warning', async () => {
    const ids = [
      'warning-contrast',
    ];
    ids.forEach(async (id) => {
      const issue = await checkTooltip(page, id, 'contrast of this text is unknown');
      expect(issue).toBe(true);
    });
  });

  test('Contrast passes', async () => {
    const ids = [
      'nothing-contrast-1',
      'nothing-contrast-2',
      'nothing-contrast-5',
      'nothing-contrast-6',
    ];
    ids.forEach(async (id) => {
      const issue = await noAnnotation(page, id);
      expect(issue).toBe(true);
    });
  });

  test('SVG contrast passes', async () => {
    const ids = [
      'nothing-svg-1',
      'nothing-svg-2',
      'nothing-svg-3',
      'nothing-svg-4',
      'nothing-svg-5',
    ];
    ids.forEach(async (id) => {
      const issue = await noAnnotation(page, id);
      expect(issue).toBe(true);
    });
  });

  test('SVG contrast fails', async () => {
    const ids = [
      'error-svg-1',
      'error-svg-2',
      'error-svg-3',
      'error-svg-4',
      'error-svg-5',
    ];
    ids.forEach(async (id) => {
      const issue = await checkTooltip(page, id, 'Graphic does not have enough contrast');
      expect(issue).toBe(true);
    });
  });

  test('SVG general warnings', async () => {
    const ids = [
      'warning-svg-1',
      'warning-svg-2',
      'warning-svg-3',
      'warning-svg-4',
      'warning-svg-5',
      'warning-svg-6',
      'warning-svg-7',
      'warning-svg-8',
      'warning-svg-9',
      'warning-svg-10',
      'warning-svg-11',
      'warning-svg-12',
      'warning-svg-13',
      'warning-svg-14',
      'warning-svg-15',
      'warning-svg-16',
    ];
    ids.forEach(async (id) => {
      const issue = await checkTooltip(page, id, 'contrast of this graphic is unknown');
      expect(issue).toBe(true);
    });
  });

  /* **************** */
  /*  Inputs          */
  /* **************** */

  test('Inputs with no issues', async () => {
    const ids = [
      'nothing-input-1',
      'nothing-input-2',
      'nothing-input-3',
      'nothing-input-4',
      'nothing-input-5',
      'nothing-input-6',
    ];
    ids.forEach(async (id) => {
      const issue = await noAnnotation(page, id);
      expect(issue).toBe(true);
    });
  });

  test('Inputs with missing labels', async () => {
    const ids = [
      'error-input-1',
      'error-input-2',
      'error-input-3',
      'error-input-4',
      'error-input-5',
    ];
    ids.forEach(async (id) => {
      const issue = await checkTooltip(page, id, 'no label associated with this input');
      expect(issue).toBe(true);
    });

    const issue2 = await checkTooltip(
      page, 'error-input-has-id', 'a <code>for</code> attribute to the label that matches',
    );
    expect(issue2).toBe(true);

    const issue3 = await checkTooltip(
      page, 'error-input-img', 'Image button is missing alt text',
    );
    expect(issue3).toBe(true);
  });

  test('Inputs with warnings', async () => {
    const ids = [
      'warning-input-1',
      'warning-input-2',
      'warning-input-3',
    ];
    ids.forEach(async (id) => {
      const issue = await checkTooltip(page, id, 'Input has an accessible name');
      expect(issue).toBe(true);
    });

    const issue2 = await checkTooltip(
      page, 'warning-input-reset', 'Reset buttons',
    );
    expect(issue2).toBe(true);
  });

  /* **************** */
  /* Embedded content */
  /* **************** */

  test('iFrame with aria-hidden and negative tabindex', async () => {
    const issue = await noAnnotation(
      page, 'nothing-hidden',
    );
    expect(issue).toBe(true);
  });

  test('iframe with negative tabindex', async () => {
    const issue = await checkTooltip(
      page, 'error-focusable-content', 'embedded content will not be keyboard accessible',
    );
    expect(issue).toBe(true);
  });

  test('iframe without accessible name', async () => {
    const issue = await checkTooltip(
      page, 'error-missing-acc-name', 'Embedded content requires an accessible name that describe',
    );
    expect(issue).toBe(true);
  });

  test('Generic iFrame with title', async () => {
    const issue = await checkTooltip(
      page, 'warning-iframe', 'Unable to check embedded content.',
    );
    expect(issue).toBe(true);
  });

  test('iFrame with video source', async () => {
    const issue = await checkTooltip(
      page, 'warning-iframe-youtube', 'all videos have closed captioning',
    );
    expect(issue).toBe(true);
  });

  test('iFrame with audio source', async () => {
    const issue = await checkTooltip(
      page, 'warning-iframe-soundcloud', 'transcript for all podcasts',
    );
    expect(issue).toBe(true);
  });

  test('iFrame with data viz source', async () => {
    const issue = await checkTooltip(
      page, 'warning-iframe-dataviz', 'Data visualization',
    );
    expect(issue).toBe(true);
  });

  test('Video without track', async () => {
    const issue = await checkTooltip(
      page, 'warning-video', 'captions for all audio and video content',
    );
    expect(issue).toBe(true);
  });

  test('Video with track element (empty src)', async () => {
    const issue = await checkTooltip(
      page, 'warning-video-null-track', 'captions for all audio and video content',
    );
    expect(issue).toBe(true);
  });

  test('Video with track', async () => {
    const issue = await noAnnotation(
      page, 'nothing-video',
    );
    expect(issue).toBe(true);
  });

  test('Audio', async () => {
    const issue = await checkTooltip(
      page, 'warning-audio', 'transcripts for audio content is a mandatory',
    );
    expect(issue).toBe(true);
  });

  /* **************** */
  /* Developer checks */
  /* **************** */

  test('Positive tabindex attribute', async () => {
    const issue = await checkTooltip(
      page, 'error-positive-tabindex', 'Element should not have a <code>tabindex</code> attribute',
    );
    expect(issue).toBe(true);
  });

  test('Tabindex with 0 or negative', async () => {
    const ids = [
      'nothing-tabindex-0',
      'nothing-negative-tabindex',
    ];
    ids.forEach(async (id) => {
      const issue = await noAnnotation(page, id);
      expect(issue).toBe(true);
    });
  });

  /* **************** */
  /*  Buttons         */
  /* **************** */

  test('Buttons with missing labels', async () => {
    const ids = [
      'error-button-empty-1',
      'error-button-empty-2',
    ];
    ids.forEach(async (id) => {
      const issue = await checkTooltip(page, id, 'Button is missing an accessible name');
      expect(issue).toBe(true);
    });

    const issue2 = await checkTooltip(
      page, 'error-button-arialabelledby', 'Button has an <code>aria-labelledby',
    );
    expect(issue2).toBe(true);
  });

  test('Button has aria-hidden but still focusable', async () => {
    const issue = await checkTooltip(
      page, 'error-button-ariahidden', 'Link or button has <code>aria-hidden',
    );
    expect(issue).toBe(true);
  });

  test('Buttons should pass', async () => {
    const ids = [
      'nothing-button-1',
      'nothing-button-2',
      'nothing-button-3',
      'nothing-button-4',
      'nothing-button-5',
      'nothing-button-6',
      'nothing-button-7',
      'nothing-button-8',
    ];
    ids.forEach(async (id) => {
      const issue = await noAnnotation(page, id);
      expect(issue).toBe(true);
    });
  });

  test('Buttons with word "button" in acc name', async () => {
    const ids = [
      'warning-button-with-button-text-1',
      'warning-button-with-button-text-2',
    ];
    ids.forEach(async (id) => {
      const issue = await checkTooltip(page, id, 'Do not include the word "button"');
      expect(issue).toBe(true);
    });
  });

  test('Buttons with visible name not in accessible name', async () => {
    const ids = [
      'warning-label-in-name-1',
      'warning-label-in-name-2',
      'warning-label-in-name-3',
      'warning-label-in-name-4',
    ];
    ids.forEach(async (id) => {
      const issue = await checkTooltip(page, id, 'The visible text for this element appears to be different than the accessible name');
      expect(issue).toBe(true);
    });
  });

  // End of tests.
});
