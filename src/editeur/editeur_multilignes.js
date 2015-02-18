Editeur.multilignes = {};

Editeur.multilignes.start = function () {
	this.init();
};

Editeur.multilignes.init = function () {
	var i;
	this.page = new Page();
	console.log(this.page);
	for(i = 0; i < 3; i++) {
		var word = new Word('a');
		var line = new Line();
		line.add(word);
		this.page.addLine(line);
		// this.page.lines[i].add();
	}
	this.page.setCenterXY(W/2,H/2);
	this.page.generate();
	this.page.display();
};

Editeur.multilignes.destroy = function () {
	
};

scriptLoaded('src/editeur/editeur_multilignes.js');