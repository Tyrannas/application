/*
	Event checkTouchMove
*/

Event.checkTouchMove = function(obj_list, coords) {
	for(var i in obj_list) {
		var obj = obj_list[i];
		if(obj == undefined) alert('undefined : ' + i); else
		// On regarde si le curseur est dans le cadre
		if((obj.y1 <= coords.y1) && (coords.y1 <= obj.y2) &&
		   (obj.y1 <= coords.y2) && (coords.y2 <= obj.y2)) {
			// Si le curseur est entré dans le rectangle par la gauche / le haut,
			// c'est le début d'un event de direction 1
			if((coords.x1 <= obj.x1) && (obj.x1 <= coords.x2)) {
				obj.direction = 1;
				obj.onChange(obj.direction, obj.value);
				obj.onBegin(obj.direction);
			}
			// Si le curseur est entré dans le rectangle par la droite / le bas,
			// c'est le début d'un event de direction -1
			else if((coords.x2 <= obj.x2) && (obj.x2 <= coords.x1)) {
				obj.direction = -1;
				obj.onChange(obj.direction, obj.value);
				obj.onBegin(obj.direction);
			}

			// Si un event est en cours
			// On calcule la valeur de l'avancement du geste
			if(obj.direction == 1) {
				obj.value = (coords.x2 - obj.x1) / (obj.x2 - obj.x1);
			}
			else if(obj.direction == -1) {
				obj.value = -(coords.x2 - obj.x2) / (obj.x2 - obj.x1);
			}
			
			// On ajuste si le curseur est en dehors du rectangle
			if(obj.value < 0) {
				obj.value = 0;
			}
			else if(obj.value > 1) {
				obj.value = 1;
			}
			
			// Si la valeur est à 1 c'est que le geste est fini
			if(obj.value == 1) {
				obj.onEvent(obj.direction);
				
				obj.direction = 0;
				obj.value = 0;
				obj.old_value = 0;
			}
			else if(obj.old_value != obj.value) {
				obj.onChange(obj.direction, obj.value);
			}
			obj.old_value = obj.value;
		}
		// Sinon on remets à 0 l'évènement
		else
		{
			obj.onAbort(obj.direction);
			
			obj.direction = 0;
			obj.value = 0;
			obj.old_value = 0;
		}
	}
}

scriptLoaded('scripts/libs/separation_toolkit/event/touchmove.js');