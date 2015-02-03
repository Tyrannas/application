function Word_coupable_entier(data) {
	this.text = new createjs.Text(
		data.value,
		data.fontSize + 'px ' + data.cst.police[data.police].name,
		data.color);
	this.text.y = data.cst.police[data.police].offset;
	
	this.container = new createjs.Container()
	this.container.width = this.up.getBounds().width;
	this.container.height = this.up.getBounds().height;
	
	this.container.addChild(this.text);
}

Word_coupable_entier.prototype.destroy = function() {
	this.container.removeChild(this.text);
	stage.removeChild(this.container);
}

scriptLoaded('src/lib_separation/word_constructor/coupable_entier.js');
