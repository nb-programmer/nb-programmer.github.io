
// You can write more code here

/* START OF COMPILED CODE */

class ToolHUD extends Phaser.GameObjects.Container {

	constructor(scene, x, y) {
		super(scene, x ?? 576, y ?? 0);

		// rectangle
		const rectangle = scene.add.rectangle(44, 1, 704, 70);
		rectangle.setOrigin(0.5, 0);
		rectangle.isFilled = true;
		rectangle.fillColor = 3355443;
		rectangle.fillAlpha = 0.4;
		rectangle.isStroked = true;
		rectangle.strokeColor = 0;
		rectangle.strokeAlpha = 0.7;
		rectangle.lineWidth = 2;
		this.add(rectangle);

		// cnt_tools
		const cnt_tools = scene.add.container(0, 0);
		this.add(cnt_tools);

		// rct_item9
		const rct_item9 = scene.add.rectangle(272, 36, 64, 64);
		rct_item9.isFilled = true;
		rct_item9.fillColor = 2236962;
		rct_item9.fillAlpha = 0.3;
		rct_item9.isStroked = true;
		rct_item9.strokeColor = 0;
		rct_item9.strokeAlpha = 0.7;
		rct_item9.lineWidth = 2;
		cnt_tools.add(rct_item9);

		// rct_item8
		const rct_item8 = scene.add.rectangle(204, 36, 64, 64);
		rct_item8.isFilled = true;
		rct_item8.fillColor = 2236962;
		rct_item8.fillAlpha = 0.3;
		rct_item8.isStroked = true;
		rct_item8.strokeColor = 0;
		rct_item8.strokeAlpha = 0.7;
		rct_item8.lineWidth = 2;
		cnt_tools.add(rct_item8);

		// rct_item7
		const rct_item7 = scene.add.rectangle(136, 36, 64, 64);
		rct_item7.isFilled = true;
		rct_item7.fillColor = 2236962;
		rct_item7.fillAlpha = 0.3;
		rct_item7.isStroked = true;
		rct_item7.strokeColor = 0;
		rct_item7.strokeAlpha = 0.7;
		rct_item7.lineWidth = 2;
		cnt_tools.add(rct_item7);

		// rct_item6
		const rct_item6 = scene.add.rectangle(68, 36, 64, 64);
		rct_item6.isFilled = true;
		rct_item6.fillColor = 2236962;
		rct_item6.fillAlpha = 0.3;
		rct_item6.isStroked = true;
		rct_item6.strokeColor = 0;
		rct_item6.strokeAlpha = 0.7;
		rct_item6.lineWidth = 2;
		cnt_tools.add(rct_item6);

		// rct_item5
		const rct_item5 = scene.add.rectangle(0, 36, 64, 64);
		rct_item5.isFilled = true;
		rct_item5.fillColor = 2236962;
		rct_item5.fillAlpha = 0.3;
		rct_item5.isStroked = true;
		rct_item5.strokeColor = 0;
		rct_item5.strokeAlpha = 0.7;
		rct_item5.lineWidth = 2;
		cnt_tools.add(rct_item5);

		// rct_item4
		const rct_item4 = scene.add.rectangle(-68, 36, 64, 64);
		rct_item4.isFilled = true;
		rct_item4.fillColor = 2236962;
		rct_item4.fillAlpha = 0.3;
		rct_item4.isStroked = true;
		rct_item4.strokeColor = 0;
		rct_item4.strokeAlpha = 0.7;
		rct_item4.lineWidth = 2;
		cnt_tools.add(rct_item4);

		// rct_item3
		const rct_item3 = scene.add.rectangle(-136, 36, 64, 64);
		rct_item3.isFilled = true;
		rct_item3.fillColor = 2236962;
		rct_item3.fillAlpha = 0.3;
		rct_item3.isStroked = true;
		rct_item3.strokeColor = 0;
		rct_item3.strokeAlpha = 0.7;
		rct_item3.lineWidth = 2;
		cnt_tools.add(rct_item3);

		// rct_item2
		const rct_item2 = scene.add.rectangle(-204, 36, 64, 64);
		rct_item2.isFilled = true;
		rct_item2.fillColor = 2236962;
		rct_item2.fillAlpha = 0.3;
		rct_item2.isStroked = true;
		rct_item2.strokeColor = 0;
		rct_item2.strokeAlpha = 0.7;
		rct_item2.lineWidth = 2;
		cnt_tools.add(rct_item2);

		// rct_item1
		const rct_item1 = scene.add.rectangle(-272, 36, 64, 64);
		rct_item1.isFilled = true;
		rct_item1.fillColor = 2236962;
		rct_item1.fillAlpha = 0.3;
		rct_item1.isStroked = true;
		rct_item1.strokeColor = 0;
		rct_item1.strokeAlpha = 0.7;
		rct_item1.lineWidth = 2;
		cnt_tools.add(rct_item1);

		// rct_del_box
		const rct_del_box = scene.add.rectangle(360, 36, 64, 64);
		rct_del_box.isFilled = true;
		rct_del_box.fillColor = 2236962;
		rct_del_box.fillAlpha = 0.3;
		rct_del_box.isStroked = true;
		rct_del_box.strokeColor = 0;
		rct_del_box.strokeAlpha = 0.7;
		rct_del_box.lineWidth = 2;
		cnt_tools.add(rct_del_box);

		// btn_delete
		const btn_delete = scene.add.image(360, 36, "sim_play_state", 4);
		btn_delete.scaleX = 1.5;
		btn_delete.scaleY = 1.5;
		cnt_tools.add(btn_delete);

		// rectangle_1
		const rectangle_1 = scene.add.rectangle(-423, 2, 198, 70);
		rectangle_1.setOrigin(0.5, 0);
		rectangle_1.isFilled = true;
		rectangle_1.fillColor = 3355443;
		rectangle_1.fillAlpha = 0.4;
		rectangle_1.isStroked = true;
		rectangle_1.strokeColor = 0;
		rectangle_1.strokeAlpha = 0.7;
		rectangle_1.lineWidth = 2;
		this.add(rectangle_1);

		// btn_play_pause
		const btn_play_pause = scene.add.image(-487, 37, "sim_play_state", 0);
		btn_play_pause.scaleX = 1.5;
		btn_play_pause.scaleY = 1.5;
		this.add(btn_play_pause);

		// btn_reset
		const btn_reset = scene.add.image(-423, 37, "sim_play_state", 2);
		btn_reset.scaleX = 1.5;
		btn_reset.scaleY = 1.5;
		this.add(btn_reset);

		// btn_exit
		const btn_exit = scene.add.image(-358, 37, "sim_play_state", 3);
		btn_exit.scaleX = 1.5;
		btn_exit.scaleY = 1.5;
		this.add(btn_exit);

		// txt_levelname
		const txt_levelname = scene.add.text(564, 37, "", {});
		txt_levelname.setOrigin(1, 0.5);
		txt_levelname.text = "Level";
		txt_levelname.setStyle({ "align": "right", "fontFamily": "Arial", "fontSize": "24px", "shadow.offsetX":2,"shadow.offsetY":2,"shadow.fill":true});
		this.add(txt_levelname);

		this.cnt_tools = cnt_tools;
		this.rct_item9 = rct_item9;
		this.rct_item8 = rct_item8;
		this.rct_item7 = rct_item7;
		this.rct_item6 = rct_item6;
		this.rct_item5 = rct_item5;
		this.rct_item4 = rct_item4;
		this.rct_item3 = rct_item3;
		this.rct_item2 = rct_item2;
		this.rct_item1 = rct_item1;
		this.btn_delete = btn_delete;
		this.btn_play_pause = btn_play_pause;
		this.btn_reset = btn_reset;
		this.btn_exit = btn_exit;
		this.txt_levelname = txt_levelname;

		/* START-USER-CTR-CODE */

		//Item group
		this.items = [
			[rct_item1, null],
			[rct_item2, null],
			[rct_item3, null],
			[rct_item4, null],
			[rct_item5, null],
			[rct_item6, null],
			[rct_item7, null],
			[rct_item8, null],
			[rct_item9, null]
		];

		this.txt_levelname.setVisible(false);
		makeClickable(this.btn_play_pause)
			.on('stateupdate', this.btn_animate);
		makeClickable(this.btn_reset)
			.on('stateupdate', this.btn_animate);
		makeClickable(this.btn_exit)
			.on('stateupdate', this.btn_animate);

		this.btn_play_pause.on('click', ()=>this.emit('sim_playpause'));
		this.btn_reset.on('click', ()=>this.emit('sim_restart'));
		this.btn_exit.on('click', ()=>this.emit('exit_course'));
		this.on('sim_setstate', this.updateSimState);
		this.on('sim_reset', this.resetEntities);

		/* END-USER-CTR-CODE */
	}

	/** @type {Phaser.GameObjects.Container} */
	cnt_tools;
	/** @type {Phaser.GameObjects.Rectangle} */
	rct_item9;
	/** @type {Phaser.GameObjects.Rectangle} */
	rct_item8;
	/** @type {Phaser.GameObjects.Rectangle} */
	rct_item7;
	/** @type {Phaser.GameObjects.Rectangle} */
	rct_item6;
	/** @type {Phaser.GameObjects.Rectangle} */
	rct_item5;
	/** @type {Phaser.GameObjects.Rectangle} */
	rct_item4;
	/** @type {Phaser.GameObjects.Rectangle} */
	rct_item3;
	/** @type {Phaser.GameObjects.Rectangle} */
	rct_item2;
	/** @type {Phaser.GameObjects.Rectangle} */
	rct_item1;
	/** @type {Phaser.GameObjects.Image} */
	btn_delete;
	/** @type {Phaser.GameObjects.Image} */
	btn_play_pause;
	/** @type {Phaser.GameObjects.Image} */
	btn_reset;
	/** @type {Phaser.GameObjects.Image} */
	btn_exit;
	/** @type {Phaser.GameObjects.Text} */
	txt_levelname;

	/* START-USER-CODE */

	TOOL_CLASSES = {
		"TNT": {"cls": TNT, "tex": "spr_entities", "frame": 13},
		"TeleporterA": {"cls": Teleporter, "tex": "spr_entities", "frame": 16},
		"TeleporterB": {"cls": Teleporter, "tex": "spr_entities", "frame": 18},
		"Block": {"cls": Block2D, "tex": "spr_entities", "frame": 15},
		"Stair": {"cls": StairBlock, "tex": "spr_entities", "frame": 23}
	};

	btn_animate(state) {
		switch (state) {
			case this.STATE_OVER:
				this.setScale(1.8);
				break;
			default:
				this.setScale(1.5);
		}
	}

	delete_button_update(state, e) {

	}

	//Change what the button displays
	updateSimState(state) {
		switch (state) {
			case "running":
				this.btn_play_pause.setFrame(1, false, false);
				break;
			case "paused":
				this.btn_play_pause.setFrame(0, false, false);
				break;
		}
	}

	setLevelName(name) {
		this.txt_levelname.setText(name);
		this.txt_levelname.setVisible(true);
	}

	firstEmptyTool() {
		for (let x in this.items)
			if (!this.items[x][1])
				return x;
		return null;
	}
	
	linkCount(obj, grp) {
		return (grp._count_txt = obj);
	}
	
	linkItemFrame(obj, grp) {
		return (grp._item_img = obj);
	}

	setTools(items) {
		for (let i in items) {
			let item = items[i];
			let cls = this.TOOL_CLASSES[item.key];
			if (!cls) {
				console.warn("Invalid entity class: " + item.key);
				continue;
			}

			let tl_itm = this.firstEmptyTool();
			if (tl_itm) {
				let i = this.items[tl_itm];
				i[1] = this.scene.add.group({
					"classType": cls.cls,
					"maxSize": item.count,
					"createCallback": (obj) => {
						obj.setProperties(item.properties);
						//Inter-item collision
						for (let x in this.items) {
							if (this.items[x][1]) {
								this.scene.physics.add.collider(obj, this.items[x][1]);
							}
						}
					}
				});
				this.cnt_tools.add(
					makeDraggable(this.linkItemFrame(
						this.scene.add.image(i[0].x, i[0].y, cls.tex, cls.frame)
						.on('drop', function(pointer, dropZone) {
							if(dropZone.name == "Tools") {
								this.emit("tool_drop", i[1], pointer, dropZone);
							}
						}, this), i[1]
					))
				);
				this.cnt_tools.add(this.linkCount(
					this.scene.add.text(i[0].x + 28, i[0].y + 24, "0")
						.setOrigin(1, 0.5)
						.setStyle({ "align": "right", "fontFamily": "Arial", "fontSize": "14px", "shadow.offsetX":2,"shadow.offsetY":2,"shadow.fill":true})
				, i[1]));
			}
		}
	}
	
	resetEntities() {
		for (let x in this.items)
			if (this.items[x][1])
				this.items[x][1].getChildren().forEach(o => o.resetState());
	}
	
	preUpdate(delta, time) {
		for (let x in this.items) {
			if (this.items[x][1]) {
				if (this.items[x][1]._count_txt)
					this.items[x][1]._count_txt.text = this.items[x][1].getTotalFree().toString();
				if (this.items[x][1]._item_img) {
					this.items[x][1]._item_img.setAlpha(this.items[x][1].getTotalFree() > 0 ? 1 : 0.4);
					if (this.items[x][1].getTotalFree() > 0)
						this.items[x][1]._item_img.clearTint();
					else
						this.items[x][1]._item_img.setTint(0x800505);
				}
			}
		}
	}
	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

//To save on files, write some objects here
class Block2D extends Phaser.GameObjects.Sprite {
	constructor(scene, x, y, texture, frame) {
		super(scene, x ?? 0, y ?? 0, texture || "spr_entities", frame ?? 15);

		this.scaleX = 2;
		this.scaleY = 2;

		/* START-USER-CTR-CODE */
		this._orig_tex = {"t": this.texture, "f": this.frame};
		this.props = {
			spawnX: x,
			spawnY: y,
		};

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
		
		this.resetState();
		/* END-USER-CTR-CODE */
	}

	/* START-USER-CODE */

	_setupSounds() {
		this.sfx = {};
	}

	/* Tool API functions (to be moved to a base class) */
	setPlayerCollision(player) {
		this.scene.physics.add.collider(this, player);
	}

	setProperties(props) {
		Object.assign(this.props, props);
		this.resetState();
		return this;
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
	}

	deactivate() {
		this.setActive(false);
		this.setVisible(false);
	}
}

class StairBlock extends Phaser.GameObjects.Sprite {
	constructor(scene, x, y, texture, frame) {
		super(scene, x ?? 0, y ?? 0, texture || "spr_entities", frame ?? 23);

		this.scaleX = 2;
		this.scaleY = 2;

		/* START-USER-CTR-CODE */
		this._orig_tex = {"t": this.texture, "f": this.frame};
		this.props = {
			spawnX: x,
			spawnY: y,
			type: "up-right"
		};
		
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
		
		this.resetState();
		/* END-USER-CTR-CODE */
	}

	_setupSounds() {
		this.sfx = {};
	}
	
	playerStairHit(self, player) {
		player.body.setVelocity(player.body.velocity.x, 0);
		player.y = self.y - 4 - Math.max(Math.min(player.x - self.x + 32, 64), 0);
	}

	/* Tool API functions (to be moved to a base class) */
	setPlayerCollision(player) {
		this.scene.physics.add.overlap(this, player, this.playerStairHit);
	}

	setProperties(props) {
		Object.assign(this.props, props);
		this.resetState();
		return this;
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
	}

	deactivate() {
		this.setActive(false);
		this.setVisible(false);
	}
}