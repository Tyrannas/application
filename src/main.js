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
	canvas = document.createElement((navigator.isCocoonJS)?'screencanvas':'canvas');
	ctx = canvas.getContext();
	
	canvas.width = W;
	canvas.height = H;
	canvas.style.backgroundColor = C_BACK;
	document.body.appendChild(canvas);
	
	// Initialisation du stage
	stage = new createjs.Stage(canvas);
	createjs.Touch.enable(stage);
	// stage.enableMouseOver();
	
	// Initialisation des events
	var hit_area = new createjs.Shape();
	hit_area.graphics
		.beginFill(C_BACK)
		.drawRect(0, 0, W, H)
		.endFill();
	hit_area.cache(0, 0, W, H);
	// hit_area.alpha = 0;
	stage.addChild(hit_area);
	hit_area.on(events['tap'], function(event) { Event.tap(event); });
	stage.on(events['touchmove'], function(event) { Event.touchmove(event); });
	
	// Initialisation des FPS
	createjs.Ticker.setFPS(NB_FPS);
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
	
	createjs.Ticker.addEventListener("tick", function() {
		App.mainLoop();
	});
	
	App.start();
}

scriptLoaded('src/main.js');
