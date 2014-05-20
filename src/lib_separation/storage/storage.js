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
		if (key.substring(0,6) == "story_") { 
			localStorage.removeItem(key);
		}
	}
}

MyStorage.listStories = function() {
	var j = 0;
	var keys = new Array();
	for (var key in localStorage){
		if (key.substring(0,6) == "story_") { 
			keys[j] = key.substring(6);
			j++;
		}
	}
	return keys;
}

//Prend un objet story en argument
MyStorage.addStory = function(story) {
	var name = "story_"+story.name;
	json_story = JSON.stringify(JsonHandler.jsonFromStory(story));
	localStorage.setItem(name, json_story);
	return name;
}

//Renvoit un objet story
MyStorage.getStory = function(name) {
	return JsonHandler.storyFromJson(JSON.parse(localStorage.getItem("story_"+name)));
}

//Argment : nom de la story à supprimer
MyStorage.removeStory = function(name) {
	localStorage.removeItem("story_"+name);
}

MyStorage.loadAllStories = function() {
	for (var i=0; i<StoriesDb.stories.length; i++) {
		story = StoriesDb.stories[i];
		localStorage.setItem("story_"+JSON.parse(story).name, story);
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
		if (key.substring(0,6) == "words_") { 
			localStorage.removeItem(key);
		}
	}
}

MyStorage.listWords = function() {
	var i = 0, j = 0;
	var keys = new Array();
	for (var key in localStorage){
		if (key.substring(0,6) == "words_") { 
			keys[j] = key.substring(6);
			j++;
		}
		i++;
	}
	return keys;
}

MyStorage.addWord = function(word) {
	var name = "words_"+word.value+"_"+word.next_value;
	json_word = JSON.stringify(JsonHandler.jsonFromWord(word));
	localStorage.setItem(name, json_word);
	return name;
}

//Key est 'value_nextvalue'
MyStorage.getWord = function(key) {
	return localStorage.getItem("words_"+key);
}

MyStorage.removeWordKey = function(key) {
	localStorage.removeItem("words_"+key);
}

MyStorage.removeWord = function(word) {
	MyStorage.removeWordKey(MyStorage.getKey(word));
}

MyStorage.getKey = function(word) {
	return word.getValue() + '_' + word.getNextValue();
}

scriptLoaded('src/lib_separation/storage/storage.js');
