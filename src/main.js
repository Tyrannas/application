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
	
	//Initialisation de l'inputbox
	inputbox = document.createElement('div');
	inputboxcontainer = document.createElement('div');
	inputboxbuttoncontainer = document.createElement('div');
	inputbox.setAttribute('class', 'inputbox');
	inputboxcontainer.setAttribute('class', 'inputboxcontainer');
	inputboxbuttoncontainer.setAttribute('class', 'inputboxbuttoncontainer');
	
	inputbox.style.width = W * 40/100 + "px";
	inputbox.style.height = H * 50/100 + "px";
	inputbox.style.opacity = 0;
	
	//Positionnement de la boite
	inputbox.style.left = (W - W * 40/100)/2 + "px";
	inputbox.style.top = (H - H * 50/100)/2 + "px";
	
	document.body.appendChild(inputbox);
	inputbox.appendChild(inputboxcontainer)
	inputboxcontainer.appendChild(inputboxbuttoncontainer);

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
	sound_manager.play("ambiant");
	Intro.start();
	// Menu.start();
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
