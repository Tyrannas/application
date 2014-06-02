Editeur.classic_init = function() {
	this.title_x = W/2;
	this.title_y = H/3;
	this.title_zoom = 1;
	this.word_x = W/2;
	this.word_y = 2*H/3;
	this.word_zoom = 2;
	if (Menu.language == 'fr') {
		this.title = new Word('Titre');
		this.classic_word = new Word('Changez moi');
		this.word_save = new Word('Sauver');
	} else {
		this.title = new Word('Title');
		this.classic_word = new Word('Change me');
		this.word_save = new Word('Save');
	}
	this.word_save.setCenterX(W/2);
	this.word_save.setY(H-margin-this.word_save.getHeight());
	this.word_save.generate();
	createjs.Tween.get(this.word_save.getNode()).to({'alpha': 1,}, 500);
	var o = this;
	this.classic_word_copy = null;
	Editeur.classic_display();
}

Editeur.classic_recherche_result = function(word) {
	Editeur.classic_word = word;
	Editeur.classic_word_copy = new Word(word.getValue(), word.getNextValue(), word.getPolice(), word.getCode());
	Editeur.classic_word_copy.setZoom(Editeur.classic_word.getZoom());
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
	if (this.classic_word.getNextValue() != this.classic_word.getValue()) { //Animation possible
		this.classic_word.addGesture();
	}
	Event.onTap('Editeur.classic_word', this.classic_word, function() {
		Editeur.classic_changeWord();
	}, true);
	this.classic_word.display();
	this.word_save.display();
	var o = this;
	Event.onTap('word_save', this.word_save, function() { 
			Editeur.saveStory();
			o.word_save.destroy(); 
			if (Menu.language == 'fr') 
				o.word_save = new Word('Sauve'); 
			else 
				o.word_save = new Word('Saved'); 
			o.word_save.setCenterX(W/2);
			o.word_save.setY(H-margin-o.word_save.getHeight());
			o.word_save.generate(); 
			o.word_save.display(); }, 
		true);
	gui.Editeur_displayAll();
}

Editeur.classic_changeWord = function(offset) {
	if (offset == undefined) {
		offset = 0;
	}
	var known_words = MyStorage.listWords().map(function(x) {return JsonHandler.wordFromJson(JSON.parse(MyStorage.getWord(x)));});
	if (known_words.length <= 0) {
		if (Menu.language == 'fr')
			alert('Aucun mot enregistré, allez dans le Labo !');
		else 
			alert('No words saved, let\'s go to the Lab !');
		Labo.start();
	} else {
		this.recherche = new RechercheEditeur(this.classic_recherche_result);
		Destroy.all();
		console.log("Mots connus : "+MyStorage.listWords());
		this.recherche.setPossibilities(known_words);
		console.log(offset);
		this.recherche.generate(offset);
		gui.Editeur_classic_displayRecherche();
		this.recherche.display();
	}
}

Editeur.classic_getStory = function() {
	story = new StoryOnePage();
	page = new Page();
	line = new Line();
	line.add(this.title);
	page.addLine(line);
	line = new Line();
	line.add(this.classic_word_copy);
	page.addLine(line);
	story.setName(this.title.getValue());
	story.addPage(page);
	return story;
}

scriptLoaded('src/editeur/editeur_classic.js');
