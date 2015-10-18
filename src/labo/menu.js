/*
 *	Object Menu
*/
function Labo_Menu() {
	this.input_text = null; // Imput text
	this.word_searched = null;
	this.word_searched_value = null;
	this.police_searched = [];
	
	this.word_choices = [];
	this.checkbox = [];
	this.checkbox_valid = [];
	this.choices = [];
	
	this.fct_onValid = null;
	
	Labo_MenuConstruct(this);
}

function Labo_MenuConstruct(l) {
	l.generate();
}

Labo_Menu.prototype.generate = function() {
	// Bouton Valider
	if (language == 'fr') 
		this.word_valid = new Word('Chercher');
	else
		this.word_valid = new Word('Search');
	this.word_valid.setCenterX(W/2);
	this.word_valid.setY(H-margin-this.word_valid.getHeight());
	this.word_valid.display();
	Event.onTap('word_valid', this.word_valid, function() {
		this.valid();
	}.bind(this), true);

	// Word choices
	if (language == 'fr') 
		this.word_choices_ask = new Word('Choisissez un mode de transformation');
	else
		this.word_choices_ask = new Word('Choose the transformation mode');
	var police_scale = getScale(this.word_choices_ask.getWidth(), 6*W/10);
	this.word_choices_ask.setZoom(police_scale);
	this.word_choices_ask.setCenterX(W/2);
	this.word_choices_ask.setCenterY(H*3/8);
	this.word_choices_ask.display();
	
	if (language == 'fr')  {
		this.word_choices[0] = new Word('Police coupable');
		this.word_choices[1] = new Word('Police centrale');
		//this.word_choices[2] = new Word('Police de l ombre');
	} else {
		this.word_choices[0] = new Word('Guillotine font');
		this.word_choices[1] = new Word('Central font');
		//this.word_choices[2] = new Word('Shadow font');
	}
	this.word_choices[0].setZoom(police_scale);
	this.word_choices[1].setZoom(police_scale);
	//this.word_choices[2].setZoom(police_scale);
	
	for(var i = 0; i < 2; i++) {
		var y = H*(4+i)/8;
		
		this.checkbox[i] = new Image(res('menu_labo_checkbox'));
		this.checkbox[i].setScaleXY(police_scale, police_scale);
		this.checkbox[i].setX(W/4);
		this.checkbox[i].setCenterY(y);
		this.checkbox[i].display();
		
		this.checkbox_valid[i] = new Image(res('menu_labo_checkbox_valid'));
		this.checkbox_valid[i].setScaleXY(police_scale, police_scale);
		this.checkbox_valid[i].setX(W/4);
		this.checkbox_valid[i].setCenterY(y);
		this.checkbox_valid[i].setAlpha(0);
		this.checkbox_valid[i].display();
		
		this.choices[i] = false;
	
		this.word_choices[i].setX(W/4 + this.checkbox[i].w + 15);
		this.word_choices[i].setCenterY(y);
		this.word_choices[i].display();
		
		Event.onTap('word_choices_'+i, this.word_choices[i], function(r, i) {
			return function() { r.changeCheckbox(i); };
		}(this, i), true);
		Event.onTap('checkbox_'+i, this.checkbox[i], function(r, i) {
			return function() { r.changeCheckbox(i); };
		}(this, i), true);
	}
	
	// Input text
	this.input_text = new Image(res('menu_labo_input_text'));
	this.input_text.setScaleX(getScale(this.input_text.w, W/2));
	this.input_text.setScaleY(getScale(this.input_text.h, H/7));
	this.input_text.setX((W/2) - (this.input_text.getWidth()/2));
	this.input_text.setY(15);
	this.input_text.display();
	Event.onTap('input_text', this.input_text, function() {
		this.textInput();
	}.bind(this), true);
	
	if(this.word_searched_value === null)
		setTimeout(function() {
			this.textInput();
		}.bind(this), 100);
	else
		this.textInputWord();
};

Labo_Menu.prototype.changeCheckbox = function(i) {
	if(this.choices[i]) {
		this.choices[i] = false;
		this.checkbox_valid[i].setAlpha(0);
	}
	else {
		this.choices[i] = true;
		this.checkbox_valid[i].setAlpha(1);
	}
};

/* Text input */
Labo_Menu.prototype.textInput = function() {
	var callback_success = function (text){
		console.log(text);
		if (text !== "" && text !== null) {
			this.word_searched_value = text;
			this.textInputWord();
		} else {
			this.textInput();
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

Labo_Menu.prototype.textInputWord = function() {
	Destroy.objet(this.word_searched);
	this.word_searched = new Word(this.word_searched_value);
	this.word_searched.setZoom(getMinScale(this.word_searched.getHeight(), 0.9*this.input_text.getHeight(), this.word_searched.getWidth(), 0.8*this.input_text.getWidth()));
	this.word_searched.setCenterXY(W/2, this.input_text.getY()+this.input_text.getHeight() / 2);
	this.word_searched.display();
};

/* onValid */
Labo_Menu.prototype.onValid = function(handler) {
	this.fct_onValid = handler;
};

Labo_Menu.prototype.valid = function() {
	this.police_searched = [];
	if(this.choices[0]) { // Police coupable
		this.police_searched.push(0);
		this.police_searched.push(1);
	}
	if(this.choices[1]) { // Police central
		this.police_searched.push(2);
	}
	/*if(!this.choices[0] && ! this.choices[1]) {
		this.police_searched.push(0);
		this.police_searched.push(1);
		this.police_searched.push(2);
	}*/
	this.fct_onValid(this.word_searched_value, this.police_searched);
};

scriptLoaded('src/lib_separation/menu/menu.js');
