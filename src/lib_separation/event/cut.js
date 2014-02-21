/*
	Event cut
*/
Event.cut_obj = {};

Event.onCut = function(id, object, callbackOnEvent, callbackOnChange, callbackOnBegin, callbackOnAbort) {
	Event.cut_obj[id] = {
		x1: object.getX() + Math.floor(object.getWidth() * 0.1),
		y1: object.getY() + Math.floor(object.getHeight() * -0.2),
		x2: object.getX() + Math.floor(object.getWidth() * 0.9),
		y2: object.getY() + Math.floor(object.getHeight() * 1.2),
		onEvent: callbackOnEvent,
		onChange: callbackOnChange,
		onBegin: callbackOnBegin,
		onAbort: callbackOnAbort,
		direction: 0,
		value: 0,
		old_value: 0,
	};
}

Event.cut = function(coords) {
	Event.checkTouchMove(Event.cut_obj, coords);	
}

Event.destroyCut = function(id) {
	Destroy.listItem(Event.cut_obj, id);
}

scriptLoaded('scripts/libs/separation_toolkit/event/cut.js');