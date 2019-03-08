

/* Game namespace */
var game = {

    // an object where to store game information
    data : {
        // score
        initHealth: 3,
        score : 0,
        playerone: 0
    },


    // Run on page load.
    "onload" : function () {
        // Initialize the video.
        if (!me.video.init(960, 640, {wrapper : "screen",})) {
            alert("Your browser does not support HTML5 canvas.");
            return;
        }
        const div = document.createElement("div");
        div.className = "glitch"
        const screen = document.querySelector("#screen");
        const disclaimer = document.createElement("h1")
        disclaimer.innerText = "DISCLAIMER: THIS GAME IS A MEME!"
        disclaimer.style.textAlign = "center";
        screen.append(disclaimer);
        const leaderboard = document.createElement('p');
        leaderboard.innerText = "Leaderboard"
        getData().then(res => res.sort(function(a, b){return b.bounces - a.bounces}).forEach(info => {
            div.innerHTML += `${info.playerone} & ${info.playertwo} ${info.bounces} <button data-id="${info.id}">Delete</button></br>`
        }))
        screen.addEventListener("click", function(e){
            e.preventDefault();
            if(e.target.tagName === "BUTTON"){
                deleteData(e.target.dataset.id)
            }
        })

        screen.append(leaderboard, div);
        // Initialize the audio.
        me.audio.init("mp3,ogg");

        // set and load all resources.
        // (this will also automatically switch to the loading screen)
        me.loader.preload(game.resources, this.loaded.bind(this));
    },

    // Run on game resources loaded.
    "loaded" : function () {
  me.state.set(me.state.MENU, new game.TitleScreen());
       // set the "Play/Ingame" Screen Object
  me.state.set(me.state.PLAY, new game.PlayScreen());
  me.state.transition("fade", "#FFFFFF", 250);
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
  // me.state.change(me.state.MENU);
    me.state.change(me.state.MENU);
    }
};

function getData(){
    return fetch('http://localhost:3000/game_sessions')
    .then(res => res.json())
}

function deleteData(id){
    return fetch(`http://localhost:3000/game_sessions/${id}`, {
        method: 'DELETE',
        headers:{'Content-Type': 'application/json'}
    })
    .then(res => {
        const score = document.querySelector(`button[data-id='${id}']`);
        score.parentElement.remove();
    })

}
