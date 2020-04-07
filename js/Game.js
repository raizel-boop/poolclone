"use strict";

var DELTA = 1/100;

var requestAnimationFrame = (function () {
    return  window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function (callback) {
            window.setTimeout(callback, 1000 / 60);
        };
})();

var elem = document.getElementById("gameArea");
function openFullscreen() {
	  if (elem.requestFullscreen) {
		elem.requestFullscreen();
	  } else if (elem.mozRequestFullScreen) { /* Firefox */
		elem.mozRequestFullScreen();
	  } else if (elem.webkitRequestFullscreen) { /* Chrome, Safari & Opera */
		elem.webkitRequestFullscreen();
	  } else if (elem.msRequestFullscreen) { /* IE/Edge */
		elem.msRequestFullscreen();
	  }
}
function Game_Singleton() {
    this.size = undefined;
    this.spritesStillLoading = 0;
    this.gameWorld = undefined;
}

Game_Singleton.prototype.start = function (divName, canvasName, x, y) {
    this.size = new Vector2(x,y);
    Canvas2D.initialize(divName, canvasName);
    this.loadAssets();
    this.assetLoadingLoop();
};

Game_Singleton.prototype.loadSprite = function (imageName) {
	var image = new Image();
	image.src = imageName;
	Game.spritesStillLoading += 1;
	image.onload = function () {
		Game.spritesStillLoading -= 1;
	};
	return image;
};

var sprites = {};
Game_Singleton.prototype.loadAssets = function () {
	var loadSprite = function (sprite) {
		return Game.loadSprite("assets/" + sprite);
	};
	
	sprites.cueball = loadSprite("cue_ball.png");
	sprites.cue = loadSprite("cue.png");
	sprites.table = loadSprite("table.jpg");
	sprites.powerbar_bg = loadSprite("powerbar_bg.png");
	sprites.powerbar_cue = loadSprite("powerbar_cue.png");
};

Game_Singleton.prototype.assetLoadingLoop = function () {
    if (!this.spritesStillLoading > 0)
        requestAnimationFrame(Game.assetLoadingLoop);
    else {
        Game.initialize();
		Game.mainLoop();
        //requestAnimationFrame(this.mainMenu.load.bind(this.mainMenu));
    }
};

Game_Singleton.prototype.initialize = function () {
    this.gameWorld = new GameWorld();
    this.policy = new GamePolicy();
};

Game_Singleton.prototype.mainLoop = function () {

    //if(DISPLAY && !GAME_STOPPED){
        Game.gameWorld.handleInput(DELTA);
        Game.gameWorld.update(DELTA);
        Canvas2D.clear();
        Game.gameWorld.draw();
        //Mouse.reset();
        //Game.handleInput();
        requestAnimationFrame(Game.mainLoop);
    //}
};

var Game = new Game_Singleton();
Game.start("gameArea", "pooltable", 1600, 900);
