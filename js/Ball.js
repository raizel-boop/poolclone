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

Ball.prototype.shoot = function(power, rotation) {
    this.moving = true;
    this.velocity = calculateBallVelocity(power,rotation);
	console.log(this.velocity);
};

Ball.prototype.stop = function(){

    this.moving = false;
    this.velocity = Vector2.zero;
}

var calculateBallVelocity = function(power, angle){

    return new Vector2(100*Math.cos(angle)*(0.01*power),100*Math.sin(angle)*(0.01*power));
}

Ball.prototype.update = function () {
	this.updatePosition();
    this.velocity.multiplyWith(0.85);
	if(this.moving && Math.abs(this.velocity.x) < 1 && Math.abs(this.velocity.y) < 1){
        this.stop();
    }
}

Ball.prototype.updatePosition = function () {
	if(!this.moving || this.inHole)
        return;
	
	var newPos = this.position.add(this.velocity);
	this.position = newPos;
}

Ball.prototype.draw = function () {
    if(!this.visible)
        return;

	Canvas2D.drawImage(this.sprite, this.position, 0, 1, new Vector2(25,25));
};