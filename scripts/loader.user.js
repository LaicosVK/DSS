// ==UserScript==
// @name         LaicosVK's DSS Loader
// @namespace    https://die-staemme.de/
// @version      1.1.1
// @description  Läd den LVK Script loader
// @author       LaicosVK
// @match        https://*.die-staemme.de/game.php*
// @grant        none

// ==/UserScript==

let win = typeof unsafeWindow != 'undefined' ? unsafeWindow : window;
win.$.ajaxSetup({ cache: true });

win.$.getScript('https://github.com/LaicosVK/DSS/raw/main/scripts/Raubzugrechner.user.js');
win.$.getScript('https://github.com/LaicosVK/DSS/raw/main/scripts/Quick%20select.user.js');