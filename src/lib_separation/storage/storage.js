var MyStorage = new Object();

MyStorage.listStories = function() {
	var i = 0;
	var keys = new Array();
	while (localStorage.key(i) != null) {
		keys[i] = localStorage.key(i);
		i++;
	}
	return keys;
}

MyStorage.addStory = function(story) {
	var name = JSON.parse(story).name;
	localStorage.setItem(name, story);
	return name;
}

MyStorage.getStory = function(name) {
	return localStorage.getItem(name);
}

MyStorage.removeStory = function(name) {
	localStorage.removeItem(name);
}

MyStorage.clear = function() {
	console.log('Deleting localStorage');
	localStorage.clear();
}

MyStorage.loadAllStories = function() {
	for (var i=0; i<StoriesDb.stories.length; i++) {
		this.addStory(StoriesDb.stories[i]);
	}
}	

scriptLoaded('src/lib_separation/storage/storage.js');
