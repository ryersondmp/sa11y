!function(e){"function"==typeof define&&define.amd?define(e):e()}((function(){"use strict";const e="3.0.3",t=e=>{const t=`Sa11yLang${e}`;Sa11y.Lang.addI18n(window[t].strings),new Sa11y.Sa11y({autoDetectShadowComponents:!0,customChecks:!1,detectSPArouting:!0})};"object"!=typeof Sa11y?function(n){const s=document.createElement("link"),d=document.getElementsByTagName("head")[0];s.rel="stylesheet",s.href=`https://cdn.jsdelivr.net/gh/ryersondmp/sa11y@${e}/dist/css/sa11y.min.css`,s.type="text/css",d.appendChild(s);const o=document.createElement("script");o.src=`https://cdn.jsdelivr.net/combine/gh/ryersondmp/sa11y@${e}/dist/js/lang/${n.toLowerCase()}.umd.min.js,gh/ryersondmp/sa11y@${e}/dist/js/sa11y.umd.min.js`,document.body.appendChild(o),o.onload=()=>t(n),o.onreadystatechange=()=>t(n)}("El"):alert('Σύρετε το κουμπί "Sa11y" στη γραμμή σελιδοδεικτών σας. Στη συνέχεια, κάντε κλικ στο σελιδοδείκτη σε οποιαδήποτε ιστοσελίδα.')}));
