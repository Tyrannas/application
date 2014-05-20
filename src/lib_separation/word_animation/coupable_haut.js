/*
	Animation cut
	@param word : objet Word à animer
	@param x_down : position x de la partie basse à remplacer
	@param x_next_down : position x de la partie basse à afficher
*/
Animation.downCut = function(word, x_down, x_next_down) {
	
	word.font.next_down.regX = x_next_down;
	// word.font.next_down.alpha = 1;
	
	word.tween[0] = Tween.get(word.font.down).to({
			regX: x_next_down,
			alpha: 0,
		}, Word_cst.duration.downCut, Ease.sineOut);

	word.tween[1] = Tween.get(word.font.next_down).wait(Word_cst.duration.downCut/2).to({
			regX: x_down,
			alpha: 1,
		}, Word_cst.duration.downCut, Ease.sineOut)
		.call(function(){word.animationFinished(true);});
}

Animation.downCutLeft = function(word, dir) {
	var x_down = 0;
	var x_next_down = (word.getWidth() + word.getX()) / word.getScale();
	
	Animation.downCut(word, x_down, x_next_down);
}

Animation.downCutRight = function(word, dir) {
	var x_down = 0;
	var x_next_down = -(W - word.getX()) / word.getScale();
	
	Animation.downCut(word, x_down, x_next_down);
}

Animation.onChange.downCutLeft = function(word, val) {
	word.font.down.regX = word.font.container.width * val * 0.8;
}

Animation.onChange.downCutRight = function(word, val) {
	word.font.down.regX = -word.font.container.width * val * 0.8;
}

Animation.onAbort.downCut = function(word) {
	word.font.down.regX = 0;
}

// Aides visuelles
Animation.aide1DownCut = function(word) {
	Animation.aide1Cut(word, 'down');
}
Animation.aide2DownCut = function(word) {
	Animation.aide2Cut(word);
}

Animation.aide1Cut = function(word, attr) {
	var speed = Word_cst.duration.aide1Cut;
	var offset = 20;
	if(randTrue()) offset = -offset;
	function step1() {
		Tween.get(word.font[attr]).to({
			regX: -offset,
		}, speed);//, Ease.sineOut);
	}
	function step2() {
		Tween.get(word.font[attr]).to({
			regX: offset,
		}, speed*2);//, Ease.sineOut)
	}
	function step3() {
		Tween.get(word.font[attr]).to({
			regX: 0,
		}, speed);//, Ease.sineOut)
	}
	step1();
	word.timeouts.push(setTimeout(step2, speed));
	word.timeouts.push(setTimeout(step3, speed*3));
}
Animation.aide2Cut = function(word) {
	log(word.getValue()+" : aide 2 (coupable)");
}

scriptLoaded('src/lib_separation/word_animation/coupable_haut.js');
