
/* UI & HUD */

window.makeClickable = function(gameObject, clicksound) {
	return Object.assign(gameObject, {
		'sfx_click': gameObject.scene.sound.add(clicksound || 'snd_btn_generic_click'),
		'STATE_OUT': 0,
		'STATE_OVER': 1,
		'STATE_DOWN': 2,
		'cl_state': 0,
		'cl_onOver': function(ev) {
			this.cl_state = this.STATE_OVER;
			this.emit('stateupdate', this.cl_state, ev);
		},
		'cl_onDown': function(ev) {
			if (this.cl_state == this.STATE_OVER) {
				this.cl_state = this.STATE_DOWN;
			}
			this.emit('stateupdate', this.cl_state, ev);
		},
		'cl_onUp': function(ev) {
			if (this.cl_state == this.STATE_DOWN) {
				this.cl_state = this.STATE_OVER;
				this.sfx_click.play();
				this.emit('stateupdate', this.cl_state, ev);
				this.emit('click', this, ev);
			}
		},
		'cl_onOut': function(ev) {
			this.cl_state = this.STATE_OUT;
			this.emit('stateupdate', this.cl_state, ev);
		}
	}).setInteractive({useHandCursor: true})
		.on('pointerover', gameObject.cl_onOver)
		.on('pointerdown', gameObject.cl_onDown)
		.on('pointerup', gameObject.cl_onUp)
		.on('pointerout', gameObject.cl_onOut);
};

window.makeDraggable = function(gameObject) {
	gameObject.setInteractive().scene.input.setDraggable(gameObject);
	return gameObject.on('pointerover', function () {
        this.setScale(1.2);
    })
    .on('pointerout', function () {
        this.setScale(1);
    })
	.on('dragstart', function(e) {
		this._tmp_img = this.scene.add.image(this.x, this.y, this.texture, this.frame.name)
			.setAlpha(0.7).setScale(2);
	})
	.on('drag', function(e) {
		this._tmp_img.setPosition(e.worldX, e.worldY);
	})
	.on('dragend', function(e) {
		this._tmp_img.destroy();
	});
};

class _btn_sprite extends Phaser.GameObjects.Sprite {
	constructor(scene, spr, skin) {
		super(scene, 0, 0, spr, 0);
		makeClickable(this);
		this.play(skin);
		this.on('stateupdate', this.updateState);
	}

	updateState(newstate) {
		this.anims.setCurrentFrame(this.anims.currentAnim.frames[newstate]);
	}
}

class Button extends Phaser.GameObjects.Container {
	constructor(scene, x, y, text, skin, textcolor, spr) {
		super(scene, x, y);
		
		if (!text) text = "Default";
		if (!spr) spr = "button";
		if (!skin) skin = "button_blue";
		if (!textcolor) textcolor = "#fff";
		
		let btn_spr = new _btn_sprite(scene, spr, skin);
		btn_spr.on('click', ()=>this.emit('click', this), this);
		this.add(btn_spr);
		
		this.add(scene.add.text(0, 0, text, {boundsAlignH: "center", fill: textcolor, font: "18pt Monospace"}).setOrigin(0.5, 0.5));
	}
}