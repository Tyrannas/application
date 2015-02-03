/*
	Animation cut
	@param word : objet Word à animer
	@param x_up : position x de la partie haute à remplacer
	@param x_up_next : position x de la partie haute à afficher
*/
Animation.upCut = function(word, x_up, x_up_next) {
	
	word.font.next_up.regX = x_up_next;
	word.font.next_up.alpha = 1;

	word.tween[0] = Tween.get(word.font.up).to({
			regX: x_up_next,
			alpha: 0,
		}, Word_cst.duration.upCut, Ease.sineOut);		

	word.tween[1] = Tween.get(word.font.next_up).wait(Word_cst.duration.downCut/2).to({
			regX: x_up,
			alpha: 1,
		}, Word_cst.duration.upCut, Ease.sineOut)
		.call(function(){word.animationFinished(true);});
}

Animation.upCutLeft = function(word, dir) {
	var x_up = 0;
	var x_up_next = (word.getWidth() + word.getX()) / word.getScale();
	
	Animation.upCut(word, x_up, x_up_next);
}

Animation.upCutRight = function(word, dir) {
	var x_up = 0;
	var x_up_next = -(W - word.getX()) / word.getScale();
	
	Animation.upCut(word, x_up, x_up_next);
}

Animation.onChange.upCutLeft = function(word, val) {
	word.font.up.regX = word.font.container.width * val * 0.8;
}

Animation.onChange.upCutRight = function(word, val) {
	word.font.up.regX = -word.font.container.width * val * 0.8;
}

Animation.onAbort.upCut = function(word) {
	word.font.up.regX = 0;
}

// Aides visuelles
// Voir coupable_haut.js pour les fonctions aide
Animation.aide1UpCut = function(word) {
	Animation.aide1Cut(word, 'up');
}
Animation.aide2UpCut = function(word) {
	Animation.aide2Cut(word);
}

scriptLoaded('src/lib_separation/word_animation/coupable_bas.js');