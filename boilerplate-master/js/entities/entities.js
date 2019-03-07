
/**
 * a player entity
 */
game.PlayerEntity = me.Entity.extend({
    /**
     * constructor
     */
    init : function (x, y, settings) {
      // call the constructor
      this._super(me.Entity, 'init', [x, y, settings]);

      // max walking & jumping speed
      this.body.setMaxVelocity(3, 15);
      this.body.setFriction(0.4, 0);

      // set the display to follow our position on both axis
      me.game.viewport.follow(this.pos, me.game.viewport.AXIS.BOTH, 0.4);

      // ensure the player is updated even when outside of the viewport
      this.alwaysUpdate = true;

      // define a basic walking animation (using all frames)
      this.renderable.addAnimation("walk",  [1, 2, 3, 4]);

      // define a standing animation (using the first frame)
      this.renderable.addAnimation("stand",  [0]);
      this.renderable.addAnimation("crouch", [5]);

      // set the standing animation as default
      this.renderable.setCurrentAnimation("stand");
    },

    /**
     * update the entity
     */
    update : function (dt) {

        if (me.input.isKeyPressed('A')) {

            // flip the sprite on horizontal axis
            this.renderable.flipX(true);
            // update the default force
            this.body.force.x = -this.body.maxVel.x;
            // change to the walking animation
            if (!this.renderable.isCurrentAnimation("walk")) {
                this.renderable.setCurrentAnimation("walk");
            }
        } else if (me.input.isKeyPressed('D')) {

            // unflip the sprite
            this.renderable.flipX(false);
            // update the entity velocity
            this.body.force.x = this.body.maxVel.x;
            // change to the walking animation
            if (!this.renderable.isCurrentAnimation("walk")) {
                this.renderable.setCurrentAnimation("walk");
            }
        }
        else {
            this.body.force.x = 0;
            // change to the standing animation
            this.renderable.setCurrentAnimation("stand");
        }

        if (me.input.isKeyPressed('W')) {

            if (!this.body.jumping && !this.body.falling)
            {
                // set current vel to the maximum defined value
                // gravity will then do the rest
                this.body.force.y = -this.body.maxVel.y
            }
        } else {
            this.body.force.y = 0;
        }

        // apply physics to the body (this moves the entity)
        this.body.update(dt);

        // handle collisions against other shapes
        me.collision.check(this);

        // return true if we moved or if the renderable was updated
        return (this._super(me.Entity, 'update', [dt]) || this.body.vel.x !== 0 || this.body.vel.y !== 0);
    },

    /**
     * colision handler
     * (called when colliding with other objects)
     */
    onCollision : function (response, other) {
      // Make all other objects solid
      if (response.b.body.collisionType !== me.collision.types.WORLD_SHAPE) {
        // res.y >0 means touched by something on the bottom
        // which mean at top position for this one
        return false;
    }
      return true;
    }
  });

  /**
 * a player entity
 */
game.PlayerEntity2 = me.Entity.extend({
    /**
     * constructor
     */
    init : function (x, y, settings) {
      // call the constructor
      this._super(me.Entity, 'init', [x, y, settings]);

      // max walking & jumping speed
      this.body.setMaxVelocity(3, 15);
      this.body.setFriction(0.4, 0);

      // set the display to follow our position on both axis
      me.game.viewport.follow(this.pos, me.game.viewport.AXIS.BOTH, 0.4);

      // ensure the player is updated even when outside of the viewport
      this.alwaysUpdate = true;

      // define a basic walking animation (using all frames)
      this.renderable.addAnimation("walk",  [0, 1, 2, 3, 4, 5, 6, 7]);

      // define a standing animation (using the first frame)
      this.renderable.addAnimation("stand",  [0]);

      // set the standing animation as default
      this.renderable.setCurrentAnimation("stand");
    },

    /**
     * update the entity
     */
    update : function (dt) {

        if (me.input.isKeyPressed('left')) {

            // flip the sprite on horizontal axis
            this.renderable.flipX(true);
            // update the default force
            this.body.force.x = -this.body.maxVel.x;
            // change to the walking animation
            if (!this.renderable.isCurrentAnimation("walk")) {
                this.renderable.setCurrentAnimation("walk");
            }
        } else if (me.input.isKeyPressed('right')) {

            // unflip the sprite
            this.renderable.flipX(false);
            // update the entity velocity
            this.body.force.x = this.body.maxVel.x;
            // change to the walking animation
            if (!this.renderable.isCurrentAnimation("walk")) {
                this.renderable.setCurrentAnimation("walk");
            }
        } else {
            this.body.force.x = 0;
            // change to the standing animation
            this.renderable.setCurrentAnimation("stand");
        }

        if (me.input.isKeyPressed('jump')) {

            if (!this.body.jumping && !this.body.falling)
            {
                // set current vel to the maximum defined value
                // gravity will then do the rest
                this.body.force.y = -this.body.maxVel.y
            }
        } else {
            this.body.force.y = 0;
        }

        // apply physics to the body (this moves the entity)
        this.body.update(dt);

        // handle collisions against other shapes
        me.collision.check(this);

        // return true if we moved or if the renderable was updated
        return (this._super(me.Entity, 'update', [dt]) || this.body.vel.x !== 0 || this.body.vel.y !== 0);
    },

    /**
     * colision handler
     * (called when colliding with other objects)
     */
    onCollision : function (response, other) {
      // Make all other objects solid
      if (response.b.body.collisionType !== me.collision.types.WORLD_SHAPE) {
        // res.y >0 means touched by something on the bottom
        // which mean at top position for this one

        return false;
    }
      return true;
    }
  });


  game.BallEntity = me.Entity.extend({
  // extending the init function is not mandatory
  // unless you need to add some extra initialization
  init : function (x, y, settings) {
    // call the constructor
    this._super(me.Entity, 'init', [x, y, settings]);

    // max walking & jumping speed
    this.body.setMaxVelocity(100, 100);
    this.body.setFriction(0.0, 0);
    this.body.gravity = 0;

    // set the display to follow our position on both axis
    me.game.viewport.follow(this.pos, me.game.viewport.AXIS.BOTH, 0.4);

    // ensure the player is updated even when outside of the viewport
    this.alwaysUpdate = true;

    // define a basic walking animation (using all frames)
    // this.renderable.addAnimation("walk",  [0, 1, 2, 3, 4, 5, 6, 7]);
    //
    // // define a standing animation (using the first frame)
    // this.renderable.addAnimation("stand",  [0]);
    //
    // // set the standing animation as default
    // this.renderable.setCurrentAnimation("stand");
  },

  /**
   * update the entity
   */
  update : function (dt) {


      this.body.force.y = 0;
      this.body.force.x = 0;

      // apply physics to the body (this moves the entity)
      this.body.update(dt);

      // handle collisions against other shapes
      me.collision.check(this);

      // return true if we moved or if the renderable was updated
      return (this._super(me.Entity, 'update', [dt]) || this.body.vel.x !== 0 || this.body.vel.y !== 0);
  },

  /**
   * colision handler
   * (called when colliding with other objects)
   */
  onCollision : function (response, other) {
    // Make all other objects solid
    this.body.bounce = 1.5;
    // other.body.friction = 0;
    if (response.b.body.collisionType !== me.collision.types.WORLD_SHAPE) {
      // res.y >0 means touched by something on the bottom
      // which mean at top position for this one
      game.data.score += 1
      if (other.name == "secondPlayer"){
          const container = document.getElementById('screen')
          const words = document.querySelector('#words')

          words.addEventListener("click", function(e){
            if (e.target.nodeName === "BUTTON" ) {
              let one = e.target.parentElement.querySelector('.one').value
              let two = e.target.parentElement.querySelector('.two').value
              let score = e.target.parentElement.querySelector('.score').value
              words.innerHTML += `<br>Match ${one} vs ${two}. Bounces: ${score}`
              postData(one,two,score)
            }
          })
          me.audio.stopTrack();
          container.remove();

            me.input.unbindKey(me.input.KEY.A, "A")
            me.input.unbindKey(me.input.KEY.D, "D");
            // map X, Up Arrow and Space for jump
            me.input.unbindKey(me.input.KEY.W,     "W", true);
          
          // console.log(other.name)
          alert(`${other.name} has finished with ${game.data.score-1} bounces`)
          words.innerHTML += `${other.name} has lasted with ${game.data.score-1} bounces<br>
          <label>Ronald Mcdonald User Name:</label><input class="one" type="text"></input>
          <label>Blue Blob User Name:</label><input class="two" type="text"></input>
          <input type="hidden" class="score" value=${game.data.score-1}></input>
          <button>submit</button>`



        }
      return true;
  }
    return true;
  }
  });

  function postData(one, two, score){
    fetch('http://localhost:3000/game_sessions', {
              method:'post',
              headers:{'Content-Type': 'application/json', 'Accept': 'application/json'},
              body: JSON.stringify({playerone: one, playertwo: two, bounces: score})
          }).then(res => res.json()).then(console.log)
  }
