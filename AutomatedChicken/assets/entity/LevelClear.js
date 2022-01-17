
// You can write more code here

/* START OF COMPILED CODE */

class LevelClear extends Phaser.GameObjects.Container {

	constructor(scene, x, y) {
		super(scene, x ?? 0, y ?? 0);

		// overlay
		const overlay = scene.add.rectangle(0, 0, 1152, 640);
		overlay.setOrigin(0, 0);
		overlay.isFilled = true;
		overlay.fillColor = 0;
		overlay.fillAlpha = 0.2;
		this.add(overlay);

		// text
		const text = scene.add.text(576, 120, "", {});
		text.setOrigin(0.5, 0);
		text.text = "Level Clear!";
		text.setStyle({ "fontFamily": "Arial", "fontSize": "64px", "shadow.offsetX":2,"shadow.offsetY":2,"shadow.fill":true});
		this.add(text);

		/* START-USER-CTR-CODE */
		this.add(new Button(scene, 576, 350, "Continue", "button_green")
			.on('click', () => this.emit("continue")));
		this.add(new Button(scene, 576, 350+70, "Exit", "button_green")
			.on('click', () => this.emit("exit")));
		/* END-USER-CTR-CODE */
	}

	/* START-USER-CODE */

	// Write your code here.

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
