/*
	Convertit un code de l'ancien système dans le nouveau
*/
function convertCode(value, code, police) {
	var new_code = '';
	
	for(var i = 0; i < code.length; i++) {
		switch(police) {
			case 0:
				switch(code[i]) {
					case 'A': new_code += 'O'; break;
					case 'C': new_code += 'E'; break;
					default: new_code += code[i];
				}
			break;
			case 1:
				switch(code[i]) {
					case 'a': new_code += 'o'; break;
					case 'o': new_code += 'a'; break;
					case 'i': new_code += 'l'; break;
					case 'b': new_code += 'v'; break;
					case 'e': new_code += 'w'; break;
					default: new_code += code[i];
				}
			break;
			default: new_code += code[i];
		}
	}
	
	return new_code;
}

function setCase(str, i, code) {
	if(code != undefined) {
		if(i > str.length - 1) {
			return str.toString();
		} else {
			if(code == code.toLowerCase()) {
				return str.substr(0, i) + str[i].toLowerCase() + str.substr(i + 1);
			} else {
				return str.substr(0, i) + str[i].toUpperCase() + str.substr(i + 1);
			}
		}
	}
}

/*
	Convertit un mot de l'ancien système dans le nouveau
*/
function convertValue(value, code, police) {
	var new_value = '';
	
	for(var i = 0, i_code = 0; i < value.length; i++, i_code++) {
	
		// if(value = 'litige') log(value + ' ' + new_value);
		value = setCase(value, i, code[i_code]);
	
		switch(police) {
			case 0:
				switch(value[i]) {
					case 'w': case 'W': // Lettres de largeur 3
						new_value += value[i];
						if(code[i_code].toLowerCase() == 'i') i_code += 2;
					break;
					case 'k': case 'u': case 'v': case 'x': case 'y': // Lettres de largeur 2
					case 'H': case 'K': case 'U': case 'V': case 'X': case 'Y': 
						new_value += value[i];
						if(code[i_code].toLowerCase() == 'i') i_code++;
					break;
					case 'C': // Le C peut être rond ('C') ou carré ('L')
						new_value += (code[i_code] == 'O') ? 'C' : 'L';
					break;
					case 'E': // Le E peut être rond ('') ou carré ('E')
						new_value += (code[i_code] == 'O') ? '€' : 'E';
					break;
					case 'N': // Le N peut être rond ('^') ou normal ('N')
						if(code[i_code] == 'O') new_value += 'II';
						else { new_value += 'N'; i_code++; } // N a une largeur 2 quand son code est 'II'
					break;
					default:
						new_value += value[i];
				}
			break;
			case 1:
				switch(value[i]) {
					case 'm': case 'M': // Lettres de largeur 3
						new_value += value[i];
						if(code[i_code] == 'l' || code[i_code] == 'I') i_code += 2;
					break;
					case 'h': case 'k': case 'n': case 'x': // Lettres de largeur 2
					case 'A': case 'H': case 'K': case 'N': case 'R': case 'X': 
						new_value += value[i];
						if(code[i_code] == 'l' || code[i_code] == 'I') i_code++;
					break;
					case 'i': case 't': // Lettres de largeur 1 à transformer en largeur 2 (ajout espace ' ')
						// if(code[i_code] != 'o') log(value + ' ' + code);
						new_value += (code[i_code] == 'o') ? (value[i] + '_') : value[i];
					break;
					case 'y': // Si le 'y' a le code 'i', le haut doit être en V (provisoirement 'Y')
						new_value += (code[i_code] == 'l') ? 'y' : 'y';
					break;
					case 'C': // Le C peut être rond ('C') ou carré ('[')
						new_value += (code[i_code] == 'O') ? 'C' : '[';
					break;
					case 'E': // Le E peut être rond ('') ou carré ('E')
						new_value += (code[i_code] == 'O') ? 'Ê' : 'E';
					break;
					default:
						new_value += value[i];
				}
			break;
			case 2:
				switch(value[i]) {
					case 'E': // Le E peut être rond ('e') ou carré ('E')
						new_value += 'e';
					break;
					default:
						new_value += value[i];
				}
			break;
			default:
				new_value += value[i];
		}
	}
	
	return new_value;
}

scriptLoaded('src/lib_separation/codes/codes.js');
