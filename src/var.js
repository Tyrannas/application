/* Constantes */

var DEBUG = true;		// Active le mode débug si true

var NB_FPS = 30;		// Nombre de FPS (Frames Per Second, images par seconde)
var MS_AFF_FPS = 1000;	// Nombre de milisecondes entre deux affichages des FPS
var W = window.innerWidth;	// Largeur de l'écran
var H = window.innerHeight;	// Hauteur de l'écran

var C_BACK = '#000'; // Color background
var C_CONT = '#fff'; // Color content

var TIMEOUT_AIDE1 = {'min':3000, 'max':6000};
var TIMEOUT_AIDE2 = {'min':4000, 'max':7000};

var Tween = createjs.Tween;
var Ease = createjs.Ease;

var margin = 15;

/* Variables */

var canvas;			// Canvas contenant le jeu
var ctx;			// Context2D du canvas
var stage;			// Stage contenant le canvas
var stageGUI;
var gui;

var fontConst;
var fontSize = 28;

var preload;

// Bitmap fonts
var font_h = Math.ceil(H / 10);

var SS = {};

// Codes
var code_polices=[];
code_polices["coupable_bas_min"] = [["o"],["a"],["a"],["a","o"],["a"],["i"],["g"],["ii"],["i","a"],["j"],["ii"],["i"],["iii"],["ii"],["a"],["p"],["q"],["i"],["a"],["i","a"],["a","o"],["b"],["e"],["ii"],["i","g","q"],["z"]];
code_polices["coupable_bas_maj"] = [["II"],["O"],["O","L"],["O"],["L"],["I"],["O"],["II"],["I"],["O"],["II"],["L"],["III"],["II"],["O"],["I"],["Q"],["II"],["O"],["I"],["O"],["V"],["W"],["II"],["I"],["Z"]];
code_polices["coupable_haut_min"] = [["o"],["h"],["o"],["d"],["o"],["f"],["o"],["h"],["i"],["i"],["ii","h"],["l"],["m"],["o"],["o"],["o"],["o"],["o"],["o"],["t"],["ii"],["ii"],["iii"],["ii"],["ii"],["z"]];
code_polices["coupable_haut_maj"] = [["A"],["A"],["A","C"],["A"],["A","C"],["C"],["A"],["II"],["I"],["I","T"],["II"],["I"],["M"],["A","II"],["A"],["A"],["A"],["A"],["A"],["T"],["II"],["II"],["III"],["II"],["II"],["Z"]];
code_polices["centrale"] = [["A"],["B"],["B"],["B"],["B"],["F"],["B"],["H"],["I"],["J"],["H"],["L"],["M"],["A"],["B"],["P"],["Q"],["A"],["B"],["T"],["U"],["V"],["W"],["H"],["Y"],["Z"]];
 
police_list=["coupable_bas_min","coupable_bas_maj","coupable_haut_min","coupable_haut_maj","centrale"];

scriptLoaded('src/var.js');
