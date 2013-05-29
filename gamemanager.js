goog.provide('rb.GameManager');

goog.require('lime.Layer');
goog.require('lime.animation.Animation');
goog.require('lime.animation.FadeTo');
goog.require('lime.Scene');
goog.require('lime.transitions.Dissolve');
goog.require('lime.transitions.SlideInRight');
goog.require('rb.Board');
goog.require('rb.GameEnd');
goog.require('rb.TileButton');
goog.require('rb.Level1');
goog.require('rb.Level2');
goog.require('rb.Level3');
goog.require('rb.LevelEnd');
goog.require('rb.Help');
goog.require('rb.LevelIntro');
goog.require('rb.Variables');

/**
 * LevelIntro
 * @constructor
 */
rb.GameManager = function() {

    this.eventTarget = new goog.events.EventTarget();

    if(rb.Mode.DEBUG)
    {   
        // this.showSplash();

        // this.showStartScreen();

        // rb.GAME.currentLevel = 2;
        // this.loadLevel();

        // this.loadGame();

        // this.showEndScreen();

        // this.showLevelEnd();

        this.showEndScreen();
    }
    else
    {
        // this.loadLevel();

        // this.showSplash();

        // this.showStartScreen();

        // this.showEndScreen();

        // this.showSplash();

        // this.showLevelEnd();

        // this.loadGame();

        this.showEndScreen();

        // rb.GAME.currentLevel = 2;
        // this.loadLevel();        
    }       
};

/**
 * Shows scientists in sport splash screen
 */
rb.GameManager.prototype.showSplash = function() {
    var scene = new lime.Scene(),
        layer = new lime.Layer().setPosition(0, 0);
    
    var background = new lime.Sprite().setSize(rb.WIDTH,rb.HEIGHT).
        setFill('#f9f8f7').setAnchorPoint(0,0);
    layer.appendChild(background);

    var logo = new lime.Sprite().setFill('assets/splash1.gif').setAnchorPoint(0.5, 0.5).setPosition(rb.WIDTH / 2, rb.HEIGHT / 2);
    layer.appendChild(logo);

    scene.appendChild(layer);

    rb.director.replaceScene(scene);

    lime.scheduleManager.callAfter(function(){
        
        this.showSplash1()

     }, this, 1000);
}

/**
 * Shows gsk splash screen
 */
rb.GameManager.prototype.showSplash1 = function() {
    var scene = new lime.Scene(),
        layer = new lime.Layer().setPosition(0, 0);
    
    var background = new lime.Sprite().setSize(rb.WIDTH,rb.HEIGHT).
        setFill('#333333').setAnchorPoint(0,0);
    layer.appendChild(background);

    var logo = new lime.Sprite().setFill('assets/splash2.gif').setAnchorPoint(0.5, 0.5).setPosition(rb.WIDTH / 2, rb.HEIGHT / 2);
    layer.appendChild(logo);

    scene.appendChild(layer);

    if(rb.Mode.DEBUG)
    rb.director.replaceScene(scene);
    else
    rb.director.replaceScene(scene, lime.transitions.SlideInRight);

    lime.scheduleManager.callAfter(function(){
        
        this.showStartScreen()

     }, this, 2000);
}

/**
 * Shows start screen
 */
rb.GameManager.prototype.showStartScreen = function() {
    var startScene = new lime.Scene(),
        layer = new lime.Layer().setPosition(0, 0); 

    if(rb.Mode.BACKGROUND_DEBUG)
    {
        var background = new lime.Sprite().setSize(rb.WIDTH,rb.HEIGHT).
            setFill(rb.Mode.BACKGROUND_COLOR).setAnchorPoint(0,0);
        layer.appendChild(background);
    }    

    var smallLogo = new lime.Sprite().setFill('assets/scientists_in_sport_logo.png').setAnchorPoint(0, 0).setPosition(45, 70);
    layer.appendChild(smallLogo, 1);

    var smallLogo1 = new lime.Sprite().setFill('assets/gsk_logo.png').setAnchorPoint(0, 0).setPosition(500, 60);
    layer.appendChild(smallLogo1, 1);

    var gameImage = new lime.Sprite().setFill('assets/reaction_test.png').setAnchorPoint(0, 0).setPosition(0, 200);
    layer.appendChild(gameImage);

    var introText = new lime.Label().setText(rb.GAME.INTRO_TEXT).setFontFamily(rb.GAME.FONT).setFontColor('#ffffff').setFontSize(18).
        setAlign('left').setAnchorPoint(0, 0).setSize(650, 250).setPosition(30, 565);
    layer.appendChild(introText);

    var startButton = new rb.TileButton.type("start", this.eventTarget, rb.NAV.START_CONTINUE_UP, rb.NAV.START_CONTINUE_DOWN).setAnchorPoint(0.5, 0.5).setPosition(rb.WIDTH / 2, rb.HEIGHT * 0.85);

    layer.appendChild(startButton);

    startScene.appendChild(layer);

    if(rb.Mode.DEBUG)
    rb.director.replaceScene(startScene);
    else
    rb.director.replaceScene(startScene, lime.transitions.SlideInRight);

    goog.events.listen(this.eventTarget, 'start', function(e){

        this.loadLevel();
    }, false, this);
}

/**
 * Shows scores end screen
 */
rb.GameManager.prototype.showScoreEndScreen = function() {
    var endScreen = new rb.GameEndScore(rb.LEVEL1, rb.LEVEL2, rb.LEVEL3);

    if(rb.Mode.DEBUG)
    rb.director.replaceScene(endScreen);
    else
    rb.director.replaceScene(endScreen, lime.transitions.SlideInRight);

    goog.events.listenOnce(this.eventTarget, 'play again', function(e){
        this.showEndScreen();
    }, false, this);
}

/**
 * Shows end screen
 */
rb.GameManager.prototype.showEndScreen = function() {
    var endScreen = new rb.GameEnd(rb.LEVEL1, rb.LEVEL2, rb.LEVEL3);

    if(rb.Mode.DEBUG)
    rb.director.replaceScene(endScreen);
    else
    rb.director.replaceScene(endScreen, lime.transitions.SlideInRight);

    goog.events.listenOnce(this.eventTarget, 'play again', function(e){
      console.log('play again')
    }, false, this);
}

/**
 * Loads level
 */
rb.GameManager.prototype.loadLevel = function() {
    var level;

    switch(rb.GAME.currentLevel)
    {
        case 1:
            level = rb.LEVEL1;
        break;
        case 2:
            level = rb.LEVEL2;
        break;
        case 3:
            level = rb.LEVEL3;
        break;              
    }

    var levelIntro = new rb.LevelIntro(rb.GAME.currentLevel, level.INTRO_TEXT, level.LEVEL_IMAGE, level.LEVEL_THUMB, rb.GAME.HighScore, this.eventTarget);

    if(rb.Mode.DEBUG)
    rb.director.replaceScene(levelIntro);
    else
    rb.director.replaceScene(levelIntro, lime.transitions.SlideInRight);

    goog.events.listenOnce(this.eventTarget, 'play', function(e){
    
      this.loadGame(level);
    }, false, this);
}

/**
 * Loads game
 */
rb.GameManager.prototype.loadGame = function() {
    var scene;

    switch(rb.GAME.currentLevel)
    {
        case 1:
            scene = new rb.Level1(this.eventTarget);
        break;
        case 2:
            scene = new rb.Level2(this.eventTarget);
        break;
        case 3:
            scene = new rb.Level3(this.eventTarget);
        break;              
    }

    console.log(rb.GAME.currentLevel);

    scene.setPosition(0, 0);

    var transition = rb.director.replaceScene(scene, lime.transitions.SlideInRight);

    goog.events.listenOnce(transition,'end', function() {

        scene.startGame();  
    });

    goog.events.listenOnce(this.eventTarget, 'game over', function() {

        this.showLevelEnd();
    }, false, this);
}


/**
 * Shows end of level screen
 */
rb.GameManager.prototype.showLevelEnd = function() {
    var level;

    switch(rb.GAME.currentLevel)
    {
        case 1:
            level = rb.LEVEL1;
        break;
        case 2:
            level = rb.LEVEL2;
        break;
        case 3:
            level = rb.LEVEL3;
        break;              
    }

    // Pass in level TEMP
    var levelEnd = new rb.LevelEnd(rb.GAME.currentLevel, level, this.eventTarget);

    if(rb.Mode.DEBUG)
    rb.director.replaceScene(levelEnd);
    else
    rb.director.replaceScene(levelEnd, lime.transitions.SlideInRight);

    if(goog.events.hasListener(this.eventTarget, 'restart level') == false)
    {
        goog.events.listenOnce(this.eventTarget, 'restart level', function(e) {
            this.loadGame();
        }, false, this);
    }

    if(goog.events.hasListener(this.eventTarget, 'continue') == false)
    {
        goog.events.listenOnce(this.eventTarget, 'continue', function(e) {
           
            if(rb.GAME.currentLevel < rb.GAME.LEVELS)        
            rb.GAME.currentLevel = rb.GAME.currentLevel + 1;

            this.loadLevel(rb.GAME.currentLevel);
        }, false, this);
    }
}

/*
    level, score, highestScore, yourART, bestART, eventTarget

    this.updateScoreLabel(score);
    this.updateHighestScoreLabel(highestScore);
    this.updateYourARTLabel(yourART);
    this.updateBestARTLabel(bestART);
*/

// load menu scene
rb.loadMenu = function() {
    var scene = new lime.Scene(),
        layer = new lime.Layer().setPosition(rb.WIDTH / 2, 0);

    if(rb.isBrokenChrome()) layer.setRenderer(lime.Renderer.CANVAS);

    var btns = new lime.Layer().setPosition(0, 430);
    layer.appendChild(btns);
    var move = new lime.animation.MoveBy(-rb.WIDTH, 0).enableOptimizations();

    btn = rb.makeButton('Start').setPosition(0, 320);
    goog.events.listen(btn, 'click', function() {
        // rb.usemode = rb.Mode.TIMED;
        // btns.runAction(move);

        rb.newgame(rb.Level1);
    });
    btns.appendChild(btn);

    /*
    btn = rb.makeButton('Help').setPosition(0, 440);
    goog.events.listen(btn, 'click', function() {
        rb.loadHelpScene();
    });
    btns.appendChild(btn);
    */

    //second area that will slide in
    var btns2 = new lime.Layer().setPosition(rb.WIDTH, 0);
    btns.appendChild(btns2);

    var lbl = new lime.Label().setText('Select board size:').setFontColor('#fff').setFontSize(24).setPosition(0, 140);
    btns2.appendChild(lbl);

    btn = rb.makeButton('6x6').setPosition(0, 200);
    goog.events.listen(btn, 'click', function() {
        rb.newgame(6);
    });
    btns2.appendChild(btn);

    btn = rb.makeButton('7x7').setPosition(0, 320);
    goog.events.listen(btn, 'click', function() {
        rb.newgame(7);
    });
    btns2.appendChild(btn);

    btn = rb.makeButton('8x8').setPosition(0, 440);
    goog.events.listen(btn, 'click', function() {
        rb.newgame(8);
    });
    btns2.appendChild(btn);

    scene.appendChild(layer);
    //lime logo
    rb.builtWithLime(scene);

    // set current scene active
    rb.director.replaceScene(scene, lime.transitions.SlideInRight);
};

// helper for same size buttons
rb.makeButton = function(text) {
    var btn = new rb.Button(text).setSize(300, 90);
    return btn;
};

rb.isBrokenChrome = function(){
   return (/Chrome\/9\.0\.597/).test(goog.userAgent.getUserAgentString());
}

// load new game scene
rb.newgame = function(level) {

    var scene = new rb.Level1();
    scene.setPosition(0, 0)
    rb.director.replaceScene(scene, lime.transitions.SlideInRight);
};

rb.GameManager.prototype.getEventTarget = function()
{
    return this.eventTarget;
}