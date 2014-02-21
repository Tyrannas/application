Rooter={};

Rooter.preloadAll = function(handler) {
	var manifest = [
		// Image
			// Logo
			{src:"img/logo/logo_up.png", id:"logo_up"},
			{src:"img/logo/logo_central.png", id:"logo_central"},
			{src:"img/logo/logo_down.png", id:"logo_down"},
			// GUI
			{src:"img/gui/logo_miniature.png", id:"gui_logo"},
			{src:"img/gui/arrow_right.png", id:"gui_arrow_right"},
			{src:"img/gui/arrow_left.png", id:"gui_arrow_left"},
			{src:"img/gui/back.png", id:"gui_arrow_back"},
			{src:"img/gui/scroll_down.png", id:"gui_scroll_down"},
			{src:"img/gui/scroll_up.png", id:"gui_scroll_up"},
			{src:"img/gui/scroll_left.png", id:"gui_scroll_left"},
			{src:"img/gui/scroll_right.png", id:"gui_scroll_right"},
			{src:"img/gui/roll_up.png", id:"gui_roll_up"},
			{src:"img/gui/roll_down.png", id:"gui_roll_down"},
			// Fonts
			{src:"img/font/demihaut.png", id:"font_demihaut"},
			{src:"img/font/demihaut_h.png", id:"font_demihauth"},
			{src:"img/font/demihaut_b.png", id:"font_demihautb"},
			{src:"img/font/demibas_h.png", id:"font_demibash"},
			{src:"img/font/demibas_b.png", id:"font_demibasb"},
			// Menu labo
			{src:"img/menu_labo/input_text.png", id:"menu_labo_input_text"},
			{src:"img/menu_labo/checkbox.png", id:"menu_labo_checkbox"},
			{src:"img/menu_labo/checkbox_valid.png", id:"menu_labo_checkbox_valid"},
			//
			{src:"img/menu_recit/vignette.png", id:"menu_recit_vignette"},
		
		// XML
			// Story
			{src:"story/separation.xml", id:"story_separation"},
			{src:"story/quotidien.xml", id:"story_quotidien"},
    ];
	
	preload = new createjs.LoadQueue(true, "res/");
	preload.on("complete", function() { initAllSS(); handler(); });
	preload.loadManifest(manifest);
}

function res(id) { return preload.getResult(id); }
function resSS(id) {
	// switch(id) {
		// case 'demihauth': case 'demihautb':
			return preload.getResult('font_'+id);
		// break;
	// }
}

scriptLoaded('src/rooter.js');
