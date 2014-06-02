var MyStorage = new Object();

MyStorage.clear = function() {
	console.log('Deleting localStorage');
	localStorage.clear();
}


/////////////////////
////	STORIES /////
/////////////////////

MyStorage.clearStories = function() {
	console.log('Deleting stories');
	var i = 0;
	for (var key in localStorage){
		if (Menu.language == 'fr' && key.substring(0,9) == "story_fr_") { 
			localStorage.removeItem(key);
		}
		else if (Menu.language == 'en' && key.substring(0,9) == "story_en_") { 
			localStorage.removeItem(key);
		}
	}
}

MyStorage.listStories = function() {
	var j = 0;
	var keys = new Array();
	for (var key in localStorage){
		if (key.substring(0,9) == "story_"+Menu.language+"_") { 
			keys[j] = key.substring(9);
			j++;
		}
	}
	return keys;
}

//Prend un objet story en argument
MyStorage.addStory = function(story) {
	var name = "story_"+Menu.language+"_"+story.name;
	json_story = JSON.stringify(JsonHandler.jsonFromStory(story));
	localStorage.setItem(name, json_story);
	return name;
}

//Renvoit un objet story
MyStorage.getStory = function(name) {
	return JsonHandler.storyFromJson(JSON.parse(localStorage.getItem("story_"+Menu.language+"_"+name)));
}

//Argment : nom de la story à supprimer
MyStorage.removeStory = function(name) {
	localStorage.removeItem("story_"+Menu.language+"_"+name);
}

MyStorage.loadAllStories = function() {
	for (var i=0; i<StoriesDb.fr_stories.length; i++) {
		story = StoriesDb.fr_stories[i];
		localStorage.setItem("story_fr_"+JSON.parse(story).name, story);
	}
	for (var i=0; i<StoriesDb.en_stories.length; i++) {
		story = StoriesDb.en_stories[i];
		localStorage.setItem("story_en_"+JSON.parse(story).name, story);
	}
}	
/////////////////////
////	WORDS	/////
/////////////////////

MyStorage.clearWords = function() {
	console.log('Deleting words');
	var i = 0;
	var keys = new Array();
	for (var key in localStorage){
		if (key.substring(0,9) == "words_"+Menu.language+"_") { 
			localStorage.removeItem(key);
		}
	}
}

MyStorage.listWords = function() {
	var i = 0, j = 0;
	var keys = new Array();
	for (var key in localStorage){
		if (key.substring(0,9) == "words_"+Menu.language+"_") { 
			keys[j] = key.substring(9);
			j++;
		}
		i++;
	}
	return keys;
}

MyStorage.addWord = function(word) {
	var name = "words_"+Menu.language+"_"+word.value+"_"+word.next_value;
	json_word = JSON.stringify(JsonHandler.jsonFromWord(word));
	localStorage.setItem(name, json_word);
	return name;
}

//Key est 'value_nextvalue'
MyStorage.getWord = function(key) {
	return localStorage.getItem("words_"+Menu.language+"_"+key);
}

MyStorage.removeWordKey = function(key) {
	localStorage.removeItem("words_"+Menu.language+"_"+key);
}

MyStorage.removeWord = function(word) {
	MyStorage.removeWordKey(MyStorage.getKey(word));
}

MyStorage.getKey = function(word) {
	return word.getValue() + '_' + word.getNextValue();
}

scriptLoaded('src/lib_separation/storage/storage.js');
