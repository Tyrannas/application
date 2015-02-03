var Db = {};

Db.wordPossibilities = function(word) {
	var possibilities = [];
	for (var i in police_list) {
		var police = police_list[i];
		var npolice = Word_getNormalizedPolice(police);
		word_codes = getWordCodes(word, police);
		for (var j in word_codes) {
			var code = word_codes[j];
			words = window["gwc_"+police+"_"+code.length+"_"+code[0]](code);
			for (var k in words) {
				var xword = words[k];
				if (xword != word) {
					possibilities.push(new Possibility(xword, npolice, code));
				}
			}
		}
	}
	return randArray(possibilities);
}

scriptLoaded('src/lib_separation/db/db.js');
