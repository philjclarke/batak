goog.provide('rb.Level1');
goog.require('rb.Game');
goog.require('rb.Board');

/**
 * Level1 scene.
 * @constructor
 * @extends lime.Scene
 */
rb.Level1 = function(eventTarget) {
    // Call everything in this scope
    rb.Game.call(this, rb.LEVEL1, eventTarget);

    this.currentTime = rb.LEVEL1.TIME;

    this.listenKeys = [];
};

goog.inherits(rb.Level1, rb.Game);

rb.Level1.prototype.startGame = function()
{
    this.board.startCountDown();

    goog.events.listenOnce(this.eventTarget, 'countdown finished', function(e){

            this.start = Date.now();

            this.setResponseTime();

            this.board.startGame();
            this.board.selectRandomNode(true);

            this.addEventListeners();

        }, false, this);

    // Update scores
    goog.events.listenOnce(this.eventTarget, 'time up', function(e){
            
            this.updateLevelScores(rb.LEVEL1)

        }, false, this);    
}

rb.Level1.prototype.updateLevelScores = function(level)
{
    level.score = this.points;
    level.art = this.calculateAverageResponseTime();

    if(parseInt(this.points) > parseInt(level.bestScore))
    level.bestScore = this.points;

    if(level.bestART == null)
    level.bestART = level.art;
    else if(parseInt(level.art) < parseInt(level.bestART))
    level.bestART = level.art;
}

rb.Level1.prototype.addEventListeners = function()
{
    lime.scheduleManager.scheduleWithDelay(this.decreaseTime, this, 1000);

    lime.scheduleManager.scheduleWithDelay(this.updateResponseTime, this, 100);

    lime.scheduleManager.scheduleWithDelay(this.updateScore, this, 100);
       
    for (var i = 0; i < this.board.nodeTargets.length; i++)
    {    
        this.listenKeys.push(goog.events.listen(this.board.nodeTargets[i],'mousedown', goog.partial(this.pressHandler, this)))
        this.listenKeys.push(goog.events.listen(this.board.nodeTargets[i],'touchstart', goog.partial(this.pressHandler, this)))
    };
}

rb.Level1.prototype.removeEventListeners = function()
{
    lime.scheduleManager.unschedule(this.decreaseTime, this);

    lime.scheduleManager.unschedule(this.updateScore, this);

    for (var i = 0; i < this.listenKeys.length; i++)
    {    
        goog.events.unlistenByKey(this.listenKeys[i]);
    };

    this.listenKeys.length = 0;
}

rb.Level1.prototype.pressHandler = function(level, e)
{
    console.log('pressHandler', this.selected)

    if(this.selected)
    {
        level.setScore(1);
        level.setResponseTime();

        level.board.resetBoard();
        level.board.selectRandomNode(true);
    }   
}

rb.Level1.prototype.setLevelTime = function()
{
    this.currentTime = rb.LEVEL1.TIME;

    return this.currentTime;
}