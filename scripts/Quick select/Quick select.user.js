// ==UserScript==
// @name         Quick select
// @namespace    https://die-staemme.de/
// @version      1.2
// @description  Eine leiste um schnell Gebäude auszuwählen
// @author       LaicosVK
// @match        https://*.die-staemme.de/game.php*
// @grant        GM_xmlhttpRequest
// @icon         https://raw.githubusercontent.com/LaicosVK/DSS/main/stuff/icon.png
// ==/UserScript==

// Check for updates
checkForUpdates();

function checkForUpdates() {
    // Get the current version number of the script
    var currentVersion = GM_info.script.version;

    // Make a request to the server to check for updates
    GM_xmlhttpRequest({
		method: "GET",
		url: "https://github.com/LaicosVK/DSS/raw/main/scripts/Quick%20select/version.json",
		onload: function(response) {
			var updates = JSON.parse(response.responseText);

			// Compare the current version to the latest version
			if (updates.latest > currentVersion) {
				// If an update is available, show a notification
				alert("Ein Update ist verfügbar!");
				// and redirect the user to the update link
				location.href = updates.update_url;
			}
		}
	});
}

(function() {
    'use strict';

	//Warte bis die seite geladen hat
    $( document ).ready(function() {

		//
		const button = ["main", "train", "snob", "smith", "place&mode=scavenge", "market"];
		const button_icons = ["main", "barracks", "snob", "smith", "place", "market"];

		//variables
		const village_id = game_data.village.id;
		const link = game_data.link_base_pure;
		const img = '<img src="https://dsde.innogamescdn.com/asset/0e187870/graphic//buildings/'
		var menu_row = $("tr#menu_row2")

		function inject(item, index) {
			menu_row.append('<td class=" box-item icon-box"><a href="' + link + button[index] + '"">' + img + button_icons[index] + '.png">');
		}

		button.forEach(inject);

	});
})();