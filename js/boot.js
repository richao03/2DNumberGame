var boot = function(game){
    console.log("you're in boot")
}



boot.prototype = {

    init: function () {

        this.stage.disableVisibilityChange = true;

 },

    preload: function () {
        this.game.load.image('background','/assets/gridsBackground.png');
        this.game.load.image('player','/assets/w.png');
        this.game.load.image('ts','/assets/t.png');
        this.game.load.image('bullet','/assets/bullet.png')
        this.game.load.image('beam1','/assets/1.png')
        this.game.load.image('explosion','assets/explosion.png')
        this.game.load.image('enemyBullet', 'assets/enemyBullet.png')
        this.game.load.image('vs','/assets/v.png')
        this.game.load.image('us','/assets/u.png')

        //  Here we load the assets required for our preloader (in this case a background and a loading bar)
        this.game.load.image('loading', 'assets/gridsBackground.png');

    },

    create: function () {

        //  By this point the preloader assets have loaded to the cache, we've set the game settings
        //  So now let's start the real preloader going
        this.game.state.start('Workhorse');

    }

};
