goog.provide('rb.GameEnd');

/**
 * GameEnd
 * @constructor
 * @extends lime.Scene
 */
rb.GameEnd = function(level1, level2, level3, eventTarget) {
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

    var background = new lime.Sprite().setSize(rb.WIDTH,rb.HEIGHT).
        setFill('#eeeeee').setAnchorPoint(0,0);
    layer.appendChild(background);

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

    var thumbSpacer = 100;
    var levelTextSpacer = 125;

    var levelTextColumn = new lime.Layer().setPosition(0, 0);
    var levelThumbColumn = new lime.Layer().setPosition((scoreRect.width * 2) + (scoreRect.width / 2), 0);

    var scoreColumn = new lime.Layer().setPosition(levelTextSpacer, 0);
    var topScoreColumn = new lime.Layer().setPosition(levelTextSpacer + thumbSpacer + scoreRect.width, 0);

    var artColumn = new lime.Layer().setPosition(levelTextSpacer, 0);
    var topARTColumn = new lime.Layer().setPosition(levelTextSpacer + thumbSpacer + artRect.width, 0);

    var headerBackground = new lime.Sprite().setFill('assets/header.png').setAnchorPoint(0, 0).setPosition(0, 0);
    layer.appendChild(headerBackground, 10);

    console.log(level1.LEVEL_THUMB)

    /*************************/

    /*
    var levelScore1Thumb = new lime.Sprite().setFill(level1.LEVEL_THUMB).setAnchorPoint(0.5, 0).setPosition(0, 0);
    levelThumbColumn.appendChild(levelScore1Thumb, 10);

    var levelScore2Thumb = new lime.Sprite().setFill(level2.LEVEL_THUMB).setAnchorPoint(0.5, 0).setPosition(0, (artRect.height + padding));
    levelThumbColumn.appendChild(levelScore1Thumb, 11);

    var levelScore3Thumb = new lime.Sprite().setFill(level3.LEVEL_THUMB).setAnchorPoint(0.5, 0).setPosition(0, (artRect.height + padding) * 2);
    levelThumbColumn.appendChild(levelScore3Thumb, 12);

    scoreWindow.appendChild(levelThumbColumn);

    levelThumbColumn.setPosition(levelTextSpacer + scoreRect.width + (thumbSpacer / 2), 0);
    */

    var levelART1Thumb = new lime.Sprite().setFill(level1.LEVEL_THUMB).setAnchorPoint(0.5, 0).setPosition(0, 0);
    levelThumbColumn.appendChild(levelART1Thumb, 10);

    var levelART2Thumb = new lime.Sprite().setFill(level2.LEVEL_THUMB).setAnchorPoint(0.5, 0).setPosition(0, (artRect.height + padding));
    levelThumbColumn.appendChild(levelART2Thumb, 11);

    var levelART3Thumb = new lime.Sprite().setFill(level3.LEVEL_THUMB).setAnchorPoint(0.5, 0).setPosition(0, (artRect.height + padding) * 2);
    levelThumbColumn.appendChild(levelART3Thumb, 12);

    levelThumbColumn.setPosition(levelTextSpacer + artRect.width + (thumbSpacer / 2), 0);

    reactionTimeWindow.appendChild(levelThumbColumn);

    /*************************/

    var level1Text = new lime.Label().setText('level 1').setFontFamily(rb.GAME.FONT).setFontSize(h2Size).setAlign('right').setFontColor('#ffffff')
    .setAnchorPoint(0, 0).setPosition(0 + padding, (h2Size / 2));
    levelTextColumn.appendChild(level1Text, 10);

    var level2Text = new lime.Label().setText('level 2').setFontFamily(rb.GAME.FONT).setFontSize(h2Size).setAlign('right').setFontColor('#ffffff')
    .setAnchorPoint(0, 0).setPosition(0 + padding, (scoreRect.height + padding) + (h2Size / 2));
    levelTextColumn.appendChild(level2Text, 10);

    var level3Text = new lime.Label().setText('level 3').setFontFamily(rb.GAME.FONT).setFontSize(h2Size).setAlign('right').setFontColor('#ffffff')
    .setAnchorPoint(0, 0).setPosition(0 + padding, (scoreRect.height + padding) * 2 + (h2Size / 2));
    levelTextColumn.appendChild(level3Text, 10);

    scoreWindow.appendChild(levelTextColumn);
    reactionTimeWindow.appendChild(levelTextColumn);

    /**********************/

    var scoreHeading = new lime.Label().setText('scores').setFontFamily(rb.GAME.FONT).setFontSize(h1Size).setAlign('left').setFontColor('#ffffff')
    .setAnchorPoint(0, 1).setPosition(0 + padding, 0 - scoreRect.height);

    scoreWindow.appendChild(scoreHeading, 10);

    /**********************/

    // Your score heading
    var yourScoreHeading = new lime.Label().setText('your results').setFontFamily(rb.GAME.FONT).setFontColor('#ffffff').setFontSize(24).
        setAlign('center').setAnchorPoint(0, 1).setSize(scoreRect.width, 40).setPosition(0, 0);

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
        setAlign('center').setAnchorPoint(0, 1).setSize(scoreRect.width, 40).setPosition(0, 0);


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
    

/*
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
*/





    /**********************/

    var reactionTimeHeading = new lime.Label().setText('reaction times (avg)').setFontFamily(rb.GAME.FONT).setFontSize(h1Size).setAlign('left').setFontColor('#ffffff')
    .setAnchorPoint(0, 1).setPosition(0 + padding, 0 - artRect.height);

    reactionTimeWindow.appendChild(reactionTimeHeading, 10);

    /**********************/

    // Your art heading
    var yourARTHeading = new lime.Label().setText('your reaction time').setFontFamily(rb.GAME.FONT).setFontColor('#ffffff').setFontSize(24).
        setAlign('center').setAnchorPoint(0, 1).setSize(artRect.width, 40).setPosition(0, 0);

    // Your score background 1
    var yourARTBackground1 = new lime.Sprite().setFill('#333333').setAnchorPoint(0, 0).setSize(artRect.width, artRect.height).setPosition(0, 0);


    // ART 1
    this.artText1 = new lime.Label().setText('00.0').setFontFamily(rb.GAME.FONT_NUMBERS).setFontColor('#ffffff').setFontSize(80).
        setAlign('center').setAnchorPoint(0, 0).setSize(artRect.width, artRect.height).setPosition(0, 0 - backgroundPadding);
    

    // Your ART background 2
    var yourARTBackground2 = new lime.Sprite().setFill('#333333').setAnchorPoint(0, 0).setSize(artRect.width, artRect.height).setPosition(0, artRect.height + padding);


    // ART 2
    this.artText2 = new lime.Label().setText('00.0').setFontFamily(rb.GAME.FONT_NUMBERS).setFontColor('#ffffff').setFontSize(80).
        setAlign('center').setAnchorPoint(0, 0).setSize(artRect.width, artRect.height).setPosition(0, artRect.height + padding - backgroundPadding);


    // Your ART background 3
    var yourARTBackground3 = new lime.Sprite().setFill('#333333').setAnchorPoint(0, 0).setSize(artRect.width, artRect.height).setPosition(0, (artRect.height + padding) * 2 );


    // ART 3
    this.artText3 = new lime.Label().setText('00.0').setFontFamily(rb.GAME.FONT_NUMBERS).setFontColor('#ffffff').setFontSize(80).
        setAlign('center').setAnchorPoint(0, 0).setSize(artRect.width, artRect.height).setPosition(0, (artRect.height + padding) * 2 - backgroundPadding);



    // Top ART heading
    var topARTHeading = new lime.Label().setText('highest results').setFontFamily(rb.GAME.FONT).setFontColor('#ffffff').setFontSize(24).
        setAlign('center').setAnchorPoint(0, 1).setSize(artRect.width, 40).setPosition(0, 0);


    // Top ART background 1
    var topARTBackground1 = new lime.Sprite().setFill('#333333').setAnchorPoint(0, 0).setSize(artRect.width, artRect.height).setPosition(0, 0);


    // ART 1
    this.topARTText1 = new lime.Label().setText('00.0').setFontFamily(rb.GAME.FONT_NUMBERS).setFontColor('#ffffff').setFontSize(80).
        setAlign('center').setAnchorPoint(0, 0).setSize(artRect.width, artRect.height).setPosition(0, 0 - backgroundPadding);
  

    // Top ART background 2
    var topARTBackground2 = new lime.Sprite().setFill('#333333').setAnchorPoint(0, 0).setSize(artRect.width, artRect.height).setPosition(0, artRect.height + padding);


    // ART 2
    this.topARTText2 = new lime.Label().setText('00.0').setFontFamily(rb.GAME.FONT_NUMBERS).setFontColor('#ffffff').setFontSize(80).
        setAlign('center').setAnchorPoint(0, 0).setSize(artRect.width, artRect.height).setPosition(0, artRect.height + padding - backgroundPadding);
    

    // Top ART background 3
    var topARTBackground3 = new lime.Sprite().setFill('#333333').setAnchorPoint(0, 0).setSize(artRect.width, artRect.height).setPosition(0, (artRect.height + padding) * 2 );


    // ART 3
    this.topARTText3 = new lime.Label().setText('00.0').setFontFamily(rb.GAME.FONT_NUMBERS).setFontColor('#ffffff').setFontSize(80).
        setAlign('center').setAnchorPoint(0, 0).setSize(artRect.width, artRect.height).setPosition(0, (artRect.height + padding) * 2 - backgroundPadding);
    

    artColumn.appendChild(yourARTHeading, 1);
    artColumn.appendChild(yourARTBackground1, 1);
    artColumn.appendChild(this.artText1, 2);
    artColumn.appendChild(yourARTBackground2, 1);
    artColumn.appendChild(this.artText2, 2);
    artColumn.appendChild(yourARTBackground3, 1);
    artColumn.appendChild(this.artText3, 2);
    
    reactionTimeWindow.appendChild(artColumn, 5);

    topARTColumn.appendChild(topARTHeading);
    topARTColumn.appendChild(topARTBackground1, 1);
    topARTColumn.appendChild(this.topARTText1, 2);
    topARTColumn.appendChild(topARTBackground2, 1);
    topARTColumn.appendChild(this.topARTText2, 2);
    topARTColumn.appendChild(topARTBackground3, 1);
    topARTColumn.appendChild(this.topARTText3, 2);

    reactionTimeWindow.appendChild(topARTColumn, 5);

    this.updateARTLabel(this.scoreText1, level1.art);
    this.updateARTLabel(this.scoreText2, level2.art);
    this.updateARTLabel(this.scoreText3, level3.art);

    this.updateARTLabel(this.topScoreText1, level1.bestART);
    this.updateARTLabel(this.topScoreText2, level2.bestART);
    this.updateARTLabel(this.topScoreText3, level3.bestART);

    // this.appendChild(scoreWindow);
    this.appendChild(reactionTimeWindow);











































    this.reactionTimesButton = new rb.TileButton.type("reaction times", eventTarget, rb.NAV.RESTART_UP, rb.NAV.RESTART_DOWN).setAnchorPoint(0.5, 0.5).setPosition(rb.WIDTH * 0.5, rb.HEIGHT * 0.85);
    layer.appendChild(this.reactionTimesButton);

    //////////////////////////////////

    /*

    // Your reaction time heading
    var yourReactionTimeHeading = new lime.Label().setFontFamily(rb.GAME.FONT).setFontSize(h2Size).setFontColor('#ffffff')
    .setAlign('center').setAnchorPoint(0, 0).setSize(artRect.width + 50, artRect.height).setPosition(0, - scoreRect.height);

    yourReactionTimeHeading.setText('reaction time');

    // artColumn.appendChild(yourReactionTimeHeading);


    // your average reaction time background 1
    var yourARTBackground1 = new lime.Sprite().setFill('#333333').setAnchorPoint(0, 0).setSize(artRect.width, artRect.height).setPosition(0, 0);

    artColumn.appendChild(yourARTBackground1, 1);


    // your average reaction time text
    this.yourARTText1 = new lime.Label().setText('000').setFontFamily(rb.GAME.FONT_NUMBERS).setFontColor('#77B800').setFontSize(80).
        setAlign('left').setAnchorPoint(0, 0).setSize(artRect.width, artRect.height).setPosition(0, 0 - backgroundPadding);

    artColumn.appendChild(this.yourARTText1, 2);
        

    var msText1 = new lime.Label().setText('ms').setFontFamily(rb.GAME.FONT).setFontColor('#ffffff').setFontSize(36).
        setAlign('right').setAnchorPoint(0, 0).setSize(artRect.width, artRect.height).setPosition(0 - backgroundPadding , 0 + backgroundPadding);
           
    artColumn.appendChild(msText1, 3);


    // your average reaction time background 2
    var yourARTBackground2 = new lime.Sprite().setFill('#333333').setAnchorPoint(0, 0).setSize(artRect.width, artRect.height).setPosition(0, (artRect.height + padding));

    artColumn.appendChild(yourARTBackground2, 1);


    // your average reaction time text
    this.yourARTText2 = new lime.Label().setText('000').setFontFamily(rb.GAME.FONT_NUMBERS).setFontColor('#77B800').setFontSize(80).
        setAlign('left').setAnchorPoint(0, 0).setSize(artRect.width, artRect.height).setPosition(0, (artRect.height + padding) - backgroundPadding);

    artColumn.appendChild(this.yourARTText2, 2);

    var msText2 = new lime.Label().setText('ms').setFontFamily(rb.GAME.FONT).setFontColor('#ffffff').setFontSize(36).
        setAlign('right').setAnchorPoint(0, 0).setSize(artRect.width, artRect.height).setPosition(0 - backgroundPadding , (artRect.height + padding) + backgroundPadding);
           
    artColumn.appendChild(msText2, 3);


    // your average reaction time background 3
    var yourARTBackground3 = new lime.Sprite().setFill('#333333').setAnchorPoint(0, 0).setSize(artRect.width, artRect.height).setPosition(0, (artRect.height + padding) * 2);

    artColumn.appendChild(yourARTBackground3, 1);


    // your average reaction time text
    this.yourARTText3 = new lime.Label().setText('000').setFontFamily(rb.GAME.FONT_NUMBERS).setFontColor('#77B800').setFontSize(80).
        setAlign('left').setAnchorPoint(0, 0).setSize(artRect.width, artRect.height).setPosition(0, (artRect.height + padding) * 2 - backgroundPadding);

    artColumn.appendChild(this.yourARTText3, 2);

    var msText3 = new lime.Label().setText('ms').setFontFamily(rb.GAME.FONT).setFontColor('#ffffff').setFontSize(36).
        setAlign('right').setAnchorPoint(0, 0).setSize(artRect.width, artRect.height).setPosition(0 - backgroundPadding , (artRect.height + padding) * 2 + backgroundPadding);
           
    artColumn.appendChild(msText3, 3);


    //////////////////////////


    // Top reaction time heading
    var topReactionTimeHeading = new lime.Label().setFontFamily(rb.GAME.FONT).setFontSize(h2Size).setFontColor('#ffffff')
    .setAlign('center').setAnchorPoint(0, 0).setSize(artRect.width + 50, artRect.height).setPosition(0, -scoreRect.height);

    topReactionTimeHeading.setText('reaction time');

    // topARTColumn.appendChild(topReactionTimeHeading);


    // top average reaction time background 1
    var topARTBackground1 = new lime.Sprite().setFill('#333333').setAnchorPoint(0, 0).setSize(artRect.width, artRect.height).setPosition(0, 0);

    topARTColumn.appendChild(topARTBackground1, 1);


    // top average reaction time text
    this.topARTText1 = new lime.Label().setText('000').setFontFamily(rb.GAME.FONT_NUMBERS).setFontColor('#77B800').setFontSize(80).
        setAlign('left').setAnchorPoint(0, 0).setSize(artRect.width, artRect.height).setPosition(0, 0 - backgroundPadding);

    topARTColumn.appendChild(this.topARTText1, 2);
        
    var msText4 = new lime.Label().setText('ms').setFontFamily(rb.GAME.FONT).setFontColor('#ffffff').setFontSize(36).
        setAlign('right').setAnchorPoint(0, 0).setSize(artRect.width, artRect.height).setPosition(0 - backgroundPadding , 0 + backgroundPadding);
           
    topARTColumn.appendChild(msText4, 3);

    // top average reaction time background 2
    var topARTBackground2 = new lime.Sprite().setFill('#333333').setAnchorPoint(0, 0).setSize(artRect.width, artRect.height).setPosition(0, (artRect.height + padding));

    topARTColumn.appendChild(topARTBackground2, 1);


    // top average reaction time text
    this.topARTText2 = new lime.Label().setText('000').setFontFamily(rb.GAME.FONT_NUMBERS).setFontColor('#77B800').setFontSize(80).
        setAlign('left').setAnchorPoint(0, 0).setSize(artRect.width, artRect.height).setPosition(0, (artRect.height + padding) - backgroundPadding);

    topARTColumn.appendChild(this.topARTText2, 2);

    var msText5 = new lime.Label().setText('ms').setFontFamily(rb.GAME.FONT).setFontColor('#ffffff').setFontSize(36).
        setAlign('right').setAnchorPoint(0, 0).setSize(artRect.width, artRect.height).setPosition(0 - backgroundPadding , (artRect.height + padding) - backgroundPadding);
           
    topARTColumn.appendChild(msText5, 3);


    // top average reaction time background 3
    var topARTBackground3 = new lime.Sprite().setFill('#333333').setAnchorPoint(0, 0).setSize(artRect.width, artRect.height).setPosition(0, (artRect.height + padding) * 2);

    topARTColumn.appendChild(topARTBackground3, 1);


    // top average reaction time text
    this.topARTText3 = new lime.Label().setText('000').setFontFamily(rb.GAME.FONT_NUMBERS).setFontColor('#77B800').setFontSize(80).
        setAlign('left').setAnchorPoint(0, 0).setSize(artRect.width, artRect.height).setPosition(0, (artRect.height + padding) * 2 - backgroundPadding);

    topARTColumn.appendChild(this.topARTText3, 2);

    var msText6 = new lime.Label().setText('ms').setFontFamily(rb.GAME.FONT).setFontColor('#ffffff').setFontSize(36).
        setAlign('right').setAnchorPoint(0, 0).setSize(artRect.width, artRect.height).setPosition(0 - backgroundPadding , (artRect.height + padding) * 2);
           
    topARTColumn.appendChild(msText6, 3);

    this.restartButton = new rb.TileButton.type("restart", eventTarget, rb.NAV.RESTART_UP, rb.NAV.RESTART_DOWN).setAnchorPoint(0.5, 0.5).setPosition(rb.WIDTH * 0.5, rb.HEIGHT * 0.85);

    layer.appendChild(this.restartButton, 8);

    this.appendChild(layer, 1);
    this.appendChild(scoreColumn, 2);
    this.appendChild(topScoreColumn, 3);
    this.appendChild(artColumn, 4);
    this.appendChild(topARTColumn, 4);
    
    this.yourARTText1.setText('00.1');
    this.yourARTText2.setText('00.2');
    this.yourARTText3.setText('00.3');

    this.topARTText1.setText('00.1');
    this.topARTText2.setText('00.2');
    this.topARTText3.setText('00.9');


    /*
    this.updateScoreLabel("");
    this.scoreText.setText("000"); // TEMP
    this.updateHighestScoreLabel("");
    this.highestScoreText.setText("000"); // TEMP
    this.updateYourARTLabel("1.1");
    this.updateBestARTLabel("1.1");
    */
};

goog.inherits(rb.GameEnd, lime.Scene);


rb.GameEnd.prototype.updateScoreLabel = function(label, value)
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


rb.GameEnd.prototype.updateARTLabel = function(label, value)
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


