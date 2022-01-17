
// You can write more code here

/* START OF COMPILED CODE */

class DialogBox extends Phaser.GameObjects.Container {

	constructor(scene, x, y) {
		super(scene, x ?? 0, y ?? 0);

		// rct_placeholder
		const rct_placeholder = scene.add.rectangle(0, 0, 400, 180);
		rct_placeholder.isFilled = true;
		rct_placeholder.fillColor = 8947848;
		this.add(rct_placeholder);

		// dlg_proceed
		const dlg_proceed = scene.add.text(185, 60, "", {});
		dlg_proceed.setOrigin(1, 0);
		dlg_proceed.text = "Proceed";
		dlg_proceed.setStyle({ "align": "center", "shadow.offsetX":2,"shadow.offsetY":2,"shadow.fill":true});
		this.add(dlg_proceed);

		// dlg_text
		const dlg_text = scene.add.text(-189, -78, "", {});
		dlg_text.text = "Dialog text";
		dlg_text.setStyle({ "fontSize": "20px", "shadow.offsetX":2,"shadow.offsetY":2,"shadow.fill":true});
		this.add(dlg_text);

		// dlg_skip
		const dlg_skip = scene.add.text(-185, 60, "", {});
		dlg_skip.text = "Skip";
		dlg_skip.setStyle({ "align": "center", "shadow.offsetX":2,"shadow.offsetY":2,"shadow.fill":true});
		this.add(dlg_skip);

		this.dlg_proceed = dlg_proceed;
		this.dlg_text = dlg_text;
		this.dlg_skip = dlg_skip;

		/* START-USER-CTR-CODE */

		//"Appear" sound
		this.snd_appear = this.scene.sound.add("snd_pop");

		let rect_x = rct_placeholder.x - rct_placeholder.width / 2;
		let rect_y = rct_placeholder.y - rct_placeholder.height / 2;

		dlg_text.setWordWrapWidth(rct_placeholder.width - Math.abs(rect_x - dlg_text.x), true);

		//Hide the placeholder rectangle used in the editor
		rct_placeholder.setVisible(false);

		//Instead, show a custom shaped dialog box
		const graphics = scene.add.graphics();
		this.add(graphics);
		this.sendToBack(graphics);
		graphics.fillStyle(0x0090cc, 0.75);
		graphics.fillRoundedRect(rect_x, rect_y, rct_placeholder.width, rct_placeholder.height, 12);

		this.hideBox();

		this.allow_skip = false;
		this.dialog_script = [];		//The actions to perform after parsing the script
		this.dialog_counter = 0;		//Next action pointer

		//"Proceed" button
		makeClickable(this.dlg_proceed, 'snd_btn_dialog_click');
		this.dlg_proceed.on('click', this.dialog_proceed, this);

		//"Skip" button
		makeClickable(this.dlg_skip);
		this.dlg_skip.on('click', this.hideBox, this);

		/* END-USER-CTR-CODE */
	}

	/** @type {Phaser.GameObjects.Text} */
	dlg_proceed;
	/** @type {Phaser.GameObjects.Text} */
	dlg_text;
	/** @type {Phaser.GameObjects.Text} */
	dlg_skip;
	/** @type {string} */
	boxtext = "Default text";

	/* START-USER-CODE */

	/* Generate actions from the "boxtext" property of this prefab */
	parseDialogFromProperty() {
		this.dialog_script = new Array();
		this.dialog_script.push({"type": "message", "data": this.boxtext});
		this.dialog_counter = 0;
	}

	/* Convert a formatted dialog script to the script to interpret */
	//TODO :)
	parseDialog(str) {
		this.dialog_script = new Array();
		//Dummy script
		this.dialog_script.push({"type": "message", "data": "test message!"});
		this.dialog_script.push({"type": "page"});
		this.dialog_script.push({"type": "message", "data": "another message!"});
		this.dialog_counter = 0;
	}

	setDialogScript(script) {
		this.dialog_script = script;
		this.dialog_counter = 0;
	}

	showBox(restart=false) {
		if (restart)
			this.dialog_counter = 0;
		this.dialog_proceed();
		//Show the box
		this.setActive(true);
		this.setVisible(true);
		//Skip button
		this.dlg_skip.setActive(this.allow_skip);
		this.dlg_skip.setVisible(this.allow_skip);
		//"Pop" sound
		this.snd_appear.play();
	}

	hideBox() {
		if (this.visible) {
			this.setVisible(false);
			this.setActive(false);
			this.emit('dialogcomplete', this);
		}
	}

	/* Advance through the script, halts when page ends */
	dialog_proceed() {
		this.dlg_proceed.setVisible(false);
		while (true) {
			//End of script, hide the box and exit
			if (this.dialog_script.length === 0 || this.dialog_counter > this.dialog_script.length) {
				this.hideBox();
				break;
			}

			let action = this.dialog_script[this.dialog_counter++];

			//The last action performed, so stop the loop till "Proceed" is pressed
			if (!action) {
				break;
			}

			//Perform action. If needed, the loop is broken
			if (!this.dialog_interpret_action(action))
				break;
		}
		this.dlg_proceed.setVisible(true);
	}

	/* Perform the action given by the "Action" object */
	dialog_interpret_action(action) {
		switch (action.type) {
			case "page":
				return false;
			case "message":
				this.dlg_text.text = action.data;
				break;
		}
		return true;
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
