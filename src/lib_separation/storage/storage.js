var MyStorage = new Object();

MyStorage.clear = function() {
	console.log('Deleting localStorage');
	localStorage.clear();
}


/////////////////////
////	STORIES /////
/////////////////////

MyStorage.listStories = function() {
	var i = 0;
	var keys = new Array();
	while (localStorage.key(i) != null) {
		if (localStorage.key(i).substring(0,6) == "story_") { 
			keys[i] = localStorage.key(i).substring(6);
		}
		i++;
	}
	return keys;
}

MyStorage.addStory = function(story) {
	var name = "story_"+JSON.parse(story).name;
	localStorage.setItem(name, story);
	return name;
}

MyStorage.getStory = function(name) {
	return localStorage.getItem("story_"+name);
}

MyStorage.removeStory = function(name) {
	localStorage.removeItem("story_"+name);
}

MyStorage.loadAllStories = function() {
	for (var i=0; i<StoriesDb.stories.length; i++) {
		this.addStory(StoriesDb.stories[i]);
	}
}	
/////////////////////
////	WORDS	/////
/////////////////////

MyStorage.listWords = function() {
	var i = 0;
	var keys = new Array();
	while (localStorage.key(i) != null) {
		if (localStorage.key(i).substring(0,6) == "words_") { 
			keys[i] = localStorage.key(i).substring(6);
		}
		i++;
	}
	return keys;
}

MyStorage.addWord = function(word) {
	var name = "words_"+JSON.parse(word).value;
	localStorage.setItem(name, word);
	return name;
}

MyStorage.getWord = function(word) {
	return localStorage.getItem("words_"+word);
}

MyStorage.removeWord = function(word) {
	localStorage.removeItem("words_"+word);
}

scriptLoaded('src/lib_separation/storage/storage.js');
