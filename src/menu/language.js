function changeLanguage(lang) {
	if(lang == fr) { activeLang = fr; }
	else { activeLang = en; }

	alreadyReadXML = false;

	tutorielH.setText(activeLang["tuto"]);
	tutorielH.setOffset( tutorielH.getWidth()/2, tutorielH.getHeight()/2 );

	tutorielB.setText(activeLang["tuto"]);
	tutorielB.setOffset( tutorielB.getWidth()/2 , tutorielB.getHeight()/2 );

	recitH.setText(activeLang["story"]);
	recitH.setOffset( recitH.getWidth()/2, recitH.getHeight()/2 );

	recitB.setText(activeLang["story"]);
	recitB.setOffset( recitB.getWidth()/2, recitB.getHeight()/2 );

	laboratoireH.setText(activeLang["labo"]);
	laboratoireH.setOffset( laboratoireH.getWidth()/2, laboratoireH.getHeight()/2 );

	laboratoireB.setText(activeLang["labo"]);
	laboratoireB.setOffset( laboratoireB.getWidth()/2, laboratoireB.getHeight()/2 );

	conceptH.setText(activeLang["concept"]);
	conceptH.setOffset( conceptH.getWidth()/2, conceptH.getHeight()/2 );

	conceptB.setText(activeLang["concept"]);
	conceptB.setOffset( conceptB.getWidth()/2 , conceptB.getHeight()/2 );
}


scriptLoaded('scripts/menu/language.js');