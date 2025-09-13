/**
 * Create Images outline.
*/
import Constants from '../utils/constants';
import * as Utils from '../utils/utils';
import { computeAriaLabel } from '../utils/computeAccessibleName';
import Lang from '../utils/lang';
import find from '../utils/find';

/**
 * Generate an "Edit" button for images in the Image outline.
 * @param {Object} image - Image object.
 * @returns {String} - HTML of edit button if hosted on the same domain.
 */
const generateEditLink = (image) => {
  // Image's src attribute.
  const { src } = image.element;

  // Exclusions. Don't show "Edit" button if image src contains string or has class.
  const urlExclusions = Constants.Global.ignoreEditImageURL.some((ignore) => src.includes(ignore));
  const classExclusions = Constants.Global.ignoreEditImageClass.some((ignore) => image.element.classList.contains(ignore));
  if (urlExclusions || classExclusions) return '';

  // Check if image's SRC attribute is hosted on same domain or is relative path.
  const relativePath = Constants.Global.relativePathImageSRC || window.location.host;
  const fileExtension = src.split(relativePath)[1] || '';

  // If admin specifies a unique class name for images via prop.
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

  // Create the href value for the image.
  const editURL = (relativePath && imageID.length)
    ? Constants.Global.editImageURLofCMS + imageUniqueID
    : Constants.Global.editImageURLofCMS + fileExtension;

  // Only add edit button to relative (locally hosted) images.
  const isRelativeLink = (imageSrc) => imageSrc.includes(window.location.host)
    || imageSrc.startsWith(relativePath);

  // Generate final HTML of edit button.
  if ((imageID.length && imageUniqueID !== undefined) || !imageID) {
    return isRelativeLink(src)
      ? `<div class="edit-block"><a href="${encodeURI(editURL)}" tabindex="-1" target="_blank" rel="noopener noreferrer" class="edit">${Lang._('EDIT')}</a></div>` : '';
  }
  return '';
};

/**
 * Generate Image outline.
 * @param {Object[]} dismissed - Array of dismissed objects.
 * @param {Object[]} imageResults - Array of all issues objects that is an <img> element.
 */
export default function generateImageOutline(dismissed, imageResults, option) {
  const imageOutlineHandler = () => {
    const imageArray = [];
    imageResults.forEach((image, i) => {
      // Match dismissed images.
      const isDismissed = dismissed.some((key) => key.dismiss === image.dismiss);
      if (isDismissed) Object.assign(image, { dismissedImage: true });

      // Get image object's properties.
      const { element, type, developer, dismissedImage } = image;
      const altText = computeAriaLabel(element) === 'noAria'
        ? Utils.escapeHTML(element.getAttribute('alt'))
        : computeAriaLabel(element);

      // Check visibility of image.
      const hidden = Utils.isElementVisuallyHiddenOrHidden(element);
      if (hidden) {
        const parent = Utils.findVisibleParent(element, 'display', 'none');
        const anchor = document.createElement('sa11y-image-anchor');
        parent.insertAdjacentElement('beforebegin', anchor);
        anchor.setAttribute('data-sa11y-image-hidden', i);
      } else {
        element.setAttribute('data-sa11y-image', i);
      }

      // Make developer checks don't show images as error if Developer checks are off!
      const devChecksOff = Utils.store.getItem('sa11y-developer') === 'Off'
        || Utils.store.getItem('sa11y-developer') === null;
      const showDeveloperChecks = devChecksOff && (type === 'error' || type === 'warning') && developer === true;

      // Account for lazy loading libraries.
      const source = Utils.getBestImageSource(image.element);

      // Generate edit link if locally hosted image and prop is enabled.
      const edit = Constants.Global.editImageURLofCMS ? generateEditLink(image) : '';

      // Image is decorative (has null alt)
      const decorative = (element.hasAttribute('alt') && Utils.removeWhitespace(altText).length === 0)
        ? `<div class="badge">${Lang._('DECORATIVE')}</div>` : '';

      // If image is linked.
      const anchor = option.imageWithinLightbox ? `a[href]:not(${option.imageWithinLightbox})` : 'a[href]';
      const linked = (element.closest(anchor))
        ? `<div class="badge"><span class="link-icon"></span><span class="visually-hidden">${Lang._('LINKED')}</span></div>` : '';
      const visibleIcon = (hidden === true)
        ? `<div class="badge"><span class="hidden-icon"></span><span class="visually-hidden">${Lang._('HIDDEN')}</span></div>` : '';

      let append;
      if (type === 'error' && !showDeveloperChecks) {
        const missing = altText.length === 0
          ? `<div class="badge">${Lang._('MISSING')}</div>` : `<strong class="red-text">${altText}</strong>`;
        append = `
        <li class="error">
          <button tabindex="-1">
            <img src="${source}" alt/>
            <div class="alt">
              ${visibleIcon}
              ${linked}
              <div class="badge"><span class="error-icon"></span><span class="visually-hidden">${Lang._('ERROR')}</span> ${Lang._('ALT')}</div> ${missing}
            </div>
          </button>
          ${edit}
        </li>`;
        imageArray.push(append);
      } else if (type === 'warning' && !dismissedImage && !showDeveloperChecks) {
        append = `
        <li class="warning">
          <button tabindex="-1">
            <img src="${source}" alt/>
            <div class="alt">
              ${visibleIcon}
              ${linked}
              <div class="badge"><span aria-hidden="true">&#63;</span> <span class="visually-hidden">${Lang._('WARNING')}</span> ${Lang._('ALT')}</div>
              ${decorative} <strong class="yellow-text">${altText}</strong>
            </div>
          </button>
          ${edit}
        </li>`;
        imageArray.push(append);
      } else {
        append = `
        <li class="good">
          <button tabindex="-1">
            <img src="${source}" alt/>
            <div class="alt">
              ${visibleIcon}
              ${linked}
              <div class="badge">${Lang._('ALT')}</div>
              ${decorative} ${altText}
            </div>
          </button>
          ${edit}
        </li>`;
        imageArray.push(append);
      }
    });

    // Append headings to Page Outline.
    Constants.Panel.imagesList.innerHTML = (imageArray.length === 0)
      ? `<li>${Lang._('NO_IMAGES')}</li>` : imageArray.join(' ');

    // Make clickable!
    setTimeout(() => {
      const buttons = Constants.Panel.imagesList.querySelectorAll('button');
      buttons.forEach(($el, i) => {
        $el.addEventListener('click', () => {
          const image = find(`[data-sa11y-image='${i}'], [data-sa11y-image-hidden='${i}']`, 'document', Constants.Exclusions.Container);
          image[0].scrollIntoView({ behavior: `${Constants.Global.scrollBehaviour}`, block: 'center' });
          Utils.addPulse(image[0]);

          // Alert if hidden.
          Utils.removeAlert();
          if (image[0].hasAttribute(['data-sa11y-image-hidden'])) Utils.createAlert(Lang._('NOT_VISIBLE'));
        });
      });

      const tabbable = Constants.Panel.imagesList.querySelectorAll('a, button');
      Utils.initRovingTabindex(Constants.Panel.imagesList, tabbable);
    }, 0);

    // Remove event listener.
    document.removeEventListener('sa11y-build-image-outline', imageOutlineHandler);
  };

  /* Generate image outline based on local storage or if "Image" button is selected. */
  if (Utils.store.getItem('sa11y-images') === 'Opened') imageOutlineHandler();
  document.addEventListener('sa11y-build-image-outline', imageOutlineHandler);
}
