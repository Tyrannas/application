/*
	Class Gui
*/
function Gui() {
	this.margin = 10;
}

Gui.prototype.Editeur_classic_displayRecherche = function() {
	this.Editeur_classic_button_up();
	this.Editeur_classic_button_down();
	this.backButton(function() { Editeur.start(); } );
}

Gui.prototype.Editeur_displayAll = function() {
	this.backButton(function() { Editeur.start(); } );
}

Gui.prototype.Recit_displayAll = function() {
	// this.menuButton();
	this.backButton(function() { Recit.start(); } );
	// Gui.Recit.storiesBtn();
	// Gui.Recit.nextBtn();
	// Gui.Recit.lastBtn();
}
Gui.prototype.Recit_menu_displayAll = function() {
	this.menuButton();
	this.Recit_button_clear();
	// Gui.Recit.storiesBtn();
	// Gui.Recit.nextBtn();
	// Gui.Recit.lastBtn();
}
Gui.prototype.Labo_displayAll = function() {
	// this.menuButton();
	this.Labo_button_up();
	this.Labo_button_down();
	this.Labo_button_save();
	this.Labo_button_clear();
	this.backButton(function() { Labo.start(); } );
	// this.Labo_nextButton();
	// this.Labo_previousButton();
	// Gui.Labo.policeBtn();
}
Gui.prototype.Labo_menu_displayAll = function() {
	this.menuButton();
	// this.Labo_button_up();
	// this.Labo_button_down();
	// this.backButton(function() { Labo.start(); } );
	// this.Labo_nextButton();
	// this.Labo_previousButton();
	// Gui.Labo.policeBtn();
}

Gui.prototype.Recit_button_clear = function() {
	this.recit_button_clear = new Image(res('gui_clear'));
	this.recit_button_clear.setXY(2*this.margin+50, H - this.recit_button_clear.h - this.margin);
	this.recit_button_clear.display();
	
	Event.onTap('recit_button_clear', this.recit_button_clear, function() { MyStorage.clearStories(); }, true);
}

// COMMUNS
Gui.prototype.menuButton = function() {
	this.logo_min = new Image(res('gui_logo'));
	this.logo_min.setXY(this.margin, H - this.logo_min.h - this.margin);
	this.logo_min.display();
	
	Event.onTap('logo_min_to_menu', this.logo_min, function() { Menu.start(); }, false);
}
Gui.prototype.backButton = function(handler) {
	this.arrow_back = new Image(res('gui_arrow_back'));
	this.arrow_back.setXY(this.margin, H - this.arrow_back.h - this.margin);
	this.arrow_back.display();
	
	Event.onTap('arrow_back', this.arrow_back, handler, false);
}

// LABO
Gui.prototype.Labo_nextButton = function() {
	this.labo_next_button = new Image(res('gui_arrow_right'));
	this.labo_next_button.setXY(W - this.labo_next_button.w - this.margin, this.margin);
	this.labo_next_button.display();
	
	Event.onTap('labo_next_button', this.labo_next_button, function() { Labo.nextPage(); }, true);
}
Gui.prototype.Labo_previousButton = function() {
	this.labo_previous_button = new Image(res('gui_arrow_left'));
	this.labo_previous_button.setXY(this.margin, this.margin);
	this.labo_previous_button.display();
	
	Event.onTap('labo_previous_button', this.labo_previous_button, function() { Labo.previousPage(); }, true);
}
Gui.prototype.Labo_button_up = function() {
	this.labo_button_up = new Image(res('gui_roll_up'));
	// this.labo_button_up.setCenterX(W*2/3-80);
	this.labo_button_up.setX(W-this.labo_button_up.w-this.margin);
	this.labo_button_up.setY(0);
	this.labo_button_up.display();
	
	Event.onTap('labo_button_up', this.labo_button_up, function() { Labo.scrollUp(); }, true);
}
Gui.prototype.Labo_button_down = function() {
	this.labo_button_down = new Image(res('gui_roll_down'));
	// this.labo_button_down.setCenterX(W*2/3-80);
	this.labo_button_down.setX(W-this.labo_button_down.w-this.margin);
	this.labo_button_down.setY(H-this.labo_button_down.h);
	this.labo_button_down.display();
	
	Event.onTap('labo_button_down', this.labo_button_down, function() { Labo.scrollDown(); }, true);
}

Gui.prototype.Labo_button_save = function() {
	this.labo_button_save = new Image(res('gui_sauvegarde'));
	this.labo_button_save.setXY(2*this.margin+50, H - this.labo_button_save.h - this.margin);
	this.labo_button_save.display();
	
	Event.onTap('labo_button_save', this.labo_button_save, function() { Labo.saveWord(); }, true);
}

Gui.prototype.Labo_button_clear = function() {
	this.labo_button_clear = new Image(res('gui_clear'));
	this.labo_button_clear.setXY(3*this.margin+100, H - this.labo_button_clear.h - this.margin);
	this.labo_button_clear.display();
	
	Event.onTap('labo_button_clear', this.labo_button_clear, function() { MyStorage.clearWords(); }, true);
}

Gui.prototype.Labo_nextButtonHide = function() { this.labo_next_button.setAlpha(0); }
Gui.prototype.Labo_previousButtonHide = function() { this.labo_previous_button.setAlpha(0); }
Gui.prototype.Labo_nextButtonShow = function() { this.labo_next_button.setAlpha(1); }
Gui.prototype.Labo_previousButtonShow = function() { this.labo_previous_button.setAlpha(1); }


// Editeur

Gui.prototype.Editeur_classic_button_up = function() {
	this.editeur_classic_button_up = new Image(res('gui_roll_up_left'));
	this.editeur_classic_button_up.setX(this.editeur_classic_button_up.w+this.margin);
	this.editeur_classic_button_up.setY(0);
	this.editeur_classic_button_up.display();
	
	Event.onTap('editeur_classic_button_up', this.editeur_classic_button_up, function() { Editeur.scrollUp(); }, true);
}

Gui.prototype.Editeur_classic_button_down = function() {
	this.editeur_classic_button_down = new Image(res('gui_roll_down_left'));
	this.editeur_classic_button_down.setX(this.editeur_classic_button_down.w+this.margin);
	this.editeur_classic_button_down.setY(H-this.editeur_classic_button_down.h-50-this.margin);
	this.editeur_classic_button_down.display();
	
	Event.onTap('editeur_classic_button_down', this.editeur_classic_button_down, function() { Editeur.scrollDown(); }, true);
}

/*
// labo GUI




Gui.Labo.policeBtn = function() {
	var zoom = zoomCoef;
	
	var policeBtn = new Word(" P ",null,4);		policeBtn.setZoom(zoom);
	policeBtn.setX(W - policeBtn.getWidth());
	policeBtn.setY(H - policeBtn.getHeight() / 4);
	policeBtn.display();
	policeBtn.onTap(function(){Labo.menu()});
}



// Recit GUI

Gui.Recit.menuNextBtn = function() {
	var zoom = zoomCoef;
	
	var nextBtn = new Word(" > ", null, 4);		nextBtn.setZoom(zoom);
	nextBtn.setX(W - nextBtn.getWidth());
	nextBtn.setY(0);
	nextBtn.display();
	nextBtn.onTap(function(){
		if(story_page<(xmlList.length/nb_recit_max)) {
			Recit.displayStoriesMenu();
		}
	});
}

Gui.Recit.menuLastBtn = function() {
	var zoom = zoomCoef;

	var lastBtn = new Word(" < ", null, 4);		lastBtn.setZoom(zoom);
	lastBtn.setX(0);
	lastBtn.setY(0);
	lastBtn.display();
	lastBtn.onTap(function(){
		if(story_page>1) {
			story_page--;
			Recit.displayStoriesMenu();
		}
	});
}

Gui.Recit.menuDisplayAll = function() {
	Gui.homeBtn();
	// Gui.Recit.menuNextBtn();
	// Gui.Recit.menuLastBtn();
}

Gui.Recit.storiesBtn = function () {
	var zoom = zoomCoef;
	
	var storiesBtn = new Word(" R", null, 4);	storiesBtn.setZoom(zoom);
	storiesBtn.setX(W - storiesBtn.getWidth());
	storiesBtn.setY(H - storiesBtn.getHeight() / 2);
	storiesBtn.display();
	storiesBtn.onTap(function(){Recit.start();});
}

Gui.Recit.nextBtn = function() {
	var zoom = zoomCoef;
	
	var nextBtn = new Word(" > ", null, 4);		nextBtn.setZoom(zoom);
	nextBtn.setX(W - nextBtn.getWidth());
	nextBtn.setY(0);
	nextBtn.display();
	nextBtn.onTap(function(){}); // A COMPLETER !!!
}

Gui.Recit.lastBtn = function() {
	var zoom = zoomCoef;
	
	var lastBtn = new Word(" < ", null, 0);		lastBtn.setZoom(zoom);
	lastBtn.setX(0);
	lastBtn.setY(0);
	lastBtn.display();
	lastBtn.onTap(function(){}); // A COMPLETER !!!
}
*/

scriptLoaded('src/lib_separation/gui/gui.js');
