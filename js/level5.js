console.log("level5")
var level5 = function(game) {
var spreadShotBonus = 32
var spreadShot
var sineCurveBonus = 35
var sineCurve
var frequency = 70;
var spread = 60;
var ammo;
var firingTimer = 0;
var livingEnemies = []
var player;
var ts;
var cursors;
var bulletTime = 0;
var beam1;
var beam1Bonus = 30
var fireRate;
var bulletSpeed;
var accelerate = 350;
var drag = 1000;
var maxSpeed = 400;
var bank;
var explosions;
var tsBullet;
};



level5.prototype = {
    createTs: shootApp.methods.createTs,
    create: shootApp.methods.create,
    update: shootApp.methods.update,
    render: shootApp.methods.render,
    descend: shootApp.methods.descend,
    collisionHandler: shootApp.methods.collisionHandler,
    dropbonus1: shootApp.methods.dropbonus1,
    catchbonus1: shootApp.methods.catchbonus1,
    dropbonus2: shootApp.methods.dropbonus2,
    catchbonus2: shootApp.methods.catchbonus2,
    dropbonus3: shootApp.methods.dropbonus3,
    catchbonus3: shootApp.methods.catchbonus3,
    enemyFires: shootApp.methods.enemyFires,
    gotHit: shootApp.methods.gotHit,
    tsFire: shootApp.methods.tsFire,
    fireBullet: shootApp.methods.fireBullet
}
