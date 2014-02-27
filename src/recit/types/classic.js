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
	}
	this.y_size = 0;
	this.generate(H, W/2,H/2);
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
RecitType_classic.prototype.generate = function(y_size, x_offset, y_offset) {
	var num_line = 0;
	if (x_offset == undefined)
		x_offset = 0;
	if (y_offset == undefined)
		y_offset = 0;
	this.y_size = y_size;
	this.x = x_offset;
	this.y = y_offset;
	for (var i=0; i<this.nb; i++) {
		//On place la phrase
		this.lines[i].setCenter(true);
		var step = ((i+1) / (this.nb+1))*this.y_size;
		this.lines[i].generate(this.x, -this.y_size/2 + step + this.y);
	}
}

scriptLoaded('src/recit/type/classic.js');
