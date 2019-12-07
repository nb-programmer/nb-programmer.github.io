/* Whatever that is needed in the game, keep it here */

ResFiles = {
	/* Images */
	"cross": {"path": "static/img/psx/PS-cross.png", "type": "img"},
	"square": {"path": "static/img/psx/PS-square.png", "type": "img"},
	"circle": {"path": "static/img/psx/PS-circle.png", "type": "img"},
	"triangle": {"path": "static/img/psx/PS-triangle.png", "type": "img"},
	
	"left": {"path": "static/img/psx/PS-left.png", "type": "img"},
	"right": {"path": "static/img/psx/PS-right.png", "type": "img"},
	"up": {"path": "static/img/psx/PS-up.png", "type": "img"},
	"down": {"path": "static/img/psx/PS-down.png", "type": "img"},
	
	"R2": {"path": "static/img/psx/PS-R2.png", "type": "img"},
	"R1": {"path": "static/img/psx/PS-R1.png", "type": "img"},
	"L2": {"path": "static/img/psx/PS-L2.png", "type": "img"},
	"L1": {"path": "static/img/psx/PS-L1.png", "type": "img"},
	
	"start": {"path": "static/img/psx/PS-start.png", "type": "img"},
	
	"sett_ico": {"path": "static/img/settings.png", "type": "img"},
	
	
	/* Sounds */
	"tap": {"path": "static/sound/tap.wav", "type": "snd"},
	"generic_send": {"path": "static/sound/generic_send.wav", "type": "snd"},
	"belle_send": {"path": "static/sound/belle_send.wav", "type": "snd"},
	"marvin_send": {"path": "static/sound/marvin_send.wav", "type": "snd"},
	"connect": {"path": "static/sound/connect.wav", "type": "snd"},
};


//Resources after loading
Resources = {
	"Sounds": {},
	"Images": {},
	
	"loaded": 0,
	"total": 0
};


//Controller list
Gamepad = [];


/* Load resources */
function loadResources(resources) {
	for (var resource in resources) {
		Resources.total += 1;
		if (resources[resource].type == "img") {
			Resources.Images[resource] = new Image();
			Resources.Images[resource].addEventListener('load', e=>Resources.loaded++);
			Resources.Images[resource].src = resources[resource].path;
		} else if (resources[resource].type == "snd") {
			Resources.Sounds[resource] = new Audio();
			Resources.Sounds[resource].addEventListener('canplaythrough', ()=>Resources.loaded++);
			Resources.Sounds[resource].src = resources[resource].path;
		}
	}
}


Audio.prototype.stop = function() {
	this.currentTime = 0;
}
Audio.prototype.replay = function() {
	this.currentTime = 0;
	this.play();
}

/* Constructor to create a simple keyboard + Gamepad button id */
function ButtonMap(kb, gp) {
	this.gp = gp;
	this.kb = kb;
}


//IDK why I named it like this LOL
//Anyways, these are default button maps.
//Refer to https://w3c.github.io/gamepad/#dfn-standard-gamepad-layout
//for the gamepad button ids.
//The keyboard button names are from KeyboardEvent's "key" attribute
ActualPetscopButtons = {
	"up": new ButtonMap("ArrowUp", [12]),
	"down": new ButtonMap("ArrowDown", [13]),
	"left": new ButtonMap("ArrowLeft", [14]),
	"right": new ButtonMap("ArrowRight", [15]),
	
	"cross": new ButtonMap("z", [0]),
	"square": new ButtonMap("a", [2]),
	"circle": new ButtonMap("x", [1]),
	"triangle": new ButtonMap("s", [3]),
	
	"L1": new ButtonMap("q", [4]),
	"L2": new ButtonMap("w", [6]),
	"R1": new ButtonMap("o", [5]),
	"R2": new ButtonMap("p", [7]),
	
	"select": new ButtonMap("Enter", [8, 10]),
	"start": new ButtonMap("f", [9, 11])
};

/* TODO: New video out, it has more of them revealed */
var Phonemes = {
	"INVALID":	"[invalid]",
	
	"longu":	"longu",
	"puh":		"puh",
	"tuh":		"tuh",
	"buh":		"buh",
	"th":		"th",
	"dh":		"dh",
	"ff":		"ff",
	"vv":		"vv",
	"duh":		"duh",
	
	"longa":	"longa",
	"longe":	"longe",
	"shorti":	"shorti",
	"uw":		"uw",
	"longo":	"longo",
	
	"mm":		"mm",
	"nn":		"nn",
	"rr":		"rr",
	"luh":		"luh",
	"shortu":	"shortu",
	"y":		"y",
	"hh":		"hh",
	"wuh":		"wuh",
	
	"ss":		"ss",
	"zz":		"zz",
	"sh":		"sh",
	"ng":		"ng",
	"gh":		"gh",
	"jh":		"jh",
	"kuh":		"kuh",
	"ch":		"ch",
	
	"ah":		"ah",
	"shorta":	"shorta",
	"aw":		"aw",
	"shorte":	"shorte",
	"er":		"er",
	"longi":	"longi",
	"a":		"a",
	"uh":		"uh",
};

//Matrix of phonemes
var phonetrix;
with (Phonemes) {
	phonetrix = {
		"R2": {
			"cross": longu,
			"square": puh,
			"circle": tuh,
			"triangle": buh,
			
			"left": th,
			"right": dh,
			"up": ff,
			"down": vv,
			
			"start": duh
		},
	
		"R1": {
			"cross": longa,
			"square": INVALID,
			"circle": longe,
			"triangle": shorti,
			
			"left": INVALID,
			"right": uw,
			"up": longo,
			"down": INVALID,
			
			"start": INVALID
		},
		
		"L2": {
			"cross": mm,
			"square": nn,
			"circle": rr,
			"triangle": luh,
			
			"left": shortu,
			"right": INVALID,
			"up": y,
			"down": hh,
			
			"start": wuh
		},
		
		"L1": {
			"cross": ss,
			"square": zz,
			"circle": INVALID,
			"triangle": sh,
			
			"left": ng,
			"right": gh,
			"up": jh,
			"down": kuh,
			
			"start": ch
		},
		
		"none": {
			"cross": ah,
			"square": shorta,
			"circle": INVALID,
			"triangle": aw,
			
			"left": shorte,
			"right": er,
			"up": longi,
			"down": a,
			
			"start": uh
		}
	};
}

var WORD_NOT_IN_TABLE = -1;
