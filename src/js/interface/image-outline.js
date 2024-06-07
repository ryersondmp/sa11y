/**
 * Create Images outline.
*/
import Constants from '../utils/constants';
import * as Utils from '../utils/utils';
import Lang from '../utils/lang';

export default function generateImageOutline(dismissed, imageResults) {
  const generateEditLink = (image) => {
    let finalURL;
    // Only generate edit link if prop is populated.
    if (Constants.Global.editImageURLofCMS.length !== 0) {
      const { src } = image.element;

      // Check if image's SRC attribute is hosted on same domain or is relative path.
      const relativePath = Constants.Global.relativePathImageSRC
        ? Constants.Global.relativePathImageSRC
        : window.location.host;

      const parts = src.split(relativePath);
      const fileExtension = parts.length > 1 ? parts[1] : '';

      const imageID = Constants.Global.relativePathImageID;
      let imageUniqueID;
      if (imageID.length && image.element.classList.length) {
        image.element.classList.forEach((className) => {
          if (className.startsWith(imageID)) {
            const [digit] = className.match(/\d+/) || [];
            imageUniqueID = digit;
          }
        });
      }

      const editURL = (relativePath && imageID.length)
        ? Constants.Global.editImageURLofCMS + imageUniqueID
        : Constants.Global.editImageURLofCMS + fileExtension;

      // Only add edit button to relative (locally hosted) images.
      const isRelativeLink = (imageSrc) => imageSrc.includes(window.location.host) || imageSrc.startsWith(relativePath);
      finalURL = (isRelativeLink(src) && imageUniqueID !== undefined)
        ? `<div class="edit-block"><a
            href="${encodeURI(editURL)}"
            target="_blank"
            rel="noopener noreferrer"
            class="edit">${Lang._('EDIT')}</a></div>`
        : '';
    }
    return finalURL ?? '';
  };

  const imageOutlineHandler = () => {
    // Create a single array that gets appended to heading outline.
    const imageArray = [];

    // Find all dismissed images and update headingOutline array.
    const findDismissedImages = dismissed.map((e) => {
      const found = imageResults.find((f) => (e.key.includes(f.dismiss) && e.href === window.location.pathname));
      if (found === undefined) return '';
      return found;
    });

    findDismissedImages.forEach(($el) => {
      Object.assign($el, { dismissedImage: true });
    });

    imageResults.forEach((image) => {
      const issue = image.type;
      const { dismissedImage } = image;
      const altText = Utils.escapeHTML(image.element.alt);

      // Account for lazy loading libraries that use 'data-src' attribute.
      const { src } = image.element;
      const dataSrc = image.element.getAttribute('data-src');
      const source = (dataSrc && dataSrc.length > 3) ? dataSrc : src;

      // Generate edit link if locally hosted image and prop is enabled.
      const edit = generateEditLink(image);

      // If image is linked.
      const linked = (image.element.closest('a[href]'))
        ? `<div class="badge ${issue}-badge"><span class="link-icon"></span><span class="visually-hidden">${Lang._('LINKED')}</span></div>`
        : '';

      let append;
      if (issue === 'error') {
        const missing = altText.length === 0
          ? `<div class="badge error-badge">${Lang._('MISSING')}</div>`
          : `<strong class="red-text">${altText}</strong>`;
        append = `
        <li class="error">
          <img src="${source}" alt/>
          <div class="alt">
            <div class="badge error-badge"><span class="error-icon"></span><span class="visually-hidden">${Lang._('ERROR')}</span> ${Lang._('ALT')}</div> ${linked} ${missing}
          </div>
          ${edit}
        </li>`;
        imageArray.push(append);
      } else if (issue === 'warning' && !dismissedImage) {
        const decorative = altText.length === 0
          ? `<div class="badge warning-badge">${Lang._('DECORATIVE')}</div>`
          : '';
        append = `
        <li class="warning">
          <img src="${source}" alt/>
          <div class="alt">
            <div class="badge warning-badge"><span aria-hidden="true">&#63;</span> <span class="visually-hidden">${Lang._('WARNING')}</span> ${Lang._('ALT')}</div>
            ${linked} ${decorative} <strong class="yellow-text">${altText}</strong>
          </div>
          ${edit}
        </li>`;
        imageArray.push(append);
      } else {
        const decorative = altText.length === 0
          ? `<div class="badge">${Lang._('DECORATIVE')}</div>`
          : '';
        const goodLinked = (image.element.closest('a[href]'))
          ? `<div class="badge"><span class="link-icon"></span><span class="visually-hidden">${Lang._('LINKED')}</span></div>`
          : '';
        append = `
        <li class="good">
          <img src="${source}" alt/>
          <div class="alt">
            <div class="badge">${Lang._('ALT')}</div>
            ${goodLinked} ${decorative} ${altText}
          </div>
          ${edit}
        </li>`;
        imageArray.push(append);
      }
    });

    // Append headings to Page Outline.
    Constants.Panel.imagesList.innerHTML = (imageArray.length === 0)
      ? `<li>${Lang._('IMAGES_NOT_FOUND')}</li>`
      : imageArray.join(' ');

    // Remove event listener.
    document.removeEventListener('sa11y-build-image-outline', imageOutlineHandler);
  };

  /* Generate image outline based on local storage or if "Image" button is selected. */
  const rememberImages = Utils.store.getItem('sa11y-remember-images');
  if (rememberImages === 'Opened') imageOutlineHandler();
  document.addEventListener('sa11y-build-image-outline', imageOutlineHandler);
}
