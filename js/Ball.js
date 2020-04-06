"use strict";

function Ball (initPos, sprite) {
	this.sprite = sprite;
	this.initPos = initPos;
    this.position = initPos.copy();
    this.origin = new Vector2(25,25);
    this.velocity = Vector2.zero;
    this.moving = false;
    this.visible = true;
    this.inHole = false;
}

Ball.prototype.draw = function () {
    if(!this.visible)
        return;

	Canvas2D.drawImage(this.sprite, this.position, 0, 1, new Vector2(25,25));
};