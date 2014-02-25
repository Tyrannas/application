function Word_centrale(data) {	
	this.up = new WordLetters(data.value, data.police, 'centraleh').getBmp();
	this.central = new WordLetters(data.value, data.police, 'centralec').getBmp();
	this.next_central = new WordLetters(data.next_value, data.police, 'centralec').getBmp();
	this.down = new WordLetters(data.value, data.police, 'centraleb').getBmp();

	this.next_central.alpha = 0;
	
	this.container = new createjs.Container()
	this.container.width = this.up.getBounds().width;
	this.container.height = this.up.getBounds().height;
	
	this.container.addChild(this.up, this.central, this.next_central, this.down);
}

Word_centrale.prototype.destroy = function() {
	this.container.removeChild(this.up, this.central, this.next_central, this.down);
	stage.removeChild(this.container);
}

scriptLoaded('src/lib_separation/word_constructor/centrale.js');
