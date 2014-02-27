var word_active = false;

/**
	Class Word
*/
function Word(value, next_value, police, code) {
	this.id = ''; // Id unique
	
	this.x = 0; // Position x en pixel
	this.y = 0; // Position y en pixel
	
	this.size = fontSize; // Taille de la police en pixel
	this.cst = fontConst; // Constantes en fonction de la taille

	this.police = ((police == undefined) || (police == null)) ? this.cst.police.name : police; // Police
	this.color = this.cst.car.color; // Couleur
	
	this.value = value; // Valeur du mot actuel
	this.next_value = ((next_value == undefined) || (next_value == null)) ? value : next_value; // Valeur du mot après transformation
	this.code = ((code == undefined) || (code == null)) ? value : code; // Code du mot
	this.font = null; // Groupe qui sera affiché
	this.alpha = 1;
	this.zoom = 1;
	
	this.animation = null; // Fonction de callback pour l'animation ('Animation.x')
	this.animationOnChange = null; // Fonction de callback pour l'animation onChange ('Animation.xOnChange')
	this.inAnimation = false; // Boolen pour savoir si le mot est entrain d'être animer
	
	// this.eventOnAbort = null; // Fonction de callback pour l'évènement onAbort
	// this.eventOnBegin = null; // Fonction de callback pour l'évènement onAbort
	
	this.active = false; // Booléen pour savoir si il est mis en avant
	this.zoomOnActive = true; // Active ou désactive le zoom/dezoom lors de l'activation
	this.activeX = 0; // Coordonnée X du mot quand il est activé
	this.activeY = 0; // Coordonnée Y du mot quand il est activé
	this.zoom = 1; // Zoom de la police (100% = 1)
	
	this.gesture = null;
	this.tween = new Array();
	
	this.list_done = new Array(); // Liste des fonctions à appeler quand une fonction est terminée
	
	WordConstruct(this);
}

/*
	Constructeur
*/
function WordConstruct(word) {
	word.generate();
	word.setId(word.getUniqId());
}

Word.prototype.done = function(fct_done) {
	if(this.list_done[fct_done] != undefined)
		this.list_done[fct_done]();
}

Word.prototype.generate = function() {

	if(this.font != null && this.font != undefined) {
		this.destroy();
	}
	
	if(this.getCode() != this.getValue()) {
		var new_code = convertCode(this.getValue(), this.getCode(), this.getPolice());
		var new_value = convertValue(this.getValue(), new_code, this.getPolice());
		var new_next_value = convertValue(this.getNextValue(), new_code, this.getPolice());
	}
	else {
		var new_code = this.getCode();
		var new_value = this.getValue();
		var new_next_value = this.getNextValue();
	}
	
	switch(this.police)
	{
		case 0:
		case 1:
		case 2:
		case 3:
		case 4:
		case 5:
			this.font = new window['Word_' + Word_polices[this.police]]({
				'value': new_value,
				'next_value': new_next_value,
				'code': new_code,
				'fontSize': fontSize,
				'police': this.police,
				'color': this.color,
				'cst': this.cst,
			});
			this.is_open_up = false;
			this.is_open_down = false;
		break;
		default:
			alert('Police inconnue : ' + this.police + ' dans la fonction Word.generate()');
		break;
	}

	this.font.container.scaleX = fontConst.car.scale * this.getZoom();
	this.font.container.scaleY = fontConst.car.scale * this.getZoom();
	this.font.container.alpha = this.getAlpha();
}

Word.prototype.display = function() {
	this.font.container.x = this.getX();
	this.font.container.y = this.getY();
	this.font.container.scaleX = fontConst.car.scale * this.getZoom();
	this.font.container.scaleY = fontConst.car.scale * this.getZoom();
	this.font.container.alpha = this.getAlpha();
	
	if(this.font.container.getStage() == null)
		stage.addChild(this.font.container);
}
Word.prototype.displayGUI = function() {
	this.font.container.x = this.getX();
	this.font.container.y = this.getY();

	stageGUI.addChild(this.font.container);
}

Word.prototype.destroy = function() {
	Event.destroy(this.getId());
	for(var i = 0; i < this.tween.length; i++) {
		this.tween[i].pause();
	}
	Destroy.listItem(this.tween);
	Destroy.objet(this.font);
	this.inAnimation = false;
}

// Fonctions de mise en avant
Word.prototype.activate = function() {
	this.active = true;
	word_active = true;
	
	var all_words = this.font.container.getParent().getChildren();
	for(var i = 0; i < all_words.length ; i++)
	{
		if(all_words[i] != this.font.container) { 
			Effects.setDark(all_words[i]); 
		}
	}

	if(this.zoomOnActive) {
		this.zoom(Word_cst.zoom.recit);
	}
	else
		this.setZoom(this.zoom);
	
	this.addGesture();
	this.activeDbltap();
}

Word.prototype.disable = function() {
	this.active = false;
	word_active = false;
	this.removeGesture();
	
	var all_words = this.font.container.getParent().getChildren();
	for(var i = 0; i < all_words.length ; i++)
	{
		if(all_words[i] != this.font.container) { 
			Effects.setLight(all_words[i]);
		}
	}

	if(this.zoomOnActive) {
		this.zoomOut();
	}
	
	this.disableDbltap();
}

// Get
Word.prototype.getX = function() { if(!this.active) return this.x; else return this.activeX; }
Word.prototype.getY = function() { if(!this.active) return this.y; else return this.activeY; }
Word.prototype.getCenterX = function() { return this.getX() - this.getWidth() / 2; }
Word.prototype.getCenterY = function() { return this.getY() - this.getHeight() / 2; }
Word.prototype.getWidth = function() { return this.font.container.width * fontConst.car.scale * this.zoom; }
Word.prototype.getHeight = function() { return this.font.container.height * fontConst.car.scale * this.zoom; }
Word.prototype.getScale = function() { return fontConst.car.scale * this.zoom; }
Word.prototype.getValue = function() { return this.value; }
Word.prototype.getNextValue = function() { return this.next_value; }
Word.prototype.getPolice = function() { return this.police; }
Word.prototype.getCode = function() { return this.code; }
Word.prototype.getAlpha = function() { return this.alpha; }
Word.prototype.getZoom = function() { return this.zoom; }
Word.prototype.getNode = function() { return this.font.container; }
Word.prototype.getNodeUp = function() { return this.font.up; } // Police coupable
Word.prototype.getNodeDown = function() { return this.font.down; } // Police coupable
Word.prototype.getId = function() { return this.id; }
Word.prototype.getUniqId = function() { return 'word_"' + this.getValue() + '"_' + Math.random(); }
// Set
Word.prototype.setX = function(data) { this.x = Math.ceil(data); }
Word.prototype.setY = function(data) { this.y = Math.ceil(data); }
Word.prototype.setXY = function(data, data2) { this.setX(data); this.setY(data2); }
Word.prototype.setCenterX = function(data) { this.setX(data - this.getWidth() / 2); }
Word.prototype.setCenterY = function(data) { this.setY(data - this.getHeight() / 2); }
Word.prototype.setCenterXY = function(data, data2) { this.setCenterX(data); this.setCenterY(data2); }
Word.prototype.setId = function(data) { this.id = data; }
Word.prototype.setValue = function(data) { this.value = data; }
Word.prototype.setNextValue = function(data) { this.next_value = data; }
Word.prototype.setCode = function(data) { this.code = data; }
Word.prototype.setPolice = function(data) { this.police = data; }
Word.prototype.setZoomOnActive = function(data) { this.zoomOnActive = data; }
Word.prototype.setAlpha = function(data) { this.alpha = data; }
Word.prototype.setZoom = function(data) { this.zoom = data; return this;}
Word.prototype.setDone = function(fct_done, handler) { this.list_done[fct_done] = handler; }
Word.prototype.removeDone = function(fct_done) { this.list_done[fct_done] = function(){}; }

scriptLoaded('src/lib_separation/word/word.js');
