/**
	Classe Recherche
*/
function Recherche() {
	this.possibilities = new Array(); // Tableau des mots possibles
	this.words = new Array(); // Tableau des mots dans la liste déroualnte
	this.nb_side = 5; // Nombre de mots de chaque côté du mot central
	this.nb_max = this.nb_side * 2 + 1; // Nombre maximum de mots
	
	this.central_word = null; // Objet Word
	this.central_word_value = null; // Objet Word
	this.word_try = null; // Objet Word qui déclenche un test
	
	this.coords_word = new Array(); // Coordonnées centrées des mots dans la liste 
	this.coords_central_word = {};
	this.coords_word_try = {};
	
	this.mot_act = 0; // Mot courant
	this.inAnimation = false;
	this.inTransform = false;

	RechercheConstruct(this);
}

/*
	Constructeur
*/
function RechercheConstruct(r) {
	// Initialisation des coordonnées des mots
	/*
	var x = Math.ceil(W*2/3);
	var offsetY = Math.ceil(H/(2*(r.nb_side)));
	var offsetAlpha = 1 / r.nb_side;
	var offsetZoom = .1;
	
	for(var i = -r.nb_side; i <= r.nb_side; i++) {
		r.coords_word[r.nb_side+i] = {
			'x':x,
			'y':(H/2) + i * offsetY,
			'alpha': 1 - Math.abs(i) * offsetAlpha,
			'zoom': 1,// - Math.abs(i) * offsetZoom,
		};
	}
	*/
	
	var offsetAngle = Math.PI / (4 * (r.nb_side+1));
	var offsetY = Math.ceil(H/(2*r.nb_side));
	var offsetAlpha = 1 / r.nb_side;
	var offsetZoom = .2;
	
	var center = {'x': W/4, 'y': H/2 }
	var radius = 5*W/12;
	
	for(var i = -r.nb_side; i <= r.nb_side; i++) {
		r.coords_word[r.nb_side+i] = {
			'x': center.x + Math.cos(i * offsetAngle) * radius,
			'y': center.y + Math.sin(i * offsetAngle) * radius,
			'alpha': 1 - Math.abs(i) * offsetAlpha,
			'zoom': 1 - Math.abs(i) * offsetZoom,
		};
	}
	
	r.coords_central_word = {'x': W/4, 'y': H/2,};
	r.coords_word_try = {'x': W/4, 'y': H*3/4,};
}

Recherche.prototype.resetWords = function() {
	this.words = new Array();
}

/*
	Scroll
*/
Recherche.prototype.scrollDown = function() { if(!this.inAnimation) { this.inAnimation = true;
	// Décalage des mots vers le haut
	Destroy.objet(this.words[0]);
	this.words.shift();
	
	// Ajout du nouveau mot
	this.mot_act = this.getValidId(this.mot_act + 1);
	var id_word = this.getValidId(this.mot_act + this.nb_side);
	var p = this.possibilities[id_word];
	
	this.words.push(new Word(p.getValue(), null, p.getPolice(), p.getCode()));
	this.words[this.nb_max-1].setAlpha(this.coords_word[this.nb_max-1].alpha);
	this.words[this.nb_max-1].display();
	
	this.scrollAnimation(200);
}}
Recherche.prototype.scrollUp = function() { if(!this.inAnimation) { this.inAnimation = true;
	// Décalage des mots vers le haut
	Destroy.objet(this.words[this.nb_max-1]);
	this.words.pop();
	
	// Ajout du nouveau mot
	this.mot_act = this.getValidId(this.mot_act - 1);
	var id_word = this.getValidId(this.mot_act - this.nb_side);
	var p = this.possibilities[id_word];
	
	this.words.unshift(new Word(p.getValue(), null, p.getPolice(), p.getCode()));
	this.words[0].setAlpha(this.coords_word[0].alpha);
	this.words[0].display();
	
	this.scrollAnimation(200);
}}
Recherche.prototype.scrollAnimation = function(duration) {
	for(var i = 0; i < this.nb_max; i++) {
		this.words[i].setAlpha(this.coords_word[i].alpha);
		this.words[i].setZoom(this.coords_word[i].zoom);
		this.words[i].setCenterXY(this.coords_word[i].x, this.coords_word[i].y);
		
		createjs.Tween.get(this.words[i].getNode()).to({
			'x': this.words[i].getX(),
			'y': this.words[i].getY(),
			'alpha': this.words[i].getAlpha(),
			'scaleX': this.words[i].getScale(),
			'scaleY': this.words[i].getScale(),
		}, duration);
	}
	setTimeout(function(r) { return function() { r.scrollFinish(); }}(this), duration);
}
Recherche.prototype.scrollFinish = function() {
	this.inAnimation = false;
	Labo.scrollFinish();
}

/*
	Ajoute un mot central à la liste
*/
Recherche.prototype.addCentralWord = function(word) {
	this.central_word = word;
	this.central_word_value = word.getValue();
}

Recherche.prototype.getCentralWord = function() {
	return this.central_word;
}

Recherche.prototype.setPossibilities = function(data) {
	this.possibilities = data;
}

Recherche.prototype.getValidId = function(i) {
	var l = this.possibilities.length;
	while(i < 0) { i += l; }
	while(i >= l) { i -= l; }
	return i;
}

/*
	Génère la ligne en générant tous les mots à partir du mot_top
*/
Recherche.prototype.generate = function(mot_act) {
	this.resetWords();
	this.mot_act = mot_act;
	var j = 0;
	for (var i = mot_act - this.nb_side; i <= mot_act + this.nb_side; i++) {
		var ind = this.getValidId(i);
		var p = this.possibilities[ind];
		this.words[j] = new Word(p.getValue(), null, p.getPolice(), p.getCode());
		this.words[j].setAlpha(this.coords_word[j].alpha);
		this.words[j].setZoom(this.coords_word[j].zoom);
		this.words[j].setCenterXY(this.coords_word[j].x, this.coords_word[j].y);

		j++;
	}
	
	this.word_try = new Word('Transformer', null, 0);
	this.word_try.setZoom(0.6);
	this.word_try.setCenterXY(this.coords_word_try.x, this.coords_word_try.y);
	this.word_try.onTap(function() { Labo.transform(); });

	this.central_word = new Word(this.central_word_value);
	this.central_word.setZoom(2);
	this.central_word.setCenterXY(this.coords_central_word.x, this.coords_central_word.y);
}

Recherche.prototype.transform = function() { if(!this.inTransform) { this.inTransform = true;
	for(var i = 0; i < this.nb_max; i++) {
		// Effacement de la roue
		if(i != this.nb_side) createjs.Tween.get(this.words[i].getNode()).to({'alpha': 0,}, 500);
	}
	
	// Animation du mot courant de la liste
	this.words[this.nb_side].setCenterX(W/2);
	this.words[this.nb_side].setY(0);
	createjs.Tween.get(this.words[this.nb_side].getNode()).to({'x': this.words[this.nb_side].getX(),'y': this.words[this.nb_side].getY(),}, 500);
	
	// Effacement du mot try
	createjs.Tween.get(this.word_try.getNode()).to({'alpha': 0,}, 500);
	
	this.word_save = new Word('Sauver');
	this.word_save.setCenterX(W/3);
	this.word_save.setY(H-margin-this.word_save.getHeight());
	this.word_save.generate();
	this.word_save.display();
	var w = this.word_save;
	createjs.Tween.get(this.word_save.getNode()).to({'alpha': 1,}, 500);
	Event.onTap('word_save', this.word_save, function() { 
			Labo.saveWord(); 
			w.destroy(); 
			w = new Word('Sauve'); 
			w.setCenterX(W/3);
			w.setY(H-margin-w.getHeight());
			w.generate(); 
			w.display(); }, 
		true);

	
	// Bouton Editeur
	this.start_edit = new Word('Editeur de recit');
	this.start_edit.setCenterX(2*W/3);
	this.start_edit.setY(H-margin-this.start_edit.getHeight());
	this.start_edit.setAlpha(0);
	this.start_edit.generate();
	this.start_edit.display();
	createjs.Tween.get(this.start_edit.getNode()).to({'alpha': 1,}, 500);
	Event.onTap('start_edit', this.start_edit, function() { return function() { Editeur.start(); }}(this), true);

	// Modification du mot central
	this.central_word.setNextValue(this.words[this.nb_side].getValue());
	this.central_word.setPolice(this.words[this.nb_side].getPolice());
	this.central_word.setCode(this.words[this.nb_side].getCode());
	this.central_word.generate();
	this.central_word.display();
	// Animation du mot central
	this.central_word.setCenterXY(W/2, H/2);
	createjs.Tween.get(this.central_word.getNode())
		.to({'x': this.central_word.getX(),'y': this.central_word.getY(),}, 500)
		.call(function(r){return function(){ r.central_word.addGesture(); 
	Event.onTap('back_to_recherche', r.central_word, function() { r.transformFinish(); }, true); }}(this));
}}

Recherche.prototype.transformFinish = function() {
	// Affichage de la roue
	this.scrollAnimation(500);

	// Affichage du mot try
	createjs.Tween.get(this.word_try.getNode()).to({'alpha': 1,}, 500);
	
	// Effacement du lien editeur de recit
	createjs.Tween.get(this.start_edit.getNode()).to({'alpha': 0,}, 500)
	Event.onTap('start_edit', this.start_edit, function() {}, true);

	createjs.Tween.get(this.word_save.getNode()).to({'alpha': 0,}, 500)
	Event.onTap('word_save', this.word_save, function() {}, true);
	// Affichage du mot centrale
	this.central_word.setValue(this.central_word.getNextValue());
	this.central_word.generate();
	this.central_word.display();
	this.central_word.setCenterXY(this.coords_central_word.x, this.coords_central_word.y);
	createjs.Tween.get(this.central_word.getNode())
		.to({'x': this.central_word.getX(),'y': this.central_word.getY(),}, 500);
	
	this.inTransform = false;
}

/*
	Affiche la ligne en affichant tous les mots
*/
Recherche.prototype.display = function() {
	for(var i = 0; i < this.words.length; i++) {
		this.words[i].display();
	}
	this.word_try.display();
	this.central_word.display();
}

Recherche.prototype.destroy = function() {
	Destroy.arrayObjet(this.words);
	Destroy.objet(this.central_word);
	Destroy.objet(this.word_try);
}


scriptLoaded('src/labo/recherche.js');
