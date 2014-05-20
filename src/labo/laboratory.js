/**
	Namespace Labo
**/
var Labo = {};

var cloud = null;
var recherche = null;
var Labo_menu = null;
// var page = 1;
// var nb_pages = 1;

var ask_to_scroll_up = 0;
var ask_to_scroll_down = 0;

Labo.start = function() {	
	Labo.menu();
}

Labo.menu = function() {
	Destroy.all();
	
	gui.Labo_menu_displayAll();
	if(Labo_menu == null) Labo_menu = new Labo_Menu(); else Labo_menu.generate();
	Labo_menu.onValid(function(word_searched, police) { 
		Labo.generateRecherche(word_searched, police);
	});
};

function inArray(array, p_val) {
    var l = array.length;
    for(var i = 0; i < l; i++) {
        if(array[i] == p_val) {
            return true;
        }
    }
    return false;
}

Labo.generateRecherche = function(word_searched, police) {
	Destroy.all();
	
	recherche = new Recherche();
	recherche.addCentralWord(new Word(word_searched));

	setTimeout(function(){
		// var p = Db.wordPossibilities(word_searched); // bdd interne (REMOVED TEMP)
		var p = Xml.importLabRequest(word_searched); // bdd externe
		var p2 = new Array();
		for(var i = 0; i < p.length; i++) {
			if(inArray(police, p[i].getPolice())) {
				p2.push(p[i]);
			}
		}
		if(p2.length > 0)
		{
			recherche.setPossibilities(p2);
			Labo.displayRecherche();
		}
		else
		{
			alert("Aucune correspondance.");
			Labo.menu();
		}
	}, 100);
}

Labo.displayRecherche = function() {
	Destroy.all();
	gui.Labo_displayAll();
	// if(page == 1) gui.Labo_previousButtonHide();
	// if(page == nb_pages) gui.Labo_nextButtonHide();
	
	recherche.generate(0);
	recherche.display();
}

/* DEPRECATED
Labo.nextPage = function() {
	if(page < nb_pages) {
		page++;
		if(page == 2) gui.Labo_previousButtonShow();
		Labo.displayCloud();
	}
}
Labo.previousPage = function() {
	if(page > 1) {
		page--;
		if(page == nb_pages - 1) gui.Labo_previousButtonShow();
		Labo.displayCloud();
	}
}
*/
Labo.scrollUp = function() {
	if(!recherche.inTransform) {
		if(!recherche.inAnimation)
			recherche.scrollUp();
		else
			ask_to_scroll_up++;
	}
}
Labo.scrollDown = function() {
	if(!recherche.inTransform) {
		if(!recherche.inAnimation)
			recherche.scrollDown();
		else
			ask_to_scroll_down++;
	}
}
Labo.scrollFinish = function() {
	// On annule les évènements contraires
	while(ask_to_scroll_up > 0 && ask_to_scroll_down > 0) { ask_to_scroll_up--; ask_to_scroll_down--; }
	
	if(ask_to_scroll_up > 0) {
		ask_to_scroll_up--;
		Labo.scrollUp();
	}
	else if(ask_to_scroll_down > 0) {
		ask_to_scroll_down--;
		Labo.scrollDown();
	}
}
Labo.transform = function() {
	ask_to_scroll_up = ask_to_scroll_down = 0;
	recherche.transform();
}

Labo.saveWord = function() {
	word = new Word(recherche.central_word.getValue());
	word.setNextValue(recherche.words[recherche.nb_side].getValue());
	word.setPolice(recherche.words[recherche.nb_side].getPolice());
	word.setCode(recherche.words[recherche.nb_side].getCode());
	MyStorage.addWord(word);
	console.log("Saved word, new list : " +MyStorage.listWords());
}

Labo.destroy = function() {
	//Destroy.objet(cloud);
	Destroy.objet(recherche);
}

function loadingImg() {
	gui.menuButton();
	var loading = new Word("Chargement");
	
	loading.setCenterX(W/2);
	loading.setCenterY(H/2);
	
	loading.display();
}

scriptLoaded('src/labo/laboratory.js');
