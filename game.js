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

    var smallLogo = new lime.Sprite().setFill('assets/ingame-logo-x40y32-HexBG-272528.gif').setAnchorPoint(0, 0).setPosition(35, 35);
    layer.appendChild(smallLogo, 1);

    //make board
    this.board = new rb.Board(this).setPosition(25, 174);
    
    if(rb.isBrokenChrome()) this.board.setRenderer(lime.Renderer.CANVAS);

    this.start = Date.now();

    // score label
    var score_lbl = new lime.Label().setFontFamily('HelveticaNeueW01-45Ligh').setFontColor('#ffffff').setFontSize(24).
        setPosition(30, 22).setText('Score:').setAnchorPoint(0, 0).setStroke(new lime.fill.Stroke(1, '#ffffff'));
    layer.appendChild(score_lbl);

    // score
    this.scoreText = new lime.Label().setFontFamily('HelveticaNeueW01-45Ligh').setFontColor('#ffffff').setFontSize(24).setText(0).setPosition(115, 22).
        setAnchorPoint(0, 0).setStroke(new lime.fill.Stroke(1, '#ffffff'));
    layer.appendChild(this.scoreText);

    // response time label
    var responseTime_lbl = new lime.Label().setFontFamily('HelveticaNeueW01-45Ligh').setFontColor('#ffffff').setFontSize(24).
        setPosition(200, 22).setText('Average Response Time:').setAnchorPoint(0, 0).setFontWeight(100).setSize(0, 0).setStroke(new lime.fill.Stroke(1, '#ffffff'));
    layer.appendChild(responseTime_lbl);

    // response time
    this.responseTimeText = new lime.Label().setFontFamily('HelveticaNeueW01-45Ligh').setFontColor('#ffffff').setFontSize(24).setText(0).setPosition(475, 22).
        setAnchorPoint(0, 0).setStroke(new lime.fill.Stroke(1, '#ffffff'));
    layer.appendChild(this.responseTimeText);

    // time remaining label
    var timeRemaining_lbl = new lime.Label().setFontFamily('HelveticaNeueW01-45Ligh').setFontColor('#ffffff').setFontSize(24).
        setPosition(30, 50).setText('Time:').setAnchorPoint(0, 0).setFontWeight(100).setSize(0, 0).setStroke(new lime.fill.Stroke(1, '#ffffff'));
    layer.appendChild(timeRemaining_lbl);

    this.maxTime = 15;
    this.curTime = 15;

    // time text
    this.timeText = new lime.Label().setFontFamily('HelveticaNeueW01-45Ligh').setFontColor('#ffffff').setFontSize(24).setText(this.maxTime).setPosition(115, 50).
        setAnchorPoint(0, 0).setStroke(new lime.fill.Stroke(1, '#ffffff'));
    layer.appendChild(this.timeText);

    //.setFontWeight()

    layer.appendChild(this.board);

    // Menu button
    this.btn_menu = new rb.Button('Menu').setSize(140, 70).setPosition(100, 945);
    goog.events.listen(this.btn_menu, 'click', function() {
        rb.loadMenu();
    });
    this.appendChild(this.btn_menu);

    // Hint button
    this.btn_hint = new rb.Button('Hint').setSize(140, 70).setPosition(640, 945).setOpacity(0);
    goog.events.listen(this.btn_hint, 'click', function() {
        if (this.hint)
        this.board.showHint();
    },false, this);
    this.appendChild(this.btn_hint);

    // lime.scheduleManager.scheduleWithDelay(this.decreaseTime, this, 1000);

     // update score when points have changed
    lime.scheduleManager.scheduleWithDelay(this.updateResponseTime, this, 100);

    lime.scheduleManager.scheduleWithDelay(this.updateScore, this, 100);

     // show lime logo
    rb.builtWithLime(this);
};

goog.inherits(rb.Game, lime.Scene);

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

    this.responseTimeText.setText((total / length) / 1000);
};

/**
 * Subtract one second from left time in timed mode
 */
rb.Game.prototype.decreaseTime = function() {
    this.curTime--;

    this.timeText.setText(this.curTime);

    if (this.curTime < 1) {
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

    var title = new lime.Label().setText(this.curTime < 1 ? 'No more time!' : 'No more moves!').
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

/**
 * Register new hint from board object. Activate button
 * if no action soon
 * @param {rb.Gem} hint Hint gem.
 */
rb.Game.prototype.setHint = function(hint) {
    this.hint = hint;
    if (!goog.isDef(hint)) {
        return this.endGame();
    }
    else {
        lime.scheduleManager.callAfter(this.showHint, this, 3500);
    }
};

/**
 * Hide hint button
 */
rb.Game.prototype.clearHint = function() {
    lime.scheduleManager.unschedule(this.showHint, this);
    this.btn_hint.runAction(new lime.animation.FadeTo(0));
    delete this.hint;
};

/**
 * Show hint button
 */
rb.Game.prototype.showHint = function() {
    this.btn_hint.runAction(new lime.animation.FadeTo(1));
};