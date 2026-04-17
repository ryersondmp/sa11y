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
    const el = document.createElement('div');
    el.innerHTML = transString;

    // Replace placeholders with span markers.
    if (args?.length) {
      args.forEach((_arg, index) => {
        el.innerHTML = el.innerHTML.replace(/%\([a-zA-Z_]+\)/, `<span data-arg='${index}'></span>`);
      });

      // Inject the actual values as textContent.
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
