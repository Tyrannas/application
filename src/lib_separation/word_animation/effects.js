var Effects = {}

Effects.respire_stop = new Array();

Effects.setLight = function(word_node) {
	Tween.get(word_node).to({
		alpha: Word_cst.opacity.light,
		}, Word_cst.duration.opacity, Ease.sideIn);	
}

Effects.setDark = function(word_node) {
	Tween.get(word_node).to({
		alpha: Word_cst.opacity.dark,
		}, Word_cst.duration.opacity);
}

Effects.respire = function(id, node, min, max) {
	
	Effects.respire_stop[id] = false;

	function effects_light() {
		//if(!Effects.respire_stop[id])
		//{
			// sound_play('inspiration');
			Tween.get(node).to({
				alpha: max,
			}, Word_cst.duration.respire, Ease.sineInOut)
			.call(effects_dark);
		//}
	}
	function effects_dark() {
		if(!Effects.respire_stop[id])
		{
			// sound_play('expiration');
			Tween.get(node).to({
				alpha: min,
			}, Word_cst.duration.respire, Ease.sineOut)
			.call(effects_light);
		}
	}
	
	effects_dark();
}

Effects.stopRespire = function(id, node) {
	Effects.respire_stop[id] = true;
}

scriptLoaded('src/lib_separation/word_animation/effects.js');
