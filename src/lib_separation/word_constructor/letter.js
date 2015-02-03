/*
 *	Object Letter
*/
function Letter(c, police, SS_name) {
	var fc = fontConst.SS[SS_name];
	
	this.police = police;		// id de la police de la lettre
	this.c = c;					// Caract?re de la lettre. Exemple : 'A'
	this.x;
	this.y = fontConst.police[police].offsetY[SS_name];

	this.w = fc.letters[c];
	this.h = fc.height;
	
	this.bmp;
	this.SS_name = SS_name;
	
	LetterConstruct(this);
}

function LetterConstruct(l) {
	l.generate();
}

Letter.prototype.generate = function() {
	this.bmp = new createjs.Bitmap(resSS(this.SS_name));
	this.bmp.sourceRect = SS[this.SS_name][this.c];
}

Letter.prototype.getBmp = function() {
	this.bmp.x = this.x;
	this.bmp.y = this.y;
	
	return this.bmp;
}

scriptLoaded('src/lib_separation/word_constructor/letter.js');
