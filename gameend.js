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
    // layer.appendChild(headerBackground, 1);


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

    var scoreColumn = new lime.Layer().setPosition(rb.WIDTH * 0.5 - scoreRect.width - 75, 100);
    var topScoreColumn = new lime.Layer().setPosition(rb.WIDTH * 0.5 + padding + 75, 100);

    var artColumn = new lime.Layer().setPosition(rb.WIDTH * 0.5 - artRect.width - 75, 450);
    var topARTColumn = new lime.Layer().setPosition(rb.WIDTH * 0.5 + padding + 75, 450);

    var headerBackground = new lime.Sprite().setFill('assets/header.png').setAnchorPoint(0, 0).setPosition(0, 0);
    // layer.appendChild(headerBackground, 10);


    var yourResultsHeading = new lime.Label().setText('your results').setFontFamily(rb.GAME.FONT).setFontSize(h1Size).setAlign('center').setFontColor('#ffffff')
    .setAnchorPoint(1, 1).setSize(350, 100).setPosition(rb.WIDTH * 0.5, 125);
    layer.appendChild(yourResultsHeading, 10);

    var bestResults = new lime.Label().setText('best results').setFontFamily(rb.GAME.FONT).setFontSize(h1Size).setAlign('center').setFontColor('#ffffff')
    .setAnchorPoint(0, 1).setSize(350, 100).setPosition(rb.WIDTH * 0.5, 125);
    layer.appendChild(bestResults, 10);

    var level1Image = new lime.Sprite().setFill('assets/green-blobs-small-490x19.png').setAnchorPoint(0.5, 0.5).setPosition(rb.WIDTH * 0.5, 200);
    layer.appendChild(level1Image, 10);
 

    // Your score heading
    var yourScoreHeading = new lime.Label().setText('score').setFontFamily(rb.GAME.FONT).setFontSize(h2Size).setFontColor('#ffffff')
    .setAnchorPoint(0, 0).setSize(scoreRect.width, scoreRect.height).setPosition(0, - scoreRect.height + 20);

    // scoreColumn.appendChild(yourScoreHeading);

    // Your score background 1
    var yourScoreBackground1 = new lime.Sprite().setFill('#333333').setAnchorPoint(0, 0).setSize(scoreRect.width, scoreRect.height).setPosition(0, 0);

    if(rb.Mode.DEBUG)
    yourScoreBackground1.setStroke(new lime.fill.Stroke(1, '#ffffff'));

    scoreColumn.appendChild(yourScoreBackground1, 1);


    // Score 1
    this.scoreText1 = new lime.Label().setText('000').setFontFamily(rb.GAME.FONT_NUMBERS).setFontColor('#ffffff').setFontSize(80).
        setAlign('center').setAnchorPoint(0, 0).setSize(scoreRect.width, scoreRect.height).setPosition(0, 0 - backgroundPadding);
    
    if(rb.Mode.DEBUG)
    this.scoreText1.setStroke(new lime.fill.Stroke(1, '#ffffff'));

    scoreColumn.appendChild(this.scoreText1, 2);


    // Your score background 2
    var yourScoreBackground2 = new lime.Sprite().setFill('#333333').setAnchorPoint(0, 0).setSize(scoreRect.width, scoreRect.height).setPosition(0, scoreRect.height + padding);

    if(rb.Mode.DEBUG)
    yourScoreBackground2.setStroke(new lime.fill.Stroke(1, '#ffffff'));

    scoreColumn.appendChild(yourScoreBackground2, 1);


    // Score 2
    this.scoreText2 = new lime.Label().setText('000').setFontFamily(rb.GAME.FONT_NUMBERS).setFontColor('#ffffff').setFontSize(80).
        setAlign('center').setAnchorPoint(0, 0).setSize(scoreRect.width, scoreRect.height).setPosition(0, scoreRect.height + padding - backgroundPadding);
    
    if(rb.Mode.DEBUG)
    this.scoreText2.setStroke(new lime.fill.Stroke(1, '#ffffff'));

    scoreColumn.appendChild(this.scoreText2, 2);


    // Your score background 3
    var yourScoreBackground3 = new lime.Sprite().setFill('#333333').setAnchorPoint(0, 0).setSize(scoreRect.width, scoreRect.height).setPosition(0, (scoreRect.height + padding) * 2 );

    if(rb.Mode.DEBUG)
    yourScoreBackground3.setStroke(new lime.fill.Stroke(1, '#ffffff'));

    scoreColumn.appendChild(yourScoreBackground3, 1);


    // Score 3
    this.scoreText3 = new lime.Label().setText('000').setFontFamily(rb.GAME.FONT_NUMBERS).setFontColor('#ffffff').setFontSize(80).
        setAlign('center').setAnchorPoint(0, 0).setSize(scoreRect.width, scoreRect.height).setPosition(0, (scoreRect.height + padding) * 2 - backgroundPadding);
    
    if(rb.Mode.DEBUG)
    this.scoreText3.setStroke(new lime.fill.Stroke(1, '#ffffff'));

    scoreColumn.appendChild(this.scoreText3, 2);


    //////////////////////////////////


    // Top score heading
    var topScoreHeading = new lime.Label().setFontFamily(rb.GAME.FONT).setFontSize(h2Size).setFontColor('#ffffff')
    .setAnchorPoint(0, 0).setSize(scoreRect.width, scoreRect.height).setPosition(0, - scoreRect.height);

    topScoreHeading.setText('score');

    // topScoreColumn.appendChild(topScoreHeading);


    // Top score background 1
    var topScoreBackground1 = new lime.Sprite().setFill('#333333').setAnchorPoint(0, 0).setSize(scoreRect.width, scoreRect.height).setPosition(0, 0);

    if(rb.Mode.DEBUG)
    topScoreBackground1.setStroke(new lime.fill.Stroke(1, '#ffffff'));

    topScoreColumn.appendChild(topScoreBackground1, 1);


    // Score 1
    this.topScoreText1 = new lime.Label().setText('000').setFontFamily(rb.GAME.FONT_NUMBERS).setFontColor('#ffffff').setFontSize(80).
        setAlign('center').setAnchorPoint(0, 0).setSize(scoreRect.width, scoreRect.height).setPosition(0, 0 - backgroundPadding);
    
    if(rb.Mode.DEBUG)
    this.topScoreText1.setStroke(new lime.fill.Stroke(1, '#ffffff'));

    topScoreColumn.appendChild(this.topScoreText1, 2);


    // Top score background 2
    var topScoreBackground2 = new lime.Sprite().setFill('#333333').setAnchorPoint(0, 0).setSize(scoreRect.width, scoreRect.height).setPosition(0, scoreRect.height + padding);

    if(rb.Mode.DEBUG)
    topScoreBackground2.setStroke(new lime.fill.Stroke(1, '#ffffff'));

    topScoreColumn.appendChild(topScoreBackground2, 1);


    // Score 2
    this.topScoreText2 = new lime.Label().setText('000').setFontFamily(rb.GAME.FONT_NUMBERS).setFontColor('#ffffff').setFontSize(80).
        setAlign('center').setAnchorPoint(0, 0).setSize(scoreRect.width, scoreRect.height).setPosition(0, scoreRect.height + padding - backgroundPadding);
    
    if(rb.Mode.DEBUG)
    this.topScoreText2.setStroke(new lime.fill.Stroke(1, '#ffffff'));

    topScoreColumn.appendChild(this.topScoreText2, 2);


    // Top score background 3
    var topScoreBackground3 = new lime.Sprite().setFill('#333333').setAnchorPoint(0, 0).setSize(scoreRect.width, scoreRect.height).setPosition(0, (scoreRect.height + padding) * 2 );

    if(rb.Mode.DEBUG)
    topScoreBackground3.setStroke(new lime.fill.Stroke(1, '#ffffff'));

    topScoreColumn.appendChild(topScoreBackground3, 1);


    // Score 3
    this.topScoreText3 = new lime.Label().setText('000').setFontFamily(rb.GAME.FONT_NUMBERS).setFontColor('#ffffff').setFontSize(80).
        setAlign('center').setAnchorPoint(0, 0).setSize(scoreRect.width, scoreRect.height).setPosition(0, (scoreRect.height + padding) * 2 - backgroundPadding);
    
    if(rb.Mode.DEBUG)
    this.topScoreText3.setStroke(new lime.fill.Stroke(1, '#ffffff'));

    topScoreColumn.appendChild(this.topScoreText3, 2);


    //////////////////////////


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

rb.GameEnd.prototype.updateScoreLabel = function(value)
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

rb.GameEnd.prototype.updateHighestScoreLabel = function(value)
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

rb.GameEnd.prototype.updateYourARTLabel = function(value)
{   
    if(value != 0)
    {
        value = parseInt(value * 10) / 10;

        if(parseInt(value) == value)
        this.yourARTText.setText(value + '.0');        
        else
        this.yourARTText.setText(value);
    }
    else
    {
        this.yourARTText.setText('00.0'); 
    }
}

rb.GameEnd.prototype.updateBestARTLabel = function(value)
{
    if(value != 0 && value != null)
    {
        value = parseInt(value * 10) / 10;

        if(parseInt(value) == value)
        this.bestARTText.setText(value + '.0');        
        else
        this.bestARTText.setText(value);      
    }
    else
    {
        this.bestARTText.setText('00.0'); 
    } 
}
