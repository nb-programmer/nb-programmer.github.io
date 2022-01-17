
// You can write more code here

/* START OF COMPILED CODE */

class Credits extends Phaser.Scene {

	constructor() {
		super("Credits");

		/* START-USER-CTR-CODE */
		/* END-USER-CTR-CODE */
	}

	/** @returns {void} */
	editorCreate() {

		// phaser
		const phaser = this.add.image(224, 144, "phaser");
		phaser.scaleX = 0.2;
		phaser.scaleY = 0.2;

		// text
		const text = this.add.text(160, 80, "", {});
		text.text = "Game Engine";
		text.setStyle({ "align": "center", "fontSize": "18px", "stroke": "#000", "shadow.offsetX":2,"shadow.offsetY":2,"shadow.fill":true});

		// txt_back
		const txt_back = this.add.text(518, 564, "", {});
		txt_back.text = "Back";
		txt_back.setStyle({ "align": "center", "fontSize": "48px", "stroke": "#000000ff", "strokeThickness":1,"shadow.offsetX":2,"shadow.offsetY":2,"shadow.blur":2,"shadow.stroke":true});

		// image
		const image = this.add.image(96, 432, "pe2d");
		image.scaleX = 0.3;
		image.scaleY = 0.3;

		// text_1
		const text_1 = this.add.text(192, 400, "", {});
		text_1.text = "Phaser Editor 2D";
		text_1.setStyle({ "fontFamily": "Arial", "fontSize": "40px", "stroke": "#000000ff", "strokeThickness":2});

		// text_2
		const text_2 = this.add.text(144, 320, "", {});
		text_2.text = "Game Development";
		text_2.setStyle({ "align": "center", "fontSize": "18px", "stroke": "#000", "shadow.offsetX":2,"shadow.offsetY":2,"shadow.fill":true});

		// text_3
		const text_3 = this.add.text(752, 80, "", {});
		text_3.text = "Assets";
		text_3.setStyle({ "align": "center", "fontSize": "18px", "stroke": "#000", "shadow.offsetX":2,"shadow.offsetY":2,"shadow.fill":true});

		// text_4
		const text_4 = this.add.text(592, 128, "", {});
		text_4.text = "BGM:\n\"Energy\" - Narayan Bandodker \n\"Entry of the Gladiators\" -\n      Reference MIDI: bitmidi.com\n      Mix: Narayan Bandodker\n\nSFX:\nNarayan Bandodker\nobsydianx (UI)\n\nFonts:\nwww.fontspace.com\n\nTileset:\ncypor.itch.io\n\nSee README for more details";
		text_4.setStyle({ "fontSize": "22px", "stroke": "#000", "shadow.offsetX":1,"shadow.offsetY":1,"shadow.fill":true});

		this.txt_back = txt_back;

		this.events.emit("scene-awake");
	}

	/** @type {Phaser.GameObjects.Text} */
	txt_back;

	/* START-USER-CODE */

	create(data) {
		this.editorCreate();
		let cfg = this.cache.json.get('config').title;
		this.cameras.main.setBackgroundColor(cfg.sky.color);
		makeClickable(this.txt_back);

		this.txt_back.on('click', e => {
			this.scene.transition({
				'target': data.parent,
				'duration': 0,
				'sleep': true,
				'moveAbove': true
			});
		});
		this.txt_back.on('stateupdate', nstat => {
			if (nstat == this.txt_back.STATE_OVER) {
				if (!this.txt_back._old_color) {
					this.txt_back._old_color = this.txt_back.style.color;
				}
				this.txt_back.setColor("#ff0");
			} else if (nstat == this.txt_back.STATE_OUT && this.txt_back._old_color) {
				this.txt_back.setColor(this.txt_back._old_color);
			}
		});
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
