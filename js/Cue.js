"use strict";

function Cue(sprite, position, origin) {
	this.sprite = sprite;
	this.position = position;
	this.origin = origin;
	this.rotation = 0;
	this.old_rotation = 0;
	this.old_origin = origin.copy();
	this.visible = true;
}

Cue.prototype.aim = function (power) {
	this.origin.x = this.old_origin.x + power*2;
}

Cue.prototype.shoot = function (power) {
	this.origin = new Vector2(this.old_origin.copy().x-20, this.old_origin.copy().y);
}

Cue.prototype.calculate_rotation = function(input_initial, input_current) {
	var initial_angle = Math.atan2(input_initial.x - this.position.x, input_initial.y - this.position.y);
	var angle = Math.atan2(input_current.x - this.position.x, input_current.y - this.position.y);
	return (angle - initial_angle);
}

Cue.prototype.handleInput = function (cueball_position) {

	if(Touch.isTouchDevice) {
		if(Touch.isTouching) {
			var touch_position = Touch.getPosition(0);
			var touch_initial_position = Touch.getInitialPosition(0);
			if(Table.contains(touch_initial_position)) {
				this.rotation = this.old_rotation + Mouse.inverse*this.calculate_rotation(touch_initial_position, touch_position);
			}
		} else if(!Touch.isTouching) {
			this.old_rotation = this.rotation;
		}
	} else {
		if(Mouse.left.down && Table.contains(Mouse.initial)) {
			this.rotation = this.old_rotation + Mouse.inverse*this.calculate_rotation(Mouse.initial, Mouse.position);
		} else if(!Mouse.left.down) {
			this.old_rotation = this.rotation;
		}
	}
};

Cue.prototype.update = function () {
	
};

Cue.prototype.draw = function () {
    if(!this.visible)
        return;

	Canvas2D.drawImage(this.sprite, this.position, this.rotation, 1, this.origin);
};