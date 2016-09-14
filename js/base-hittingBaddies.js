function collisionHandler (bullet, alien) {

    var nextIsBonus1 = false;
       if ( ts.countLiving() === beam1Bonus){
        nextIsBonus1 = true
    }

    bullet.kill();

    if(nextIsBonus1 === true){
        dropBonus1(alien);
        nextIsBonus1 =false
    // bonus.reset(alien.body.x, alien.body.y);
    // game.physics.arcade.moveToXY(bonus,0, alien.body.y,120);
    //     alien.kill();
    }

    if(alien.health<=0){
        alien.kill()
    } else {
        alien.health--
    }

   if (ts.countLiving() == 0){

    game.state.start('level2');
   }

}
