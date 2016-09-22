var shootApp = {
    playerLives: 5,
    playerHealth: 5,
    weapon: [],
    baddies: ['ts', 'ts', 'vs', 'us', 'ps'],
    level: 0
}

shootApp.boot = function(game) {
    console.log("you're in boot")

}



shootApp.boot.prototype = {

    init: function() {
        //pause when not focused
        this.stage.disableVisibilityChange = false;
    },

    preload: function() {
        this.game.load.image('background', '/assets/gridsBackground.png');
        this.game.load.image('player', '/assets/w.png');
        this.game.load.image('ts', '/assets/t.png');
        this.game.load.image('vs', '/assets/v.png')
        this.game.load.image('us', '/assets/u.png')
        this.game.load.image('ps', '/assets/p.png')
        this.game.load.image('bullet', '/assets/bullet.png')
        this.game.load.image('beam1', '/assets/1.png')
        this.game.load.image('sineCurve', 'assets/2.png')
        this.game.load.image('spreadShot', 'assets/3.png')
        this.game.load.image('explosion', 'assets/explosion.png')
        this.game.load.image('enemyBullet', 'assets/enemyBullet.png')


        //  Here we load the assets required for our preloader (in this case a background and a loading bar)
        this.game.load.image('loading', 'assets/gridsBackground.png');

    },

    create: function() {

        //  By this point the preloader assets have loaded to the cache, we've set the game settings
        //  So now let's start the real preloader going
        this.game.state.start('level1');

    }

};

shootApp.methods = {

    createTs: function() {
        console.log("level is", shootApp.level)
        for (var y = 0; y < 4; y++) {
            for (var x = 0; x < 10; x++) {
                var alien = ts.create(x * 48, y * 50, shootApp.baddies[shootApp.level]);
                alien.anchor.setTo(0.5, 0.5);
                alien.body.moves = false;
                alien.health = shootApp.level + 1


            }
        }
        ts.x = 100;
        ts.y = 50;

        //  All this does is basically start the invaders moving. Notice we're moving the Group they belong to, rather than the invaders directly.
        var tween = this.game.add.tween(ts).to({ x: 750 }, 5000, Phaser.Easing.Linear.None, true, 0, 1000, true);

        //  When the tween loops it calls descend
        tween.onLoop.add(this.descend, this);
    },


    create: function() {
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        var bg = this.game.add.tileSprite(0, 0, 1920, 1920, 'background');
        bg.scale.y = 1.6
        bg.scale.x = 1.4
        this.game.world.setBounds(0, 0, 1200, 700);

        ts = this.game.add.group();
        ts.enableBody = true;
        ts.physicsBodyType = Phaser.Physics.ARCADE;
        this.createTs();

        //enemy's bullets
        tsBullet = this.game.add.group();
        tsBullet.enableBody = true;
        tsBullet.physicsBodyType = Phaser.Physics.ARCADE;
        tsBullet.createMultiple(70, 'enemyBullet');
        tsBullet.setAll('anchor.x', 0.5);
        tsBullet.setAll('anchor.y', 0.5);
        tsBullet.setAll('outOfBoundsKill', true);
        tsBullet.setAll('checkWorldBounds', true);

        bullets = this.game.add.group();
        bullets.enableBody = true;
        bullets.physicsBodyType = Phaser.Physics.ARCADE;
        bullets.createMultiple(30, 'bullet');
        bullets.setAll('anchor.x', 0.24);
        bullets.setAll('anchor.y', 0.7);
        bullets.setAll('outOfBoundsKill', true);
        bullets.setAll('checkWorldBounds', true);

        bonus1 = this.game.add.group();
        bonus1.enableBody = true;
        bonus1.physicsBodyType = Phaser.Physics.ARCADE;
        bonus1.createMultiple(30, 'beam1');
        bonus1.setAll('anchor.x', 0.5);
        bonus1.setAll('anchor.y', 1);
        bonus1.setAll('outOfBoundsKill', true);
        bonus1.setAll('checkWorldBounds', true);

        bonus2 = this.game.add.group();
        bonus2.enableBody = true;
        bonus2.physicsBodyType = Phaser.Physics.ARCADE;
        bonus2.createMultiple(70, 'sineCurve');
        bonus2.setAll('anchor.x', 0.5);
        bonus2.setAll('anchor.y', 1);
        bonus2.setAll('outOfBoundsKill', true);
        bonus2.setAll('checkWorldBounds', true);

        bonus3 = this.game.add.group();
        bonus3.enableBody = true;
        bonus3.physicsBodyType = Phaser.Physics.ARCADE;
        bonus3.createMultiple(30, 'spreadShot');
        bonus3.setAll('anchor.x', 0.5);
        bonus3.setAll('anchor.y', 1);
        bonus3.setAll('outOfBoundsKill', true);
        bonus3.setAll('checkWorldBounds', true);


        //  An explosion pool
        explosions = this.game.add.group();
        explosions.enableBody = true;
        explosions.physicsBodyType = Phaser.Physics.ARCADE;
        explosions.createMultiple(30, 'explosion');
        explosions.setAll('anchor.x', 0.5);
        explosions.setAll('anchor.y', 0.5);
        explosions.forEach(function(explosion) {
            explosion.animations.add('explosion');
        });

        player = this.game.add.sprite(this.game.world.centerX, 675, 'player');
        player.scale.setTo(0.3, 0.3)
        this.game.physics.enable(player, Phaser.Physics.ARCADE);
        player.body.collideWorldBounds = true;

        cursors = this.game.input.keyboard.createCursorKeys();
        fireButton = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

    },

    update: function() {


        if (ts.countLiving() == 0) {
            console.log("thats game, blouses")
            shootApp.level++
                this.game.state.start('level' + shootApp.level);
        }

        if(shootApp.level === 2){
            sineCurveBonus = 20||21||23
        }
        if(shootApp.level===3){
            spreadShotBonus = 32||33||31
        }

        player.body.velocity.x = 0;


        if (cursors.left.isDown) {
            player.body.velocity.x = -300;
        } else if (cursors.right.isDown) {
            player.body.velocity.x = 300;
        }

        if (fireButton.isDown) {
            this.fireBullet();
        }

        if (this.game.time.now > firingTimer) {
            this.enemyFires();
        }

        bank = player.body.velocity.x / maxSpeed;
        player.angle = bank * 10;


        this.game.physics.arcade.overlap(ammo, ts, this.collisionHandler, null, this);
        this.game.physics.arcade.overlap(bonus2, player, this.catchbonus2, null, this);
        this.game.physics.arcade.overlap(bonus1, player, this.catchbonus1, null, this);
        this.game.physics.arcade.overlap(bonus3, player, this.catchbonus3, null, this);
        this.game.physics.arcade.overlap(tsBullet, player, this.gotHit, null, this);

    },


    render: function() {

        this.game.debug.cameraInfo(this.game.camera, 32, 32);
        this.game.debug.spriteCoords(player, 32, 500);

    },

    descend: function() {
        ts.y += 30
    },



    collisionHandler: function(bullet, alien) {
        var explosion = explosions.getFirstExists(false);
        if (ts.countLiving() === beam1Bonus) {

            console.log("bonus1 should drop now", this.dropbonus1)
            bullet.kill()
            explosion.reset(alien.body.x + alien.body.halfWidth, alien.body.y + alien.body.halfHeight);
            explosion.body.velocity.x = alien.body.velocity.x;
            explosion.lifespan = 150;
            alien.health--
                if (alien.health === 0) {
                    this.dropbonus1(alien)
                    alien.kill();
                }
        }
        if (ts.countLiving() === sineCurveBonus) {
            console.log("bonus2 should drop now", this.dropbonus2)
            bullet.kill()
            explosion.reset(alien.body.x + alien.body.halfWidth, alien.body.y + alien.body.halfHeight);
            explosion.body.velocity.x = alien.body.velocity.x;
            explosion.lifespan = 150;
            alien.health--
                if (alien.health === 0) {
                    this.dropbonus2(alien)
                    alien.kill();
                }
        }
          if (ts.countLiving() === spreadShotBonus) {
            console.log("bonus2 should drop now", this.dropbonus3)
            bullet.kill()
            explosion.reset(alien.body.x + alien.body.halfWidth, alien.body.y + alien.body.halfHeight);
            explosion.body.velocity.x = alien.body.velocity.x;
            explosion.lifespan = 150;
            alien.health--
                if (alien.health === 0) {
                    this.dropbonus3(alien)
                    alien.kill();
                }
        }
        bullet.kill()
        this.tsFire(alien);
        explosion.reset(alien.body.x + alien.body.halfWidth, alien.body.y + alien.body.halfHeight);
        explosion.body.velocity.x = alien.body.velocity.x;
        explosion.lifespan = 150;
        alien.health--
            if (alien.health === 0) {
                alien.kill();


            }

    },


    // bonuses



    dropbonus1: function(answer) {
        laser = bonus1.getFirstExists(false);
        laser.reset(answer.body.x, answer.body.y);
        this.game.physics.arcade.moveToXY(laser, answer.body.x, 700, 320);
         console.log("this is dropbonus1", laser)
    },

    catchbonus1: function(player, beam1) {
        beam1.kill();
        shootApp.weapon = []
        shootApp.weapon.push("laser")
    },

    dropbonus2: function(answer) {
        sineBullet = bonus2.getFirstExists(false);
        sineBullet.reset(answer.body.x, answer.body.y);
        this.game.physics.arcade.moveToXY(sineBullet, answer.body.x, 700, 320);
        console.log("did bonus2 drop?", sineBullet)
    },

    catchbonus2: function(player, sineCurve) {
        sineCurve.kill();
        shootApp.weapon = []
        shootApp.weapon.push("sineBullet")
    },

    dropbonus3: function(answer) {

        spreadShotBullet = bonus3.getFirstExists(false);
        spreadShotBullet.reset(answer.body.x, answer.body.y);
        this.game.physics.arcade.moveToXY(spreadShotBullet, answer.body.x, 700, 320);
        console.log("bonus3 should drop now", spreadShotBullet)
    },

    catchbonus3: function(player, spreadShot) {
        spreadShot.kill();
        shootApp.weapon = []
        shootApp.weapon.push("spreadShot")
    },

    //enemy

    enemyFires: function() {

        //  Grab the first bullet we can from the pool
        enemyBullet = tsBullet.getFirstExists(false);

        livingEnemies.length = 0;

        ts.forEachAlive(function(alien) {

            // put every living enemy in an array
            livingEnemies.push(alien);
        });


        if (enemyBullet && livingEnemies.length > 0) {

            var random = this.game.rnd.integerInRange(0, livingEnemies.length - 1);

            // randomly select one of them
            var shooter = livingEnemies[random];
            // And fire the bullet from this enemy
            enemyBullet.reset(shooter.body.x, shooter.body.y);

            this.game.physics.arcade.moveToObject(enemyBullet, player, 320);
            firingTimer = this.game.time.now + 2000;
        }

    },
    gotHit: function(player, tsBullet) {
        // tsBullet.kill();
        // shootApp.playerHealth--
        //     if (shootApp.playerHealth < 0) {
        //         player.kill()
        //     }
    },



    tsFire: function(answer) {
        console.log("fire")
        var Tbullet = tsBullet.getFirstExists(false);
        if (ts.countLiving() % 3 === 0) {
            Tbullet.reset(answer.body.x, answer.body.y);
            this.game.physics.arcade.moveToObject(Tbullet, player, 320);
        }
    },

    //weapon

    fireBullet: function() {
        if (shootApp.weapon.length === 0) {
            ammo = bullets
            fireRate = this.game.time.now + 350;
            bulletSpeed = -400
        } else if (shootApp.weapon[0] === "laser") {
            ammo = bonus1
            fireRate = this.game.time.now + 50;
            bulletSpeed = -600
        } else if (shootApp.weapon[0] === "sineBullet") {
            ammo = bonus2
            fireRate = this.game.time.now + 50;
            bulletSpeed = -600
        } else if (shootApp.weapon[0] === "spreadShot") {
            ammo = bonus3
            fireRate = this.game.time.now + 50;
            bulletSpeed = -600

        }
        if (this.game.time.now > bulletTime) {

            bullet = ammo.getFirstExists(false)
            if (shootApp.weapon.length === 0) {
                bullet.reset(player.x, player.y);
                bullet.body.velocity.y = bulletSpeed;
                bulletTime = fireRate
            }
            if (ammo == bonus1) {
                bullet.reset(player.x, player.y);
                bullet.body.velocity.y = bulletSpeed;
                bulletTime = fireRate

            } else if (ammo == bonus2) {
                bullet.reset(player.x, player.y);
                bullet.body.velocity.y = -300;
                bulletTime = fireRate
                    bullet.body.x = player.x + Math.sin(this.game.time.now / 100) * 100;


            } else if (ammo == bonus3) {
                bullet.reset(player.x, player.y);
                bullet.body.velocity.y = bulletSpeed;
                bulletTime = fireRate

            }


        }
    }

}
