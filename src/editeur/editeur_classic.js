Editeur.classic_init = function() {
	this.title_x = W/2;
	this.title_y = H/3;
	this.title_zoom = 1;
	this.word_x = W/2;
	this.word_y = 2*H/3;
	this.word_zoom = 2;
	this.title = new Word('Titre');
	this.classic_word = new Word('Changez moi');
	Editeur.classic_display();
}

Editeur.classic_recherche_result = function(word) {
	Editeur.classic_word = word;
	Editeur.classic_display();
}


Editeur.classic_display = function() {
	Destroy.all();
	this.title.setZoom(this.title_zoom);
	this.title.setCenterXY(this.title_x, this.title_y);
	this.title.display();
	var x = this.title_x, y = this.title_y, z = this.title_zoom;
	Event.onTap('Editeur.title', this.title, function() {
		Editeur.textInputTitle(x, y, z);
	}, true);

	this.classic_word.setZoom(this.word_zoom);
	this.classic_word.setCenterXY(this.word_x, this.word_y);
	this.classic_word.display();
	Event.onTap('Editeur.classic_word', this.classic_word, function() {
		Editeur.classic_changeWord(this.word_x, this.word_y, this.word_zoom);
	}, true);
}

Editeur.classic_changeWord = function(x, y, z) {
	this.recherche = new RechercheEditeur(this.classic_recherche_result);
	Destroy.all();
	console.log("Mots connus : "+MyStorage.listWords());
	var known_words = MyStorage.listWords().map(function(x) {return JsonHandler.wordFromJson(JSON.parse(MyStorage.getWord(x)));});
	this.recherche.setPossibilities(known_words);
	this.recherche.generate(0);
	gui.Editeur_classic_displayRecherche();
	this.recherche.display();
}

scriptLoaded('src/editeur/editeur_classic.js');
