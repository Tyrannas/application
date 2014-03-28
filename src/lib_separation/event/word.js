/*
	Word event
*/
Word.prototype.addGesture = function() {
	
	var word = this;
	function onEvent(dir) {
		// sound_police_end(word.getPolice());
		word.setAnimation(dir);
		word.animate(dir);
	}
	function onChange(dir, value) {
		word.setAnimationOnChange(dir);
		word.animateOnChange(value);
	}
	function onBegin(dir) {
		if(!word.inAnimation) {
			Sound.police_begin(word.getPolice(), dir);
		}
	}
	function onAbort(dir) {
		if((dir != 0 || word.getPolice() == 3) && !word.inAnimation) {
			Sound.police_abort(word.getPolice(), dir);
			word.eventOnAbort();
		}
	}
	
	var events_fct = {
		0: 'onCut',
		1: 'onCut',
		2: 'onOpen',
		3: 'onErase',
		5: 'onCut',
	};
	
	switch(this.police)
	{
		case 0: case 1: case 2: case 3: case 5:
			Event[events_fct[this.police]](this.getId(), this, onEvent, onChange, onBegin, onAbort);
		break;
		default:
			alert('Police inconnue : ' + this.police + ' dans la fonction Word.addGesture()');
		break;
	}
}

Word.prototype.removeGesture = function() {
	switch(this.police)
	{
		case 0:
		case 1:
		case 5:
			Event.destroy(this.getId(), 'cut');
		break;
		case 2:
			Event.destroy(this.getId(), 'open');
		break;
		case 3:
			Event.destroy(this.getId(), 'erase');
		break;
		default:
			alert('Police inconnue : ' + this.police + ' dans la fonction Word.removeGesture()');
		break;
	}
}

Word.prototype.onTap = function(handler) {
	var id = this.getId();
	
	Event.onTap(id, this, function(word) { return function() {
		if(!word_active)
			handler(word);
	}}(this), true);
}

Word.prototype.removeGesture = function() {
	switch(this.police)
	{
		case 0:
		case 1:
		case 5:
			Event.destroy(this.getId(), 'cut');
		break;
		case 2:
			Event.destroy(this.getId(), 'open');
		break;
		case 3:
			Event.destroy(this.getId(), 'erase');
		break;
		default:
			alert('Police inconnue : ' + this.police + ' dans la fonction Word.removeGesture()');
		break;
	}
}

Word.prototype.eventOnAbort = function() {
	var events_fct = { 0: 'downCut', 1: 'upCut', 2: 'open', 3: 'erase', 5: 'downCut', 
	};
	switch(this.police) {
		case 0: case 1: case 2: case 3: case 5:
			Animation.onAbort[events_fct[this.police]](this);
		break;
		default:
			alert('Police inconnue : ' + this.police + ' dans la fonction Word.setEventOnAbort()');
		break;
	}
}

Word.prototype.activeOnTap = function() {
	if(this.value != this.next_value) {
		// this.onTap(function(word){
			// word.activate();
		// });
		this.addGesture();
	}
}

Word.prototype.activeDbltap = function() {
	// Event.onDblTap(this.getId(), stage, function(word) { return function() {
		// word.disable();
	// }}(this), false);
	this.setDone('eventFinished', function(word) { return function() {
		word.disable();
	}}(this));
}

Word.prototype.disableDbltap = function() {
	// Event.destroyDbltap(this.getId());
	this.removeDone('eventFinished');
}

scriptLoaded('src/lib_separation/event/word.js');