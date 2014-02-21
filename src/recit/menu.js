/*
 *	Object Menu
*/
function Recit_Menu(titles_value) {
	this.vignettes = new Array();
	this.titles = new Array();
	this.titles_value = titles_value;
	this.nb_w = 5;
	this.nb_h = 3;
	this.w_vignette;
	this.h_vignette;
	
	this.coords_titles_w = new Array();
	this.coords_titles_h = new Array();
	
	Recit_MenuConstruct(this);
}

function Recit_MenuConstruct(r) {
	var w = W - 200;
	var offsetX = 100;
	
	
	r.h_vignette = Math.ceil((H-(r.nb_h+1)*margin)/r.nb_h);
	// r.nb_w = Math.floor(w / r.h_vignette);
	r.w_vignette = Math.ceil((w-(r.nb_w+1)*margin)/r.nb_w);
	
	for(var i = 0; i < r.nb_w; i++) {
		r.coords_titles_w[i] = offsetX + (r.w_vignette/2) + (r.w_vignette*i) + (margin*(i+1));
	}
	for(var i = 0; i < r.nb_h; i++) {
		r.coords_titles_h[i] = (r.h_vignette/2) + (r.h_vignette*i) + (margin*(i+1));
	}
}


Recit_Menu.prototype.generate = function() {
	
	var k = 0;
	for(var i = 0; i < this.nb_h; i++) {
		this.vignettes[i] = new Array();
		this.titles[i] = new Array();
		
		for(var j = 0; j < this.nb_w; j++) {
			if(k < this.titles_value.length) {
				// Affichage des vignettes
				this.vignettes[i][j] = new Image(res('menu_recit_vignette'));
				this.vignettes[i][j].setScaleXY(
					getScale(this.vignettes[i][j].w, this.w_vignette),
					getScale(this.vignettes[i][j].h, this.h_vignette)
				);
				this.vignettes[i][j].setCenterXY(
					this.coords_titles_w[j],
					this.coords_titles_h[i]
				);
				this.vignettes[i][j].display();
				
				// Affichage des titres
				this.titles[i][j] = new Word(this.titles_value[k]);
				this.titles[i][j].setZoom(0.6);
				if(this.titles[i][j].getWidth() > this.w_vignette - margin) {
					this.titles[i][j].setZoom(1);
					this.titles[i][j].setZoom(getScale(this.titles[i][j].getWidth(), this.w_vignette - margin));
				}
				this.titles[i][j].setCenterXY(
					this.coords_titles_w[j],
					this.coords_titles_h[i]
				);
				this.titles[i][j].display();
				
				// Evènements
				Event.onTap('vignettes_'+k, this.vignettes[i][j], function(k) { return function() { Recit.openStory(k); }}(k), true);
			}
			k++;
		}
	}
}

/* Text input */
Recit_Menu.prototype.textInput = function() {
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

Recit_Menu.prototype.textInputWord = function() {
	Destroy.objet(this.word_searched);
	this.word_searched = new Word(this.word_searched_value);
	this.word_searched.setCenterXY(W/2, 15 + this.input_text.h / 2);
	this.word_searched.display();
}

/* onValid */
Recit_Menu.prototype.onValid = function(handler) {
	this.fct_onValid = handler;
}
Recit_Menu.prototype.valid = function() {
	this.police_searched[0] = 0;
	this.fct_onValid(this.word_searched_value, this.police_searched);
}

scriptLoaded('src/recit/menu.js');
