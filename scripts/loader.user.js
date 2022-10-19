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

//Raubzugrechner
win.$.getScript('https://github.com/LaicosVK/DSS/raw/main/scripts/Raubzugrechner.user.js');

//quick select
win.$.getScript('https://github.com/LaicosVK/DSS/raw/main/scripts/Quick%20select.user.js');