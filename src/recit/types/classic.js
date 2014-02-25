/** 
 *	Classe RecitType classique
 */

function RecitType_classic(json_def) {
	this.nb_sentences = 0;
	this.sentences = new Array();
	this.police_titre = 'coupable_haut';
	this.defineStory(json_def);
	this.generate(50);
}

//Fonction de test
RecitType_classic.prototype.tell = function() {
	alert(this.sentences[1])
}

//Definit un recit à parti de sa définition JSON
RecitType_classic.prototype.defineStory = function(json_def) {
	json_def = JSON.parse(json_def).story;
	this.name = new Sentence();
	this.name.add(new Word(json_def.name, undefined, Word_getNormalizedPolice(this.police_titre), undefined));
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
			this.sentences[i].add(word);
		}
	}
}

//Generation des phrases et du titre
RecitType_classic.prototype.generate = function(offsetY) {
	this.name.generate(offsetY);
	var num_line = 0;
	for (var i=0; i<this.nb_sentences; i++) {
		//On place la phrase
		this.sentences[i].generate(offsetY + (i+1) * (H-offsetY)/(this.nb_sentences+1));
	}
}

//Affichage du titre et des sentences
RecitType_classic.prototype.display = function() {
	this.name.display();
	for (var i=0; i<this.nb_sentences; i++){
		this.sentences[i].display();
	}
}
