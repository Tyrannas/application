function initSS(SS_name) {
	var fc = fontConst.SS[SS_name];
	var SS = {}; // SpriteSheet

	var x;
	var y = fc.offsetY;

	for(var i = 0; i < fc.matrice.length; i++) {
		x = fc.offsetX;
		var s = fc.matrice[i];
		for(var j = 0; j < s.length; j++) {
			SS[s[j]] =  new createjs.Rectangle(x, y, fc.letters[s[j]], fc.height);
			x += fc.letters[s[j]] + 1;
		}
		y += fontConst.car.height_img + 1;
	}
	return SS;
}

function initAllSS() {
	SS['demihauth'] = initSS('demihauth');
	SS['demihautb'] = initSS('demihautb');
	SS['demibash'] = initSS('demibash');
	SS['demibasb'] = initSS('demibasb');
}

scriptLoaded('src/lib_separation/word_constructor/spritesheets.js');
