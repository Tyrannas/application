function Word_coupable_bas(data) {
	//// CUSTOM BITMAP TEXT
	// this.up = new WordLetters(data.value, data.police, 'demibash').getBmp();
	// this.down = new WordLetters(data.code, data.police, 'demibasb').getBmp();
	// this.next_up = new WordLetters(data.next_value, data.police, 'demibash').getBmp();

	//// EASELJS BITMAP TEXT
	this.up = new createjs.BitmapText(data.value, SS['demibash']);
	this.down = new createjs.BitmapText(data.code, SS['demibasb']);
	this.next_up = new createjs.BitmapText(data.next_value, SS['demibash']);

	this.up.y = fontConst.police[data.police].offsetY['demibash'];
	this.down.y = fontConst.police[data.police].offsetY['demibasb'];
	this.next_up.y = fontConst.police[data.police].offsetY['demibash'];

	this.next_up.alpha = 0;

	this.container = new createjs.Container()
	this.container.width = this.up.getBounds().width;
	this.container.height = fontConst.car.height_img;
	
	// var temp = new createjs.Shape();
	// temp.graphics.beginFill("#ff0000").drawRect(0, 0, this.container.width, this.container.height);
	// this.container.addChild(temp);
	
	this.container.addChild(this.up, this.down, this.next_up);
}

Word_coupable_bas.prototype.destroy = function() {
	this.container.removeChild(this.up, this.down, this.next_up);
	stage.removeChild(this.container);
}

scriptLoaded('src/lib_separation/word_constructor/coupable_bas.js');
