goog.provide('rb.LevelIntro');

/**
 * LevelIntro
 * @constructor
 * @extends lime.Scene
 */
rb.LevelIntro = function(level, introText, levelImage, levelThumb, highestScore, eventTarget) {
    lime.Scene.call(this);

    var layer = new lime.Layer().setPosition(0, 0);
    var padding = 30;

    if(rb.Mode.BACKGROUND_DEBUG)
    {
        var background = new lime.Sprite().setSize(rb.WIDTH,rb.HEIGHT).
            setFill(rb.Mode.BACKGROUND_COLOR).setAnchorPoint(0,0);
        layer.appendChild(background);
    }    

    var headerBackground = new lime.Sprite().setFill('assets/header.png').setAnchorPoint(0, 0).setPosition(0, 0);
    layer.appendChild(headerBackground, 1);

    // Level heading
    var levelHeading = new lime.Label().setText('level ' + level).setFontFamily(rb.GAME.FONT).setFontColor('#ffffff').setFontWeight(500).setFontSize(56).
        setAlign('left').setAnchorPoint(0, 0.5).setSize(215, 75).setPosition(510, rb.GAME.HEADER_HEIGHT / 2);
    layer.appendChild(levelHeading, 3);

    // Scientists in sport logo 
    var sisLogo = new lime.Sprite().setFill(rb.GAME.SIS_LOGO).setSize(220, 57).setAnchorPoint(0, 0.5).setPosition(0 + padding, rb.GAME.HEADER_HEIGHT / 2);
    layer.appendChild(sisLogo, 5);

    // Level 1 heading
    var heading = new lime.Label().setText('instructions').setFontFamily(rb.GAME.FONT).setFontColor('#ffffff').setFontSize(48).
        setAlign('right').setAnchorPoint(1, 0).setSize(300, 50).setPosition(rb.WIDTH * 0.5 - (padding / 2), 160);

    layer.appendChild(heading, 5);

    var levelImage = new lime.Sprite().setFill(levelImage).setAnchorPoint(0.5, 0.5).setPosition(rb.WIDTH / 2, 400);
    layer.appendChild(levelImage, 1);

    var levelText = new lime.Label().setFontFamily(rb.GAME.FONT).setFontColor('#ffffff').setFontSize(24).
        setAlign('left').setAnchorPoint(0, 0).setSize(600, 150).setPosition(78, 600);


    levelText.setText(introText);

    layer.appendChild(levelText, 5);

    this.playButton = new rb.TileButton.type("play", eventTarget, rb.NAV.START_CONTINUE_UP, rb.NAV.START_CONTINUE_DOWN).setAnchorPoint(0.5, 0.5).setPosition(rb.WIDTH / 2, rb.GAME.BUTTON_Y);

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
