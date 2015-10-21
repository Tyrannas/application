/*
	Namespace Intro
*/
var Intro = Intro || {};
(function () {
	"use strict";
	var la_separation = null;
	var logo = null;

	Intro.start = function() {
		Intro.logo();
	};

	Intro.destroy = function() {
		Destroy.objet(logo);
		Destroy.objet(la_separation);
	};

	Intro.logo = function() {
		Destroy.all();
		logo = new Logo();
		logo.display();
		gui.menuButton();
		
		Effects.respire('logo', logo.getNode(), 0.2, 1);
		//Event.onTap('logo', logo, function() {
		setTimeout(function(){
			Effects.stopRespire('logo');
			logo.animateIntro(function(logo) {
				Intro.laSeparation();
			});}
		,1000);
		//}, false);
	};

	Intro.laSeparation = function() {
		Destroy.all();
		
		var anim_duration = 1750;
		var zoom = 2;
		la_separation = new Word('Separation', 'Perception', 5, null, false);
		la_separation.setZoom(zoom);
		la_separation.setCenterXY(W / 2, H / 2);
		la_separation.display();
		la_separation.getNode().alpha = 0;
		
		Tween.get(la_separation.getNode())
			.to({alpha:1}, anim_duration, Ease.sineIn);

		setTimeout(cutLaSeparation, anim_duration);
		
		function cutLaSeparation() {
			Tween.get(la_separation.getNodeUp())
				.to({
						y: H / (2 * fontConst.car.scale * zoom),
						alpha: 0,
					}, anim_duration, Ease.sineIn);
			
			Tween.get(la_separation.getNodeDown())
				.to({
						y: -H / (2 * fontConst.car.scale * zoom),
						alpha: 0,
					}, anim_duration, Ease.sineIn)
				.call(Menu.start);
		}
	};
})();

scriptLoaded('scripts/introduction/introduction.js');
