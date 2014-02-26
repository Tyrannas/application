/** 
 *	Classe RecitType classique
 */

function RecitType_classic(json_def) {
	this.nb_sentences = 0;
	this.sentences = new Array();
	this.title_zoom = 1;
	this.sentence_zoom = 2;
	this.defineJsonStory(json_def);
	this.generate(50);
}

//Definit un recit à parti de sa définition JSON
RecitType_classic.prototype.defineJsonStory = function(json_def) {
	json_def = JSON.parse(json_def).story;
	this.title = new Sentence();
	var title_word = new Word(json_def.title.word, undefined, Word_getNormalizedPolice(json_def.title.police), undefined);
	title_word.setZoom(this.title_zoom);
	this.title.add(title_word);
	this.type = json_def.type;


	//Pour chaque ligne
	for (var i=0; i<json_def.sentences.length; i++){
		this.nb_sentences++;
		this.sentences[i] = new Sentence();
		var json_sentence = json_def.sentences[i];

		//Pour chaque mot
		for (var j=0; j<json_sentence.length; j++){
			var json_word = json_sentence[j];
			var word = new Word(json_word.word, json_word.next_value, Word_getNormalizedPolice(json_word.police), json_word.code);
			word.setZoom(this.sentence_zoom);
			this.sentences[i].add(word);
		}
	}
}

//Generation des phrases et du titre
RecitType_classic.prototype.generate = function(offsetY) {
	this.title.generate(offsetY);
	var num_line = 0;
	for (var i=0; i<this.nb_sentences; i++) {
		//On place la phrase
		this.sentences[i].generate(offsetY + (i+1) * (H-offsetY)/(this.nb_sentences+1));
	}
}

//Affichage du titre et des sentences
RecitType_classic.prototype.display = function() {
	this.title.display();
	for (var i=0; i<this.nb_sentences; i++){
		this.sentences[i].display();
	}
}

//Ajoute une sentence
RecitType_classic.prototype.addSentence = function(new_sentence) {
	this.sentences[nb_sentences] = new Sentence();
	for (var i=0; i< new_sentence.lines.length; i++) {
		for (var j=0; j< new_sentence.lines[i].words.length; j++) {
			//On est obligé de crée une nouvelle sentense et d'add les mots pour que width soit recalculé avec le zoom voulu
			this.sentences[nb_sentences].add(new_sentence.lines[i].words[j].setZoom(this.sentence_zoom));
		}
		this.nb_sentences++;
	}
}

RecitType_classic.prototype.setTitle = function(new_title) { this.title_sentence = new_title; }
