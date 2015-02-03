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

// Aides visuelles
Animation.aide1Open = function(word) {
	var speed = Word_cst.duration.aide1Open;
	var offset = 20;
	if(randTrue()) {
		var node1 = word.font.up;
		var node2 = word.font.down;
	}
	else {
		var node1 = word.font.down;
		var node2 = word.font.up;
		offset = -offset;
	}
	function step1() {
		Tween.get(node1).to({
			regY: offset,
		}, speed);
	}
	function step2() {
		Tween.get(node2).to({
			regY: -offset,
		}, speed);
	}
	function step3() {
		Tween.get(node1).to({
			regY: 0,
		}, speed);
	}
	function step4() {
		Tween.get(node2).to({
			regY: 0,
		}, speed);
	}
	step1();
	word.timeouts.push(setTimeout(step2, speed));
	word.timeouts.push(setTimeout(step3, speed*2));
	word.timeouts.push(setTimeout(step4, speed*3));
}
Animation.aide2Open = function(word) {
	margin = word.getWidth()/6;
	speed = 200;
	function step1() {
		gui.Aide_hand({
			'x0': word.getX() + word.getWidth() / 2,
			'y0': word.getY(),
			'x1': word.getX() + word.getWidth() / 2,
			'y1': word.getY() + word.getHeight(),
			'h': word.getHeight(),
			'speed': speed,
		});
	}
	function step2() {
		gui.Aide_hand({
			'x0': word.getX() + word.getWidth() / 2,
			'y1': word.getY(),
			'x1': word.getX() + word.getWidth() / 2,
			'y0': word.getY() + word.getHeight(),
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

scriptLoaded('src/lib_separation/word_animation/centrale.js');
