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
