/*
 * Objet de manipulation du Json
 */

var JsonHandler = new Object();

/*
 * Cree une ligne à partir d'un objet JSON parsé
 */
JsonHandler.lineFromJson = function(json) {
	var line = new Line();
	//Ajout des mots à la ligne
	for (var i=0; i < json.words.length; i++) {
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

//initialise une page à partir d'un objet json
JsonHandler.pageFromJson = function(json, page) {
	if (page == undefined) {
		page = new Page();
	}
	for (var i=0; i<json.lines.length; i++) {
		page.addLine(this.lineFromJson(json.lines[i]));
	}
	return page;
}

/*
 * Renvoit un objet json avec les attributs de la page
 */
JsonHandler.jsonFromPage = function(page) {
	var json = new Object();
	json.lines = new Array();
	for (var i=0; i<page.nb; i++) {
		json.lines[i] = JsonHandler.jsonFromLine(page.lines[i]);
	}
	return json;
}

/*
 * Genere une story à partir de json
 */
JsonHandler.storyFromJson = function(json, story) {
	if (story == undefined) {
		switch (json.type) {
			case 'one_page':
				story = new StoryOnePage(json);
				break;
			default:
				return undefined
		}
	}
	else {
		story.destroy();
		story = this.storyFromJson(json);
	}
	return story;
}

//Genere le json d'un story
JsonHandler.jsonFromStory = function(story) {
	var json = new Object();
	json.pages = new Array();
	for (var i=0; i<story.nb; i++) {
		json.pages[i] = JsonHandler.jsonFromPage(story.pages[i]);
	}
	json.type = story.type;
	json.name = story.name;
	return json;
}

scriptLoaded('src/lib_separation/json/json.js');
