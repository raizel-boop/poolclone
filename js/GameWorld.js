"use strict";

function GameWorld() {
	Table.initialize(new Vector2(100,117), new Vector2(1392, 783));
	this.west_boundary = new Boundary(); 
	this.cueball = new Ball(new Vector2(450, 117+783/2), sprites.cueball);
	this.cue = new Cue(sprites.cue, new Vector2(450, 117+783/2), new Vector2(641 + 40, 18/2));
	Powerbar.initialize(sprites.powerbar_bg, new Vector2(0, 450), new Vector2(20, 224), 
						sprites.powerbar_cue, new Vector2(0, 450), new Vector2(20, 224),
						new Vector2(111, 448));
	
	this.balls = [ this.cueball ];
}

GameWorld.prototype.handleInput = function () {
    this.cue.handleInput(this.cueball.position);
    Powerbar.handleInput(this.cue);
};

GameWorld.prototype.update = function () {
    
};

GameWorld.prototype.draw = function () {
    for (var i = 0; i < this.balls.length; i++) {
        this.balls[i].draw();
    }
	this.cue.draw();
	Table.draw();
	Powerbar.draw();
};