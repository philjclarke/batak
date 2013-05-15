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

    //make board
    this.board = new rb.Board(this).setPosition(25, 174);
    
    if(rb.isBrokenChrome()) this.board.setRenderer(lime.Renderer.CANVAS);

    this.start = Date.now();

    var timeBackground = new lime.Sprite().setFill('#3a3b3c').setAnchorPoint(0, 0).setSize(70, 45).setPosition(630, 10);

    if(rb.Mode.DEBUG)
    timeBackground.setStroke(new lime.fill.Stroke(1, '#ffffff'));

    layer.appendChild(timeBackground, 3);

    this.timeText = new lime.Label().setText("00").setFontFamily('FrutigerNeue1450W01-Bol 1196308').setFontColor('#ffffff').setFontWeight(500).setFontSize(36).
        setAlign('center').setAnchorPoint(0, 0).setSize(70, 45).setPosition(630, 10);;
    
    if(rb.Mode.DEBUG)
    this.timeText.setStroke(new lime.fill.Stroke(1, '#ffffff'));

    layer.appendChild(this.timeText, 3);

    var timeHeading = new lime.Label().setText('time').setFontFamily('FrutigerNeue1450W01-Bol 1196308').setFontColor('#ffffff').setFontWeight(300).setFontSize(36).
        setAlign('right').setAnchorPoint(1, 0).setSize(150, 45).setPosition(630, 10);

    if(rb.Mode.DEBUG)
    timeHeading.setStroke(new lime.fill.Stroke(1, '#ffffff'));
           
    layer.appendChild(timeHeading, 4);

    var scoreBackground = new lime.Sprite().setFill('#3a3b3c').setAnchorPoint(0, 0).setSize(95, 45).setPosition(415, 10);

    if(rb.Mode.DEBUG)
    scoreBackground.setStroke(new lime.fill.Stroke(1, '#ffffff'));

    layer.appendChild(scoreBackground, 5);

    this.scoreText = new lime.Label().setText("000").setFontFamily('FrutigerNeue1450W01-Bol 1196308').setFontColor('#ffffff').setFontWeight(500).setFontSize(36).
        setAlign('center').setAnchorPoint(0, 0).setSize(95, 45).setPosition(415, 10);
    
    if(rb.Mode.DEBUG)
    this.scoreText.setStroke(new lime.fill.Stroke(1, '#ffffff'));

    layer.appendChild(this.scoreText, 6);

    var scoreHeading = new lime.Label().setText('score').setFontFamily('FrutigerNeue1450W01-Bol 1196308').setFontColor('#ffffff').setFontWeight(300).setFontSize(36).
        setAlign('right').setAnchorPoint(1, 0).setSize(95, 45).setPosition(415, 10);

    if(rb.Mode.DEBUG)
    scoreHeading.setStroke(new lime.fill.Stroke(1, '#ffffff'));
           
    this.currentTime = 30;

    layer.appendChild(scoreHeading, 7);

    layer.appendChild(this.board);
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

/**
 * Show game-over dialog
 */
rb.Game.prototype.endGame = function() {

   // unregister the event listeners and schedulers
   goog.events.unlisten(this.board, ['mousedown', 'touchstart'], this.board.pressHandler_);
   lime.scheduleManager.unschedule(this.updateScore, this);
   lime.scheduleManager.unschedule(this.decreaseTime, this);

    var dialog = new lime.RoundedRect().setFill(0, 0, 0, .7).setSize(500, 480).setPosition(360, 260).
        setAnchorPoint(.5, 0).setRadius(20);
    this.appendChild(dialog);

    var title = new lime.Label().setText(this.currentTime < 1 ? 'No more time!' : 'No more moves!').
        setFontColor('#ddd').setFontSize(40).setPosition(0, 70);
    dialog.appendChild(title);

    var score_lbl = new lime.Label().setText('Your score:').setFontSize(24).setFontColor('#ccc').setPosition(0, 145);
    dialog.appendChild(score_lbl);

    var score = new lime.Label().setText(this.points).setFontSize(150).setFontColor('#fff').
        setPosition(0, 240).setFontWeight(700);
    dialog.appendChild(score);

    var btn = new rb.Button().setText('TRY AGAIN').setSize(200, 90).setPosition(-110, 400);
    dialog.appendChild(btn);
    goog.events.listen(btn, lime.Button.Event.CLICK, function() {
         rb.newgame(this.board.cols);
    },false, this);


    var btn = new rb.Button().setText('MAIN MENU').setSize(200, 90).setPosition(110, 400);
    dialog.appendChild(btn);
    goog.events.listen(btn, lime.Button.Event.CLICK, function() {
        rb.loadMenu();
    });
};
