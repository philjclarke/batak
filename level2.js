goog.provide('rb.Level2');
goog.require('rb.Game');
goog.require('rb.Board');

/**
 * Level2 scene.
 * @constructor
 * @extends lime.Scene
 */
rb.Level2 = function(eventTarget) {
    // Call everything in this scope
    rb.Game.call(this, rb.LEVEL2, eventTarget);

    this.currentTime = rb.LEVEL2.TIME;

    this.listenKeys = [];

    var instructionsBackground = new lime.Sprite().setFill('#3a3b3c').setAnchorPoint(0.5, 0).setPosition(rb.WIDTH / 2, 175).setSize(370, 60);

    if(rb.Mode.DEBUG)
    instructionsBackground.setStroke(new lime.fill.Stroke(1, '#ffffff'));

    this.appendChild(instructionsBackground, 3);

    this.instructionsText = new lime.Label().setFontFamily(rb.GAME.FONT).setFontColor('#ffffff').setFontSize(36).
    setAnchorPoint(0.5, 0).setPosition(rb.WIDTH / 2, 183).setSize(370, 60);

    this.instructionsText.setText('Hit an Even number');

    if(rb.Mode.DEBUG)
    this.instructionsText.setStroke(new lime.fill.Stroke(1, '#ffffff'));

    this.appendChild(this.instructionsText);

    this.oddNumbers = this.generateNumbers(2, 1, 50);
    this.evenNumbers = this.generateNumbers(2, 0, 50);

    this.board.setRandomNumbers(this.oddNumbers, rb.LEVEL2.TILES, this.evenNumbers, 1);    
};

goog.inherits(rb.Level2, rb.Game);

rb.Level2.prototype.startGame = function()
{
    this.board.startCountDown();

    goog.events.listenOnce(this.eventTarget, 'countdown finished', function(e){

            this.start = Date.now();

            this.setResponseTime();

            this.board.startGame();
            
            this.addEventListeners();

        }, false, this);

    // Update scores
    goog.events.listenOnce(this.eventTarget, 'time up', function(e){
            
            this.updateLevelScores(rb.LEVEL2)

        }, false, this);    
}

rb.Level2.prototype.updateLevelScores = function(level)
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

rb.Level2.prototype.addEventListeners = function()
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

rb.Level2.prototype.removeEventListeners = function()
{
    lime.scheduleManager.unschedule(this.decreaseTime, this);

    lime.scheduleManager.unschedule(this.updateScore, this);

    for (var i = 0; i < this.listenKeys.length; i++)
    {    
        goog.events.unlistenByKey(this.listenKeys[i]);
    };

    this.listenKeys.length = 0;
}

rb.Level2.prototype.pressHandler = function(level, e)
{
    console.log('pressHandler', this.selected)

    if(this.selected)
    {
        level.setScore(1);
        level.setResponseTime();

        level.board.resetBoard();
        level.board.flashBoard();
        level.board.setRandomNumbers(level.oddNumbers, rb.LEVEL2.TILES, level.evenNumbers, 1);
    }   
}

rb.Level2.prototype.setLevelTime = function()
{
    this.currentTime = rb.LEVEL2.TIME;

    return this.currentTime;
}