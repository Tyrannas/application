/*
 * Logo de la Separation
 */
function Logo() {
	this.container = null; // Groupe Kinetic
	
	this.x = 0; // Position x
	this.y = 0; // Position y
	
	this.w = 0;
	this.h = H/3;
	this.scale = 1;
	
	this.destroyed = false;
	
	LogoConstruct(this);
}

LogoConstruct = function(logo) {
	logo.generate();
	logo.setCenterXY(W/2, H/2); // Par défaut on centre le logo
}

Logo.prototype.generate = function() {
	// Chargement des images
	this.up = new createjs.Bitmap(res('logo_up'));
	this.central = new createjs.Bitmap(res('logo_central'));
	this.down = new createjs.Bitmap(res('logo_down'));
	
	// Calcul de la taille et de la position
	this.scale = getScale(this.up.image.height, this.h);
	this.w = this.up.image.width;
	this.h = this.up.image.height;
	
	// Créatation du container
	this.container = new createjs.Container();
		this.container.regX = this.w / 2;
		this.container.regY = this.h / 2;
		this.container.scaleX = this.container.scaleY = this.scale;
	
	this.container.addChild(this.up, this.down, this.central);
	
	this.containerDestroy = function() {
		this.container.removeChild(this.up, this.down, this.central);
		stage.removeChild(this.container);
	}
}

Logo.prototype.display = function() {
	this.container.x = this.getRealX();
	this.container.y = this.getRealY();
	
	stage.addChild(this.container);
}

Logo.prototype.destroy = function() {
	this.containerDestroy();
	
	if(!this.destroyed) {
		this.destroyed = true;
		return true;
	} else {
		return false;
	}
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
		Tween.get(logo.down)
			.to({y: W/2, alpha: 0}, anim_duration, Ease.sineIn);
		Tween.get(logo.up)
			.to({y: -W/2, alpha: 0}, anim_duration, Ease.sineIn);
		Tween.get(logo.central)
			.to({
				scaleX: 0,
				scaleY: 0,
				x: logo.getWidth() / 2,
				y: logo.getHeight() / 2,
			}, anim_duration, Ease.sineIn)
			.call(finish);
	}
	
	function finish() {
		if(logo.destroy())
			handler();
	}
}


// Set
Logo.prototype.setX = function(data) { this.x = data + this.getRegX(); }
Logo.prototype.setY = function(data) { this.y = data + this.getRegY(); }
Logo.prototype.setXY = function(data, data2) { this.setX(data); this.setY(data2); }
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
Logo.prototype.getWidth = function() { return this.w; }
Logo.prototype.getHeight = function() { return this.h; }
Logo.prototype.getNode = function() { return this.container; }
Logo.prototype.getArcUp = function() { return this.arc_up; }
Logo.prototype.getArcDown = function() { return this.arc_down; }
Logo.prototype.getCentralLine = function() { return this.central_line; }

scriptLoaded('scripts/libs/separation_toolkit/logo/logo.js');