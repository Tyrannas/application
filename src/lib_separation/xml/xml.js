var Xml = {};

Xml.load = function(xml_path) {
	var loadedFile;

	if(navigator.appname == 'Microsoft Internet Explorer') {
		loadedFile = new ActiveXObject("Microsoft.XMLDOM");
		loadedFile.async = false;
		while(loadedFile.readyState != 4) {};
		loadedFile.load(xml_path);
	}
	else {
		var xmlhttp = new XMLHttpRequest();
		xmlhttp.open("GET", xml_path, false);
		xmlhttp.setRequestHeader('Content-Type', 'text/xml');
		xmlhttp.send();
		loadedFile = xmlhttp.responseXML;
	}
	return loadedFile;
}

Xml.importStory = function(xml_file) {
	// var xml_file = Xml.load(xml_path);
	var xstory = xml_file.getElementsByTagName("story")[0];
	var xsentences = xstory.getElementsByTagName("sentence");

	var story = new Story();

	for(i=0; i < xsentences.length ; i++) {

		var sentence = new Sentence();

		var xsentence = xsentences[i];
		var xwords = xsentence.getElementsByTagName("word");

		for (j=0; j < xwords.length; j++) {
			var xword = xwords[j];
			var value = xword.textContent;
			var next_value = xword.getAttribute("next_value");
			var police = Word_getNormalizedPolice(xword.getAttribute("police"));
			var code = xword.getAttribute("code");

			var word = new Word(value, next_value, police, code);
			sentence.add(word);

		}

		story.add(sentence);

	}

	return story;

}

Xml.importLabRequest = function(word_requested) {
	var language="fr"; // fr or en
	var xml_file = Xml.load('http://192.185.52.237/~lasepa/beta/API/getWordPossibilitiesv2.php?word=' + word_requested + "&language=" + language);
	
	var p = new Array();
	
	var xroot = xml_file.getElementsByTagName("root")[0];
	var xpolices = xroot.getElementsByTagName("police");
	
	for (var i = 0; i < xpolices.length; i++) {
		var xpolice = xpolices[i];
		var police = Word_getNormalizedPolice(xpolice.getAttribute("value"));

		var xcodes = xpolice.getElementsByTagName("code");
		for (var j = 0; j < xcodes.length; j++) {
			var xcode = xcodes[j];
			var code = xcode.getAttribute("value");
			
			var xwords = xcode.getElementsByTagName("word");
			for(var k = 0; k < xwords.length; k++) {
				var xword = xwords[k];
				var value = xword.getAttribute("value");
				
				if(value.toLowerCase() != word_requested.toLowerCase()) {
					p.push(new Possibility(value, police, code));
				}
			}
		}
	}
	p=randArray(p);
	return p;
}

scriptLoaded('src/lib_separation/xml/xml.js');
