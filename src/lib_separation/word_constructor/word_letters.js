/*
 *	Object Letter
*/
function WordLetters(value, police, SS) {
	this.value = value;				// Texte contenu dans le mot
	this.letters = [];				// Tableau d'objet Letter
	this.container;					// Contient les bmp des objets Letter
	this.police = police;			// Id de la police à utiliser
	this.SS = SS;					// SpriteSheet
	
	WordLettersConstruct(this);
}

function WordLettersConstruct(wl) {
	wl.generate();
}

WordLetters.prototype.generate = function() {
	var x = 0;
	this.container = new createjs.Container();
	
	for(var i = 0; i < this.value.length; i++) {
		this.letters[i] = new Letter(this.value[i], this.police, this.SS);
		this.letters[i].x = x;
		x += this.letters[i].w;
		
		this.container.addChild(this.letters[i].getBmp());
	}
}

WordLetters.prototype.destroy = function() {
	for(var i = 0; i < this.letters.length; i++) {
		this.container.removeChild(this.letters[i].getBmp());
	}
}

WordLetters.prototype.getBmp = function() {
	return this.container;
}

scriptLoaded('src/lib_separation/word_constructor/word_letters.js');
