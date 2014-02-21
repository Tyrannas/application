function Word_coupable_haut(data) {
	this.up = new WordLetters(data.code, data.police, 'demihauth').getBmp();
	this.down = new WordLetters(data.value, data.police, 'demihautb').getBmp();
	this.next_down = new WordLetters(data.next_value, data.police, 'demihautb').getBmp();
	
	this.next_down.alpha = 0;

	this.container = new createjs.Container();
	this.container.width = this.up.getBounds().width;
	this.container.height = fontConst.car.height_img;
	
	// var temp = new createjs.Shape();
	// temp.graphics.beginFill("#ff0000").drawRect(0, 0, this.container.width, this.container.height);
	// this.container.addChild(temp);
	
	this.container.addChild(this.up, this.down, this.next_down);
}

Word_coupable_haut.prototype.destroy = function() {
	this.container.removeChild(this.up, this.down, this.next_down);
	stage.removeChild(this.container);
}

scriptLoaded('src/lib_separation/word_constructor/coupable_haut.js');
