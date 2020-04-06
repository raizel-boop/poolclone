"use strict";

function Boundary(start, end) {
	this.start = start;
	this.end = end;
}

Boundary.prototype.draw = function () {
	Canvas2D.drawLine(this.start, this.end);
};