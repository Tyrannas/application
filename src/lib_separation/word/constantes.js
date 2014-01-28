var Word_cst = {
	zoom: {
		recit: 2,
	},
	duration: {
		zoom: 1000,
		zoomout: 1000,
		
		opacity: 1000,
		
		downCut: 2000,
		upCut: 2000,
		ombre: 500,
		
		respire: 1200,
	},
	opacity: {
		light: 1,
		dark: 0,
	},
}

var Word_polices = {
	0 : 'coupable_haut',
	1 : 'coupable_bas',
	2 : 'centrale',
	3 : 'ombre',
	4 : 'coupable_entier',
	5 : 'coupable_haut',
}

function Word_getNormalizedPolice(police) {
	switch (police) {
		case 'coupable_min_haut' :
		case 'coupable_maj_haut' :
		case 'coupable_haut_maj' :
		case 'coupable_haut_min' :
		case 'coupable_haut' :
			return 0;
		case 'coupable_min_bas' :
		case 'coupable_maj_bas' :
		case 'coupable_bas_maj' :
		case 'coupable_bas_min' :
		case 'coupable_bas' :
			return 1;
		case 'centrale' :
			return 2;
		case 'ombre' :
			return 3;
		case 'coupable_haut_entier' :
			return 4;
		default:
			alert('Police inconnue : ' . police);
			return 0;
	}
}

if(!appOnDevice()) {
	// Selon le choix (exemple : '24px'), deviendra la variable rct (RecitConsTantes)
	fontConst = {
		'24px': {
			car: {						// Caractère (lettre)
				size: 28,					// Taille de la police
				color: C_CONT,				// Couleur
				height: 42,					// Hauteur réelle du caractère
			},
			police: {
				name: 0,	// Police (par défaut coupable_haut)
				0: {			// Police coupable_haut en deux parties
					offset: {				// Décalage y
						up: -10,					// Distance en y pour la partie haute
						down: 20,				// Distance en y pour la partie basse
					},
					name: {					// Nom des deux parties
						up: 'demihauth',
						down: 'demihautb',
					},
				},
				5: {			// Police coupable_haut en deux parties avec écart
					offset: {				// Décalage y
						up: -11,					// Distance en y pour la partie haute
						down: 21,				// Distance en y pour la partie basse
					},
					name: {					// Nom des deux parties
						up: 'demihauth',
						down: 'demihautb',
					},
				},
				1: {			// Police coupable_bas en deux parties
					offset: {				// Décalage y
						up: -2,					// Distance en y pour la partie haute
						down: 21,				// Distance en y pour la partie basse
					},
					name: {					// Nom des deux parties
						up: 'demibash',
						down: 'demibasb',
					},
				},
				2: {			// Police centrale en trois parties
					offset: {				// Décalage y
						up: -8,					// Distance en y pour la partie haute
						central: 6,
						down: 16,				// Distance en y pour la partie basse
					},
					name: {					// Nom des trois parties
						up: 'centraleh',
						central: 'centralec',
						down: 'centraleb',
					},
				},
				3: {				// Police de l'ombre
					offset: -5,
				},
				4: {				// Police coupable haut entier en une partie
					offset: 0,			// Décalage y
					name: 'demihaut_entier',	// Nom de la police
				},
			},
			recit: {
				margin: {				// Marge...
					up: 12,					// ... supérieure (size/2)
					down: 12,				// ... inférieure
				},
				line: {				// Ligne
					height: 64,			// Hauteur
					nb: 1,				// Nombre de lignes
				},
			},
		}
	};
}
else {
	// Selon le choix (exemple : '24px'), deviendra la variable rct (RecitConsTantes)
	fontConst = {
		'24px': {
			car: {						// Caractère (lettre)
				size: 28,					// Taille de la police
				color: C_CONT,				// Couleur
				height: 42,					// Hauteur réelle du caractère
			},
			police: {
				name: 0,	// Police (par défaut coupable_haut)
				0: {			// Police coupable_haut en deux parties
					offset: {				// Décalage y
						up: -8,				// Distance en y pour la partie haute
						down: 18,				// Distance en y pour la partie basse
					},
					name: {					// Nom des deux parties
						up: 'demihauth',
						down: 'demihautb',
					},
				},
				5: {			// Police coupable_haut en deux parties avec écart
					offset: {				// Décalage y
						up: -9,					// Distance en y pour la partie haute
						down: 19,				// Distance en y pour la partie basse
					},
					name: {					// Nom des deux parties
						up: 'demihauth',
						down: 'demihautb',
					},
				},
				1: {			// Police coupable_bas en deux parties
					offset: {				// Décalage y
						up: -2,					// Distance en y pour la partie haute
						down: 21,				// Distance en y pour la partie basse
					},
					name: {					// Nom des deux parties
						up: 'demibash',
						down: 'demibasb',
					},
				},
				2: {			// Police centrale en trois parties
					offset: {				// Décalage y
						up: -8,					// Distance en y pour la partie haute
						central: 6,
						down: 16,				// Distance en y pour la partie basse
					},
					name: {					// Nom des trois parties
						up: 'centraleh',
						central: 'centralec',
						down: 'centraleb',
					},
				},
				3: {				// Police de l'ombre
					offset: -5,
				},
				4: {				// Police coupable haut entier en une partie
					offset: 0,			// Décalage y
					name: 'demihaut_entier',	// Nom de la police
				},
			},
			recit: {
				margin: {				// Marge...
					up: 12,					// ... supérieure (size/2)
					down: 12,				// ... inférieure
				},
				line: {				// Ligne
					height: 64,			// Hauteur
					nb: 1,				// Nombre de lignes
				},
			},
		}
	};
}

scriptLoaded('src/lib_separation/word/constantes.js');
