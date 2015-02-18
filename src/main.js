/************************************************************
	@description
		Fichier JS principal, contient :
		- La fonction main() pour démarrer l'application
		- Le namespace App contenant la fonction d'initialisation
		  et la boucle principale de l'application
*************************************************************/
// Namespace App
var App = App || {};

App.init = function() {
	// Initialisation du canvas
	canvas = document.createElement('canvas');
	// GUIcanvas = document.createElement('canvas');

	canvas.width = W;
	canvas.height = H;
	// GUIcanvas.width = W;// * window.devicePixelRatio;
	// GUIcanvas.height = H;// * window.devicePixelRatio;

	document.body.appendChild(canvas);

	// Initialisation du stage
	stage = new createjs.Stage(canvas);
	ctx = stage.canvas.getContext('2d');
	GUIstage = stage;
	createjs.Touch.enable(stage);
	
	gui = new Gui();
	
	// Initialisation des events
	stage.on(Event.events.tap, Event.tap);
	canvas.addEventListener(Event.events.touchmove, Event.touchmove);
	document.addEventListener(Event.events.touchend, Event.touchend);
	window.addEventListener('resize', function () { 
		if(can_reload)
			window.location.reload();
	});
	
	// Initialisation des FPS
	//createjs.Ticker.setFPS(NB_FPS);
	
	initConstantes();
	
	Destroy.all();
};

App.mainLoop = function() {
	stage.update();
	// GUIstage.update();
};

App.start = function() {
	sound_manager = new Sound();
	// sound_manager.play("ambiant");
	// Intro.start();
	Editeur.start();
};

// Démarrage de l'application
App.main = function() {
	App.init();
	
	createjs.Ticker.addEventListener("tick", function() {
		App.mainLoop();
	});

	Rooter.preloadAll(function(){
		App.start();
	});
};

scriptLoaded('src/main.js');
