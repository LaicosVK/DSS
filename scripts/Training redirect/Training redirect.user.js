// ==UserScript==
// @name         Training redirect
// @namespace    https://die-staemme.de/
// @version      1.0
// @description  Wechselt automatisch zur Training Seite
// @author       LaicosVK
// @match        https://*.die-staemme.de/game.php*&screen=barracks
// @match        https://*.die-staemme.de/game.php*&screen=stable
// @match        https://*.die-staemme.de/game.php*&screen=garage
// @grant        none
// @icon         https://raw.githubusercontent.com/LaicosVK/DSS/main/stuff/icon.png
// ==/UserScript==

window.location.href = window.location.href.replace("barracks", "train").replace("stable", "train").replace("garage", "train");