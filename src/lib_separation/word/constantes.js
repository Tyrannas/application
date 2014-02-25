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
		open: 2000,
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

var fontConst = {
	car: {						// Caractère (lettre)
		size: fontSize,				// Taille de la police WILL BE REMOVED
		color: C_CONT,				// Couleur WILL BE REMOVED
		height_img: 264,
		height: 264/4,
		scale: 1,
	},
	police: {
		name: 0,	// Police (par défaut coupable_haut)
		0: {			// Police coupable_haut en deux parties
			offsetY: {				// Décalage y
				'demihauth': 0,					// Distance en y pour la partie haute
				'demihautb': 0,				// Distance en y pour la partie basse
			},
		},
		5: {			// Police coupable_haut en deux parties
			offsetY: {				// Décalage y
				'demihauth': 0,					// Distance en y pour la partie haute
				'demihautb': 4,				// Distance en y pour la partie basse
			},
		},
		1: {			// Police coupable_bas en deux parties
			offsetY: {				// Décalage y
				'demibash': 0,				// Distance en y pour la partie haute
				'demibasb': 0,				// Distance en y pour la partie basse
			},
		},
		2: {			// Police centrale en trois parties
			offsetY: {				// Décalage y
				'centraleh': 0,
				'centralec': 0,
				'centraleb': 0,
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
	SS: {
		'demihauth': {
			offsetX: 0,
			offsetY: 0,
			letters: {
				' ':88,'A':176,'B':176,'C':176,'D':176,'E':88,'F':88,'G':176,'H':176,'I':88,'J':88,'K':176,'L':88,'M':264,
				'N':176,'O':176,'P':176,'Q':176,'R':176,'S':176,'T':88,'U':176,'V':176,'W':264,'X':176,'Y':176,'Z':176,'€':176,
				'a':138,'b':138,'c':138,'d':138,'e':138,'f':69,'g':138,'h':138,'i':69,'j':69,'k':138,'l':69,'m':207,
				'n':138,'o':138,'p':138,'q':138,'r':138,'s':138,'t':69,'u':138,'v':138,'w':207,'x':138,'y':138,'z':138,
			},
			matrice: [' ABCDEFGHIJKLM','NOPQRSTUVWX','YZ€', 'abcdefghijklmnop', 'qrstuvwxyz'],
			height: 264,
		},
		'demihautb': {
			offsetX: 0,
			offsetY: 0,
			letters: {
				' ':88,'A':176,'B':176,'C':176,'D':176,'E':88,'F':88,'G':176,'H':176,'I':88,'J':88,'K':176,'L':88,'M':264,
				'N':176,'O':176,'P':176,'Q':176,'R':176,'S':176,'T':88,'U':176,'V':176,'W':264,'X':176,'Y':176,'Z':176,'€':176,
				'a':138,'b':138,'c':138,'d':138,'e':138,'f':69,'g':138,'h':138,'i':69,'j':69,'k':138,'l':69,'m':207,
				'n':138,'o':138,'p':138,'q':138,'r':138,'s':138,'t':69,'u':138,'v':138,'w':207,'x':138,'y':138,'z':138,
			},
			matrice: [' ABCDEFGHIJKLM','NOPQRSTUVWX','YZ€', 'abcdefghijklmnop', 'qrstuvwxyz'],
			height: 264,
		},
		'demibash': {
			offsetX: 0,
			offsetY: 0,
			letters: {
				' ':88,'A':176,'B':176,'C':176,'D':176,'E':88,'F':88,'G':176,'H':176,'I':88,'J':176,'K':176,'L':88,'M':264,
				'N':176,'O':176,'P':88,'Q':176,'R':176,'S':176,'T':88,'U':176,'V':176,'W':264,'X':176,'Y':88,'Z':176,'[':88,
				'a':138,'b':138,'c':138,'d':138,'e':138,'f':69,'g':138,'h':138,'i':69,'j':69,'k':138,'l':69,'m':207,
				'n':138,'o':138,'p':138,'q':138,'r':69,'s':138,'t':69,'u':138,'v':138,'w':207,'x':138,'y':88,'z':138,'_':69,
			},
			matrice: [' ABCDEFGHIJKLN','OPMQRSTUVWX','YZ[', 'abcdefghijklmno_', 'pqrstuvwxyz'],
			height: 264,
		},
		'demibasb': {
			offsetX: 0,
			offsetY: 0,
			letters: {
				' ':88,'A':176,'B':176,'C':176,'D':176,'E':88,'F':88,'G':176,'H':176,'I':88,'J':176,'K':176,'L':88,'M':264,
				'N':176,'O':176,'P':88,'Q':176,'R':176,'S':176,'T':88,'U':176,'V':176,'W':264,'X':176,'Y':88,'Z':176,'[':88,
				'a':138,'b':138,'c':138,'d':138,'e':138,'f':69,'g':138,'h':138,'i':69,'j':69,'k':138,'l':69,'m':207,
				'n':138,'o':138,'p':138,'q':138,'r':69,'s':138,'t':69,'u':138,'v':138,'w':207,'x':138,'y':88,'z':138,'_':69,
			},
			matrice: [' ABCDEFGHIJKLN','OPMQRSTUVWX','YZ[', 'abcdefghijklmno_', 'pqrstuvwxyz'],
			height: 264,
		},
		'centraleh': {
			offsetX: 1,
			offsetY: 1,
			letters: {
				' ':88,'A':176,'B':176,'C':176,'D':176,'E':88,'F':88,'G':176,'H':176,'I':88,'J':88,'K':176,'L':88,'M':264,
				'N':176,'O':176,'P':176,'Q':176,'R':176,'S':176,'T':88,'U':176,'V':176,'W':264,'X':176,'Y':176,'Z':176,
				'c':88,'e':176,'n':176,'p':88,
			},
			matrice: [' ABCDEFGHIJKLM','NOPQRSUVWXY','TZcenp'],
			height: 264,
		},
		'centralec': {
			offsetX: 1,
			offsetY: 1,
			letters: {
				' ':88,'A':176,'B':176,'C':176,'D':176,'E':88,'F':88,'G':176,'H':176,'I':88,'J':88,'K':176,'L':88,'M':264,
				'N':176,'O':176,'P':176,'Q':176,'R':176,'S':176,'T':88,'U':176,'V':176,'W':264,'X':176,'Y':176,'Z':176,
				'c':88,'e':176,'n':176,'p':88,
			},
			matrice: [' ABCDEFGHIJKLM','NOPQRSUVWXY','TZcenp'],
			height: 264,
		},
		'centraleb': {
			offsetX: 1,
			offsetY: 1,
			letters: {
				' ':88,'A':176,'B':176,'C':176,'D':176,'E':88,'F':88,'G':176,'H':176,'I':88,'J':88,'K':176,'L':88,'M':264,
				'N':176,'O':176,'P':176,'Q':176,'R':176,'S':176,'T':88,'U':176,'V':176,'W':264,'X':176,'Y':176,'Z':176,
				'c':88,'e':176,'n':176,'p':88,
			},
			matrice: [' ABCDEFGHIJKLM','NOPQRSUVWXY','TZcenp'],
			height: 264,
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
};

function initConstantes() {
	fontConst.car.scale = getScale(fontConst.car.height_img, fontConst.car.height);
}

scriptLoaded('src/lib_separation/word/constantes.js');
