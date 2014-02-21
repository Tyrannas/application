/*
	Animation cut
	@param word : objet Word à animer
	@param x_central : position x de la partie basse à remplacer
	@param x_central_next : position x de la partie basse à afficher
*/
var coc = 0.1; // coeff ouverture centrale
Animation.open = function(word, dir) {
	if(dir == -1) {
		word.is_open_up = true;
		word.is_open_up_first = true;
		word.font.up.regY = word.font.container.height * coc;
	}
	if(dir == 1) {
		word.is_open_down = true;
		word.is_open_up_first = false;
		word.font.down.regY = -word.font.container.height * coc;
	}
	
	if(word.is_open_down && word.is_open_up) {
		if(word.is_open_up_first) {
			var x_central = 0;
			var x_central_next = -(W - word.getX()) / word.getScale();
		} else {
			var x_central = 0;
			var x_central_next = (word.getWidth() + word.getX()) / word.getScale();
		}
		
		word.font.next_central.regX = x_central_next;
		
		word.tween[0] = Tween.get(word.font.central).to({
			regX: x_central_next,
			alpha: 0,
		}, Word_cst.duration.open, Ease.sineIn);
		
		word.tween[1] = Tween.get(word.font.next_central).wait(Word_cst.duration.open/2).to({
			regX: x_central,
			alpha: 1,
		}, Word_cst.duration.open, Ease.sineOut)
		.call(function(){word.animationFinished(true);});
		
		word.tween[2] = Tween.get(word.font.up).wait(Word_cst.duration.open/2).to({
			regY: 0,
			alpha: 1,
		}, Word_cst.duration.open, Ease.sineIn);
		
		word.tween[3] = Tween.get(word.font.down).wait(Word_cst.duration.open/2).to({
			regY: 0,
			alpha: 1,
		}, Word_cst.duration.open, Ease.sineIn);
	} else {
		word.animationFinished(false);
	}
}

Animation.onChange.openUp = function(word, val) {
	if(!word.is_open_up) {
		word.font.up.regY = word.font.container.height * val * coc;
	}
}

Animation.onChange.openDown = function(word, val) {
	if(!word.is_open_down) {
		word.font.down.regY = -word.font.container.height * val * coc;
	}
}

Animation.onAbort.open = function(word) {
	word.font.up.regY = 0;
	word.font.down.regY = 0;
}

scriptLoaded('src/lib_separation/word_animation/centrale.js');
