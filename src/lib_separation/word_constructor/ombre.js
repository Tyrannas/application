/*** TEMP ***/

function Word_ombre(data) {
	/*
	this.container = new Kinetic.Group({
		width: 771/4,
		height: 267/4,
		y: data.cst.police[data.police].offset,
	});

	this.container.add(CYGNE);
	this.container.add(OMBRE);
	
	this.destroy = function() {
		// this.container.destroy();
	}*/
}
/*
var imgs = new Array();
imgs[0] = new Image();
imgs[1] = new Image();

var CYGNE = null;
var OMBRE = null;

if(appOnDevice()) {
	var path = location.pathname;
	var tab = path.split("/");
	imgs[0].src = path.replace(tab[tab.length-1], "imgs/aide/OMBRE.jpg");
	imgs[1].src = path.replace(tab[tab.length-1], "imgs/aide/CYGNE.jpg");
}
else {
	imgs[0].src = "imgs/aide/OMBRE.png";
	imgs[1].src = "imgs/aide/CYGNE.png";
}

this.container = new Kinetic.Group({
	width: 771,
	height: 267,
});
var container_kinetic = this.container;

imgs[0].onload = function() {
	OMBRE = new Kinetic.Image({
		image: imgs[0],
		width: 771/4,
		height: 267/4,
		y: -12,
	});
}
imgs[1].onload = function() {
	CYGNE = new Kinetic.Image({
		image: imgs[1],
		width: 771/4,
		height: 267/4,
		y: -12,
	});
}
*/
scriptLoaded('scripts/libs/separation_toolkit/word_kinetic/ombre.js');
