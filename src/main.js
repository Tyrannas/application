/************************************************************
	@description
		Fichier JS principal, contient :
		- La fonction main() pour démarrer l'application
		- Le namespace App contenant la fonction d'initialisation
		  et la boucle principale de l'application
*************************************************************/
var App = App || {};
// Namespace App
(function () {
	App.init = function() {
		// Initialisation du canvas
		canvas = document.createElement('canvas');//CocoonJS.App.createScreenCanvas();
		GUIcanvas = document.createElement('canvas');

		canvas.width = W;
		canvas.height = H;
		GUIcanvas.width = W;// * window.devicePixelRatio;
		GUIcanvas.height = H;// * window.devicePixelRatio;

		document.body.appendChild(canvas);
		// document.body.appendChild(GUIcanvas);

		// Initialisation du stage
		stage = new createjs.Stage(canvas);
		ctx = stage.canvas.getContext('2d');
		// createjs.Touch.enable(stage);

		
		
		// On enlève le lissage
		// if(ctx.imageSmoothingEnabled) {ctx.imageSmoothingEnabled = false;}
		// if(ctx.webkitImageSmoothingEnabled) {ctx.webkitImageSmoothingEnabled = false;}
		// if(ctx.mozImageSmoothingEnabled) {ctx.mozImageSmoothingEnabled = false;}
		// if(ctx.oImageSmoothingEnabled) {ctx.oImageSmoothingEnabled = false;}
		
		GUIstage = stage;//new createjs.Stage(GUIcanvas);
		// stage.nextStage = GUIstage;
		// ctx = GUIstage.canvas.getContext('2d');
		createjs.Touch.enable(stage);
		
		gui = new Gui();
		
		// Initialisation des events
		stage.on(Event.events.tap, Event.tap);
		canvas.addEventListener(Event.events.touchmove, Event.touchmove);
		document.addEventListener(Event.events.touchend, Event.touchend);
		
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
})();

scriptLoaded('src/main.js');
