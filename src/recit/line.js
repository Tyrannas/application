/**
	Classe Line
*/
function Line() {
	this.words = new Array(); // Tableau des mots
	this.nb = 0; // Nombre de mots
	this.setX(0);
	this.setY(0);
}

/*
 *	Retourne la largeur de la ligne
 */

Line.prototype.getWidth = function() {
	var width = 0;
	for (var i=0; i < this.nb; i++) {
		width += this.words[i].getWidth();
	}
	return width;
}

/*
 *	Retourne la hauteur de la ligne
 */

Line.prototype.getHeight = function() {
	return this.words[0].getHeight();
}
/*
	Ajoute un mot sur la ligne.
	@param (word) : Objet Word
	@return (true/false) : Si la largeur du mot est trop grande, on retourne false, sinon true.
*/
Line.prototype.add = function(word) {
	if(word.value != ' ' && this.nb > 0)
		this.addSpace();
	if(this.getWidth() + word.getWidth() < W) {
		this.nb++;
		this.words.push(word);
		return true;
	}
	else
	{
		return false;
	}
}

/*
	Ajoute un espace à la ligne
*/
Line.prototype.addSpace = function() {
	this.add(new Word(' '));
}

/*
	Ajoute une tabulation à la ligne
*/
Line.prototype.addTab = function(police) {
	this.add(new Word('    '));
}

/*
	Génère la ligne en générant tous les mots et en centrant la ligne si demandé
*/
Line.prototype.generate = function() {
	for(var i = 0; i < this.nb; i++) {
		this.words[i].generate();
	}
}

Line.prototype.setX = function(x) {
	this.x = x;
	for(var i = 0; i < this.nb; i++) {
		this.words[i].setX(x);
		x += this.words[i].getWidth();
	}
}

Line.prototype.setY = function(y) {
	this.y = y;
	for(var i = 0; i < this.nb; i++) {
		this.words[i].setY(this.y);
	}
}

Line.prototype.setCenterX = function(x) {
	x -= this.getWidth()/2;
	this.setX(x);
}

Line.prototype.setCenterY = function(y) {
	y -= this.getHeight()/2;
	this.setY(y)
}

/*
	Affiche la ligne en affichant tous les mots
*/
Line.prototype.display = function() {
	for(var i = 0; i < this.nb; i++) {
		this.words[i].display();
	}
}

Line.prototype.destroy = function() {
	Destroy.arrayObjet(this.words);
	this.nb = 0;
}

Line.prototype.getX = function() { return this.x; }
Line.prototype.getY = function() { return this.y; }
Line.prototype.getCenterX = function() { return this.getX() + this.getWidth() / 2; }
Line.prototype.getCenterY = function() { return this.getY() + this.getHeight() / 2; }

scriptLoaded('src/recit/line.js');
