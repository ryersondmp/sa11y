!function(e){"function"==typeof define&&define.amd?define(e):e()}((function(){"use strict";const e="3.0.3",t=e=>{const t=`Sa11yLang${e}`;Sa11y.Lang.addI18n(window[t].strings),new Sa11y.Sa11y({autoDetectShadowComponents:!0,customChecks:!1,detectSPArouting:!0})};"object"!=typeof Sa11y?function(n){const s=document.createElement("link"),a=document.getElementsByTagName("head")[0];s.rel="stylesheet",s.href=`https://cdn.jsdelivr.net/gh/ryersondmp/sa11y@${e}/dist/css/sa11y.min.css`,s.type="text/css",a.appendChild(s);const d=document.createElement("script");d.src=`https://cdn.jsdelivr.net/combine/gh/ryersondmp/sa11y@${e}/dist/js/lang/${n.toLowerCase()}.umd.min.js,gh/ryersondmp/sa11y@${e}/dist/js/sa11y.umd.min.js`,document.body.appendChild(d),d.onload=()=>t(n),d.onreadystatechange=()=>t(n)}("Lt"):alert('Vilkite mygtuką "Sa11y" į skirtukų juostą. Tada spustelėkite žymę bet kuriame tinklalapyje.')}));
