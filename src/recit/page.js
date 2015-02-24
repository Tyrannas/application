/** 
 *	Classe Page
 */
function Page(json_def) {
	this.lines = [];
	if (json_def !== undefined) {
		JsonHandler.pageFromJson(json_def, this);
	}
}

//Ajout d'une line
Page.prototype.addLine = function(new_line) {
	this.lines.push(new_line || new Line());
};

//Modif d'une line
//Retourne true si la modif a eu lieu
Page.prototype.changeLine = function(new_line, line_nbr) {
	if (line_nbr < this.lines.length) {
		this.lines[line_nbr].destroy();
		this.lines[line_nbr] = new_line;
		return true;
	}
	else
		return false;
};

//Generation des phrases
Page.prototype.generate = function(Ysize, cX, cY) {
	this.setYsize(Ysize || H);
	this.setCenterXY(cX || W/2, cY || H/2);
	for (var i=0; i<this.lines.length; i++) {
		this.lines[i].generate();
	}
};


//Affichage des lignes
Page.prototype.display = function() {
	for (var i=0; i<this.lines.length; i++){
		this.lines[i].display();
	}
};


//Detruit une ligne
Page.prototype.destroyLine = function(line_nbr) {
	if (line_nbr < this.lines.length) {
		this.lines[line_nbr].destroy();
		this.lines.splice(line_nbr, 1);
		return true;
	}
	else
		return false;
};

//Destructeur
Page.prototype.destroy = function() {
	Destroy.arrayObjet(this.lines);
};

/*
 * SETTER/GETTER
 */
Page.prototype.setXY = function(x, y) {
	this.x = x;
	this.y = y;
	for (var i=0; i<this.lines.length; i++) {
		var step = ((i+1) / (this.lines.length+1))*this.y_size;
		this.lines[i].setCenterX(this.x + this.getWidth()/2); 
		this.lines[i].setCenterY(this.y + step);
	}
};

Page.prototype.setCenterXY = function(x, y) {
	x = x - this.getWidth()/2;
	y = y - this.y_size/2;
	this.setXY(x, y);
};


Page.prototype.getWidth = function() {
	var width = 0;
	for (var i=0; i<this.lines.length; i++) {
		if (width < this.lines[i].getWidth()) {
			width = this.lines[i].getWidth();
		}
	}
	return width;
};

Page.prototype.setYsize = function(y_size) { this.y_size = y_size; };
Page.prototype.getX = function() { return this.x; };
Page.prototype.getY = function() { return this.y; };
Page.prototype.getCenterX = function() { return this.getX() + this.getWidth() / 2; };
Page.prototype.getCenterY = function() { return this.getY() + this.getHeight() / 2; };
Page.prototype.getYsize = function() { return this.y_size; };

scriptLoaded('src/recit/page.js');
