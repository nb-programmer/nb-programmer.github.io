
// You can write more code here

/* START OF COMPILED CODE */

class Chicken extends Phaser.GameObjects.Sprite {

	constructor(scene, x, y, texture, frame) {
		super(scene, x ?? 0, y ?? 0, texture || "spr_chicken", frame ?? 0);

		/* START-USER-CTR-CODE */

		this.STATE = {
			"idle": 0,
			"running": 1,
			"paused": 2,
			"dead": 3
		};
		
		//Add sounds
		this._setupSounds();
		
		//Particles
		this._setupParticles();
		
		//Add physics
		let physics_engine = this.scene.physics;
		physics_engine.add.existing(this);

		this.spawn = {"x": x, "y": y};
		this.resetState();
		
		/* END-USER-CTR-CODE */
	}

	/* START-USER-CODE */
	
	//Private method to init sound effects
	_setupSounds() {
		this.sfx = {};
		this.sfx.die = this.scene.sound.add('snd_death');
		this.sfx.fanfare = this.scene.sound.add('snd_fanfare');
	}
	
	_setupParticles() {
		this.particles = {};
		this.emitters = {};
		
		this.particles.feather = this.scene.add.particles("spr_entities", 14);
		
		//Feather explosion
		let feather_aoe = new Phaser.Geom.Circle(0, 0, 16);
		this.emitters.feather_explode = this.particles.feather.createEmitter({
			speed: 50,
			alpha: { start: 0.6, end: 0 },
			scale: { start: 0.3, end: 0 },
			blendMode: 'ADD',
			frequency: -1,
			emitZone: {type: 'random', source: feather_aoe}
		});
	}

	setSpawn(x, y) {
		this.spawn.x = x;
		this.spawn.y = y;
	}

	/* Demise */
	die() {
		if (this.state != this.STATE.dead) {
			this.sfx.die.play();
			this.setState(this.STATE.dead);
			this.emitters.feather_explode.explode(40, this.x, this.y);
		}
	}
	
	/* Success */
	goalReached() {
		this.sfx.fanfare.play();
	}

	/* Reset simulation state */
	resetState() {
		this.x = this.spawn.x;
		this.y = this.spawn.y;
		this.body.setVelocity(0, 0);
		this.setState(this.STATE.idle);
		this.updateAnimation();
	}

	/* Simulation start */
	simbegin() {
		//Launch chicken to the right
		if (this.state === this.STATE.idle)
			this.body.setVelocity(40, 0);
		this.simresume();
	}

	/* Simulation resume/continue */
	simresume() {
		this.setState(this.STATE.running);
		this.updateAnimation();
	}

	/* Simulation pause */
	simpause() {
		this.setState(this.STATE.paused);
		this.updateAnimation();
	}

	/* Update animation by state */
	updateAnimation() {
		switch (this.state) {
			case this.STATE.idle:
				this.play("ani_chicken_idle");
				break;
			case this.STATE.paused:
				this.anims.pause();
				break;
			case this.STATE.running:
				this.play("ani_chicken_walk");
				break;
		}
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
