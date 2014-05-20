/*
	Namespace Intro
*/
var Intro = {};
var la_separation = null;
var logo = null;

Intro.start = function() {
	Intro.logo();
}

Intro.destroy = function() {
	Destroy.objet(logo);
	Destroy.objet(la_separation);
}

Intro.logo = function() {
	Destroy.all();
	logo = new Logo();
	logo.display();
	gui.menuButton();
	// initConstantes();
	
	Effects.respire('logo', logo.getNode(), 0.2, 1);
	Event.onTap('logo', logo, function() {
		Effects.stopRespire('logo');
		logo.animateIntro(function(logo) { return function() {
			Intro.laSeparation();
		}(logo)});
	}, false);
}

Intro.laSeparation = function() {
	Destroy.all();
	
	var anim_duration = 2000;
	var zoom = 2;
	la_separation = new Word('Separation', 'Perception', 5);
	la_separation.setZoom(zoom);
	la_separation.setCenterXY(W / 2, H / 2);
	la_separation.getNode().alpha = 0;
	la_separation.display();
	la_separation.addGesture();
	
	Tween.get(la_separation.getNode())
		.to({alpha:1}, anim_duration, Ease.sineIn);

	cutLaSeparation();
	
	function cutLaSeparation() {
		Effects.respire('la_separation', la_separation.getNode(), 0.5, 1);
		la_separation.setDone('animate', function() {
			Effects.stopRespire('la_separation');
		});
		la_separation.setDone('animationFinished', function() {
			la_separation.removeGesture();
			setTimeout(function() {
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
			}, 500);
		});
	}
}

scriptLoaded('scripts/introduction/introduction.js');
