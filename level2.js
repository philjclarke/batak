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
    rb.Game.call(this, eventTarget);

    this.currentTime = rb.LEVEL2.TIME;

    console.log('this.currentTime', this.currentTime);

    var instructionsBackground = new lime.Sprite().setFill('#333333').setAnchorPoint(0.5, 0.5).setPosition(rb.WIDTH / 2, 200).setSize(350, 60);

    if(rb.Mode.DEBUG)
    instructionsBackground.setStroke(new lime.fill.Stroke(1, '#ffffff'));

    this.appendChild(instructionsBackground, 3);

    this.instructionsText = new lime.Label().setFontFamily(rb.GAME.FONT).setFontColor('#ffffff').setFontSize(36).
    setAnchorPoint(0.5, 0.5).setPosition(rb.WIDTH / 2, 218).setSize(350, 60);

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

            this.setResponseTime();

            this.board.startGame();

            this.addEventListeners();

        }, false, this);

    // Update scores
    goog.events.listenOnce(this.eventTarget, 'time up', function(e){
            
            this.setResponseTime();

            this.updateLevelScores(rb.Level2)

        }, false, this);    
}

rb.Level2.prototype.updateLevelScores = function(level)
{
    level.score = this.points;
    level.art = this.calculateAverageResponseTime();

    if(parseInt(this.points) > parseInt(level.bestScore))
    level.bestScore = this.points;

    if(parseInt(level.art) > parseInt(level.bestART))
    level.bestART = level.art;

    console.log("level.art", level.art);
    console.log("level.bestART", level.bestART);
}

rb.Level2.prototype.addEventListeners = function()
{
    lime.scheduleManager.scheduleWithDelay(this.decreaseTime, this, 1000);

    lime.scheduleManager.scheduleWithDelay(this.updateResponseTime, this, 100);

    lime.scheduleManager.scheduleWithDelay(this.updateScore, this, 100);
       
    for (var i = 0; i < this.board.nodeTargets.length; i++)
    {    
        goog.events.listen(this.board.nodeTargets[i],['mousedown','touchstart'], goog.partial(this.pressHandler, this));
    };
}

rb.Level2.prototype.removeEventListeners = function()
{
    lime.scheduleManager.unschedule(this.decreaseTime, this);


    lime.scheduleManager.unschedule(this.updateScore, this);

    for (var i = 0; i < this.board.nodeTargets.length; i++)
    {    
        goog.events.unlisten(this.board.nodeTargets[i],['mousedown','touchstart'], goog.partial(this.pressHandler, this));
    };
}

rb.Level2.prototype.pressHandler = function(level, e)
{
    if(this.selected)
    {
        level.setScore(1);
        level.setResponseTime();

        level.board.resetBoard();
        level.board.setRandomNumbers(level.oddNumbers, level.TARGETS, level.evenNumbers, 1);
    }   
}

rb.Level2.prototype.setLevelTime = function()
{
    this.currentTime = rb.Level2.TIME;

    return this.currentTime;
}