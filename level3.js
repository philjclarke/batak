goog.provide('rb.Level3');
goog.require('rb.Game');
goog.require('rb.Board');

/**
 * Level3 scene.
 * @constructor
 * @extends lime.Scene
 */
rb.Level3 = function(eventTarget) {
    // Call everything in this scope
    rb.Game.call(this, rb.LEVEL3, eventTarget);

    this.currentTime = rb.LEVEL3.TIME;

    this.listenKeys = [];

    this.instructionsBackground = new lime.Sprite().setFill('#3a3b3c').setAnchorPoint(0.5, 0).setPosition(rb.WIDTH / 2, 175).setSize(370, 60);

    if(rb.Mode.DEBUG)
    this.instructionsBackground.setStroke(new lime.fill.Stroke(1, '#ffffff'));
    
    this.instructionsBackground.setHidden(true);
    this.appendChild(this.instructionsBackground, 3);

    this.instructionsText = new lime.Label().setText('').setFontFamily(rb.GAME.FONT_NUMBERS).setFontColor('#ffffff').setFontSize(60).
    setAnchorPoint(0.5, 0).setPosition(rb.WIDTH / 2, 175).setSize(370, 60);

    if(rb.Mode.DEBUG)
    this.instructionsText.setStroke(new lime.fill.Stroke(1, '#ffffff'));
    
    this.instructionsText.setHidden(true);
    this.appendChild(this.instructionsText);

    this.numbers = this.generateNumbers(0, 0, 50);
};

goog.inherits(rb.Level3, rb.Game);

rb.Level3.prototype.startGame = function()
{
    this.board.startCountDown();

    goog.events.listenOnce(this.eventTarget, 'countdown finished', function(e){

            this.generateQuestion();

            this.start = Date.now();

            this.board.startGame();
            
            this.addEventListeners();

            this.instructionsText.setHidden(false);
            this.instructionsBackground.setHidden(false);

        }, false, this);

    // Update scores
    goog.events.listenOnce(this.eventTarget, 'time up', function(e){
            
            this.updateLevelScores(rb.LEVEL3)

        }, false, this);    
}

rb.Level3.prototype.updateLevelScores = function(level)
{
    level.score = this.points;
    level.art = this.calculateAverageResponseTime();

    if(parseInt(this.points) > parseInt(level.bestScore))
    level.bestScore = this.points;

    if(level.bestART == null)
    level.bestART = level.art;
    else if(parseFloat(level.art) < parseFloat(level.bestART))
    level.bestART = level.art;
}

rb.Level3.prototype.addEventListeners = function()
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

rb.Level3.prototype.removeEventListeners = function()
{
    lime.scheduleManager.unschedule(this.decreaseTime, this);

    lime.scheduleManager.unschedule(this.updateScore, this);

    for (var i = 0; i < this.listenKeys.length; i++)
    {    
        goog.events.unlistenByKey(this.listenKeys[i]);
    };

    this.listenKeys.length = 0;
}

rb.Level3.prototype.pressHandler = function(level, e)
{
    if(this.selected)
    {
        level.setScore(1);
        level.setResponseTime();

        level.board.resetBoard();
        level.board.flashBoard();
        level.generateQuestion();
    }   
}

rb.Level3.prototype.setLevelTime = function()
{
    this.currentTime = rb.LEVEL3.TIME;

    return this.currentTime;
}

rb.Level3.prototype.generateQuestion = function()
{
    var randomNumber = Math.floor(Math.random() * rb.LEVEL3.OPERATORS.length);
    var operator = rb.LEVEL3.OPERATORS[randomNumber];

    this.board.setRandomNumbers(this.numbers, rb.LEVEL3.TILES);

    this.tile = this.board.selectRandomNode(false);

    console.log('this.tile', this.tile);

    var tileNum = parseInt(this.tile.getText());
    var b = null;

    console.log(this.tile.getText());

    var question = null;
    var factorsArray = null;

    if(operator == "x")
    {
        factorsArray = this.findFactors(tileNum);

        // Make the game a little bit harder by removing multiplication by 1
        if(factorsArray.length > 1)
        factorsArray.shift();
            
        console.log('factorsArray', factorsArray);

        randomNumber = Math.floor(Math.random() * factorsArray.length);

        console.log("/", factorsArray[randomNumber]);

        b = this.tile.getText() / factorsArray[randomNumber];

        question = factorsArray[randomNumber] + " x " + b + " = ?";

        console.log("x", question, "answer", tileNum);
    }  
    else if(operator == "+")
    {
        randomNumber = Math.floor(Math.random() * tileNum) + 1;
        b = tileNum - randomNumber;

        question = b + " + " + randomNumber + " = ?";

        console.log("+", question, "answer", tileNum);
    }
    else if(operator == "-")
    {
        randomNumber = Math.floor(Math.random() * (1 + rb.LEVEL3.MAX_SUBTRACTION - tileNum)) + tileNum;

        b = tileNum + randomNumber;

        question = b + " - " + randomNumber + " = ?";

        console.log("-", question, "answer", tileNum);
    }

    this.instructionsText.setText(question);
}