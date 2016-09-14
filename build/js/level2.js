
function preload() {


    game.load.image('vs','/assets/v.png');

}

var vs;

var baddieHealth = 3
function create() {


    vs = game.add.group();
    vs.enableBody=true;
    vs.physicsBodyType = Phaser.Physics.ARCADE;
    createTs();

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



game.physics.arcade.overlap(ammo, vs, collisionHandler, null, this);
game.physics.arcade.overlap(bonus1, player, catchBonus1, null, this);

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
            var alien = vs.create(x * 48, y * 50, 'ts');
            alien.anchor.setTo(0.5, 0.5);
            alien.body.moves = false;
            alien.health = baddieHealth
        }
    }
    vs.x = 100;
    vs.y = 50;

    //  All this does is basically start the invaders moving. Notice we're moving the Group they belong to, rather than the invaders directly.
    var tween = game.add.tween(ts).to( { x: 750 }, 5000, Phaser.Easing.Linear.None, true, 0, 1000, true);

    //  When the tween loops it calls descend
     tween.onLoop.add(descend, this);
}


function descend(){
    vs.y+=30
}

