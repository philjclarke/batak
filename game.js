goog.provide('rb.Game');

goog.require('rb.Board');

goog.require('rb.Progress');

/**
 * Game scene for Roundball game.
 * @constructor
 * @extends lime.Scene
 */
rb.Game = function(size) {
    lime.Scene.call(this);

    this.points = 0;
    this.responseTime = [0];

    //empty layer for contents
    var layer = new lime.Layer();
    this.appendChild(layer);

    /* Need to update logo TEMP
    var smallLogo = new lime.Sprite().setFill('assets/ingame-logo-x40y32-HexBG-272528.gif').setAnchorPoint(0, 0).setPosition(35, 35);
    layer.appendChild(smallLogo, 1);
    */

    // TEMP
    /*
    var background = new lime.Sprite().setSize(rb.WIDTH,rb.HEIGHT).
        setFill('#cccccc').setAnchorPoint(0,0);
    layer.appendChild(background);
    */
    
    //make board
    this.board = new rb.Board(this).setPosition(25, 174);
    
    if(rb.isBrokenChrome()) this.board.setRenderer(lime.Renderer.CANVAS);

    this.start = Date.now();


    var timeBackground = new lime.Sprite().setFill('#333333').setAnchorPoint(0, 0).setSize(80, 50).setPosition(610, 10);

    if(rb.Mode.DEBUG)
    timeBackground.setStroke(new lime.fill.Stroke(1, '#ffffff'));

    layer.appendChild(timeBackground, 3);

    // Score
    this.timeText = new lime.Label().setText('00').setFontFamily(rb.GAME.FONT_NUMBERS).setFontColor('#ffffff').setFontSize(48).
        setAlign('center').setAnchorPoint(0, 0).setSize(80, 50).setPosition(610, 9);
    
    if(rb.Mode.DEBUG)
    this.timeText.setStroke(new lime.fill.Stroke(1, '#ffffff'));

    layer.appendChild(this.timeText, 4);

    // Highest score heading
    var timeHeading = new lime.Label().setText('time').setFontFamily(rb.GAME.FONT).setFontColor('#ffffff').setFontSize(36).
        setAlign('right').setAnchorPoint(1, 0).setSize(250, 50).setPosition(595, 15);

    if(rb.Mode.DEBUG)
    timeHeading.setStroke(new lime.fill.Stroke(1, '#ffffff'));
           
    layer.appendChild(timeHeading, 4);






    var scoreBackground = new lime.Sprite().setFill('#333333').setAnchorPoint(0, 0).setSize(100, 50).setPosition(410, 10);

    if(rb.Mode.DEBUG)
    scoreBackground.setStroke(new lime.fill.Stroke(1, '#ffffff'));

    layer.appendChild(scoreBackground, 3);

    // Score
    this.scoreText = new lime.Label().setText('000').setFontFamily(rb.GAME.FONT_NUMBERS).setFontColor('#ffffff').setFontSize(48).
        setAlign('center').setAnchorPoint(0, 0).setSize(100, 50).setPosition(410, 9);
    
    if(rb.Mode.DEBUG)
    this.scoreText.setStroke(new lime.fill.Stroke(1, '#ffffff'));

    layer.appendChild(this.scoreText, 4);

    // Highest score heading
    var scoreHeading = new lime.Label().setText('score').setFontFamily(rb.GAME.FONT).setFontColor('#ffffff').setFontSize(36).
        setAlign('right').setAnchorPoint(1, 0).setSize(250, 50).setPosition(395, 15);

    if(rb.Mode.DEBUG)
    scoreHeading.setStroke(new lime.fill.Stroke(1, '#ffffff'));
           
    layer.appendChild(scoreHeading, 4);



    layer.appendChild(this.board);

    this.eventTarget = new goog.events.EventTarget();    
};

goog.inherits(rb.Game, lime.Scene);


/**
 * 
 */
rb.Game.prototype.startGame = function() {

    lime.scheduleManager.scheduleWithDelay(this.decreaseTime, this, 1000);

    lime.scheduleManager.scheduleWithDelay(this.updateResponseTime, this, 100);

    lime.scheduleManager.scheduleWithDelay(this.updateScore, this, 100);
}

/**
 * Finds all factors of a given number
 */
rb.Game.prototype.findFactors = function(value) {
    var increment = 1;

    if (value % 2 != 0)
    {
        // Only test the odd ones
        increment = 2; 
    }

    var numbersArray = new Array();

    for (var i = 0; i <= (value / 2); i = i+increment) {
        
        if (value % i == 0)
        {
            console.log("a", i)
            numbersArray.push(i);
        }
    };

    numbersArray.push(value);

    return numbersArray;
 }

/**
 * Generates numbers determined by modulus operation
 */
rb.Game.prototype.generateNumbers = function(div, mod, total)
{
   var numbersArray = new Array();

    for (var i = 1; i < total; i++)
    {
        if(i % div == mod || isNaN(i % div))
        {
            numbersArray.push(i);
        }    
    };

    return numbersArray;
}

/**
 * Increase value of score label when points have changed
 */
rb.Game.prototype.updateScore = function() {

    var curscore = parseInt(this.scoreText.getText(), 10);

    if (this.points > parseInt(this.scoreText.getText(), 10))
    {
        this.scoreText.setText(this.points);
    }
};

/**
 * Update points
 * @param {number} p Points to add to current score.
 */
rb.Game.prototype.setScore = function(p) {

    this.points += p;
};

/**
 * Update response time
 */
rb.Game.prototype.setResponseTime = function() {
    var dateNow = Date.now();
    this.responseTime.push(dateNow - this.start);
    this.start = dateNow;
};

/**
 * Find average response time and update label
 */
rb.Game.prototype.updateResponseTime = function() {

    var total = 0;
    var length = this.responseTime.length;

    for (var i = 0; i < length; i++) {
        total += this.responseTime[i];
    };

    // this.responseTimeText.setText((total / length) / 1000);
};

/**
 * Subtract one second from left time in timed mode
 */
rb.Game.prototype.decreaseTime = function() {
    this.currentTime--;

    console.log()
    
    this.timeText.setText(this.currentTime);

    if (this.currentTime < 1) {
        this.endGame();
    }
};

rb.Game.prototype.removeEventListeners = function()
{
    lime.scheduleManager.unschedule(this.decreaseTime, this);

    lime.scheduleManager.unschedule(this.updateResponseTime, this);

    lime.scheduleManager.unschedule(this.updateScore, this);

    for (var i = 0; i < this.board.nodeTargets.length; i++)
    {    
        goog.events.unlisten(this.board.nodeTargets[i],['mousedown','touchstart'], goog.partial(this.pressHandler, this));
    };
}

/**
 * Show game-over dialog
 */
rb.Game.prototype.endGame = function() {

    this.removeEventListeners();

    this.board.endGame();

    this.board.getCountDown().showTimeUp(); 

    goog.events.listenOnce(this.board.getCountDown().getEventTarget(), 'time up', function(e){
            
            this.eventTarget.dispatchEvent('end');

        }, false, this);
};

/**
 * Returns event target. Dispatches events
 */
rb.Game.prototype.getEventTarget = function() {
    return this.eventTarget;
};