/************************************************************
	@description
		Fichier JS principal, contient :
		- La fonction main() pour démarrer l'application
		- Le namespace App contenant la fonction d'initialisation
		  et la boucle principale de l'application
*************************************************************/

// Namespace App
var App = {};

App.init = function() {
	// Initialisation du canvas
	canvas = CocoonJS.App.createScreenCanvas();
	GUIcanvas = document.createElement('canvas');

	GUIcanvas.width = W;// * window.devicePixelRatio;
	GUIcanvas.height = H;// * window.devicePixelRatio;

	document.body.appendChild(canvas);
	document.body.appendChild(GUIcanvas);

	// Initialisation du stage
	stage = new createjs.Stage(canvas);
	ctx = stage.canvas.getContext('2d');
	createjs.Touch.enable(stage);
	
	// On enlève le lissage
	// if(ctx.imageSmoothingEnabled) {ctx.imageSmoothingEnabled = false;}
	// if(ctx.webkitImageSmoothingEnabled) {ctx.webkitImageSmoothingEnabled = false;}
	// if(ctx.mozImageSmoothingEnabled) {ctx.mozImageSmoothingEnabled = false;}
	// if(ctx.oImageSmoothingEnabled) {ctx.oImageSmoothingEnabled = false;}
	
	GUIstage = new createjs.Stage(GUIcanvas);
	GUIstage.nextStage = stage;
	// ctx = GUIstage.canvas.getContext('2d');
	createjs.Touch.enable(GUIstage);
	
	gui = new Gui();
	
	// Initialisation des events
	stage.on(events['tap'], function(event) { Event.tap(event); });
	GUIcanvas.addEventListener(events['touchmove'], function(event) { Event.touchmove(event); });
	
	// if(appOnDevice()) {
		// canvas.addEventListener('touchend', function(event) { Event.touchend(event); });
	// }
	// else {
		// stage.on('mouseleave', function(event) { Event.touchend(event); });
	// }
	
	// Initialisation des FPS
	createjs.Ticker.setFPS(NB_FPS);
	
	initConstantes();
	
	Destroy.all();
}

App.mainLoop = function() {
	stage.update();
	GUIstage.update();
}

App.start = function() {
	Sound.init();
	ambiant_instance.play();
	Intro.start();
	// Menu.start();
}

// Démarrage de l'application
function main() {
	App.init();
	
	createjs.Ticker.addEventListener("tick", function() {
		App.mainLoop();
	});

	Rooter.preloadAll(function(){	
		App.start();
	});
}

scriptLoaded('src/main.js');
