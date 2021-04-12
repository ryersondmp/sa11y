/* This is a crude method to ensure bookmarklets will never break in the future (e.g. addition or removal of scripts), and to assist with version control. */

/* Append sa11y.css */
var sa11ycss = document.createElement("link");
sa11ycss.setAttribute("rel", "stylesheet"), sa11ycss.setAttribute("href", "https://cdn.jsdelivr.net/gh/ryersondmp/sa11y@main-v1.1/sa11y.css"), sa11ycss.setAttribute("type", "text/css");
var bodyheader = document.getElementsByTagName("head")[0];
bodyheader.appendChild(sa11ycss);

/* Append jQuery, Poppers.js, Tippy.js, and Sa11y in specific order. */
document.body.appendChild(document.createElement("script")).src = "https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js";
var popperJS = document.createElement("script");
popperJS.src = "https://unpkg.com/@popperjs/core@2";
var tippyJS = document.createElement("script");
tippyJS.src = "https://unpkg.com/tippy.js@6";
var sa11yJS1 = document.createElement("script");
sa11yJS.src = "https://cdn.jsdelivr.net/gh/ryersondmp/sa11y@main-v1.1/sa11y-constant.js";
var sa11yJS2 = document.createElement("script");
sa11yJS.src = "https://cdn.jsdelivr.net/gh/ryersondmp/sa11y@main-v1.1/sa11y-v2.js";
document.body.appendChild(popperJS);
popperJS.onload = popperJS.onreadystatechange = function() {
  document.body.appendChild(tippyJS);
  tippyJS.onload = tippyJS.onreadystatechange = function() {
    document.body.appendChild(sa11yJS1);
    document.body.appendChild(sa11yJS2);
  };
};
