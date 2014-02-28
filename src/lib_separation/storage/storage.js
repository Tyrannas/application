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

MyStorage.getStory = function(name) {
	return localStorage.getItem(name);
}

MyStorage.removeStory = function(name) {
	localStorage.removeItem(name);
}

MyStorage.clear = function() {
	console.log('Deleting localStorage');
	localStorage.clear();
}

MyStorage.loadAllStories = function() {
	for (var i=0; i<this.stories.length; i++) {
		this.addStory(this.stories[i]);
	}
}	

MyStorage.stories = [
	'{"name":"Demi tour", "type":"one_page", "pages":[{"lines":[{"words":[{"value":"Demi tour", "zoom":1}]}, {"words":[{"value":"marche", "next_value":"arriere", "police":1, "code":"IIIIIIILIIL", "zoom":2}]}]}]}',
	'{"name":"Test", "type":"one_page", "pages":[{"lines":[{"words":[{"value":"Test"}]}]}]}'
	];

scriptLoaded('src/lib_separation/storage/storage.js');
