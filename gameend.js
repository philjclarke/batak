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
    var backgroundPadding = 15;

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

    var thumbSpacer = 100;
    var levelTextSpacer = 135;

    var levelTextColumn = new lime.Layer().setPosition(0, 0);
    var levelThumbColumn = new lime.Layer().setPosition((scoreRect.width * 2) + (scoreRect.width / 2), 0);

    var scoreColumn = new lime.Layer().setPosition(levelTextSpacer, 0);
    var topScoreColumn = new lime.Layer().setPosition(levelTextSpacer + thumbSpacer + scoreRect.width, 0);

    var artColumn = new lime.Layer().setPosition(levelTextSpacer, 0);
    var topARTColumn = new lime.Layer().setPosition(levelTextSpacer + thumbSpacer + artRect.width, 0);

    var backgroundYourScore = '#615952';
    
    var headerBackground = new lime.Sprite().setFill('assets/header.png').setAnchorPoint(0, 0).setPosition(0, 0);
    layer.appendChild(headerBackground, 10);

    // Scientists in sport logo 
    var sisLogo = new lime.Sprite().setFill(rb.GAME.SIS_LOGO).setSize(220, 57).setAnchorPoint(0, 0.5).setPosition(0 + padding, rb.GAME.HEADER_HEIGHT / 2);
    layer.appendChild(sisLogo, 5);

    /*************************/

    var levelART1Thumb = new lime.Sprite().setFill(level1.LEVEL_THUMB).setAnchorPoint(0.5, 0).setPosition(0, 0);
    levelThumbColumn.appendChild(levelART1Thumb, 10);

    var levelART2Thumb = new lime.Sprite().setFill(level2.LEVEL_THUMB).setAnchorPoint(0.5, 0).setPosition(0, (artRect.height + padding));
    levelThumbColumn.appendChild(levelART2Thumb, 11);

    var levelART3Thumb = new lime.Sprite().setFill(level3.LEVEL_THUMB).setAnchorPoint(0.5, 0).setPosition(0, (artRect.height + padding) * 2);
    levelThumbColumn.appendChild(levelART3Thumb, 12);

    levelThumbColumn.setPosition(levelTextSpacer + artRect.width + (thumbSpacer / 2), 0);

    reactionTimeWindow.appendChild(levelThumbColumn);

    /*************************/

    var level1Text = new lime.Label().setText('level 1').setFontFamily(rb.GAME.FONT).setFontSize(h2Size).setAlign('left').setFontColor('#ffffff')
    .setAnchorPoint(0, 0).setSize(levelTextSpacer, 100).setPosition(0, (h2Size / 2));
    levelTextColumn.appendChild(level1Text, 10);

    var level2Text = new lime.Label().setText('level 2').setFontFamily(rb.GAME.FONT).setFontSize(h2Size).setAlign('left').setFontColor('#ffffff')
    .setAnchorPoint(0, 0).setSize(levelTextSpacer, 100).setPosition(0, (scoreRect.height + padding) + (h2Size / 2));
    levelTextColumn.appendChild(level2Text, 10);

    var level3Text = new lime.Label().setText('level 3').setFontFamily(rb.GAME.FONT).setFontSize(h2Size).setAlign('left').setFontColor('#ffffff')
    .setAnchorPoint(0, 0).setSize(levelTextSpacer, 100).setPosition(0, (scoreRect.height + padding) * 2 + (h2Size / 2));
    levelTextColumn.appendChild(level3Text, 10);

    reactionTimeWindow.appendChild(levelTextColumn);

    /**********************/

    var reactionTimeHeading = new lime.Label().setText('reaction times (avg)').setFontFamily(rb.GAME.FONT).setFontSize(h1Size).setAlign('left').setFontColor('#ffffff')
    .setSize(500, 50).setAnchorPoint(0, 1).setPosition(0 + padding, 0 - artRect.height);

    reactionTimeWindow.appendChild(reactionTimeHeading, 10);

    /**********************/

    // Your art heading
    var yourARTHeading = new lime.Label().setText('your reaction times').setFontFamily(rb.GAME.FONT).setFontColor('#ffffff').setFontSize(24).
        setAlign('left').setAnchorPoint(0.5, 1).setSize(artRect.width, 40).setPosition(artRect.width / 2, 0);

    // Your score background 1
    var yourARTBackground1 = new lime.Sprite().setFill(backgroundYourScore).setAnchorPoint(0, 0).setSize(artRect.width, artRect.height).setPosition(0, 0);


    // ART 1
    this.artText1 = new lime.Label().setText('00.0').setFontFamily(rb.GAME.FONT_NUMBERS).setFontColor('#ffffff').setFontSize(72).
        setAlign('left').setAnchorPoint(0, 0).setSize(artRect.width, artRect.height).setPosition(0 + backgroundPadding, 0);

    // Your ART background 2
    var yourARTBackground2 = new lime.Sprite().setFill(backgroundYourScore).setAnchorPoint(0, 0).setSize(artRect.width, artRect.height).setPosition(0, artRect.height + padding);


    // ART 2
    this.artText2 = new lime.Label().setText('00.0').setFontFamily(rb.GAME.FONT_NUMBERS).setFontColor('#ffffff').setFontSize(72).
        setAlign('left').setAnchorPoint(0, 0).setSize(artRect.width, artRect.height).setPosition(0 + backgroundPadding, artRect.height + padding);


    // Your ART background 3
    var yourARTBackground3 = new lime.Sprite().setFill(backgroundYourScore).setAnchorPoint(0, 0).setSize(artRect.width, artRect.height).setPosition(0, (artRect.height + padding) * 2 );


    // ART 3
    this.artText3 = new lime.Label().setText('00.0').setFontFamily(rb.GAME.FONT_NUMBERS).setFontColor('#ffffff').setFontSize(72).
        setAlign('left').setAnchorPoint(0, 0).setSize(artRect.width, artRect.height).setPosition(0 + backgroundPadding, (artRect.height + padding) * 2);


    // Top ART heading
    var topARTHeading = new lime.Label().setText('highest reaction times').setFontFamily(rb.GAME.FONT).setFontColor('#ffffff').setFontSize(24).
        setAlign('left').setAnchorPoint(0.5, 1).setSize(artRect.width + 50, 40).setPosition(artRect.width / 2, 0);


    // Top ART background 1
    var topARTBackground1 = new lime.Sprite().setFill('#333333').setAnchorPoint(0, 0).setSize(artRect.width, artRect.height).setPosition(0, 0);


    // ART 1
    this.topARTText1 = new lime.Label().setText('00.0').setFontFamily(rb.GAME.FONT_NUMBERS).setFontColor('#ffffff').setFontSize(72).
        setAlign('left').setAnchorPoint(0, 0).setSize(artRect.width, artRect.height).setPosition(0 + backgroundPadding, 0);
  

    // Top ART background 2
    var topARTBackground2 = new lime.Sprite().setFill('#333333').setAnchorPoint(0, 0).setSize(artRect.width, artRect.height).setPosition(0, artRect.height + padding);


    // ART 2
    this.topARTText2 = new lime.Label().setText('00.0').setFontFamily(rb.GAME.FONT_NUMBERS).setFontColor('#ffffff').setFontSize(72).
        setAlign('left').setAnchorPoint(0, 0).setSize(artRect.width, artRect.height).setPosition(0 + backgroundPadding, artRect.height + padding);
    

    // Top ART background 3
    var topARTBackground3 = new lime.Sprite().setFill('#333333').setAnchorPoint(0, 0).setSize(artRect.width, artRect.height).setPosition(0, (artRect.height + padding) * 2 );


    // ART 3
    this.topARTText3 = new lime.Label().setText('00.0').setFontFamily(rb.GAME.FONT_NUMBERS).setFontColor('#ffffff').setFontSize(72).
        setAlign('left').setAnchorPoint(0, 0).setSize(artRect.width, artRect.height).setPosition(0 + backgroundPadding, (artRect.height + padding) * 2);

    var msText1 = new lime.Label().setText('s').setFontFamily(rb.GAME.FONT).setFontColor('#ffffff').setFontSize(72).
        setAlign('right').setAnchorPoint(0, 0).setSize(artRect.width, artRect.height).setPosition(0 - backgroundPadding, 0);

    var msText2 = new lime.Label().setText('s').setFontFamily(rb.GAME.FONT).setFontColor('#ffffff').setFontSize(72).
        setAlign('right').setAnchorPoint(0, 0).setSize(artRect.width, artRect.height).setPosition(0 - backgroundPadding, (artRect.height + padding));

    var msText3 = new lime.Label().setText('s').setFontFamily(rb.GAME.FONT).setFontColor('#ffffff').setFontSize(72).
        setAlign('right').setAnchorPoint(0, 0).setSize(artRect.width, artRect.height).setPosition(0 - backgroundPadding, (artRect.height + padding) * 2);

    var msText4 = new lime.Label().setText('s').setFontFamily(rb.GAME.FONT).setFontColor(level1.TEXT_HIGHLIGHT_COLOR).setFontSize(72).
        setAlign('right').setAnchorPoint(0, 0).setSize(artRect.width, artRect.height).setPosition(0 - backgroundPadding, 0);

    var msText5 = new lime.Label().setText('s').setFontFamily(rb.GAME.FONT).setFontColor(level2.TEXT_HIGHLIGHT_COLOR).setFontSize(72).
        setAlign('right').setAnchorPoint(0, 0).setSize(artRect.width, artRect.height).setPosition(0 - backgroundPadding, (artRect.height + padding));

    var msText6 = new lime.Label().setText('s').setFontFamily(rb.GAME.FONT).setFontColor(level3.TEXT_HIGHLIGHT_COLOR).setFontSize(72).
        setAlign('right').setAnchorPoint(0, 0).setSize(artRect.width, artRect.height).setPosition(0 - backgroundPadding, (artRect.height + padding) * 2);  


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
   
    artColumn.appendChild(msText1, 6);
    artColumn.appendChild(msText2, 6);
    artColumn.appendChild(msText3, 6);

    topARTColumn.appendChild(msText4, 6);
    topARTColumn.appendChild(msText5, 6);
    topARTColumn.appendChild(msText6, 6);

    reactionTimeWindow.appendChild(topARTColumn, 5);

    this.updateARTLabel(this.artText1, level1.art);
    this.updateARTLabel(this.artText2, level2.art);
    this.updateARTLabel(this.artText3, level3.art);

    this.updateARTLabel(this.topARTText1, level1.bestART);
    this.updateARTLabel(this.topARTText2, level2.bestART);
    this.updateARTLabel(this.topARTText3, level3.bestART);

    // this.appendChild(scoreWindow);
    this.appendChild(reactionTimeWindow);

    this.topARTText1.setFontColor(level1.TEXT_HIGHLIGHT_COLOR);
    this.topARTText2.setFontColor(level2.TEXT_HIGHLIGHT_COLOR);
    this.topARTText3.setFontColor(level3.TEXT_HIGHLIGHT_COLOR);

    if(level1.art <= level1.bestART)
    {
        this.artText1.setFontColor(level1.TEXT_HIGHLIGHT_COLOR);
        msText1.setFontColor(level1.TEXT_HIGHLIGHT_COLOR);
    }    
        
    if(level2.art <= level2.bestART)
    {
        this.artText2.setFontColor(level2.TEXT_HIGHLIGHT_COLOR);
        msText2.setFontColor(level2.TEXT_HIGHLIGHT_COLOR);
    }    
        
    if(level3.art <= level3.bestART)
    {
        this.artText3.setFontColor(level3.TEXT_HIGHLIGHT_COLOR);
        msText3.setFontColor(level3.TEXT_HIGHLIGHT_COLOR);
    }    
        
    this.restartButton = new rb.TileButton.type("scores", eventTarget, rb.NAV.RESTART_UP, rb.NAV.RESTART_DOWN).setAnchorPoint(0.5, 0.5).setPosition(rb.WIDTH * 0.25, rb.GAME.BUTTON_Y);
    layer.appendChild(this.restartButton, 8);

    this.playButton = new rb.TileButton.type("start again", eventTarget, rb.NAV.START_CONTINUE_UP, rb.NAV.START_CONTINUE_DOWN).setAnchorPoint(0.5, 0.5).setPosition(rb.WIDTH * 0.75, rb.GAME.BUTTON_Y);
    layer.appendChild(this.playButton, 7);
};

goog.inherits(rb.GameEnd, lime.Scene);


rb.GameEnd.prototype.updateARTLabel = function(label, value)
{   
    if(value != 0)
    {
        value = parseInt(value * 10) / 10;

        if(parseInt(value) == value)
        value = value + '.0';        

        if(value < 10)
        {
            value = '0' + value;
        }   

        label.setText(value);
    }
    else
    {
        label.setText('00.0');
    }
}

