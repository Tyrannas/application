Sound={};

Sound.init = function() {
	cut_instance = createjs.Sound.createInstance("audio_cut");
	tear1_instance = createjs.Sound.createInstance("audio_tear1");
	tear2_instance = createjs.Sound.createInstance("audio_tear2");
	ambiant_instance = createjs.Sound.createInstance("audio_ambiant")
}

Sound.police_begin = function(police, dir) {
	if (Word_polices[police] == "coupable_haut" || Word_polices[police] == "coupable_bas") {
		cut_instance = createjs.Sound.createInstance("audio_cut");
		cut_instance.stop();
		cut_instance.play();
	}
	else if (Word_polices[police] == "centrale") {
		if (dir == 1){
			tear1_instance.stop();
			tear1_instance.play();
		}
		else if (dir == -1){
			tear2_instance.stop();
			tear2_instance.play();
		}
	}
}

Sound.police_abort = function(police, dir) {
	if (Word_polices[police] == "coupable_haut" || Word_polices[police] == "coupable_bas") {
		cut_instance.stop();
	}
	else if (Word_polices[police] == "centrale") {
		if (dir == 1){
			tear1_instance.stop();
		}
		else if (dir == -1){
			tear2_instance.stop();
		}
	}
}

scriptLoaded('src/lib_separation/event/sound.js');