// ==UserScript==
// @name         Raubzugrechner
// @namespace    https://die-staemme.de/
// @version      1.0
// @description  Rechnet automatisch raubzug Truppeneinheiten aus
// @author       LaicosVK
// @match        https://*.die-staemme.de/game.php?*&mode=scavenge
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

	//Warte bis die seite geladen hat
    $( document ).ready(function() {

		//hol ob sammler freigeschaltet sind
        const unlocked_1 = !ScavengeScreen.village.options[1].is_locked;
        const unlocked_2 = !ScavengeScreen.village.options[2].is_locked;
        const unlocked_3 = !ScavengeScreen.village.options[3].is_locked;
        const unlocked_4 = !ScavengeScreen.village.options[4].is_locked;

		//hol einheiten
		const spear = ScavengeScreen.village.unit_counts_home.spear;
		const sword = ScavengeScreen.village.unit_counts_home.sword;
		const axe = ScavengeScreen.village.unit_counts_home.axe;
		const archer = ScavengeScreen.village.unit_counts_home.archer;
		const lkav = ScavengeScreen.village.unit_counts_home.light;
		const marcher = ScavengeScreen.village.unit_counts_home.marcher;
		const skav = ScavengeScreen.village.unit_counts_home.heavy;

		//hol icons
		const icon_spear = '<img src="https://dsde.innogamescdn.com/asset/f612ff09/graphic/unit/unit_spear.png">';
		const icon_sword = '<img src="https://dsde.innogamescdn.com/asset/f612ff09/graphic/unit/unit_sword.png">';
		const icon_axe = '<img src="https://dsde.innogamescdn.com/asset/f612ff09/graphic/unit/unit_axe.png">';
		const icon_archer = '<img src="https://dsde.innogamescdn.com/asset/f612ff09/graphic/unit/unit_archer.png">';
		const icon_lkav = '<img src="https://dsde.innogamescdn.com/asset/f612ff09/graphic/unit/unit_light.png">';
		const icon_marcher = '<img src="https://dsde.innogamescdn.com/asset/f612ff09/graphic/unit/unit_marcher.png">';
		const icon_skav = '<img src="https://dsde.innogamescdn.com/asset/f612ff09/graphic/unit/unit_heavy.png">';

		//setze benutze variablen
        var spear_a, sword_a, axe_a, archer_a, lkav_a, marcher_a, skav_a;
        var spear_b, sword_b, axe_b, archer_b, lkav_b, marcher_b, skav_b;
        var spear_c, sword_c, axe_c, archer_c, lkav_c, marcher_c, skav_c;
        var spear_d, sword_d, axe_d, archer_d, lkav_d, marcher_d, skav_d;
		var devide = 0, times = 0

		//berechne wenn 4 freigeschaltet sind
        if(unlocked_4){
			devide = 1000
			times = 588
            spear_a = spear/devide*times, sword_a = sword/devide*times, axe_a = axe/devide*times, archer_a = archer/devide*times, lkav_a = lkav/devide*times, marcher_a = marcher/devide*times, skav_a = skav/devide*times
			times = 235
            spear_b = spear/devide*times, sword_b = sword/devide*times, axe_b = axe/devide*times, archer_b = archer/devide*times, lkav_b = lkav/devide*times, marcher_b = marcher/devide*times, skav_b = skav/devide*times
			times = 118
            spear_c = spear/devide*times, sword_c = sword/devide*times, axe_c = axe/devide*times, archer_c = archer/devide*times, lkav_c = lkav/devide*times, marcher_c = marcher/devide*times, skav_c = skav/devide*times
			times = 78
            spear_d = spear/devide*times, sword_d = sword/devide*times, axe_d = axe/devide*times, archer_d = archer/devide*times, lkav_d = lkav/devide*times, marcher_d = marcher/devide*times, skav_d = skav/devide*times
        }

		//berechne wenn 3 freigeschaltet sind
        else if(unlocked_3){
			devide = 1000
			times = 625
            spear_a = spear/devide*times, sword_a = sword/devide*times, axe_a = axe/devide*times, archer_a = archer/devide*times, lkav_a = lkav/devide*times, marcher_a = marcher/devide*times, skav_a = skav/devide*times
			times = 250
            spear_b = spear/devide*times, sword_b = sword/devide*times, axe_b = axe/devide*times, archer_b = archer/devide*times, lkav_b = lkav/devide*times, marcher_b = marcher/devide*times, skav_b = skav/devide*times
			times = 127
            spear_c = spear/devide*times, sword_c = sword/devide*times, axe_c = axe/devide*times, archer_c = archer/devide*times, lkav_c = lkav/devide*times, marcher_c = marcher/devide*times, skav_c = skav/devide*times
			times = 0
            spear_d = spear/devide*times, sword_d = sword/devide*times, axe_d = axe/devide*times, archer_d = archer/devide*times, lkav_d = lkav/devide*times, marcher_d = marcher/devide*times, skav_d = skav/devide*times
        }

		//berechne wenn 2 freigeschaltet sind
        else if(unlocked_2){
			devide = 1000
			times = 714
            spear_a = spear/devide*times, sword_a = sword/devide*times, axe_a = axe/devide*times, archer_a = archer/devide*times, lkav_a = lkav/devide*times, marcher_a = marcher/devide*times, skav_a = skav/devide*times
			times = 286
            spear_b = spear/devide*times, sword_b = sword/devide*times, axe_b = axe/devide*times, archer_b = archer/devide*times, lkav_b = lkav/devide*times, marcher_b = marcher/devide*times, skav_b = skav/devide*times
			times = 0
            spear_c = spear/devide*times, sword_c = sword/devide*times, axe_c = axe/devide*times, archer_c = archer/devide*times, lkav_c = lkav/devide*times, marcher_c = marcher/devide*times, skav_c = skav/devide*times
			times = 0
            spear_d = spear/devide*times, sword_d = sword/devide*times, axe_d = axe/devide*times, archer_d = archer/devide*times, lkav_d = lkav/devide*times, marcher_d = marcher/devide*times, skav_d = skav/devide*times

        }

		//zeige nur, wenn mindestens 2 freigeschaltet sind
		if(unlocked_2){
			var tabelle = $("p.explanatory-text")

			//Erstelle Tabelle
		    tabelle.append("<table style='margin-top:50px'");
		    tabelle.append("<tr><th> </th><th>"+icon_spear+"</th><th>"+icon_sword+"</th><th>"+icon_axe+"</th><th>"+icon_archer+"</th><th>"+icon_lkav+"</th><th>"+icon_marcher+"</th><th>"+icon_skav+"</th></tr>");
		    tabelle.append("<tr><th>Faule Sammler</th><td>"+Math.round(spear_a)+"</td><td>"+Math.round(sword_a)+"</td><td>"+Math.round(axe_a)+"</td><td>"+Math.round(archer_a)+"</td><td>"+Math.round(lkav_a)+"</td><td>"+Math.round(marcher_a)+"</td><td>"+Math.round(skav_a)+"</td></tr>");
		    tabelle.append("<tr><th>Bescheidene Sammler</th><td>"+Math.round(spear_b)+"</td><td>"+Math.round(sword_b)+"</td><td>"+Math.round(axe_b)+"</td><td>"+Math.round(archer_b)+"</td><td>"+Math.round(lkav_b)+"</td><td>"+Math.round(marcher_b)+"</td><td>"+Math.round(skav_b)+"</td></tr>");
		    if(unlocked_3) tabelle.append("<tr><th>Kluge Sammler</th><td>"+Math.round(spear_c)+"</td><td>"+Math.round(sword_c)+"</td><td>"+Math.round(axe_c)+"</td><td>"+Math.round(archer_c)+"</td><td>"+Math.round(lkav_c)+"</td><td>"+Math.round(marcher_c)+"</td><td>"+Math.round(skav_c)+"</td></tr>");
		    if(unlocked_4) tabelle.append("<tr><th>Großartige Sammler</th><td>"+Math.round(spear_d)+"</td><td>"+Math.round(sword_d)+"</td><td>"+Math.round(axe_d)+"</td><td>"+Math.round(archer_d)+"</td><td>"+Math.round(lkav_d)+"</td><td>"+Math.round(marcher_d)+"</td><td>"+Math.round(skav_d)+"</td></tr>");
		    tabelle.append("</table>");

		}
	});
})();