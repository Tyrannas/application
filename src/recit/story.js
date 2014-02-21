/**
	Class Story
*/
function Story() {
	this.sentences = new Array(); // Tableau des phrases du récit
	this.nb_sentences = 0; // Nombre de phrases
	//StoryConstruct(this);
}
/*
function StoryConstruct(story) {
	
}
*/
/*
	Ajoute une phrase (objet Sentence) à la phrase
*/
Story.prototype.add = function(sentence) {
	this.sentences[this.nb_sentences] = sentence;
	this.nb_sentences++;
}

/*
	Génère le récit en générant toutes les lignes
*/
Story.prototype.generate = function(offsetY) {
	var nb_lines = 0;
	for(var i = 0; i < this.nb_sentences; i++) {
		this.sentences[i].generate(offsetY + nb_lines * Recit.cst.line.height);
		nb_lines += this.sentences[i].getNbLines();
	}
}

/*
	Affiche la phrase en affichant toutes les lignes
*/
Story.prototype.display = function() {
	for(var i = 0; i < this.nb_sentences; i++) {
		this.sentences[i].display();
	}
}

Story.prototype.destroy = function() {
	Destroy.arrayObjet(this.sentences);
}

scriptLoaded('src/recit/story.js');
