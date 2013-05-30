goog.provide('rb.GameEndScore');

/**
 * GameEndScore
 * @constructor
 * @extends lime.Scene
 */
rb.GameEndScore = function(level1, level2, level3, eventTarget) {
    lime.Scene.call(this);

    var layer = new lime.Layer().setPosition(0, 0);
    var padding = 16;
    var backgroundPadding = 5;

    if(rb.Mode.BACKGROUND_DEBUG)
    {
        var background = new lime.Sprite().setSize(rb.WIDTH,rb.HEIGHT).
            setFill(rb.Mode.BACKGROUND_COLOR).setAnchorPoint(0,0);
        layer.appendChild(background);
    }  

    var headerBackground = new lime.Sprite().setFill('assets/header.png').setAnchorPoint(0, 0).setPosition(0, 0);
    layer.appendChild(headerBackground, 1);

    this.appendChild(layer, 10);

    rb.Mode.DEBUG = false;

    function Dimensions(width, height)
    {
        this.width = width;
        this.height = height;
    }

    var h1Size = 48;
    var h2Size = 36;

    var scoreRect = new Dimensions(150, 75);
    var artRect = new Dimensions(220, 75);

    var scoreWindow = new lime.Layer().setPosition(30, 300);
    var reactionTimeWindow = new lime.Layer().setPosition(30, 300);

    var thumbSpacer = 175;
    var levelTextSpacer = 135;

    var levelTextColumn = new lime.Layer().setPosition(0, 0);
    var levelThumbColumn = new lime.Layer().setPosition(levelTextSpacer + scoreRect.width + (thumbSpacer / 2), 0);

    var scoreColumn = new lime.Layer().setPosition(levelTextSpacer, 0);
    var topScoreColumn = new lime.Layer().setPosition(levelTextSpacer + thumbSpacer + scoreRect.width, 0);

    var headerBackground = new lime.Sprite().setFill('assets/header.png').setAnchorPoint(0, 0).setPosition(0, 0);
    layer.appendChild(headerBackground, 10);

    console.log(level1.LEVEL_THUMB)

    /*************************/

    var levelScore1Thumb = new lime.Sprite().setFill(level1.LEVEL_THUMB).setAnchorPoint(0.5, 0).setPosition(0, 0);
    levelThumbColumn.appendChild(levelScore1Thumb, 10);

    var levelScore2Thumb = new lime.Sprite().setFill(level2.LEVEL_THUMB).setAnchorPoint(0.5, 0).setPosition(0, (artRect.height + padding));
    levelThumbColumn.appendChild(levelScore1Thumb, 11);

    var levelScore3Thumb = new lime.Sprite().setFill(level3.LEVEL_THUMB).setAnchorPoint(0.5, 0).setPosition(0, (artRect.height + padding) * 2);
    levelThumbColumn.appendChild(levelScore3Thumb, 12);

    scoreWindow.appendChild(levelThumbColumn);

    /*************************/

    var level1Text = new lime.Label().setText('level 1').setFontFamily(rb.GAME.FONT).setFontSize(h2Size).setAlign('right').setFontColor('#ffffff')
    .setAnchorPoint(0, 0).setPosition(0, (h2Size / 2));
    levelTextColumn.appendChild(level1Text, 10);

    var level2Text = new lime.Label().setText('level 2').setFontFamily(rb.GAME.FONT).setFontSize(h2Size).setAlign('right').setFontColor('#ffffff')
    .setAnchorPoint(0, 0).setPosition(0, (scoreRect.height + padding) + (h2Size / 2));
    levelTextColumn.appendChild(level2Text, 10);

    var level3Text = new lime.Label().setText('level 3').setFontFamily(rb.GAME.FONT).setFontSize(h2Size).setAlign('right').setFontColor('#ffffff')
    .setAnchorPoint(0, 0).setPosition(0, (scoreRect.height + padding) * 2 + (h2Size / 2));
    levelTextColumn.appendChild(level3Text, 10);

    scoreWindow.appendChild(levelTextColumn);

    /**********************/

    var scoreHeading = new lime.Label().setText('scores').setFontFamily(rb.GAME.FONT).setFontSize(h1Size).setAlign('left').setFontColor('#ffffff')
    .setAnchorPoint(0, 1).setPosition(0 + padding, 0 - scoreRect.height);

    scoreWindow.appendChild(scoreHeading, 10);

    /**********************/

    // Your score heading
    var yourScoreHeading = new lime.Label().setText('your results').setFontFamily(rb.GAME.FONT).setFontColor('#ffffff').setFontSize(24).
        setAlign('center').setAnchorPoint(0.5, 1).setSize(scoreRect.width + padding, 40).setPosition(scoreRect.width / 2, 0);

    // Your score background 1
    var yourScoreBackground1 = new lime.Sprite().setFill('#333333').setAnchorPoint(0, 0).setSize(scoreRect.width, scoreRect.height).setPosition(0, 0);


    // Score 1
    this.scoreText1 = new lime.Label().setText('000').setFontFamily(rb.GAME.FONT_NUMBERS).setFontColor('#ffffff').setFontSize(80).
        setAlign('center').setAnchorPoint(0, 0).setSize(scoreRect.width, scoreRect.height).setPosition(0, 0 - backgroundPadding);
    

    // Your score background 2
    var yourScoreBackground2 = new lime.Sprite().setFill('#333333').setAnchorPoint(0, 0).setSize(scoreRect.width, scoreRect.height).setPosition(0, scoreRect.height + padding);


    // Score 2
    this.scoreText2 = new lime.Label().setText('000').setFontFamily(rb.GAME.FONT_NUMBERS).setFontColor('#ffffff').setFontSize(80).
        setAlign('center').setAnchorPoint(0, 0).setSize(scoreRect.width, scoreRect.height).setPosition(0, scoreRect.height + padding - backgroundPadding);


    // Your score background 3
    var yourScoreBackground3 = new lime.Sprite().setFill('#333333').setAnchorPoint(0, 0).setSize(scoreRect.width, scoreRect.height).setPosition(0, (scoreRect.height + padding) * 2 );


    // Score 3
    this.scoreText3 = new lime.Label().setText('000').setFontFamily(rb.GAME.FONT_NUMBERS).setFontColor('#ffffff').setFontSize(80).
        setAlign('center').setAnchorPoint(0, 0).setSize(scoreRect.width, scoreRect.height).setPosition(0, (scoreRect.height + padding) * 2 - backgroundPadding);


    // Top score heading
    var topScoreHeading = new lime.Label().setText('highest results').setFontFamily(rb.GAME.FONT).setFontColor('#ffffff').setFontSize(24).
        setAlign('center').setAnchorPoint(0.5, 1).setSize(scoreRect.width + padding, 40).setPosition(scoreRect.width / 2, 0);


    // Top score background 1
    var topScoreBackground1 = new lime.Sprite().setFill('#333333').setAnchorPoint(0, 0).setSize(scoreRect.width, scoreRect.height).setPosition(0, 0);


    // Score 1
    this.topScoreText1 = new lime.Label().setText('000').setFontFamily(rb.GAME.FONT_NUMBERS).setFontColor('#ffffff').setFontSize(80).
        setAlign('center').setAnchorPoint(0, 0).setSize(scoreRect.width, scoreRect.height).setPosition(0, 0 - backgroundPadding);
  

    // Top score background 2
    var topScoreBackground2 = new lime.Sprite().setFill('#333333').setAnchorPoint(0, 0).setSize(scoreRect.width, scoreRect.height).setPosition(0, scoreRect.height + padding);


    // Score 2
    this.topScoreText2 = new lime.Label().setText('000').setFontFamily(rb.GAME.FONT_NUMBERS).setFontColor('#ffffff').setFontSize(80).
        setAlign('center').setAnchorPoint(0, 0).setSize(scoreRect.width, scoreRect.height).setPosition(0, scoreRect.height + padding - backgroundPadding);
    

    // Top score background 3
    var topScoreBackground3 = new lime.Sprite().setFill('#333333').setAnchorPoint(0, 0).setSize(scoreRect.width, scoreRect.height).setPosition(0, (scoreRect.height + padding) * 2 );


    // Score 3
    this.topScoreText3 = new lime.Label().setText('000').setFontFamily(rb.GAME.FONT_NUMBERS).setFontColor('#ffffff').setFontSize(80).
        setAlign('center').setAnchorPoint(0, 0).setSize(scoreRect.width, scoreRect.height).setPosition(0, (scoreRect.height + padding) * 2 - backgroundPadding);
    

    scoreWindow.appendChild(scoreColumn, 1);

    scoreColumn.appendChild(yourScoreHeading, 1);
    scoreColumn.appendChild(yourScoreBackground1, 1);
    scoreColumn.appendChild(this.scoreText1, 2);
    scoreColumn.appendChild(yourScoreBackground2, 1);
    scoreColumn.appendChild(this.scoreText2, 2);
    scoreColumn.appendChild(yourScoreBackground3, 1);
    scoreColumn.appendChild(this.scoreText3, 2);


    topScoreColumn.appendChild(topScoreHeading);
    topScoreColumn.appendChild(topScoreBackground1, 1);
    topScoreColumn.appendChild(this.topScoreText1, 2);
    topScoreColumn.appendChild(topScoreBackground2, 1);
    topScoreColumn.appendChild(this.topScoreText2, 2);
    topScoreColumn.appendChild(topScoreBackground3, 1);
    topScoreColumn.appendChild(this.topScoreText3, 2);

    scoreWindow.appendChild(topScoreColumn, 1);

    this.updateScoreLabel(this.scoreText1, level1.score);
    this.updateScoreLabel(this.scoreText2, level2.score);
    this.updateScoreLabel(this.scoreText3, level3.score);   

    this.updateScoreLabel(this.topScoreText1, level1.bestScore);
    this.updateScoreLabel(this.topScoreText2, level2.bestScore);
    this.updateScoreLabel(this.topScoreText3, level3.bestScore);   

    this.appendChild(scoreWindow);

    this.reactionTimesButton = new rb.TileButton.type("reaction times", eventTarget, rb.NAV.RESTART_UP, rb.NAV.RESTART_DOWN).setAnchorPoint(0.5, 0.5).setPosition(rb.WIDTH * 0.5, rb.HEIGHT * 0.85);
    layer.appendChild(this.reactionTimesButton);

    this.topScoreText1.setFontColor(level1.TEXT_HIGHLIGHT_COLOR);
    this.topScoreText2.setFontColor(level2.TEXT_HIGHLIGHT_COLOR);
    this.topScoreText3.setFontColor(level3.TEXT_HIGHLIGHT_COLOR);

    if(level1.score >= level1.bestScore)
        this.scoreText1.setFontColor(level1.TEXT_HIGHLIGHT_COLOR);

    if(level2.score >= level2.bestScore)
        this.scoreText2.setFontColor(level2.TEXT_HIGHLIGHT_COLOR);

    if(level3.score >= level3.bestScore)
        this.scoreText3.setFontColor(level3.TEXT_HIGHLIGHT_COLOR);
};


goog.inherits(rb.GameEndScore, lime.Scene);


rb.GameEndScore.prototype.updateScoreLabel = function(label, value)
{
    if(value < 10)
    {
        value = "00" + value;
    }    
    else if(value >= 10)
    {
        value = "0" + value;
    }   

   label.setText(value);
}


rb.GameEndScore.prototype.updateARTLabel = function(label, value)
{   
    if(value != 0)
    {
        value = parseInt(value * 10) / 10;

        if(parseInt(value) == value)
        label.setText(value + '.0');        
        else
        label.setText(value);
    }
    else
    {
        label.setText('00.0'); 
    }
}


