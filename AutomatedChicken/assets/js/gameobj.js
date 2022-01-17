
/* Gameplay element entities */

class Bullets extends Phaser.Physics.Arcade.Group {
	constructor(scene) {
		super(scene.physics.world, scene);
		
		this.shoot_speed = Phaser.Math.GetSpeed(600, 1e-3);
		this.spread_decay = 0.60;
		this.sfx_shoot = scene.sound.add('snd_shoot');
		this.canShoot = true;
		this.doBufferedShoot = false;
		
		this.resetSpread();
		this.updatePos(0, 0);
		
		this.createMultiple({
			frameQuantity: 30,
			key: 'bullet',
			active: false,
			visible: false,
			classType: Bullet
		});
	}
	
	_fire_angle(bullet, x, y, angle=0) {
		bullet.fire(x, y, {x:this.shoot_speed, y:Math.sin(angle*Math.PI/180)*this.shoot_speed});
		this.sfx_shoot.play();
	}
	
	resetSpread() {
		this.spread = 15;
	}
	
	_mkBullet(x, y) {
		switch (this.scene.player_stat.powerups.ammo) {
		case Powerup.Ammo.NORMAL:
			let bullet = this.getFirstDead(false);
			if (bullet) this._fire_angle(bullet, x, y);
			break;
		case Powerup.Ammo.SPREAD:
			if (this.getTotalFree() >= 3) {
				let bullet = this.getFirstDead(false);
				if (bullet) this._fire_angle(bullet, x, y, 0);
				
				bullet = this.getFirstDead(false);
				if (bullet) this._fire_angle(bullet, x, y-32, -this.spread);
				
				bullet = this.getFirstDead(false);
				if (bullet) this._fire_angle(bullet, x, y+32, this.spread);
				
				this.spread *= this.spread_decay;
			}
			break;
		}
	}
	
	updatePos(x,y) {
		this.bx = x;
		this.by = y;
	}
	
	fireBullet(singleShot=false) {
		if (singleShot) {
			if (this.canShoot) {
				this.scene.time.delayedCall(200, () => {
					this.canShoot = true;
					if (this.doBufferedShoot) {
						this.doBufferedShoot = false;
						this.fireBullet(true);
					}
				}, this);
				this._mkBullet(this.bx, this.by);
				this.canShoot = false;
			} else
				this.doBufferedShoot = true;
		} else if (this.canShoot)
			this._mkBullet(this.bx, this.by);
	}
}

class Bullet extends Phaser.Physics.Arcade.Sprite {
	constructor(scene, x, y) {
		super(scene, x, y, 'bullet');
		this.emitter = scene.particles.createEmitter({
			speed: 50,
			alpha: { start: 0.4, end: 0 },
			scale: { start: 0.3, end: 0 },
			blendMode: 'ADD'
		});
		
		this.emitter.stop();
		this.emitter.active = false;
		this.emitter.visible = false;
		this.emitter.startFollow(this);
	}

	fire(x, y, speed) {
		this.setPosition(x, y);
		this.setVelocity(speed.x, speed.y);
		this.setAngularVelocity(280);
		this.setActive(true);
		this.setVisible(true);
		
		this.emitter.active = true;
		this.emitter.visible = true;
		this.emitter.start();
	}

	preUpdate(time, delta) {
		super.preUpdate(time, delta);
		if (this.x > WIDTH + 24) {
			this.setActive(false);
			this.setVisible(false);
			
			this.emitter.stop();
		}
	}
}

class StarField extends Phaser.GameObjects.Graphics {
	randStar() {
		return {
			x: Phaser.Math.Between(0, WIDTH),
			y: Phaser.Math.Between(0, HEIGHT),
			s: Math.random() > 0.8 ? (2 + Math.random()*2) : (0.3 + Math.random() * 2.2)
		};
	}

	constructor(scene, dX, dY) {
		super(scene);
		scene.add.existing(this);
		
		if (dX === undefined) dX = -2;
		if (dY === undefined) dY = 0;
		
		this.setSpeed(dX, dY);
		this.stars = [];
		for (let i = 0; i < 80; i++) this.stars.push(this.randStar());
	}

	setSpeed(dX, dY) {
		this._speed_x = dX;
		this._speed_y = dY;
	}

	preUpdate(time, delta) {
		this.clear();
		this.fillStyle(0xffffff, 1);
		for (let i in this.stars) {
			let cX = this.stars[i].x * this.stars[i].s;
			let cY = this.stars[i].y * this.stars[i].s;
			let cR = this.stars[i].s;
			if (cX < 0) {
				let rP = this.randStar();
				this.stars[i].y = rP.y;
				this.stars[i].s = rP.s;
				this.stars[i].x = Math.round(WIDTH / this.stars[i].s);
			}
			//if (cX > WIDTH) this.stars[i].x = 0;
			this.fillCircle(cX, cY, cR);
			this.stars[i].x += this._speed_x;
			this.stars[i].y += this._speed_y;
		}
	}
}
