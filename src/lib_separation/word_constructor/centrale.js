function Word_centrale(data) {
	this.up = new createjs.Text(
		data.value,
		data.fontSize + 'px ' + data.cst.police[data.police].name.up,
		data.color);
	this.up.y = data.cst.police[data.police].offset.up;
	
	this.central = new createjs.Text(
		data.value,
		data.fontSize + 'px ' + data.cst.police[data.police].name.central,
		data.color);
	this.central.y = data.cst.police[data.police].offset.central;
	
	this.next_central = new createjs.Text(
		data.next_value,
		data.fontSize + 'px ' + data.cst.police[data.police].name.central,
		data.color);
	this.next_central.y = data.cst.police[data.police].offset.central;
	this.next_central.alpha = 0;
	
	this.down = new createjs.Text(
		data.value,
		data.fontSize + 'px ' + data.cst.police[data.police].name.down,
		data.color);
	this.down.y = data.cst.police[data.police].offset.down;
	
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
