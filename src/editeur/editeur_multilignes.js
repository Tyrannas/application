/** Editeur.multilignes **/

Editeur.multilignes = {
	draft_name: "Editeur.multilignes.draft",
	nb_lines: 3,
	word_add: '+'
};

Editeur.multilignes.start = function () {
	Destroy.all();
	gui.Editeur_displayAll();
	this.init();
	this.generate();
	this.display();
}.bind(Editeur.multilignes);

Editeur.multilignes.init = function () {
	var i;
	this.loadDraft();
	this.button_plus = [];
}.bind(Editeur.multilignes);

Editeur.multilignes.generate = function () {
	var i, j, new_button, line;
	for(i = 0; i < this.page.lines.length; i++) {
		line = this.page.lines[i];

		new_button = new ButtonPlus(i, false);
		line.addAtBegin(new_button.word);
		this.button_plus.push(new_button);

		if(line.words.length > 1) {
			new_button = new ButtonPlus(i, true);
			line.add(new_button.word);
			this.button_plus.push(new_button);
		}
	}
	var Ysize = H-margin-size_icon;
	this.page.generate(Ysize, W/2, Ysize/2);
	for(i = 0; i < this.button_plus.length; i++) {
		this.button_plus[i].generate();
	}
}.bind(Editeur.multilignes);

Editeur.multilignes.display = function () {
	this.page.display();
}.bind(Editeur.multilignes);
Editeur.multilignes.erase = function () {
	this.story.destroy();
	this.generateDraft();
	this.saveDraft();
	Editeur.start();
}.bind(Editeur.multilignes);

Editeur.multilignes.destroy = function () {
	if(!!this.story) {
		this.saveDraft();
		this.story.destroy();
		this.story = null;
	}
}.bind(Editeur.multilignes);

Editeur.multilignes.getJSON = function () {
	if(!this.story) {
		this.loadDraft();
	}
	var json = JsonHandler.jsonFromStory(this.story);
	var i, j, line, id;

	for(i = 0; i < json.pages[0].lines.length; i++) {
		line = json.pages[0].lines[i];
		for(j = 0; j < line.words.length; j++) {
			if(line.words[j].value === " " || line.words[j].value === this.word_add) {
				line.words.splice(j, 1);
				j--;
			}
		}
	}

	return JSON.stringify(json);
}.bind(Editeur.multilignes);
Editeur.multilignes.saveDraft = function () {
	localStorage.setItem(this.draft_name, this.getJSON());
}.bind(Editeur.multilignes);
Editeur.multilignes.loadDraft = function () {
	var draft = localStorage.getItem(this.draft_name);
	if(draft === null) {
		this.generateDraft();
	}
	else {
		this.story = JsonHandler.storyFromJson(JSON.parse(draft));
		this.page = this.story.pages[0];
	}
}.bind(Editeur.multilignes);
Editeur.multilignes.generateDraft = function () {
	this.story = new StoryOnePage();
	this.page = new Page();
	this.story.addPage(this.page);

	for(i = 0; i < this.nb_lines; i++) {
		this.page.addLine();
	}
}.bind(Editeur.multilignes);

Editeur.multilignes.addWordToLine = function (line_id, word, addAtBegin) {
	this.loadDraft();
	if(line_id < this.page.lines.length) {
		if(!addAtBegin) {
			this.page.lines[line_id].add(word);
		}
		else {
			this.page.lines[line_id].addAtBegin(word);
		}
	}
	this.saveDraft();
}.bind(Editeur.multilignes);

Editeur.multilignes.save = function () {
	this.textInputTitle(function (text) {
		this.story.name = text;
		MyStorage.addStory(this.story.name, this.getJSON());
		Recit.start();
	}.bind(this));
}.bind(Editeur.multilignes);

Editeur.multilignes.textInputTitle = function(callback_success) {
	function callback_cancel() {
		return;
	}

	if (language == 'fr') {
		Cocoon.Dialog.prompt({
			message : "Tapez un titre :",
			type : Cocoon.Dialog.keyboardType.TEXT,
			confirmText : "Ok",
			cancelText : "Annuler"
		},
		{
			success: callback_success
		});
	}
	else {
		Cocoon.Dialog.prompt({
			message : "Write a title:",
			type : Cocoon.Dialog.keyboardType.TEXT,
			confirmText : "Ok",
			cancelText : "Cancel"
		},
		{
			success: callback_success,
			cancel: callback_cancel
		});
	}
}.bind(Editeur.multilignes);

/** ButtonPlus **/

function ButtonPlus(line_id, addAtEnd) {
	this.line_id = line_id;
	this.word = new Word(Editeur.multilignes.word_add);
	this.addAtBegin = !addAtEnd;
}

ButtonPlus.prototype.generate = function () {
	this.word.onTap(function () {
		this.onTap();
	}.bind(this));
};

ButtonPlus.prototype.onTap = function () {
	Destroy.all();
	gui.Editeur_returnMain();
	var new_word;

	this.word_active = new Word("add active word");
	this.word_classic = new Word("add classic word");
	this.word_active.setCenterXY(W/2,H/3);
	this.word_classic.setCenterXY(W/2,2*H/3);
	this.word_active.display();
	this.word_classic.display();
	this.word_active.onTap(function () {
		RechercheEditeur.start(function (new_word) {
			Editeur.multilignes.addWordToLine(this.line_id, new_word, this.addAtBegin);
			Editeur.start();
		}.bind(this));
	}.bind(this));
	this.word_classic.onTap(function () {
		this.textInputWord(function (text) {
			Editeur.multilignes.addWordToLine(this.line_id, new Word(text), this.addAtBegin);
			Editeur.start();
		}.bind(this));
	}.bind(this));
};

ButtonPlus.prototype.textInputWord = function(callback_success) {
	function callback_cancel() {
		return;
	}

	if (language == 'fr') {
		Cocoon.Dialog.prompt({
			message : "Tapez un mot à ajouter :",
			type : Cocoon.Dialog.keyboardType.TEXT,
			confirmText : "Ok",
			cancelText : "Annuler"
		},
		{
			success: callback_success
		});
	}
	else {
		Cocoon.Dialog.prompt({
			message : "Write a word to be added:",
			type : Cocoon.Dialog.keyboardType.TEXT,
			confirmText : "Ok",
			cancelText : "Cancel"
		},
		{
			success: callback_success,
			cancel: callback_cancel
		});
	}
};

scriptLoaded('src/editeur/editeur_multilignes.js');