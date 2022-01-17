
/* START OF COMPILED CODE */

class Gameplay extends Phaser.Scene {

	constructor() {
		super("Gameplay");

		/* START-USER-CTR-CODE */
		/* END-USER-CTR-CODE */
	}

	/** @returns {void} */
	editorCreate() {

		// pecker
		const pecker = new Chicken(this, 140, 184);
		this.add.existing(pecker);

		// layer_useritems
		const layer_useritems = this.add.container(0, 0);

		// layer_ui
		const layer_ui = this.add.container(0, 0);

		// cnt_dboxes
		const cnt_dboxes = this.add.container(0, 0);
		layer_ui.add(cnt_dboxes);

		// toolHUD
		const toolHUD = new ToolHUD(this, 576, 0);
		layer_ui.add(toolHUD);

		// tspr_bg
		const tspr_bg = this.add.tileSprite(0, 640, 2000, 300, "tex_bg_mtn");
		tspr_bg.setOrigin(0.2, 1);
		tspr_bg.tilePositionY = 1;

		this.pecker = pecker;
		this.layer_useritems = layer_useritems;
		this.layer_ui = layer_ui;
		this.cnt_dboxes = cnt_dboxes;
		this.toolHUD = toolHUD;
		this.tspr_bg = tspr_bg;

		this.events.emit("scene-awake");
	}

	/** @type {Chicken} */
	pecker;
	/** @type {Phaser.GameObjects.Container} */
	layer_useritems;
	/** @type {Phaser.GameObjects.Container} */
	layer_ui;
	/** @type {Phaser.GameObjects.Container} */
	cnt_dboxes;
	/** @type {ToolHUD} */
	toolHUD;
	/** @type {Phaser.GameObjects.TileSprite} */
	tspr_bg;

	/* START-USER-CODE */

	preload() {
		window.ModTracker.stop();
		window.ModTracker.loadBuffer(new Uint8Array(this.cache.binary.get('bgm_ingame')));
	}

	create(levelid) {
		this.editorCreate();

		let cfg = this.cache.json.get('config');
		let gcfg = cfg.gameplay;

		this.current_level = {"name": levelid, "data": cfg.levels[levelid]};

		if (!cfg.levels[levelid]) {
			window.gameState.currentLevel = "level1";
			this.gameplayExit();
			return;
		}
		this.cameras.main.setBackgroundColor(gcfg.sky.color);
		this.pecker.setDepth(1);

		this.tspr_bg.setScrollFactor(0.3)
			.setDepth(-100);

		//Default gravity for the physics engine
		this.physics.world.gravity.y = gcfg.gravity;

		//Play BGM
		if (!this.sound.locked)
			window.ModTracker.play();
		else
			this.sound.once(Phaser.Sound.Events.UNLOCKED, () => {
				window.ModTracker.play();
			});

		this.toolHUD.on('sim_restart', this.resetSim, this)
			.on('sim_playpause', this.toggleSimState, this)
			.on('exit_course', this.gameplayExit, this)
			.on('tool_drop', this.addToolToScene, this)
			.addToUpdateList();

		//Load given level
		this.loadLevel(this.current_level.data);
		this.toolHUD.setLevelName(this.current_level.data.name);

		//Keep UI on top
		this.layer_ui.setDepth(1000).addToUpdateList();
		//Keep UI aligned with camera
		this.events.on(Phaser.Cameras.Scene2D.Events.PRE_RENDER, this.UIAlignToCamera, this);

		//Fade-in to the scene
		this.cameras.main.fadeIn(250);
	}

	loadLevel(leveldata) {
		//Delete all UI stuff
		this.cnt_dboxes.removeAll();
		this.layer_useritems.removeAll();

		let level_key = leveldata.map_key;
		let level_map = this.add.tilemap(level_key);

		//Tileset for the texture
		level_map.addTilesetImage("[TILESET] Tileset", "ts_ground");

		//The layer with most of the level data (visual only)
		level_map.createLayer("LevelLayer", ["[TILESET] Tileset"], 0, 0);

		//Other layers behind and infront of the player sprite
		level_map.createLayer("BackLayer", ["[TILESET] Tileset"], 0, 0).setDepth(-1);
		level_map.createLayer("FrontLayer", ["[TILESET] Tileset"], 0, 0).setDepth(2);

		//Collision layer (invisible)
		let col_layer = level_map.createLayer("CollisionLayer", ["[TILESET] Tileset"], 0, 0)
			.setCollisionFromCollisionGroup(true)
			.setVisible(!!window.debugMode);

		//Player can collide with the collision layer
		this._col_layer = col_layer;
		this.physics.add.collider(this.pecker, col_layer);

		//Add handlers for collision with certain elements
		//TODO: Is there a way to get the indices from the tilemap itself? Collision group doesn't tell it
		col_layer.setTileIndexCallback(leveldata.collision.platform, this.spriteCollideTilePlatform, this);

		col_layer.setTileIndexCallback(leveldata.collision.death, this.spriteCollideTileDeath, this);
		col_layer.setTileIndexCallback(leveldata.collision.goal, this.spriteCollideTileGoal, this);

		/* Dialog boxes */
		for (let db_name in leveldata.data.dialogues) {
			let db_data = leveldata.data.dialogues[db_name];
			let diabox = new DialogBox(this, db_data.pos.x, db_data.pos.y);
			diabox.name = db_name;
			this.cnt_dboxes.add(diabox);
			diabox.setDialogScript(db_data.script);
			diabox.allow_skip = db_data.can_skip || false;
			if (db_data.on_finish) {
				diabox.close_action = db_data.on_finish;
				diabox.on('dialogcomplete', this.dialogCloseAction);
			}
		}

		//Action triggers
		this.createTriggers(leveldata.data.triggers);

		//Entities' location in the level
		let entities = level_map.createLayer("EntityLayer", ["[TILESET] Tileset"], 0, 0)
			.setVisible(false);

		entities.forEachTile(this.initEntitiesFromTile, {"scene": this, "level": leveldata, "e": entities}, undefined, undefined, undefined, undefined, {"isNotEmpty": true});

		//Tools available
		this.toolHUD.setTools(leveldata.data.items);

		//for (let x in this.toolHUD.items)
			//if (this.toolHUD.items[x][1])
				//this.toolHUD.items[x][1];

		//Tool drop zone
		let zone = this.add.zone(0, 0, level_map.widthInPixels, level_map.heightInPixels).setOrigin(0,0).setName("Tools").setDropZone();

		this.cameras.main.setBounds(0, -1000, level_map.widthInPixels, 1000 + level_map.heightInPixels);
		this.cameras.main.startFollow(this.pecker);
		this.cameras.main.setLerp(0.1, 0.1);

		//Level loading finished
		this.resetSim();
		this.events.emit("levelbegin");
	}

	UIAlignToCamera() {
		//Keep the UI layer fixed to the camera
		let cam = this.cameras.main;
		this.layer_ui.setPosition(cam.scrollX, cam.scrollY);
	}

	createTriggers(triggers) {
		for (let i in triggers.dialogbox) {
			let data = triggers.dialogbox[i];
			this.events.on(data.event, () => {
				let shouldShow = true;

				//Show only if game state conditions are met
				if (data.ifState)
					shouldShow = Object.keys(data.ifState).every(o => window.gameState[o] === data.ifState[o]);

				if (shouldShow) {
					let dbox = this.cnt_dboxes.getByName(data.key);
					if (dbox)
						dbox.showBox();
				}
			});
		}
	}

	initEntitiesFromTile(tile, idx, arr) {
		switch (tile.index) {
			case this.level.collision.player_spawn:
				//Player spawn
				let x = this.e.tileToWorldX(tile.x) + 8;
				let y = this.e.tileToWorldX(tile.y) + 16 - this.scene.pecker.displayHeight / 2;
				this.scene.pecker.setSpawn(x, y);
				this.scene.pecker.resetState();
				break;
		}
	}

	/* Tutorial box */
	dialogCloseAction(box) {
		let cl_action = box.close_action;
		if (cl_action) {
			switch (cl_action.action) {
				case "setState":
					//Update game state variable
					Object.assign(window.gameState, cl_action.data);
					window.gameStateSave();
					break;
			}
		}
	}

	/* Collision with a collision tile */
	spriteCollideTilePlatform(sprite, tile) {
		//Collide only if going downwards (positive velocity)
		return sprite.body.velocity.y < 0;
	}

	spriteCollideTileDeath(sprite, tile) {
		if (sprite instanceof Chicken) {
			sprite.die();
			this.resetSim();
		}
		return false;
	}

	spriteCollideTileGoal(sprite, tile) {
		if (sprite instanceof Chicken) {
			//Pause only the physics engine
			this.physics.world.pause();
			//Stop BGM
			window.ModTracker.stop();
			//Stop UI interaction
			this.layer_ui.removeAll(true);
			//Pecker animation
			this.pecker.goalReached();
			//Update game state
			this.updateGameStateLevelClear();
			//Level clear screen
			this.createLevelClear();
		}
		return false;
	}

	addToolToScene(group, e, zone) {
		let obj = group.get(e.worldX, e.worldY);
		if (obj && this._col_layer) {
			this.physics.add.collider(obj, this._col_layer);
			obj.setPlayerCollision(this.pecker);
			this.events.emit('tool_update', obj, "added");
		}
	}

	/* Simulation */
	toggleSimState() {
		if (this.physics.world.isPaused) {
			//Start simulation
			this.startSim();
		} else {
			//Pause simulation
			this.pauseSim();
		}
	}

	startSim() {
		this.physics.world.resume();
		this.toolHUD.emit('sim_setstate', 'running');
		this.pecker.simbegin();
		//this.cameras.main.startFollow(this.pecker);
	}

	pauseSim() {
		this.physics.world.pause();
		this.toolHUD.emit('sim_setstate', 'paused');
		this.pecker.simpause();
	}

	resetSim() {
		this.pauseSim();
		this.pecker.resetState();
		this.toolHUD.emit('sim_reset');
		//this.cameras.main.stopFollow();
	}

	/* Back to title */
	gameplayExit() {
		window.gameStateSave();
		this.fadeOutToScene('Titlescreen');
	}

	gameplayNextLevel() {
		//This state should be updated by the updateGameStateLevelClear function
		this.fadeOutToScene('Gameplay', window.gameState.currentLevel);
	}

	updateGameStateLevelClear() {
		window.gameState.completedLevels = Array.from(new Set(
			window.gameState.completedLevels
		).add(this.current_level.name));
		window.gameState.currentLevel = this.current_level.data.next;
		window.gameStateSave();
	}

	createLevelClear() {
		this.layer_ui.add(
			new LevelClear(this, 0, 0)
				.on("continue", this.gameplayNextLevel, this)
				.on("exit", this.gameplayExit, this)
		);
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
