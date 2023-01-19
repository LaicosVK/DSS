// ==UserScript==
// @name         Training redirect
// @namespace    https://die-staemme.de/
// @version      1.2
// @description  Wechselt automatisch zur Training Seite
// @author       LaicosVK
// @match        https://*.die-staemme.de/game.php*&screen=barracks
// @match        https://*.die-staemme.de/game.php*&screen=stable
// @match        https://*.die-staemme.de/game.php*&screen=garage
// @grant        GM_xmlhttpRequest
// @icon         https://raw.githubusercontent.com/LaicosVK/DSS/main/stuff/LaicosVK/icon.png
// ==/UserScript==

// Check for updates
checkForUpdates();

function checkForUpdates() {
    // Get the current version number of the script
    var currentVersion = GM_info.script.version;

    // Make a request to the server to check for updates
    GM_xmlhttpRequest({
		method: "GET",
		url: "https://raw.githubusercontent.com/LaicosVK/DSS/main/scripts/Training%20redirect/version.json",
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
window.location.href = window.location.href.replace("barracks", "train").replace("stable", "train").replace("garage", "train");
