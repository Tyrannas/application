/*
	Namespace Menu
*/
var Menu = {};
Menu.words = new Array();
Menu.anim_duration = 2000;
Menu.opacity = 0.5;

Menu.start = function() {
	Destroy.all();
	
	Menu.recit();
	Menu.labo();
	Menu.aide();
	Menu.aPropos();
	Menu.lang();
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

	Menu.words['labo'] = new Word('labo', null, 5);
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
	Menu.words['aide'] = new Word('aide', null, 0);
	Menu.words['aide'].setCenterXY(W / 2, H * 8/12);
	Menu.words['aide'].getNode().alpha = 0;
	Menu.words['aide'].display();

	Tween.get(Menu.words['aide'].getNode()).to({
			alpha: Menu.opacity,
		}, Menu.anim_duration, Ease.sineIn);
	
	Event.onTap('Menu.aide', Menu.words['aide'], function() {
		Aide.start();
	}, true);
}

Menu.aPropos = function() {
	Menu.words['a_propos'] = new Word('a propos', null, 0);
	Menu.words['a_propos'].setCenterXY(W / 2, H * 10/12);
	Menu.words['a_propos'].getNode().alpha = 0;
	Menu.words['a_propos'].display();
	
	Tween.get(Menu.words['a_propos'].getNode()).to({
			alpha: Menu.opacity,
		}, Menu.anim_duration, Ease.sineIn);
	
	Event.onTap('Menu.a_propos', Menu.words['a_propos'], function() {
		alert('A venir \n Soon');
	}, true);
}

Menu.lang = function() {
	Menu.words['lang_EN'] = new Word('fr   en', null, 0);
	Menu.words['lang_EN'].setCenterXY(W / 2, H * 2/12);
	Menu.words['lang_EN'].getNode().alpha = 0;
	Menu.words['lang_EN'].display();

	Tween.get(Menu.words['lang_EN'].getNode()).to({
			alpha: Menu.opacity,
		}, Menu.anim_duration, Ease.sineIn);
	
	Event.onTap('Menu.lang_EN', Menu.words['lang_EN'], function() {
		alert('A venir \n Soon');
	}, true);
	
	// Menu.words['lang_FR'] = new Word('FRENCH', null, 0, 'EOOLLOLL');
	// Menu.words['lang_FR'].setZoom(0.5);
	// Menu.words['lang_FR'].setCenterXY(W / 2, H * 1/12);
	// Menu.words['lang_FR'].getNode().setOpacity(0);
	// Menu.words['lang_FR'].display(mainLayer);
	
	// new Kinetic.Tween({
		// node: Menu.words['lang_FR'].getNode(),
		// opacity: Menu.opacity / 2,
		// easing: Kinetic.Easings.EaseIn,
		// duration: Menu.anim_duration,
	// }).play();
	
	// Event.onTap('Menu.lang_FR', Menu.words['lang_FR'], function() {
		// alert('A venir \n Soon');
	// }, true);
}

scriptLoaded('src/menu/menu.js');
