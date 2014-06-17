function Word_centrale(data) {
	//// CUSTOM BITMAP TEXT
	// this.up = new WordLetters(data.value, data.police, 'centraleh').getBmp();
	// this.central = new WordLetters(data.value, data.police, 'centralec').getBmp();
	// this.next_central = new WordLetters(data.next_value, data.police, 'centralec').getBmp();
	// this.down = new WordLetters(data.value, data.police, 'centraleb').getBmp();

	if(data.code == 'hack_sale')
	{
		if(data.value == 'shreds') {
			value1 = 'SHRSSS'; value2 = 'SHReDS'; value3 = 'CHASeS'; value4 = 'SHRSDS';
		} else {
			value1 = 'SHRSSS'; value2 = 'CHASeS'; value3 = 'SHReDS'; value4 = 'SHRSDS';
		}
		this.up = new createjs.BitmapText(value1, SS['centraleh']);
		this.central = new createjs.BitmapText(value2, SS['centralec']);
		this.next_central = new createjs.BitmapText(value3, SS['centralec']);
		this.down = new createjs.BitmapText(value4, SS['centraleb']);
	} else {
		this.up = new createjs.BitmapText(data.value, SS['centraleh']);
		this.central = new createjs.BitmapText(data.value, SS['centralec']);
		this.next_central = new createjs.BitmapText(data.next_value, SS['centralec']);
		this.down = new createjs.BitmapText(data.value, SS['centraleb']);
	}

	//// EASELJS BITMAP TEXT
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
