// ==UserScript==
// @name         LaicosVK's DSS Loader
// @namespace    https://die-staemme.de/
// @version      1.1.1
// @description  Läd den LVK Script loader
// @author       LaicosVK
// @match        https://*.die-staemme.de/game.php*
// @grant        none

// ==/UserScript==

var script = document.createElement('script');
script.src = 'https://github.com/LaicosVK/DSS/raw/main/scripts/Quick%20select.user.js';
script.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(script);

var script = document.createElement('script');
script.src = 'https://github.com/LaicosVK/DSS/raw/main/scripts/Raubzugrechner.user.js';
script.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(script);