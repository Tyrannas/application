/**
	Class Sentence
*/
function Sentence() {
	this.lines = new Array(); // Tableau des lignes de la phrase
	this.actLine = -1; // Ligne actuelle (nombre de lignes - 1)
	SentenceConstruct(this);
}

function SentenceConstruct(sentence) {
	sentence.newLine(); // On initialise la première ligne
}

Sentence.prototype.getNbLines = function() {
	return this.actLine + 1;
}

/*
	Ajoute un mot (objet Word) à la phrase
*/
Sentence.prototype.add = function(word) {
	var width = word.getWidth();
	
	// Si il y a une erreur lors de l'ajout du mot
	// On doit entamer une nouvelle ligne
	if(!this.lines[this.actLine].add(word))
	{
		this.newLine();
		this.lines[this.actLine].add(word);
	}
}

/*
	Ajoute un espace
*/
Sentence.prototype.addSpace = function() {
	this.add(new Word(' '));
}

/*
	Ajoute une tabulation
*/
Sentence.prototype.addTab = function() {
	this.add(new Word('    '));
}

/*
	Va à la ligne suivante
*/
Sentence.prototype.newLine = function() {
	this.actLine++;
	this.lines[this.actLine] = new Line();
}

/*
	Génère la phrase en générant toutes les lignes
*/
Sentence.prototype.generate = function(offsetY) {
	for(var i = 0; i <= this.actLine; i++) {
		this.lines[i].generate(offsetY + i * Recit.cst.line.height);
	}
}

/*
	Affiche la phrase en affichant toutes les lignes
*/
Sentence.prototype.display = function() {
	for(var i = 0; i <= this.actLine; i++) {
		this.lines[i].display();
	}
}

Sentence.prototype.destroy = function() {
	Destroy.arrayObjet(this.lines);
}

scriptLoaded('src/recit/sentence.js');
