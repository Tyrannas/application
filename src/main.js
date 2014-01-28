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
	canvas = document.createElement('canvas');
	/*if (navigator.isCocoonJS)
	canvas.screencanvas = true;*/
	
	canvas.width = W;// * window.devicePixelRatio;
	canvas.height = H;// * window.devicePixelRatio;
	
	// ctx = canvas.getContext();//"experimental-webgl");
	
	//canvas.style.backgroundColor = C_BACK;
	document.body.appendChild(canvas);
	
	// Initialisation du stage
	stage = new createjs.Stage(canvas);
	createjs.Touch.enable(stage);
	// stage.enableMouseOver();
	// stage._handleMouseDown = function(e) {
            // this._handlePointerDown(-1, e, e.pageX, e.pageY);
        // };
	
	// Initialisation des events
	stage.on(events['tap'], function(event) { Event.tap(event); });
	canvas.addEventListener(events['touchmove'], function(event) { Event.touchmove(event); });
	
	if(appOnDevice()) {
		canvas.addEventListener('touchend', function(event) { log('test'); Event.touchend(event); });
	}
	else {
		stage.on('mouseleave', function(event) { Event.touchend(event); });
	}
	
	// Initialisation des FPS
	createjs.Ticker.setFPS(NB_FPS);
	
	Destroy.all();
}

// var old_t_calcul_FPS = getTime(); // Timestamp du dernier calcul du FPS
App.mainLoop = function() {
	/* 
	var t = getTime();
	
	// Affichage des FPS toutes les MS_AFF_FPS
	if(t - old_t_calcul_FPS > MS_AFF_FPS) {
		// TODO Affichage en mode DEBUG
		debug('FPS = ' + Math.round(createjs.Ticker.getMeasuredFPS()));
		old_t_calcul_FPS = t;
	}

	// Mise à jour du stage
	*/
	stage.update();
}

App.start = function() {
	Intro.start();
}

// Démarrage de l'application
function main() {
	log("Démarrage de l'application");
	
	App.init();
	
	log("Fin de l'initialisation");
	
	createjs.Ticker.addEventListener("tick", function() {
		App.mainLoop();
	});
	
	App.start();
}

scriptLoaded('src/main.js');
