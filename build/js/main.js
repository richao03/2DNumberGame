
function dropBonus(){
  alert("made it")
    // bonus = beam1.getFirstExists(false);

}

function enemyHitsPlayer (player,bullet) {

    bullet.kill();

    live = lives.getFirstAlive();

    if (live)
    {
        live.kill();
    }

    //  And create an explosion :)
    var explosion = explosions.getFirstExists(false);
    explosion.reset(player.body.x, player.body.y);
    explosion.play('kaboom', 30, false, true);

    // When the player dies
    if (lives.countLiving() < 1)
    {
        player.kill();
        enemyBullets.callAll('kill');

        stateText.text=" GAME OVER \n Click to restart";
        stateText.visible = true;

        //the "click to restart" handler
        game.input.onTap.addOnce(restart,this);
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
}

var player;
var ts;
var cursors;
var bulletTime = 0;

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

    bullets = game.add.group();
    bullets.enableBody = true;
    bullets.physicsBodyType = Phaser.Physics.ARCADE;
    bullets.createMultiple(30, 'bullet');
    bullets.setAll('anchor.x', 0.24);
    bullets.setAll('anchor.y', 0.7);
    bullets.setAll('outOfBoundsKill', true);
    bullets.setAll('checkWorldBounds', true);

    beam1 = game.add.group();
    beam1.enableBody = true;
    beam1.physicsBodyType=Phaser.Physics.ARCADE;
    beam1.setAll('anchor.x', 0.5);
    beam1.setAll('anchor.y', 1);
    beam1.setAll('outOfBoundsKill', true);
    beam1.setAll('checkWorldBounds', true);



    player = game.add.sprite(game.world.centerX, 675, 'player');
    player.scale.setTo(0.3,0.3)



    game.physics.enable(player, Phaser.Physics.ARCADE);
    player.body.collideWorldBounds=true;
    cursors = game.input.keyboard.createCursorKeys();
    fireButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

}

function update() {
    player.body.velocity.x =0;
    player.body.velocity.y =0;
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



        game.physics.arcade.overlap(bullets, ts, collisionHandler, null, this);


}


function render() {

    game.debug.cameraInfo(game.camera, 32, 32);
    game.debug.spriteCoords(player, 32, 500);

}


function fireBullet(){
    if (game.time.now > bulletTime){
    bullet = bullets.getFirstExists(false)
    if(bullet){
        bullet.reset(player.x, player.y);
        bullet.body.velocity.y = -400;
        bulletTime = game.time.now + 350;
    }
    }
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

    var nextIsBonus = false
    //  When a bullet hits an alien we kill them both

    bullet.kill();
    if(nextIsBonus === true){
        dropBonus();
    // bonus.reset(alien.body.x, alien.body.y);
    // game.physics.arcade.moveToXY(bonus,0, alien.body.y,120);
    //     alien.kill();
    } else {
        alien.kill();
    }
    if ( ts.countLiving() === Math.floor( Math.random()*15+5 ) ){
        nextIsBonus = true
    }

   if (ts.countLiving() == 0){
    alert("game over")
   }

}