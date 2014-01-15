/*
	Namespace Intro
*/
var Intro = {};
var la_separation = null;
var logo = null;

Intro.start = function() {
	// sound_play('ambiant');
	
	Intro.logo();
}

Intro.destroy = function() {
	// Destroy.objet(logo);
	// Destroy.objet(la_separation);
}

Intro.logo = function() {
	// Destroy.all();
	logo = new Logo();
	logo.display();
	// logo.animateIntro();
	
	// Effects.respire('logo', logo.getNode(), 0.2, 1);
	Event.onTap('logo', logo, function() {
		// Effects.stopRespire('logo');
		logo.animateIntro(function(logo) { return function() {
			// Intro.laSeparation();
		}(logo)});
	}, false);
}

Intro.laSeparation = function() {
	/*Destroy.all();
	
	var anim_duration = 2;
	
	la_separation = new Word('Separation', 'Perception', 5);
	la_separation.setZoom(2);
	la_separation.setZoomOnActive(false);
	la_separation.setCenterXY(screenWidth / 2, screenHeight / 2);
	la_separation.getNode().setOpacity(0);
	la_separation.display(mainLayer);
	
	// new Kinetic.Tween({
		// node: la_separation.getNode(),
		// opacity: 1,
		// easing: Kinetic.Easings.EaseIn,
		// duration: anim_duration/2,
		// onFinish: cutLaSeparation,
	// }).play();
	cutLaSeparation();
	
	function cutLaSeparation() {
		la_separation.addGesture();
		Effects.respire('la_separation', la_separation.getNode(), 0.5, 1);
		la_separation.setDone('animate', function() { 
			Effects.stopRespire('la_separation');
		});
		la_separation.setDone('animationFinished', function() {
			setTimeout(function() {
				new Kinetic.Tween({
					node: la_separation.getNodeUp(),
					y: screenHeight / 4,
					opacity: 0,
					easing: Kinetic.Easings.EaseIn,
					duration: anim_duration,
				}).play();
				new Kinetic.Tween({
					node: la_separation.getNodeDown(),
					y: -screenHeight / 4,
					opacity: 0,
					easing: Kinetic.Easings.EaseIn,
					duration: anim_duration,
					onFinish: Menu.start,
				}).play();
			}, 500);
		});
	}
	
	*/
}

scriptLoaded('scripts/introduction/introduction.js');
