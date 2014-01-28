/*
	Animation mbre statique
*/
var opacity_OMBRE = 1;
var step = 0.1;

Animation.ombre = function(word, dir) {
	opacity_OMBRE -= step;
	if(opacity_OMBRE <= 0) {
		opacity_OMBRE = 0;
		word.animationFinished(true);
	} else {
		word.animationFinished(false);
	}
}

Animation.onChange.ombre = function(word, val) {
	var opacity2 = opacity_OMBRE - step * val;
	if(opacity2 < 0) opacity2 = 0;

	OMBRE.setOpacity(opacity2);
	mainLayer.draw();
}

Animation.onAbort.erase = function(word) {
	OMBRE.setOpacity(1);
	opacity_OMBRE = 1;
}

scriptLoaded('scripts/libs/separation_toolkit/word_animation/ombre.js');
