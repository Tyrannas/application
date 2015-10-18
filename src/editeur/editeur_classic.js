Editeur.classic = {};

Editeur.classic.init = function() {
	Destroy.all();
	this.title_x = W/2;
	this.title_y = H/3;
	this.title_zoom = 1;
	this.word_x = W/2;
	this.word_y = 2*H/3;
	this.word_zoom = 2;
	if (language == 'fr') {
		this.title = new Word('Titre');
		this.word = new Word('Changez moi');
		this.word_save = new Word('Sauver');
	} else {
		this.title = new Word('Title');
		this.word = new Word('Change me');
		this.word_save = new Word('Save');
	}
	this.word_save.setCenterX(W/2);
	this.word_save.setY(H-margin-this.word_save.getHeight());
	this.word_save.generate();
	createjs.Tween.get(this.word_save.getNode()).to({'alpha': 1,}, 500);
	var o = this;
	this.word_copy = null;
	Editeur.classic.display();
};

Editeur.classic.recherche_result = function(word) {
	Destroy.all();
	Editeur.classic.word = word;
	Editeur.classic.word_copy = new Word(word.getValue(), word.getNextValue(), word.getPolice(), word.getCode());
	Editeur.classic.word_copy.setZoom(Editeur.classic.word.getZoom());
	Editeur.classic.display();
};


Editeur.classic.display = function() {
	this.title.setZoom(this.title_zoom);
	this.title.setCenterXY(this.title_x, this.title_y);
	this.title.display();
	var x = this.title_x, y = this.title_y, z = this.title_zoom;
	Event.onTap('Editeur.title', this.title, function() {
		Editeur.textInputTitle(x, y, z);
	}, true);

	this.word.setZoom(this.word_zoom);
	this.word.setCenterXY(this.word_x, this.word_y);
	if (this.word.getNextValue() != this.word.getValue()) { //Animation possible
		this.word.addGesture();
	}
	Event.onTap('Editeur.classic.word', this.word, function() {
		Editeur.classic.changeWord();
	}, true);
	this.word.display();
	this.word_save.display();
	var o = this;
	Event.onTap('word_save', this.word_save, function() { 
			Editeur.saveStory();
			o.word_save.destroy(); 
			if (language == 'fr') 
				o.word_save = new Word('Sauve'); 
			else 
				o.word_save = new Word('Saved'); 
			o.word_save.setCenterX(W/2);
			o.word_save.setY(H-margin-o.word_save.getHeight());
			o.word_save.generate(); 
			o.word_save.display();
	}, true);
	gui.Editeur_displayAll();
};

Editeur.classic.changeWord = function(offset) {
	offset = offset || 0;

	var known_words = MyStorage.listWords().map(function(x) {return JsonHandler.wordFromJson(JSON.parse(MyStorage.getWord(x)));});
	if (known_words.length <= 0) {
		if (language == 'fr')
			Inputbox.alert({message: 'Aucun mot enregistré, allez dans le Labo !', confirmText: "Ok"});
		else 
			Inputbox.alert({message: 'No words saved, let\'s go to the Lab !', confirmText: "Ok"});
		Labo.start();
	} else {
		this.recherche = new RechercheEditeur(this.recherche_result);
		Destroy.all();
		this.recherche.setPossibilities(known_words);
		this.recherche.generate(offset);
		gui.Editeur_classic.displayRecherche();
		this.recherche.display();
	}
};

Editeur.classic.getStory = function() {
	story = new StoryOnePage();
	page = new Page();
	line = new Line();
	line.add(this.title);
	page.addLine(line);
	line = new Line();
	line.add(this.word_copy);
	page.addLine(line);
	story.setName(this.title.getValue());
	story.addPage(page);
	return story;
};

Editeur.classic.destroy = function() {
	Destroy.objet(Editeur.classic.word);
};

scriptLoaded('src/editeur/editeur_classic.js');
