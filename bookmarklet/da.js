!function(e){"function"==typeof define&&define.amd?define(e):e()}((function(){"use strict";const e="3.0.4",n=e=>{const n=`Sa11yLang${e.charAt(0).toUpperCase()+e.slice(1)}`;Sa11y.Lang.addI18n(window[n].strings),new Sa11y.Sa11y({autoDetectShadowComponents:!0,customChecks:!1,detectSPArouting:!0})};"object"==typeof Sa11y?window.location.pathname.includes("sa11y")?alert('Træk knappen "Sa11y" ind i din bogmærkelinje. Klik derefter på bogmærket på en hvilken som helst webside.'):alert("Sa11y er allerede indlæst på denne side. Vent venligst, eller genindlæs siden og prøv igen."):function(t){const s=document.createElement("link"),d=document.getElementsByTagName("head")[0];s.rel="stylesheet",s.href=`https://cdn.jsdelivr.net/gh/ryersondmp/sa11y@${e}/dist/css/sa11y.min.css`,s.type="text/css",d.appendChild(s);const a=document.createElement("script");a.src=`https://cdn.jsdelivr.net/combine/gh/ryersondmp/sa11y@${e}/dist/js/lang/${t}.umd.min.js,gh/ryersondmp/sa11y@${e}/dist/js/sa11y.umd.min.js`,document.body.appendChild(a),a.onload=()=>n(t),a.onreadystatechange=()=>n(t)}("da")}));
