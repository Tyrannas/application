/*
 * Objet de manipulation du Json
 */

var JsonHandler = new Object();

/*
 * Cree une ligne à partir d'un objet JSON parsé
 */
JsonHandler.lineFromJson = function(json) {
	line = new Line();
	//Ajout des mots à la ligne
	for (var i=0; i < json.words.length; i++) {
		if (i > 0) {
			line.addSpace();
		}
		var json_word = json.words[i];
		var word = new Word(json_word.value, json_word.next_value, json_word.police, json_word.code);
		if (json_word.zoom == undefined) {
			json_word.zoom = 1;
		}
		word.setZoom(json_word.zoom);
		line.add(word);
	}
	return line;
}

/*
 * Retourne le Json d'une ligne
 */
JsonHandler.jsonFromLine = function(line) {
	var json_line = new Object();
	json_line.words = new Array();
	for (var i=0; i<line.nb; i++) {
		json_line.words[i] = new Object();
		json_line.words[i].value = line.words[i].value;
		json_line.words[i].police = line.words[i].police;
		json_line.words[i].next_value = line.words[i].next_value;
		json_line.words[i].code = line.words[i].code;
		json_line.words[i].zoom = line.words[i].getZoom();
	}
	return json_line;
}

//initialise un recit à partir d'un objet json
JsonHandler.recitFromJson = function(json, recit) {
	if (recit == undefined) {
		recit = new RecitCommon();
	}
	for (var i=0; i<json.lines.length; i++) {
		recit.addLine(this.lineFromJson(json.lines[i]));
	}
	recit.type = json.type;
	return recit;
}

/*
 * Renvoit un objet json avec les attributs de la classe mere
 */
JsonHandler.jsonFromRecit = function(recit) {
	json = new Object();
	json.lines = new Array();
	for (var i=0; i<this.nb; i++) {
		json.lines[i] = recit.lines[i].getJson();
	}
	json.type = recit.type;
	return json;
}
scriptLoaded('src/lib_separation/json/json.js');
