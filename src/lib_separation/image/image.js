/*
	Class Image
*/
function Image(img) {
	this.bmp = new createjs.Bitmap(img);
	this.w = this.bmp.image.width;
	this.h = this.bmp.image.height;
	this.x = 0;
	this.y = 0;
	this.scaleX = 1;
	this.scaleY = 1;
}

Image.prototype.display = function() {
	this.bmp.x = this.x;
	this.bmp.y = this.y;
	this.bmp.scaleX = this.scaleX;
	this.bmp.scaleY = this.scaleY;
	stage.addChild(this.bmp);
};

Image.prototype.displayGUI = function() {
	this.bmp.x = this.x;
	this.bmp.y = this.y;
	this.bmp.scaleX = this.scaleX;
	this.bmp.scaleY = this.scaleY;
	stageGUI.addChild(this.bmp);
};

Image.prototype.destroy = function() {
	stage.removeChild(this.bmp);
};

Image.prototype.destroyGUI = function() {
	stageGUI.removeChild(this.bmp);
};

// Set
Image.prototype.setX = function(data) { this.x = data; };
Image.prototype.setY = function(data) { this.y = data; };
Image.prototype.setXY = function(data, data2) { this.setX(data); this.setY(data2); };
Image.prototype.setCenterX = function(data) { this.setX(data - this.getWidth()/2); };
Image.prototype.setCenterY = function(data) { this.setY(data - this.getHeight()/2); };
Image.prototype.setCenterXY = function(data, data2) { this.setCenterX(data); this.setCenterY(data2); };
Image.prototype.setScaleX = function(data) { this.scaleX = data; };
Image.prototype.setScaleY = function(data) { this.scaleY = data; };
Image.prototype.setScaleXY = function(data, data2) { this.setScaleX(data); this.setScaleY(data2); };
Image.prototype.setSizeWH = function(data, data2) { this.setScaleX(data/this.w); this.setScaleY(data2/this.h); };
Image.prototype.setAlpha = function(data) { this.bmp.alpha = data; };

// Set
Image.prototype.getX = function() { return this.x; };
Image.prototype.getY = function() { return this.y; };
Image.prototype.getWidth = function() { return this.w * this.scaleX; };
Image.prototype.getHeight = function() { return this.h * this.scaleY; };
Image.prototype.getNode = function() { return this.bmp; };
Image.prototype.getAlpha = function() { return this.bmp.alpha; };
Image.prototype.getScaleX = function() { return this.scaleX; };
Image.prototype.getScaleY = function() { return this.scaleY; };

scriptLoaded('src/lib_separation/image/image.js');
