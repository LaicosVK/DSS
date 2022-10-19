// ==UserScript==
// @name         DSS Loader
// @namespace    https://die-staemme.de/
// @version      1.0
// @description  Läd alle LVK Scripte
// @author       LaicosVK
// @match        https://*.die-staemme.de/game.php*
// @grant        none
// ==/UserScript==

let win = typeof unsafeWindow != 'undefined' ? unsafeWindow : window;
win.$.ajaxSetup({ cache: true });
win.$.getScript('');