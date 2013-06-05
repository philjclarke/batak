goog.provide('rb.GameManager');

goog.require('lime.Layer');
goog.require('lime.animation.Animation');
goog.require('lime.animation.FadeTo');
goog.require('lime.Scene');
goog.require('lime.transitions.Dissolve');
goog.require('lime.transitions.SlideInRight');
goog.require('rb.Board');
goog.require('rb.GameEnd');
goog.require('rb.GameEndScore');
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
    this.currentScreen = null;

    rb.GAME.localStorageStatus = this.checkLocalStorageSupport();
    

    if(rb.GAME.localStorageStatus)
    {
        rb.GAME.localStorage = window['localStorage'];
    }   

    if(rb.GAME.localStorageStatus)
    {
        if(localStorage.getItem(rb.GAME.LOCAL_STORAGE_ID) !== null)
        {
            rb.SCORES = JSON.parse(rb.GAME.localStorage.getItem(rb.GAME.LOCAL_STORAGE_ID));

            rb.LEVEL1.bestScore = rb.SCORES.level1BestScore;
            rb.LEVEL1.bestART = rb.SCORES.level1BestART;

            rb.LEVEL2.bestScore = rb.SCORES.level2BestScore;
            rb.LEVEL2.bestART = rb.SCORES.level2BestART;

            rb.LEVEL3.bestScore = rb.SCORES.level3BestScore;
            rb.LEVEL3.bestART = rb.SCORES.level3BestART;     

            console.log(rb.LEVEL1.bestScore); 
            console.log(rb.LEVEL1.bestART);      
            console.log(rb.LEVEL2.bestScore); 
            console.log(rb.LEVEL2.bestART);   
            console.log(rb.LEVEL3.bestScore); 
            console.log(rb.LEVEL3.bestART);                              
        }
    }

    if(rb.Mode.DEBUG)
    {   
        // rb.GAME.currentLevel = 2;
        // this.showLevelEnd();
        // this.showSplash();

        // rb.GAME.currentLevel = 2;
        // this.loadLevel();

        // this.showEndScreen();

        this.showSplash();

        // this.showLevelEnd();        
    }
    else
    {
        // rb.GAME.currentLevel = 2;
        // this.showLevelEnd();
        // this.showSplash();
        // this.loadLevel();

        // this.showEndScreen();

        // rb.GAME.currentLevel = 2;
        // this.loadLevel();      

        // this.showLevelEnd();

        this.showSplash();
    }       
};

/**
 * Check support for localStorage
 */ 
rb.GameManager.prototype.checkLocalStorageSupport = function() {

  try {
    return 'localStorage' in window && window['localStorage'] !== null;
  } catch(e){
    return false;
  }
}

/**
 * Shows scientists in sport splash screen
 */
rb.GameManager.prototype.showSplash = function() {

    this.currentScreen = 'showSplash';

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

    this.currentScreen = 'showSplash1';

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

    this.currentScreen = 'showStartScreen';

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

    var startButton = new rb.TileButton.type("start", this.eventTarget, rb.NAV.START_CONTINUE_UP, rb.NAV.START_CONTINUE_DOWN).setAnchorPoint(0.5, 0.5).setPosition(rb.WIDTH / 2, rb.GAME.BUTTON_Y);

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

    var endScoresScreen = new rb.GameEndScore(rb.LEVEL1, rb.LEVEL2, rb.LEVEL3, this.eventTarget);

    if(rb.Mode.DEBUG)
    {
        rb.director.replaceScene(endScoresScreen);
    }    
    else if(this.currentScreen == 'showEndScreen')
    {
        rb.director.replaceScene(endScoresScreen, lime.transitions.SlideInLeft);
    }    
    else
    {
        rb.director.replaceScene(endScoresScreen, lime.transitions.SlideInRight);
    }

    goog.events.listenOnce(this.eventTarget, 'reaction times', function(e){
        this.showEndScreen();
    }, false, this);

    this.currentScreen = 'showScoreEndScreen';
}

/**
 * Shows end screen
 */
rb.GameManager.prototype.showEndScreen = function() {

    var endScreen = new rb.GameEnd(rb.LEVEL1, rb.LEVEL2, rb.LEVEL3, this.eventTarget);

    if(rb.Mode.DEBUG)
    rb.director.replaceScene(endScreen);
    else
    rb.director.replaceScene(endScreen, lime.transitions.SlideInRight);

    goog.events.listenOnce(this.eventTarget, 'start again', function(e){
        this.loadLevel();
    }, false, this);

    goog.events.listenOnce(this.eventTarget, 'scores', function(e){
        this.showScoreEndScreen();
    }, false, this); 

    this.currentScreen = 'showEndScreen';   
}

/**
 * Loads level
 */
rb.GameManager.prototype.loadLevel = function() {

    this.currentScreen = 'loadLevel';

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

    var transition;

    if(rb.Mode.DEBUG)
    {
        rb.director.replaceScene(endScoresScreen);
    }    
    else if(this.currentScreen == 'showLevelEnd')
    {
        transition = rb.director.replaceScene(scene, lime.transitions.SlideInLeft);
    }    
    else
    {
        transition = rb.director.replaceScene(scene, lime.transitions.SlideInRight);
    }

    goog.events.listenOnce(transition,'end', function() {

        scene.startGame();  
    });

    goog.events.listenOnce(this.eventTarget, 'game over', function() {

        this.showLevelEnd();
    }, false, this);

    this.currentScreen = 'loadGame';
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
            {
                rb.GAME.currentLevel = rb.GAME.currentLevel + 1;
                this.loadLevel(rb.GAME.currentLevel);
            }    
            else
            {
                rb.GAME.currentLevel = 1;
                this.showScoreEndScreen();
            }    

        }, false, this);
    }

    this.currentScreen = 'showLevelEnd';
}

rb.isBrokenChrome = function(){
   return (/Chrome\/9\.0\.597/).test(goog.userAgent.getUserAgentString());
}

rb.GameManager.prototype.getEventTarget = function()
{
    return this.eventTarget;
}