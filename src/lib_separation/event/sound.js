/*
	Classe Sound
*/

function Sound() {
	this.instances = [
		["cut", createjs.Sound.createInstance("audio_cut")],
		["tear1", createjs.Sound.createInstance("audio_tear1")],
		["tear2", createjs.Sound.createInstance("audio_tear2")],
		["ambiant", createjs.Sound.createInstance("audio_ambiant")]
	];
}

Sound.prototype.play = function(sound_name) {
	var i=0;
	var found = false;
	while (i < this.instances.length && found==false) {
		if (this.instances[i][0]==sound_name) {
			found = true;
			this.instances[i][1].play();
		}
		i++;
	}
}

Sound.prototype.stop = function(sound_name) {
	var i=0;
	var found = false;
	while (i < this.instances.length && found==false) {
		if (this.instances[i][0]==sound_name) {
			found = true;
			this.instances[i][1].stop();
		}
		i++;
	}
}

Sound.prototype.police_begin = function(police, dir) {
	if (Word_polices[police] == "coupable_haut" || Word_polices[police] == "coupable_bas") {
		this.stop("cut");
		this.play("cut");
	}
	else if (Word_polices[police] == "centrale") {
		if (dir == 1){
			this.stop("tear1");
			this.play("tear1");
		}
		else if (dir == -1){
			this.stop("tear2");
			this.play("tear2");
		}
	}
}

Sound.prototype.police_abort = function(police, dir) {
	if (Word_polices[police] == "coupable_haut" || Word_polices[police] == "coupable_bas") {
		this.stop("cut");
	}
	else if (Word_polices[police] == "centrale") {
		if (dir == 1){
			this.stop("tear1");
		}
		else if (dir == -1){
			this.stop("tear2");
		}
	}
}

scriptLoaded('src/lib_separation/event/sound.js');