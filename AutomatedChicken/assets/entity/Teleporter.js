
// You can write more code here

/* START OF COMPILED CODE */

class Teleporter extends Phaser.GameObjects.Sprite {

	constructor(scene, x, y, texture, frame) {
		super(scene, x ?? 0, y ?? 0, texture || "spr_entities", frame ?? 16);

		this.scaleX = 2;
		this.scaleY = 2;

		/* START-USER-CTR-CODE */
		this._orig_tex = {"t": this.texture, "f": this.frame};
		this.props = {
			type: "A",
			spawnX: x,
			spawnY: y,
			teleportTimeout: 2000,
			targetPortal: null
		};
		
		this.canTeleport = true;

		this._setupSounds();

		let physics_engine = this.scene.physics;
		physics_engine.add.existing(this);
		this.body.setMass(50);
		this.body.setFriction(10, 10);

		this.setInteractive();
		scene.input.setDraggable(this);

		this.on('dragstart', this.moveStart);
		this.on('drag', this.moveLocation);
		this.on('dragend', this.moveEnd);
		this.on('destroy', this.deactivate);
		
		scene.events.on('tool_update', this.updateLink, this);

		this.resetState();
		/* END-USER-CTR-CODE */
	}

	/* START-USER-CODE */

	_setupSounds() {
		this.sfx = {};
		this.sfx.teleport = this.scene.sound.add('snd_teleport');
	}
	
	timeoutPortal() {
		this.canTeleport = false;
		this.scene.time.delayedCall(this.props.teleportTimeout, () => {
			this.canTeleport = true;
		});
	}

	teleport(self, player) {
		if (self.canTeleport && self.props.targetPortal && Math.abs(player.x - self.x) < 16) {
			self.timeoutPortal();
			self.props.targetPortal.timeoutPortal();
			player.setPosition(self.props.targetPortal.x, self.props.targetPortal.y);
			self.sfx.teleport.play();
		}
	}
	
	updateLink(obj, action) {
		if (obj == this) return;
		if (obj instanceof Teleporter) {
			if (action === "added" && !this.props.targetPortal) {
				if (this.props.type !== obj.props.type) {
					this.props.targetPortal = obj;
				}
			}
		}
	}

	setProperties(props) {
		Object.assign(this.props, props);
		this.resetState();
		return this;
	}
	
	setPlayerCollision(player) {
		this.scene.physics.add.overlap(this, player, this.teleport);
	}
	
	moveStart(ev) {
		this.body.moves = false;
		this._old_depth = this.depth;
		this.setDepth(1001);
	}
	
	moveLocation(ev) {
		this.props.spawnX = ev.worldX;
		this.props.spawnY = ev.worldY;
		this.setPosition(this.props.spawnX, this.props.spawnY);
	}
	
	moveEnd(ev) {
		this.body.moves = true;
		this.setDepth(this._old_depth);
	}

	resetState() {
		this.setActive(true);
		this.setVisible(true);
		this.setPosition(this.props.spawnX, this.props.spawnY);
		this.body.setVelocity(0, 0);

		switch (this.props.type) {
			case "A":
			default:
				this.play("ani_portal1");
				break;
			case "B":
				this.play("ani_portal2");
				break;
		}
	}

	deactivate() {
		this.scene.events.off('tool_update', this.updateLink);
		this.setActive(false);
		this.setVisible(false);
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
