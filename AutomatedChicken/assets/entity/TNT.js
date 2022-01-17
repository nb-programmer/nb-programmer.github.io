
// You can write more code here

/* START OF COMPILED CODE */

class TNT extends Phaser.GameObjects.Sprite {

	constructor(scene, x, y, texture, frame) {
		super(scene, x ?? 0, y ?? 0, texture || "spr_entities", frame ?? 13);

		/* START-USER-CTR-CODE */
		this._orig_tex = {"t": this.texture, "f": this.frame};
		this._setupSounds();
		let physics_engine = this.scene.physics;
		physics_engine.add.existing(this);
		this.resetState();
		/* END-USER-CTR-CODE */
	}

	/* START-USER-CODE */
	
	_setupSounds() {
		this.sfx = {};
		this.sfx.explode = this.scene.sound.add('snd_explode');
	}

	explode() {
		this.play("ani_explosion1");
		this.sfx.explode.play();
		this.on(Phaser.Animations.Events.ANIMATION_COMPLETE, this.deactivate);
	}
	
	setProperties(props) {
		console.log(props);
		this.resetState();
	}
	
	resetState() {
		this.setTexture(this._orig_tex.t, this._orig_tex.f);
		this.setActive(true);
		this.setVisible(true);
	}
	
	deactivate() {
		this.setActive(false);
		this.setVisible(false);
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
