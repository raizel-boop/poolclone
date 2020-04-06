"use strict";

function Powerbar_Singleton() {
	this.bg_position = Vector2.zero;
	this.bg_visible = true;
	this.cue_position = Vector2.zero;
	this.cue_visible = true;
	this.hitsize = Vector2.zero;
	this.mouse_end = true;
	this.power = 0;
}

Powerbar_Singleton.prototype.contains = function(position) {
	if(position.x > this.bg_position.x-this.bg_origin.x && 
		position.y > this.bg_position.y-this.bg_origin.y && 
		position.x < this.bg_position.x-this.bg_origin.x+this.hitsize.x && 
		position.y < this.bg_position.y-this.bg_origin.y+this.hitsize.y) {
		return true;
	} else {
		return false;
	}
};

Powerbar_Singleton.prototype.handleInput = function(controlling_cue) {
	if(Touch.isTouchDevice) {
		if(Touch.isTouching) {
			var touch_position = Touch.getPosition(0);
			var touch_initial_position = Touch.getInitialPosition(0);
			if(Powerbar.contains(touch_initial_position)) {
				var new_position = this.bg_position.y + (touch_initial_position - touch_position);
				if(new_position > this.bg_position.y && new_position < 10000) {
					this.cue_position.y = new_position;
				}
			}
		} else if(!Touch.isTouching) {
			this.cue_position.y = this.bg_position.y;
		}
	} else {
		if(Mouse.left.down && Powerbar.contains(Mouse.initial)) {
			this.mouse_end = false;
			var new_position = this.bg_position.y + (Mouse.position.y - Mouse.initial.y);
			if(new_position > this.bg_position.y && new_position < 820) {
				this.cue_position.y = new_position;
				this.power = Math.floor(Math.floor((new_position - this.bg_position.y))*100/369);
				controlling_cue.aim(this.power);
			}
		} else if(!Mouse.left.down) {
			if(this.mouse_end == false) {
				controlling_cue.shoot(this.power);
				this.power = 0;
			}
			this.mouse_end = true;
			this.cue_position.y = this.bg_position.y;
		}
	}
}

Powerbar_Singleton.prototype.initialize = function(bg_sprite, bg_position, bg_origin, cue_sprite, cue_position, cue_origin, hitsize) {
	this.bg_sprite = bg_sprite;
	this.bg_position = bg_position;
	this.bg_origin = bg_origin;
	this.cue_sprite = cue_sprite;
	this.cue_position = cue_position;
	this.cue_origin = cue_origin;
	this.hitsize = hitsize;
};

Powerbar_Singleton.prototype.draw = function() {
    if(!this.bg_visible || !this.cue_visible)
        return;

	Canvas2D.drawImage(this.bg_sprite, this.bg_position, 0, 1, this.bg_origin);
	Canvas2D.drawImage(this.cue_sprite, this.cue_position, 0, 1, this.cue_origin);
};


var Powerbar = new Powerbar_Singleton();