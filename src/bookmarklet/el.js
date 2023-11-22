/* eslint-disable no-alert */
import { loadSa11y } from './_loadSa11y';

const langCode = 'el';

if (typeof Sa11y === 'object') {
  if (window.location.pathname.includes('sa11y')) {
    alert('Σύρετε το κουμπί "Sa11y" στη γραμμή σελιδοδεικτών σας. Στη συνέχεια, κάντε κλικ στο σελιδοδείκτη σε οποιαδήποτε ιστοσελίδα.');
  } else {
    alert('Το Sa11y έχει ήδη φορτωθεί σε αυτή τη σελίδα. Παρακαλώ περιμένετε, ή φορτώστε ξανά τη σελίδα και προσπαθήστε ξανά.');
  }
} else {
  loadSa11y(langCode);
}
