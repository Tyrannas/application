function Possibility(value, police, code) {
	this.value = value;
	this.police = police;
	this.code = code;
}

Possibility.prototype.getValue = function() {
	return this.value;
}

Possibility.prototype.getPolice = function() {
	return this.police;
}

Possibility.prototype.getCode = function() {
	return this.code;
}

scriptLoaded('src/labo/possibility.js');
