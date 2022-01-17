
// You can write more code here

/* START OF COMPILED CODE */

class Settings extends Phaser.Scene {

	constructor() {
		super("Settings");

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}

	/** @returns {void} */
	editorCreate() {

		// txt_back
		const txt_back = this.add.text(518, 564, "", {});
		txt_back.text = "Back";
		txt_back.setStyle({ "align": "center", "fontSize": "48px", "stroke": "#000000ff", "strokeThickness":1,"shadow.offsetX":2,"shadow.offsetY":2,"shadow.blur":2,"shadow.stroke":true});

		this.txt_back = txt_back;

		this.events.emit("scene-awake");
	}

	/** @type {Phaser.GameObjects.Text} */
	txt_back;

	/* START-USER-CODE */

	// Write your code here

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
