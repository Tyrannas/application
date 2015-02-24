/*
	Class Gui
*/
function Gui() {
	this.margin = margin;
}

Gui.prototype.MenuPrincipal = function() {
	this.menuButton(function() { Intro.start(); });
};

Gui.prototype.Editeur_classic_displayRecherche = function() {
	this.Editeur_classic_button_up();
	this.Editeur_classic_button_down();
	this.backButton(function() { Editeur.start(); } );
};

Gui.prototype.Editeur_displayAll = function() {
	this.menuButton();
	this.Editeur_multilignes_save();
	this.Editeur_multilignes_erase();
};
Gui.prototype.Editeur_returnMain = function() {
	this.backButton(function() { Editeur.start(); } );
	//this.backButton(function() { Labo.start(); } );
};

Gui.prototype.Recit_displayAll = function() {
	// this.menuButton();
	this.backButton(function() { Recit.start(); } );
	// Gui.Recit.storiesBtn();
	// Gui.Recit.nextBtn();
	// Gui.Recit.lastBtn();
};

Gui.prototype.Recit_menu_displayAll = function() {
	this.menuButton();
	// Gui.Recit.storiesBtn();
	// Gui.Recit.nextBtn();
	// Gui.Recit.lastBtn();
};

Gui.prototype.Labo_displayAll = function() {
	// this.menuButton();
	this.Labo_button_up();
	this.Labo_button_down();
	// this.Labo_button_clear();
	this.backButton(function() { Labo.start(); } );
	// this.Labo_nextButton();
	// this.Labo_previousButton();
	// Gui.Labo.policeBtn();
};

Gui.prototype.Labo_menu_displayAll = function() {
	this.menuButton();
	// this.Labo_button_up();
	// this.Labo_button_down();
	// this.backButton(function() { Labo.start(); } );
	// this.Labo_nextButton();
	// this.Labo_previousButton();
	// Gui.Labo.policeBtn();
};

// COMMUNS
Gui.prototype.menuButton = function(handler) {
	this.logo_min = new Image(res('gui_logo'));
	this.logo_min.setSizeWH(size_icon, size_icon);
	this.logo_min.setXY(this.margin, H - this.logo_min.getHeight() - this.margin);
	this.logo_min.display();
	
	if (handler === undefined) {
		Event.onTap('logo_min_to_menu', this.logo_min, Menu.start, false);
	} else {
		Event.onTap('logo_sep_generic', this.logo_min, handler, false);
	}
};

Gui.prototype.backButton = function(handler) {
	this.arrow_back = new Image(res('gui_arrow_back'));
	this.arrow_back.setSizeWH(size_icon, size_icon);
	this.arrow_back.setXY(this.margin, H - this.arrow_back.getHeight() - this.margin);
	this.arrow_back.display();
	
	Event.onTap('arrow_back', this.arrow_back, handler, false);
};

// LABO
Gui.prototype.Labo_nextButton = function() {
	this.labo_next_button = new Image(res('gui_arrow_right'));
	this.labo_next_button.setSizeWH(size_icon, size_icon);
	this.labo_next_button.setXY(W - this.labo_next_button.getWidth() - this.margin, this.margin);
	this.labo_next_button.display();
	
	Event.onTap('labo_next_button', this.labo_next_button, function() { Labo.nextPage(); }, true);
};

Gui.prototype.Labo_previousButton = function() {
	this.labo_previous_button = new Image(res('gui_arrow_left'));
	this.labo_previous_button.setSizeWH(size_icon, size_icon);
	this.labo_previous_button.setXY(this.margin, this.margin);
	this.labo_previous_button.display();
	
	Event.onTap('labo_previous_button', this.labo_previous_button, function() { Labo.previousPage(); }, true);
};

Gui.prototype.Labo_button_up = function() {
	this.labo_button_up = new Image(res('gui_roll_up'));
	this.labo_button_up.setSizeWH(size_icon, size_icon);
	this.labo_button_up.setX(W-this.labo_button_up.getWidth()-this.margin);
	this.labo_button_up.setY(this.margin);
	this.labo_button_up.display();
	
	Event.onTap('labo_button_up', this.labo_button_up, function() { Labo.scrollUp(); }, true);
};

Gui.prototype.Labo_button_down = function() {
	this.labo_button_down = new Image(res('gui_roll_down'));
	this.labo_button_down.setSizeWH(size_icon, size_icon);
	this.labo_button_down.setX(W-this.labo_button_down.getWidth()-this.margin);
	this.labo_button_down.setY(H-this.labo_button_down.getHeight()-this.margin);
	this.labo_button_down.display();
	
	Event.onTap('labo_button_down', this.labo_button_down, function() { Labo.scrollDown(); }, true);
};

// Gui.prototype.Labo_button_clear = function() {
// 	this.labo_button_clear = new Image(res('gui_clear'));
// 	this.labo_button_clear.setXY(3*this.margin+50, H - this.labo_button_clear.h - this.margin);
// 	this.labo_button_clear.display();
	
// 	Event.onTap('labo_button_clear', this.labo_button_clear, function() { MyStorage.clearWords(); }, true);
// };

Gui.prototype.Labo_nextButtonHide = function() { this.labo_next_button.setAlpha(0); };
Gui.prototype.Labo_previousButtonHide = function() { this.labo_previous_button.setAlpha(0); };
Gui.prototype.Labo_nextButtonShow = function() { this.labo_next_button.setAlpha(1); };
Gui.prototype.Labo_previousButtonShow = function() { this.labo_previous_button.setAlpha(1); };


// Editeur

Gui.prototype.Editeur_classic_button_up = function() {
	this.editeur_classic_button_up = new Image(res('gui_scroll_up'));
	this.editeur_classic_button_up.setSizeWH(size_icon, size_icon);
	this.editeur_classic_button_up.setX(this.editeur_classic_button_up.getWidth()+this.margin*2);
	this.editeur_classic_button_up.setY(this.margin);
	this.editeur_classic_button_up.display();
	
	Event.onTap('editeur_classic_button_up', this.editeur_classic_button_up, Editeur.scrollUp, true);
};

Gui.prototype.Editeur_classic_button_down = function() {
	this.editeur_classic_button_down = new Image(res('gui_scroll_down'));
	this.editeur_classic_button_down.setSizeWH(size_icon, size_icon);
	this.editeur_classic_button_down.setX(this.editeur_classic_button_down.getWidth()+this.margin*2);
	this.editeur_classic_button_down.setY(H-this.margin-this.editeur_classic_button_down.getHeight());
	this.editeur_classic_button_down.display();
	
	Event.onTap('editeur_classic_button_down', this.editeur_classic_button_down, Editeur.scrollDown, true);
};

Gui.prototype.Editeur_multilignes_save = function() {
	this.editeur_multilignes_save = new Word('save');
	this.editeur_multilignes_save.setCenterXY(2*W/3, H-this.margin-size_icon/2);
	this.editeur_multilignes_save.display();
	
	this.editeur_multilignes_save.onTap(Editeur.multilignes.save);
};
Gui.prototype.Editeur_multilignes_erase = function() {
	this.editeur_multilignes_erase = new Word('erase');
	this.editeur_multilignes_erase.setCenterXY(W/3, H-this.margin-size_icon/2);
	this.editeur_multilignes_erase.display();
	
	this.editeur_multilignes_erase.onTap(Editeur.multilignes.erase);
};

// Aide visuelle
Gui.prototype.Aide_hand = function(data) {
	var hand = new Image(res('help_hand'));
	offset = {'x':-hand.getWidth()*1/2,'y':-hand.getHeight()*1/6};
	hand.setXY(data.x0 + offset.x, data.y0 + offset.y);
	//hand.setScaleY(getScale(hand.getHeight(), data.h));
	hand.display();
	hand.setAlpha(0);

	function step1() {
		Tween.get(hand.bmp).to({ //TODO .bmp -> getNode() (3 fois)
			'alpha': 1,
		}, data.speed).call(step2);
	}
	function step2() {
		Tween.get(hand.bmp).to({
			'x': data.x1 + offset.x,
			'y': data.y1 + offset.y,
		}, data.speed * 2).call(step3);
	}
	function step3() {
		Tween.get(hand.bmp).to({
			'alpha': 0,
		}, data.speed).call(function(){
			hand.destroy();
		});
	}
	step1();
};

scriptLoaded('src/lib_separation/gui/gui.js');
