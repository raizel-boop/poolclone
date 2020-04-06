"use strict";

function handleTouchStart(evt) {
	evt.preventDefault();
	var touches = evt.changedTouches;
	for (var i = 0; i < touches.length; i++) {
		Touch._touches.push(touches[i]);
		Touch._touchPresses.push(true);
		Touch._initialpositions.push(Touch.getPosition(Touch.getTouchIndexFromId(touches[i].identifier)));
	}
}

function handleTouchEnd(evt) {
	evt.preventDefault();
	var touches = evt.changedTouches;
	for (var i = 0; i < touches.length; ++i) {
		var id = Touch.getTouchIndexFromId(touches[i].identifier);
		Touch._touches.splice(id, 1);
		Touch._touchPresses.splice(id, 1);
		Touch._initialpositions.splice(id, 1);
	}
}

function handleTouchMove(evt) {
    evt.preventDefault();
    var touches = evt.changedTouches;
    for (var i = 0; i < touches.length; i++) {
        var id = Touch.getTouchIndexFromId(touches[i].identifier);
        Touch._touches.splice(id, 1, touches[i]);
    }
}

function Touch_Singleton() {
	this._touches = [];
	this._touchPresses = [];
	this._initialpositions = [];
	document.addEventListener('touchstart', handleTouchStart, { passive: false, capture: true });
	document.addEventListener('touchend', handleTouchEnd, { passive: false, capture: true });
	document.addEventListener('touchcancel', handleTouchEnd, { passive: false, capture: true });
	document.addEventListener('touchleave', handleTouchEnd, { passive: false, capture: true });
	document.body.addEventListener('touchmove', handleTouchMove, { passive: false, capture: true });
}

Touch_Singleton.prototype.getTouchIndexFromId = function (id) {
	for (var i = 0, l = this._touches.length; i < l; ++i) {
		if (this._touches[i].identifier === id)
		return i;
	}
	return -1;
};

Touch_Singleton.prototype.getPosition = function (index) {
	var canvasScale = Canvas2D.scale;
	var canvasOffset = Canvas2D.aoffset;
	var mx = (this._touches[index].pageX - canvasOffset.x) / canvasScale.x;
	var my = (this._touches[index].pageY - canvasOffset.y) / canvasScale.y;
	return new Vector2(mx, my);
};

Touch_Singleton.prototype.getInitialPosition = function (index) {
	return this._initialpositions[index];
};

Touch_Singleton.prototype.containsTouch = function (rect) {
	for (var i = 0, l = this._touches.length; i < l; ++i) {
		if (rect.contains(this.getPosition(i)))
			return true;
	}
	return false;
};

Object.defineProperty(Touch_Singleton.prototype, "isTouchDevice",
	{
		get: function () {
			return ('ontouchstart' in window) || (navigator.msMaxTouchPoints > 0);
		}
	});

Object.defineProperty(Touch_Singleton.prototype, "isTouching",
    {
        get: function () {
            return this._touches.length !== 0;
        }
    });
	
var Touch = new Touch_Singleton();

