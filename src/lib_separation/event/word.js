/*
	Word event
*/
Word.prototype.addGesture = function() {
	this.removeGesture();
	var word = this;
	function onEvent(dir) {
		//sound_police_end(word.getPolice());
		word.setAnimation(dir);
		word.animate(dir);
	}
	function onChange(dir, value) {
		word.setAnimationOnChange(dir);
		word.animateOnChange(value);
	}
	function onBegin(dir) {
		if(!word.inAnimation) {
			sound_manager.police_begin(word.getPolice(), dir);
		}
	}
	function onAbort(dir) {
		if((dir != 0 || word.getPolice() == 3) && !word.inAnimation) {
			sound_manager.police_abort(word.getPolice(), dir);
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
			this.lancerAides();
		break;
		default:
			alert('Police inconnue : ' + this.police + ' dans la fonction Word.addGesture()');
		break;
	}
}

Word.prototype.lancerAides = function() {
	//debug('Lancement des aides : '+this.value+' ; '+this.next_value);
	var wait1 = rand(TIMEOUT_AIDE1.min, TIMEOUT_AIDE1.max);
	var wait2 = wait1 + rand(TIMEOUT_AIDE1.min, TIMEOUT_AIDE1.max);
	var wait3 = wait2 + rand(TIMEOUT_AIDE2.min, TIMEOUT_AIDE2.max);

	var aide1_prefixe = 'aide1';
	var aide2_prefixe = 'aide2';
	var aides_fct = {
		0: 'DownCut',
		1: 'UpCut',
		2: 'Open',
		3: 'Erase',
		5: 'DownCut',
	};

	var word = this;
	this.timeouts.push(setTimeout(function(){Animation[aide1_prefixe+aides_fct[word.police]](word);}, wait1));
	this.timeouts.push(setTimeout(function(){Animation[aide1_prefixe+aides_fct[word.police]](word);}, wait2));
	this.timeouts.push(setTimeout(function(){Animation[aide2_prefixe+aides_fct[word.police]](word);}, wait3));
	this.timeouts.push(setTimeout(function(){word.lancerAides();}, wait3 + TIMEOUT_AIDES_AGAIN));
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
	this.destroyTimeouts();
}

Word.prototype.onTap = function(handler) {
	var id = this.getId();
	
	Event.onTap(id, this, function(word) { return function() {
		if(!word_active)
			handler(word);
	}}(this), true);
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