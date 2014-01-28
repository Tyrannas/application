/*
	Namespace Destroy
*/
var Destroy = {};

Destroy.objet = function(obj) {
	if(obj != null) {
		obj.destroy();
		obj = null;
	}
}

Destroy.array = function(array) {
	for(var i in array) {
		delete(array[i]);
	}
	array = new Array();
}

Destroy.arrayObjet = function(array) {
	for(var i in array) {
		Destroy.objet(array[i]);
	}
	array = new Array();
}

Destroy.list = function(list) {
	for(var i in list) {
		delete(list[i]);
	}
	list = {};
}

Destroy.listObjet = function(list) {
	for(var i in list) {
		Destroy.objet(list[i]);
	}
	list = {};
}

Destroy.listItem = function(list, i) {
	if(list[i] != undefined) {
		delete(list[i]);
	}
	list = {};
}

Destroy.all = function() {
	stage.removeAllChildren();
	
	Intro.destroy();
	// Menu.destroy();
	// Aide.destroy();
	// Recit.destroy();
	// Labo.destroy();
	
	Event.destroyAll();
	
	var hit_area = new createjs.Shape();
	hit_area.graphics
		.beginFill(C_BACK)
		.drawRect(0, 0, W, H)
		.endFill();
	hit_area.cache(0, 0, W, H);
	stage.addChild(hit_area);
}

scriptLoaded('src/lib_separation/destroy/destroy.js');
