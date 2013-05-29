goog.provide('rb.Game');

goog.require('rb.Board');

goog.require('rb.Progress');

/**
 * Game scene for Roundball game.
 * @constructor
 * @extends lime.Scene
 */
rb.Game = function(level, eventTarget) {
    lime.Scene.call(this);

    this.level = level

    this.currentTime = this.level.TIME;

    this.points = 0;
    this.responseTime = [];
    this.eventTarget = eventTarget;

    //empty layer for contents
    var layer = new lime.Layer();
    this.appendChild(layer);

    var padding = 20;

    function Dimensions(width, height)
    {
        this.width = width;
        this.height = height;
    }

    var scoreRect = new Dimensions(150, 75);
    var timeRect = new Dimensions(100, 75);

    var timeX = 200;
    var scoreX = 450;

    var backgroundPadding = 5;

    /* Need to update logo TEMP
    var smallLogo = new lime.Sprite().setFill('assets/ingame-logo-x40y32-HexBG-272528.gif').setAnchorPoint(0, 0).setPosition(35, 35);
    layer.appendChild(smallLogo, 1);
    */

    if(rb.Mode.BACKGROUND_DEBUG)
    {
        var background = new lime.Sprite().setSize(rb.WIDTH,rb.HEIGHT).
            setFill('#eeeeee').setAnchorPoint(0,0);
        layer.appendChild(background);
    }  

    // Header background
    var headerBackground = new lime.Sprite().setFill('assets/header.png').setAnchorPoint(0, 0).setPosition(0, 0);
    layer.appendChild(headerBackground, 1);

    //make board
    this.board = new rb.Board(this, this.level, eventTarget).setAnchorPoint(0.5, 0).setPosition(15, 150);
    
    if(rb.isBrokenChrome()) this.board.setRenderer(lime.Renderer.CANVAS);


    // Score background
    var scoreBackground = new lime.Sprite().setFill('#333333').setAnchorPoint(0, 0.5).setSize(scoreRect.width, scoreRect.height).setPosition(scoreX, rb.GAME.HEADER_HEIGHT / 2);

    if(rb.Mode.DEBUG)
    scoreBackground.setStroke(new lime.fill.Stroke(1, '#ffffff'));

    layer.appendChild(scoreBackground, 3);

    // Score
    this.scoreText = new lime.Label().setText('000').setFontFamily(rb.GAME.FONT_NUMBERS).setFontColor('#ffffff').setFontSize(80).
        setAlign('center').setAnchorPoint(0, 0.5).setSize(scoreRect.width, scoreRect.height).setPosition(scoreX, rb.GAME.HEADER_HEIGHT / 2 - backgroundPadding);
    
    if(rb.Mode.DEBUG)
    this.scoreText.setStroke(new lime.fill.Stroke(1, '#ffffff'));

    layer.appendChild(this.scoreText, 4);

    // Score heading
    var scoreHeading = new lime.Label().setText('score').setFontFamily(rb.GAME.FONT).setFontColor('#ffffff').setFontSize(36).
        setAlign('right').setAnchorPoint(1, 0.5).setSize(150, 50).setPosition(scoreX - padding, rb.GAME.HEADER_HEIGHT / 2);

    if(rb.Mode.DEBUG)
    scoreHeading.setStroke(new lime.fill.Stroke(1, '#ffffff'));

    layer.appendChild(scoreHeading, 8);


    // Time background
    var timeBackground = new lime.Sprite().setFill('#333333').setAnchorPoint(0, 0.5).setSize(timeRect.width, timeRect.height).setPosition(timeX, rb.GAME.HEADER_HEIGHT / 2);

    if(rb.Mode.DEBUG)
    timeBackground.setStroke(new lime.fill.Stroke(1, '#ffffff'));

    layer.appendChild(timeBackground, 8);


    // Time text
    this.timeText = new lime.Label().setText('000').setFontFamily(rb.GAME.FONT_NUMBERS).setFontColor('#ffffff').setFontSize(80).
        setAlign('center').setAnchorPoint(0, 0.5).setSize(timeRect.width, timeRect.height).setPosition(timeX, rb.GAME.HEADER_HEIGHT / 2 - backgroundPadding);
    
    if(rb.Mode.DEBUG)
    this.timeText.setStroke(new lime.fill.Stroke(1, '#ffffff'));

    if(this.currentTime < 10)
    {
        this.timeText.setText('0' + this.currentTime);
    }    
    else
    {
        this.timeText.setText(this.currentTime);
    } 

    layer.appendChild(this.timeText, 9);


    // Time heading
    var timeHeading = new lime.Label().setText('time').setFontFamily(rb.GAME.FONT).setFontColor('#ffffff').setFontSize(36).
        setAlign('right').setAnchorPoint(1, 0.5).setSize(150, 50).setPosition(timeX - padding, rb.GAME.HEADER_HEIGHT / 2);

    layer.appendChild(timeHeading, 10);

    layer.appendChild(this.board);
};

goog.inherits(rb.Game, lime.Scene);


/**
 * Show game-over dialog
 */
rb.Game.prototype.endGame = function() {

    this.removeEventListeners();

    this.board.pause();

    this.setResponseTime();

    this.board.getCountDown().showTimeUp(); 

    this.board.flashBoard();

    this.board.resetBoard();

    goog.events.listenOnce(this.eventTarget, 'time up', function(e){

            // this.resetGame();

            this.eventTarget.dispatchEvent('game over');

        }, false, this);
};


/**
 * Resets score and response time
 */
rb.Game.prototype.resetGame = function() {

    this.points = 0;
    this.responseTime.length = 0;

    this.scoreText.setText('000');
    this.timeText.setText(this.level.TIME);

    // Reset and pause animation
    this.board.resetBoard();
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
            numbersArray.push(i);
        }
    };

    numbersArray.push(value);

    return numbersArray;
}

/**
 * Generates numbers determined by modulus operation
 */
rb.Game.prototype.generateNumbers = function(div, mod, total) {
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

    var currentScore = parseInt(this.scoreText.getText(), 10)

    if (this.points > currentScore)
    {
        if(this.points < 10)
        {
            currentScore = "00" + this.points;
        }    
        else if(this.points >= 10)
        {
            currentScore = "0" + this.points;
        }   

        this.scoreText.setText(currentScore);
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
    this.responseTime.push((dateNow - this.start) / 1000);
    this.start = dateNow;

    console.log(this.responseTime);
};

/**
 * Calculate average response time
 */
rb.Game.prototype.calculateAverageResponseTime = function() {

    var total = 0;
    var length = this.responseTime.length;

    for (var i = 0; i < length; i++) {
        total += this.responseTime[i];
    };

    total = total / length;

    return total;
};

/**
 * Subtract one second from left time in timed mode
 */
rb.Game.prototype.decreaseTime = function() {

    this.currentTime--;

    if(this.currentTime < 10)
    {
        this.timeText.setText('0' + this.currentTime);
    }    
    else
    {
        this.timeText.setText(this.currentTime);
    }    

    if (this.currentTime < 1) {
        this.endGame();
    }
};

/**
 * Returns event target. Dispatches events
 */
rb.Game.prototype.getEventTarget = function() {
    return this.eventTarget;
};