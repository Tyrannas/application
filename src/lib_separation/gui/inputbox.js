/*
	Class Inputbox
*/

var Inputbox = {}

Inputbox.show = function() {
	inputbox.style.display = 'block';
	
	inputbox.style.opacity = parseFloat(inputbox.style.opacity) + 0.1;
	if(inputbox.style.opacity < 1) {
		setTimeout(Inputbox.show, 30);
	}
};

Inputbox.hide = function() {	
	inputbox.style.opacity = parseFloat(inputbox.style.opacity) - 0.1;
	if(inputbox.style.opacity > 0) {
		setTimeout(Inputbox.hide, 20);
	}
	else {
		inputbox.style.display = 'none';
		while (inputbox.firstChild) {
			inputbox.removeChild(inputbox.firstChild);
		}
	}
	
};

Inputbox.text = function (options, callbacks) {
	//Création des éléments nécessaires
	var input = document.createElement('input');
	var title = document.createElement('h3');
	var confirm = document.createElement('button');
	var cancel = document.createElement('button');
	
	//Ajout du texte custom
	title.textContent = options.message;
	confirm.textContent = options.confirmText;
	cancel.textContent = options.cancelText;
	
	input.type = 'text';
		
	//Binding des évènements
	confirm.addEventListener("click", function () {
		var text = input.value;
		this.hide();
		if(typeof callbacks != "undefined" && typeof callbacks.success == "function") {
			callbacks.success(text);
		}
	}.bind(this));
	
	cancel.addEventListener("click", function () {
		this.hide()
		if(typeof callbacks != "undefined" && typeof callbacks.cancel == "function")
		{
			callbacks.cancel();
		}
	}.bind(this));
	
	//Ajout à l'inputbox de tous les éléments nécessaires
	inputboxcontainer.insertBefore(input, inputboxcontainer.firstChild);//On inverse car
	inputboxcontainer.insertBefore(title, inputboxcontainer.firstChild);//insertion devant le premier enfant
	inputboxbuttoncontainer.appendChild(confirm);
	inputboxbuttoncontainer.appendChild(cancel);
	
	this.show();
};

scriptLoaded('src/lib_separation/gui/inputbox.js');