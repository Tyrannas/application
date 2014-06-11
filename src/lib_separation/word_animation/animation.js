/**
	Namespace recit
*/
var Animation = {};
Animation.onChange = {};
// Animation.onBegin = {};
Animation.onAbort = {};

Word.prototype.animate = function(dir) {
	if(!this.inAnimation) {
		this.inAnimation = true;
		this.animation(this, dir);
		// this.disableDbltap();
		this.destroyTimeouts();
	}
	
	this.done('animate');
}
	
Word.prototype.animateOnChange = function(value) {
	if(!this.inAnimation) {
		this.animationOnChange(this, value);
	}
	
	this.done('animateOnChange');
}

Word.prototype.animationFinished = function(event_finish) {
	if(this.inAnimation) {
		this.inAnimation = false;
		// this.activeDbltap();
		
		if(event_finish) {
			if(this.police != 3) { // temp police OMBRE images
				var temp = this.next_value;
				this.next_value = this.value;
				this.value = temp;
				
				this.generate();
				if (!this.getRepeat()) {
					this.removeGesture();
				}
				else {
					this.addGesture();
				}
				this.display();
			}
			this.done('eventFinished');
		}

		this.done('animationFinished');
	}
}

Word.prototype.setAnimation = function(dir) {
	switch(this.police) {
		case 0:
		case 5:
			if(dir == -1) {
				this.animation = Animation.downCutLeft;
			} else if (dir == 1) {
				this.animation = Animation.downCutRight;
			}
		break;
		case 1:
			if(dir == -1) {
				this.animation = Animation.upCutLeft;
			} else if (dir == 1) {
				this.animation = Animation.upCutRight;
			}
		break;
		case 2:
			this.animation = Animation.open;
		break;
		case 3:
			this.animation = Animation.ombre;
		break;
		default:
			alert('Police inconnue : ' + this.police + ' dans la fonction Word.setAnimation()');
		break;
	}
}


Word.prototype.setAnimationOnChange = function(dir) {
	if(dir != 0) {
		switch(this.police) {
			case 0:
			case 5:
				if(dir == -1) {
					this.animationOnChange = Animation.onChange.downCutLeft;
				} else if (dir == 1) {
					this.animationOnChange = Animation.onChange.downCutRight;
				}
			break;
			case 1:
				if(dir == -1) {
					this.animationOnChange = Animation.onChange.upCutLeft;
				} else if (dir == 1) {
					this.animationOnChange = Animation.onChange.upCutRight;
				}
			break;
			case 2:
				if(dir == -1) {
					this.animationOnChange = Animation.onChange.openUp;
				} else if (dir == 1) {
					this.animationOnChange = Animation.onChange.openDown;
				}
			break;
			case 3:
				this.animationOnChange = Animation.onChange.ombre;
			break;
			default:
				alert('Police inconnue : ' + this.police + ' dans la fonction Word.setAnimation()');
			break;
		}
	}
	else {
		this.animationOnChange = function(){};
	}
}

scriptLoaded('scripts/libs/separation_toolkit/word_animation/animation.js');
