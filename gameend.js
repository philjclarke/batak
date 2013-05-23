goog.provide('rb.GameEnd');

/**
 * GameEnd
 * @constructor
 * @extends lime.Scene
 */
rb.GameEnd = function(level1, level2, level3, eventTarget) {
    lime.Scene.call(this);

    var layer = new lime.Layer().setPosition(0, 0);
    var padding = 20;
    var backgroundPadding = 5;

    if(rb.Mode.DEBUG)
    {
        var background = new lime.Sprite().setSize(rb.WIDTH,rb.HEIGHT).
            setFill('#272628').setAnchorPoint(0,0);
        layer.appendChild(background);
    }

    var background = new lime.Sprite().setSize(rb.WIDTH,rb.HEIGHT).
        setFill('#eeeeee').setAnchorPoint(0,0);
    layer.appendChild(background);

    var headerBackground = new lime.Sprite().setFill('assets/header.png').setAnchorPoint(0, 0).setPosition(0, 0);
    layer.appendChild(headerBackground, 1);



    rb.Mode.DEBUG = true;

    function Dimensions(width, height)
    {
        this.width = width;
        this.height = height;
    }

    var scoreRect = new Dimensions(150, 75);
    var artRect = new Dimensions(180, 75);

    var scoreColumn = new lime.Layer().setPosition(0, 400);
    var topScoreColumn = new lime.Layer().setPosition(scoreRect.width + padding, 400);


    var artColumn = new lime.Layer().setPosition((scoreRect.width + padding) * 2, 400);
    var topARTColumn = new lime.Layer().setPosition((scoreRect.width + padding) * 3 + artRect.width, 400);






    /*
    // Your score heading
    var yourScoreHeading = new lime.Label().setText('your score').setFontFamily(rb.GAME.FONT).setFontColor('#ffffff').setFontSize(24).
        setAlign('right').setAnchorPoint(1, 0).setSize(75, 75).setPosition(rb.WIDTH * 0.15 - (padding / 2), 410);

    if(rb.Mode.DEBUG)
    yourScoreHeading.setStroke(new lime.fill.Stroke(1, '#ffffff'));

    scoreColumn.appendChild(yourScoreHeading);
    */

    // Your score background 1
    var yourScoreBackground1 = new lime.Sprite().setFill('#333333').setAnchorPoint(0, 0).setSize(scoreRect.width, scoreRect.height).setPosition(0 + padding, 0);

    if(rb.Mode.DEBUG)
    yourScoreBackground1.setStroke(new lime.fill.Stroke(1, '#ffffff'));

    scoreColumn.appendChild(yourScoreBackground1, 1);

    this.appendChild(scoreColumn);


    // Score 1
    this.scoreText1 = new lime.Label().setText('000').setFontFamily(rb.GAME.FONT_NUMBERS).setFontColor('#ffffff').setFontSize(80).
        setAlign('center').setAnchorPoint(0, 0).setSize(scoreRect.width, scoreRect.height).setPosition(0 + padding, 0 - backgroundPadding);
    
    if(rb.Mode.DEBUG)
    this.scoreText1.setStroke(new lime.fill.Stroke(1, '#ffffff'));

    scoreColumn.appendChild(this.scoreText1, 2);


    // Your score background 2
    var yourScoreBackground2 = new lime.Sprite().setFill('#333333').setAnchorPoint(0, 0).setSize(scoreRect.width, scoreRect.height).setPosition(0 + padding, scoreRect.height + padding);

    if(rb.Mode.DEBUG)
    yourScoreBackground2.setStroke(new lime.fill.Stroke(1, '#ffffff'));

    scoreColumn.appendChild(yourScoreBackground2, 1);


    // Score 2
    this.scoreText2 = new lime.Label().setText('000').setFontFamily(rb.GAME.FONT_NUMBERS).setFontColor('#ffffff').setFontSize(80).
        setAlign('center').setAnchorPoint(0, 0).setSize(scoreRect.width, scoreRect.height).setPosition(0 + padding, scoreRect.height + padding - backgroundPadding);
    
    if(rb.Mode.DEBUG)
    this.scoreText2.setStroke(new lime.fill.Stroke(1, '#ffffff'));

    scoreColumn.appendChild(this.scoreText2, 2);


    // Your score background 3
    var yourScoreBackground3 = new lime.Sprite().setFill('#333333').setAnchorPoint(0, 0).setSize(scoreRect.width, scoreRect.height).setPosition(0 + padding, (scoreRect.height + padding) * 2 );

    if(rb.Mode.DEBUG)
    yourScoreBackground3.setStroke(new lime.fill.Stroke(1, '#ffffff'));

    scoreColumn.appendChild(yourScoreBackground3, 1);


    // Score 3
    this.scoreText3 = new lime.Label().setText('000').setFontFamily(rb.GAME.FONT_NUMBERS).setFontColor('#ffffff').setFontSize(80).
        setAlign('center').setAnchorPoint(0, 0).setSize(scoreRect.width, scoreRect.height).setPosition(0 + padding, (scoreRect.height + padding) * 2 - backgroundPadding);
    
    if(rb.Mode.DEBUG)
    this.scoreText3.setStroke(new lime.fill.Stroke(1, '#ffffff'));

    scoreColumn.appendChild(this.scoreText3, 2);

    

    //////////////////////////////////

    // Top score background 1
    var topScoreBackground1 = new lime.Sprite().setFill('#333333').setAnchorPoint(0, 0).setSize(scoreRect.width, scoreRect.height).setPosition(0 + padding, 0);

    if(rb.Mode.DEBUG)
    topScoreBackground1.setStroke(new lime.fill.Stroke(1, '#ffffff'));

    topScoreColumn.appendChild(topScoreBackground1, 1);


    // Score 1
    this.topScoreText1 = new lime.Label().setText('000').setFontFamily(rb.GAME.FONT_NUMBERS).setFontColor('#ffffff').setFontSize(80).
        setAlign('center').setAnchorPoint(0, 0).setSize(scoreRect.width, scoreRect.height).setPosition(0 + padding, 0 - backgroundPadding);
    
    if(rb.Mode.DEBUG)
    this.topScoreText1.setStroke(new lime.fill.Stroke(1, '#ffffff'));

    topScoreColumn.appendChild(this.topScoreText1, 2);


    // Top score background 2
    var topScoreBackground2 = new lime.Sprite().setFill('#333333').setAnchorPoint(0, 0).setSize(scoreRect.width, scoreRect.height).setPosition(0 + padding, scoreRect.height + padding);

    if(rb.Mode.DEBUG)
    topScoreBackground2.setStroke(new lime.fill.Stroke(1, '#ffffff'));

    topScoreColumn.appendChild(topScoreBackground2, 1);


    // Score 2
    this.topScoreText2 = new lime.Label().setText('000').setFontFamily(rb.GAME.FONT_NUMBERS).setFontColor('#ffffff').setFontSize(80).
        setAlign('center').setAnchorPoint(0, 0).setSize(scoreRect.width, scoreRect.height).setPosition(0 + padding, scoreRect.height + padding - backgroundPadding);
    
    if(rb.Mode.DEBUG)
    this.topScoreText2.setStroke(new lime.fill.Stroke(1, '#ffffff'));

    topScoreColumn.appendChild(this.topScoreText2, 2);


    // Top score background 3
    var topScoreBackground3 = new lime.Sprite().setFill('#333333').setAnchorPoint(0, 0).setSize(scoreRect.width, scoreRect.height).setPosition(0 + padding, (scoreRect.height + padding) * 2 );

    if(rb.Mode.DEBUG)
    topScoreBackground3.setStroke(new lime.fill.Stroke(1, '#ffffff'));

    topScoreColumn.appendChild(topScoreBackground3, 1);


    // Score 3
    this.topScoreText3 = new lime.Label().setText('000').setFontFamily(rb.GAME.FONT_NUMBERS).setFontColor('#ffffff').setFontSize(80).
        setAlign('center').setAnchorPoint(0, 0).setSize(scoreRect.width, scoreRect.height).setPosition(0 + padding, (scoreRect.height + padding) * 2 - backgroundPadding);
    
    if(rb.Mode.DEBUG)
    this.topScoreText3.setStroke(new lime.fill.Stroke(1, '#ffffff'));

    topScoreColumn.appendChild(this.topScoreText3, 2);

    //////////////////////////











    this.appendChild(layer, 1);
    this.appendChild(scoreColumn, 2);
    this.appendChild(topScoreColumn, 3);

    
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
    console.log('value', value);

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
        this.yourARTText.setText('0.0'); 
    }    
}

rb.GameEnd.prototype.updateBestARTLabel = function(value)
{
    if(value != 0)
    {
        value = parseInt(value * 10) / 10;

        if(parseInt(value) == value)
        this.bestARTText.setText(value + '.0');        
        else
        this.bestARTText.setText(value);      
    }
    else
    {
        this.bestARTText.setText('0.0'); 
    } 
}
