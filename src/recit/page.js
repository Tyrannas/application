/** 
 *	Classe Page
 */
function Page(json_def) {
	this.lines = new Array();
	this.nb = 0;
	if (json_def != undefined) {
		JsonHandler.pageFromJson(json_def, this);
		/*
		line = new Line();
		line.add(new Word('Demi tour'));
		this.addLine(line);
		line = new Line();
		line.add(new Word('marche', 'arriere', 1, 'IIIIIIILIIL').setZoom(2));
		this.addLine(line);
		*/
	}
	this.setYsize(H);
	this.setCenterXY(W/2,H/3);
	this.generate();
	console.log('json page = ' + JSON.stringify(JsonHandler.jsonFromPage(this)));
}

//Ajout d'une line
Page.prototype.addLine = function(new_line) {
	this.lines[this.nb] = new_line;
	this.nb++;
}

//Modif d'une line
//Retourne true si la modif a eu lieu
Page.prototype.changeLine = function(new_line, line_nbr) {
	if (line_nbr < this.nb) {
		this.lines[line_nbr].destroy();
		this.lines[line_nbr] = new_line;
		return true
	}
	else
		return false
}

//Generation des phrases
Page.prototype.generate = function() {
	for (var i=0; i<this.nb; i++) {
		this.lines[i].generate();
	}
}


//Affichage des lignes
Page.prototype.display = function() {
	for (var i=0; i<this.nb; i++){
		this.lines[i].display();
	}
}


//Detruit une ligne
Page.prototype.destroyLine = function(line_nbr) {
	if (line_nbr < this.nb) {
		this.lines[line_nbr].destroy();
		this.lines.splice(line_nbr, 1);
		this.nb--;
		return true;
	}
	else
		return false;
}

//Destructeur
Page.prototype.destroy = function() {
	Destroy.arrayObjet(this.lines);
	this.nb = 0;
}

/*
 * SETTER/GETTER
 */
Page.prototype.setXY = function(x, y) {
	this.x = x;
	this.y = y;
	for (var i=0; i<this.nb; i++) {
		var step = ((i+1) / (this.nb+1))*this.y_size;
		this.lines[i].setCenterX(this.x + this.getWidth()/2); 
		this.lines[i].setCenterY(this.y + step);
	}
}

Page.prototype.setCenterXY = function(x, y) {
	x = x - this.getWidth()/2;
	y = y - this.y_size/2;
	this.setXY(x, y);
}


Page.prototype.getWidth = function() {
	var width = 0;
	for (var i=0; i<this.nb; i++) {
		if (width < this.lines[i].getWidth()) {
			width = this.lines[i].getWidth();
		}
	}
	return width;
}

Page.prototype.setYsize = function(y_size) { this.y_size = y_size; }
Page.prototype.getX = function() { return this.x; }
Page.prototype.getY = function() { return this.y; }
Page.prototype.getCenterX = function() { return this.getX() + this.getWidth() / 2; }
Page.prototype.getCenterY = function() { return this.getY() + this.getHeight() / 2; }
Page.prototype.getYsize = function() { return this.y_size; }

scriptLoaded('src/recit/page.js');
