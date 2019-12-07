function Button(x, y, width, height, spr=null, text="") {
	Sprite.call(this, x, y, spr);
	this.width = width;
	this.height = height;
	this._mouseState = 0;
	
	this._hitTest = function(x, y) {
		return (x >= this.x && y >= this.y
			&& x <= this.x + this.width
			&& y <= this.y + this.height);
	};
	
	this.onStep = function() {
		this.image_xscale = this.width / this.spr.width;
		this.image_yscale = this.height / this.spr.height;
	};
	this.onDraw = function(canv, ctx) {
		Sprite.prototype.defaultDraw.call(this, canv, ctx);
		ctx.globalCompositeOperation = "multiply";
		ctx.fillStyle = "rgba(1,1,1,0.4)";
		if (this._mouseState == 1) {
			ctx.fillStyle = "rgba(1,1,1,0)";
		} else if (this._mouseState == 2) {
			ctx.fillStyle = "rgba(1,1,1,0.7)";
		}
		ctx.fillRect(this.x, this.y, this.width, this.height);
	};
	this.onClick = function(){};
}