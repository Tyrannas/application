/*
	Animation cut
	@param word : objet Word à animer
	@param x_up : position x de la partie haute à remplacer
	@param x_up_next : position x de la partie haute à afficher
*/
Animation.upCut = function(word, x_up, x_up_next) {
	
	word.font.up.setX(x_up);
	word.font.next_up.setX(x_up_next);
	//word.font.next_up.setOpacity(1);

	word.tween[0] = Tween.get(word.font.up).to({
			x: x_up_next,
			opacity: 0,
		}, Word_cst.duration.upCut)
		.call(function(){word.tween[1].play();});		

	word.tween[1] = Tween.get(word.font.next_up, {paused:true}).to({
			x: x_up,
			opacity: 1,
		}, Word_cst.duration.next_up, Ease.sineOut)
		.call(function(){word.animationFinished(true);});
}

Animation.upCutLeft = function(word, dir) {
	var x_up = word.font.down.x / word.getScale();
	var x_up_next = -(word.getWidth() + word.getX()) / word.getScale();
	
	Animation.upCut(word, x_up, x_up_next);
}

Animation.upCutRight = function(word, dir) {
	var x_up = word.font.down.x / word.getScale();
	var x_up_next = (screenWidth - word.getX()) / word.getScale();
	
	Animation.upCut(word, x_up, x_up_next);
}

Animation.onChange.upCutLeft = function(word, val) {
	word.font.up.regX = word.font.up.getWidth() * val * 0.8;
}

Animation.onChange.upCutRight = function(word, val) {
	word.font.up.regX = -word.font.up.getWidth() * val * 0.8;
}

Animation.onAbort.upCut = function(word) {
	word.font.up.regX = 0;
}

scriptLoaded('src/lib_separation/word_animation/coupable_bas.js');