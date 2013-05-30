goog.provide('rb.LevelEnd');

/**
 * LevelEnd
 * @constructor
 * @extends lime.Scene
 */
rb.LevelEnd = function(levelNumber, level, eventTarget) {
    lime.Scene.call(this);

    console.log(level);

    var layer = new lime.Layer().setPosition(0, 0);
    var padding = 20;
    var backgroundPadding = 5;
    var backgroundYourScore = '#827870';
    var backgroundHighestScore = '#333333';

    if(rb.Mode.BACKGROUND_DEBUG)
    {
        var background = new lime.Sprite().setSize(rb.WIDTH,rb.HEIGHT).
            setFill(rb.Mode.BACKGROUND_COLOR).setAnchorPoint(0,0);
        layer.appendChild(background);
    }  

    var headerBackground = new lime.Sprite().setFill('assets/header.png').setAnchorPoint(0, 0).setPosition(0, 0);
    layer.appendChild(headerBackground, 1);


    // Level heading
    var levelHeading = new lime.Label().setText('level ' + levelNumber).setFontFamily('arial, sans-serif').setFontColor('#ffffff').setFontWeight(500).setFontSize(56).
        setAlign('left').setAnchorPoint(0, 0.5).setPosition(500, rb.GAME.HEADER_HEIGHT / 2);
    layer.appendChild(levelHeading, 3);


    // Game thumb
    var gameThumb = new lime.Sprite().setFill(level.LEVEL_THUMB).setSize(76, 76).setAnchorPoint(1, 0.5).setPosition(500 - padding, rb.GAME.HEADER_HEIGHT / 2);
    layer.appendChild(gameThumb, 4);


    // Level 1 heading
    var resultsHeading = new lime.Label().setFontFamily(rb.GAME.FONT).setFontColor('#ffffff').setFontSize(48).
        setAlign('right').setAnchorPoint(1, 0).setSize(160, 150).setPosition(rb.WIDTH * 0.3 - (padding / 2), 150);

    resultsHeading.setText('results');

    if(rb.Mode.DEBUG)
    resultsHeading.setStroke(new lime.fill.Stroke(1, '#ffffff'));

    layer.appendChild(resultsHeading, 5);


    // Level text
    var resultsText = new lime.Label().setFontFamily(rb.GAME.FONT).setFontColor('#ffffff').setFontSize(24).
        setAlign('left').setAnchorPoint(0, 0).setSize(450, 150).setPosition(rb.WIDTH * 0.3 + (padding / 2), 150);

    if(rb.Mode.DEBUG)
    resultsText.setStroke(new lime.fill.Stroke(1, '#ffffff'));

    resultsText.setText(rb.RESULTS.INTRO_TEXT);

    layer.appendChild(resultsText, 5);


    // Your score heading
    var yourScoreHeading = new lime.Label().setText('your score').setFontFamily(rb.GAME.FONT).setFontColor('#ffffff').setFontSize(24).
        setAlign('center').setAnchorPoint(1, 1).setSize(150, 40).setPosition(rb.WIDTH * 0.5 - (padding / 2), 350);

    if(rb.Mode.DEBUG)
    yourScoreHeading.setStroke(new lime.fill.Stroke(1, '#ffffff'));

    layer.appendChild(yourScoreHeading);


    // Your score background
    var yourScoreBackground = new lime.Sprite().setFill(backgroundYourScore).setAnchorPoint(1, 0).setSize(150, 75).setPosition(rb.WIDTH * 0.5 - (padding / 2), 350);

    layer.appendChild(yourScoreBackground, 1);

    // Score
    this.scoreText = new lime.Label().setText('000').setFontFamily(rb.GAME.FONT_NUMBERS).setFontColor('#ffffff').setFontSize(80).
        setAlign('center').setAnchorPoint(1, 0).setSize(150, 75).setPosition(rb.WIDTH * 0.5 - (padding / 2), 345);
    
    layer.appendChild(this.scoreText, 2);


    // Your score heading
    var highestScoreHeading = new lime.Label().setText('highest score').setFontFamily(rb.GAME.FONT).setFontColor('#ffffff').setFontSize(24).
        setAlign('center').setAnchorPoint(0, 1).setSize(150, 40).setPosition(rb.WIDTH * 0.5 + (padding / 2), 350);

    if(rb.Mode.DEBUG)
    highestScoreHeading.setStroke(new lime.fill.Stroke(1, '#ffffff'));

    layer.appendChild(highestScoreHeading);


    // Your score background
    var highestScoreBackground = new lime.Sprite().setFill(backgroundHighestScore).setAnchorPoint(0, 0).setSize(150, 75).setPosition(rb.WIDTH * 0.5 + (padding / 2), 350);

    if(rb.Mode.DEBUG)
    highestScoreBackground.setStroke(new lime.fill.Stroke(1, '#ffffff'));

    layer.appendChild(highestScoreBackground, 1);


    // Score
    this.highestScoreText = new lime.Label().setText('000').setFontFamily(rb.GAME.FONT_NUMBERS).setFontColor(level.TEXT_HIGHLIGHT_COLOR).setFontSize(80).
        setAlign('center').setAnchorPoint(0, 0).setSize(150, 75).setPosition(rb.WIDTH * 0.5 + (padding / 2), 345);
    
    if(rb.Mode.DEBUG)
    this.highestScoreText.setStroke(new lime.fill.Stroke(1, '#ffffff'));

    layer.appendChild(this.highestScoreText, 2);


    // Your reaction time heading
    var yourARTHeading = new lime.Label().setText('your reaction time').setFontFamily(rb.GAME.FONT).setFontColor('#ffffff').setFontSize(24).
        setAlign('center').setAnchorPoint(1, 1).setSize(220, 40).setPosition(rb.WIDTH * 0.5 - (padding / 2), 525);

    if(rb.Mode.DEBUG)
    yourARTHeading.setStroke(new lime.fill.Stroke(1, '#ffffff'));

    layer.appendChild(yourARTHeading);


    // Your reaction time background
    var yourARTBackground = new lime.Sprite().setFill(backgroundYourScore).setAnchorPoint(1, 0).setSize(220, 75).setPosition(rb.WIDTH * 0.5 - (padding / 2), 525);

    if(rb.Mode.DEBUG)
    yourARTBackground.setStroke(new lime.fill.Stroke(1, '#ffffff'));

    layer.appendChild(yourARTBackground, 1);


    // Your reaction time text
    this.yourARTText = new lime.Label().setText('000').setFontFamily(rb.GAME.FONT_NUMBERS).setFontColor('#ffffff').setFontSize(80).
        setAlign('left').setAnchorPoint(1, 0).setSize(220, 75).setPosition(rb.WIDTH * 0.5 - (padding / 2) + backgroundPadding, 525 - backgroundPadding);
    
    this.msText1 = new lime.Label().setText('ms').setFontFamily(rb.GAME.FONT).setFontColor('#ffffff').setFontSize(36).
        setAlign('right').setAnchorPoint(1, 0).setSize(220, 75).setPosition(rb.WIDTH * 0.5 - (padding / 2) - backgroundPadding, 525 - backgroundPadding);
           
    if(rb.Mode.DEBUG)
    this.msText1.setStroke(new lime.fill.Stroke(1, level.TEXT_HIGHLIGHT_COLOR));

    layer.appendChild(this.msText1, 2);
           
    if(rb.Mode.DEBUG)
    this.yourARTText.setStroke(new lime.fill.Stroke(1, '#ffffff'));

    layer.appendChild(this.yourARTText, 3);


    // Your reaction time heading
    var bestARTHeading = new lime.Label().setText('best reaction time').setFontFamily(rb.GAME.FONT).setFontColor('#ffffff').setFontSize(24).
        setAlign('center').setAnchorPoint(0, 1).setSize(220, 40).setPosition(rb.WIDTH * 0.5 + (padding / 2), 525);

    if(rb.Mode.DEBUG)
    bestARTHeading.setStroke(new lime.fill.Stroke(1, level.TEXT_HIGHLIGHT_COLOR));

    layer.appendChild(bestARTHeading);


    // best reaction time background
    var bestARTBackground = new lime.Sprite().setFill(backgroundHighestScore).setAnchorPoint(0, 0).setSize(220, 75).setPosition(rb.WIDTH * 0.5 + (padding / 2), 525);

    if(rb.Mode.DEBUG)
    bestARTBackground.setStroke(new lime.fill.Stroke(1, level.TEXT_HIGHLIGHT_COLOR));

    layer.appendChild(bestARTBackground, 1);


    // best reaction time text
    this.bestARTText = new lime.Label().setText('000').setFontFamily(rb.GAME.FONT_NUMBERS).setFontColor(level.TEXT_HIGHLIGHT_COLOR).setFontSize(80).
        setAlign('left').setAnchorPoint(0, 0).setSize(220, 75).setPosition(rb.WIDTH * 0.5 + (padding / 2) + backgroundPadding, 525 - backgroundPadding);
    

    var msText2 = new lime.Label().setText('ms').setFontFamily(rb.GAME.FONT).setFontColor(level.TEXT_HIGHLIGHT_COLOR).setFontSize(36).
        setAlign('right').setAnchorPoint(0, 0).setSize(220, 75).setPosition(rb.WIDTH * 0.5 + (padding / 2) - backgroundPadding, 525 - backgroundPadding);

    if(rb.Mode.DEBUG)
    msText2.setStroke(new lime.fill.Stroke(1, level.TEXT_HIGHLIGHT_COLOR));

    layer.appendChild(msText2, 2);

    if(rb.Mode.DEBUG)
    this.bestARTText.setStroke(new lime.fill.Stroke(1, level.TEXT_HIGHLIGHT_COLOR));

    layer.appendChild(this.bestARTText, 3);

    this.restartButton = new rb.TileButton.type("restart level", eventTarget, rb.NAV.RESTART_UP, rb.NAV.RESTART_DOWN).setAnchorPoint(0.5, 0.5).setPosition(rb.WIDTH * 0.25, 790);

    layer.appendChild(this.restartButton, 8);

    this.playButton = new rb.TileButton.type("continue", eventTarget, rb.NAV.START_CONTINUE_UP, rb.NAV.START_CONTINUE_DOWN).setAnchorPoint(0.5, 0.5).setPosition(rb.WIDTH * 0.75, 790);

    layer.appendChild(this.playButton, 7);

    this.appendChild(layer);

    this.updateScoreLabel(level.score);
    this.updateHighestScoreLabel(level.bestScore);   
    this.updateYourARTLabel(level.art);
    this.updateBestARTLabel(level.bestART);

    if(level.score >= level.bestScore)
        this.scoreText.setFontColor(level.TEXT_HIGHLIGHT_COLOR);

    if(level.art <= level.bestART)
    {
        this.yourARTText.setFontColor(level.TEXT_HIGHLIGHT_COLOR); 
        this.msText1.setFontColor(level.TEXT_HIGHLIGHT_COLOR); 
    }
};

goog.inherits(rb.LevelEnd, lime.Scene);

rb.LevelEnd.prototype.updateScoreLabel = function(value)
{
    if(value < 10)
    {
        value = "00" + value;
    }    
    else if(value >= 10)
    {
        value = "0" + value;
    }   

    this.scoreText.setText(value);
}

rb.LevelEnd.prototype.updateHighestScoreLabel = function(value)
{
    if(value < 10)
    {
        value = "00" + value;
    }    
    else if(value >= 10)
    {
        value = "0" + value;
    }  

    this.highestScoreText.setText(value);
}

rb.LevelEnd.prototype.updateYourARTLabel = function(value)
{   
    if(value != 0)
    {
        value = parseInt(value * 10) / 10;

        if(parseInt(value) == value)
        value = value + '.0';        

        if(value < 10)
        {
            value = '0' + value;
        }   

        this.yourARTText.setText(value);
    }
    else
    {
        this.yourARTText.setText('00.0');
    }
}

rb.LevelEnd.prototype.updateBestARTLabel = function(value)
{
    if(value != 0 && value != null)
    {
        value = parseInt(value * 10) / 10;

        if(parseInt(value) == value)
        value = value + '.0';        

        if(value < 10)
        {
            value = '0' + value;
        }    

        this.bestARTText.setText(value);      
    }
    else
    {
        this.bestARTText.setText('00.0'); 
    } 
}
