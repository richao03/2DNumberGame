console.log("workhorse")
var workhorse = function(game){

};

var firingTimer = 0;
var livingEnemies = []
var player;
var ts;
var cursors;
var bulletTime = 0;
var beam1;
var beam1Bonus = 30
var alienHealth = 1;
var ammo
var fireRate;
var bulletSpeed;
var accelerate = 350;
var drag = 1000;
var maxSpeed = 400;
var bank;
var explosions;
var tsBullet;


workhorse.prototype = {
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
