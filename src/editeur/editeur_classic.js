Editeur.classic_display = function() {
	var title_x = W/2;
	var title_y = H/3;
	var title_zoom = 1;
	var word_x = W/2;
	var word_y = 2*H/3;
	var word_zoom = 2;
	this.title = new Word('Titre');
	this.title.setZoom(title_zoom);
	this.title.setCenterXY(title_x, title_y);
	this.title.display();
	Event.onTap('Editeur.title', this.title, function() {
		Editeur.textInputTitle(title_x, title_y, title_zoom);
	}, true);

	this.classic_word = new Word('Changez moi');
	this.classic_word.setZoom(word_zoom);
	this.classic_word.setCenterXY(word_x, word_y);
	this.classic_word.display();
	Event.onTap('Editeur.classic_word', this.classic_word, function() {
		Editeur.classic_changeWord(word_x, word_y, word_zoom);
	}, true);
}

Editeur.classic_changeWord = function(x, y, z) {
	recherche = new RechercheEditeur();
	Destroy.all();
	console.log("Mots connus : "+MyStorage.listWords());
	var known_words = MyStorage.listWords().map(function(x) {return JsonHandler.wordFromJson(JSON.parse(MyStorage.getWord(x)));});
	recherche.setPossibilities(known_words);
	recherche.generate(0);
	gui.Editeur_classic_displayRecherche();
	recherche.display();
}

scriptLoaded('src/editeur/editeur_classic.js');
