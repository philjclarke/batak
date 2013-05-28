goog.provide('rb.LevelIntro');

/**
 * LevelIntro
 * @constructor
 * @extends lime.Scene
 */
rb.LevelIntro = function(level, intoText, levelImage, highestScore, eventTarget) {
    lime.Scene.call(this);

    var layer = new lime.Layer().setPosition(0, 0);
    var padding = 20;

    if(rb.Mode.BACKGROUND_DEBUG)
    {
        var background = new lime.Sprite().setSize(rb.WIDTH,rb.HEIGHT).
            setFill(rb.Mode.BACKGROUND_COLOR).setAnchorPoint(0,0);
        layer.appendChild(background);
    }    

    var headerBackground = new lime.Sprite().setFill('assets/header.png').setAnchorPoint(0, 0).setPosition(0, 0);
    layer.appendChild(headerBackground, 1);

    var level1Image = new lime.Sprite().setFill(levelImage).setAnchorPoint(0.5, 0.5).setPosition(rb.WIDTH / 2, 350);
    layer.appendChild(level1Image, 1);

    /*
    var highestScoreBackground = new lime.Sprite().setFill('#333333').setAnchorPoint(0, 0.5).setSize(100, 50).setPosition(600, rb.GAME.HEADER_HEIGHT / 2);

    if(rb.Mode.DEBUG)
    highestScoreBackground.setStroke(new lime.fill.Stroke(1, '#ffffff'));

    layer.appendChild(highestScoreBackground, 3);

    // Score
    var highestScore = new lime.Label().setText(highestScore).setFontFamily(rb.GAME.FONT_NUMBERS).setFontColor('#ffffff').setFontSize(48).
        setAlign('center').setAnchorPoint(0, 0.5).setSize(100, 50).setPosition(600, rb.GAME.HEADER_HEIGHT / 2);
    
    if(rb.Mode.DEBUG)
    highestScore.setStroke(new lime.fill.Stroke(1, '#ffffff'));

    layer.appendChild(highestScore, 3);

    // Highest score heading
    var highestScoreText = new lime.Label().setText('highest score').setFontFamily(rb.GAME.FONT).setFontColor('#333333').setFontSize(36).
        setAlign('right').setAnchorPoint(1, 0.5).setSize(250, 50).setPosition(600 - padding, rb.GAME.HEADER_HEIGHT / 2);

    if(rb.Mode.DEBUG)
    highestScoreText.setStroke(new lime.fill.Stroke(1, '#ffffff'));
           
    layer.appendChild(highestScoreText, 4);

    // Level 1 heading
    var level1Heading = new lime.Label().setFontFamily(rb.GAME.FONT).setFontColor('#ffffff').setFontSize(48).
        setAlign('right').setAnchorPoint(1, 0).setSize(160, 150).setPosition(rb.WIDTH * 0.3 - (padding / 2), 600);

    level1Heading.setText('level ' + level);
    
    if(rb.Mode.DEBUG)
    level1Heading.setStroke(new lime.fill.Stroke(1, '#ffffff'));

    layer.appendChild(level1Heading, 5);
    */

    /*
    // Level text
    var level1Text = new lime.Label().setFontFamily(rb.GAME.FONT).setFontColor('#ffffff').setFontSize(24).
        setAlign('left').setAnchorPoint(0, 0).setSize(450, 150).setPosition(rb.WIDTH * 0.3 + (padding / 2), 600);
    */

    var level1Text = new lime.Label().setFontFamily(rb.GAME.FONT).setFontColor('#ffffff').setFontSize(24).
        setAlign('left').setAnchorPoint(0, 0).setSize(600, 150).setPosition(75, 600);

    if(rb.Mode.DEBUG)
    level1Text.setStroke(new lime.fill.Stroke(1, '#ffffff'));

    level1Text.setText(intoText);

    layer.appendChild(level1Text, 5);

    this.playButton = new rb.TileButton.type("play", eventTarget, rb.NAV.START_CONTINUE_UP, rb.NAV.START_CONTINUE_DOWN).setAnchorPoint(0.5, 0.5).setPosition(rb.WIDTH / 2, rb.HEIGHT * 0.85);

    layer.appendChild(this.playButton, 6);
    
    this.appendChild(layer);
};

goog.inherits(rb.LevelIntro, lime.Scene);

/**
 * Returns event target. Dispatches events
 */
rb.LevelIntro.prototype.getEventTarget = function() {

    return this.playButton.getEventTarget();
};
