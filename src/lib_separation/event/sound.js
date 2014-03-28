Sound={};

Sound.police_begin = function(police, dir) {
	if (Word_polices[police] == "coupable_haut") {
		createjs.Sound.stop("audio_cut");
		createjs.Sound.play("audio_cut");
	}
	else if (Word_polices[police] == "coupable_bas") {
		createjs.Sound.stop("audio_cut");
		createjs.Sound.play("audio_cut");
	}
	else if (Word_polices[police] == "centrale") {
		if (dir == 1){
			createjs.Sound.stop("audio_tear1");
			createjs.Sound.play("audio_tear1");
		}
		else if (dir == -1){
			createjs.Sound.stop("audio_tear2");
			createjs.Sound.play("audio_tear2");
		}
	}
}

Sound.police_abort = function(police, dir) {
	if (Word_polices[police] == "coupable_haut") {
		createjs.Sound.stop("audio_cut");
	}
	else if (Word_polices[police] == "coupable_bas") {
		createjs.Sound.stop("audio_cut");
	}
	else if (Word_polices[police] == "centrale") {
		if (dir == 1){
			createjs.Sound.stop("audio_tear1");
		}
		else if (dir == -1){
			createjs.Sound.stop("audio_tear2");
		}
	}
}

scriptLoaded('src/lib_separation/event/sound.js');