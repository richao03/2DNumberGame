
function dropBonus1(answer){
    laser = bonus1.getFirstExists(false);
    laser.reset(answer.body.x, answer.body.y);
    game.physics.arcade.moveToXY(laser,answer.body.x, 700 ,320);

}



function catchBonus1 (player,beam1) {
    beam1.kill();
    lazer1=true


}


