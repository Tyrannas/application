var MyStorage = {};

MyStorage.clear = function() {
	// log('Deleting localStorage');
	localStorage.clear();
};

/////////////////////
////	STORIES /////
/////////////////////

MyStorage.clearStories = function() {
	// log('Deleting stories');
	var i = 0;
	var to_del = [];
	for (i = 0; i < localStorage.length; i++) {
		key = localStorage.key(i);
		if (key.substring(0,9) == "story_"+language+"_") { 
			to_del.push(key);
		}
	}
	for (i = 0; i < to_del.length;i++) {
		localStorage.removeItem(to_del[i]);
	}
};

MyStorage.listStories = function() {
	var j = 0;
	var keys = [];
	for (var i = 0; i < localStorage.length; i++) {
		key = localStorage.key(i);
		if (key.substring(0,9) == "story_"+language+"_") { 
			keys[j] = key.substring(9);
			j++;
		}
	}
	return keys;
};

//Prend un objet story en argument
// MyStorage.addStory = function(story) {
// 	var name = "story_"+language+"_"+story.name;
// 	json_story = JSON.stringify(JsonHandler.jsonFromStory(story));
// 	localStorage.setItem(name, json_story);
// 	return name;
// };
MyStorage.addStory = function(story_name, story_json) {
	var name = "story_"+language+"_"+story_name;
	localStorage.setItem(name, story_json);
	return name;
};

//Renvoit un objet story
MyStorage.getStory = function(name) {
	return JsonHandler.storyFromJson(JSON.parse(localStorage.getItem("story_"+language+"_"+name)));
};

//Argment : nom de la story à supprimer
MyStorage.removeStory = function(name) {
	localStorage.removeItem("story_"+language+"_"+name);
};

MyStorage.loadAllStories = function() {
	for (var i=0; i<StoriesDb.fr_stories.length; i++) {
		story = StoriesDb.fr_stories[i];
		localStorage.setItem("story_fr_"+JSON.parse(story).name, story);
	}
	for (i = 0; i < StoriesDb.en_stories.length; i++) {
		story = StoriesDb.en_stories[i];
		localStorage.setItem("story_en_"+JSON.parse(story).name, story);
	}
};

/////////////////////
////	WORDS	/////
/////////////////////

MyStorage.clearWords = function() {
	// log('Deleting words');
	var i = 0;
	var keys = [];
	for (i = 0; i < localStorage.length; i++) {
		key = localStorage.key(i);
		if (key.substring(0,9) == "words_"+language+"_") { 
			localStorage.removeItem(key);
		}
	}
};

MyStorage.listWords = function() {
	/*debug('localStorage :');
	debug(localStorage);
*/
	var i = 0, j = 0;
	var keys = [];
	for (i = 0; i < localStorage.length; i++) {
		key = localStorage.key(i);
		// log("clé : " +key);
		if (key.substring(0,9) == "words_"+language+"_") { 
			keys[j] = key.substring(9);
			j++;
		}
	}
	// log(j+" words selected among "+i);
	return keys;
};

MyStorage.addWord = function(word) {
	var name = "words_"+language+"_"+word.value+"_"+word.next_value;
	json_word = JSON.stringify(JsonHandler.jsonFromWord(word));
	localStorage.setItem(name, json_word);
	return name;
};

//Key est 'value_nextvalue'
MyStorage.getWord = function(key) {
	return localStorage.getItem("words_"+language+"_"+key);
};

MyStorage.removeWordKey = function(key) {
	localStorage.removeItem("words_"+language+"_"+key);
};

MyStorage.removeWord = function(word) {
	MyStorage.removeWordKey(MyStorage.getKey(word));
};

MyStorage.getKey = function(word) {
	return word.getValue() + '_' + word.getNextValue();
};

scriptLoaded('src/lib_separation/storage/storage.js');
