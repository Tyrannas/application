/**
        Namespace recit
*/
var Recit = {};
// var DEBUG = false;
var story = null;
var story_page = null;
var recit_menu = null;

var titles = new Array();

//////////////////////////////////////
var xmlList = ["separation", "email"];
//////////////////////////////////////

/*
        Point d'entrée du récit
*/
Recit.start = function() {
	story_page = 1;
	Recit.computeSizes();

	Recit.displayStoriesMenu();
}

Recit.destroy = function() {
	clearStage();

	Destroy.arrayObjet(titles);
	Destroy.objet(story);
	
	word_active = false;
}

Recit.displayStoriesMenu = function() {
	Destroy.all();
	gui.Recit_menu_displayAll();
	
	recit_menu = new Recit_Menu(new Array(
		'Separation', 'Quotidien', 'Antarfrique', 'Derisoire', 'Poste', 'Neige',
		'Infini', 'Paysage', 'Amant', 'Decision', 'Horloge', 'Epluchage'
	));
	recit_menu.generate();
}

Recit.openStory = function(id) {
	if(id == 0 || id == 1) {
		if(id == 0)
			var json='{"type":"classic", "lines":[{"words":[{"value":"Demi tour", "zoom":1}]}, {"words":[{"value":"marche", "next_value":"arriere", "police":1, "code":"IIIIIIIOIIL", "zoom":2}]}]}';
			//var file = 'separation';
		if(id == 1)
			var file = 'quotidien';
		
		Destroy.all();
		gui.Recit_displayAll();

		/*
		story = Xml.importStory(res('story_' + file));
		story.generate(Recit.cst.margin.up);
		story.display();
		*/
		story = new RecitCommon(JSON.parse(json));
		story.display();
	}
}

/*
        Détermination de la taille de la police en fonction de la hauteur du canvas
*/
Recit.computeSizes = function() {
	Recit.cst = fontConst.recit;
	Recit.cst.line.nb = Math.floor(H / Recit.cst.line.height);
}

scriptLoaded('src/recit/recit.js');
