
// You can write more code here

/* START OF COMPILED CODE */

class Titlescreen extends Phaser.Scene {

	constructor() {
		super("Titlescreen");

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}

	/** @returns {void} */
	editorCreate() {

		// logo
		this.add.image(576, 175, "logo");

		this.events.emit("scene-awake");
	}

	/* START-USER-CODE */

	preload() {
		window.ModTracker.stop();
		window.ModTracker.loadBuffer(new Uint8Array(this.cache.binary.get('bgm_title')));
	}

	create() {
		this.editorCreate();
		
		if (!this.sound.locked)
			window.ModTracker.play();
		else
			this.sound.once(Phaser.Sound.Events.UNLOCKED, () => {
				window.ModTracker.play();
			});

		//Reduce music volume on focus loss (doesn't work???)
		this.events.on(Phaser.Core.Events.BLUR, console.log);
		this.events.on(Phaser.Core.Events.FOCUS, console.log);

		let cfg = this.cache.json.get('config');
		let tcfg = cfg.title;

		this.cameras.main.setBackgroundColor(tcfg.sky.color);

		//Play button
		var btn_play = this.add.existing(new Button(this, this.game.config.width / 2, 350, tcfg.menu.play.text, tcfg.menu.play.skin))
			.once('click', e => this.fadeOutToScene(
				'Gameplay',
				window.gameState.currentLevel || "level1"
			), this);

		//Settings button
		var btn_settings = this.add.existing(new Button(this, this.game.config.width / 2, 420, tcfg.menu.settings.text, tcfg.menu.settings.skin))
			.on('click', e => {
				this.scene.transition({
					'target': 'Settings',
					'duration': 0,
					'sleep': true,
					'moveAbove': true,
					'data': {'parent': this.scene.key}
				});
			}, this);

		//Credits button
		var btn_credits = this.add.existing(new Button(this, this.game.config.width / 2, 490, tcfg.menu.credits.text, tcfg.menu.credits.skin))
			.on('click', e => {
				this.scene.transition({
					'target': 'Credits',
					'duration': 0,
					'sleep': true,
					'moveAbove': true,
					'data': {'parent': this.scene.key}
				});
			}, this);

		//Copyright text
		this.add.text(this.game.config.width / 2, this.game.config.height - 100, tcfg.copyright.text, {boundsAlignH: "center", fill: tcfg.copyright.color, font: "16pt Monospace"}).setOrigin(0.5, 0);

		//Star field
		this.add.existing(new BGStars(this, tcfg.starfield).setDepth(-1));
		
		this.cameras.main.fadeIn(500);
		//this.scene.start('Gameplay', "level1");
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

class Star extends Phaser.GameObjects.Sprite {
	constructor(scene, x, y, ang_vel=0) {
		super(scene, x, y, 'spr_star');
		this.scale = 0.5 + Math.random() * 1.5;
		this.angular_speed = ang_vel;
		scene.add.existing(this);
	}
	
	preUpdate() {
		this.setAngle(this.angle + this.angular_speed);
		this.x += 1.5 * this.scale;
		this.y += 1.5 * this.scale;
		if (this.x > this.scene.game.config.width) this.x = 0;
		if (this.y > this.scene.game.config.height) this.y = 0;
	}
}

class BGStars extends Phaser.GameObjects.Container {
	constructor(scene, config) {
		super(scene, 0, 0);
		for (let i = 0; i < Math.max(config.count, 0); i++) {
			this.add(new Star(scene, Phaser.Math.Between(0, scene.game.config.width), Phaser.Math.Between(0, scene.game.config.height), config.star_rotation_vel));
		}
	}
}
