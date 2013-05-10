goog.provide('rb.Level1');

goog.require('rb.Game');
goog.require('rb.Board');

/**
 * Level1 scene.
 * @constructor
 * @extends lime.Scene
 */
rb.Level1 = function() {
    // Call everything in this scope
    rb.Game.call(this);

   //  this.board.selectRandom();
   //  this.board.addEventListeners();
};

goog.inherits(rb.Level1, rb.Game);