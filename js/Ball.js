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

Ball.prototype.handleCollision = function (position) {
	var collision = false;
	
	return collision;
};

Ball.prototype.shoot = function(power, rotation) {
    this.moving = true;
    this.velocity = calculateBallVelocity(power,rotation);
};

Ball.prototype.stop = function(){

    this.moving = false;
    this.velocity = Vector2.zero;
}

var calculateBallVelocity = function(power, angle){

    return new Vector2(100*Math.cos(angle)*(power),100*Math.sin(angle)*(power));
}

<<<<<<< HEAD
Ball.prototype.update = function (delta) {
	this.updatePosition(delta);
=======
Ball.prototype.update = function () {
	this.updatePosition();
>>>>>>> 9178a63e649d5d7486f486a0ec93f0c8b6dd2f9a
    this.velocity.multiplyWith(0.95);
	if(this.moving && Math.abs(this.velocity.x) < 1 && Math.abs(this.velocity.y) < 1){
        this.stop();
    }
}

Ball.prototype.updatePosition = function (delta) {
	if(!this.moving || this.inHole)
        return;
	
	var newPos = this.position.add(this.velocity.multiply(delta));
	var collision = this.handleCollision(newPos);

    if(collision){
		this.velocity.multiplyWith(0.95);
    }else{
    	this.position = newPos;
    }
}

Ball.prototype.draw = function () {
    if(!this.visible)
        return;

	Canvas2D.drawImage(this.sprite, this.position, 0, 1, new Vector2(25,25));
};