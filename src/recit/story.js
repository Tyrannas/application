/*
 * CLass Story
 * 
 * Une Story est un ensemble de pages
 *
 */

function RecitStory() {
	this.type = 'none';
	this.pages = new Array();
	this.nb = 0;
}

RecitStory.prototype.addPage = function(page) {
	this.pages[this.nb] = page;
	this.nb++;
}

RecitStory.prototype.changePage = function(page, page_nb) {
	if (page_nb < this.nb) {
		this.pages[page_nb].destroy();
		this.pages[page_nb] = page;
		return true;
	}
	else
		retrun false;
}

RecitStory.prototype.destroyPage = function(page_nb) {
	if (page_nb < this.nb) {
		this.pages[page_nb].destroy();
		this.nb--;
		this.pages.splice(line_nbr, 1);
		return true;
	}
	else
		retrun false;
}
	
RecitStory.prototype.destroy = function() {
	Destroy.arrayObjet(this.pages);
	this.nb = 0;
}

scriptLoaded('src/recit/story.js');
