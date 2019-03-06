
/* Game namespace */
var game = {

    // an object where to store game information
    data : {
        // score
        initHealth: 3,
        score : 0
    },


    // Run on page load.
    "onload" : function () {
        // Initialize the video.
        if (!me.video.init(960, 640, {wrapper : "screen", scale : "auto", scalemethod: "flex-width"})) {
            alert("Your browser does not support HTML5 canvas.");
            return;
        }

        // Initialize the audio.
        me.audio.init("mp3,ogg");

        // set and load all resources.
        // (this will also automatically switch to the loading screen)
        me.loader.preload(game.resources, this.loaded.bind(this));
    },

    // Run on game resources loaded.
    "loaded" : function () {

       // set the "Play/Ingame" Screen Object
  me.state.set(me.state.PLAY, new game.PlayScreen());

  // register our player entity in the object pool
  me.pool.register("mainPlayer", game.PlayerEntity);
  me.pool.register("secondPlayer", game.PlayerEntity2);
  me.pool.register("ball", game.BallEntity);

  // enable the keyboard
  me.input.bindKey(me.input.KEY.LEFT,  "left");
  me.input.bindKey(me.input.KEY.RIGHT, "right");
  // map X, Up Arrow and Space for jump
  me.input.bindKey(me.input.KEY.X,      "jump", true);
  me.input.bindKey(me.input.KEY.UP,     "jump", true);
  me.input.bindKey(me.input.KEY.SPACE,  "jump", true);
  //2p
  me.input.bindKey(me.input.KEY.A, "A")
  me.input.bindKey(me.input.KEY.D, "D");
  // map X, Up Arrow and Space for jump
  me.input.bindKey(me.input.KEY.W,     "W", true);
  me.input.bindKey(me.input.KEY.DOWN, "crouch", true);
  // start the game
  me.state.change(me.state.PLAY);
    }
};
