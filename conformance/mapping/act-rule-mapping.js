/**
 * ACT Rule to Editoria11y Check Key Mapping
 *
 * Maps W3C ACT rule IDs to the ed11y check keys that should fire
 * when the rule is violated, plus any options that must be enabled.
 *
 * Consistency logic:
 *   expected "failed"       → ed11y SHOULD produce a result matching checkKeys
 *   expected "passed"       → ed11y should NOT produce a result matching checkKeys
 *   expected "inapplicable" → ed11y should NOT produce a result matching checkKeys
 *
 * Coverage levels:
 *   "full"    — ed11y's checks closely match the ACT rule's scope
 *   "partial" — ed11y covers some but not all cases the ACT rule tests
 *   "todo"    — mapping is uncertain; needs manual review
 */

export const actRuleMapping = {

  // ── Images ────────────────────────────────────────────────────────

  '23a2a8': {
    ruleName: 'Image has non-empty accessible name',
    wcag: ['1.1.1'],
    coverage: 'partial',
    checkKeys: [
      'MISSING_ALT',
      'MISSING_ALT_LINK',
      'MISSING_ALT_LINK_HAS_TEXT',
      'ALT_UNPRONOUNCEABLE',
      'LINK_ALT_UNPRONOUNCEABLE',
    ],
    notes: 'ACT rule also covers div[role="img"] and other implicit img roles. Ed11y focuses on <img> and linked images.',
    options: {},
  },

  '59796f': {
    ruleName: 'Image button has non-empty accessible name',
    wcag: ['1.1.1', '4.1.2'],
    coverage: 'partial',
    checkKeys: [
      'LABELS_MISSING_IMAGE_INPUT',
    ],
    notes: 'Requires form labels plugin enabled.',
    options: {
      formLabelsPlugin: true,
    },
  },

  // TODO: Review — ed11y checks for file extensions and auto-generated alt, but
  // the ACT rule is specifically about filenames used AS the accessible name.
  // Ed11y's ALT_FILE_EXT and ALT_MAYBE_BAD may partially overlap.
  '9eb3f6': {
    ruleName: 'Image filename is accessible name for image',
    wcag: ['1.1.1'],
    coverage: 'todo',
    checkKeys: [
      'ALT_FILE_EXT',
      'LINK_ALT_FILE_EXT',
      'ALT_MAYBE_BAD',
      'LINK_ALT_MAYBE_BAD',
    ],
    notes: 'DEPRECATED ACT rule. Ed11y detects file extensions in alt and auto-generated alt text, but the detection heuristics may not align exactly with this rule.',
    options: {},
  },

  // TODO: Review — ed11y checks SVG in the image ruleset but may not cover
  // all cases of SVG with explicit role="img".
  '7d6734': {
    ruleName: 'SVG element with explicit role has non-empty accessible name',
    wcag: ['1.1.1'],
    coverage: 'todo',
    checkKeys: [
      'MISSING_ALT',
    ],
    notes: 'Ed11y queries svg[role="img"] in its image checks. May not cover all SVG role combinations.',
    options: {},
  },

  // ── Links ─────────────────────────────────────────────────────────

  'c487ae': {
    ruleName: 'Link has non-empty accessible name',
    wcag: ['2.4.4', '2.4.9', '4.1.2'],
    coverage: 'partial',
    checkKeys: [
      'LINK_EMPTY',
      'LINK_EMPTY_NO_LABEL',
      'LINK_EMPTY_LABELLEDBY',
      'LINK_IMAGE_NO_ALT_TEXT',
      'LINK_UNPRONOUNCEABLE',
    ],
    notes: 'Ed11y catches most empty-link patterns. Some ACT test cases use ARIA or role-based accessible names that ed11y does not evaluate for links. Image-level checks (MISSING_ALT_LINK) fire on some failing cases but also false-positive on passing ones, so they are excluded.',
    options: {},
  },

  // ── Buttons ───────────────────────────────────────────────────────

  '97a4e1': {
    ruleName: 'Button has non-empty accessible name',
    wcag: ['4.1.2'],
    coverage: 'full',
    checkKeys: [
      'BTN_EMPTY',
      'BTN_EMPTY_LABELLEDBY',
    ],
    notes: 'Requires developer plugin enabled.',
    options: {
      developerChecksOnByDefault: true,
    },
  },

  // ── Form labels ───────────────────────────────────────────────────

  'e086e5': {
    ruleName: 'Form field has non-empty accessible name',
    wcag: ['1.3.1', '4.1.2'],
    coverage: 'partial',
    checkKeys: [
      'LABELS_MISSING_LABEL',
      'LABELS_MISSING_IMAGE_INPUT',
      'LABELS_NO_FOR_ATTRIBUTE',
    ],
    notes: 'Ed11y checks common form inputs. ACT rule covers all form fields including select, textarea, and ARIA widget roles.',
    options: {
      formLabelsPlugin: true,
    },
  },

  // ── Headings ──────────────────────────────────────────────────────

  'ffd0e9': {
    ruleName: 'Heading has non-empty accessible name',
    wcag: [],
    wcagAria: ['ARIA 1.2 §5.2.8'],
    coverage: 'full',
    checkKeys: [
      'HEADING_EMPTY',
      'HEADING_EMPTY_WITH_IMAGE',
    ],
    notes: 'This is an ARIA spec rule, not directly WCAG.',
    options: {},
  },

  // ── Embedded content ──────────────────────────────────────────────

  'cae760': {
    ruleName: 'Iframe element has non-empty accessible name',
    wcag: ['4.1.2'],
    coverage: 'partial',
    checkKeys: [
      'EMBED_MISSING_TITLE',
    ],
    notes: 'Ed11y checks iframe and object elements for titles/labels. ACT rule is specifically about iframe.',
    options: {
      embeddedContentPlugin: true,
    },
  },

  // ── Page-level meta ───────────────────────────────────────────────

  '2779a5': {
    ruleName: 'HTML page has non-empty title',
    wcag: ['2.4.2'],
    coverage: 'full',
    checkKeys: [
      'META_TITLE',
    ],
    notes: 'Requires developer plugin enabled.',
    options: {
      developerChecksOnByDefault: true,
    },
  },

  'b5c3f8': {
    ruleName: 'HTML page has lang attribute',
    wcag: ['3.1.1'],
    coverage: 'full',
    checkKeys: [
      'META_LANG',
    ],
    notes: 'Requires developer plugin enabled.',
    options: {
      developerChecksOnByDefault: true,
    },
  },

  'bf051a': {
    ruleName: 'HTML page lang attribute has valid language tag',
    wcag: ['3.1.1'],
    coverage: 'partial',
    checkKeys: [
      'META_LANG',
      'META_LANG_VALID',
    ],
    notes: 'Ed11y validates the lang attribute value. The META_LANG check fires for missing lang, META_LANG_VALID for invalid codes.',
    options: {
      developerChecksOnByDefault: true,
    },
  },

  'b4f0c3': {
    ruleName: 'Meta viewport allows for zoom',
    wcag: ['1.4.4', '1.4.10'],
    coverage: 'full',
    checkKeys: [
      'META_SCALABLE',
      'META_MAX',
    ],
    notes: 'Requires developer plugin enabled.',
    options: {
      developerChecksOnByDefault: true,
    },
  },

  'bc659a': {
    ruleName: 'Meta element has no refresh delay',
    wcag: ['2.2.1', '2.2.4', '3.2.5'],
    coverage: 'full',
    checkKeys: [
      'META_REFRESH',
    ],
    notes: 'Requires developer plugin enabled.',
    options: {
      developerChecksOnByDefault: true,
    },
  },

  'bisz58': {
    ruleName: 'Meta element has no refresh delay (no exception)',
    wcag: ['2.2.4', '3.2.5'],
    coverage: 'full',
    checkKeys: [
      'META_REFRESH',
    ],
    notes: 'Same ed11y check as bc659a. ACT has two rules for this with different WCAG mappings.',
    options: {
      developerChecksOnByDefault: true,
    },
  },

  // ── ARIA / focus ──────────────────────────────────────────────────

  '6cfa84': {
    ruleName: 'Element with aria-hidden has no content in sequential focus order',
    wcag: ['4.1.2'],
    coverage: 'partial',
    checkKeys: [
      'HIDDEN_FOCUSABLE',
    ],
    notes: 'Ed11y checks for aria-hidden focusable elements in images, links, buttons, and embeds. May not catch all element types the ACT rule covers.',
    options: {
      developerChecksOnByDefault: true,
    },
  },

  // ── Language of parts ─────────────────────────────────────────────

  // TODO: Review — ed11y's language detection uses Chrome's LanguageDetector API
  // and works differently from the ACT rule, which checks validity of the
  // lang attribute value. Ed11y detects mismatches between declared and
  // detected language, which is a different (broader) check.
  'de46e4': {
    ruleName: 'Element with lang attribute has valid language tag',
    wcag: ['3.1.2'],
    coverage: 'todo',
    checkKeys: [
      'LANG_MISMATCH',
    ],
    notes: 'Ed11y uses AI-based language detection to find mismatches. The ACT rule checks if the lang attribute value itself is valid BCP 47. Different approaches.',
    options: {},
  },

  // ── Contrast ──────────────────────────────────────────────────────

  // TODO: Review — ed11y has an APCA-based contrast checker. The ACT rule
  // uses WCAG 2.x contrast ratios. The methodologies differ significantly.
  'afw4f7': {
    ruleName: 'Text has minimum contrast',
    wcag: ['1.4.3', '1.4.6'],
    coverage: 'todo',
    checkKeys: [
      'CONTRAST_ERROR',
      'CONTRAST_WARNING',
    ],
    notes: 'Ed11y uses APCA contrast algorithm; ACT rule uses WCAG 2.x luminance contrast ratio. Results may not align.',
    options: {
      contrastPlugin: true,
    },
  },

  '09o5cg': {
    ruleName: 'Text has enhanced contrast',
    wcag: ['1.4.6'],
    coverage: 'todo',
    checkKeys: [
      'CONTRAST_ERROR',
      'CONTRAST_WARNING',
    ],
    notes: 'Same concern as afw4f7 — different contrast algorithm.',
    options: {
      contrastPlugin: true,
    },
  },

  // ── Links (descriptive) ──────────────────────────────────────────

  '5effbb': {
    ruleName: 'Link in context is descriptive',
    wcag: ['2.4.4', '2.4.9'],
    coverage: 'partial',
    checkKeys: [
      'LINK_STOPWORD',
    ],
    notes: 'Ed11y catches links with only non-descriptive stopwords (e.g., "click here"). The ACT rule evaluates whether the link is descriptive in context, which is broader.',
    options: {},
  },

  // ── Embedded content (keyboard) ──────────────────────────────────

  'akn7bn': {
    ruleName: 'Iframe with interactive elements is not excluded from tab-order',
    wcag: ['2.1.1', '2.1.3'],
    coverage: 'partial',
    checkKeys: [
      'EMBED_UNFOCUSABLE',
    ],
    notes: 'Ed11y flags iframes with tabindex="-1" regardless of interactive content. The ACT rule specifically requires the iframe to contain interactive elements. Discovery showed high false positive rate on inapplicable cases.',
    options: {
      embeddedContentPlugin: true,
    },
  },

  // ── Tables ───────────────────────────────────────────────────────

  // TODO: Review — Ed11y checks if a table has ANY <th> elements, while
  // the ACT rule checks if `headers` attributes on <td> cells reference
  // valid <th> cell IDs. Different scopes with limited overlap.
  'a25f45': {
    ruleName: 'Headers attribute specified on a cell refers to cells in the same table element',
    wcag: ['1.3.1'],
    coverage: 'todo',
    checkKeys: [
      'TABLES_MISSING_HEADINGS',
    ],
    notes: 'Ed11y checks for the presence of <th> elements in a table. The ACT rule validates that headers attributes point to valid cells. Discovery showed 2/4 failed detected with 2 false positives.',
    options: {},
  },

  // ── Buttons (menuitem) ───────────────────────────────────────────

  // TODO: Review — BTN_EMPTY targets <button> and [role="button"], NOT
  // [role="menuitem"]. Discovery showed BTN_EMPTY firing on 2/2 failed
  // test cases, but this may be coincidental if the test HTML also
  // contains empty buttons.
  'm6b1q3': {
    ruleName: 'Menuitem has non-empty accessible name',
    wcag: ['4.1.2'],
    coverage: 'todo',
    checkKeys: [
      'BTN_EMPTY',
    ],
    notes: 'BTN_EMPTY does not currently target [role="menuitem"]. The discovery signal (0.83) may be from empty buttons in the test case HTML, not the menuitems themselves. Needs investigation.',
    options: {
      developerChecksOnByDefault: true,
    },
  },
};

/**
 * Ed11y options that enable maximum check coverage for conformance testing.
 * Overrides defaults where checks are disabled.
 */
export const conformanceOptions = {
  headless: true,
  checkRoot: 'body',
  readabilityPlugin: false,
  developerChecksOnByDefault: true,
};

/**
 * Get the set of ACT rule IDs that are mapped (not just "todo").
 */
export function getMappedRuleIds() {
  return Object.keys(actRuleMapping);
}

/**
 * Get only rules with confident mappings (not "todo").
 */
export function getConfidentRuleIds() {
  return Object.entries(actRuleMapping)
    .filter(([, rule]) => rule.coverage !== 'todo')
    .map(([id]) => id);
}
