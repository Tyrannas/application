function getTime() {
	return new Date().getTime();
}

/* Fonction de log */

function log(str) {
	if(DEBUG) {
		console.log(str);
	}
}
function warn(str) {
	if(DEBUG) {
		console.warn(str);
	}
}

function debug(str) {
	if(DEBUG) {
		console.debug(str);
	}
}

var onDevice = (navigator.userAgent.match((/(iPhone|iPod|iPad|Android|BlackBerry|PlayBook|IEMobile)/)) == null) ? false : true;

function appOnDevice() {
	return false; // return onDevice;
}

function appOnDevice_real() {
	return onDevice;
}

scriptLoaded('src/functions.js');
