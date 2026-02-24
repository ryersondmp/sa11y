import { computeAriaLabel } from '../utils/computeAccessibleName';
import Constants from '../utils/constants';
import find from '../utils/find';
import Lang from '../utils/lang';
import * as Utils from '../utils/utils';
import { createAlert, removeAlert } from './alert';
import { State } from '../core/state';

const imageOutlineTemplate = document.createElement('template');
imageOutlineTemplate.innerHTML = `
  <li>
    <button type="button" tabindex="-1">
      <img alt="" />
      <div class="alt">
        <span class="badges-container"></span>
        <span class="alt-text-container"></span>
      </div>
    </button>
  </li>
`;

/**
 * Generate an "Edit" button element for images in the Image outline.
 * @param {Object} image - Image object.
 * @returns {HTMLElement|null} - DOM element of edit button if hosted on the same domain.
 */
const generateEditLinkElement = (image) => {
  const { src } = image.element;

  const urlExclusions = State.option.ignoreEditImageURL.some((ignore) => src.includes(ignore));
  const classExclusions = State.option.ignoreEditImageClass.some((ignore) =>
    image.element.classList.contains(ignore),
  );
  if (urlExclusions || classExclusions) {
    return null;
  }

  const relativePath = State.option.relativePathImageSRC || window.location.host;
  const fileExtension = src.split(relativePath)[1] || '';

  const imageID = State.option.relativePathImageID;
  let imageUniqueID;
  if (imageID.length && image.element.classList.length) {
    image.element.classList.forEach((className) => {
      if (className.startsWith(imageID)) {
        const [digit] = className.match(/\d+/) || [];
        imageUniqueID = digit;
      }
    });
  }

  const editURL =
    relativePath && imageID.length
      ? State.option.editImageURLofCMS + imageUniqueID
      : State.option.editImageURLofCMS + fileExtension;

  const isRelativeLink = (imageSrc) =>
    imageSrc.includes(window.location.host) || imageSrc.startsWith(relativePath);

  if ((imageID.length && imageUniqueID !== undefined) || !imageID) {
    if (isRelativeLink(src)) {
      const wrapper = document.createElement('div');
      wrapper.className = 'edit-block';
      const anchor = document.createElement('a');
      anchor.href = editURL;
      anchor.tabIndex = -1;
      anchor.target = '_blank';
      anchor.rel = 'noopener noreferrer';
      anchor.className = 'edit';
      anchor.textContent = Lang._('EDIT');
      wrapper.appendChild(anchor);
      return wrapper;
    }
  }
  return null;
};

/**
 * Generate Image outline.
 */
export default function generateImageOutline() {
  if (!State.option.showImageOutline) return;

  const imageOutlineHandler = () => {
    // Clear container and setup fragment.
    Constants.Panel.imagesList.textContent = '';
    const fragment = document.createDocumentFragment();
    let hasImages = false;

    State.imageResults.forEach((image, i) => {
      hasImages = true;
      const isDismissed = State.dismissedResults.some(
        (key) => key.dismissDigest === image.dismissDigest,
      );
      if (isDismissed) {
        Object.assign(image, { dismissedImage: true });
      }

      const { element, type, developer, dismissedImage } = image;
      const ariaLabel = computeAriaLabel(element);

      // Removed Utils.escapeHTML because textContent inherently protects against XSS
      const altText = ariaLabel === 'noAria' ? (element.getAttribute('alt') ?? '') : (ariaLabel ?? '');

      const hidden = Utils.isElementVisuallyHiddenOrHidden(element);
      if (hidden) {
        const parent = Utils.findVisibleParent(element, 'display', 'none');
        const anchor = document.createElement('sa11y-image-anchor');
        anchor.setAttribute('data-sa11y-parent', `image${i}`);
        const target = parent?.previousElementSibling || parent?.parentNode;
        target?.insertAdjacentElement('beforebegin', anchor);
      } else {
        element.setAttribute('data-sa11y-image', i);
      }

      const dev = Utils.store.getItem('sa11y-developer');
      const devChecksOff = dev === 'Off' || dev === null;
      const showDeveloperChecks = devChecksOff && (type === 'error' || type === 'warning') && developer === true;

      const source = Utils.getBestImageSource(element);

      let decorative = altText === '';
      if (!decorative && State.option.altPlaceholder.length) {
        const altPlaceholderPattern = Utils.generateRegexString(State.option.altPlaceholder, true);
        decorative = altText.match(altPlaceholderPattern)?.[0];
      }

      const clone = imageOutlineTemplate.content.cloneNode(true);
      const li = clone.querySelector('li');
      const img = clone.querySelector('img');
      const badgesContainer = clone.querySelector('.badges-container');
      const altTextContainer = clone.querySelector('.alt-text-container');

      // Set image source.
      img.src = source;

      // Build badges.
      let badgesHTML = '';
      if (hidden) {
        badgesHTML += `<div class="badge"><span class="hidden-icon"></span><span class="visually-hidden">${Lang._('HIDDEN')}</span></div> `;
      }

      const anchorSelector = State.option.imageWithinLightbox ? `a[href]:not(${State.option.imageWithinLightbox})` : 'a[href]';
      if (element.closest(anchorSelector)) {
        badgesHTML += `<div class="badge"><span class="link-icon"></span><span class="visually-hidden">${Lang._('LINKED')}</span></div> `;
      }

      // Apply specific state logic (Error, Warning, Good)
      if (type === 'error' && !showDeveloperChecks) {
        li.className = 'error';
        if (altText.length === 0) badgesHTML += `<div class="badge">${Lang._('MISSING')}</div> `;
        badgesHTML += `<div class="badge"><span class="error-icon"></span><span class="visually-hidden">${Lang._('ERROR')}</span> ${Lang._('ALT')}</div> `;

        // User supplied content.
        if (!decorative) {
          const strong = document.createElement('strong');
          strong.className = 'red-text';
          strong.textContent = altText;
          altTextContainer.replaceWith(strong);
        }
      } else if (type === 'warning' && !dismissedImage && !showDeveloperChecks) {
        li.className = 'warning';
        if (decorative) badgesHTML += `<div class="badge">${Lang._('DECORATIVE')}</div> `;
        badgesHTML += `<div class="badge"><span aria-hidden="true">&#63;</span> <span class="visually-hidden">${Lang._('WARNING')}</span> ${Lang._('ALT')}</div> `;

        // User supplied content.
        if (!decorative) {
          const strong = document.createElement('strong');
          strong.className = 'yellow-text';
          strong.textContent = altText;
          altTextContainer.replaceWith(strong);
        }
      } else {
        li.className = 'good';
        if (decorative) badgesHTML += `<div class="badge">${Lang._('DECORATIVE')}</div> `;
        badgesHTML += `<div class="badge">${Lang._('ALT')}</div> `;

        // User supplied content.
        if (!decorative) {
          altTextContainer.textContent = ` ${altText}`; // XSS Safe
        }
      }

      // Inject compiled badges.
      badgesContainer.innerHTML = badgesHTML;

      // Append edit button if applicable.
      if (State.option.editImageURLofCMS) {
        const editEl = generateEditLinkElement(image);
        if (editEl) li.appendChild(editEl);
      }

      fragment.appendChild(clone);
    });

    // Handle empty state.
    if (!hasImages) {
      const emptyLi = document.createElement('li');
      emptyLi.className = 'no-images';
      emptyLi.textContent = Lang._('NO_IMAGES');
      fragment.appendChild(emptyLi);
    }

    // Append to DOM.
    Constants.Panel.imagesList.appendChild(fragment);

    // Make clickable!
    setTimeout(() => {
      const buttons = Constants.Panel.imagesList.querySelectorAll('button');
      buttons.forEach(($el, i) => {
        $el.addEventListener('click', () => {
          const image = find(
            `[data-sa11y-image='${i}'], [data-sa11y-parent='image${i}']`,
            'document',
            Constants.Exclusions.Container,
          )[0];

          if (image) {
            image.scrollIntoView({
              behavior: `${Constants.Global.scrollBehaviour}`,
              block: 'center',
            });
            Utils.addPulse(image);
          }

          removeAlert();
          if (!image || image.hasAttribute('data-sa11y-parent')) {
            createAlert(Lang._('NOT_VISIBLE'));
          }
        });
      });

      const tabbable = Constants.Panel.imagesList.querySelectorAll('a, button');
      Utils.initRovingTabindex(Constants.Panel.imagesList, tabbable);
    }, 0);

    document.removeEventListener('sa11y-build-image-outline', imageOutlineHandler);
  };

  if (Utils.store.getItem('sa11y-images') === 'Opened') {
    imageOutlineHandler();
  }
  document.addEventListener('sa11y-build-image-outline', imageOutlineHandler);
}