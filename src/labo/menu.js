/*
 *	Object Menu
*/
function Labo_Menu() {
	this.input_text = null; // Imput text
	this.word_searched = null;
	this.word_searched_value = null;
	this.police_searched = new Array();
	
	this.word_choices = new Array();
	this.checkbox = new Array();
	this.checkbox_valid = new Array();
	this.choices = new Array();
	
	this.fct_onValid = null;
	
	Labo_MenuConstruct(this);
}

function Labo_MenuConstruct(l) {
	l.generate();
}

Labo_Menu.prototype.generate = function() {
	// Bouton Valider
	this.word_valid = new Word('Rechercher');
	this.word_valid.setCenterX(W/2);
	this.word_valid.setY(H-margin-this.word_valid.getHeight());
	this.word_valid.display();
	Event.onTap('word_valid', this.word_valid, function(r) { return function() { r.valid(); }}(this), true);
	
	// Word choices
	this.word_choices_ask = new Word('Choisissez un mode de transformation');
	this.word_choices_ask.setZoom(getScale(this.word_choices_ask.getWidth(), W - 200));
	this.word_choices_ask.setX(100);
	this.word_choices_ask.setCenterY(H*2/8);
	this.word_choices_ask.display();
	
	this.word_choices[0] = new Word('Police coupable');
	this.word_choices[1] = new Word('Police centrale');
	this.word_choices[2] = new Word('Police de l ombre');
	
	for(var i = 0; i < 3; i++) {
		var y = H*(3+i)/8;
		
		this.checkbox[i] = new Image(res('menu_labo_checkbox'));
		this.checkbox[i].setX(W/4);
		this.checkbox[i].setCenterY(y);
		this.checkbox[i].display();
		
		this.checkbox_valid[i] = new Image(res('menu_labo_checkbox_valid'));
		this.checkbox_valid[i].setX(W/4);
		this.checkbox_valid[i].setCenterY(y);
		this.checkbox_valid[i].setAlpha(0);
		this.checkbox_valid[i].display();
		
		this.choices[i] = false;
	
		this.word_choices[i].setX(W/4 + this.checkbox[i].w + 15);
		this.word_choices[i].setCenterY(y);
		this.word_choices[i].display();
		
		Event.onTap('word_choices_'+i, this.word_choices[i], function(r, i) { return function() { r.changeCheckbox(i); }}(this, i), true);
		Event.onTap('checkbox_'+i, this.checkbox[i], function(r, i) { return function() { r.changeCheckbox(i); }}(this, i), true);
	}
	
	// Input text
	this.input_text = new Image(res('menu_labo_input_text'));
	this.input_text.setScaleX(getScale(this.input_text.w, W/2));
	this.input_text.setX((W/2) - (this.input_text.getWidth()/2));
	this.input_text.setY(15);
	this.input_text.display();
	Event.onTap('input_text', this.input_text, function(r) { return function() { r.textInput(); }}(this), true);
	
	if(this.word_searched_value == null)
		setTimeout(function(r) { return function() { r.textInput(); }}(this), 100);
	else
		this.textInputWord();
}

Labo_Menu.prototype.changeCheckbox = function(i) {
	if(this.choices[i]) {
		this.choices[i] = false;
		this.checkbox_valid[i].setAlpha(0);
	}
	else {
		this.choices[i] = true;
		this.checkbox_valid[i].setAlpha(1);
	}
}

/* Text input */
Labo_Menu.prototype.textInput = function() {
	var lm = this;
	CocoonJS.App.onTextDialogFinished.addEventListener(function(text){
		if (text != "" && text != null) {
			lm.word_searched_value = text;
			lm.textInputWord();
		} else {
			lm.textInput();
		}
	});
	CocoonJS.App.showTextDialog("", "Tapez un mot a transformer :", "");
}

Labo_Menu.prototype.textInputWord = function() {
	Destroy.objet(this.word_searched);
	this.word_searched = new Word(this.word_searched_value);
	this.word_searched.setCenterXY(W/2, 15 + this.input_text.h / 2);
	this.word_searched.display();
}

/* onValid */
Labo_Menu.prototype.onValid = function(handler) {
	this.fct_onValid = handler;
}
Labo_Menu.prototype.valid = function() {
	this.police_searched = new Array();
	if(this.choices[0]) { // Police coupable
		this.police_searched.push(0);
		this.police_searched.push(1);
	}
	else if(this.choices[1]) { // Police central
		this.police_searched.push(2);
	}
	else {
		this.police_searched.push(0);
		this.police_searched.push(1);
		this.police_searched.push(2);
	}
	this.fct_onValid(this.word_searched_value, this.police_searched);
}

scriptLoaded('src/lib_separation/menu/menu.js');
