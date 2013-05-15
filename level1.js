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

    this.currentTime = rb.LEVEL1.TIME;
};

goog.inherits(rb.Level1, rb.Game);

rb.Level1.prototype.startGame = function()
{
    lime.scheduleManager.scheduleWithDelay(this.decreaseTime, this, 1000);

    lime.scheduleManager.scheduleWithDelay(this.updateResponseTime, this, 100);

    lime.scheduleManager.scheduleWithDelay(this.updateScore, this, 100);

    this.board.startCountDown();
    
    goog.events.listen(this.board.getCountDown().getEventTarget(), 'end', function(e){
        
            this.board.selectRandom();
            this.addEventListeners();
        }, false, this);     
}

rb.Level1.prototype.addEventListeners = function()
{
    for (var i = 0; i < this.board.nodeTargets.length; i++)
    {    
        goog.events.listen(this.board.nodeTargets[i],['mousedown','touchstart'], goog.partial(this.pressHandler, this));
    };
}

rb.Level1.prototype.removeEventListeners = function()
{
    for (var i = 0; i < this.board.nodeTargets.length; i++)
    {    
        goog.events.unlisten(this.board.nodeTargets[i],['mousedown','touchstart'], goog.partial(this.pressHandler, this));
    };
}

rb.Level1.prototype.pressHandler = function(level, e)
{
    if(this.selected)
    {
        level.setScore(1);
        level.setResponseTime();

        level.board.reset();
        level.board.selectRandom();
    }    
    else
    {
        //negative feedback
    }    
}

rb.Level1.prototype.reset = function()
{

}