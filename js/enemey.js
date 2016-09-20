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
