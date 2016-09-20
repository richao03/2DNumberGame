
function dropBonus1(answer){
    laser = bonus1.getFirstExists(false);
    laser.reset(answer.body.x, answer.body.y);
    game.physics.arcade.moveToXY(laser,answer.body.x, 700 ,320);

}



function catchBonus1 (player,beam1) {
    beam1.kill();
    lazer1=true


}



function enemyFires () {

    //  Grab the first bullet we can from the pool
    enemyBullet = tsBullet.getFirstExists(false);

    livingEnemies.length=0;

    ts.forEachAlive(function(alien){

        // put every living enemy in an array
        livingEnemies.push(alien);
    });


    if (enemyBullet && livingEnemies.length > 0)
    {

        var random=game.rnd.integerInRange(0,livingEnemies.length-1);

        // randomly select one of them
        var shooter=livingEnemies[random];
        // And fire the bullet from this enemy
        enemyBullet.reset(shooter.body.x, shooter.body.y);

        game.physics.arcade.moveToObject(enemyBullet,player,320);
        firingTimer = game.time.now + 2000;
    }

}

function gotHit(){
console.log('got hit!')
}


function tsFire(answer){
    console.log("fire")
    var Tbullet = tsBullet.getFirstExists(false);
      if (ts.countLiving()%3=== 0){
        Tbullet.reset(answer.body.x, answer.body.y);
    game.physics.arcade.moveToObject(Tbullet, player, 320);
   }



}

function fireBullet(){
  if(lazer1 === false){
    ammo = bullets
    fireRate = game.time.now + 350;
    bulletSpeed = -400
  } else if (lazer1===true){
    ammo = bonus1
    fireRate = game.time.now + 50;
    bulletSpeed = -600
  }
    if (game.time.now > bulletTime){
    bullet = ammo.getFirstExists(false)
    if(bullet){
        bullet.reset(player.x, player.y);
        bullet.body.velocity.y = bulletSpeed;
        bulletTime = fireRate
    }
    }

}

console.log("working")

var game = new Phaser.Game(1200, 730, Phaser.AUTO, 'phaser-example', { preload: preload, create: create, update: update, render: render });

function preload() {

    game.load.image('background','/assets/gridsBackground.png');
    game.load.image('player','/assets/w.png');
    game.load.image('ts','/assets/t.png');
    game.load.image('bullet','/assets/bullet.png')
    game.load.image('beam1','/assets/1.png')
    game.load.image('explosion','assets/explosion.png')
    game.load.image('enemyBullet', 'assets/enemyBullet.png')
}

var firingTimer = 0;
var livingEnemies = []
var player;
var ts;
var cursors;
var bulletTime = 0;
var beam1;
var beam1Bonus = 30 //Math.floor( Math.random()*15+5 )
var lazer1 = false
var ammo
var fireRate;
var bulletSpeed;
var accelerate = 350;
var drag = 1000;
var maxSpeed = 400;
var bank;
var explosions;
var tsBullet;

function create() {
    game.physics.startSystem(Phaser.Physics.ARCADE);

    var bg = game.add.tileSprite(0, 0, 1920, 1920, 'background');
    bg.scale.y = 1.6
    bg.scale.x = 1.4

    game.world.setBounds(0, 0, 1200, 700);

    ts = game.add.group();
    ts.enableBody=true;
    ts.physicsBodyType = Phaser.Physics.ARCADE;
    createTs();

   //  Blue enemy's bullets
    tsBullet = game.add.group();
    tsBullet.enableBody = true;
    tsBullet.physicsBodyType = Phaser.Physics.ARCADE;
    tsBullet.createMultiple(30, 'enemyBullet');
    tsBullet.setAll('anchor.x', 0.5);
    tsBullet.setAll('anchor.y', 0.5);
    tsBullet.setAll('outOfBoundsKill', true);
    tsBullet.setAll('checkWorldBounds', true);


    bullets = game.add.group();
    bullets.enableBody = true;
    bullets.physicsBodyType = Phaser.Physics.ARCADE;
    bullets.createMultiple(30, 'bullet');
    bullets.setAll('anchor.x', 0.24);
    bullets.setAll('anchor.y', 0.7);
    bullets.setAll('outOfBoundsKill', true);
    bullets.setAll('checkWorldBounds', true);

    bonus1 = game.add.group();
    bonus1.enableBody = true;
    bonus1.physicsBodyType = Phaser.Physics.ARCADE;
    bonus1.createMultiple(30, 'beam1');
    bonus1.setAll('anchor.x', 0.5);
    bonus1.setAll('anchor.y', 1);
    bonus1.setAll('outOfBoundsKill', true);
    bonus1.setAll('checkWorldBounds', true);

    //  An explosion pool
    explosions = game.add.group();
    explosions.enableBody = true;
    explosions.physicsBodyType = Phaser.Physics.ARCADE;
    explosions.createMultiple(30, 'explosion');
    explosions.setAll('anchor.x', 0.5);
    explosions.setAll('anchor.y', 0.5);
    explosions.forEach( function(explosion) {
        explosion.animations.add('explosion');
    });






    player = game.add.sprite(game.world.centerX, 675, 'player');
    player.scale.setTo(0.3,0.3)
    game.physics.enable(player, Phaser.Physics.ARCADE);
    player.body.collideWorldBounds=true;



    cursors = game.input.keyboard.createCursorKeys();
    fireButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

}

function update() {

    player.body.velocity.x = 0;
    // if (cursors.up.isDown)
    // {
    //     player.body.velocity.y=-300
    // }
    // else if (cursors.down.isDown)
    // {
    //     player.body.velocity.y= 300;
    // }

    if (cursors.left.isDown)
    {
        player.body.velocity.x = -300;
    }
    else if (cursors.right.isDown)
    {
        player.body.velocity.x = 300;
    }

    if ( fireButton.isDown )
    {
        fireBullet();
    }

      if (game.time.now > firingTimer)
        {
            enemyFires();
        }

bank = player.body.velocity.x / maxSpeed;
player.angle = bank * 10;


game.physics.arcade.overlap(ammo, ts, collisionHandler, null, this);
game.physics.arcade.overlap(bonus1, player, catchBonus1, null, this);
game.physics.arcade.overlap(tsBullet, player, gotHit, null, this);

}


function render() {

    game.debug.cameraInfo(game.camera, 32, 32);
    game.debug.spriteCoords(player, 32, 500);

}





function createTs(){
    for (var y = 0; y < 4; y++)
    {
        for (var x = 0; x < 10; x++)
        {
            var alien = ts.create(x * 48, y * 50, 'ts');
            alien.anchor.setTo(0.5, 0.5);
            alien.body.moves = false;
        }
    }
    ts.x = 100;
    ts.y = 50;

    //  All this does is basically start the invaders moving. Notice we're moving the Group they belong to, rather than the invaders directly.
    var tween = game.add.tween(ts).to( { x: 750 }, 5000, Phaser.Easing.Linear.None, true, 0, 1000, true);

    //  When the tween loops it calls descend
     tween.onLoop.add(descend, this);
}


function descend(){
    ts.y+=30
}



function collisionHandler (bullet, alien) {


var explosion = explosions.getFirstExists(false);

    var nextIsBonus = false;

       if ( ts.countLiving() === beam1Bonus){
        nextIsBonus = true
    }

    bullet.kill();

    if(nextIsBonus === true){

    dropBonus1(alien);
    explosion.reset(alien.body.x + alien.body.halfWidth, alien.body.y + alien.body.halfHeight);
    explosion.body.velocity.x = alien.body.velocity.x;
    explosion.lifespan = 150;
        alien.kill();
        nextIsBonus=false

    } else {
    tsFire(alien);
    explosion.reset(alien.body.x + alien.body.halfWidth, alien.body.y + alien.body.halfHeight);
    explosion.body.velocity.x = alien.body.velocity.x;
    explosion.lifespan = 150;
    console.log(alien)
        alien.kill();
    }


   if (ts.countLiving() == 0){
    alert("game over")
   }

}
