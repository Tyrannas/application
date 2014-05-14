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

var onDevice = createjs.Touch.isSupported();//(navigator.userAgent.match((/(iPhone|iPod|iPad|Android|BlackBerry|PlayBook|IEMobile)/)) == null) ? false : true;

function appOnDevice() {
	return onDevice; 
}

function appOnDevice_real() {
	return onDevice;
}

function randRange(from,to) {
	return Math.floor(Math.random()*(to-from+1)+from);
}

function randArray(array) {
	len=array.length;
	i=0;
	while (i<(len)) {
		rand1=randRange(0,len-1);
		rand2=randRange(0,len-1);
		temp=array[rand1];
		array[rand1]=array[rand2];
		array[rand2]=temp;
		i++;
	}
	return array;
}

function getWordCodes(word, police)
{
	// Initialisation
	var word_codes = [];
	word = word.toLowerCase();
	
	// On parcourt toutes les lettres du mot
	for (var i = 0; i < word.length; i++)
	{
		var c = word[i];
		// On récupère la liste des codes de la lettre
		var n = c.charCodeAt(0) - 'a'.charCodeAt(0);
		var codes = code_polices[police][n];
		
		var new_word_codes = [];
		
		// On parcourt tous les codes possibles
		for(var j in codes)
		{
			var code = codes[j];
			// Si word_codes est vide, on ajoute les premiers codes
			if(word_codes.length <= 0)
			{
				new_word_codes.push(code);
			}
			// Sinon on rajoute le code à la fin de chaque mot présent
			else
			{
				for(k in word_codes)
				{
					new_word_codes.push(word_codes[k] + code);
				}
			}
		}
		
		word_codes = new_word_codes;
	}
	
	return word_codes;
}

/* Resize Bitmap */

function getScaleXY(w_obj, h_obj, w, h) {
	var scale = {x:1,y:1};
	if(w > 0 && h > 0) {
		scale.x = getScale(w_obj, w);
		scale.y = getScale(h_obj, h);
	}
	else if(w > 0) {
		scale.x = scale.y = getScale(w_obj, w);
	}
	else if(h > 0) {
		scale.x = scale.y = getScale(h_obj, h);
	}
	else {
		log("Erreur getScaleXY : w <= 0 & h <= 0");
	}
	
	return scale;
}

function getScale(c_obj, c) {
	return c / c_obj;
}

function rand(min, max)
{
	return Math.floor((Math.random() * max) + min);
}
function randTrue()
{
	return Math.random() >= 0.5;
}

scriptLoaded('src/functions.js');
