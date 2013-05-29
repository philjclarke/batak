goog.provide('rb.LevelIntro');

/**
 * LevelIntro
 * @constructor
 * @extends lime.Scene
 */
rb.LevelIntro = function(level, introText, levelImage, levelThumb, highestScore, eventTarget) {
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

    // Level heading
    var levelHeading = new lime.Label().setText('level ' + level).setFontFamily('arial, sans-serif').setFontColor('#ffffff').setFontWeight(500).setFontSize(56).
        setAlign('left').setAnchorPoint(0, 0.5).setPosition(500, rb.GAME.HEADER_HEIGHT / 2);
    layer.appendChild(levelHeading, 3);


    // Game thumb
    var gameThumb = new lime.Sprite().setFill(levelThumb).setSize(76, 76).setAnchorPoint(1, 0.5).setPosition(500 - padding, rb.GAME.HEADER_HEIGHT / 2);
    layer.appendChild(gameThumb, 4);


    var level1Image = new lime.Sprite().setFill(levelImage).setAnchorPoint(0.5, 0.5).setPosition(rb.WIDTH / 2, 350);
    layer.appendChild(level1Image, 1);

    var level1Text = new lime.Label().setFontFamily(rb.GAME.FONT).setFontColor('#ffffff').setFontSize(24).
        setAlign('left').setAnchorPoint(0, 0).setSize(600, 150).setPosition(75, 600);

    if(rb.Mode.DEBUG)
    level1Text.setStroke(new lime.fill.Stroke(1, '#ffffff'));

    level1Text.setText(introText);

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
