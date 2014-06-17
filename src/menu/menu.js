/*
	Namespace Menu
*/
var Menu = {};
Menu.words = new Array();
Menu.anim_duration = 2000;
Menu.opacity = 0.5;
Menu.low_alpha_lang = 0.4;
Menu.high_alpha_lang = Menu.opacity;
Menu.lang_anim_duration = 500;

Menu.start = function() {
	Destroy.all();
	
	Menu.recit();
	Menu.labo();
	Menu.aide();
	Menu.editeur();
	Menu.lang();

	show_err_message_too_many_stories = true;

	gui.MenuPrincipal();
}

Menu.destroy = function() {
	Destroy.arrayObjet(Menu.words);
}

Menu.recit = function() {
	var zoom = 2;

	Menu.words['recit'] = new Word('salon', null, 5);
	
	Menu.words['recit'].setZoom(zoom);
	Menu.words['recit'].setX(-Menu.words['recit'].getWidth());
	Menu.words['recit'].setCenterY(H * 1/2);
	Menu.words['recit'].display();
	
	Menu.words['recit'].setCenterX(W * 1/5);
	
	Tween.get(Menu.words['recit'].getNode()).to({
			x: Menu.words['recit'].getX(),
		}, Menu.anim_duration, Ease.sineOut);	
	
	Event.onTap('Menu.recit', Menu.words['recit'], function() {
		Recit.start();
	}, true);
}

Menu.labo = function() {
	var zoom = 2;

	if (language == 'fr')
		Menu.words['labo'] = new Word('labo', null, 5);
	else
		Menu.words['labo'] = new Word('lab', null, 5);
	Menu.words['labo'].setZoom(zoom);
	Menu.words['labo'].setX(W);
	Menu.words['labo'].setCenterY(H * 1/2);
	Menu.words['labo'].display();

	Menu.words['labo'].setCenterX(W * 4/5);
	
	Tween.get(Menu.words['labo'].getNode()).to({
			x: Menu.words['labo'].getX(),
		}, Menu.anim_duration, Ease.sineOut);	
	
	Event.onTap('Menu.labo', Menu.words['labo'], function() {
		Labo.start();
	}, true);
}

Menu.aide = function() {
	if (language == 'fr')
		Menu.words['aide'] = new Word('aide', null, 0);
	else
		Menu.words['aide'] = new Word('help', null, 0);

	Menu.words['aide'].setCenterXY(W / 2, H * 10/12);
	Menu.words['aide'].getNode().alpha = 0;
	Menu.words['aide'].display();

	Tween.get(Menu.words['aide'].getNode()).to({
			alpha: Menu.opacity,
		}, Menu.anim_duration, Ease.sineIn);
	
	Event.onTap('Menu.aide', Menu.words['aide'], function() {
		Aide.start();
	}, true);
}

Menu.editeur = function() {
	if (language == 'fr') 
		Menu.words['editeur'] = new Word('editeur', null, 0);
	else 
		Menu.words['editeur'] = new Word('editor', null, 0);
	Menu.words['editeur'].setCenterXY(W / 2, H * 8/12);
	Menu.words['editeur'].getNode().alpha = 0;
	Menu.words['editeur'].display();
	
	Tween.get(Menu.words['editeur'].getNode()).to({
			alpha: Menu.opacity,
		}, Menu.anim_duration, Ease.sineIn);
	
	Event.onTap('Menu.editeur', Menu.words['editeur'], Editeur.start, true);
}

Menu.lang = function() {
	Menu.words['lang_EN'] = new Word('en', null, 0);
	var width = Menu.words['lang_EN'].getWidth();
	Menu.words['lang_EN'].setCenterXY(W / 2 - width, H * 2/12);
	Menu.words['lang_EN'].setAlpha(0);
	Menu.words['lang_EN'].display();

	Menu.words['lang_FR'] = new Word('fr', null, 0);
	Menu.words['lang_FR'].setCenterXY(W / 2 + width, H * 2/12);
	Menu.words['lang_FR'].setAlpha(0);
	Menu.words['lang_FR'].display();

	if (language == 'fr') {
		log('Version francaise');
		Tween.get(Menu.words['lang_EN'].getNode()).to({
				alpha: Menu.low_alpha_lang,
			}, Menu.anim_duration, Ease.sineIn);
		Tween.get(Menu.words['lang_FR'].getNode()).to({
				alpha: Menu.high_alpha_lang,
			}, Menu.anim_duration, Ease.sineIn);

		Event.onTap('Menu.lang_EN', Menu.words['lang_EN'], function() {
			language = 'en';
			Menu.start();
			/*
			Tween.get(Menu.words['lang_EN'].getNode()).to({
					alpha: Menu.high_alpha_lang,
				}, Menu.lang_anim_duration, Ease.sineIn);
			Tween.get(Menu.words['lang_FR'].getNode()).to({
					alpha: Menu.low_alpha_lang,
				}, Menu.lang_anim_duration, Ease.sineIn);*/
		}, true);
	}
	else {
		log('English version');
		Tween.get(Menu.words['lang_EN'].getNode()).to({
				alpha: Menu.high_alpha_lang,
			}, Menu.anim_duration, Ease.sineIn);
		Tween.get(Menu.words['lang_FR'].getNode()).to({
				alpha: Menu.low_alpha_lang,
			}, Menu.anim_duration, Ease.sineIn);

		Event.onTap('Menu.lang_FR', Menu.words['lang_FR'], function() {
			language = 'fr';
			Menu.start();
			/*
			Tween.get(Menu.words['lang_EN'].getNode()).to({
					alpha: Menu.low_alpha_lang,
				}, Menu.lang_anim_duration, Ease.sineIn);
			Tween.get(Menu.words['lang_FR'].getNode()).to({
					alpha: Menu.high_alpha_lang,
				}, Menu.lang_anim_duration, Ease.sineIn);*/
		}, true);
	}
}

scriptLoaded('src/menu/menu.js');
