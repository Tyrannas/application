/** 
 *	Classe RecitType classique
 *
 *	Dans ce type la ligne 0 est particulère, c'est le titre
 *	Les lignes 1 à N sont classiques
 */

function RecitType_classic(json_def) {
	RecitCommon.apply(this); //Heritage partie 1
	this.type = 'classic';
	if (json_def != undefined) {
		this.setFromJson(json_def);
		/*
		line = new Line();
		line.add(new Word('Demi tour'));
		this.addLine(line);
		line = new Line();
		line.add(new Word('marche', 'arriere', 1, 'IIIIIIILIIL').setZoom(2));
		this.addLine(line);
		*/
	}
	this.setYsize(H);
	this.setCenterXY(W/2,H/3);
	this.generate();
	console.log(JSON.stringify(this.getJson()));
}

RecitType_classic.prototype = new RecitCommon(); //Heritage partie 2

//Intialise le recit à partir d'un objet json
RecitType_classic.prototype.setFromJson = function(json) {
	for (var i=0; i<json.lines.length; i++) {
		this.addJsonLine(json.lines[i]);
	}
}

//Retourne un objet json
RecitType_classic.prototype.getJson = function() {
	var json = RecitCommon.prototype.getJson.apply(this);
	json.type = this.type;
	return json;
}

//Generation des phrases
RecitType_classic.prototype.generate = function() {
	for (var i=0; i<this.nb; i++) {
		this.lines[i].generate();
	}
}

RecitType_classic.prototype.setXY = function(x, y) {
	this.x = x;
	this.y = y;
	for (var i=0; i<this.nb; i++) {
		var step = ((i+1) / (this.nb+1))*this.y_size;
		this.lines[i].setCenterX(this.x + this.getWidth()/2); 
		this.lines[i].setCenterY(this.y + step);
	}
}

RecitType_classic.prototype.setCenterXY = function(x, y) {
	x = x - this.getWidth()/2;
	y = y - this.y_size/2;
	this.setXY(x, y);
}

RecitType_classic.prototype.getWidth = function() {
	var width = 0;
	for (var i=0; i<this.nb; i++) {
		if (width < this.lines[i].getWidth()) {
			width = this.lines[i].getWidth();
		}
	}
	return width;
}

RecitType_classic.prototype.setYsize = function(y_size) { this.y_size = y_size; }
RecitType_classic.prototype.getX = function() { return this.x; }
RecitType_classic.prototype.getY = function() { return this.y; }
RecitType_classic.prototype.getCenterX = function() { return this.getX() + this.getWidth() / 2; }
RecitType_classic.prototype.getCenterY = function() { return this.getY() + this.getHeight() / 2; }
RecitType_classic.prototype.getYsize = function() { return this.y_size; }

scriptLoaded('src/recit/type/classic.js');
