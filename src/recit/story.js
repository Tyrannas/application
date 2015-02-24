/*
 * CLass Story
 * 
 * Une Story est un ensemble de pages
 *
 */

function Story(type, name) {
	this.type = type || 'none';
	this.name = name || 'none';
	this.pages = [];
}

Story.prototype.setName = function(name) {
	this.name = name;
};

Story.prototype.addPage = function(page) {
	this.pages.push(page || new Page());
};

Story.prototype.changePage = function(page, page_nb) {
	if (page_nb < this.pages.length) {
		this.pages[page_nb].destroy();
		this.pages[page_nb] = page;
		return true;
	}
	else
		return false;
};

Story.prototype.destroyPage = function(page_nb) {
	if (page_nb < this.pages.length) {
		this.pages[page_nb].destroy();
		this.pages.splice(page_nb, 1);
		return true;
	}
	else
		return false;
};
	
Story.prototype.destroy = function() {
	Destroy.arrayObjet(this.pages);
	this.pages = [];
};

scriptLoaded('src/recit/story.js');
