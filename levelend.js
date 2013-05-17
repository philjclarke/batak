goog.provide('rb.LevelEnd');

/**
 * LevelEnd
 * @constructor
 * @extends lime.Scene
 */
rb.LevelEnd = function(level, score, art, highestScore, art1) {
    lime.Scene.call(this);

    var layer = new lime.Layer().setPosition(0, 0);

    if(rb.Mode.DEBUG)
    {
        var background = new lime.Sprite().setSize(rb.WIDTH,rb.HEIGHT).
            setFill('#272628').setAnchorPoint(0,0);
        layer.appendChild(background);
    }    

    /*
    var headerBackground = new lime.Sprite().setFill('assets/header.png').setAnchorPoint(0, 0).setPosition(0, 0);
    layer.appendChild(headerBackground);
    */

    // Game thumb
    var gameThumb = new lime.Sprite().setFill('assets/green-blobs-small-490x19.png').setAnchorPoint(1, 0).setPosition(515, 30);

    if(rb.Mode.DEBUG)
    gameThumb.setStroke(new lime.fill.Stroke(1, '#ffffff'));    
    
    layer.appendChild(gameThumb, 4);


    // Level heading
    var level = 1; // TEMP
    var levelHeading = new lime.Label().setText('level ' + level).setFontFamily('arial, sans-serif').setFontColor('#ffffff').setFontWeight(500).setFontSize(48).
        setAlign('left').setAnchorPoint(0, 0).setSize(150, 50).setPosition(530, 20);
    
    if(rb.Mode.DEBUG)
    levelHeading.setStroke(new lime.fill.Stroke(1, '#ffffff'));

    layer.appendChild(levelHeading, 3);


    // Results heading
    var resultsHeading = new lime.Label().setText('results').setFontFamily(rb.GAME.FONT).setFontColor('#ffffff').setFontWeight(500).setFontSize(48).
        setAlign('right').setAnchorPoint(1, 0).setSize(180, 50).setPosition(270, 222);

    if(rb.Mode.DEBUG)
    resultsHeading.setStroke(new lime.fill.Stroke(1, '#ffffff'))

    layer.appendChild(resultsHeading, 5);


    // Results text
    var resultsText = new lime.Label().setFontFamily(rb.GAME.FONT).setFontColor('#ffffff').setFontSize(24).
        setAlign('left').setAnchorPoint(0, 0).setSize(350, 100).setPosition(310, 222);

    if(rb.Mode.DEBUG)
    resultsText.setStroke(new lime.fill.Stroke(1, '#ffffff'));

    layer.appendChild(resultsText, 6);

    resultsText.setText(rb.RESULTS.INTRO_TEXT);


    // Your score heading
    var yourScoreHeading = new lime.Label().setText('your score').setFontFamily('FrutigerNeue1450W01-Reg').setFontColor('#ffffff').setFontSize(24).
        setAlign('right').setAnchorPoint(1, 0).setSize(100, 60).setPosition(200, 410);

    if(rb.Mode.DEBUG)
    yourScoreHeading.setStroke(new lime.fill.Stroke(1, '#ffffff'));

    layer.appendChild(yourScoreHeading);


    // Your score background
    var yourScoreBackground = new lime.Sprite().setFill('#333333').setAnchorPoint(0, 0).setSize(115, 60).setPosition(215, 410);

    if(rb.Mode.DEBUG)
    yourScoreBackground.setStroke(new lime.fill.Stroke(1, '#ffffff'));

    layer.appendChild(yourScoreBackground, 1);


    // Score
    this.scoreText = new lime.Label().setText('000').setFontFamily(rb.GAME.FONT_NUMBERS).setFontColor('#ffffff').setFontSize(48).
        setAlign('center').setAnchorPoint(0, 0).setSize(115, 60).setPosition(215, 410);
    
    if(rb.Mode.DEBUG)
    this.scoreText.setStroke(new lime.fill.Stroke(1, '#ffffff'));

    layer.appendChild(this.scoreText, 2);









    /*

    var yourScoreHeading = new lime.Label().setText('your score').setFontFamily('FrutigerNeue1450W01-Reg').setFontColor('#ffffff').setFontSize(36).
        setAlign('right').setAnchorPoint(1, 0).setSize(160, 50).setPosition(200, 410);

    if(rb.Mode.DEBUG)
    yourScoreHeading.setStroke(new lime.fill.Stroke(1, '#ffffff'));


    var yourScoreBackground = new lime.Sprite().setFill('#333333').setAnchorPoint(0, 0).setSize(80, 50).setPosition(205, 410);

    if(rb.Mode.DEBUG)
    yourScoreBackground.setStroke(new lime.fill.Stroke(1, '#ffffff'));

    




    var artHeading = new lime.Label().setText('your average reaction time').setFontFamily('FrutigerNeue1450W01-Reg').setFontColor('#ffffff').setFontSize(36).
        setAlign('right').setAnchorPoint(1, 0).setSize(160, 50).setPosition(505, 410);

    if(rb.Mode.DEBUG)
    artHeading.setStroke(new lime.fill.Stroke(1, '#ffffff'));


    var artBackground = new lime.Sprite().setFill('#333333').setAnchorPoint(0, 0).setSize(80, 50).setPosition(510, 410);

    if(rb.Mode.DEBUG)
    artBackground.setStroke(new lime.fill.Stroke(1, '#ffffff'));






    var highestScoreHeading = new lime.Label().setText('highest score').setFontFamily('FrutigerNeue1450W01-Reg').setFontColor('#ffffff').setFontSize(36).
        setAlign('right').setAnchorPoint(1, 0).setSize(160, 50).setPosition(200, 515);

    if(rb.Mode.DEBUG)
    highestScoreHeading.setStroke(new lime.fill.Stroke(1, '#ffffff'));

    this.highestScoreText = new lime.Label().setText('000').setFontFamily('FrutigerNeue1450W01-Reg').setFontColor('#ffffff').setFontSize(36).
        setAlign('left').setAnchorPoint(0, 0).setSize(160, 50).setPosition(205, 515);
        
    if(rb.Mode.DEBUG)
    this.highestScoreText.setStroke(new lime.fill.Stroke(1, '#ffffff'));






    var bartHeading = new lime.Label().setText('best average reaction time').setFontFamily('FrutigerNeue1450W01-Reg').setFontColor('#ffffff').setFontSize(36).
        setAlign('right').setAnchorPoint(1, 0).setSize(160, 50).setPosition(505, 515);

    if(rb.Mode.DEBUG)
    bartHeading.setStroke(new lime.fill.Stroke(1, '#ffffff'));

    this.bartText = new lime.Label().setText('000').setFontFamily('FrutigerNeue1450W01-Reg').setFontColor('#ffffff').setFontSize(36).
        setAlign('left').setAnchorPoint(0, 0).setSize(160, 50).setPosition(510, 515);

    if(rb.Mode.DEBUG)
    this.bartText.setStroke(new lime.fill.Stroke(1, '#ffffff'));


    layer.appendChild(yourScoreHeading);
    layer.appendChild(highestScoreHeading);
    layer.appendChild(this.highestScoreText);
    layer.appendChild(artHeading);
    layer.appendChild(bartHeading);
    layer.appendChild(this.bartText);
    layer.appendChild(artBackground);
    layer.appendChild(yourScoreBackground);




    this.restartButton = new rb.TileButton.type("restart level").setAnchorPoint(0.5, 0.5).setPosition(207,790);

    layer.appendChild(this.restartButton, 8);

    // Need coordinates
    this.playButton = new rb.TileButton.type("play").setAnchorPoint(0.5, 0.5).setPosition(515,790);

    layer.appendChild(this.playButton, 7);
    
        

    */

    this.appendChild(layer);
};

goog.inherits(rb.LevelEnd, lime.Scene);

/**
 * Returns event target. Dispatches events
 */
rb.LevelEnd.prototype.getEventTarget = function() {

   //  return this.playButton.getEventTarget();
};
