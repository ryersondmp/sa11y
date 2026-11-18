/* Translation object */
const Lang = {
  langStrings: {},
  addI18n(strings) {
    this.langStrings = strings;
  },
  _(string) {
    return this.translate(string);
  },
  sprintf(string, ...args) {
    let transString = this._(string);
    transString = this.prepHTML(transString);
    if (args?.length) {
      args.forEach((_arg, index) => {
        transString = transString.replace(/%\([a-zA-Z_]+\)/, `<span data-arg='${index}'></span>`);
      });
    }
    const el = document.createElement('div');
    el.innerHTML = transString;

    // Safely inject the actual values as textContent.
    if (args?.length) {
      args.forEach((arg, index) => {
        const replacement = el.querySelector(`[data-arg="${index}"]`);
        if (!replacement || arg === null) return;
        replacement.textContent = this.truncateString(String(arg), 300);
      });
    }
    return el;
  },
  translate(string) {
    return this.langStrings[string] || string;
  },
  /**
   * Returns a word list (e.g. 'CLICK', 'LINK_STOPWORDS') from the language file. For a missing or
   * malformed entry it returns an empty array, so a custom or outdated language object disables
   * that matching instead of crashing: translate() would return the key itself, a string.
   * @param {string} key - The language file key of an array of strings.
   * @returns {string[]} The list, without non-string entries.
   */
  list(key) {
    const value = this.langStrings[key];
    return Array.isArray(value) ? value.filter((entry) => typeof entry === 'string') : [];
  },
  prepHTML($el) {
    return $el
      .replaceAll(/<hr>/g, '<hr aria-hidden="true">')
      .replaceAll(/<a[\s]href=/g, '<a target="_blank" rel="noopener noreferrer" href=')
      .replaceAll(/<\/a>/g, `<span class="visually-hidden"> (${Lang._('NEW_TAB')})</span></a>`)
      .replaceAll(/{C}/g, 'class="colour"')
      .replaceAll(/{B}/g, 'class="badge"')
      .replaceAll(/{ALT}/g, `<strong class="badge">${Lang._('ALT')}</strong>`)
      .replaceAll(
        /{L}/g,
        `<strong class="badge"><span class="link-icon"></span><span class="visually-hidden">${Lang._('LINKED')}</span></strong>`,
      );
  },
  truncateString(string, maxLength) {
    const truncatedString = string.substring(0, maxLength).trimEnd();
    return string.length > maxLength ? `${truncatedString}...` : string;
  },
};
export default Lang;
