"use strict";

function Table_Singleton() {
	this.position = Vector2.zero;
	this.size = Vector2.zero;
}

Table_Singleton.prototype.initialize = function(position, size) {
	this.position = position;
	this.size = size;
};

Table_Singleton.prototype.contains = function(position) {
	if(position.x > this.position.x && 
		position.y > this.position.y && 
		position.x < this.position.x+this.size.x && 
		position.y < this.position.y+this.size.y) {
		return true;
	} else {
		return false;
	}
};

Table_Singleton.prototype.draw = function() {
	Canvas2D.drawRect(this.position, this.size);
};

var Table = new Table_Singleton();
