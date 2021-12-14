/*-----------------------------------------------------------------------
* Sa11y: the accessibility quality assurance assistant.    
* @version: 2.1.0            
* @author: Development led by Adam Chaboryk, CPWA at Ryerson University.
* All acknowledgements and contributors: https://github.com/ryersondmp/sa11y
* @license: https://github.com/ryersondmp/sa11y/blob/master/LICENSE.md
* Copyright (c) 2020 - 2021 Ryerson University
* The above copyright notice shall be included in all copies or substantial portions of the Software.
------------------------------------------------------------------------*/

/* ------------------------------ */
/*  Bookmarklet: English          */
/* ------------------------------ */

/* TO DO REMOVE @DEVELOPMENT FROM URL BEFORE COMMITTING TO MAIN */

/* Append sa11y.css */
const sa11ycss = document.createElement("link");
sa11ycss.setAttribute("rel", "stylesheet");
sa11ycss.setAttribute("href", "https://cdn.jsdelivr.net/gh/ryersondmp/sa11y@development/src/sa11y.min.css");
sa11ycss.setAttribute("type", "text/css");

const bodyheader = document.getElementsByTagName("head")[0];
bodyheader.appendChild(sa11ycss);

/* Queue Poppers.js, Tippy.js, and Sa11y in specific order. */
const popperJS = document.createElement("script");
popperJS.src = "https://unpkg.com/@popperjs/core@2";

const tippyJS = document.createElement("script");
tippyJS.src = "https://unpkg.com/tippy.js@6";

/* jsDelivr Combine: Sa11y (English), Sa11y.js */
const sa11yJS1 = document.createElement("script");
sa11yJS1.src = "https://cdn.jsdelivr.net/combine/gh/ryersondmp/sa11y@development/src/sa11y-english.min.js,gh/ryersondmp/sa11y@development/src/sa11y.min.js";

/* Queue in the right order. */
document.body.appendChild(popperJS);
  popperJS.onload = popperJS.onreadystatechange = function() {
    document.body.appendChild(tippyJS);
      tippyJS.onload = tippyJS.onreadystatechange = function() {
        document.body.appendChild(sa11yJS1);
          sa11yJS1.onload = sa11yJS1.onreadystatechange = function() {
            const callScript = document.createElement("script");
              callScript.innerHTML = "const sa11y = new Sa11y();"
              document.body.appendChild(callScript);
          }
      };
  };
