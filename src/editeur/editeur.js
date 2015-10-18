var Editeur = {};
var available_editions = ["classic"];

var ask_to_scroll_up = 0;
var ask_to_scroll_down = 0;

Editeur.start = function() {
	this.type = "multilignes";
	Editeur.multilignes.start();
	// Editeur.displayMenu();
}.bind(Editeur);

//Affiche le menu de choix des types de récits
//TODO - Pour l'instant, on bypass
Editeur.displayMenu = function() {
	Destroy.all();
	Editeur.displayEdition(available_editions[0]);
};

Editeur.displayEdition = function(type) {
	Destroy.all();
	this.type = type;
	console.log('Ouverture d\'edition '+type);
	Editeur[type].init();
};

Editeur.textInputTitle = function(x, y, z) {
	var callback_success = function (text){
		if (text !== "" && text !== null) {
			Destroy.objet(this.title);
			this.title = new Word(text);
			this.title.setCenterX(x);
			this.title.setCenterY(y);
			this.title.setZoom(z);
			this.title.display();
		} else {
			this.textInputTitle();
		}
	}.bind(this);
	function callback_cancel() {
		return;
	}

	if (language == 'fr') {
		Inputbox.prompt({
			message : "Tapez un mot a transformer :",
			type : "text",
			confirmText : "Ok",
			cancelText : "Annuler"
		},
		{
			success: callback_success
		});
	}
	else {
		Inputbox.prompt({
			message : "Write a word to be transformed:",
			type : "text",
			confirmText : "Ok",
			cancelText : "Cancel"
		},
		{
			success: callback_success,
			cancel: callback_cancel
		});
	}
};

Editeur.scrollUp = function() {
	if(!RechercheEditeur.inTransform) {
		if(!RechercheEditeur.inAnimation)
			RechercheEditeur.scrollUp();
		else
			ask_to_scroll_up++;
	}
};
Editeur.scrollDown = function() {
	if(!RechercheEditeur.inTransform) {
		if(!RechercheEditeur.inAnimation)
			RechercheEditeur.scrollDown();
		else
			ask_to_scroll_down++;
	}
};

Editeur.scrollFinish = function() {
	// On annule les évènements contraires
	while(ask_to_scroll_up > 0 && ask_to_scroll_down > 0) { ask_to_scroll_up--; ask_to_scroll_down--; }
	
	if(ask_to_scroll_up > 0) {
		ask_to_scroll_up--;
		Editeur.scrollUp();
	}
	else if(ask_to_scroll_down > 0) {
		ask_to_scroll_down--;
		Editeur.scrollDown();
	}
};

Editeur.handle_recherche = function() {
	RechercheEditeur.callback();
};

Editeur.saveStory = function() {
	story = Editeur[this.type].getStory();
	MyStorage.addStory(story);
	console.log('Saved story');
};

Editeur.destroy = function() {
	if (this.type !== undefined) {
		Editeur[this.type].destroy();
	}
};

scriptLoaded('src/editeur/editeur.js');
