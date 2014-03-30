/*
 * Classe StoryOnePage
 *
 * Story d'une page, affiche simplement la page
 * */

function StoryOnePage(json_def) {
	Story.apply(this); //Heritage partie 1
	this.type='one_page';
	if (json_def != undefined && json_def.type == 'one_page') {
		this.addPage(new Page(json_def.pages[0]));
		this.name = json_def.name;
		this.pages[0].setYsize(H);
		this.pages[0].setCenterXY(W/2,H/2);
		this.generate();
	}
}
StoryOnePage.prototype = new Story(); //Heritage partie 2

StoryOnePage.prototype.generate = function() {
	this.pages[0].generate();
}

StoryOnePage.prototype.display = function() {
	this.pages[0].display();
}

scriptLoaded('src/recit/story_types/one_page_story.js');
