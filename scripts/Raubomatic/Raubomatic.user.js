// ==UserScript==
// @name         Raubomatic
// @namespace    https://die-staemme.de/
// @version      1.0
// @description  Schickt auf Knopfdruck Einheiten auf Raubzüge los
// @author       Adrian
// @match        https://*.die-staemme.de/game.php?*mode=scavenge*
// @grant        none
// ==/UserScript==

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
var choice = [];
var sendUnits = [];
var sending = -1;

// Warte, bis die Seite geladen wurde, + 20 ms zusätzlich
$( document ).ready(function() {
	setTimeout(function () {

		// Wie viele Raubzug-Optionen wurden schon freigeschaltet?
		for (let i = 1; i <= 4; i++) {
			unlocked += !ScavengeScreen.village.options[i].is_locked;
		}

		if (unlocked == 0) {
			console.log("Keine Raubzüge freigeschaltet");
			return;
		}

		// Erstelle Einheiten-Auswahl-Tabelle
		let unitSelection = '<table id="raubzugRechner" style="margin-bottom: 0em;"> <caption>Einheiten-Auswahl</caption> <thead>';
		// Icon-Header
		for (let i = 0; i < 7; i++) {
			unitSelection += '<th><label for="selection'+ names[i] +'"><img src="https://dsde.innogamescdn.com/asset/f612ff09/graphic/unit/unit_'+ names[i] +'.png"></label></th>';
		}
		unitSelection += "</thead> <tbody>";

		// Auswahlkästchen für Einheiten
		for (let i = 0; i < 7; i++) {
			unitSelection += '<td><input type="checkbox" id="selection'+ names[i] +'"'+
				(i != 4 ? ' checked="checked"':'') +' /></td>';
		}
		unitSelection += "</tbody></table>";

		let raubzug = $("p.explanatory-text");
		raubzug.empty().append(unitSelection);

		// Buttons für das automatische Eintragen und Absenden
		raubzug.append('<button type="button" class="btn-default" id="serfaRaubzug" title="Sendet automatisch alle der ausgewählten Einheiten auf Raubzug">Einheiten losschicken</button>');
		raubzug.append('<input type="checkbox" id="selectionDebug" title="Der Debug-Modus versendet keine Truppen, sondern gibt die Aufteilung in der Browser-Konsole aus." /> Debug');
		$('#serfaRaubzug').click(serfaRaubzug);
	}, 20);
});

function serfaRaubzug() {
	if (sending !== -1) {
		return;
	}

	debug = $("input#selectionDebug").is(':checked');
	for(let i = 0; i < 7; i++) {
		choice[i] = $("#raubzugRechner input#selection"+names[i]).is(':checked');
	}
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
		console.log("Nicht genug Einheiten für letzten Raubzug ausgewählt: "+ names[i] +" Bevölkerung");
	}
}

function sendScavenging() {
	if (sending == unlocked || $("#scavenge_screen a.free_send_button").length === 0) {
		$('#serfaRaubzug').text("Einheiten losschicken").css("filter", "none");
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

