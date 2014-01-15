/*
	Event cut
*/
Event.open_obj = {};

Event.onOpen = function(id, object, callbackOnEvent, callbackOnChange, callbackOnBegin, callbackOnAbort) {
	Event.open_obj[id] = {
		y1: object.getX() + Math.floor(object.getWidth() * -0.1),
		x1: object.getY() + Math.floor(object.getHeight() * 0.0),
		y2: object.getX() + Math.floor(object.getWidth() * 1.1),
		x2: object.getY() + Math.floor(object.getHeight() * 1.0),
		onEvent: callbackOnEvent,
		onChange: callbackOnChange,
		onBegin: callbackOnBegin,
		onAbort: callbackOnAbort,
		direction: 0,
		value: 0,
		old_value: 0,
	};
}

Event.open = function(coords) {
	Event.checkTouchMove(Event.open_obj, coords);
}

Event.destroyOpen = function(id) {
	Destroy.listItem(Event.open_obj, id);
}

scriptLoaded('scripts/libs/separation_toolkit/event/open.js');