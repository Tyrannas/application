/*
 * Logo de la Separation
 */
function Logo() {
	this.container = null; // Groupe Kinetic
	this.border = Math.floor(H / 20); // Largeur des lignes du logo (~20)
	
	this.width = 12 * this.border; // Largeur du logo
	this.height = 12 * this.border; // Hauteur du logo
	
	this.x = 0; // Position x
	this.y = 0; // Position y
	
	LogoConstruct(this);
}

LogoConstruct = function(logo) {
	logo.generate();
	logo.setCenterXY(W/2, H/2); // Par défaut on centre le logo
}

Logo.prototype.generate = function() {
	var border = this.border;
	var radius = 4 * border;
	var x = 6 * border;
	var y = 6 * border;
	var line_width = 3.5 * border;
	
	this.arc_up = new createjs.Shape();
	this.arc_up.graphics
		.setStrokeStyle(border)
		.beginStroke(C_CONT)
		.moveTo(x - line_width + border/2, y - border/2)
		.bezierCurveTo(x - line_width + border/2, y - radius, x + line_width - border/2, y - radius, x + line_width - border/2, y - border/2)
		.endStroke();
	
	this.arc_down = new createjs.Shape();
	this.arc_down.graphics
		.setStrokeStyle(border)
		.beginStroke(C_CONT)
		.moveTo(x + line_width - border/2, y + border/2)
		.bezierCurveTo(x + line_width - border/2, y + radius, x - line_width + border/2, y + radius, x - line_width + border/2, y + border/2)
		.endStroke();
	
	this.central_line = new createjs.Shape();
	this.central_line.graphics
		.beginFill(C_CONT)
		.drawRect(x - line_width / 2, y - (border / 2), line_width, border);
	
	this.container = new createjs.Container();
	this.container.regX = x;
	this.container.regY = y;
	
	this.container.addChild(this.arc_up, this.arc_down, this.central_line);
	
	this.containerDestroy = function() {
		this.arc_up.clear();
		this.arc_down.clear();
		this.central_line.clear();
		// this.container.destroy();
	}
}

Logo.prototype.display = function() {
	this.container.x = this.getRealX();
	this.container.y = this.getRealY();
	
	stage.addChild(this.container);
}

Logo.prototype.destroy = function() {
	this.containerDestroy();
}

Logo.prototype.animateIntro = function(handler) {
	var anim_duration = 2000;
	var logo = this;

	rotation90(this);

	function rotation90() {
		Tween.get(logo.getNode())
			.to({rotation: 90}, anim_duration, Ease.sineInOut)
			.call(openLogo);
	}
	
	function openLogo() {
		Tween.get(logo.getArcDown())
			.to({y: W/2}, anim_duration, Ease.sineIn);
		Tween.get(logo.getArcUp())
			.to({y: -W/2}, anim_duration, Ease.sineIn);
		Tween.get(logo.getCentralLine())
			.to({
				scaleX: 0,
				scaleY: 0,
				x: logo.getWidth() / 2,
				y: logo.getHeight() / 2,
			}, anim_duration, Ease.sineIn)
			.call(finish);
	}
	
	function finish() {
		logo.containerDestroy();
		handler();
	}
}


// Set
Logo.prototype.setX = function(data) { this.x = data + this.getRegX(); }
Logo.prototype.setY = function(data) { this.y = data + this.getRegY(); }
Logo.prototype.setCenterXY = function(x, y) {
	this.setX(x - this.getWidth() / 2);
	this.setY(y - this.getHeight() / 2);
}
// Get
Logo.prototype.getX = function() { return this.x - this.getRegX(); }
Logo.prototype.getY = function() { return this.y - this.getRegY(); }
Logo.prototype.getRealX = function() { return this.x; }
Logo.prototype.getRealY = function() { return this.y; }
Logo.prototype.getRegX = function() { return this.container.regX; }
Logo.prototype.getRegY = function() { return this.container.regY; }
Logo.prototype.getWidth = function() { return this.width; }
Logo.prototype.getHeight = function() { return this.height; }
Logo.prototype.getNode = function() { return this.container; }
Logo.prototype.getArcUp = function() { return this.arc_up; }
Logo.prototype.getArcDown = function() { return this.arc_down; }
Logo.prototype.getCentralLine = function() { return this.central_line; }

scriptLoaded('scripts/libs/separation_toolkit/logo/logo.js');