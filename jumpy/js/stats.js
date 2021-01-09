/**
 * This file defines the StatTracker for tracking states
 */

StatTracker = function(game) {
  this.game = game;
  this.score = 0;
  this.deaths = 0;

  this._score = 0;
  this._deaths = 0;

  this.addScore = function (num) {
    this._score += num;
  }

  this.save = function() {
    this.score += this._score;
    this.deaths += this._deaths;

    this._score = 0;
    this._deaths = 0;
  }
}
