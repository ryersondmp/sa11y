!function(e){"function"==typeof define&&define.amd?define(e):e()}((function(){"use strict";const e="3.0.3",t=e=>{const t=`Sa11yLang${e}`;Sa11y.Lang.addI18n(window[t].strings),new Sa11y.Sa11y({autoDetectShadowComponents:!0,customChecks:!1,detectSPArouting:!0})};"object"!=typeof Sa11y?function(n){const s=document.createElement("link"),o=document.getElementsByTagName("head")[0];s.rel="stylesheet",s.href=`https://cdn.jsdelivr.net/gh/ryersondmp/sa11y@${e}/dist/css/sa11y.min.css`,s.type="text/css",o.appendChild(s);const a=document.createElement("script");a.src=`https://cdn.jsdelivr.net/combine/gh/ryersondmp/sa11y@${e}/dist/js/lang/${n.toLowerCase()}.umd.min.js,gh/ryersondmp/sa11y@${e}/dist/js/sa11y.umd.min.js`,document.body.appendChild(a),a.onload=()=>t(n),a.onreadystatechange=()=>t(n)}("Fr"):alert('Faites glisser le bouton "Sa11y" dans votre barre de favoris. Cliquez ensuite sur le signet de n\'importe quelle page Web.')}));
