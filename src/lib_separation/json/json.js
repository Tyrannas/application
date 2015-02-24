/*
 * Objet de manipulation du Json
 */

var JsonHandler = {};

JsonHandler.wordFromJson = function(json) {
	var word = new Word(json.value, json.next_value, json.police, json.code);
	return word;
};

JsonHandler.jsonFromWord = function(word) {
	var json_word = {};
	json_word.value = word.value;
	json_word.police = word.police;
	json_word.next_value = word.next_value;
	json_word.code = word.code;
	// json_word.zoom = word.getZoom();
	return json_word;
};

/*
 * Cree une ligne à partir d'un objet JSON parsé
 */
JsonHandler.lineFromJson = function(json) {
	var line = new Line();
	//Ajout des mots à la ligne
	for (var i=0; i < json.words.length; i++) {
		var json_word = json.words[i];
		var word = this.wordFromJson(json_word);
		// if (json_word.zoom === undefined) {
		// 	json_word.zoom = 1;
		// }
		// word.setZoom(json_word.zoom);
		word.setZoom(1);
		line.add(word);
	}
	return line;
};

/*
 * Retourne le Json d'une ligne
 */
JsonHandler.jsonFromLine = function(line) {
	var json_line = {};
	json_line.words = [];
	for (var i=0; i < line.words.length; i++) {
		json_line.words[i] = this.jsonFromWord(line.words[i]);
	}
	return json_line;
};

//initialise une page à partir d'un objet json
JsonHandler.pageFromJson = function(json, page) {
	if (page === undefined) {
		page = new Page();
	}
	for (var i=0; i<json.lines.length; i++) {
		page.addLine(this.lineFromJson(json.lines[i]));
	}
	return page;
};

/*
 * Renvoit un objet json avec les attributs de la page
 */
JsonHandler.jsonFromPage = function(page) {
	var json = {};
	json.lines = [];
	for (var i=0; i < page.lines.length; i++) {
		json.lines[i] = JsonHandler.jsonFromLine(page.lines[i]);
	}
	return json;
};

/*
 * Genere une story à partir de json
 */
JsonHandler.storyFromJson = function(json, story) {
	if (!story) {
		// switch (json.type) {
		// 	case 'one_page':
				story = new StoryOnePage(json);
				// break;
			// default:
			// 	return null;
		// }
	}
	else {
		story.destroy();
		story = this.storyFromJson(json);
	}
	return story;
};

//Genere le json d'un story
JsonHandler.jsonFromStory = function(story) {
	// console.log(story);
	var json = {};
	json.pages = [];
	for (var i=0; i < story.pages.length; i++) {
		json.pages[i] = JsonHandler.jsonFromPage(story.pages[i]);
	}
	json.type = story.type;
	json.name = story.name;
	return json;
};

scriptLoaded('src/lib_separation/json/json.js');
