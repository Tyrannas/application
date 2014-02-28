function RecitCommon(json_def) {
	this.lines = new Array();
	this.nb = 0;
	this.type = 'none';
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

//Ajout d'une line
RecitCommon.prototype.addLine = function(new_line) {
	this.lines[this.nb] = new_line;
	this.nb++;
}

//Modif d'une line
//Retourne true si la modif a eu lieu
RecitCommon.prototype.changeLine = function(new_line, line_nbr) {
	if (line_nbr < this.nb) {
		this.lines[line_nbr].destroy();
		this.lines[line_nbr] = new_line;
		return true
	}
	else
		return false
}

//Ajout d'une line en JSON (liste de words)
RecitCommon.prototype.addJsonLine = function(json) {
	//Creation d'une nouvelle ligne
	var new_line = new Line();
	new_line.fromJson(json);
	//Ajout de la ligne
	this.lines[this.nb] = new_line;
	this.nb++;
}

//Modif d'une line en JSON (liste de words)
//Retourne true si la modif a eu lieu
RecitCommon.prototype.changeJsonLine = function(json, line_nbr) {
	if (line_nbr < this.nb) {
		//Destruction de la ligne
		this.lines[line_nbr].destroy();
		//Construction d'une nouvelle
		var new_line = new Line();
		new_line.fromJson(json);
		//Remplacement
		this.lines[line_nbr] = new_line;
		return true
	}
	else
		return false
}

//Intialise le recit à partir d'un objet json
RecitCommon.prototype.setFromJson = function(json) {
	for (var i=0; i<json.lines.length; i++) {
		this.addJsonLine(json.lines[i]);
	}
	this.type = json.type;
}

/*
 * Renvoit un objet json avec les attributs de la classe mere
 */
RecitCommon.prototype.getJson = function() {
	json = new Object();
	json.lines = new Array();
	for (var i=0; i<this.nb; i++) {
		json.lines[i] = this.lines[i].getJson();
	}
	json.type = this.type;
	return json;
}

//Generation des phrases
RecitCommon.prototype.generate = function() {
	for (var i=0; i<this.nb; i++) {
		this.lines[i].generate();
	}
}


//Affichage des lignes
RecitCommon.prototype.display = function() {
	for (var i=0; i<this.nb; i++){
		this.lines[i].display();
	}
}


//Detruit une ligne
RecitCommon.prototype.destroyLine = function(line_nbr) {
	if (line_nbr < this.nb) {
		this.lines[line_nbr].destroy();
		this.lines.splice(line_nbr, 1);
		this.nb--;
		return true;
	}
	else
		return false;
}

//Destructeur
RecitCommon.prototype.destroy = function() {
	for (var i=0; i<this.nb; i++){
		Destroy.arrayObjet(this.lines);
	}
	this.nb = 0;
}

/*
 * SETTER/GETTER
 */
RecitCommon.prototype.setXY = function(x, y) {
	this.x = x;
	this.y = y;
	for (var i=0; i<this.nb; i++) {
		var step = ((i+1) / (this.nb+1))*this.y_size;
		this.lines[i].setCenterX(this.x + this.getWidth()/2); 
		this.lines[i].setCenterY(this.y + step);
	}
}

RecitCommon.prototype.setCenterXY = function(x, y) {
	x = x - this.getWidth()/2;
	y = y - this.y_size/2;
	this.setXY(x, y);
}


RecitCommon.prototype.getWidth = function() {
	var width = 0;
	for (var i=0; i<this.nb; i++) {
		if (width < this.lines[i].getWidth()) {
			width = this.lines[i].getWidth();
		}
	}
	return width;
}

RecitCommon.prototype.setYsize = function(y_size) { this.y_size = y_size; }
RecitCommon.prototype.getX = function() { return this.x; }
RecitCommon.prototype.getY = function() { return this.y; }
RecitCommon.prototype.getCenterX = function() { return this.getX() + this.getWidth() / 2; }
RecitCommon.prototype.getCenterY = function() { return this.getY() + this.getHeight() / 2; }
RecitCommon.prototype.getYsize = function() { return this.y_size; }

scriptLoaded('src/recit/types/common.js');
