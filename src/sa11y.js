/*-----------------------------------------------------------------------
* Sa11y: the accessibility quality assurance assistant.    
* @version: 2.1.2            
* @author: Development led by Adam Chaboryk, CPWA at Ryerson University.
* All acknowledgements and contributors: https://github.com/ryersondmp/sa11y
* @license: https://github.com/ryersondmp/sa11y/blob/master/LICENSE.md
* Copyright (c) 2020 - 2022 Ryerson University
* The above copyright notice shall be included in all copies or substantial portions of the Software.
------------------------------------------------------------------------*/

class Sa11y {
	'use strict';
	constructor(options) {
		let defaultOptions = {

			//Root area to check and exclusions
			checkRoot: 'body',
			containerIgnore: '.sa11y-ignore',
			contrastIgnore: '.sr-only',
			outlineIgnore: '',
			headerIgnore: '',
			imageIgnore: '',
			linkIgnore: 'nav *, [role="navigation"] *',
			linkIgnoreSpan: '',
			linksToFlag: '',
			nonConsecutiveHeadingIsError: true,
			flagLongHeadings: true,
			showGoodLinkButton: true,
			detectSPArouting: false,

			//Readability
			readabilityPlugin: true,
			readabilityRoot: 'body',
			readabilityLang: 'en',
			readabilityIgnore: '',

			//Other plugins
			contrastPlugin: true,
			formLabelsPlugin: true,
			linksAdvancedPlugin: true,

			//QA rulesets
			badLinksQA: true,
			strongItalicsQA: true,
			pdfQA: true,
			langQA: true,
			blockquotesQA: true,
			tablesQA: true,
			allCapsQA: true,
			fakeHeadingsQA: true,
			fakeListQA: true,
			duplicateIdQA: true,
			underlinedTextQA: true,
			exampleQA: false,

			//Embedded content rulesets
			embeddedContentAll: true,
			embeddedContentAudio: true,
			embeddedContentVideo: true,
			embeddedContentTwitter: true,
			embeddedContentDataViz: true,
			embeddedContentTitles: true,
			embeddedContentGeneral: true,

			//Embedded content
			videoContent: "youtube.com, vimeo.com, yuja.com, panopto.com",
			audioContent: "soundcloud.com, simplecast.com, podbean.com, buzzsprout.com, blubrry.com, transistor.fm, fusebox.fm, libsyn.com",
			dataVizContent: "datastudio.google.com, tableau",
			twitterContent: "twitter-timeline",
			embeddedContent: '',
		};
		defaultOptions.embeddedContent = `${defaultOptions.videoContent}, ${defaultOptions.audioContent}, ${defaultOptions.dataVizContent}, ${defaultOptions.twitterContent}`;
		options = {
			...defaultOptions,
			...options
		};
		const M = sa11yLang;

		this.initialize = () => {
			//Icon on the main toggle. Easy to replace.

			const MainToggleIcon =
				"<svg role='img' focusable='false' width='35px' height='35px' aria-hidden='true' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'><path fill='#ffffff' d='M256 48c114.953 0 208 93.029 208 208 0 114.953-93.029 208-208 208-114.953 0-208-93.029-208-208 0-114.953 93.029-208 208-208m0-40C119.033 8 8 119.033 8 256s111.033 248 248 248 248-111.033 248-248S392.967 8 256 8zm0 56C149.961 64 64 149.961 64 256s85.961 192 192 192 192-85.961 192-192S362.039 64 256 64zm0 44c19.882 0 36 16.118 36 36s-16.118 36-36 36-36-16.118-36-36 16.118-36 36-36zm117.741 98.023c-28.712 6.779-55.511 12.748-82.14 15.807.851 101.023 12.306 123.052 25.037 155.621 3.617 9.26-.957 19.698-10.217 23.315-9.261 3.617-19.699-.957-23.316-10.217-8.705-22.308-17.086-40.636-22.261-78.549h-9.686c-5.167 37.851-13.534 56.208-22.262 78.549-3.615 9.255-14.05 13.836-23.315 10.217-9.26-3.617-13.834-14.056-10.217-23.315 12.713-32.541 24.185-54.541 25.037-155.621-26.629-3.058-53.428-9.027-82.141-15.807-8.6-2.031-13.926-10.648-11.895-19.249s10.647-13.926 19.249-11.895c96.686 22.829 124.283 22.783 220.775 0 8.599-2.03 17.218 3.294 19.249 11.895 2.029 8.601-3.297 17.219-11.897 19.249z'/></svg>";

			const sa11ycontainer = document.createElement("div");
			sa11ycontainer.setAttribute("id", "sa11y-container");
			sa11ycontainer.setAttribute("role", "region");
			sa11ycontainer.setAttribute("lang", M["LANG_CODE"]);
			sa11ycontainer.setAttribute("aria-label", M["CONTAINER_LABEL"]);

			let loadContrastPreference =
				localStorage.getItem("sa11y-remember-contrast") === "On";

			let loadLabelsPreference =
				localStorage.getItem("sa11y-remember-labels") === "On";

			let loadChangeRequestPreference =
				localStorage.getItem("sa11y-remember-links-advanced") === "On";

			let loadReadabilityPreference =
				localStorage.getItem("sa11y-remember-readability") === "On";

			sa11ycontainer.innerHTML =

				//Main toggle button.
				`<button type="button" aria-expanded="false" id="sa11y-toggle" aria-describedby="sa11y-notification-badge" aria-label="${M["MAIN_TOGGLE_LABEL"]}" disabled>
                    ${MainToggleIcon} 
                    <div id="sa11y-notification-badge">
                        <span id="sa11y-notification-count"></span>
                    </div>
                </button>` +

				//Start of main container.
				`<div id="sa11y-panel">` +

				//Page Outline tab.
				`<div id="sa11y-outline-panel" role="tabpanel" aria-labelledby="sa11y-outline-header">
                <div id="sa11y-outline-header" class="sa11y-header-text">
                    <h2 tabindex="-1">${M["PAGE_OUTLINE"]}</h2>
                </div>
                <div id="sa11y-outline-content">
                    <ul id="sa11y-outline-list"></ul>
                </div>` +

				//Readability tab.
				`<div id="sa11y-readability-panel">
                    <div id="sa11y-readability-content">
                        <h2 class="sa11y-header-text-inline">${M["LANG_READABILITY"]}</h2>
                        <p id="sa11y-readability-info"></p>
                        <ul id="sa11y-readability-details"></ul>
                    </div>
                </div>
            </div>` + //End of Page Outline tab.

				//Settings tab.
				`<div id="sa11y-settings-panel" role="tabpanel" aria-labelledby="sa11y-settings-header">
                <div id="sa11y-settings-header" class="sa11y-header-text">
                    <h2 tabindex="-1">${M["SETTINGS"]}</h2>
                </div>
                <div id="sa11y-settings-content">
                    <ul id="sa11y-settings-options"> 
                        <li id="sa11y-contrast-li">
                            <label id="sa11y-check-contrast" for="sa11y-contrast-toggle">
								${M["CONTRAST"]}
							</label>
                            <button id="sa11y-contrast-toggle" 
                            aria-labelledby="sa11y-check-contrast" 
                            class="sa11y-settings-switch" 
                            aria-pressed="${
                                loadContrastPreference ? "true" : "false"
                            }">${loadContrastPreference ? M["ON"] : M["OFF"]}</button>
                        </li>
						<li id="sa11y-form-labels-li">
                            <label id="sa11y-check-labels" for="sa11y-labels-toggle">
								${M["FORM_LABELS"]}
							</label>
                            <button id="sa11y-labels-toggle" aria-labelledby="sa11y-check-labels" class="sa11y-settings-switch" 
                            aria-pressed="${
                                loadLabelsPreference ? "true" : "false"
                            }">${loadLabelsPreference ? M["ON"] : M["OFF"]}</button>
                        </li> 
                        <li id="sa11y-links-advanced-li">
                            <label id="check-changerequest" for="sa11y-links-advanced-toggle">
								${M["LINKS_ADVANCED"]} <span class="sa11y-badge">AAA</span>
							</label>
                            <button id="sa11y-links-advanced-toggle" aria-labelledby="check-changerequest" class="sa11y-settings-switch" 
                            aria-pressed="${
                                loadChangeRequestPreference ? "true" : "false"
                            }">${loadChangeRequestPreference ? M["ON"] : M["OFF"]}</button>
                        </li>
                        <li id="sa11y-readability-li">
                            <label id="check-readability" for="sa11y-readability-toggle">
								${M["LANG_READABILITY"]} <span class="sa11y-badge">AAA</span>
							</label>
                            <button id="sa11y-readability-toggle" aria-labelledby="check-readability" class="sa11y-settings-switch" 
                            aria-pressed="${
                                loadReadabilityPreference ? "true" : "false"
                            }">${loadReadabilityPreference ? M["ON"] : M["OFF"]}</button>
                        </li>
                        <li>
                            <label id="sa11y-dark-mode" for="sa11y-theme-toggle">
								${M["DARK_MODE"]}
							</label>
                            <button id="sa11y-theme-toggle" aria-labelledby="sa11y-dark-mode" class="sa11y-settings-switch"></button>
                        </li>
                    </ul>
                </div>
            </div>` +

				//Console warning messages.
				`<div id="sa11y-panel-alert">
                <div class="sa11y-header-text">
                    <button id="sa11y-close-alert" class="sa11y-close-btn" aria-label="${M["ALERT_CLOSE"]}" aria-describedby="sa11y-alert-heading sa11y-panel-alert-text"></button>
                    <h2 id="sa11y-alert-heading">${M["ALERT_TEXT"]}</h2>
                </div>
                <p id="sa11y-panel-alert-text"></p>
                <div id="sa11y-panel-alert-preview"></div>
            </div>` +

				//Main panel that conveys state of page.
				`<div id="sa11y-panel-content">
                <button id="sa11y-cycle-toggle" type="button" aria-label="${M["SHORTCUT_SCREEN_READER"]}">
                    <div class="sa11y-panel-icon"></div>
                </button>
                <div id="sa11y-panel-text">
					<h1 class="sa11y-header-text">${M["PANEL_HEADING"]}</h1>
					<p id="sa11y-status" aria-live="polite"></p>
				</div>
            </div>` +

				//Show Outline & Show Settings button.
				`<div id="sa11y-panel-controls" role="tablist" aria-orientation="horizontal">
                <button type="button" role="tab" aria-expanded="false" id="sa11y-outline-toggle" aria-controls="sa11y-outline-panel">
                    ${M["SHOW_OUTLINE"]}
                </button>
                <button type="button" role="tab" aria-expanded="false" id="sa11y-settings-toggle" aria-controls="sa11y-settings-panel">
                    ${M["SHOW_SETTINGS"]}
                </button>
                <div style="width:40px;"></div> 
            </div>` +

				//End of main container.
				`</div>`;

			const pagebody = document.getElementsByTagName("BODY")[0];
			pagebody.prepend(sa11ycontainer);

			//Put before document.ready because of CSS flicker when dark mode is enabled.
			this.settingPanelToggles();

			//Need to evaluate if "load" event took place for bookmarklet version. Otherwise, only call Sa11y once page has loaded.
			const documentLoadingCheck = (callback) => {
				if (document.readyState === 'complete') {
					callback();
				} else {
					window.addEventListener("load", callback);
				}
			};

			//Once document has fully loaded.
			documentLoadingCheck(() => {
				this.globals();
				this.mainToggle();
				this.utilities();
				this.skipToIssueTooltip();

				document.getElementById("sa11y-toggle").disabled = false;
				if (localStorage.getItem("sa11y-remember-panel") === "Closed" || !localStorage.getItem("sa11y-remember-panel")) {
					this.panelActive = true;
					this.checkAll();
				}

				// Feature to detect page changes (e.g. SPAs).
				if (options.detectSPArouting === true) {
					let url = window.location.href;
					const checkURL = this.debounce(async () => {
						if (url !== window.location.href) {
							//If panel is closed.
							if (localStorage.getItem("sa11y-remember-panel") === "Closed" || !localStorage.getItem("sa11y-remember-panel")) {
								this.panelActive = true;
								this.checkAll();
							}
							//Async scan while panel is open.
							if (this.panelActive === true) {
								this.resetAll(false);
								await this.checkAll();
							}
						}
					}, 250);
					window.addEventListener('mousemove', checkURL);
				}
			});
		};

		this.globals = () => {

			// Readability root
			if (!options.readabilityRoot) {
				options.readabilityRoot = options.checkRoot;
			}

			// Supported readability languages. Turn module off if not supported.
			const supportedLang = ["en", "fr", "es", "de", "nl", "it"],
				pageLang = document.querySelector("html").getAttribute("lang");

			// If lang attribute is missing.
			if (!pageLang) {
				options.readabilityPlugin = false;
			} else {
				const pageLangLowerCase = pageLang.toLowerCase();
				if (!supportedLang.some(el => pageLangLowerCase.includes(el))) {
					options.readabilityPlugin = false;
				}
			}

			/* Exclusions */
			// Container ignores apply to self and children.
			if (options.containerIgnore) {
				let containerSelectors = options.containerIgnore.split(',').map((el) => {
					return `${el} *, ${el}`
				});

				options.containerIgnore = "[aria-hidden='true'], #sa11y-container *, .sa11y-instance *, #wpadminbar *, " + containerSelectors.join(", ");
			} else {
				options.containerIgnore =
					"[aria-hidden='true'], #sa11y-container *, .sa11y-instance *, #wpadminbar *";
			}
			this.containerIgnore = options.containerIgnore;

			// Contrast exclusions
			this.contrastIgnore = this.containerIgnore + ', .sa11y-heading-label';
			if (options.contrastIgnore) {
				this.contrastIgnore = options.contrastIgnore + ', ' + this.contrastIgnore;
			}

			// Ignore specific regions for readability module.
			this.readabilityIgnore = this.containerIgnore + ', nav li, [role="navigation"] li';
			if (options.readabilityIgnore) {
				this.readabilityIgnore = options.readabilityIgnore + ', ' + this.readabilityIgnore;
			}

			// Ignore specific headings
			this.headerIgnore = this.containerIgnore;
			if (options.headerIgnore) {
				this.headerIgnore = options.headerIgnore + ', ' + this.headerIgnore;
			}

			// Don't add heading label or include in panel.
			if (options.outlineIgnore) {
				this.outlineIgnore = options.outlineIgnore + ', #sa11y-container h2';
			}

			// Ignore specific images.
			this.imageIgnore = this.containerIgnore + ", [role='presentation'], [src^='https://trck.youvisit.com']";
			if (options.imageIgnore) {
				this.imageIgnore = options.imageIgnore + ', ' + this.imageIgnore;
			}

			//Ignore specific links
			this.linkIgnore = this.containerIgnore + ', [aria-hidden="true"], .anchorjs-link';
			if (options.linkIgnore) {
				this.linkIgnore = options.linkIgnore + ', ' + this.linkIgnore;
			}

			// Ignore specific classes within links.
			if (options.linkIgnoreSpan) {
				let linkIgnoreSpanSelectors = options.linkIgnoreSpan.split(',').map((el) => {
					return `${el} *, ${el}`
				});
				options.linkIgnoreSpan = "noscript" + linkIgnoreSpanSelectors.join(", ");
			} else {
				options.linkIgnoreSpan =
					"noscript";
			}

			/* Embedded content sources */
			// Video sources.
			if (options.videoContent) {
				let videoContent = options.videoContent.split(/\s*[\s,]\s*/).map((el) => {
					return `[src*='${el}']`
				});
				options.videoContent = "video, " + videoContent.join(", ");
			} else {
				options.videoContent =
					"video";
			}

			// Audio sources.
			if (options.audioContent) {
				let audioContent = options.audioContent.split(/\s*[\s,]\s*/).map((el) => {
					return `[src*='${el}']`
				});
				options.audioContent = "audio, " + audioContent.join(", ");
			} else {
				options.audioContent =
					"audio";
			}

			// Data viz sources.
			if (options.dataVizContent) {
				let dataVizContent = options.dataVizContent.split(/\s*[\s,]\s*/).map((el) => {
					return `[src*='${el}']`
				});
				options.dataVizContent = dataVizContent.join(", ");
			} else {
				options.dataVizContent =
					"datastudio.google.com, tableau";
			}

			// Twitter timeline sources.
			if (options.twitterContent) {
				let twitterContent = options.twitterContent.split(/\s*[\s,]\s*/).map((el) => {
					return `[class*='${el}']`
				});
				options.twitterContent = twitterContent.join(", ");
			} else {
				options.twitterContent =
					"twitter-timeline";
			}

			// Embedded content all
			if (options.embeddedContent) {
				let embeddedContent = options.embeddedContent.split(/\s*[\s,]\s*/).map((el) => {
					if (el === "twitter-timeline") {
						return `[class*='${el}']`
					} else {
						return `[src*='${el}']`
					}
				});
				options.embeddedContent = embeddedContent.join(", ");
			}
		};

		this.mainToggle = () => {
			//Keeps checker active when navigating between pages until it is toggled off.
			const sa11yToggle = document.getElementById("sa11y-toggle");
			sa11yToggle.addEventListener('click', (e) => {

				if (localStorage.getItem("sa11y-remember-panel") === "Opened") {
					localStorage.setItem("sa11y-remember-panel", "Closed");
					sa11yToggle.classList.remove("sa11y-on")
					sa11yToggle.setAttribute("aria-expanded", "false");
					this.resetAll();
					this.updateBadge();
					e.preventDefault();
				} else {
					localStorage.setItem("sa11y-remember-panel", "Opened");
					sa11yToggle.classList.add("sa11y-on");
					sa11yToggle.setAttribute("aria-expanded", "true");
					this.checkAll();
					//Don't show badge when panel is opened.
					document.getElementById("sa11y-notification-badge").style.display = 'none';
					e.preventDefault();
				}
			});

			//Remember to leave it open
			if (localStorage.getItem("sa11y-remember-panel") === "Opened") {
				sa11yToggle.classList.add("sa11y-on");
				sa11yToggle.setAttribute("aria-expanded", "true");
			}

			//Crudely give a little time to load any other content or slow post-rendered JS, iFrames, etc.
			if (sa11yToggle.classList.contains("sa11y-on")) {
				sa11yToggle.classList.toggle("loading-sa11y");
				sa11yToggle.setAttribute("aria-expanded", "true");
				setTimeout(this.checkAll, 800);
			}

			document.onkeydown = (evt) => {
				evt = evt || window.event;

				//Escape key to shutdown.
				let isEscape = false;
				if ("key" in evt) {
					isEscape = (evt.key === "Escape" || evt.key === "Esc");
				} else {
					isEscape = (evt.keyCode === 27);
				}
				if (isEscape && document.getElementById("sa11y-panel").classList.contains("sa11y-active")) {
					tippy.hideAll();
					sa11yToggle.setAttribute("aria-expanded", "false");
					sa11yToggle.classList.remove("sa11y-on");
					sa11yToggle.click();
					this.resetAll();
				}

				//Alt + A to enable accessibility checker.
				if (evt.altKey && evt.code == "KeyA") {
					const sa11yToggle = document.getElementById("sa11y-toggle");
					sa11yToggle.click();
					sa11yToggle.focus();
					evt.preventDefault();
				}
			}

		}

		// ============================================================
		// Helpers: Sanitize HTML and compute ARIA for hyperlinks
		// ============================================================
		this.utilities = () => {

			this.isElementHidden = ($el) => {
				if ($el.getAttribute('hidden') || ($el.offsetWidth === 0 && $el.offsetHeight === 0)) {
					return true;
				} else {
					const compStyles = getComputedStyle($el);
					return compStyles.getPropertyValue('display') === 'none';
				}
			};

			//Helper: Escape HTML, encode HTML symbols.
			this.escapeHTML = (text) => {
				const $div = document.createElement('div');
				$div.textContent = text;
				return $div.innerHTML.replaceAll('"', '&quot;').replaceAll("'", '&#039;').replaceAll("`", '&#x60;');
			}

			//Helper: Help clean up HTML characters for tooltips and outline panel.
			this.sanitizeForHTML = function (string) {
				let entityMap = {
					"&": "&amp;",
					"<": "&lt;",
					">": "&gt;",
					'"': "&quot;",
					"'": "&#39;",
					"/": "&#x2F;",
					"`": "&#x60;",
					"=": "&#x3D;",
				};
				return String(string).replace(/[&<>"'`=\/]/g, function (s) {
					return entityMap[s];
				});
			};

			//Helper: Compute alt text on images within a text node.
			this.computeTextNodeWithImage = function ($el) {
				const imgArray = Array.from($el.querySelectorAll("img"));
				let returnText = "";
				//No image, has text.
				if (imgArray.length === 0 && $el.textContent.trim().length > 1) {
					returnText = $el.textContent.trim();
				}
				//Has image, no text.
				else if (imgArray.length && $el.textContent.trim().length === 0) {
					let imgalt = imgArray[0].getAttribute("alt");
					if (!imgalt || imgalt === " " || imgalt === "") {
						returnText = " ";
					} else if (imgalt !== undefined) {
						returnText = imgalt;
					}
				}
				//Has image and text. 
				//To-do: This is a hack? Any way to do this better?
				else if (imgArray.length && $el.textContent.trim().length) {
					imgArray.forEach(element => {
						element.insertAdjacentHTML("afterend", " <span class='sa11y-clone-image-text' aria-hidden='true'>" + imgArray[0].getAttribute("alt") + "</span> ")
					});
					returnText = $el.textContent.trim();
				}
				return returnText;
			}
			
			//Utility: https://www.joshwcomeau.com/snippets/javascript/debounce/
			this.debounce = (callback, wait) => {
				let timeoutId = null;
				return (...args) => {
					window.clearTimeout(timeoutId);
					timeoutId = window.setTimeout(() => {
						callback.apply(null, args);
					}, wait);
				};
			}

			//Helper: Used to ignore child elements within an anchor.
			this.fnIgnore = (element, selector) => {
				const $clone = element.cloneNode(true);
				const $excluded = Array.from(selector ? $clone.querySelectorAll(selector) : $clone.children);
				$excluded.forEach(($c) => {
					$c.parentElement.removeChild($c);
				});
				return $clone;
			};

			//Helper: Handle ARIA labels for Link Text module.
			this.computeAriaLabel = (el) => {
				if (el.matches("[aria-label]")) {
					return el.getAttribute("aria-label");
				} else if (el.matches("[aria-labelledby]")) {
					let target = el.getAttribute("aria-labelledby").split(/\s+/);
					if (target.length > 0) {
						let returnText = "";
						target.forEach((x) => {
							if (document.querySelector("#" + x) === null) {
								returnText += " ";
							} else {
								returnText += document.querySelector("#" + x).firstChild.nodeValue + " ";
							}
						});
						return returnText;
					} else {
						return "";
					}
				} else if (Array.from(el.children).filter(x => x.matches("[aria-label]")).length > 0) {
					let child = Array.from(el.childNodes);
					let returnText = "";
					
					// Process each child within node.
					child.forEach((x) => {
						if (x.nodeType === 1) {
							if (x.ariaLabel === null) {
								returnText += x.innerText;
							} else {
								returnText += x.getAttribute('aria-label');
							}
						} else {
							returnText += x.nodeValue;
						}
					});
					return returnText;
				} else if (Array.from(el.children).filter(x => x.matches("[aria-labelledby]")).length > 0) {
					let child = Array.from(el.childNodes);
					let returnText = "";
					// Process each child within node.
					child.forEach((x) => {
						if (x.nodeType === 3) {
							returnText += x.nodeValue;
						} else {
							let target = x.getAttribute('aria-labelledby').split(/\s+/);
							if (target.length > 0) {
								let returnAria = "";
								target.forEach((x) => {
									if (document.querySelector("#" + x) === null) {
										returnAria += " ";
									} else {
										returnAria += document.querySelector("#" + x).firstChild.nodeValue + " ";
									}
								});
								returnText += returnAria;
							} else {
								return "";
							}
						}
					});
					return returnText;
				} else if (el.matches("[title]")) {
					return el.getAttribute("title");
				} else {
					return "noAria";
				}
			};
		}

		//----------------------------------------------------------------------
		// Setting's panel: Additional ruleset toggles.
		//----------------------------------------------------------------------
		this.settingPanelToggles = () => {

			//Toggle: Contrast
			const $contrastToggle = document.getElementById("sa11y-contrast-toggle");
			$contrastToggle.onclick = async () => {
				if (localStorage.getItem("sa11y-remember-contrast") === "On") {
					localStorage.setItem("sa11y-remember-contrast", "Off");
					$contrastToggle.textContent = `${M["OFF"]}`;
					$contrastToggle.setAttribute("aria-pressed", "false");
					this.resetAll(false);
					await this.checkAll();
				} else {
					localStorage.setItem("sa11y-remember-contrast", "On");
					$contrastToggle.textContent = `${M["ON"]}`;
					$contrastToggle.setAttribute("aria-pressed", "true");
					this.resetAll(false);
					await this.checkAll();
				}
			};

			//Toggle: Form labels
			const $labelsToggle = document.getElementById("sa11y-labels-toggle");
			$labelsToggle.onclick = async () => {
				if (localStorage.getItem("sa11y-remember-labels") === "On") {
					localStorage.setItem("sa11y-remember-labels", "Off");
					$labelsToggle.textContent = `${M["OFF"]}`;
					$labelsToggle.setAttribute("aria-pressed", "false");
					this.resetAll(false);
					await this.checkAll();
				} else {
					localStorage.setItem("sa11y-remember-labels", "On");
					$labelsToggle.textContent = `${M["ON"]}`;
					$labelsToggle.setAttribute("aria-pressed", "true");
					this.resetAll(false);
					await this.checkAll();
				}
			};

			//Toggle: Links (Advanced)
			const $linksToggle = document.getElementById("sa11y-links-advanced-toggle");
			$linksToggle.onclick = async () => {
				if (localStorage.getItem("sa11y-remember-links-advanced") === "On") {
					localStorage.setItem("sa11y-remember-links-advanced", "Off");
					$linksToggle.textContent = `${M["OFF"]}`;
					$linksToggle.setAttribute("aria-pressed", "false");
					this.resetAll(false);
					await this.checkAll();
				} else {
					localStorage.setItem("sa11y-remember-links-advanced", "On");
					$linksToggle.textContent = `${M["ON"]}`;
					$linksToggle.setAttribute("aria-pressed", "true");
					this.resetAll(false);
					await this.checkAll();
				}
			};

			//Toggle: Readability
			const $readabilityToggle = document.getElementById("sa11y-readability-toggle");
			$readabilityToggle.onclick = async () => {
				if (localStorage.getItem("sa11y-remember-readability") === "On") {
					localStorage.setItem("sa11y-remember-readability", "Off");
					$readabilityToggle.textContent = `${M["OFF"]}`;
					$readabilityToggle.setAttribute("aria-pressed", "false");
					document.getElementById("sa11y-readability-panel").classList.remove("sa11y-active");
					this.resetAll(false);
					await this.checkAll();
				} else {
					localStorage.setItem("sa11y-remember-readability", "On");
					$readabilityToggle.textContent = `${M["ON"]}`;
					$readabilityToggle.setAttribute("aria-pressed", "true");
					document.getElementById("sa11y-readability-panel").classList.add("sa11y-active");
					this.resetAll(false);
					await this.checkAll();
				}
			};

			if (localStorage.getItem("sa11y-remember-readability") === "On") {
				document.getElementById("sa11y-readability-panel").classList.add("sa11y-active");
			}

			//Toggle: Dark mode. (Credits: https://derekkedziora.com/blog/dark-mode-revisited)
			let systemInitiatedDark = window.matchMedia(
				"(prefers-color-scheme: dark)"
			);
			const $themeToggle = document.getElementById("sa11y-theme-toggle"),
				html = document.querySelector("html"),
				theme = localStorage.getItem("sa11y-remember-theme");

			if (systemInitiatedDark.matches) {
				$themeToggle.textContent = `${M["ON"]}`;
				$themeToggle.setAttribute("aria-pressed", "true");
			} else {
				$themeToggle.textContent = `${M["OFF"]}`;
				$themeToggle.setAttribute("aria-pressed", "false");
			}

			function prefersColorTest(systemInitiatedDark) {
				if (systemInitiatedDark.matches) {
					html.setAttribute("data-sa11y-theme", "dark");
					$themeToggle.textContent = `${M["ON"]}`;
					$themeToggle.setAttribute("aria-pressed", "true");
					localStorage.setItem("sa11y-remember-theme", "");
				} else {
					html.setAttribute("data-sa11y-theme", "light");
					$themeToggle.textContent = `${M["OFF"]}`;
					$themeToggle.setAttribute("aria-pressed", "false");
					localStorage.setItem("sa11y-remember-theme", "");
				}
			}

			systemInitiatedDark.addEventListener('change', prefersColorTest);
			$themeToggle.onclick = async () => {
				const theme = localStorage.getItem("sa11y-remember-theme");
				if (theme === "dark") {
					html.setAttribute("data-sa11y-theme", "light");
					localStorage.setItem("sa11y-remember-theme", "light");
					$themeToggle.textContent = `${M["OFF"]}`;
					$themeToggle.setAttribute("aria-pressed", "false");
				} else if (theme === "light") {
					html.setAttribute("data-sa11y-theme", "dark");
					localStorage.setItem("sa11y-remember-theme", "dark");
					$themeToggle.textContent = `${M["ON"]}`;
					$themeToggle.setAttribute("aria-pressed", "true");
				} else if (systemInitiatedDark.matches) {
					html.setAttribute("data-sa11y-theme", "light");
					localStorage.setItem("sa11y-remember-theme", "light");
					$themeToggle.textContent = `${M["OFF"]}`;
					$themeToggle.setAttribute("aria-pressed", "false");
				} else {
					html.setAttribute("data-sa11y-theme", "dark");
					localStorage.setItem("sa11y-remember-theme", "dark");
					$themeToggle.textContent = `${M["ON"]}`;
					$themeToggle.setAttribute("aria-pressed", "true");
				}
			};
			if (theme === "dark") {
				html.setAttribute("data-sa11y-theme", "dark");
				localStorage.setItem("sa11y-remember-theme", "dark");
				$themeToggle.textContent = `${M["ON"]}`;
				$themeToggle.setAttribute("aria-pressed", "true");
			} else if (theme === "light") {
				html.setAttribute("data-sa11y-theme", "light");
				localStorage.setItem("sa11y-remember-theme", "light");
				$themeToggle.textContent = `${M["OFF"]}`;
				$themeToggle.setAttribute("aria-pressed", "false");
			}
		}

		//----------------------------------------------------------------------
		// Tooltip for Jump-to-Issue button.
		//----------------------------------------------------------------------
		this.skipToIssueTooltip = () => {

			let keyboardShortcut;
			if (navigator.userAgent.indexOf("Mac") != -1) {
				keyboardShortcut = `<span class="sa11y-kbd">Option</span> + <span class="sa11y-kbd">S</span>`
			} else {
				keyboardShortcut = `<span class="sa11y-kbd">Alt</span> + <span class="sa11y-kbd">S</span>`
			}

			tippy('#sa11y-cycle-toggle', {
				content: `<div style="text-align:center">${sa11yLang["SHORTCUT_TOOLTIP"]} &raquo;<br>${keyboardShortcut}</div>`,
				allowHTML: true,
				delay: [900, 0],
				trigger: "mouseenter focusin",
				arrow: true,
				placement: 'top',
				theme: "sa11y-theme",
				aria: {
					content: null,
					expanded: false,
				},
				appendTo: document.body,
			});
		}

		// ----------------------------------------------------------------------
		// Check all
		// ----------------------------------------------------------------------
		this.checkAll = async () => {
			this.errorCount = 0;
			this.warningCount = 0;

			//Error handling. If specified selector doesn't exist on page.
			const rootTarget = document.querySelector(options.checkRoot);
			if (!rootTarget) {

				//If target root can't be found, scan the body of page instead.
				this.root = document.querySelector("body");

				//Send an alert to panel.
				const $alertPanel = document.getElementById("sa11y-panel-alert"),
					$alertText = document.getElementById("sa11y-panel-alert-text");

				const root = options.checkRoot;
				$alertText.innerHTML = `${M["ERROR_MISSING_ROOT_TARGET"](root)}`;
				$alertPanel.classList.add("sa11y-active");

			} else {
				this.root = document.querySelector(options.checkRoot);
			}

			this.findElements();

			//Ruleset checks
			this.checkHeaders();
			this.checkLinkText();
			this.checkAltText();

			// Contrast plugin
			if (options.contrastPlugin === true) {
				if (localStorage.getItem("sa11y-remember-contrast") === "On") {
					this.checkContrast();
				}
			} else {
				const contrastLi = document.getElementById("sa11y-contrast-li");
				contrastLi.setAttribute("style", "display: none !important;");
				localStorage.setItem("sa11y-remember-contrast", "Off");
			}

			// Form labels plugin
			if (options.formLabelsPlugin === true) {
				if (localStorage.getItem("sa11y-remember-labels") === "On") {
					this.checkLabels();
				}
			} else {
				const formLabelsLi = document.getElementById("sa11y-form-labels-li");
				formLabelsLi.setAttribute("style", "display: none !important;");
				localStorage.setItem("sa11y-remember-labels", "Off");
			}

			// Links (Advanced) plugin
			if (options.linksAdvancedPlugin === true) {
				if (localStorage.getItem("sa11y-remember-links-advanced") === "On") {
					this.checkLinksAdvanced();
				}
			} else {
				const linksAdvancedLi = document.getElementById("sa11y-links-advanced-li");
				linksAdvancedLi.setAttribute("style", "display: none !important;");
				localStorage.setItem("sa11y-remember-links-advanced", "Off");
			}

			// Readability plugin
			if (options.readabilityPlugin === true) {
				if (localStorage.getItem("sa11y-remember-readability") === "On") {
					this.checkReadability();
				}
			} else {
				const readabilityLi = document.getElementById("sa11y-readability-li"),
					readabilityPanel = document.getElementById("sa11y-readability-panel");
				readabilityLi.setAttribute("style", "display: none !important;");
				readabilityPanel.classList.remove("sa11y-active");
				//localStorage.setItem("sa11y-remember-readability", "Off");
			}

			//Embedded content plugin
			if (options.embeddedContentAll === true) {
				this.checkEmbeddedContent();
			}

			this.checkQA();

			//Update panel
			if (this.panelActive) {
				this.resetAll();
			} else {
				this.updatePanel();
			}
			this.initializeTooltips();
			this.detectOverflow();
			this.nudge();

			//Don't show badge when panel is opened.
			if (!document.getElementsByClassName("sa11y-on").length) {
				this.updateBadge();
			}
		};

		// ============================================================
		// Reset all
		// ============================================================
		this.resetAll = (restartPanel = true) => {
			this.panelActive = false;
			this.clearEverything();

			const html = document.querySelector("html");
			html.removeAttribute("data-sa11y-active");

			//Remove eventListeners on the Show Outline and Show Panel toggles.
			const $outlineToggle = document.getElementById("sa11y-outline-toggle");
			const resetOutline = $outlineToggle.cloneNode(true);
			$outlineToggle.parentNode.replaceChild(resetOutline, $outlineToggle);

			const $settingsToggle = document.getElementById("sa11y-settings-toggle");
			const resetSettings = $settingsToggle.cloneNode(true);
			$settingsToggle.parentNode.replaceChild(resetSettings, $settingsToggle);

			// Reset all classes on elements.
			const resetClass = (el) => {
				el.forEach(el => {
					document.querySelectorAll('.' + el).forEach((x) => x.classList.remove(el));
				})
			};
			resetClass(['sa11y-error-border', 'sa11y-error-text', 'sa11y-warning-border', 'sa11y-warning-text', 'sa11y-good-border', 'sa11y-good-text', 'sa11y-overflow', 'sa11y-fake-heading', 'sa11y-pulse-border', 'sa11y-fake-list']);

			const allcaps = document.querySelectorAll('.sa11y-warning-uppercase');
			allcaps.forEach(el => el.outerHTML = el.innerHTML);

			//Remove
			document.querySelectorAll(`
                .sa11y-instance,
                .sa11y-instance-inline,
                .sa11y-heading-label,
                #sa11y-outline-list li,
                .sa11y-readability-period,
                #sa11y-readability-info span,
                #sa11y-readability-details li,
                .sa11y-clone-image-text
            `).forEach(el => el.parentNode.removeChild(el));

			//Alert within panel.
			document.querySelector('#sa11y-panel-alert').classList.remove("sa11y-active");

			let empty = document.querySelector('#sa11y-panel-alert-text');
			while (empty.firstChild) empty.removeChild(empty.firstChild);

			let emptyPreview = document.querySelector("#sa11y-panel-alert-preview");
			while (emptyPreview.firstChild) emptyPreview.removeChild(emptyPreview.firstChild);
			emptyPreview.classList.remove("sa11y-panel-alert-preview");

			//Main panel warning and error count.
			let clearStatus = document.querySelector('#sa11y-status');
			while (clearStatus.firstChild) clearStatus.removeChild(clearStatus.firstChild);

			if (restartPanel) {
				document.querySelector('#sa11y-panel').classList.remove("sa11y-active");
			}
		};
		this.clearEverything = () => {};

		// ============================================================
		// Initialize tooltips for error/warning/pass buttons: (Tippy.js)
		// ============================================================
		this.initializeTooltips = () => {
			tippy(".sa11y-btn", {
				interactive: true,
				trigger: "mouseenter click focusin", //Focusin trigger to ensure "Jump to issue" button displays tooltip.
				arrow: true,
				delay: [200, 0], //Slight delay to ensure mouse doesn't quickly trigger and hide tooltip.
				theme: "sa11y-theme",
				placement: 'bottom',
				allowHTML: true,
				aria: {
					content: 'describedby',
				},
				appendTo: document.body,
			});
		}

		// ============================================================
		// Detect parent containers that have hidden overflow.
		// ============================================================
		this.detectOverflow = () => {
			const findParentWithOverflow = ($el, property, value) => {
				while ($el !== null) {
					const style = window.getComputedStyle($el);
					const propValue = style.getPropertyValue(property);
					if (propValue === value) {
						return $el;
					}
					$el = $el.parentElement;
				}
				return null;
			};
			const $findButtons = document.querySelectorAll('.sa11y-btn');
			$findButtons.forEach(function ($el) {
				const overflowing = findParentWithOverflow($el, 'overflow', 'hidden');
				if (overflowing !== null) {
					overflowing.classList.add('sa11y-overflow');
				}
			});
		}

		// ============================================================
		// Nudge buttons if they overlap.
		// ============================================================
		this.nudge = () => {
			const sa11yInstance = document.querySelectorAll('.sa11y-instance, .sa11y-instance-inline');
			sa11yInstance.forEach(($el) => {
				const sibling = $el.nextElementSibling;
				if (sibling !== null && (sibling.classList.contains("sa11y-instance") ||
						sibling.classList.contains("sa11y-instance-inline"))) {
					sibling.querySelector("button").setAttribute("style", "margin: -10px -20px !important;");
				}
			});
		}

		// ============================================================
		// Update iOS style notification badge on icon.
		// ============================================================
		this.updateBadge = () => {

			let totalCount = this.errorCount + this.warningCount;
			let warningCount = this.warningCount;
			const notifBadge = document.getElementById("sa11y-notification-badge");
			if (totalCount === 0) {
				notifBadge.style.display = "none";
			} else if (this.warningCount > 0 && this.errorCount === 0) {
				notifBadge.style.display = "flex";
				notifBadge.classList.add("sa11y-notification-badge-warning");
				document.getElementById('sa11y-notification-count').innerHTML = `${M["PANEL_ICON_WARNINGS"](warningCount)}`;
			} else {
				notifBadge.style.display = "flex";
				notifBadge.classList.remove("sa11y-notification-badge-warning");
				document.getElementById('sa11y-notification-count').innerHTML = `${M["PANEL_ICON_TOTAL"](totalCount)}`;
			}
		}

		// ----------------------------------------------------------------------
		// Main panel: Display and update panel.
		// ----------------------------------------------------------------------
		this.updatePanel = () => {
			this.panelActive = true;

			this.buildPanel();
			this.skipToIssue();

			const $skipBtn = document.getElementById("sa11y-cycle-toggle");
			$skipBtn.disabled = false;
			$skipBtn.setAttribute("style", "cursor: pointer !important;");

			const $panel = document.getElementById("sa11y-panel");
			$panel.classList.add("sa11y-active");

			const html = document.querySelector("html");
			html.setAttribute("data-sa11y-active", "true");

			const $panelContent = document.getElementById("sa11y-panel-content"),
				$status = document.getElementById("sa11y-status"),
				$findButtons = document.querySelectorAll('.sa11y-btn'),
				M = sa11yLang;

			if (this.errorCount > 0 && this.warningCount > 0) {
				$panelContent.setAttribute("class", "sa11y-errors");
				$status.innerHTML = `${M["PANEL_STATUS_BOTH"](this.errorCount, this.warningCount)}`;
			} else if (this.errorCount > 0) {
				$panelContent.setAttribute("class", "sa11y-errors");
				$status.innerHTML = `${M["PANEL_STATUS_ERRORS"](this.errorCount)}`;
			} else if (this.warningCount > 0) {
				$panelContent.setAttribute("class", "sa11y-warnings");
				$status.innerHTML = `${M["PANEL_STATUS_WARNINGS"](this.warningCount)}`;
			} else {
				$panelContent.setAttribute("class", "sa11y-good");
				$status.textContent = `${M["PANEL_STATUS_NONE"]}`;

				if ($findButtons.length === 0) {
					$skipBtn.disabled = true;
					$skipBtn.setAttribute("style", "cursor: default !important;");
				}
			}
		};

		// ----------------------------------------------------------------------
		// Main panel: Build Show Outline and Settings tabs.
		// ----------------------------------------------------------------------
		this.buildPanel = () => {

			const $outlineToggle = document.getElementById("sa11y-outline-toggle"),
				$outlinePanel = document.getElementById("sa11y-outline-panel"),
				$outlineList = document.getElementById("sa11y-outline-list"),
				$settingsToggle = document.getElementById("sa11y-settings-toggle"),
				$settingsPanel = document.getElementById("sa11y-settings-panel"),
				$settingsContent = document.getElementById("sa11y-settings-content"),
				$headingAnnotations = document.querySelectorAll(".sa11y-heading-label"),
				M = sa11yLang;

			//Show outline panel
			$outlineToggle.addEventListener('click', () => {
				if ($outlineToggle.getAttribute("aria-expanded") == "true") {
					$outlineToggle.classList.remove("sa11y-outline-active");
					$outlinePanel.classList.remove("sa11y-active");
					$outlineToggle.textContent = `${M["SHOW_OUTLINE"]}`;
					$outlineToggle.setAttribute("aria-expanded", "false");
					localStorage.setItem("sa11y-remember-outline", "Closed");
				} else {
					$outlineToggle.classList.add("sa11y-outline-active");
					$outlinePanel.classList.add("sa11y-active");
					$outlineToggle.textContent = `${M["HIDE_OUTLINE"]}`;
					$outlineToggle.setAttribute("aria-expanded", "true");
					localStorage.setItem("sa11y-remember-outline", "Opened");
				}

				//Set focus on Page Outline heading for accessibility.
				document.querySelector("#sa11y-outline-header > h2").focus();

				//Show heading level annotations.
				$headingAnnotations.forEach(($el) => $el.classList.toggle("sa11y-label-visible"));

				//Close Settings panel when Show Outline is active.
				$settingsPanel.classList.remove("sa11y-active");
				$settingsToggle.classList.remove("sa11y-settings-active");
				$settingsToggle.setAttribute("aria-expanded", "false");
				$settingsToggle.textContent = `${M["SHOW_SETTINGS"]}`;

				//Keyboard accessibility fix for scrollable panel content.
				if ($outlineList.clientHeight > 250) {
					$outlineList.setAttribute("tabindex", "0");
				}
			});

			//Remember to leave outline open
			if (localStorage.getItem("sa11y-remember-outline") === "Opened") {
				$outlineToggle.classList.add("sa11y-outline-active");
				$outlinePanel.classList.add("sa11y-active");
				$outlineToggle.textContent = `${M["HIDE_OUTLINE"]}`;
				$outlineToggle.setAttribute("aria-expanded", "true");
				$headingAnnotations.forEach(($el) => $el.classList.toggle("sa11y-label-visible"));
				//Keyboard accessibility fix for scrollable panel content.
				if ($outlineList.clientHeight > 250) {
					$outlineList.setAttribute("tabindex", "0");
				}
			}

			//Show settings panel
			$settingsToggle.addEventListener('click', (e) => {
				if ($settingsToggle.getAttribute("aria-expanded") === "true") {
					$settingsToggle.classList.remove("sa11y-settings-active");
					$settingsPanel.classList.remove("sa11y-active");
					$settingsToggle.textContent = `${M["SHOW_SETTINGS"]}`;
					$settingsToggle.setAttribute("aria-expanded", "false");
				} else {
					$settingsToggle.classList.add("sa11y-settings-active");
					$settingsPanel.classList.add("sa11y-active");
					$settingsToggle.textContent = `${M["HIDE_SETTINGS"]}`;
					$settingsToggle.setAttribute("aria-expanded", "true");
				}

				//Set focus on Settings heading for accessibility.
				document.querySelector("#sa11y-settings-header > h2").focus();

				//Close Show Outline panel when Settings is active.
				$outlinePanel.classList.remove("sa11y-active");
				$outlineToggle.classList.remove("sa11y-outline-active");
				$outlineToggle.setAttribute("aria-expanded", "false");
				$outlineToggle.textContent = `${M["SHOW_OUTLINE"]}`;
				$headingAnnotations.forEach(($el) => $el.classList.remove("sa11y-label-visible"));
				localStorage.setItem("sa11y-remember-outline", "Closed");

				//Keyboard accessibility fix for scrollable panel content.
				if ($settingsContent.clientHeight > 350) {
					$settingsContent.setAttribute("tabindex", "0");
				}
			});

			//Enhanced keyboard accessibility for panel.
			document.getElementById('sa11y-panel-controls').addEventListener('keydown', function (e) {
				const $tab = document.querySelectorAll('#sa11y-outline-toggle[role=tab], #sa11y-settings-toggle[role=tab]');
				if (e.key === 'ArrowRight') {
					for (let i = 0; i < $tab.length; i++) {
						if ($tab[i].getAttribute('aria-expanded') === "true" || $tab[i].getAttribute('aria-expanded') === "false") {
							$tab[i + 1].focus();
							e.preventDefault();
							break;
						}
					}
				}
				if (e.key === 'ArrowDown') {
					for (let i = 0; i < $tab.length; i++) {
						if ($tab[i].getAttribute('aria-expanded') === "true" || $tab[i].getAttribute('aria-expanded') === "false") {
							$tab[i + 1].focus();
							e.preventDefault();
							break;
						}
					}
				}
				if (e.key === 'ArrowLeft') {
					for (let i = $tab.length - 1; i > 0; i--) {
						if ($tab[i].getAttribute('aria-expanded') === "true" || $tab[i].getAttribute('aria-expanded') === "false") {
							$tab[i - 1].focus();
							e.preventDefault();
							break;
						}
					}
				}
				if (e.key === 'ArrowUp') {
					for (let i = $tab.length - 1; i > 0; i--) {
						if ($tab[i].getAttribute('aria-expanded') === "true" || $tab[i].getAttribute('aria-expanded') === "false") {
							$tab[i - 1].focus();
							e.preventDefault();
							break;
						}
					}
				}
			});

			const $closeAlertToggle = document.getElementById("sa11y-close-alert"),
				$alertPanel = document.getElementById("sa11y-panel-alert"),
				$alertText = document.getElementById("sa11y-panel-alert-text"),
				$skipBtn = document.getElementById("sa11y-cycle-toggle");

			$closeAlertToggle.addEventListener('click', () => {
				$alertPanel.classList.remove("sa11y-active");
				while ($alertText.firstChild) $alertText.removeChild($alertText.firstChild);
				document.querySelectorAll('.sa11y-pulse-border').forEach((el) => el.classList.remove('sa11y-pulse-border'));
				$skipBtn.focus();
			});
		}

		// ============================================================
		// Main panel: Skip to issue button.
		// ============================================================

		this.skipToIssue = () => {
			/* Safari Polyfill for scrollTo. Credit: https://stackoverflow.com/a/67108752 & https://github.com/iamdustan/smoothscroll */
			let reducedMotionQuery = false;
			let scrollBehavior = "smooth";
			if (!('scrollBehavior' in document.documentElement.style)) {
				let js = document.createElement('script');
				js.src = "https://cdn.jsdelivr.net/npm/smoothscroll-polyfill@0.4.4/dist/smoothscroll.min.js";
				document.head.appendChild(js);
			}
			if (!(document.documentMode)) {
				if (typeof window.matchMedia === "function") {
					reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
				}
				if (!reducedMotionQuery || reducedMotionQuery.matches) {
					scrollBehavior = "auto";
				}
			}

			let sa11yBtnLocation = 0;
			const findSa11yBtn = document.querySelectorAll(".sa11y-btn").length;

			//Jump to issue using keyboard shortcut.
			document.addEventListener('keyup', (e) => {
				if (findSa11yBtn && (e.altKey && e.code == "Period" || e.code == "KeyS")) {
					skipToIssueToggle();
					e.preventDefault();
				}
			});

			//Jump to issue using click.
			const $skipToggle = document.getElementById("sa11y-cycle-toggle");
			$skipToggle.addEventListener('click', (e) => {
				skipToIssueToggle();
				e.preventDefault();
			});

			const skipToIssueToggle = function () {

				//Calculate location of both visible and hidden buttons.
				const $findButtons = document.querySelectorAll('.sa11y-btn'),
					$alertPanel = document.getElementById("sa11y-panel-alert"),
					$alertText = document.getElementById("sa11y-panel-alert-text"),
					$alertPanelPreview = document.getElementById("sa11y-panel-alert-preview"),
					$closeAlertToggle = document.getElementById("sa11y-close-alert");

				//Mini function: Find visibible parent of hidden element.
				const findVisibleParent = ($el, property, value) => {
					while ($el !== null) {
						const style = window.getComputedStyle($el);
						const propValue = style.getPropertyValue(property);
						if (propValue === value) {
							return $el;
						}
						$el = $el.parentElement;
					}
					return null;
				};

				//Mini function: Calculate top of element. 
				const offset = ($el) => {
					let rect = $el.getBoundingClientRect(),
						scrollTop = window.pageYOffset || document.documentElement.scrollTop;
					return {
						top: rect.top + scrollTop
					}
				}

				//'offsetTop' will always return 0 if element is hidden. We rely on offsetTop to determine if element is hidden, although we use 'getBoundingClientRect' to set the scroll position. 
				let scrollPosition;
				let offsetTopPosition = $findButtons[sa11yBtnLocation].offsetTop;
				if (offsetTopPosition === 0) {
					let visiblePosition = findVisibleParent($findButtons[sa11yBtnLocation], 'display', 'none');
					scrollPosition = offset(visiblePosition.previousElementSibling).top - 50;
				} else {
					scrollPosition = offset($findButtons[sa11yBtnLocation]).top - 50;
				}

				//Scroll to element if offsetTop is less than or equal to 0.
				if (offsetTopPosition >= 0) {
					setTimeout(function () {
						window.scrollTo({
							top: scrollPosition,
							behavior: scrollBehavior
						});
					}, 1);

					//Add pulsing border to visible parent of hidden element.
					$findButtons.forEach(function ($el) {
						const overflowing = findVisibleParent($el, 'display', 'none');
						if (overflowing !== null) {
							let hiddenparent = overflowing.previousElementSibling;
							hiddenparent.classList.add("sa11y-pulse-border");
						}
					});
					$findButtons[sa11yBtnLocation].focus();
				} else {
					$findButtons[sa11yBtnLocation].focus();
				}

				//Alert if element is hidden.
				if (offsetTopPosition === 0) {
					$alertPanel.classList.add("sa11y-active");
					$alertText.textContent = `${sa11yLang["NOT_VISIBLE_ALERT"]}`;
					$alertPanelPreview.classList.add("sa11y-panel-alert-preview");
					$alertPanelPreview.innerHTML = $findButtons[sa11yBtnLocation].getAttribute('data-tippy-content');
					$closeAlertToggle.focus();
				} else if (offsetTopPosition < 1) {
					$alertPanel.classList.remove("sa11y-active");
					document.querySelectorAll('.sa11y-pulse-border').forEach(($el) => $el.classList.remove('sa11y-pulse-border'));
				}

				//Reset index so it scrolls back to top of page.
				sa11yBtnLocation += 1;
				if (sa11yBtnLocation >= findSa11yBtn) {
					sa11yBtnLocation = 0;
				}
			};
		}

		// ============================================================
		// Finds all elements and cache.
		// ============================================================
		this.findElements = () => {

			let container = document.querySelector(options.checkRoot),
				readabilityContainer = document.querySelector(options.readabilityRoot);

			//Error handling. If target area does not exist, scan body.
			if (!container) {
				container = document.querySelector("body");
			} else {
				container = document.querySelector(options.checkRoot);
			}

			if (!readabilityContainer) {
				readabilityContainer = document.querySelector("body");
			} else {
				readabilityContainer = document.querySelector(options.readabilityRoot);
			}

			//Exclusions constants
			const containerExclusions = Array.from(document.querySelectorAll(this.containerIgnore)),
				readabilityExclusions = Array.from(document.querySelectorAll(this.readabilityIgnore));

			//Contrast
			const $findcontrast = Array.from(container.querySelectorAll("*")),
				excludeContrast = Array.from(container.querySelectorAll(this.contrastIgnore));
			this.$contrast = $findcontrast.filter($el => !excludeContrast.includes($el));

			//Readability
			let $findreadability = Array.from(readabilityContainer.querySelectorAll("p, li"));

			//Error handling for readability.
			if (!$findreadability) {

			} else {
				$findreadability = Array.from(readabilityContainer.querySelectorAll("p, li"));
			}

			this.$readability = $findreadability.filter($el => !readabilityExclusions.includes($el));

			//Headings
			const allHeadings = Array.from(container.querySelectorAll("h1, h2, h3, h4, h5, h6, [role='heading'][aria-level]")),
				excludeHeadings = Array.from(container.querySelectorAll(this.headerIgnore));
			this.$h = allHeadings.filter($el => !excludeHeadings.includes($el));

			const allH1 = Array.from(document.querySelectorAll("h1, [role='heading'][aria-level='1']"));
			this.$h1 = allH1.filter($el => !excludeHeadings.includes($el));

			//Links
			const $findlinks = Array.from(container.querySelectorAll("a[href]")),
				excludelinks = Array.from(container.querySelectorAll(this.linkIgnore));
			this.$links = $findlinks.filter($el => !excludelinks.includes($el));

			//Inputs
			const $findinputs = Array.from(container.querySelectorAll("input, select, textarea"));
			this.$inputs = $findinputs.filter($el => !containerExclusions.includes($el) && !this.isElementHidden($el));

			//Images
			const images = Array.from(container.querySelectorAll("img")),
				excludeimages = Array.from(container.querySelectorAll(this.imageIgnore));
			this.$img = images.filter($el => !excludeimages.includes($el));

			//iFrames
			const $findiframes = Array.from(container.querySelectorAll("iframe, audio, video"));
			this.$iframes = $findiframes.filter($el => !containerExclusions.includes($el));
			this.$videos = this.$iframes.filter($el => $el.matches(options.videoContent));
			this.$audio = this.$iframes.filter($el => $el.matches(options.audioContent));
			this.$dataviz = this.$iframes.filter($el => $el.matches(options.dataVizContent));
			this.$twitter = this.$iframes.filter($el => $el.matches(options.twitterContent));
			this.$embeddedcontent = this.$iframes.filter($el => !$el.matches(options.embeddedContent));

			//QA
			const $findstrongitalics = Array.from(container.querySelectorAll("strong, em"));
			this.$strongitalics = $findstrongitalics.filter($el => !containerExclusions.includes($el));

			const $findbadDevLinks = options.linksToFlag ? Array.from(container.querySelectorAll(options.linksToFlag)) : [];
			this.$badDevLinks = $findbadDevLinks.filter($el => !containerExclusions.includes($el));

			const $findPDFs = Array.from(container.querySelectorAll("a[href$='.pdf']"));
			this.$checkPDF = $findPDFs.filter($el => !containerExclusions.includes($el));

			const $findtables = Array.from(container.querySelectorAll("table:not([role='presentation'])"));
			this.$tables = $findtables.filter($el => !containerExclusions.includes($el));

			this.lang = document.querySelector("html").getAttribute("lang");

			const $findblockquotes = Array.from(container.querySelectorAll("blockquote"));
			this.$blockquotes = $findblockquotes.filter($el => !containerExclusions.includes($el));

			const $findp = Array.from(container.querySelectorAll("p"));
			this.$p = $findp.filter($el => !containerExclusions.includes($el));

			const $findallcaps = Array.from(container.querySelectorAll("h1, h2, h3, h4, h5, h6, p, li:not([class^='sa11y']), blockquote"));
			this.$allcaps = $findallcaps.filter($el => !containerExclusions.includes($el));
		};

		//----------------------------------------------------------------------
		// Templating for Error, Warning and Pass buttons.
		//----------------------------------------------------------------------
		this.annotate = (type, content, inline = false) => {

			const ValidTypes = new Set([M["ERROR"], M["WARNING"], M["GOOD"]]);
			const CSSName = {
				[M["ERROR"]]: "error",
				[M["WARNING"]]: "warning",
				[M["GOOD"]]: "good",
			};

			if (!ValidTypes.has(type)) {
				throw Error(`Invalid type [${type}] for annotation`);
			}

			// Check if content is a function
			if (content && {}.toString.call(content) === "[object Function]") {
				// if it is, call it and get the value.
				content = content();
			}

			// Escape content, it is need because it used inside data-tippy-content=""
			content = this.escapeHTML(content);

			return `
				<div class=${inline ? "sa11y-instance-inline" : "sa11y-instance"}>
					<button
					type="button"   
					aria-label="${[type]}" 
					class="sa11y-btn 
					sa11y-${CSSName[type]}-btn${inline ? "-text" : ""}" 
					data-tippy-content="<div lang='${M["LANG_CODE"]}'>
						<div class='sa11y-header-text'>${[type]}
						</div>
						${content} 
					</div>
				"> 
				</button>
				</div>`;
		};

		//----------------------------------------------------------------------
		// Templating for full-width banners.
		//----------------------------------------------------------------------
		this.annotateBanner = (type, content) => {

			const ValidTypes = new Set([M["ERROR"], M["WARNING"], M["GOOD"]]);
			const CSSName = {
				[M["ERROR"]]: "error",
				[M["WARNING"]]: "warning",
				[M["GOOD"]]: "good",
			};

			if (!ValidTypes.has(type)) {
				throw Error(`Invalid type [${type}] for annotation`);
			}
			// Check if content is a function
			if (content && {}.toString.call(content) === "[object Function]") {
				content = content();
			}

			return `<div class="sa11y-instance sa11y-${CSSName[type]}-message-container">
				<div role="region" aria-label="${[type]}" class="sa11y-${CSSName[type]}-message" lang="${M["LANG_CODE"]}">
					${content}
				</div>
			</div>`;
		};

		// ============================================================
		// Rulesets: Check Headings
		// ============================================================
		this.checkHeaders = () => {
			let prevLevel;
			this.$h.forEach(($el, i) => {

				let text = this.computeTextNodeWithImage($el),
					htext = this.sanitizeForHTML(text),
					level;

				if ($el.getAttribute("aria-level")) {
					level = +$el.getAttribute("aria-level");
				} else {
					level = +$el.tagName.slice(1);
				}

				let headingLength = $el.textContent.trim().length,
					error = null,
					warning = null;

				if (level - prevLevel > 1 && i !== 0) {
					if (options.nonConsecutiveHeadingIsError === true) {
						error = M["HEADING_NON_CONSECUTIVE_LEVEL"](prevLevel, level);
					} else {
						warning = M["HEADING_NON_CONSECUTIVE_LEVEL"](prevLevel, level);
					}
				} else if ($el.textContent.trim().length == 0) {
					if ($el.querySelectorAll("img").length) {
						const imgalt = $el.querySelector("img").getAttribute("alt");
						if (imgalt === undefined || imgalt === " " || imgalt === "") {
							error = M["HEADING_EMPTY_WITH_IMAGE"](level)
							$el.classList.add("sa11y-error-text");
						}
					} else {
						error = M["HEADING_EMPTY"](level);
						$el.classList.add("sa11y-error-text");
					}
				} else if (i === 0 && level !== 1 && level !== 2) {
					error = M["HEADING_FIRST"];
				} else if ($el.textContent.trim().length > 170 && options.flagLongHeadings === true) {
					warning = M["HEADING_LONG"](headingLength);
				}

				prevLevel = level;

				let li =
					`<li class='sa11y-outline-${level}'>
                    <span class='sa11y-badge'>${level}</span> 
                    <span class='sa11y-outline-list-item'>${htext}</span>
                </li>`;

				let liError =
					`<li class='sa11y-outline-${level}'>
                    <span class='sa11y-badge sa11y-error-badge'>
                    <span aria-hidden='true'>&#10007;</span>
                    <span class='sa11y-visually-hidden'>${M["ERROR"]}</span> ${level}</span> 
                    <span class='sa11y-outline-list-item sa11y-red-text sa11y-bold'>${htext}</span>
                </li>`;

				let liWarning =
					`<li class='sa11y-outline-${level}'>
                    <span class='sa11y-badge sa11y-warning-badge'>
                    <span aria-hidden='true'>&#x3f;</span>
                    <span class='sa11y-visually-hidden'>${M["WARNING"]}</span> ${level}</span> 
                    <span class='sa11y-outline-list-item sa11y-yellow-text sa11y-bold'>${htext}</span>
                </li>`;

				let ignoreArray = [];
				if (options.outlineIgnore) {
					ignoreArray = Array.from(document.querySelectorAll(this.outlineIgnore));
				}

				if (!ignoreArray.includes($el)) {
					//Append heading labels.
					$el.insertAdjacentHTML("beforeend", `<span class='sa11y-heading-label'>H${level}</span>`);

					//Heading errors
					if (error !== null && $el.closest("a") !== null) {
						this.errorCount++;
						$el.classList.add("sa11y-error-border");
						$el.closest("a").insertAdjacentHTML("afterend", this.annotate(M["ERROR"], error, true));
						document.querySelector("#sa11y-outline-list").insertAdjacentHTML("beforeend", liError);
					} else if (error !== null) {
						this.errorCount++;
						$el.classList.add("sa11y-error-border");
						$el.insertAdjacentHTML("beforebegin", this.annotate(M["ERROR"], error));
						document.querySelector("#sa11y-outline-list").insertAdjacentHTML("beforeend", liError);
					}

					//Heading warnings
					else if (warning !== null && $el.closest("a") !== null) {
						this.warningCount++;
						$el.closest("a").insertAdjacentHTML("afterend", this.annotate(M["WARNING"], warning));
						document.querySelector("#sa11y-outline-list").insertAdjacentHTML("beforeend", liWarning);
					} else if (warning !== null) {
						this.warningCount++;
						$el.insertAdjacentHTML("beforebegin", this.annotate(M["WARNING"], warning));
						document.querySelector("#sa11y-outline-list").insertAdjacentHTML("beforeend", liWarning);
					}

					//Not an error or warning
					else if (error === null || warning === null) {
						document.querySelector("#sa11y-outline-list").insertAdjacentHTML("beforeend", li);
					}
				}
			});

			//Check to see there is at least one H1 on the page.
			if (this.$h1.length === 0) {
				this.errorCount++;

				const updateH1Outline =
					`<div class='sa11y-instance sa11y-missing-h1'>
                    <span class='sa11y-badge sa11y-error-badge'><span aria-hidden='true'>&#10007;</span><span class='sa11y-visually-hidden'>${M["ERROR"]}</span></span> 
                    <span class='sa11y-red-text sa11y-bold'>${M["PANEL_HEADING_MISSING_ONE"]}</span>
                </div>`
				document.getElementById("sa11y-outline-header").insertAdjacentHTML("afterend", updateH1Outline);
				document.getElementById("sa11y-container").insertAdjacentHTML("afterend", this.annotateBanner(M["ERROR"], M["HEADING_MISSING_ONE"]));
			}
		};

		// ============================================================
		// Rulesets: Link text
		// ============================================================
		this.checkLinkText = () => {
			const containsLinkTextStopWords = function (textContent) {
				let urlText = [
					"http",
					".asp",
					".htm",
					".php",
					".edu/",
					".com/",
					".net/",
					".org/",
					".us/",
					".ca/",
					".de/",
					".icu/",
					".uk/",
					".ru/",
					".info/",
					".top/",
					".xyz/",
					".tk/",
					".cn/",
					".ga/",
					".cf/",
					".nl/",
					".io/",
					".fr/",
					".pe/",
					".nz/",
					".pt/",
					".es/",
					".pl/",
					".ua/"
				];

				let hit = [null, null, null];

				// Flag partial stop words.
				M["PARTIAL_ALT_STOPWORDS"].forEach((word) => {
					if (
						textContent.length === word.length &&
						textContent.toLowerCase().indexOf(word) >= 0
					) {
						hit[0] = word;
						return false;
					}
				});

				// Other warnings we want to add.
				M["WARNING_ALT_STOPWORDS"].forEach((word) => {
					if (textContent.toLowerCase().indexOf(word) >= 0) {
						hit[1] = word;
						return false;
					}
				});

				// Flag link text containing URLs.
				urlText.forEach((word) => {
					if (textContent.toLowerCase().indexOf(word) >= 0) {
						hit[2] = word;
						return false;
					}
				});
				return hit;
			};

			this.$links.forEach((el) => {

				let linkText = this.computeAriaLabel(el),
					hasAriaLabelledBy = el.getAttribute('aria-labelledby'),
					hasAriaLabel = el.getAttribute('aria-label'),
					childAriaLabelledBy = null,
					childAriaLabel = null;

				if (el.children.length) {
					let $firstChild = el.children[0];
					childAriaLabelledBy = $firstChild.getAttribute('aria-labelledby');
					childAriaLabel = $firstChild.getAttribute('aria-label');
				}

				if (linkText === 'noAria') {

					//Plain text content.
					linkText = el.textContent.trim();
					const $img = el.querySelector('img');

					//If an image exists within the link. Help with AccName computation.
					if ($img) {

						//Check if there's aria on the image.
						let imgText = this.computeAriaLabel($img);
						if (imgText !== 'noAria') {
							linkText += imgText;
						} else {
							//No aria? Process alt on image.
							linkText += $img ? ($img.getAttribute('alt') || '') : '';
						}
					}
				}

				let linkTextTrimmed = linkText.replace(/\s+/g, ' ').trim(),
					error = containsLinkTextStopWords(
						this.fnIgnore(el, options.linkIgnoreSpan).textContent.trim()
					);

				if (el.querySelectorAll('img').length) {
					// Do nothing. Don't overlap with Alt Text module.
				}

				// Flag empty hyperlinks.
				else if (el.getAttribute('href') && !linkTextTrimmed) {

					// Has child elements (e.g. SVG or SPAN) <a><i></i></a>
					if (el.children.length) {
						this.errorCount++;
						el.classList.add("sa11y-error-border");
						el.insertAdjacentHTML('afterend', this.annotate(M["ERROR"], M["LINK_EMPTY_LINK_NO_LABEL"], true));
					}

					// Completely empty <a></a>
					else {
						this.errorCount++;
						el.classList.add("sa11y-error-border");
						el.insertAdjacentHTML('afterend', this.annotate(M["ERROR"], M["LINK_EMPTY"], true));
					}
				}

				// Contains stop words.
				else if (error[0] != null) {
					if (hasAriaLabelledBy || hasAriaLabel || childAriaLabelledBy || childAriaLabel) {
						if (options.showGoodLinkButton === true) {
							el.insertAdjacentHTML(
								'beforebegin',
								this.annotate(M["GOOD"], M["LINK_LABEL"](linkText), true));
						}
					} else if (el.getAttribute('aria-hidden') === 'true' && el.getAttribute('tabindex') === '-1') {
						//Do nothing.
					} else {
						this.errorCount++;
						el.classList.add("sa11y-error-text");
						el.insertAdjacentHTML(
							'afterend',
							this.annotate(M["ERROR"], M["LINK_STOPWORD"](error[0]), true));
					}
				}

				// Contains warning words.
				else if (error[1] != null) {
					this.warningCount++;
					el.classList.add("sa11y-warning-text");
					el.insertAdjacentHTML(
						'afterend',
						this.annotate(M["WARNING"], M["LINK_BEST_PRACTICES"](error[1]), true));
				}

				// Contains URL in link text.
				else if (error[2] != null) {
					if (linkText.length > 40) {
						this.warningCount++;
						el.classList.add("sa11y-warning-text");
						el.insertAdjacentHTML(
							'afterend',
							this.annotate(M["WARNING"], M["LINK_URL"], true));
					}
				}

				// If the link has any ARIA, append a "Good" link button.
				else if (hasAriaLabelledBy || hasAriaLabel || childAriaLabelledBy || childAriaLabel) {
					if (options.showGoodLinkButton === true) {
						el.insertAdjacentHTML(
							'beforebegin',
							this.annotate(M["GOOD"], M["LINK_LABEL"](linkText), true));
					}
				}
			});
		};

		// ============================================================
		// Rulesets: Links (Advanced)
		// ============================================================
		this.checkLinksAdvanced = () => {
			let seen = {};
			this.$links.forEach((el) => {

				let linkText = this.computeAriaLabel(el);
				const $img = el.querySelector('img');

				if (linkText === 'noAria') {

					//Plain text content.
					linkText = el.textContent.trim();

					//If an image exists within the link. 
					if ($img) {

						//Check if there's aria on the image.
						let imgText = this.computeAriaLabel($img);
						if (imgText !== 'noAria') {
							linkText += imgText;
						} else {
							//No aria? Process alt on image.
							linkText += $img ? ($img.getAttribute('alt') || '') : '';
						}
					}
				}

				// Remove whitespace, special characters, etc.
				let linkTextTrimmed = linkText.replace(/'|"|-|\.|\s+/g, '').trim().toLowerCase();

				//Links with identical accessible names have equivalent purpose.
				let href = el.getAttribute("href");

				if (linkText.length !== 0) {
					if (seen[linkTextTrimmed] && linkTextTrimmed.length !== 0) {
						if (seen[href]) {
							//Nothing
						} else {
							this.warningCount++;
							el.classList.add("sa11y-warning-text");
							el.insertAdjacentHTML(
								'afterend',
								this.annotate(M["WARNING"], M["LINK_IDENTICAL_NAME"](linkText), true));
						}
					} else {
						seen[linkTextTrimmed] = true;
						seen[href] = true;
					}
				}

				//New tab or new window.
				const containsNewWindowPhrases = M["NEW_WINDOW_PHRASES"].some(function (pass) {
					return linkText.toLowerCase().indexOf(pass) >= 0;
				});

				//Link that points to a file type indicates that it does.
				const containsFileTypePhrases = M["FILE_TYPE_PHRASES"].some(function (pass) {
					return linkText.toLowerCase().indexOf(pass) >= 0;
				});

				const fileTypeMatch = el.matches(`
					a[href$='.pdf'],
					a[href$='.doc'],
					a[href$='.docx'],
					a[href$='.zip'],
					a[href$='.mp3'],
					a[href$='.txt'],
					a[href$='.exe'],
					a[href$='.dmg'],
					a[href$='.rtf'],
					a[href$='.pptx'],
					a[href$='.ppt'],
					a[href$='.xls'],
					a[href$='.xlsx'],
					a[href$='.csv'],
					a[href$='.mp4'],
					a[href$='.mov'],
					a[href$='.avi']
				`);

				if (el.getAttribute("target") === "_blank" && !fileTypeMatch && !containsNewWindowPhrases) {
					this.warningCount++;
					el.classList.add("sa11y-warning-text");
					el.insertAdjacentHTML(
						'afterend',
						this.annotate(M["WARNING"], M["NEW_TAB_WARNING"], true));
				}

				if (fileTypeMatch && !containsFileTypePhrases) {
					this.warningCount++;
					el.classList.add("sa11y-warning-text");
					el.insertAdjacentHTML(
						'beforebegin',
						this.annotate(M["WARNING"], M["FILE_TYPE_WARNING"], true));
				}
			});
		}

		// ============================================================
		// Ruleset: Alternative text
		// ============================================================
		this.checkAltText = () => {
			this.containsAltTextStopWords = function (alt) {
				const altUrl = [
					".png",
					".jpg",
					".jpeg",
					".webp",
					".gif",
					".tiff",
					".svg"
				];

				let hit = [null, null, null];
				altUrl.forEach((word) => {
					if (alt.toLowerCase().indexOf(word) >= 0) {
						hit[0] = word;
					}
				});
				M["SUSPICIOUS_ALT_STOPWORDS"].forEach((word) => {
					if (alt.toLowerCase().indexOf(word) >= 0) {
						hit[1] = word;
					}
				});
				M["PLACEHOLDER_ALT_STOPWORDS"].forEach((word) => {
					if (alt.length === word.length && alt.toLowerCase().indexOf(word) >= 0) {
						hit[2] = word;
					}
				});
				return hit;
			};

			this.$img.forEach(($el) => {

				let alt = $el.getAttribute("alt");

				if (alt === null) {
					if ($el.closest('a[href]')) {
						if (this.fnIgnore($el.closest('a[href]'), "noscript").textContent.trim().length >= 1) {
							$el.classList.add("sa11y-error-border");
							$el.closest('a[href]').insertAdjacentHTML('beforebegin', this.annotate(M["ERROR"], M["MISSING_ALT_LINK_BUT_HAS_TEXT_MESSAGE"], false, true));
						} else if (this.fnIgnore($el.closest('a[href]'), "noscript").textContent.trim().length === 0) {
							$el.classList.add("sa11y-error-border");
							$el.closest('a[href]').insertAdjacentHTML('beforebegin', this.annotate(M["ERROR"], M["MISSING_ALT_LINK_MESSAGE"], false, true));
						}
					}
					// General failure message if image is missing alt.
					else {
						$el.classList.add("sa11y-error-border");
						$el.insertAdjacentHTML('beforebegin', this.annotate(M["ERROR"], M["MISSING_ALT_MESSAGE"], false, true));
					}
				}
				// If alt attribute is present, further tests are done.
				else {
					let altText = this.sanitizeForHTML(alt); //Prevent tooltip from breaking.
					let error = this.containsAltTextStopWords(altText);
					let altLength = alt.length;

					// Image fails if a stop word was found.
					if (error[0] !== null && $el.closest("a[href]")) {
						this.errorCount++;
						$el.classList.add("sa11y-error-border");
						$el.closest("a[href]").insertAdjacentHTML('beforebegin', this.annotate(M["ERROR"], M["LINK_IMAGE_BAD_ALT_MESSAGE"](altText, error[0]), false, true));
					} else if (error[2] !== null && $el.closest("a[href]")) {
						this.errorCount++;
						$el.classList.add("sa11y-error-border");
						$el.closest("a[href]").insertAdjacentHTML('beforebegin', this.annotate(M["ERROR"], M["LINK_IMAGE_PLACEHOLDER_ALT_MESSAGE"](altText), false, true));
					} else if (error[1] !== null && $el.closest("a[href]")) {
						this.warningCount++;
						$el.classList.add("sa11y-warning-border");
						$el.closest("a[href]").insertAdjacentHTML('beforebegin', this.annotate(M["WARNING"], M["LINK_IMAGE_SUS_ALT_MESSAGE"](altText, error[1]), false, true));
					} else if (error[0] !== null) {
						this.errorCount++;
						$el.classList.add("sa11y-error-border");
						$el.insertAdjacentHTML('beforebegin', this.annotate(M["ERROR"], M["LINK_ALT_HAS_BAD_WORD_MESSAGE"](altText, error[0]), false, true));
					} else if (error[2] !== null) {
						this.errorCount++;
						$el.classList.add("sa11y-error-border");
						$el.insertAdjacentHTML('beforebegin', this.annotate(M["ERROR"], M["ALT_PLACEHOLDER_MESSAGE"](altText), false, true));
					} else if (error[1] !== null) {
						this.warningCount++;
						$el.classList.add("sa11y-warning-border");
						$el.insertAdjacentHTML('beforebegin', this.annotate(M["WARNING"], M["ALT_HAS_SUS_WORD"](altText, error[1]), false, true));
					} else if ((alt === "" || alt === " ") && $el.closest("a[href]")) {
						if ($el.closest("a[href]").getAttribute("tabindex") == "-1" && $el.closest("a[href]").getAttribute("aria-hidden") == "true") {
							//Do nothing.
						} else if ($el.closest("a[href]").getAttribute("aria-hidden") === "true") {
							this.errorCount++;
							$el.classList.add("sa11y-error-border");
							$el.closest("a[href]").insertAdjacentHTML('beforebegin', this.annotate(M["ERROR"], M["LINK_IMAGE_ARIA_HIDDEN"], false, true));
						} else if (this.fnIgnore($el.closest('a[href]'), "noscript").textContent.trim().length === 0) {
							this.errorCount++;
							$el.classList.add("sa11y-error-border");
							$el.closest("a[href]").insertAdjacentHTML('beforebegin', this.annotate(M["ERROR"], M["LINK_IMAGE_NO_ALT_TEXT"], false, true));
						} else {
							$el.closest("a[href]").insertAdjacentHTML('beforebegin', this.annotate(M["GOOD"], M["LINK_IMAGE_HAS_TEXT"], false, true));
						}
					}

					//Link and contains alt text.
					else if (alt.length > 250 && $el.closest("a[href]")) {
						this.warningCount++;
						$el.classList.add("sa11y-warning-border");
						$el.closest("a[href]").insertAdjacentHTML('beforebegin', this.annotate(M["WARNING"], M["LINK_IMAGE_LONG_ALT"](altText, altLength), false, true));
					}

					//Link and contains an alt text.
					else if (alt != "" && $el.closest("a[href]") && this.fnIgnore($el.closest('a[href]'), "noscript").textContent.trim().length === 0) {
						this.warningCount++;
						$el.classList.add("sa11y-warning-border");
						$el.closest("a[href]").insertAdjacentHTML('beforebegin', this.annotate(M["WARNING"], M["LINK_IMAGE_ALT_WARNING"](altText), false, true));
					}

					//Contains alt text & surrounding link text.
					else if (alt !== "" && $el.closest("a[href]") && this.fnIgnore($el.closest('a[href]'), "noscript").textContent.trim().length >= 1) {
						this.warningCount++;
						$el.classList.add("sa11y-warning-border");
						$el.closest("a[href]").insertAdjacentHTML('beforebegin', this.annotate(M["WARNING"], M["LINK_IMAGE_ALT_AND_TEXT_WARNING"](altText), false, true));
					}

					//Decorative alt and not a link.
					else if (alt === "" || alt === " ") {
						if ($el.closest("figure")) {
							const figcaption = $el.closest("figure").querySelector("figcaption");
							if (figcaption !== null && figcaption.textContent.trim().length >= 1) {
								this.warningCount++;
								$el.classList.add("sa11y-warning-border");
								$el.insertAdjacentHTML('beforebegin', this.annotate(M["WARNING"], M["IMAGE_FIGURE_DECORATIVE"], false, true));
							}
						} else {
							this.warningCount++;
							$el.classList.add("sa11y-warning-border");
							$el.insertAdjacentHTML('beforebegin', this.annotate(M["WARNING"], M["IMAGE_DECORATIVE"], false, true));
						}
					} else if (alt.length > 250) {
						this.warningCount++;
						$el.classList.add("sa11y-warning-border");
						$el.insertAdjacentHTML('beforebegin', this.annotate(M["WARNING"], M["IMAGE_ALT_TOO_LONG"](altText, altLength), false, true));
					} else if (alt !== "") {

						//Figure element has same alt and caption text.
						if ($el.closest("figure")) {
							const figcaption = $el.closest("figure").querySelector("figcaption");
							if (figcaption !== null &&
								(figcaption.textContent.trim().toLowerCase === altText.trim().toLowerCase)
							) {
								this.warningCount++;
								$el.classList.add("sa11y-warning-border");
								$el.insertAdjacentHTML('beforebegin', this.annotate(M["WARNING"], M["IMAGE_FIGURE_DUPLICATE_ALT"](altText), false, true));
							}
						}
						//If image has alt text - pass!
						else {
							$el.insertAdjacentHTML('beforebegin', this.annotate(M["GOOD"], M["IMAGE_PASS"](altText), false, true));
						}
					}
				}
			});
		};

		// ============================================================
		// Rulesets: Labels
		// ============================================================
		this.checkLabels = () => {
			this.$inputs.forEach((el) => {
				let ariaLabel = this.computeAriaLabel(el);
				const type = el.getAttribute('type');

				//If button type is submit or button: pass
				if (type === "submit" || type === "button" || type === "hidden") {
					//Do nothing
				}
				//Inputs where type="image".
				else if (type === "image") {
					let imgalt = el.getAttribute("alt");
					if (!imgalt || imgalt === ' ') {
						if (el.getAttribute("aria-label")) {
							//Good.
						} else {
							this.errorCount++;
							el.classList.add("sa11y-error-border");
							el.insertAdjacentHTML(
								'afterend',
								this.annotate(M["ERROR"], M["LABELS_MISSING_IMAGE_INPUT_MESSAGE"], true));
						}
					}
				}
				//Recommendation to remove reset buttons.
				else if (type === "reset") {
					this.warningCount++;
					el.classList.add("sa11y-warning-border");
					el.insertAdjacentHTML(
						'afterend',
						this.annotate(M["WARNING"], M["LABELS_INPUT_RESET_MESSAGE"], true));
				}
				//Uses ARIA. Warn them to ensure there's a visible label.
				else if (el.getAttribute("aria-label") || el.getAttribute("aria-labelledby") || el.getAttribute("title")) {
					if (el.getAttribute("title")) {
						let ariaLabel = el.getAttribute("title");
						this.warningCount++;
						el.classList.add("sa11y-warning-border");
						el.insertAdjacentHTML(
							'afterend',
							this.annotate(M["WARNING"], M["LABELS_ARIA_LABEL_INPUT_MESSAGE"](ariaLabel), true));
					} else {
						this.warningCount++;
						el.classList.add("jooa11y-warning-border");
						el.insertAdjacentHTML(
							'afterend',
							this.annotate(M["WARNING"], M["LABELS_ARIA_LABEL_INPUT_MESSAGE"](ariaLabel), true));
					}
				}
				//Implicit labels.
				else if (el.closest('label') && el.closest('label').textContent.trim()) {
					//Do nothing if label has text.
				}
				//Has an ID but doesn't have a matching FOR attribute.
				else if (el.getAttribute("id") &&
					Array.from(el.parentElement.children).filter($c => $c.nodeName === 'LABEL').length
				) {
					const $labels = Array.from(el.parentElement.children).filter($c => $c.nodeName === 'LABEL');
					let hasFor = false;

					$labels.forEach(($l) => {
						if (hasFor) return;

						if ($l.getAttribute('for') === el.getAttribute('id')) {
							hasFor = true;
						}
					});

					if (!hasFor) {
						this.errorCount++;
						el.classList.add("sa11y-error-border");
						let id = el.getAttribute('id');
						el.insertAdjacentHTML(
							'afterend',
							this.annotate(M["ERROR"], M["LABELS_NO_FOR_ATTRIBUTE_MESSAGE"](id), true));
					}
				} else {
					this.errorCount++;
					el.classList.add("sa11y-error-border");
					el.insertAdjacentHTML(
						'afterend',
						this.annotate(M["ERROR"], M["LABELS_MISSING_LABEL_MESSAGE"], true));
				}
			});
		};

		// ============================================================
		// Rulesets: Embedded content.
		// ============================================================
		this.checkEmbeddedContent = () => {

			//Warning: Audio content.
			if (options.embeddedContentAudio === true) {
				this.$audio.forEach($el => {
					this.warningCount++;
					$el.classList.add("sa11y-warning-border");
					$el.insertAdjacentHTML('beforebegin', this.annotate(M["WARNING"], M["EMBED_AUDIO"]));
				});
			}

			//Warning: Video content.
			if (options.embeddedContentVideo === true) {
				this.$videos.forEach($el => {
					let track = $el.getElementsByTagName('TRACK');
					if ($el.tagName === "VIDEO" && track.length) {

					} else {
						this.warningCount++;
						$el.classList.add("sa11y-warning-border");
						$el.insertAdjacentHTML('beforebegin', this.annotate(M["WARNING"], M["EMBED_VIDEO"]));
					}
				});
			}

			//Warning: Data visualizations.
			if (options.embeddedContentDataViz === true) {
				this.$dataviz.forEach($el => {
					this.warningCount++;
					$el.classList.add("sa11y-warning-border");
					$el.insertAdjacentHTML('beforebegin', this.annotate(M["WARNING"], M["EMBED_DATA_VIZ"]));
				});
			}

			//Warning: Twitter timelines that are too long.
			if (options.embeddedContentTwitter === true) {
				this.$twitter.forEach($el => {
					const tweets = $el.contentWindow.document.body.querySelectorAll('.timeline-TweetList-tweet');
					if (tweets.length > 3) {
						this.warningCount++;
						$el.classList.add("sa11y-warning-border");
						$el.insertAdjacentHTML('beforebegin', this.annotate(M["WARNING"], M["EMBED_TWITTER"]));
					}
				});
			}

			//Error: iFrame is missing accessible name.
			if (options.embeddedContentTitles === true) {
				this.$iframes.forEach($el => {
					if ($el.tagName === "VIDEO" ||
						$el.tagName === "AUDIO" ||
						$el.getAttribute("aria-hidden") === "true" ||
						$el.getAttribute("hidden") !== null ||
						$el.style.display === 'none' ||
						$el.getAttribute("role") === "presentation") {
						//Ignore if hidden.
					} else if ($el.getAttribute("title") === null || $el.getAttribute("title") === '') {
						if ($el.getAttribute("aria-label") === null || $el.getAttribute("aria-label") === '') {
							if ($el.getAttribute("aria-labelledby") === null) {
								//Make sure red error border takes precedence 
								if ($el.classList.contains("sa11y-warning-border")) {
									$el.classList.remove("sa11y-warning-border");
								}
								this.errorCount++;
								$el.classList.add("sa11y-error-border");
								$el.insertAdjacentHTML('beforebegin',
									this.annotate(M["ERROR"], M["EMBED_MISSING_TITLE"])
								);
							}
						}
					} else {
						//Nothing
					}
				});
			}

			//Warning: general warning for iFrames
			if (options.embeddedContentGeneral === true) {
				this.$embeddedcontent.forEach($el => {
					if ($el.tagName === "VIDEO" ||
						$el.tagName === "AUDIO" ||
						$el.getAttribute("aria-hidden") === "true" ||
						$el.getAttribute("hidden") !== null ||
						$el.style.display === 'none' ||
						$el.getAttribute("role") === "presentation" ||
						$el.getAttribute("tabindex") === "-1") {
						//Ignore if hidden.
					} else {
						this.warningCount++;
						$el.classList.add("sa11y-warning-border");
						$el.insertAdjacentHTML('beforebegin',
							this.annotate(M["WARNING"], M["EMBED_GENERAL_WARNING"])
						);
					}
				});
			}
		}

		// ============================================================
		// Rulesets: QA
		// ============================================================
		this.checkQA = () => {

			//Error: Find all links pointing to development environment.
			if (options.badLinksQA === true) {
				this.$badDevLinks.forEach($el => {
					this.errorCount++;
					$el.classList.add("sa11y-error-text");
					$el.insertAdjacentHTML('afterend', this.annotate(M["ERROR"], M["QA_BAD_LINK"]($el), true));
				});
			}

			//Warning: Excessive bolding or italics.
			if (options.strongItalicsQA === true) {
				this.$strongitalics.forEach($el => {
					let strongItalicsText = $el.textContent.trim().length;
					if (strongItalicsText > 400) {
						this.warningCount++;
						$el.insertAdjacentHTML('beforebegin', this.annotate(M["WARNING"], M["QA_BAD_ITALICS"]));
					}
				});
			}

			//Warning: Find all PDFs.
			if (options.pdfQA === true) {
				this.$checkPDF.forEach(($el, i) => {
					let pdfCount = this.$checkPDF.length;

					//Highlight all PDFs.
					if (pdfCount > 0) {
						this.warningCount++;
						$el.classList.add("sa11y-warning-text");
					}
					//Only append warning button to first PDF.
					if ($el && i == 0) {
						$el.insertAdjacentHTML('afterend', this.annotate(M["WARNING"], M["QA_PDF"](pdfCount), true));
						if ($el.querySelector('img')) {
							$el.classList.remove('sa11y-warning-text');
						}
					}
				});
			}

			//Error: Missing language tag. Lang should be at least 2 characters.
			if (options.langQA === true) {
				if (!this.lang || this.lang.length < 2) {
					this.errorCount++;
					const sa11yContainer = document.getElementById("sa11y-container");
					sa11yContainer.insertAdjacentHTML('afterend', this.annotateBanner(M["ERROR"], M["QA_PAGE_LANGUAGE"]));
				}
			}

			//Warning: Find blockquotes used as headers.
			if (options.blockquotesQA === true) {
				this.$blockquotes.forEach($el => {
					let bqHeadingText = $el.textContent;
					if (bqHeadingText.trim().length < 25) {
						this.warningCount++;
						$el.classList.add("sa11y-warning-border");
						$el.insertAdjacentHTML('beforebegin', this.annotate(M["WARNING"], M["QA_BLOCKQUOTE_MESSAGE"](bqHeadingText)));
					}
				});
			}

			//Tables check.
			if (options.tablesQA === true) {
				this.$tables.forEach($el => {
					let findTHeaders = $el.querySelectorAll("th");
					let findHeadingTags = $el.querySelectorAll("h1, h2, h3, h4, h5, h6");
					if (findTHeaders.length == 0) {
						this.errorCount++;
						$el.classList.add("sa11y-error-border");
						$el.insertAdjacentHTML('beforebegin',
							this.annotate(M["ERROR"], M["TABLES_MISSING_HEADINGS"])
						);
					}
					if (findHeadingTags.length > 0) {
						this.errorCount++;
						findHeadingTags.forEach($el => {
							$el.classList.add("sa11y-error-border");
							$el.insertAdjacentHTML('beforebegin',
								this.annotate(M["ERROR"], M["TABLES_SEMANTIC_HEADING"])
							);
						});
					}
					findTHeaders.forEach($el => {
						if ($el.textContent.trim().length == 0) {
							this.errorCount++;
							$el.classList.add("sa11y-error-border");
							$el.innerHTML = this.annotate(M["ERROR"], M["TABLES_EMPTY_HEADING"]);
						}
					});
				});
			}

			// Warning: Detect fake headings.
			if (options.fakeHeadingsQA === true) {
				this.$p.forEach($el => {
					let brAfter = $el.innerHTML.indexOf("</strong><br>");
					let brBefore = $el.innerHTML.indexOf("<br></strong>");

					//Check paragraphs greater than x characters.
					if ($el && $el.textContent.trim().length >= 300) {
						let firstChild = $el.firstChild;

						//If paragraph starts with <strong> tag and ends with <br>.
						if (firstChild.tagName === "STRONG" && (brBefore !== -1 || brAfter !== -1)) {
							let boldtext = firstChild.textContent;

							if (!/[*]$/.test(boldtext) && !$el.closest("table") && boldtext.length <= 120) {
								firstChild.classList.add("sa11y-fake-heading", "sa11y-warning-border");
								$el.insertAdjacentHTML('beforebegin',
									this.annotate(M["WARNING"], M["QA_FAKE_HEADING"](boldtext))
								);
							}
						}
					}

					// If paragraph only contains <p><strong>...</strong></p>.
					if (/^<(strong)>.+<\/\1>$/.test($el.innerHTML.trim())) {
						//Although only flag if it:
						// 1) Has less than 120 characters (typical heading length).
						// 2) The previous element is not a heading.
						const prevElement = $el.previousElementSibling;
						let tagName = "";
						let boldtext = $el.textContent;

						if (prevElement !== null) {
							tagName = prevElement.tagName;
						}

						if (!/[*]$/.test(boldtext) && !$el.closest("table") && boldtext.length <= 120 && tagName.charAt(0) !== "H") {
							let boldtext = $el.textContent;
							$el.classList.add("sa11y-fake-heading", "sa11y-warning-border");
							$el.firstChild.insertAdjacentHTML("afterend",
								this.annotate(M["WARNING"], M["QA_FAKE_HEADING"](boldtext), true)
							);
						}
					}
				});
				if (document.querySelectorAll(".sa11y-fake-heading").length > 0) {
					this.warningCount++;
				}
			}

			// Warning: Detect paragraphs that should be lists.
			// Thanks to John Jameson from PrincetonU for this ruleset!
			if (options.fakeListQA === true) {
				this.$p.forEach($el => {
					let activeMatch = "";
					let prefixDecrement = {
						b: "a",
						B: "A",
						2: "1",
					};
					let prefixMatch = /a\.|a\)|A\.|A\)|1\.|1\)|\*\s|-\s|--|•\s|→\s|✓\s|✔\s|✗\s|✖\s|✘\s|❯\s|›\s|»\s/;
					let decrement = function (el) {
						return el.replace(/^b|^B|^2/, function (match) {
							return prefixDecrement[match];
						});
					};
					let hit = false;
					let firstPrefix = $el.textContent.substring(0, 2);
					if (
						firstPrefix.trim().length > 0 &&
						firstPrefix !== activeMatch &&
						firstPrefix.match(prefixMatch)
					) {
						let hasBreak = $el.innerHTML.indexOf("<br>");
						if (hasBreak !== -1) {
							let subParagraph = $el
								.innerHTML
								.substring(hasBreak + 4)
								.trim();
							let subPrefix = subParagraph.substring(0, 2);
							if (firstPrefix === decrement(subPrefix)) {
								hit = true;
							}
						}

						let getNextSibling = function (elem, selector) {
							let sibling = elem.nextElementSibling;
							if (!selector) return sibling;
							while (sibling) {
								if (sibling.matches(selector)) return sibling;
								sibling = sibling.nextElementSibling
							}

						};

						// Decrement the second p prefix and compare .
						if (!hit) {
							let $second = getNextSibling($el, 'p');
							if ($second) {
								let secondPrefix = decrement(
									$el.nextElementSibling.textContent.substring(0, 2)
								);
								if (firstPrefix === secondPrefix) {
									hit = true;
								}
							}
						}
						if (hit) {
							this.warningCount++;

							$el.insertAdjacentHTML('beforebegin', this.annotate(M["WARNING"], M["QA_SHOULD_BE_LIST"](firstPrefix)), false, true);
							$el.classList.add("sa11y-fake-list");
							activeMatch = firstPrefix;
						} else {
							activeMatch = "";
						}
					} else {
						activeMatch = "";
					}
				});
				if (document.querySelectorAll(".sa11y-fake-list").length > 0) {
					this.warningCount++;
				}
			}

			//Warning: Detect uppercase. 
			if (options.allCapsQA === true) {
				this.$allcaps.forEach($el => {
					let uppercasePattern = /(?!<a[^>]*?>)(\b[A-Z][',!:A-Z\s]{15,}|\b[A-Z]{15,}\b)(?![^<]*?<\/a>)/g;
					let html = $el.innerHTML;
					$el.innerHTML = html.replace(uppercasePattern, "<span class='sa11y-warning-uppercase'>$1</span>");
				});

				const $warningUppercase = document.querySelectorAll(".sa11y-warning-uppercase");
				$warningUppercase.forEach($el => {
					$el.insertAdjacentHTML('afterend', this.annotate(M["WARNING"], M["QA_UPPERCASE_WARNING"], true));
				});

				if ($warningUppercase.length > 0) {
					this.warningCount++;
				}
			}

			//Error: Duplicate IDs
			if (options.duplicateIdQA === true) {
				const ids = this.root.querySelectorAll("[id]");
				let allIds = {};
				let found = false;
				ids.forEach(($el) => {
					let id = $el.id;
					if (id) {
						if (allIds[id] === undefined) {
							allIds[id] = 1;
						} else {
							found = true;
							$el.classList.add("sa11y-error-border");
							$el.insertAdjacentHTML('afterend', this.annotate(M["ERROR"], M["QA_DUPLICATE_ID"](id), true));
						}
					}
				});
			}

			//Warning: Flag underline text.
			if (options.underlinedTextQA === true) {
				const underline = Array.from(this.root.querySelectorAll('u'));
				underline.forEach(($el) => {
					this.warningCount++;
					$el.classList.add("sa11y-warning-text");
					$el.insertAdjacentHTML("beforebegin", this.annotate(M["WARNING"], M["QA_TEXT_UNDERLINE_WARNING"]));
				});
				const computed = Array.from(this.root.querySelectorAll('h1, h2, h3, h4, h5, h6, p, div, span, li, blockquote'));
				computed.forEach(($el) => {
					let style = getComputedStyle($el),
						decoration = style.textDecorationLine;
					if (decoration === 'underline') {
						this.warningCount++;
						$el.classList.add("sa11y-warning-text");
						$el.insertAdjacentHTML("beforebegin", this.annotate(M["WARNING"], M["QA_TEXT_UNDERLINE_WARNING"]));
					}
				});
			};

			//Example ruleset. Be creative.
			if (options.exampleQA === true) {
				const $checkAnnouncement = this.root.querySelectorAll(".sa11y-announcement-component");
				if ($checkAnnouncement.length > 1) {
					this.warningCount++;
					for (let i = 1; i < $checkAnnouncement.length; i++) {
						$checkAnnouncement[i].classList.add("sa11y-warning-border");
						$checkAnnouncement[i].insertAdjacentHTML("beforebegin", this.annotate(M["WARNING"], M["QA_TOO_MANY_COMPONENTS_EXAMPLE"]));
					}
				}
			}
		};

		// ============================================================
		// Rulesets: Contrast
		// Color contrast plugin by jasonday: https://github.com/jasonday/color-contrast
		// ============================================================
		this.checkContrast = () => {
			let contrastErrors = {
				errors: [],
				warnings: []
			};

			let elements = this.$contrast;
			let contrast = {
				// Parse rgb(r, g, b) and rgba(r, g, b, a) strings into an array.
				// Adapted from https://github.com/gka/chroma.js
				parseRgb: function (css) {
					let i, m, rgb, _i, _j;
					if (m = css.match(/rgb\(\s*(\-?\d+),\s*(\-?\d+)\s*,\s*(\-?\d+)\s*\)/)) {
						rgb = m.slice(1, 4);
						for (i = _i = 0; _i <= 2; i = ++_i) {
							rgb[i] = +rgb[i];
						}
						rgb[3] = 1;
					} else if (m = css.match(/rgba\(\s*(\-?\d+),\s*(\-?\d+)\s*,\s*(\-?\d+)\s*,\s*([01]|[01]?\.\d+)\)/)) {
						rgb = m.slice(1, 5);
						for (i = _j = 0; _j <= 3; i = ++_j) {
							rgb[i] = +rgb[i];
						}
					}
					return rgb;

				},
				// Based on http://www.w3.org/TR/WCAG20/#relativeluminancedef
				relativeLuminance: function (c) {
					let lum = [];
					for (let i = 0; i < 3; i++) {
						let v = c[i] / 255;
						lum.push(v < 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4));
					}
					return (0.2126 * lum[0]) + (0.7152 * lum[1]) + (0.0722 * lum[2]);
				},
				// Based on http://www.w3.org/TR/WCAG20/#contrast-ratiodef
				contrastRatio: function (x, y) {
					let l1 = contrast.relativeLuminance(contrast.parseRgb(x));
					let l2 = contrast.relativeLuminance(contrast.parseRgb(y));
					return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
				},

				getBackground: function (el) {
					let styles = getComputedStyle(el),
						bgColor = styles.backgroundColor,
						bgImage = styles.backgroundImage,
						rgb = contrast.parseRgb(bgColor) + '',
						alpha = rgb.split(',');

					// if background has alpha transparency, flag manual check
					if (alpha[3] < 1 && alpha[3] > 0) {
						return "alpha";
					}

					// if element has no background image, or transparent background (alpha == 0) return bgColor
					if (bgColor !== 'rgba(0, 0, 0, 0)' && bgColor !== 'transparent' && bgImage === "none" && alpha[3] !== '0') {
						return bgColor;
					} else if (bgImage !== "none") {
						return "image";
					}

					// retest if not returned above
					if (el.tagName === 'HTML') {
						return 'rgb(255, 255, 255)';
					} else {
						return contrast.getBackground(el.parentNode);
					}
				},
				/*
				isVisible: function (el) {
					return !!(el.offsetWidth || el.offsetHeight || el.getClientRects().length);
				},
				*/
				check: function () {
					// resets results
					contrastErrors = {
						errors: [],
						warnings: []
					};

					for (let i = 0; i < elements.length; i++) {
						(function (n) {
							let elem = elements[n];
							// test if visible. Although we want invisible too.
							if (contrast /* .isVisible(elem) */ ) {
								let style = getComputedStyle(elem),
									color = style.color,
									fill = style.fill,
									fontSize = parseInt(style.fontSize),
									pointSize = fontSize * 3 / 4,
									fontWeight = style.fontWeight,
									htmlTag = elem.tagName,
									background = contrast.getBackground(elem),
									textString = [].reduce.call(elem.childNodes, function (a, b) {
										return a + (b.nodeType === 3 ? b.textContent : '');
									}, ''),
									text = textString.trim(),
									ratio,
									error,
									warning;

								if (htmlTag === "SVG") {
									ratio = Math.round(contrast.contrastRatio(fill, background) * 100) / 100;
									if (ratio < 3) {
										error = {
											elem: elem,
											ratio: ratio + ':1'
										}
										contrastErrors.errors.push(error);
									}
								} else if (text.length || htmlTag === "INPUT" || htmlTag === "SELECT" || htmlTag === "TEXTAREA") {
									// does element have a background image - needs to be manually reviewed
									if (background === "image") {
										warning = {
											elem: elem
										}
										contrastErrors.warnings.push(warning)
									} else if (background === "alpha") {
										warning = {
											elem: elem
										}
										contrastErrors.warnings.push(warning)
									} else {
										ratio = Math.round(contrast.contrastRatio(color, background) * 100) / 100;
										if (pointSize >= 18 || (pointSize >= 14 && fontWeight >= 700)) {
											if (ratio < 3) {
												error = {
													elem: elem,
													ratio: ratio + ':1'
												}
												contrastErrors.errors.push(error);
											}
										} else {
											if (ratio < 4.5) {
												error = {
													elem: elem,
													ratio: ratio + ':1'
												}
												contrastErrors.errors.push(error);
											}
										}
									}
								}
							}
						})(i);
					}
					return contrastErrors;
				}
			}

			contrast.check();


			contrastErrors.errors.forEach(item => {
				let name = item.elem;
				let cratio = item.ratio;
				let clone = name.cloneNode(true);
				let removeSa11yHeadingLabel = clone.querySelectorAll('.sa11y-heading-label');
				for (let i = 0; i < removeSa11yHeadingLabel.length; i++) {
					clone.removeChild(removeSa11yHeadingLabel[i])
				}

				let nodetext = clone.textContent;
				this.errorCount++;

				if (name.tagName === "INPUT") {
					name.insertAdjacentHTML('beforebegin',
						this.annotate(M["ERROR"], M["CONTRAST_INPUT_ERROR"](cratio))
					);
				} else {
					name.insertAdjacentHTML('beforebegin',
						this.annotate(M["ERROR"], M["CONTRAST_ERROR"](cratio, nodetext))
					);
				}
			});

			contrastErrors.warnings.forEach(item => {
				let name = item.elem;
				let clone = name.cloneNode(true);
				let removeSa11yHeadingLabel = clone.querySelectorAll('.sa11y-heading-label');
				for (let i = 0; i < removeSa11yHeadingLabel.length; i++) {
					clone.removeChild(removeSa11yHeadingLabel[i])
				}
				let nodetext = clone.textContent;

				this.warningCount++;
				name.insertAdjacentHTML('beforebegin',
					this.annotate(M["WARNING"], M["CONTRAST_WARNING"](nodetext))
				);
			});
		}
		// ============================================================
		// Rulesets: Readability
		// Adapted from Greg Kraus' readability script: https://accessibility.oit.ncsu.edu/it-accessibility-at-nc-state/developers/tools/readability-bookmarklet/
		// ============================================================
		this.checkReadability = () => {
			//Crude hack to add a period to the end of list items to make a complete sentence.
			this.$readability.forEach($el => {
				let listText = $el.textContent;
				if (listText.length >= 120) {
					if (listText.charAt(listText.length - 1) !== ".") {
						$el.insertAdjacentHTML("beforeend", "<span class='sa11y-readability-period sa11y-visually-hidden'>.</span>");
					}
				}
			});
			//Compute syllables: http://stackoverflow.com/questions/5686483/how-to-compute-number-of-syllables-in-a-word-in-javascript
			function number_of_syllables(wordCheck) {
				wordCheck = wordCheck.toLowerCase().replace('.', '').replace('\n', '');
				if (wordCheck.length <= 3) {
					return 1;
				}
				wordCheck = wordCheck.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, '');
				wordCheck = wordCheck.replace(/^y/, '');
				let syllable_string = wordCheck.match(/[aeiouy]{1,2}/g);
				let syllables = 0;

				if (!!syllable_string) {
					syllables = syllable_string.length;
				}

				return syllables;
			}

			let readabilityarray = [];
			for (let i = 0; i < this.$readability.length; i++) {
				let current = this.$readability[i];
				if (current.textContent.replace(/ |\n/g, '') !== '') {
					readabilityarray.push(current.textContent);
				}
			}

			let paragraphtext = readabilityarray.join(' ').trim().toString();
			let words_raw = paragraphtext.replace(/[.!?-]+/g, ' ').split(' ');
			let words = 0;
			for (let i = 0; i < words_raw.length; i++) {
				if (words_raw[i] != 0) {
					words = words + 1;
				}
			}

			let sentences_raw = paragraphtext.split(/[.!?]+/);
			let sentences = 0;
			for (let i = 0; i < sentences_raw.length; i++) {
				if (sentences_raw[i] !== '') {
					sentences = sentences + 1;
				}
			}

			let total_syllables = 0;
			let syllables1 = 0;
			let syllables2 = 0;
			for (let i = 0; i < words_raw.length; i++) {
				if (words_raw[i] != 0) {
					let syllable_count = number_of_syllables(words_raw[i]);
					if (syllable_count === 1) {
						syllables1 = syllables1 + 1;
					}
					if (syllable_count === 2) {
						syllables2 = syllables2 + 1;
					}
					total_syllables = total_syllables + syllable_count;
				}
			}

			//let characters = paragraphtext.replace(/[.!?|\s]+/g, '').length;
			//Reference: https://core.ac.uk/download/pdf/6552422.pdf
			//Reference: https://github.com/Yoast/YoastSEO.js/issues/267

			let flesch_reading_ease;
			if (options.readabilityLang === "en") {
				flesch_reading_ease = 206.835 - (1.015 * words / sentences) - (84.6 * total_syllables / words);
			} else if (options.readabilityLang === "fr") {
				flesch_reading_ease = 207 - (1.015 * words / sentences) - (73.6 * total_syllables / words);
			} else if (options.readabilityLang === "es") {
				flesch_reading_ease = 206.84 - (1.02 * words / sentences) - (0.60 * (100 * total_syllables / words));
			} else if (options.readabilityLang === "de") {
				flesch_reading_ease = 180 - (words / sentences) - (58.5 * (total_syllables / words));
			} else if (options.readabilityLang === "nl") {
				flesch_reading_ease = 206.84 - (0.77 * (100 * total_syllables / words)) - (0.93 * (words / sentences));
			} else if (options.readabilityLang === "it") {
				flesch_reading_ease = 217 - (1.3 * (words / sentences)) - (0.6 * (100 * total_syllables / words));
			}

			if (flesch_reading_ease > 100) {
				flesch_reading_ease = 100;
			} else if (flesch_reading_ease < 0) {
				flesch_reading_ease = 0;
			}

			const $readabilityinfo = document.getElementById("sa11y-readability-info");

			if (paragraphtext.length === 0) {
				$readabilityinfo.innerHTML = M["READABILITY_NO_P_OR_LI_MESSAGE"];
			} else if (words > 30) {
				let fleschScore = flesch_reading_ease.toFixed(1);
				let avgWordsPerSentence = (words / sentences).toFixed(1);
				let complexWords = Math.round(100 * ((words - (syllables1 + syllables2)) / words));

				//WCAG AAA pass if greater than 60
				if (fleschScore >= 0 && fleschScore < 30) {
					$readabilityinfo.innerHTML =
						`<span>${fleschScore}</span> 
						<span class="sa11y-readability-score">${M["LANG_VERY_DIFFICULT"]}</span>`;

				} else if (fleschScore > 31 && fleschScore < 49) {
					$readabilityinfo.innerHTML =
						`<span>${fleschScore}</span> 
						<span class="sa11y-readability-score">${M["LANG_DIFFICULT"]}</span>`;

				} else if (fleschScore > 50 && fleschScore < 60) {
					$readabilityinfo.innerHTML =
						`<span>${fleschScore}</span> 
						<span class="sa11y-readability-score">${M["LANG_FAIRLY_DIFFICULT"]}</span>`;
				} else {
					$readabilityinfo.innerHTML =
						`<span>${fleschScore}</span> 
						<span class="sa11y-readability-score">${M["LANG_GOOD"]}</span>`;
				}

				document.getElementById("sa11y-readability-details").innerHTML =
					`<li><span class='sa11y-bold'>${M["LANG_AVG_SENTENCE"]}</span> ${avgWordsPerSentence}</li>
				<li><span class='sa11y-bold'>${M["LANG_COMPLEX_WORDS"]}</span> ${complexWords}%</li>
				<li><span class='sa11y-bold'>${M["LANG_TOTAL_WORDS"]}</span> ${words}</li>`;
			} else {
				$readabilityinfo.textContent = M["READABILITY_NOT_ENOUGH_CONTENT_MESSAGE"];
			}
		}
		this.initialize();
	}
}