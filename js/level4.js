console.log("level4")
var level4 = function(game) {

};

var sine = false;
var sineCurveBonus = 30
var sineCurve
var frequency = 70;
var spread = 60;
var ammo;



level4.prototype = {
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
    enemyFires: shootApp.methods.enemyFires,
    gotHit: shootApp.methods.gotHit,
    tsFire: shootApp.methods.tsFire,
    fireBullet: shootApp.methods.fireBullet
}
