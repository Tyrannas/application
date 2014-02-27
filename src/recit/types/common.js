function RecitCommon() {
	this.lines = new Array();
	this.nb = 0;
	this.type = 'none';
	this.x = 0;
	this.y = 0;
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

//Affichage des lignes
RecitCommon.prototype.display = function() {
	for (var i=0; i<this.nb; i++){
		this.lines[i].display();
	}
}

//Destructeur
RecitCommon.prototype.destroy = function() {
	for (var i=0; i<this.nb; i++){
		Destroy.arrayObjet(this.lines);
	}
	this.nb = 0;
}

scriptLoaded('src/recit/type/common.js');
