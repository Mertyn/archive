/*
This file defines the levelmanager
*/

LevelManager = function(game, levelstate) {
  this.game = game;
  this.levels = [];
  this.current = 0;
}

LevelManager.prototype = {
  add: function(levels, autoStart) {
    // If array of levels to add
    if (levels.hasOwnProperty("length")) {
      for (var i = 0; i < levels.length; i++) {
        this.levels.push(levels[i]);
      }
    }

    // If only one level to add
    else {
      this.levels.push(levels);
    }

    if (autoStart) this.start(0);
  },

  remove: function(lvlnum) {
    delete this.levels[lvlnum];
  },

  start: function(lvlnum) {
    this.current = lvlnum;

    if (this.levels[lvlnum].cutscene) {
      game.state.add("Cutscene", this.levels[lvlnum].state);
      game.state.start("Cutscene");
    }
    else this.game.state.start("Main", true, false, this.levels[lvlnum]);
  },

  startNext: function() {
    this.game.stats.save();
    this.current++;
    this.start(this.current);
  },

  restart: function() {
    this.start(this.current);
  }
};
