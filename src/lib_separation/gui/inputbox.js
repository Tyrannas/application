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
		while (inputboxcontainer.firstChild) {
			while (inputboxcontainer.firstChild.firstChild) {
				inputboxcontainer.firstChild.removeChild(inputboxcontainer.firstChild.firstChild);
			} 
			inputboxcontainer.removeChild(inputboxcontainer.firstChild);
		}
		inputboxcontainer.appendChild(inputboxbuttoncontainer);
	}
	
};

/*
	Affiche une boite avec possibilité de rentrer du texte. 
	Utilisation : 	options = { message: string, confirmText: string, cancelText: string, type: inputtype }
					callbacks = {success: function, cancel: function} <- argument optionel
*/
Inputbox.prompt = function (options, callbacks) {
	//Création des éléments nécessaires
	var input = document.createElement('input');
	var title = document.createElement('h3');
	var confirm = document.createElement('button');
	var cancel = document.createElement('button');
	
	//Ajout du texte custom
	title.textContent = options.message;
	confirm.textContent = options.confirmText;
	cancel.textContent = options.cancelText;
	
	input.type = options.type;
		
	//Binding des évènements
	inputbox.addEventListener("click", function (event){
		event.stopPropagation();
	});
	
	confirm.addEventListener("click", function () {
		var text = input.value;
		this.hide();
		if(typeof callbacks != "undefined" && typeof callbacks.success == "function") {
			callbacks.success(text);
		}
	}.bind(this));
			
	cancel.addEventListener("click", cancel_callback);
	
	canvas.addEventListener("click", cancel_callback);
	
	function cancel_callback() {
		canvas.removeEventListener("click", cancel_callback);
		Inputbox.hide();
		if(typeof callbacks != "undefined" && typeof callbacks.cancel == "function")
		{
			callbacks.cancel();
		}
	};
	
	//Ajout à l'inputbox de tous les éléments nécessaires
	inputboxcontainer.insertBefore(input, inputboxcontainer.firstChild);//On inverse car
	inputboxcontainer.insertBefore(title, inputboxcontainer.firstChild);//insertion devant le premier enfant
	inputboxbuttoncontainer.appendChild(confirm);
	inputboxbuttoncontainer.appendChild(cancel);
	
	this.show();
};

/*
	Affiche une boite type alert. 
	Utilisation : 	options = { message: string, confirmText: string }
					callbacks = { success: function, cancel: function } <- argument optionel
*/
Inputbox.alert = function (options, callbacks) {
	//Création des éléments nécessaires
	var title = document.createElement('h3');
	var confirm = document.createElement('button');
	
	//Ajout du texte custom
	title.textContent = options.message;
	confirm.textContent = options.confirmText;
		
	//Binding des évènements
	inputbox.addEventListener("click", function (event){
		event.stopPropagation();
	});
	
	confirm.addEventListener("click", function () {
		this.hide();
		if(typeof callbacks != "undefined" && typeof callbacks.success == "function") {
			callbacks.success();
		}
	}.bind(this));
	
	canvas.addEventListener("click", cancel_callback);
	
	function cancel_callback() {
		canvas.removeEventListener("click", cancel_callback);
		Inputbox.hide();
		if(typeof callbacks != "undefined" && typeof callbacks.cancel == "function")
		{
			callbacks.cancel();
		}
	};
	
	//Ajout à l'inputbox de tous les éléments nécessaires
	inputboxcontainer.insertBefore(title, inputboxcontainer.firstChild);//insertion devant le groupe contenant les boutons
	inputboxbuttoncontainer.appendChild(confirm);
	
	this.show();
};

/*
	Affiche une boite posant une question fermée. 
	Utilisation : 	options = { message: string, confirmText: string, cancelText: string }
					callbacks = {success: function, cancel: function} <- argument optionel
*/

Inputbox.confirm = function (options, callbacks) {
	//Création des éléments nécessaires
	var title = document.createElement('h3');
	var confirm = document.createElement('button');
	var cancel = document.createElement('button');
	
	//Ajout du texte custom
	title.textContent = options.message;
	confirm.textContent = options.confirmText;
	cancel.textContent = options.cancelText;
	
		
	//Binding des évènements
	inputbox.addEventListener("click", function (event){
		event.stopPropagation();
	});
	
	confirm.addEventListener("click", function () {
		this.hide();
		if(typeof callbacks != "undefined" && typeof callbacks.success == "function") {
			callbacks.success();
		}
	}.bind(this));
	
	cancel.addEventListener("click", cancel_callback);
	
	canvas.addEventListener("click", cancel_callback);
	
	function cancel_callback() {
		canvas.removeEventListener("click", cancel_callback);
		Inputbox.hide();
		if(typeof callbacks != "undefined" && typeof callbacks.cancel == "function")
		{
			callbacks.cancel();
		}
	};
	
	//Ajout à l'inputbox de tous les éléments nécessaires
	inputboxcontainer.insertBefore(title, inputboxcontainer.firstChild);//insertion devant le premier enfant
	inputboxbuttoncontainer.appendChild(confirm);
	inputboxbuttoncontainer.appendChild(cancel);
	
	this.show();
};

scriptLoaded('src/lib_separation/gui/inputbox.js');