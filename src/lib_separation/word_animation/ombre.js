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

	word.font.OMBRE.alpha = opacity2;
	word.font.CYGNE.alpha = 1 - opacity2;
}

Animation.onAbort.erase = function(word) {
	/*word.font.OMBRE.alpha = 1;
	opacity_OMBRE = 1;*/
}

Animation.aide1Erase = function(word, attr) {
	var speed = Word_cst.duration.aide1Erase;
	var offset = 20;
	if(randTrue()) offset = -offset;
	function step1() {
		Tween.get(word.font.OMBRE).to({
			alpha: 0.2,
		}, speed);
		Tween.get(word.font.CYGNE).to({
			alpha: 0.8,
		}, speed);
	}
	function step2() {
		Tween.get(word.font.OMBRE).to({
			alpha: 1,
		}, speed);
		Tween.get(word.font.CYGNE).to({
			alpha: 0,
		}, speed);
	}
	step1();
	word.timeouts.push(setTimeout(step2, speed));
}
Animation.aide2Erase = function(word) {
	margin = word.getWidth()/6;
	speed = 200;
	function step1() {
		gui.Aide_hand({
			'x0': word.getX() + margin,
			'y0': word.getY() + word.getHeight() / 2,
			'x1': word.getX() + word.getWidth() - margin,
			'y1': word.getY() + word.getHeight() / 2,
			'h': word.getHeight(),
			'speed': speed,
		});
	}
	function step2() {
		gui.Aide_hand({
			'x1': word.getX() + margin,
			'y0': word.getY() + word.getHeight() / 2,
			'x0': word.getX() + word.getWidth() - margin,
			'y1': word.getY() + word.getHeight() / 2,
			'h': word.getHeight(),
			'speed': speed,
		});
	}

	if(randTrue()) {
		step1();
		word.timeouts.push(setTimeout(step2, speed*3));
	} else {
		step2();
		word.timeouts.push(setTimeout(step1, speed*3));
	}
}

scriptLoaded('scripts/libs/separation_toolkit/word_animation/ombre.js');