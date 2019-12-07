
//Yes, this is inspired by Game Maker
function Sprite(x=0, y=0, image_resource=null, image_xscale=1.0, image_yscale=1.0) {
	this.x = x;
	this.y = y;
	this.spr = image_resource;
	this.image_xscale = image_xscale;
	this.image_yscale = image_yscale;
	this.image_alpha = 1.0;
	this.onStep = this.defaultUpdate;
	this.onDraw = this.defaultDraw;
	this.onDestroy = null;
	this.__destroyNextStep = false;
}
Sprite.prototype.defaultUpdate = function() {
	
};
Sprite.prototype.defaultDraw = function(canvas, context) {
	let sprW = this.spr.width * this.image_xscale;
	let sprH = this.spr.height * this.image_yscale;
	context.save();
	context.globalAlpha = Math.max(Math.min(this.image_alpha, 1), 0);
	context.drawImage(this.spr, this.x, this.y, sprW, sprH);
	context.restore();
};

Sprite.prototype.destroy = function() {
	this.__destroyNextStep = true;
	if (this.onDestroy !== null && typeof(this.onDestroy) == "function")
		this.onDestroy();
}

function SpriteGroup(x=0, y=0) {
	this.x = x;
	this.y = y;
	this.sprList = [];
	this.onStep = null;
}

SpriteGroup.prototype.add = function(spr) {
	return this.sprList.push(spr);
}

SpriteGroup.prototype.destroyAll = function(spr) {
	for (var sprIdx = 0; sprIdx < this.sprList.length; sprIdx++)
		this.sprList[sprIdx].destroy();
}

SpriteGroup.prototype.update = function() {
	if (this.onStep !== null && typeof(this.onStep) == "function")
		this.onStep();
	
	for (var sprIdx = 0; sprIdx < this.sprList.length; sprIdx++) {
		let spr = this.sprList[sprIdx];
		if (spr.onStep !== null && typeof(spr.onStep) == "function") {
			spr.onStep();
			
			if (spr.__destroyNextStep) {
				this.sprList.splice(sprIdx, 1);
				sprIdx--;
			}
		}
	}
};

SpriteGroup.prototype.draw = function(canvas, context) {
	for (var sprIdx in this.sprList) {
		let spr = this.sprList[sprIdx];
		if (spr.onDraw !== null && typeof(spr.onDraw) == "function") {
			context.save();
			context.translate(this.x, this.y);
			spr.onDraw(canvas, context);
			context.restore();
		}
	}
};