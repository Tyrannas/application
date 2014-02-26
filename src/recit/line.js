/**
	Classe Line
*/
function Line() {
	this.words = new Array(); // Tableau des mots
	this.nb = 0; // Nombre de mots
	this.center = true; // Booléen pour savoir si la ligne doit être centrée ou non
	this.width = 0; // Largeur totale des mots
	this.y = 0; // Distance y à laquelle la ligne sera affichée
	
	LineConstruct();
}

/*
	Constructeur
*/
function LineConstruct() {
	
}

/*
	Ajoute un mot sur la ligne.
	@param (word) : Objet Word
	@return (true/false) : Si la largeur du mot est trop grande, on retourne false, sinon true.
*/
Line.prototype.add = function(word) {
	if(word.value != ' ' && this.nb > 0)
		this.addSpace();
	if(this.width + word.getWidth() < W) {
		this.width += word.getWidth();
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
Line.prototype.generate = function(y) {
	var x = this.center ? (W - this.width) / 2 : 0;
	this.y = y;

	for(var i = 0; i < this.nb; i++) {
		this.words[i].setX(x);
		this.words[i].setY(y);
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
}

scriptLoaded('src/recit/line.js');
