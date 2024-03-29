// ==UserScript==
// @name         Rohstoff Zeit Monitor
// @namespace    https://die-staemme.de/
// @version      1.2.3
// @description  Zeigt die Zeiten für fehlende Rohstoffe an.
// @author       DasMonschta
// @match        https://*.die-staemme.de/game.php?*screen=main*
// @match        https://*.die-staemme.de/game.php?*screen=snob*
// @grant        GM_xmlhttpRequest
// @icon         https://raw.githubusercontent.com/LaicosVK/DSS/main/stuff/DasMonschta/icon.png
// ==/UserScript==

// Check for updates
checkForUpdates();

function checkForUpdates() {
    // Get the current version number of the script
    var currentVersion = GM_info.script.version;

    // Make a request to the server to check for updates
    GM_xmlhttpRequest({
		method: "GET",
		url: "https://raw.githubusercontent.com/LaicosVK/DSS/main/scripts/Rohstoff%20Zeit%20Monitor/version.json",
		onload: function(response) {
			var updates = JSON.parse(response.responseText);

			// Compare the current version to the latest version
			if (updates.latest > currentVersion) {
				// If an update is available, show a notification
				alert(GM_info.script.name + " hat ein Update!\n" + GM_info.script.version + " > " + updates.latest + "\nNeuerungen:\n" + updates.news);
				// and redirect the user to the update link
				location.href = updates.update_url;
			}
		}
	});
}
(function() {
    'use strict';

    // Hole aktuelle Seite
    const urlParams = new URLSearchParams(window.location.search);
    const screen = urlParams.get('screen');

    // Hole aktuellen Rohstoffbestand
    const wood = game_data.village.wood;
    const stone = game_data.village.stone;
    const iron = game_data.village.iron;

    // Hole aktuelle Produktion pro Stunde
    const woodProd = game_data.village.wood_prod * 60 * 60;
    const stoneProd = game_data.village.stone_prod * 60 * 60;
    const ironProd = game_data.village.iron_prod * 60 * 60;

    // Wandelt ein Float Zeitverhältnis in eine Zeit um
    function convertTime(number){
        number = number * 60;
        var hours = Math.floor(number / 60);
        var minutes = Math.floor(number % 60);
        return hours + "h " + minutes + "m";
    }

    // Symbol vor Zeitangabe
    const icon = " <span class='icon header time'></span>";

    if(screen == "main"){
        // Hauptgebäude Rohstoffe

        // Hole alle Elemnte die rot angezeigt werden (Rohstoffe ungenügend)
        const woodWarnElements = document.getElementsByClassName('cost_wood warn');
        const stoneWarnElements = document.getElementsByClassName('cost_stone warn');
        const ironWarnElements = document.getElementsByClassName('cost_iron warn');

        // Führe für jeden Rohstoff die Zeitberechnung durch und zeige sie an.
        Array.from(woodWarnElements).forEach((item, index)=>{
            item.innerHTML += "<br>" + icon + convertTime((parseInt(item.textContent)-wood)/woodProd);
        })
        Array.from(stoneWarnElements).forEach((item, index)=>{
            item.innerHTML += "<br>" + icon + convertTime((parseInt(item.textContent)-stone)/stoneProd);
        })
        Array.from(ironWarnElements).forEach((item, index)=>{
            item.innerHTML += "<br>" + icon + convertTime((parseInt(item.textContent)-iron)/ironProd);
        })
    }else if(screen == "snob"){
        // Adelsgeschlecht Rohstoffe
        const snobWoodWarnElement = document.querySelector('#next_snob_cost_wood');
        const snobStoneWarnElement = document.querySelector('#next_snob_cost_stone');
        const snobIronWarnElement = document.querySelector('#next_snob_cost_iron');

        if (snobWoodWarnElement !== null && wood <= 40000) snobWoodWarnElement.innerHTML += icon + convertTime((40000-wood)/woodProd) + "<br>";
		else snobWoodWarnElement.innerHTML += "<br>";
        if (snobStoneWarnElement !== null && stone <= 50000) snobStoneWarnElement.innerHTML += icon + convertTime((50000-stone)/stoneProd) + "<br>";
		else snobStoneWarnElement.innerHTML += "<br>";
        if (snobIronWarnElement !== null && iron <= 50000) snobIronWarnElement.innerHTML += icon + convertTime((50000-iron)/ironProd);

        // Goldmünze Rohstoffe
        const coinWoodWarnElement = document.querySelector('.warn#coin_cost_wood');
        const coinStoneWarnElement = document.querySelector('.warn#coin_cost_stone ');
        const coinIronWarnElement = document.querySelector('.warn#coin_cost_iron');

        if (coinWoodWarnElement !== null) coinWoodWarnElement.innerHTML += "<br>" + icon + convertTime((28000-wood)/woodProd);
        if (coinStoneWarnElement !== null) coinStoneWarnElement.innerHTML += "<br>" + icon + convertTime((30000-stone)/stoneProd);
        if (coinIronWarnElement !== null) coinIronWarnElement.innerHTML += "<br>" + icon + convertTime((25000-iron)/ironProd);
    }
})();
