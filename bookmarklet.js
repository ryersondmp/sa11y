// edit main function and add all your javascript into it.
var nextId = idGen();
toBookmarklet({
  mainFn: main, 
  title: "Bookmark Toolbar", 
});


function main () {
  /* I add random characters at the end of the ID so that it does not clash with any other ID's on the page */
  const ID = "--picture-in-picture-toolbar-8743fsfjkl9274g9832fkjdslfjksl7498247389";
  /* Helper functions */
  const get = (selector, el=document) => el.querySelector(selector);
  const getAll = (selector, el=document) => Array.from(el.querySelectorAll(selector));
  /* Remove our toolbar if it exists */
  let _toolbar = get(`#${ID}`);
  if(_toolbar) {
    _toolbar.parent.removeChild(_toolbar); 
  }
  /* create the toolbar */
  const toolbar = document.createElement('div');
  /* Set the toolbar's ID, so we can remove it later */
  toolbar.id = ID;
  /* Use shadow-dom as outlined here: https://developers.google.com/web/fundamentals/web-components/shadowdom */
  /* Inside shadow dom we don't have to worry about conflicting styles. */
  const shadowroot = toolbar.attachShadow({mode: 'open'});
  shadowroot.innerHTML =  `
<style>
#container {
  z-index: 9999;
  border: 1px solid #000;
  border-radius: 3px;
  padding: 0.7em;
  position: fixed;
  top: 0.5em;
  right: 0.5em;
  background-color: rgba(0,0,0,0.7);
  font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji";
}
button {
  padding: 0.5em 0.7em;
  border-radius: 3px;
  box-shadow: none;
  border: 2px solid #fff;
  background-color: transparent;
  color: #fff;
  cursor: pointer;
}
button:hover {
  background-color: white;
  color: black;
}
</style>
<div id="container">
  <button aria-label="click to alert" id="alert">
    Click to Alert
  </button>
  <button aria-label="close" id="close">
    x
  </button>
</div>
    `;
    
  get("#close", shadowroot).addEventListener('click', () => {
    const toolbar = get(`#${ID}`);
    if(toolbar) {
      toolbar.parentNode.removeChild(toolbar);
    }
  });
  const alertEl =  get("#alert", shadowroot);
  alertEl.addEventListener('click', (e) => {
    alert("You clicked to alert");
  })
  document.body.appendChild(toolbar);
}

function toBookmarklet (options) {
  const defaults = {
    mainFn: main,
    title: "", 
    id: nextId(), 
    name: "", 
    description: ""
  }
  options = $.extend({}, defaults, options);
  var {mainFn, title,id,name,description} = options;
  var html = $(`<div>
  <a id="link-${id}">${title}</a>
  <p>${description}</p>
  <textarea id="output-${id}"></textarea>
  <hr>
</div>`);
  var link = html.find(`#link-${id}`);
  link.attr("href", `
  javascript:
  (${mainFn.toString()})()
  `);
  html.find(`#output-${id}`).val((link[0] || {}).outerHTML);
  html.appendTo(document.body);
}

function idGen (id=0) {
  return ()=>id++;
}