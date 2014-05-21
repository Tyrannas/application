/**
	Classe RechercheEditeur
*/
function RechercheEditeur(fct) {
	this.possibilities = new Array(); // Tableau des mots possibles
	this.words = new Array(); // Tableau des mots dans la liste déroualnte
	this.words_next = new Array();
	this.nb_side = 3; // Nombre de mots de chaque côté du mot central
	this.nb_max = this.nb_side * 2 + 1; // Nombre maximum de mots
	
	this.central_word = null; // Objet Word
	this.central_word_value = null; // Objet Word
	this.word_try = null; // Objet Word qui déclenche un test
	
	this.coords_word = new Array(); // Coordonnées centrées des mots dans la liste 
	this.coords_word_next = new Array(); // Coordonnées centrées des mots dans la liste 
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
	var offsetAlphaErase = 1;
	var offsetZoom = .2;
	
	var radius = 2/3*W - new Word('motdelongueurmax').getWidth()/2;
	var height_def = new Word('temp').getHeight();

	r.size_erase = 50;
	
	for(var i = -r.nb_side; i <= r.nb_side; i++) {
		r.coords_word[r.nb_side+i] = {
			'x': 2*margin + r.size_erase,
			'y': H/2 + Math.sin(i * offsetAngle) * radius,
			'alpha': 1 - Math.abs(i) * offsetAlpha,
			'zoom': 1 - Math.abs(i) * offsetZoom,
		};
		r.coords_word_next[r.nb_side+i] = {
			'x': 2*margin + r.size_erase,
			'y': H/2 + Math.sin(i * offsetAngle) * radius + height_def*(0.6 - Math.abs(i) * offsetZoom),
			'alpha': 0.7 - Math.abs(i) * offsetAlpha,
			'zoom': 0.6 - Math.abs(i) * offsetZoom,
		};
	}
	temp = new Image(res('cross_erase'));
	r.coords_erase = {
		'x': margin,
		'y': (r.coords_word[r.nb_side].y + r.coords_word_next[r.nb_side].y) / 2,
		'alpha': 1,
		'scaleX': getScale(temp.getHeight(), r.size_erase),
		'scaleY': getScale(temp.getWidth(), r.size_erase)
	}
	
	r.coords_word_try = {'x': 2*W/3, 'y': H*3/4,};
	this.callback = r.callback;
}

RechercheEditeur.prototype.resetWords = function() {
	this.words = new Array();
	this.words_next = new Array();
}

/*
	Scroll
*/
RechercheEditeur.prototype.scrollDown = function() { if(!this.inAnimation) { this.inAnimation = true;
	// Décalage des mots vers le haut
	Destroy.objet(this.words[0]);
	Destroy.objet(this.words_next[0]);
	this.words.shift();
	this.words_next.shift();
	
	// Ajout du nouveau mot
	this.mot_act = this.getValidId(this.mot_act + 1);
	var id_word = this.getValidId(this.mot_act + this.nb_side);
	var p = this.possibilities[id_word];
	
	this.words.push(new Word(p.getValue(), p.getNextValue(), p.getPolice(), p.getCode()));
	this.words[this.nb_max-1].setAlpha(this.coords_word[this.nb_max-1].alpha);
	this.words[this.nb_max-1].display();
	this.words_next.push(new Word(p.getNextValue(), p.getNextValue(), p.getPolice(), p.getCode()));
	this.words_next[this.nb_max-1].setAlpha(this.coords_word_next[this.nb_max-1].alpha);
	this.words_next[this.nb_max-1].display();
	
	this.scrollAnimation(200);
	this.updateCentralWord();
}}
RechercheEditeur.prototype.scrollUp = function() { if(!this.inAnimation) { this.inAnimation = true;
	// Décalage des mots vers le haut
	Destroy.objet(this.words[this.nb_max-1]);
	this.words.pop();
	Destroy.objet(this.words_next[this.nb_max-1]);
	this.words_next.pop();
	
	// Ajout du nouveau mot
	this.mot_act = this.getValidId(this.mot_act - 1);
	var id_word = this.getValidId(this.mot_act - this.nb_side);
	var p = this.possibilities[id_word];
	
	this.words.unshift(new Word(p.getValue(), p.getNextValue(), p.getPolice(), p.getCode()));
	this.words[0].setAlpha(this.coords_word[0].alpha);
	this.words[0].display();
	this.words_next.unshift(new Word(p.getNextValue(), p.getNextValue(), p.getPolice(), p.getCode()));
	this.words_next[0].setAlpha(this.coords_word_next[0].alpha);
	this.words_next[0].display();

	
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

		this.words_next[i].setAlpha(this.coords_word_next[i].alpha);
		this.words_next[i].setZoom(this.coords_word_next[i].zoom);
		this.words_next[i].setCenterY(this.coords_word_next[i].y);
		this.words_next[i].setX(this.coords_word_next[i].x);
		
		createjs.Tween.get(this.words_next[i].getNode()).to({
			'x': this.words_next[i].getX(),
			'y': this.words_next[i].getY(),
			'alpha': this.words_next[i].getAlpha(),
			'scaleX': this.words_next[i].getScale(),
			'scaleY': this.words_next[i].getScale(),
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

		this.words_next[j] = new Word(p.getNextValue(), p.getNextValue(), p.getPolice(), p.getCode());
		this.words_next[j].setAlpha(this.coords_word_next[j].alpha);
		this.words_next[j].setZoom(this.coords_word_next[j].zoom);
		this.words_next[j].setCenterY(this.coords_word_next[j].y);
		this.words_next[j].setX(this.coords_word_next[j].x);

		j++;
	}
	
	this.erase = new Image(res('cross_erase'));
	this.erase.setAlpha(this.coords_erase.alpha);
	this.erase.setScaleXY(this.coords_erase.scaleX, this.coords_erase.scaleY);
	this.erase.setCenterY(this.coords_erase.y);
	this.erase.setX(this.coords_erase.x);
	Event.onTap('erase_word', this.erase, function(o) { return function() { MyStorage.removeWord(o.words[o.nb_side]); Editeur.classic_changeWord(o.mot_act) }}(this), true);

	this.word_try = new Word('Valider', null, 0);
	this.word_try.setZoom(0.6);
	this.word_try.setCenterXY(W/2, H - this.word_try.getHeight());
	this.word_try.onTap(function() {Editeur.handle_recherche();});

	this.central_word = new Word(this.words[this.nb_side].getValue());
	this.central_word.setZoom(2);
	this.central_word.setNextValue(this.words[this.nb_side].getNextValue());
	this.central_word.setPolice(this.words[this.nb_side].getPolice());
	this.central_word.setCode(this.words[this.nb_side].getCode());
	this.central_word.generate();
}

RechercheEditeur.prototype.updateCentralWord = function() {
	Destroy.objet(this.central_word);
	this.central_word = new Word(this.words[this.nb_side].getValue());
	this.central_word.setZoom(2);
	this.central_word.setNextValue(this.words[this.nb_side].getNextValue());
	this.central_word.setPolice(this.words[this.nb_side].getPolice());
	this.central_word.setCode(this.words[this.nb_side].getCode());
	this.central_word.generate();

	Destroy.objet(this.word_left);
	Destroy.objet(this.word_right);
	var zoom_h = H*0.2;
	var zoom_w = W*0.3;
	var offset_display = 30;
	this.word_left = new Word(this.central_word.getValue(), this.central_word.getValue(), this.central_word.getPolice(), this.central_word.getCode());
	var new_zoom = getScaleXY(this.word_left.getWidth(), this.word_left.getHeight(), zoom_w, zoom_h);
	this.word_left.setZoom(Math.min(new_zoom.x, new_zoom.y));
	this.word_left.setX(W/2 - this.word_left.getWidth() - offset_display);
	this.word_left.setCenterY(H/5);
	this.word_left.generate();
	this.word_left.display();

	this.word_right = new Word(this.central_word.getNextValue(), this.central_word.getNextValue(), this.central_word.getPolice(), this.central_word.getCode());
	new_zoom = getScaleXY(this.word_right.getWidth(), this.word_right.getHeight(), zoom_w, zoom_h);
	this.word_right.setZoom(Math.min(new_zoom.x, new_zoom.y));
	this.word_right.setX(W/2 + offset_display);
	this.word_right.setCenterY(H/5);
	this.word_right.generate();
	this.word_right.display();
}

/*
	Affiche la ligne en affichant tous les mots
*/
RechercheEditeur.prototype.display = function() {
	for(var i = 0; i < this.words.length; i++) {
		this.words[i].display();
		this.words_next[i].display();
	}
	this.erase.display();
	this.word_try.display();
	this.updateCentralWord();
}

RechercheEditeur.prototype.destroy = function() {
	Destroy.arrayObjet(this.words);
	Destroy.arrayObjet(this.words_next);
	Destroy.Objet(this.erase);
	Destroy.objet(this.central_word);
	Destroy.objet(this.word_try);
}


scriptLoaded('src/editeur/recherche.js');
