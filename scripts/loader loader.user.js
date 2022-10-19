// ==UserScript==
// @name         DSS Loader loader
// @namespace    https://die-staemme.de/
// @version      1.0
// @description  Läd den LVK Script loader
// @author       LaicosVK
// @match        https://*.die-staemme.de/game.php*
// @grant        none
// ==/UserScript==

let win = typeof unsafeWindow != 'undefined' ? unsafeWindow : window;
win.$.ajaxSetup({ cache: true });
win.$.getScript('https://github.com/LaicosVK/DSS/raw/main/scripts/loader.user.js');