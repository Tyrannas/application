function Word_centrale(data) {
	//// CUSTOM BITMAP TEXT
	// this.up = new WordLetters(data.value, data.police, 'centraleh').getBmp();
	// this.central = new WordLetters(data.value, data.police, 'centralec').getBmp();
	// this.next_central = new WordLetters(data.next_value, data.police, 'centralec').getBmp();
	// this.down = new WordLetters(data.value, data.police, 'centraleb').getBmp();

	//// EASELJS BITMAP TEXT
	this.up = new createjs.BitmapText(data.value, SS['centraleh']);
	this.central = new createjs.BitmapText(data.value, SS['centralec']);
	this.next_central = new createjs.BitmapText(data.next_value, SS['centralec']);
	this.down = new createjs.BitmapText(data.value, SS['centraleb']);

	this.up.y = fontConst.police[data.police].offsetY['centraleh'];
	this.central.y = fontConst.police[data.police].offsetY['centralec'];
	this.next_central.y = fontConst.police[data.police].offsetY['centralec'];
	this.down.y = fontConst.police[data.police].offsetY['centraleb'];

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
