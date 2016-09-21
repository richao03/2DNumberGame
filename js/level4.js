console.log("level4")
var level4 = function(game) {

};

var sine = false;
var sineCurveBonus = 30
var sineCurve
var frequency = 70;
var spread = 60;
var ammo;
var beam1Bonus = Math.floor(Math.random() * 15 + 5)
var beam2Bonus = Math.floor(Math.random() * 15 + 5)


level4.prototype = {

        createTs: function() {
            for (var y = 0; y < 4; y++) {
                for (var x = 0; x < 10; x++) {
                    var alien = ts.create(x * 48, y * 50, 'ps');
                    alien.anchor.setTo(0.5, 0.5);
                    alien.body.moves = false;
                    alien.health = 7
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

            bonus2 = this.game.add.group();
            bonus2.enableBody = true;
            bonus2.physicsBodyType = Phaser.Physics.ARCADE;
            bonus2.createMultiple(70, 'sineCurve');
            bonus2.setAll('anchor.x', 0.5);
            bonus2.setAll('anchor.y', 1);
            bonus2.setAll('outOfBoundsKill', true);
            bonus2.setAll('checkWorldBounds', true);

            bonus1 = this.game.add.group();
            bonus1.enableBody = true;
            bonus1.physicsBodyType = Phaser.Physics.ARCADE;
            bonus1.createMultiple(30, 'beam1');
            bonus1.setAll('anchor.x', 0.5);
            bonus1.setAll('anchor.y', 1);
            bonus1.setAll('outOfBoundsKill', true);
            bonus1.setAll('checkWorldBounds', true);

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
                this.game.state.start('level3');
            }

            player.body.velocity.x = 0;
            // if (cursors.up.isDown)
            // {
            //     player.body.velocity.y=-300
            // }
            // else if (cursors.down.isDown)
            // {
            //     player.body.velocity.y= 300;
            // }

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

            var nextIsBonus2 = false;
            var nextIsBonus1 = false;

            if (ts.countLiving() === beam1Bonus) {
                  bullet.kill()
                explosion.reset(alien.body.x + alien.body.halfWidth, alien.body.y + alien.body.halfHeight);
                explosion.body.velocity.x = alien.body.velocity.x;
                explosion.lifespan = 150;
                alien.health--
                    if (alien.health === 0) {
                        this.dropBonus1(alien)
                        alien.kill();
                    }

            }
            if (ts.countLiving() === sineCurveBonus) {

                bullet.kill();
                this.dropbonus2(alien);
                explosion.reset(alien.body.x + alien.body.halfWidth, alien.body.y + alien.body.halfHeight);
                explosion.body.velocity.x = alien.body.velocity.x;
                explosion.lifespan = 150;
                alien.health--
                    if (alien.health === 0) {
                        alien.kill();
                    }


            } else {
                  bullet.kill()
                this.tsFire(alien);
                explosion.reset(alien.body.x + alien.body.halfWidth, alien.body.y + alien.body.halfHeight);
                explosion.body.velocity.x = alien.body.velocity.x;
                explosion.lifespan = 150;
                alien.health--
                    if (alien.health === 0) {
                        alien.kill();
                    }
            }




        },


        // bonuses

        dropbonus2: function(answer) {
            sineBullet = bonus2.getFirstExists(false);
            sineBullet.reset(answer.body.x, answer.body.y);
            this.game.physics.arcade.moveToXY(sineBullet, answer.body.x, 700, 320);

        },

        dropBonus1: function(answer) {
            laser = bonus1.getFirstExists(false);
            laser.reset(answer.body.x, answer.body.y);
            this.game.physics.arcade.moveToXY(laser, answer.body.x, 700, 320);

        },



        catchBonus1: function(player, beam1) {
            beam1.kill();
            shootApp.weapon = []
            shootApp.weapon.push("laser")


        },


        catchbonus2: function(player, sineCurve) {
            sineCurve.kill();
            shootApp.weapon = []
            shootApp.weapon.push("sineCurve")

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
            } else if (shootApp.weapon[0]==="laser") {
                ammo = bonus1
                fireRate = this.game.time.now + 50;
                bulletSpeed = -600
            } else if (shootApp.weapon[0] === "sineCurve") {
                ammo = bonus2
                fireRate = this.game.time.now + 50;
                bulletSpeed = -600
            }
            if (this.game.time.now > bulletTime) {

                bullet = ammo.getFirstExists(false)
                if (ammo !== bonus2) {
                    bullet.reset(player.x, player.y);
                    bullet.body.velocity.y = bulletSpeed;
                    bulletTime = fireRate
                } else if (ammo == bonus2) {
                    bullet.reset(player.x, player.y);
                    bullet.body.velocity.y = -300;
                    bulletTime = fireRate
                    bullet.update = function() {
                        bullet.body.x = player.x + Math.sin(this.game.time.now / 100) * 100;
                    }

                }
            }
        }

    }
    //weapon
