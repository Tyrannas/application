/*
	Animation cut
	@param word : objet Word à animer
	@param x_central : position x de la partie basse à remplacer
	@param x_central_next : position x de la partie basse à afficher
*/

Animation.open = function(word, dir) {/*
	if(dir == -1) {
		word.is_open_up = true;
		word.font.up.setOffsetY(word.font.up.getHeight() * 0.5);
	}
	if(dir == 1) {
		word.is_open_down = true;
		word.font.down.setOffsetY(-word.font.down.getHeight() * 0.5);
	}
	mainLayer.draw();
	
	if(word.is_open_down && word.is_open_up) {
		if(1) {
			var x_central = word.font.down.getX() / word.getScale();
			var x_central_next = (screenWidth - word.getX()) / word.getScale();
		} else {
		
		}
		
		word.font.central.setX(x_central);
		word.font.next_central.setX(x_central_next);
		
		word.tween[0] = new Kinetic.Tween({
			node: word.font.central,
			x: x_central_next,
			duration: Word_cst.duration.downCut,
			easing: Kinetic.Easings.EaseIn,
			onFinish: function(){word.tween[1].play();word.tween[2].play();word.tween[3].play();},
			opacity: 0,
		});
		
		word.tween[1] = new Kinetic.Tween({
			node: word.font.next_central,
			x: x_central,
			duration: Word_cst.duration.downCut,
			easing: Kinetic.Easings.EaseOut,
			onFinish: function(){word.animationFinished(true);},
			opacity: 1,
		});
		
		word.tween[2] = new Kinetic.Tween({
			node: word.font.up,
			offsetY: 0,
			duration: Word_cst.duration.downCut,
			easing: Kinetic.Easings.EaseIn,
		});
		
		word.tween[3] = new Kinetic.Tween({
			node: word.font.down,
			offsetY: 0,
			duration: Word_cst.duration.downCut,
			easing: Kinetic.Easings.EaseIn,
		});
		
		sound_play('tear');
		word.tween[0].play();
	} else {
		word.animationFinished(false);
}*/
}

Animation.onChange.openUp = function(word, val) {
	word.font.up.regY = word.font.up.getHeight() * val * 0.5;
}

Animation.onChange.openDown = function(word, val) {
	word.font.down.regY = -word.font.down.getHeight() * val * 0.5;
}

Animation.onAbort.open = function(word) {
	word.font.up.regY = 0;
	word.font.down.regY = 0;
}

scriptLoaded('src/lib_separation/word_animation/centrale.js');
