/*
 * Classe StoryOnePage
 *
 * Story d'une page, affiche simplement la page
 * */

function StoryOnePage(json_def) {
	Story.apply(this); //Heritage partie 1
	if (json_def.type != 'one_page') {
		return undefined;
	}
	this.type='one_page';
	if (json_def != undefined) {
		this.addPage(new Page(json_def.pages[0]));
	}
	this.pages[0].setYsize(H);
	this.pages[0].setCenterXY(W/2,H/3);
	this.generate();
	console.log('json story = ' + JSON.stringify(JsonHandler.jsonFromStory(this)));
}
StoryOnePage.prototype = new Story(); //Heritage partie 2

StoryOnePage.prototype.generate = function() {
	this.pages[0].generate();
}

StoryOnePage.prototype.display = function() {
	this.pages[0].display();
}

scriptLoaded('src/recit/story_types/one_page_story.js');
