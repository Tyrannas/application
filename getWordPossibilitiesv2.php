<?php
	/* Initialiation */
	
	$code_polices = array();
	$code_polices['coupable_bas_min']	= array(array('o'),array('a'),array('a'),array('a','o'),array('a'),array('i'),array('g'),array('ii'),array('i','a'),array('j'),array('ii'),array('i'),array('iii'),array('ii'),array('a'),array('p'),array('q'),array('i'),array('a'),array('i','a'),array('a','o'),array('b'),array('e'),array('ii'),array('i','g','q'),array('z'));
	$code_polices['coupable_bas_maj'] 	= array(array('II'),array('O'),array('O','L'),array('O'),array('L'),array('I'),array('O'),array('II'),array('I'),array('O'),array('II'),array('L'),array('III'),array('II'),array('O'),array('I'),array('Q'),array('II'),array('O'),array('I'),array('O'),array('V'),array('W'),array('II'),array('I'),array('Z'));
	$code_polices['coupable_haut_min']	= array(array('o'),array('h'),array('o'),array('d'),array('o'),array('f'),array('o'),array('h'),array('i'),array('i'),array('ii','h'),array('l'),array('m'),array('o'),array('o'),array('o'),array('o'),array('o'),array('o'),array('t'),array('ii'),array('ii'),array('iii'),array('ii'),array('ii'),array('z'));
	$code_polices['coupable_haut_maj'] 	= array(array('A'),array('A'),array('A','C'),array('A'),array('A','C'),array('C'),array('A'),array('II'),array('I'),array('I','T'),array('II'),array('I'),array('M'),array('A','II'),array('A'),array('A'),array('A'),array('A'),array('A'),array('T'),array('II'),array('II'),array('III'),array('II'),array('II'),array('Z'));
	$code_polices['centrale'] 			= array(array('A'),array('B'),array('B'),array('B'),array('B'),array('F'),array('B'),array('H'),array('I'),array('J'),array('H'),array('L'),array('M'),array('A'),array('B'),array('P'),array('Q'),array('A'),array('B'),array('T'),array('U'),array('V'),array('W'),array('H'),array('Y'),array('Z'));
	
	// Renvoie un tableau contenant tous les mots possibles pour un code
	function getCodeWords($code, $police, $language)
	{
		$taille = strlen($code);
		$code_2 = substr($code, 0, 2);
		
		if ($language=='fr') {$p = 'local_db/french/';}
		else {$p = 'local_db/english/';}
		
		$url = $p . $police . '/' . $taille . '/' . $code_2 . '.php';
		$fct = 'gwc_' . $police . '_' . $taille . '_' . $code_2;
		
		if(!file_exists($url)) return array();
		
		include_once($url);
		$words = $fct($code);
		
		if($words == null) return array();
		else return $words;
	}

	// Renvoie un tableau contenant tous les codes possibles pour un mot
	function getWordCodes($word, $police, $casse)
	{
		global $code_polices;
		
		$word_codes = array();
		$i = 0;
		$word = strtolower($word);
		
		// On parcourt toutes les lettres du mot
		for ($i = 0 ; $i < strlen($word); $i++)
		{
			$c = $word[$i];
			// On récupère la liste des codes de la lettre
			$n = ord($c) - ord('a');
			$codes = $code_polices[$police][$n];
			
			$new_word_codes = array();
			
			// On parcourt tous les codes possibles
			foreach($codes as $code)
			{
				// Si word_codes est vide, on ajoute les premiers codes
				if(count($word_codes) <= 0)
				{
					array_push($new_word_codes, $code);
				}
				// Sinon on rajoute le code à la fin de chaque mot présent
				else
				{
					foreach($word_codes as $w)
					{
						array_push($new_word_codes, $w . $code);
					}
				}
			}
			
			$word_codes = $new_word_codes;
		}
		
		return $word_codes;
	}
	
	// Renvoie le mot $word avec la casse $casse
	function getWordCasse($word, $casse)
	{
		switch($casse)
		{
			case 'maj' : return strtoupper($word);
			case 'min' : return strtolower($word);
			default : return $word;
		}
	}
	
	$polices = array('coupable_haut_min', 'coupable_haut_maj', 'coupable_bas_min', 'coupable_bas_maj', 'centrale');
	$polices_casse = array('min', 'maj', 'min', 'maj', 'maj');
	$xml = '';
	
	/* Récupération des codes */
	
	$word = @$_GET['word'];
	$language = @$_GET['language']; // 'fr' or 'en'
	
	/* Traitement */
	$xml .= '<root>';
		foreach($polices as $i => $police)
		{
			$xml .= '<police value="' . $police . '">';
			
			$word = getWordCasse($word, $polices_casse[$i]);
			$codes = getWordCodes($word, $police, $polices_casse[$i]);

			foreach($codes as $code)
			{
				$possibilities = getCodeWords($code, $police, $language);

				$xml .= '<code value="' . $code . '">';
					foreach($possibilities as $p)
					{
						// getWordCasse temporaire définitif
						$xml .= '<word value="' . getWordCasse($p, $polices_casse[$i]) . '"></word>';
					}
				$xml .= '</code>';
			}
			
			$xml .= '</police>';
		}
	$xml .= '</root>';

	/* Affichage */
	header("Content-type: text/xml");
	header("Access-Control-Allow-Origin: *");
	header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
	
	echo $xml;
?>