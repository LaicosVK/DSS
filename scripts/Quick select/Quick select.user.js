// ==UserScript==
// @name         Quick select
// @namespace    https://die-staemme.de/
// @version      1.2
// @description  Eine leiste um schnell Gebäude auszuwählen
// @author       LaicosVK
// @match        https://*.die-staemme.de/game.php*
// @grant        none
// ==/UserScript==

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