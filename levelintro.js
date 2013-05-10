goog.provide('rb.LevelIntro');

/**
 * LevelIntro
 * @constructor
 * @extends lime.Scene
 */
rb.LevelIntro = function(level, intoText, highestScore) {
    lime.Scene.call(this);

    var layer = new lime.Layer().setPosition(0, 0);

    if(rb.Mode.DEBUG)
    {
        var background = new lime.Sprite().setSize(rb.WIDTH,rb.HEIGHT).
            setFill('#272628').setAnchorPoint(0,0);
        layer.appendChild(background);
    }    

    var smallLogo = new lime.Sprite().setFill('assets/ingame-logo-x40y32-HexBG-272528.gif').setAnchorPoint(0, 0).setPosition(35, 35);
    layer.appendChild(smallLogo, 1);

    var highestScoreBackground = new lime.Sprite().setFill('#3a3b3c').setAnchorPoint(0, 0).setSize(80, 50).setPosition(600, 47);

    if(rb.Mode.DEBUG)
    highestScoreBackground.setStroke(new lime.fill.Stroke(1, '#ffffff'));

    layer.appendChild(highestScoreBackground, 3);

    var highestScore = new lime.Label().setText(highestScore).setFontFamily('Signika').setFontColor('#ffffff').setFontWeight(500).setFontSize(36).
        setAlign('center').setAnchorPoint(0, 0).setSize(80, 50).setPosition(600, 52);
    
    if(rb.Mode.DEBUG)
    highestScore.setStroke(new lime.fill.Stroke(1, '#ffffff'));

    layer.appendChild(highestScore, 3);

    var highestScoreText = new lime.Label().setText('highest score').setFontFamily('Signika').setFontColor('#ffffff').setFontWeight(300).setFontSize(36).
        setAlign('right').setAnchorPoint(1, 0).setSize(250, 50).setPosition(600, 50);

    if(rb.Mode.DEBUG)
    highestScoreText.setStroke(new lime.fill.Stroke(1, '#ffffff'));
           
    layer.appendChild(highestScoreText, 4);

    var level1Image = new lime.Sprite().setFill('assets/level1-instructions-x169y155-HexBG-272528.gif').setAnchorPoint(0, 0).setPosition(170, 150);
    layer.appendChild(level1Image, 1);

    var level1Heading = new lime.Label().setText(level).setFontFamily('Signika').setFontColor('#ffffff').setFontWeight(500).setFontSize(48).
        setAlign('right').setAnchorPoint(0, 0).setSize(160, 150).setPosition(50, 600);

    if(rb.Mode.DEBUG)
    level1Heading.setStroke(new lime.fill.Stroke(1, '#ffffff'))

    layer.appendChild(level1Heading, 5);

    var level1Text = new lime.Label().setFontFamily('Signika').setFontColor('#ffffff').setFontWeight(300).setFontSize(24).
        setAlign('left').setAnchorPoint(0, 0).setSize(400, 150).setPosition(225, 600);

    if(rb.Mode.DEBUG)
    level1Text.setStroke(new lime.fill.Stroke(1, '#ffffff'));

    level1Text.setText(intoText);

    layer.appendChild(level1Text, 5);

    this.playButton = new rb.TileButton.type("play").setAnchorPoint(0.5, 0.5).setPosition(rb.WIDTH / 2, rb.HEIGHT * 0.85);

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
