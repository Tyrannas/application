/**
	Classe Line
*/
function Line() {
	this.words = new Array(); // Tableau des mots
	this.nb = 0; // Nombre de mots
	this.center = true; // Booléen pour savoir d'ou on va generer la ligne
	this.x = 0;
	this.y = 0; // Distance y à laquelle la ligne sera affichée
}


/*
 * Ajoute une ligne à partir d'un objet JSON parsé
 */
Line.prototype.fromJson = function(json) {
	//Ajout des mots à la ligne
	for (var i=0; i < json.words.length; i++) {
		var json_word = json.words[i];
		var word = new Word(json_word.value, json_word.next_value, json_word.police, json_word.code);
		if (json_word.zoom == undefined) {
			json_word.zoom = 1;
		}
		word.setZoom(json_word.zoom);
		this.add(word);
	}
}

/*
 * Retourne le Json d'une ligne
 */
Line.prototype.getJson = function() {
	var line = new Object();
	line.words = new Array();
	for (var i=0; i<this.nb; i++) {
		line.words[i] = new Object();
		line.words[i].value = this.words[i].value;
		line.words[i].police = this.words[i].police;
		line.words[i].new_value = this.words[i].new_value;
		line.words[i].code = this.words[i].code;
		line.words[i].zoom = this.words[i].getZoom();
	}
	return line;
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
 * Permet de savoir si on genere par rapport au bord haut-gauche ou center
 */
Line.prototype.setCenter = function(bool) {
	this.center = bool;
}

/*
	Génère la ligne en générant tous les mots et en centrant la ligne si demandé
*/
Line.prototype.generate = function(x_offset, y_offset) {
	if (x_offset == undefined)
		x_offset = 0;
	if (y_offset == undefined)
		y_offset = 0;
	this.x = this.center ? -this.getWidth() / 2 : 0;
	this.y = this.center ? -this.getHeight() / 2 : 0;
	this.x += x_offset;
	this.y += y_offset;

	var x = this.x;
	for(var i = 0; i < this.nb; i++) {
		this.words[i].setX(x);
		this.words[i].setY(this.y);
		this.words[i].activeOnTap();
		x += this.words[i].getWidth();
	}
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

scriptLoaded('src/recit/line.js');
