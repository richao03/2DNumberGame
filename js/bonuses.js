
function dropBonus1(answer){
    beam1 = bonus1.getFirstExists(false);
     beam1.reset(answer.body.x, answer.body.y);
    game.physics.arcade.moveToXY(beam1,answer.body.x, 700 ,320);

}

function catchBonus1 (player,beam1) {
    beam1.kill();
    lazer1=true


}


