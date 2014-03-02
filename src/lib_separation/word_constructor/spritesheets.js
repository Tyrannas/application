function initSS(SS_name) {
	//// CUSTOM BITMAP TEXT
	// var fc = fontConst.SS[SS_name];
	// var SS = {}; // SpriteSheet

	// var x;
	// var y = fc.offsetY;

	// for(var i = 0; i < fc.matrice.length; i++) {
	// 	x = fc.offsetX;
	// 	var s = fc.matrice[i];
	// 	for(var j = 0; j < s.length; j++) {
	// 		SS[s[j]] =  new createjs.Rectangle(x, y, fc.letters[s[j]], fc.height);
	// 		x += fc.letters[s[j]] + 1;
	// 	}
	// 	y += fontConst.car.height_img + 1;
	// }
	// return SS;

	//// EASELJS BITMAP TEXT
	var fc = fontConst.SS[SS_name];
	var SS = {"animations":{}, "images":[resSS(SS_name)], "frames":[]}; // SpriteSheet

	var x;
	var y = fc.offsetY;
	var k = 0;

	for(var i = 0; i < fc.matrice.length; i++) {
		x = fc.offsetX;
		var s = fc.matrice[i];
		for(var j = 0; j < s.length; j++) {
			SS.animations[s[j]] = {"frames":[k]};
			SS.frames[k] = [x, y, fc.letters[s[j]], fc.height, 0, 0, 0];

			x += fc.letters[s[j]] + 1;
			k++;
		}
		y += fontConst.car.height_img + 1;
	}
	
	return new createjs.SpriteSheet(SS);
}

function initAllSS() {
	SS['demihauth'] = initSS('demihauth');
	SS['demihautb'] = initSS('demihautb');
	SS['demibash'] = initSS('demibash');
	SS['demibasb'] = initSS('demibasb');
	SS['centraleh'] = initSS('centraleh');
	SS['centralec'] = initSS('centralec');
	SS['centraleb'] = initSS('centraleb');
}

scriptLoaded('src/lib_separation/word_constructor/spritesheets.js');
