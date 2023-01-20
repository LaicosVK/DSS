// ==UserScript==
// @name         Raubomatic
// @namespace    https://die-staemme.de/
// @version      1.1.2
// @description  Schickt auf Knopfdruck Einheiten auf Raubzüge los
// @author       Adrian
// @match        https://*.die-staemme.de/game.php?*mode=scavenge*
// @grant        GM_xmlhttpRequest
// @icon         https://raw.githubusercontent.com/LaicosVK/DSS/main/stuff/Adrian/icon.png
// ==/UserScript==

// Check for updates
checkForUpdates();

function checkForUpdates() {
    // Get the current version number of the script
    var currentVersion = GM_info.script.version;

    // Make a request to the server to check for updates
    GM_xmlhttpRequest({
		method: "GET",
		url: "https://raw.githubusercontent.com/LaicosVK/DSS/main/scripts/Raubomatic/version.json",
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

var debug = false;
var names = ["spear", "sword", "axe", "archer", "light", "marcher", "heavy"];
var popCost = [1, 1, 1, 1, 4, 5, 6];

// Verhältnis der Einheitenverteilung für die Sammler-Gruppen
const RATIO = [[    1,    0,    0,    0],
			   [  5/7,  2/7,    0,    0],
			   [  5/8,  2/8,  1/8,    0],
			   [15/26, 6/26, 3/26, 2/26]
			  ];
var unlocked = 0;
var choice = "";
var sendUnits = [];
var sending = -1;

// Warte, bis die Seite geladen wurde, + 20 ms zusätzlich
$( document ).ready(function() {
	setTimeout(function () {
		// Wurde schon eine Auswahl an Einheiten gespeichert?
		let storageChoice = localStorage.getItem("raubomaticUnitChoice");
		if (storageChoice === null)
		{
			if (debug) console.log("localStorage leer, generiere Standardwert.");
			choice = storageChoice = "1111011";
			localStorage.setItem("raubomaticUnitChoice", storageChoice);
		}
		else {
			if (debug) console.log("localStorage wurde geladen: "+ storageChoice);
			choice = storageChoice;
		}

		// Wie viele Raubzug-Optionen wurden schon freigeschaltet?
		for (let i = 1; i <= 4; i++) {
			unlocked += !ScavengeScreen.village.options[i].is_locked;
		}

		if (unlocked == 0) {
			console.log("Keine Raubzüge freigeschaltet");
			return;
		}

		// Erstelle Einheiten-Auswahl-Tabelle
		let unitSelection = '<table id="unitTable" style="margin-bottom: 0em;"> <caption style="font-weight: bold;">Einheiten-Auswahl</caption> <thead>';
		// Icon-Header
		for (let i = 0; i < 7; i++) {
			unitSelection += '<th><label for="selection'+ names[i] +'"><img src="https://dsde.innogamescdn.com/asset/f612ff09/graphic/unit/unit_'+ names[i] +'.png"></label></th>';
		}
		unitSelection += "</thead> <tbody>";

		// Auswahlkästchen für Einheiten
		for (let i = 0; i < 7; i++) {
			unitSelection += '<td><input type="checkbox" id="selection'+ names[i] +'"'+
				(choice[i] == "1" ? ' checked="checked"':'') +' /></td>';
		}
		unitSelection += "</tbody></table>";

		$("#content_value h3").before('<div id="raubomatic" style="float: right; margin: 16px 8px 8px"></div>');
		let raubomaticDiv = $("#raubomatic");
		raubomaticDiv.append(unitSelection);

		for (let i = 0; i < 7; i++) {
			$("#selection"+ names[i]).change(changeUnitChoice);
		}

		// Buttons für das automatische Eintragen und Absenden
		raubomaticDiv.append('<button type="button" class="btn-default" id="startRaubomatic" title="Sendet automatisch alle der ausgewählten Einheiten auf Raubzug">Losschicken</button>');
		$('#startRaubomatic').click(startRaubomatic);
		raubomaticDiv.append('<input type="checkbox" id="selectionDebug"'+(debug ? ' checked="checked"':'') +'title="Der Debug-Modus versendet keine Truppen, sondern gibt die Aufteilung in der Browser-Konsole aus." /> Debug');
		$("#selectionDebug").change(changeDebug);
	}, 20);
});

function startRaubomatic() {
	if (sending !== -1) {
		return;
	}

	debug = $("input#selectionDebug").is(':checked');
	calcSendUnits();

	if (debug == true) {
		let allUnitsText = "Alle Einheiten:\n";
		for (let i = 0; i < unlocked; i++) {
			for (let k = 0; k < 7; k++) {
				allUnitsText += names[k] +": "+ sendUnits[i][k] +(k==6?"\n":", ");
			}
		}
		console.log(allUnitsText);
	}
	else {
		sending = 0;
		$('#serfaRaubzug').text("Bitte warten").css("filter", "grayscale(100%)");
		sendScavenging();
	}
}

function calcSendUnits() {
	let allUnits = [];
	sendUnits = [];

	for(let i = 0; i < 7; i++) {
		allUnits[i] = (choice[i] == true ? eval("ScavengeScreen.village.unit_counts_home."+names[i]) : 0);
	}
	let tempUnits = [...allUnits];

	for(let i = 0; i < (unlocked -1); i++) {
		sendUnits[i] = [];
		let send = 0;
		for(let k = 0; k < 7; k++) {
			send = Math.round(allUnits[k] * RATIO[unlocked-1][i]);
			sendUnits[i][k] = send;
			tempUnits[k] -= send;
		}
	}

	sendUnits[unlocked-1] = [];
	let minimumUnits = 0;
	for(let i = 0; i < 7; i++) {
		sendUnits[unlocked-1][i] = tempUnits[i];
		minimumUnits += tempUnits[i] * popCost[i];
		if (sendUnits[unlocked-1][i] < 0) {
			debug = true;
			console.log("Negative Anzahl an "+ names[i]);
		}
	}
	if (minimumUnits < 10)
	{
		debug = true;
		console.log("Nicht genug Einheiten für letzten Raubzug ausgewählt: "+ minimumUnits +" Bevölkerung");
	}
}

function sendScavenging() {
	if (sending == unlocked || $("#scavenge_screen a.free_send_button").length === 0) {
		$('#serfaRaubzug').text("Losschicken").css("filter", "none");
		sending = -1;
	} else {
		let randomTime = 300 + Math.random()*100;
		let changedInputs = 0;
		for (let i = 0; i < 7; i++) {
			if (choice[i] != false && sendUnits[sending][i] != 0) {
				setTimeout(function () {
					$('input.unitsInput[name="'+ names[i] +'"]').val(sendUnits[sending][i]).trigger("change");
					console.log("Trage "+ names[i] +", Anzahl "+ sendUnits[sending][i] +" ein. ("+ sending +"#"+ i +")");
				}, changedInputs*randomTime + Math.random()*0.15*randomTime);
				changedInputs++;
			}
		}
		setTimeout(function () {
			$("#scavenge_screen a.free_send_button")[0].click();
			console.log("Klicke Absende-Button. ("+ sending +")");
			sending++;
			setTimeout(sendScavenging, randomTime + randomTime*Math.random());
		}, changedInputs*randomTime + Math.random()*0.5*randomTime);
	}
}

function changeUnitChoice() {
	if (debug) console.log("Einheitenauswahl wurde geändert.");
	choice = "";
	for(let i = 0; i < 7; i++) {
		choice += ($("#unitTable input#selection"+names[i]).is(':checked') ? "1" : "0");
	}
	localStorage.setItem("raubomaticUnitChoice", choice);
}
function changeDebug() {
	console.log("Debugmodus wurde "+ (debug?"de":"") +"aktiviert.");
	debug = $("#selectionDebug").is(':checked');
}
