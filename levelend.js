goog.provide('rb.LevelEnd');

/**
 * LevelEnd
 * @constructor
 * @extends lime.Scene
 */
rb.LevelEnd = function(level, score, art, highestScore, art1) {
    lime.Scene.call(this);

    var layer = new lime.Layer().setPosition(0, 0);
    var padding = 20;

    if(rb.Mode.DEBUG)
    {
        var background = new lime.Sprite().setSize(rb.WIDTH,rb.HEIGHT).
            setFill('#272628').setAnchorPoint(0,0);
        layer.appendChild(background);
    }    

    var headerBackground = new lime.Sprite().setFill('assets/header.png').setAnchorPoint(0, 0).setPosition(0, 0);
    layer.appendChild(headerBackground, 1);

    var backgroundHeight = headerBackground.getSize().height;

    // Level heading
    var level = 1; // TEMP
    var levelHeading = new lime.Label().setText('level ' + level).setFontFamily('arial, sans-serif').setFontColor('#ffffff').setFontWeight(500).setFontSize(48).
        setAlign('left').setAnchorPoint(0, 0.5).setSize(150, 50).setPosition(530, backgroundHeight / 2);
    
    if(rb.Mode.DEBUG)
    levelHeading.setStroke(new lime.fill.Stroke(1, '#ffffff'));

    layer.appendChild(levelHeading, 3);

    // Game thumb
    var gameThumb = new lime.Sprite().setFill('assets/green-blobs-small-490x19.png').setAnchorPoint(1, 0.5).setPosition(530 - padding, backgroundHeight / 2);

    if(rb.Mode.DEBUG)
    gameThumb.setStroke(new lime.fill.Stroke(1, '#ffffff'));    
    
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
        setAlign('right').setAnchorPoint(1, 0).setSize(75, 75).setPosition(rb.WIDTH * 0.2 - (padding / 2), 410);

    if(rb.Mode.DEBUG)
    yourScoreHeading.setStroke(new lime.fill.Stroke(1, '#ffffff'));

    layer.appendChild(yourScoreHeading);


    // Your score background
    var yourScoreBackground = new lime.Sprite().setFill('#333333').setAnchorPoint(0, 0).setSize(150, 75).setPosition(rb.WIDTH * 0.2 + (padding / 2), 410);

    if(rb.Mode.DEBUG)
    yourScoreBackground.setStroke(new lime.fill.Stroke(1, '#ffffff'));

    layer.appendChild(yourScoreBackground, 1);


    // Score
    this.scoreText = new lime.Label().setText('000').setFontFamily(rb.GAME.FONT_NUMBERS).setFontColor('#ffffff').setFontSize(80).
        setAlign('center').setAnchorPoint(0, 0).setSize(150, 75).setPosition(rb.WIDTH * 0.2 + padding / 2, 410);
    
    if(rb.Mode.DEBUG)
    this.scoreText.setStroke(new lime.fill.Stroke(1, '#ffffff'));

    layer.appendChild(this.scoreText, 2);


    // Your average reaction time heading
    var yourARTHeading = new lime.Label().setText('your average reaction time').setFontFamily(rb.GAME.FONT).setFontColor('#ffffff').setFontSize(24).
        setAlign('right').setAnchorPoint(1, 0).setSize(150, 75).setPosition(rb.WIDTH * 0.7 - (padding / 2), 410);

    if(rb.Mode.DEBUG)
    yourARTHeading.setStroke(new lime.fill.Stroke(1, '#ffffff'));

    layer.appendChild(yourARTHeading);


    // Your average reaction time background
    var yourARTBackground = new lime.Sprite().setFill('#333333').setAnchorPoint(0, 0).setSize(150, 75).setPosition(rb.WIDTH * 0.7 + (padding / 2), 410);

    if(rb.Mode.DEBUG)
    yourARTBackground.setStroke(new lime.fill.Stroke(1, '#ffffff'));

    layer.appendChild(yourARTBackground, 1);

    // Your average reaction time text
    this.yourARTText = new lime.Label().setText('000').setFontFamily(rb.GAME.FONT_NUMBERS).setFontColor('#ffffff').setFontSize(80).
        setAlign('center').setAnchorPoint(0, 0).setSize(150, 75).setPosition(rb.WIDTH * 0.7 + padding / 2, 410);
    
    if(rb.Mode.DEBUG)
    this.yourARTText.setStroke(new lime.fill.Stroke(1, '#ffffff'));

    layer.appendChild(this.yourARTText, 2);

    ///////////////////////////////

    // Your score heading
    var highestScoreHeading = new lime.Label().setText('your score').setFontFamily(rb.GAME.FONT).setFontColor('#77B800').setFontSize(24).
        setAlign('right').setAnchorPoint(1, 0).setSize(75, 75).setPosition(rb.WIDTH * 0.2 - (padding / 2), 500);

    if(rb.Mode.DEBUG)
    highestScoreHeading.setStroke(new lime.fill.Stroke(1, '#77B800'));

    layer.appendChild(highestScoreHeading);


    // Your score background
    var highestScoreBackground = new lime.Sprite().setFill('#333333').setAnchorPoint(0, 0).setSize(150, 75).setPosition(rb.WIDTH * 0.2 + (padding / 2), 500);

    if(rb.Mode.DEBUG)
    highestScoreBackground.setStroke(new lime.fill.Stroke(1, '#77B800'));

    layer.appendChild(highestScoreBackground, 1);


    // Score
    this.highestScoreText = new lime.Label().setText('000').setFontFamily(rb.GAME.FONT_NUMBERS).setFontColor('#77B800').setFontSize(80).
        setAlign('center').setAnchorPoint(0, 0).setSize(150, 75).setPosition(rb.WIDTH * 0.2 + padding / 2, 500);
    
    if(rb.Mode.DEBUG)
    this.highestScoreText.setStroke(new lime.fill.Stroke(1, '#77B800'));

    layer.appendChild(this.highestScoreText, 2);


    // Your average reaction time heading
    var bestARTHeading = new lime.Label().setText('best average reaction time').setFontFamily(rb.GAME.FONT).setFontColor('#77B800').setFontSize(24).
        setAlign('right').setAnchorPoint(1, 0).setSize(150, 75).setPosition(rb.WIDTH * 0.7 - (padding / 2), 500);

    if(rb.Mode.DEBUG)
    bestARTHeading.setStroke(new lime.fill.Stroke(1, '#77B800'));

    layer.appendChild(bestARTHeading);


    // best average reaction time background
    var bestARTBackground = new lime.Sprite().setFill('#333333').setAnchorPoint(0, 0).setSize(150, 75).setPosition(rb.WIDTH * 0.7 + (padding / 2), 500);

    if(rb.Mode.DEBUG)
    bestARTBackground.setStroke(new lime.fill.Stroke(1, '#77B800'));

    layer.appendChild(bestARTBackground, 1);




    // best average reaction time text
    this.bestARTText = new lime.Label().setText('000').setFontFamily(rb.GAME.FONT_NUMBERS).setFontColor('#77B800').setFontSize(80).
        setAlign('center').setAnchorPoint(0, 0).setSize(150, 75).setPosition(rb.WIDTH * 0.7 + padding / 2, 500);
    
    if(rb.Mode.DEBUG)
    this.bestARTText.setStroke(new lime.fill.Stroke(1, '#77B800'));

    layer.appendChild(this.bestARTText, 2);


    this.restartButton = new rb.TileButton.type("restart level").setAnchorPoint(0.5, 0.5).setPosition(rb.WIDTH * 0.25, 790);

    layer.appendChild(this.restartButton, 8);

    // Need coordinates
    this.playButton = new rb.TileButton.type("play").setAnchorPoint(0.5, 0.5).setPosition(rb.WIDTH * 0.75, 790);

    layer.appendChild(this.playButton, 7);
    

    this.appendChild(layer);
};

goog.inherits(rb.LevelEnd, lime.Scene);

/**
 * Returns event target. Dispatches events
 */
rb.LevelEnd.prototype.getEventTarget = function() {

   //  return this.playButton.getEventTarget();
};
