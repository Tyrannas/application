/*
	Event erase
*/
Event.erase_obj = {};

Event.onErase = function(id, object, callbackOnEvent, callbackOnChange, callbackOnBegin, callbackOnAbort) {
	Event.erase_obj[id] = {
		x1: object.getX() + Math.floor(object.getWidth() * 0.4),
		y1: object.getY() + Math.floor(object.getHeight() * -0.3),
		x2: object.getX() + Math.floor(object.getWidth() * 0.6),
		y2: object.getY() + Math.floor(object.getHeight() * 1.3),
		onEvent: callbackOnEvent,
		onChange: callbackOnChange,
		onBegin: callbackOnBegin,
		onAbort: callbackOnAbort,
		direction: 0,
		value: 0,
		old_value: 0,
	};
}

Event.erase = function(coords) {
	Event.checkTouchMove(Event.erase_obj, coords);
}

Event.destroyErase = function(id) {
	Destroy.listItem(Event.erase_obj, id);
}

scriptLoaded('scripts/libs/separation_toolkit/event/erase.js');