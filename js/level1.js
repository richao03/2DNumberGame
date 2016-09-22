console.log("level1")
var level1 = function(game){

};


var spreadShotBonus
var spreadShot
var sineCurveBonus
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

level1.prototype = {
        createTs: shootApp.methods.createTs,
        create: shootApp.methods.create,
        update: shootApp.methods.update,
        render:shootApp.methods.render,
        descend: shootApp.methods.descend,
        collisionHandler: shootApp.methods.collisionHandler,
        dropbonus1: shootApp.methods.dropbonus1,
        catchbonus1: shootApp.methods.catchbonus1,
        enemyFires: shootApp.methods.enemyFires,
        gotHit:shootApp.methods.gotHit,
        tsFire: shootApp.methods.tsFire,
        fireBullet:shootApp.methods.fireBullet


    }
