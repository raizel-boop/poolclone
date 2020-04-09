"use strict";

function Ball (initPos, sprite) {
	this.sprite = sprite;
	this.initPos = initPos;
    this.position = initPos.copy();
    this.origin = new Vector2(25,25);
    this.velocity = Vector2.zero;
	this.maxVelocity = new Vector2(0, 0);
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

Ball.prototype.update = function (delta) {
	var oldx = this.position.x;
	var oldy = this.position.y;
	this.updatePosition(delta);
    this.velocity.multiplyWith(0.95);
	var newx = this.position.x;
	var newy = this.position.y;
	console.log("("+(newx - oldx)+", "+(newy - oldy)+")");
	if(this.moving && Math.abs(this.velocity.x) < 1 && Math.abs(this.velocity.y) < 1){
        this.stop();
    }
}

Ball.prototype.updatePosition = function (delta) {
	if(!this.moving || this.inHole)
        return;
	var newPos = this.position.add(this.velocity.multiply(delta));
	var collision = this.handleCollision(newPos);
	
	/* (this.velocity.x > 500)?this.velocity.x = 500:newPos;
	(this.velocity.y > 500)?this.velocity.y = 500:newPos;
	(this.velocity.x > this.maxVelocity.x)?this.maxVelocity.x = this.velocity.x:newPos;
	(this.velocity.y > this.maxVelocity.y)?this.maxVelocity.y = this.velocity.y:newPos; */
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