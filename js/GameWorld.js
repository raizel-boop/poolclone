"use strict";

function GameWorld() {
	Table.initialize(new Vector2(100,117), new Vector2(1392, 783));
	this.west_boundary = new Boundary(new Vector2(150,117), new Vector2(150, 117+783)); 
	this.cueball = new Ball(new Vector2(450, 117+783/2), sprites.cueball);
	this.cue = new Cue(sprites.cue, new Vector2(450, 117+783/2), new Vector2(641 + 40, 18/2));
	Powerbar.initialize(sprites.powerbar_bg, new Vector2(0, 450), new Vector2(20, 224), 
						sprites.powerbar_cue, new Vector2(0, 450), new Vector2(20, 224),
						new Vector2(111, 448));
	
	this.balls = [ this.cueball ];
	this.boundaries = [ this.west_boundary ];
}

GameWorld.prototype.handleInput = function (delta) {
    this.cue.handleInput(this.cueball.position);
    Powerbar.handleInput(this.cue);
};

GameWorld.prototype.handleBoundaryCollision = function (ball, boundary) {
	//ax + by + c = 0  
	var a = boundary.start.y - boundary.end.y;
	var b = boundary.end.x - boundary.start.x;
	var c = (boundary.start.x - boundary.end.x) * boundary.start.y + (boundary.end.y - boundary.start.y) * boundary.start.x;
	
	var x0 = ball.position.x;
	var y0 = ball.position.y;
	
	var shortest_distance = (Math.abs( (a*x0 + b*y0 + c)) / (Math.sqrt(a*a + b*b)) );
	
	if(shortest_distance < ball.origin.x) {
		ball.velocity.x = -ball.velocity.x;
		console.log("boop!");
	}
}
	
GameWorld.prototype.update = function (delta) {
	var moving_flag = false;
	
	for(var i=0; i<this.balls.length; i++) {
		for(var j=0; j<this.boundaries.length; j++) {
			this.handleBoundaryCollision(this.balls[i], this.boundaries[j]);
		}
	}
	
	
    for(var i = 0; i < this.balls.length; i++) {
        this.balls[i].update(delta);
    }
	
	//loop for checking if any ball is moving (probably should be a function)
    for(var i = 0; i < this.balls.length; i++) {
		if(this.balls[i].moving) {
			moving_flag = true;
		}
    }
	
	if(!moving_flag) {
		var temp_cue = this.cue;
		setTimeout(function(){temp_cue.visible = true;}, 300);
		this.cue.position = this.cueball.position;
	}
};

GameWorld.prototype.draw = function () {
    for (var i = 0; i < this.balls.length; i++) {
        this.balls[i].draw();
    }
    for (var i = 0; i < this.boundaries.length; i++) {
        this.boundaries[i].draw();
    }
	this.cue.draw();
	Table.draw();
	Powerbar.draw();
};