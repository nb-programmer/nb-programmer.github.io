/**
 * Q: Why did the chicken cross the wall?
 * -> It was eggcited XD XD
 */

//2D chicken game
//Turing complete
//Chicken starts left side, use mechanics to yeet the chicken to the right side

/**
 * Attribution:
 * Fonts:
 * https://www.fontspace.com/countryside-font-f29783
 * https://www.fontspace.com/goldleaf-bold-font-f66787
 * 
 * Sprites:
 * https://forums.rpgmakerweb.com/index.php?threads/whtdragons-animals-and-running-horses-now-with-more-dragons.53552/
 *
 * Music:
 * Title screen:
 * Reference MIDI: https://bitmidi.com/entry-of-the-gladiators-march-of-triumph-mid
 *
 * Tileset:
 * https://cypor.itch.io/basic-platformer-tileset
 *
 * See README.md for whole list
 *
 */

//Title of the game! Also used for LocalStorage (save/load)
window.gameTitle = "Automated Chicken";

//Set to true to enable Debug Mode (extra visuals, debug tools, etc.)
//window.debugMode = true;

//Load and store game save state
window.gameState = {};
window.gameStateSave = function() {
	if (window.localStorage) {
		window.localStorage.setItem(window.gameTitle, JSON.stringify(window.gameState));
	}
};
/**
 * Load state from Storage API. Returns the state if valid data is found (also assigns to gameState),
 * else returns an integer code corresponding to why it failed.
 *  0: Browser doesn't support Storage API
 * -1: Save data not present (first boot)
 * -2: Save data is present, but empty (weird scenario)
 * null: invalid data present (Data is not JSON)
 */
window.gameStateLoad = function() {
	if (!window.localStorage) return 0;
	let ldstate = window.localStorage.getItem(window.gameTitle);
	if (!ldstate) return -1;
	try {
		let state_obj = JSON.parse(ldstate);
		if (Object.keys(state_obj).length === 0) return -2;
		return (window.gameState = state_obj);
	} catch (e) {
		//Weird data found in load state
		return null;
	}
};

/**
 * Adds some extra functions to Phaser
 */
function setupPhaserCustom() {
	Phaser.Scene.prototype.fadeOutToScene = function(scene_id, options) {
		this.cameras.main.fadeOut(250, 0, 0, 0);
		this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) => {
			this.time.delayedCall(250, () => {
				this.scene.start(scene_id, options);
			});
		});
	};
}

/**
 * Set-up game on page load
 */
window.addEventListener('load', function() {
	setupPhaserCustom();
	let loadStateStatus = window.gameStateLoad();

	var game = new Phaser.Game({
		"title": window.gameTitle,
		"width": 1152,
		"height": 640,
		"type": Phaser.AUTO,
		"backgroundColor": "black",
		"parent": "game-container",
		"physics": {
			"default": "arcade"
		},
		"pixelArt": true,
		"scale": {
			"mode": Phaser.Scale.FIT,
			"autoCenter": Phaser.Scale.CENTER_BOTH
		},
		"audio": {
			//Some browsers have trouble using Web Audio API
			//"disableWebAudio": true
		},
		"fps": 60
	});
	game.scene.add("Boot", Boot, true, loadStateStatus);
});


/**
 * Preloader scene
 * Shows progress bar when loading all resources
 */
class Boot extends Phaser.Scene {
	preload() {
		/* Loading progress bar */
		const BAR_CENTER_X = this.game.config.width / 2;
		const BAR_CENTER_Y = this.game.config.height / 2;
		const BAR_WIDTH = 300;
		const BAR_HEIGHT = 30;
		const BAR_LOC_X = BAR_CENTER_X - BAR_WIDTH / 2;
		const BAR_LOC_Y = BAR_CENTER_Y - BAR_HEIGHT / 2;
		
		var progressBar = this.add.graphics();
		var progressBox = this.add.graphics();
		var progressPct = this.add.text(BAR_CENTER_X, BAR_CENTER_Y, "Loading...", {fillStyle: "#fff"}).setOrigin(0.5, 0.5);

		progressBox.lineStyle(1, 0x338888, 1.0);
		progressBox.strokeRect(BAR_LOC_X, BAR_LOC_Y, BAR_WIDTH, BAR_HEIGHT);

		this.load.on('progress', function (value) {
			let progress_percent_value = Math.round(value*1e4)/1e2;
			progressBar.clear();
			progressBar.fillStyle(0x5555EE, 1);
			progressBar.fillRect(BAR_LOC_X, BAR_LOC_Y, BAR_WIDTH * value, BAR_HEIGHT);
			progressPct.setText("Loading " + progress_percent_value + "%");
		});

		this.load.on('complete', function () {
			progressBar.destroy();
			progressBox.destroy();
		});


		/* Load assets */

		//Load Resources for the game (Scenes, configuration, etc.)
		this.load.pack('res', 'game/resources.asset-pack.json');

		//Load game assets from asset pack
		this.load.pack('pack', 'assets/asset-pack.json');
	}

	create(loadStateStatus) {
		//Validate load state status
		switch (loadStateStatus) {
			case 0:
				window.alert("Warning: this browser doesn't support Storage API. This means your progress will be lost as soon as you leave this page.");
				break;
			case null:
				alert("Corrupted data found in Saved storage. Data will be reset.");
			case -1:
			case -2:
				//Set-up initial save data fro config
				let cfg = this.cache.json.get('config').boot;
				window.gameState = cfg.initSaveData;
				
				//Save
				window.gameStateSave();
				break;
		}
			
		this.setupModTracker();
		if (this.sound.locked) {
			console.warn("There will be no audio till user interacts with the game");
			//TODO: Alert user to click into the game
		}
		this.fadeOutToScene('Titlescreen');
	}

	setupModTracker() {
		//We are using Extended Module format for BGM
		window.ModTracker = new Modplayer();
		window.ModTracker.player = new Fasttracker();
		window.ModTracker.format = 'xm';
	}
}
