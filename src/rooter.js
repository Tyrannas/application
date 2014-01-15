Rooter={};
Rooter.res = function(res_id) {
	switch(res_id){
		//db
		case"local_db":return "res/db/local_db.js"; break;
		//img
		case"loading_img":return "res/img/loading.gif"; break;
		case"ombre_cygne":return "res/img/ombre/CYGNE.png"; break;
		case"ombre_ombre":return "res/img/ombre/OMBRE.png"; break;
		//sound
		case"sound_ambiant":return "res/sound/ambiant.ogg"; break;
		case"sound_cut":return "res/sound/cut.ogg"; break;
		case"sound_rub1":return "res/sound/rub1.ogg"; break;
		case"sound_rub2":return "res/sound/rub2.ogg"; break;
		case"sound_tap":return "res/sound/tap.ogg"; break;
		case"sound_tear":return "res/sound/tear.ogg"; break;
		case"sound_tear1":return "res/sound/tear1.ogg"; break;
		case"sound_tear2":return "res/sound/tear2.ogg"; break;
		//story
		case"story_separation":return "res/story/separation.xml"; break;
	}
}

scriptLoaded('src/rooter.js');
