/* Constantes */

var DEBUG = true;		// Active le mode débug si true

var NB_FPS = 50;		// Nombre de FPS (Frames Per Second, images par seconde)
var MS_AFF_FPS = 1000;	// Nombre de milisecondes entre deux affichages des FPS
var W = window.innerWidth;	// Largeur de l'écran
var H = window.innerHeight;	// Hauteur de l'écran

var C_BACK = '#000'; // Color background
var C_CONT = '#fff'; // Color content

var Tween = createjs.Tween;
var Ease = createjs.Ease;

/* Variables */

var canvas;			// Canvas contenant le jeu
var ctx;			// Context2D du canvas
var stage;			// Stage contenant le canvas

var fontConst;

scriptLoaded('src/var.js');
