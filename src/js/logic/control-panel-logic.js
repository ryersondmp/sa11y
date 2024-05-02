/* eslint-disable no-return-assign */
/* eslint-disable no-param-reassign */

import Constants from '../utils/constants';
import { store, isScrollable } from '../utils/utils';
import Lang from '../utils/lang';

/**
 * OUTLINE PANEL.
 */
const openOutline = () => {
  Constants.Panel.outlineToggle.classList.add('active');
  Constants.Panel.outline.classList.add('active');
  Constants.Panel.outlineToggle.setAttribute('aria-expanded', 'true');
  store.setItem('sa11y-remember-outline', 'Opened');

  // Toggle visibility of heading labels
  const $headingAnnotations = document.querySelectorAll('sa11y-heading-label');
  $headingAnnotations.forEach(($el) => $el.hidden = false);

  const event = new CustomEvent('sa11y-build-heading-outline');
  document.dispatchEvent(event);
};

const closeOutline = () => {
  Constants.Panel.outline.classList.remove('active');
  Constants.Panel.outlineToggle.classList.remove('active');
  Constants.Panel.outlineToggle.setAttribute('aria-expanded', 'false');
  store.setItem('sa11y-remember-outline', 'Closed');

  // Toggle visibility of heading labels
  const $headingAnnotations = document.querySelectorAll('sa11y-heading-label');
  $headingAnnotations.forEach(($el) => $el.hidden = true);
};

/**
 * IMAGES PANEL.
 */
const openImages = () => {
  Constants.Panel.imagesToggle.classList.add('active');
  Constants.Panel.images.classList.add('active');
  Constants.Panel.imagesToggle.setAttribute('aria-expanded', 'true');
  store.setItem('sa11y-remember-images', 'Opened');

  const event = new CustomEvent('sa11y-build-image-outline');
  document.dispatchEvent(event);
};

const closeImages = () => {
  if (Constants.Global.showImageOutline) {
    Constants.Panel.imagesToggle.classList.remove('active');
    Constants.Panel.images.classList.remove('active');
    Constants.Panel.imagesToggle.setAttribute('aria-expanded', 'false');
    store.setItem('sa11y-remember-images', 'Closed');
  }
};

/**
 * SETTINGS PANEL.
 */
const openSettings = () => {
  Constants.Panel.settingsToggle.classList.add('active');
  Constants.Panel.settings.classList.add('active');
  Constants.Panel.settingsToggle.setAttribute('aria-expanded', 'true');
  store.setItem('sa11y-remember-settings', 'Opened');
};

const closeSettings = () => {
  Constants.Panel.settings.classList.remove('active');
  Constants.Panel.settingsToggle.classList.remove('active');
  Constants.Panel.settingsToggle.setAttribute('aria-expanded', 'false');
  store.setItem('sa11y-remember-settings', 'Closed');
};

/* **************************************************************** */
/*  Main panel: Initialize Show Outline and Settings buttons/tabs.  */
/* **************************************************************** */
export default function initializePanelToggles() {
  /* **************** */
  /*  Outline panel   */
  /* **************** */
  Constants.Panel.outlineToggle.addEventListener('click', () => {
    if (Constants.Panel.outlineToggle.getAttribute('aria-expanded') === 'true') {
      closeOutline();
      isScrollable(Constants.Panel.outlineList, Constants.Panel.outlineContent);
    } else {
      openOutline();
      closeSettings();
      closeImages();
    }

    // Set focus on Page Outline heading for accessibility.
    Constants.Panel.outlineHeader.focus();
    isScrollable(Constants.Panel.outlineList, Constants.Panel.outlineContent);
  });

  // Remember to leave outline open
  if (store.getItem('sa11y-remember-outline') === 'Opened') {
    openOutline();
    setTimeout(() => {
      isScrollable(Constants.Panel.outlineList, Constants.Panel.outlineContent);
    }, 0);
  }

  /* **************** */
  /*  Images panel   */
  /* **************** */
  if (Constants.Global.showImageOutline) {
    Constants.Panel.imagesToggle.addEventListener('click', () => {
      if (Constants.Panel.imagesToggle.getAttribute('aria-expanded') === 'true') {
        closeImages();
        isScrollable(Constants.Panel.imagesList, Constants.Panel.imagesContent);
      } else {
        openImages();
        closeOutline();
        closeSettings();
      }

      // Set focus on Images heading for accessibility.
      Constants.Panel.imagesHeader.focus();
      setTimeout(() => {
        isScrollable(Constants.Panel.imagesList, Constants.Panel.imagesContent);
      }, 0);
    });

    // Remember to leave outline open
    if (store.getItem('sa11y-remember-images') === 'Opened') {
      openImages();
      setTimeout(() => {
        isScrollable(Constants.Panel.imagesList, Constants.Panel.imagesContent);
      }, 0);
    }
  }

  /* **************** */
  /*  Settings panel  */
  /* **************** */
  Constants.Panel.settingsToggle.addEventListener('click', () => {
    if (Constants.Panel.settingsToggle.getAttribute('aria-expanded') === 'true') {
      closeSettings();
    } else {
      openSettings();
      closeOutline();
      closeImages();
    }

    // Set focus on Settings heading for accessibility.
    Constants.Panel.settingsHeader.focus();

    // Keyboard accessibility fix for scrollable panel content.
    if (Constants.Panel.settingsContent.clientHeight > 350) {
      Constants.Panel.settingsContent.setAttribute('tabindex', '0');
      Constants.Panel.settingsContent.setAttribute('aria-label', `${Lang._('SETTINGS')}`);
      Constants.Panel.settingsContent.setAttribute('role', 'region');
    }
  });

  // Remember to leave settings open
  if (store.getItem('sa11y-remember-settings') === 'Opened') {
    openSettings();
  }

  // Accessibility: Skip link to Page Issues
  Constants.Panel.skipToPageIssues.addEventListener('click', () => {
    Constants.Panel.pageIssuesHeader.focus();
  });

  // Page issues: add gradient if scrollable list.
  setTimeout(() => {
    isScrollable(Constants.Panel.pageIssuesList, Constants.Panel.pageIssuesContent);
  }, 0);
}
