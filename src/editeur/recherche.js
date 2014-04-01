/**
	Classe RechercheEditeur
*/
function RechercheEditeur(fct) {
	this.possibilities = new Array(); // Tableau des mots possibles
	this.words = new Array(); // Tableau des mots dans la liste déroualnte
	this.nb_side = 5; // Nombre de mots de chaque côté du mot central
	this.nb_max = this.nb_side * 2 + 1; // Nombre maximum de mots
	
	this.central_word = null; // Objet Word
	this.central_word_value = null; // Objet Word
	this.word_try = null; // Objet Word qui déclenche un test
	
	this.coords_word = new Array(); // Coordonnées centrées des mots dans la liste 
	this.coords_word_try = {};
	
	this.mot_act = 0; // Mot courant
	this.inAnimation = false;
	this.inTransform = false;

	this.callback = function() { fct(this.central_word);};

	RechercheEditeurConstruct(this);
}

/*
	Constructeur
*/
function RechercheEditeurConstruct(r) {
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
	
	var radius = 2/3*W - new Word('motdelongueurmax').getWidth()/2;
	
	for(var i = -r.nb_side; i <= r.nb_side; i++) {
		r.coords_word[r.nb_side+i] = {
			'x': margin,
			'y': H/2 + Math.sin(i * offsetAngle) * radius,
			'alpha': 1 - Math.abs(i) * offsetAlpha,
			'zoom': 1 - Math.abs(i) * offsetZoom,
		};
	}
	
	r.coords_word_try = {'x': 2*W/3, 'y': H*3/4,};
	this.callback = r.callback;
}

RechercheEditeur.prototype.resetWords = function() {
	this.words = new Array();
}

/*
	Scroll
*/
RechercheEditeur.prototype.scrollDown = function() { if(!this.inAnimation) { this.inAnimation = true;
	// Décalage des mots vers le haut
	Destroy.objet(this.words[0]);
	this.words.shift();
	
	// Ajout du nouveau mot
	this.mot_act = this.getValidId(this.mot_act + 1);
	var id_word = this.getValidId(this.mot_act + this.nb_side);
	var p = this.possibilities[id_word];
	
	this.words.push(new Word(p.getValue(), p.getNextValue(), p.getPolice(), p.getCode()));
	this.words[this.nb_max-1].setAlpha(this.coords_word[this.nb_max-1].alpha);
	this.words[this.nb_max-1].display();
	
	this.scrollAnimation(200);
	this.updateCentralWord();
}}
RechercheEditeur.prototype.scrollUp = function() { if(!this.inAnimation) { this.inAnimation = true;
	// Décalage des mots vers le haut
	Destroy.objet(this.words[this.nb_max-1]);
	this.words.pop();
	
	// Ajout du nouveau mot
	this.mot_act = this.getValidId(this.mot_act - 1);
	var id_word = this.getValidId(this.mot_act - this.nb_side);
	var p = this.possibilities[id_word];
	
	this.words.unshift(new Word(p.getValue(), p.getNextValue(), p.getPolice(), p.getCode()));
	this.words[0].setAlpha(this.coords_word[0].alpha);
	this.words[0].display();
	
	this.scrollAnimation(200);
	this.updateCentralWord();
}}
RechercheEditeur.prototype.scrollAnimation = function(duration) {
	for(var i = 0; i < this.nb_max; i++) {
		this.words[i].setAlpha(this.coords_word[i].alpha);
		this.words[i].setZoom(this.coords_word[i].zoom);
		this.words[i].setCenterY(this.coords_word[i].y);
		this.words[i].setX(this.coords_word[i].x);
		
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
RechercheEditeur.prototype.scrollFinish = function() {
	this.inAnimation = false;
	Editeur.scrollFinish();
}

RechercheEditeur.prototype.setPossibilities = function(data) {
	this.possibilities = data;
}

RechercheEditeur.prototype.getValidId = function(i) {
	var l = this.possibilities.length;
	while(i < 0) { i += l; }
	while(i >= l) { i -= l; }
	return i;
}

/*
	Génère la ligne en générant tous les mots à partir du mot_top
*/
RechercheEditeur.prototype.generate = function(mot_act) {
	this.resetWords();
	this.mot_act = mot_act;
	var j = 0;
	for (var i = mot_act - this.nb_side; i <= mot_act + this.nb_side; i++) {
		var ind = this.getValidId(i);
		var p = this.possibilities[ind];
		this.words[j] = new Word(p.getValue(), p.getNextValue(), p.getPolice(), p.getCode());
		this.words[j].setAlpha(this.coords_word[j].alpha);
		this.words[j].setZoom(this.coords_word[j].zoom);
		this.words[j].setCenterY(this.coords_word[j].y);
		this.words[j].setX(this.coords_word[j].x);

		j++;
	}
	
	this.word_try = new Word('Valider', null, 0);
	this.word_try.setZoom(0.6);
	this.word_try.setCenterXY(W/2, H - this.word_try.getHeight());
	this.word_try.onTap(function() {Editeur.handle_recherche();});

	this.central_word = new Word(this.words[this.nb_side].getValue());
	this.central_word.setZoom(2);
	this.central_word.setNextValue(this.words[this.nb_side].getNextValue());
	this.central_word.setPolice(this.words[this.nb_side].getPolice());
	this.central_word.setCode(this.words[this.nb_side].getCode());
}

RechercheEditeur.prototype.updateCentralWord = function() {
	Destroy.objet(this.central_word);
	this.central_word = new Word(this.words[this.nb_side].getValue());
	this.central_word.setZoom(2);
	this.central_word.setNextValue(this.words[this.nb_side].getNextValue());
	this.central_word.setPolice(this.words[this.nb_side].getPolice());
	this.central_word.setCode(this.words[this.nb_side].getCode());
}

/*
	Affiche la ligne en affichant tous les mots
*/
RechercheEditeur.prototype.display = function() {
	for(var i = 0; i < this.words.length; i++) {
		this.words[i].display();
	}
	this.word_try.display();
	this.updateCentralWord();
}

RechercheEditeur.prototype.destroy = function() {
	Destroy.arrayObjet(this.words);
	Destroy.objet(this.central_word);
	Destroy.objet(this.word_try);
}


scriptLoaded('src/editeur/recherche.js');
