"use strict";

function Boundary(start, end) {
	this.start = start;
	this.end = end;
}

Boundary.prototype.collidesWith = function (position, origin) {
	var point = new Vector2((position.x-origin.x), (position.y-origin.y));
	
};

Boundary.prototype.draw = function () {
	Canvas2D.drawLine(this.start, this.end);
};