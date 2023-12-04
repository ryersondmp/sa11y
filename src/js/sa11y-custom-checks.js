import * as Utils from './utils/utils';
import find from './utils/find';

export default function checkCustom(results) {
  const C = {
    ANNOUNCEMENT_MESSAGE:
      'More than one Announcement component found! The Announcement component should be used strategically and sparingly. It should be used to get attention or indicate that something is important. Misuse of this component makes it less effective or impactful. Secondly, this component is semantically labeled as an Announcement for people who use screen readers.',

    ACCORDION_FORM_MESSAGE:
      'Do <strong>not nest forms</strong> within the Accordion component. If the form contains validation issues, a person may not see the form feedback since the accordion panel goes back to its original closed state.',
  };

  /* Example #1 */
  const $checkAnnouncement = find('.sa11y-announcement-component', 'root');
  if ($checkAnnouncement.length > 1) {
    for (let i = 1; i < $checkAnnouncement.length; i++) {
      const key = Utils.prepareDismissal($checkAnnouncement[i].textContent);
      results.push({
        element: $checkAnnouncement[i],
        type: 'warning',
        content: C.ANNOUNCEMENT_MESSAGE,
        inline: false,
        position: 'beforebegin',
        dismiss: key,
      });
    }
  }

  /* Example #2  */
  const $checkAccordions = find('.sa11y-accordion-example', 'root');
  $checkAccordions.forEach(($el) => {
    const checkForm = $el.querySelector('form');
    if (!!checkForm && checkForm.length) {
      results.push({
        element: $el,
        type: 'error',
        content: C.ACCORDION_FORM_MESSAGE,
        inline: false,
        position: 'beforebegin',
      });
    }
  });
  return results;
}
