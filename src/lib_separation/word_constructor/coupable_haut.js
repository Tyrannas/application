function Word_coupable_haut(data) {

	this.up = new createjs.Text(
		data.code,
		data.fontSize + 'px ' + data.cst.police[data.police].name.up,
		data.color);
	this.up.y = data.cst.police[data.police].offset.up;
	
	this.down = new createjs.Text(
		data.value,
		data.fontSize + 'px ' + data.cst.police[data.police].name.down,
		data.color);
	this.down.y = data.cst.police[data.police].offset.down;
	
	this.next_down = new createjs.Text(
		data.next_value,
		data.fontSize + 'px ' + data.cst.police[data.police].name.down,
		data.color);
	this.next_down.y = data.cst.police[data.police].offset.down;
	this.next_down.alpha = 0;

	this.container = new createjs.Container()
	this.container.width = this.up.getBounds().width;
	this.container.height = data.cst.car.height;
	
	// var temp = new createjs.Shape();
	// temp.graphics.beginFill("#ff0000").drawRect(0, 0, this.container.width, this.container.height);
	
	this.container.addChild(this.up, this.down, this.next_down);
}

Word_coupable_haut.prototype.destroy = function() {
	this.container.removeChild(this.up, this.down, this.next_down);
	stage.removeChild(this.container);
}

scriptLoaded('src/lib_separation/word_kinetic/coupable_haut.js');
