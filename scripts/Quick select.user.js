// ==UserScript==
// @name         Quick select
// @namespace    https://die-staemme.de/
// @version      1.0
// @description  Eine leiste um schnell Gebäude auszuwählen
// @author       LaicosVK
// @match        https://*.die-staemme.de/game.php*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

	//Warte bis die seite geladen hat
    $( document ).ready(function() {

		//village id
		const village_id = game_data.village.id;

		//icons
		const icon_main = '<img class="quickbar_image" data-src="https://dsde.innogamescdn.com/asset/0e187870/graphic//buildings/main.png" alt="" src="https://dsde.innogamescdn.com/asset/0e187870/graphic//buildings/main.png">';
		const icon_train = '<img class="quickbar_image" data-src="https://dsde.innogamescdn.com/asset/0e187870/graphic//buildings/main.png" alt="" src="https://dsde.innogamescdn.com/asset/0e187870/graphic//buildings/barracks.png">';
		const icon_snob = '<img class="quickbar_image" data-src="https://dsde.innogamescdn.com/asset/0e187870/graphic//buildings/main.png" alt="" src="https://dsde.innogamescdn.com/asset/0e187870/graphic//buildings/snob.png">';
		const icon_smith = '<img class="quickbar_image" data-src="https://dsde.innogamescdn.com/asset/0e187870/graphic//buildings/main.png" alt="" src="https://dsde.innogamescdn.com/asset/0e187870/graphic//buildings/smith.png">';
		const icon_scavange = '<img class="quickbar_image" data-src="https://dsde.innogamescdn.com/asset/0e187870/graphic//buildings/main.png" alt="" src="https://dsde.innogamescdn.com/asset/0e187870/graphic//buildings/place.png">';
		const icon_market = '<img class="quickbar_image" data-src="https://dsde.innogamescdn.com/asset/0e187870/graphic//buildings/main.png" alt="" src="https://dsde.innogamescdn.com/asset/0e187870/graphic//buildings/market.png">';
		
		//element
		var menu_row = $("tr#menu_row2")

		/was eingefügt werden soll
		const main = '<td style="white-space:nowrap;" id="menu_row2_qs" class="firstcell box-item icon-box nowrap"><a class="nowrap tooltip-delayed" href="/game.php?village=' + village_id + '&amp;screen=main"">' + icon_main + '</span></a>'
		const training = '<td style="white-space:nowrap;" id="menu_row2_qs" class="firstcell box-item icon-box nowrap"><a class="nowrap tooltip-delayed" href="/game.php?village=' + village_id + '&amp;screen=train"">' + icon_train + '</span></a>'
		const snob = '<td style="white-space:nowrap;" id="menu_row2_qs" class="firstcell box-item icon-box nowrap"><a class="nowrap tooltip-delayed" href="/game.php?village=' + village_id + '&amp;screen=snob"">' + icon_snob + '</span></a>'
		const smith = '<td style="white-space:nowrap;" id="menu_row2_qs" class="firstcell box-item icon-box nowrap"><a class="nowrap tooltip-delayed" href="/game.php?village=' + village_id + '&amp;screen=smith"">' + icon_smith + '</span></a>'
		const scavange = '<td style="white-space:nowrap;" id="menu_row2_qs" class="firstcell box-item icon-box nowrap"><a class="nowrap tooltip-delayed" href="/game.php?village=' + village_id + '&amp;screen=place&mode=scavenge"">' + icon_scavange + '</span></a>'
		const market = '<td style="white-space:nowrap;" id="menu_row2_qs" class="firstcell box-item icon-box nowrap"><a class="nowrap tooltip-delayed" href="/game.php?village=' + village_id + '&amp;screen=market"">' + icon_market + '</span></a>'

		//einfügen
	    menu_row.append('<tr id="quick_select"><td>' + main + '</td><td>' + training + '</td><td>' + snob + '</td><td>' + smith + '</td><td>' + scavange + '</td><td>' + market + '</td></tr>');

		}
	);
})();