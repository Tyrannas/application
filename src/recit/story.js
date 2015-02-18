/*
 * CLass Story
 * 
 * Une Story est un ensemble de pages
 *
 */

function Story() {
	this.type = 'none';
	this.name = 'none';
	this.pages = [];
	this.nb = 0;
}

Story.prototype.setName = function(name) {
	this.name = name;
};

Story.prototype.addPage = function(page) {
	this.pages[this.nb] = page;
	this.nb++;
};

Story.prototype.changePage = function(page, page_nb) {
	if (page_nb < this.nb) {
		this.pages[page_nb].destroy();
		this.pages[page_nb] = page;
		return true;
	}
	else
		return false;
};

Story.prototype.destroyPage = function(page_nb) {
	if (page_nb < this.nb) {
		this.pages[page_nb].destroy();
		this.nb--;
		this.pages.splice(line_nbr, 1);
		return true;
	}
	else
		return false;
};
	
Story.prototype.destroy = function() {
	Destroy.arrayObjet(this.pages);
	this.nb = 0;
};

scriptLoaded('src/recit/story.js');
