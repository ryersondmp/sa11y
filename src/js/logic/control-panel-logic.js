/* eslint-disable no-return-assign */
/* eslint-disable no-param-reassign */

import Constants from '../utils/constants';
import { store, isScrollable } from '../utils/utils';
import Lang from '../utils/lang';
import find from '../utils/find';

/**
 * OUTLINE PANEL.
 */
const openOutline = () => {
  Constants.Panel.outlineToggle.classList.add('active');
  Constants.Panel.outline.classList.add('active');
  Constants.Panel.outlineToggle.setAttribute('aria-expanded', 'true');
  store.setItem('sa11y-remember-outline', 'Opened');
  isScrollable(Constants.Panel.outlineList, Constants.Panel.outlineContent);

  // Toggle visibility of heading labels
  const headingLabels = find('sa11y-heading-label', 'root');
  headingLabels.forEach(($el) => $el.hidden = false);

  const event = new CustomEvent('sa11y-build-heading-outline');
  document.dispatchEvent(event);
};

const closeOutline = () => {
  Constants.Panel.outline.classList.remove('active');
  Constants.Panel.outlineToggle.classList.remove('active');
  Constants.Panel.outlineToggle.setAttribute('aria-expanded', 'false');
  store.setItem('sa11y-remember-outline', 'Closed');

  // Toggle visibility of heading labels
  const headingLabels = find('sa11y-heading-label', 'root');
  headingLabels.forEach(($el) => $el.hidden = true);
};

/**
 * IMAGES PANEL.
 */
const openImages = () => {
  Constants.Panel.imagesToggle.classList.add('active');
  Constants.Panel.images.classList.add('active');
  Constants.Panel.imagesToggle.setAttribute('aria-expanded', 'true');
  store.setItem('sa11y-remember-images', 'Opened');
  isScrollable(Constants.Panel.imagesList, Constants.Panel.imagesContent);

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
  isScrollable(
    Constants.Panel.settingsContent,
    Constants.Panel.settingsContent,
    Lang._('SETTINGS'),
  );
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
    } else {
      openOutline();
      closeSettings();
      closeImages();
    }

    // Set focus on Page Outline heading for accessibility.
    Constants.Panel.outlineHeader.focus();
  });

  // Remember to leave outline open
  if (store.getItem('sa11y-remember-outline') === 'Opened') {
    openOutline();
  }

  /* **************** */
  /*  Images panel   */
  /* **************** */
  if (Constants.Global.showImageOutline) {
    Constants.Panel.imagesToggle.addEventListener('click', () => {
      if (Constants.Panel.imagesToggle.getAttribute('aria-expanded') === 'true') {
        closeImages();
      } else {
        openImages();
        closeOutline();
        closeSettings();
      }

      // Set focus on Images heading for accessibility.
      Constants.Panel.imagesHeader.focus();
    });

    // Remember to leave outline open
    if (store.getItem('sa11y-remember-images') === 'Opened') {
      openImages();
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
  });

  // Remember to leave settings open
  if (store.getItem('sa11y-remember-settings') === 'Opened') {
    openSettings();
  }

  // Accessibility: Skip link to Page Issues
  Constants.Panel.skipToPageIssues.addEventListener('click', () => {
    Constants.Panel.pageIssuesHeader.focus();
  });

  /* ******************************** */
  /*  Better keyboard accessibility.  */
  /* ******************************** */
  const tabs = Constants.Panel.panel.querySelectorAll('[role=tab]');
  let currentIndex = Array.from(tabs).findIndex((tab) => tab.classList.contains('active'));
  tabs.forEach((tab) => {
    tab.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        currentIndex = (currentIndex + 1) % tabs.length;
        tabs[currentIndex].focus();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        currentIndex = (currentIndex - 1 + tabs.length) % tabs.length;
        tabs[currentIndex].focus();
      }
    });
  });
}
