/* eslint-disable no-alert */
import { loadSa11y } from './_loadSa11y';

const langCode = 'el';

if (typeof Sa11y !== 'object') {
  loadSa11y(langCode);
} else {
  alert('Σύρετε το κουμπί "Sa11y" στη γραμμή σελιδοδεικτών σας. Στη συνέχεια, κάντε κλικ στο σελιδοδείκτη σε οποιαδήποτε ιστοσελίδα.');
}
