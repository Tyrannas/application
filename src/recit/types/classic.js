/** 
 *	Classe RecitType classique
 */

function RecitType_classic(json_def) {
	this.nb_sentences = 0;
	this.sentences = new Array();
	this.title_zoom = 1;
	this.sentence_zoom = 2;
	var title = new Sentence();
	title.add(new Word('Demi tour', undefined, 0, undefined));
	this.setTitle(title);
	sentence = new Sentence();
	sentence.add(new Word('marche', 'arriere', 1, 'IIIIIIILIIL'));
	this.addSentence(sentence);
	//this.defineJsonStory(json_def);
	this.generate(50);
	console.log(this.getJSON());
}

//Definit un recit à parti de sa définition JSON
RecitType_classic.prototype.defineJsonStory = function(json_def) {
	json_def = JSON.parse(json_def);
	this.title = new Sentence();
	for (var i=0; i<json_def.title.length; i++) {
		var title_word = new Word(json_def.title[i].word, undefined, json_def.title[i].police, undefined);
		title_word.setZoom(this.title_zoom);
		this.title.add(title_word);
	}
	this.type = json_def.type;


	//Pour chaque ligne
	for (var i=0; i<json_def.sentences.length; i++){
		this.nb_sentences++;
		this.sentences[i] = new Sentence();
		var json_sentence = json_def.sentences[i];

		//Pour chaque mot
		for (var j=0; j<json_sentence.length; j++){
			var json_word = json_sentence[j];
			var word = new Word(json_word.word, json_word.next_value, json_word.police, json_word.code);
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
		this.sentences[i].generate((i+1) * (H)/(this.nb_sentences+1) - Recit.cst.line.height/2);
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
	this.sentences[this.nb_sentences] = new Sentence();
	for (var i=0; i< new_sentence.lines.length; i++) {
		for (var j=0; j< new_sentence.lines[i].words.length; j++) {
			//On est obligé de crée une nouvelle sentense et d'add les mots pour que width soit recalculé avec le zoom voulu
			var word = new_sentence.lines[i].words[j];
			word.setZoom(this.sentence_zoom);
			this.sentences[this.nb_sentences].add(word);
		}
		this.nb_sentences++;
	}
}

//Definit un titre
RecitType_classic.prototype.setTitle = function(new_title) { 
	this.title = new Sentence();
	for (var i=0; i< new_title.lines.length; i++) {
		for (var j=0; j< new_title.lines[i].words.length; j++) {
			//On est obligé de crée une nouvelle sentense et d'add les mots pour que width soit recalculé avec le zoom voulu
			var word = new_title.lines[i].words[j];
			word.setZoom(this.title_zoom);
			this.title.add(word);
		}
	}
}

RecitType_classic.prototype.getJSON = function() {
	var recit = new Object();
	recit.title = new Array();
	recit.sentences = new Array();
	var k = 0;
	for (var i=0; i< this.title.lines.length; i++) {
		for (var j=0; j< this.title.lines[i].words.length; j++) {
			if (this.title.lines[i].words[j].value != ' ') {
				recit.title[k] = new Object();
				recit.title[k].word = this.title.lines[i].words[j].value;
				recit.title[k].police = this.title.lines[i].words[j].police;
				k++;
			}
		}
	}
	var l =0;
	for (var i=0; i< this.sentences.length; i++) {
		for (var j=0; j< this.sentences[i].lines.length; j++) {
			for (var k=0; k< this.sentences[i].lines[j].words.length; k++) {
				recit.sentences[l] = new Object();
				if (this.sentences[i].lines[j].words[k].value != ' ') {
					recit.sentences[l].word = this.sentences[i].lines[j].words[k].value;
					recit.sentences[l].next_value = this.sentences[i].lines[j].words[k].next_value;
					recit.sentences[l].police = this.sentences[i].lines[j].words[k].police;
					recit.sentences[l].code = this.sentences[i].lines[j].words[k].code;
					l++;
				}
			}
		}
	}
	return JSON.stringify(recit);
}
