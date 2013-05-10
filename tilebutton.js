goog.provide('rb.TileButton');

goog.require('lime.Circle');

goog.require('lime.animation.Delay');
goog.require('lime.animation.FadeTo');
goog.require('lime.animation.RotateBy');
goog.require('lime.animation.RotateTo');
goog.require('lime.animation.ScaleTo');
goog.require('lime.animation.Sequence');
goog.require('lime.animation.Spawn');

/**
 * Start button constructor
 * @constructor
 * @extends lime.Sprite
 */
rb.TileButton = function() {
    // goog.base(this);
    lime.Sprite.call(this);

    this.backgroundAnimation = new lime.Sprite().setAnchorPoint(0.5, 0.5).setPosition(0, 0);

    if(rb.Mode.DEBUG)
    this.backgroundAnimation.setStroke(new lime.fill.Stroke(1, '#ffffff'));

    this.appendChild(this.backgroundAnimation, 1);

    this.getSize().clone();

    this.buttonImage = new lime.Sprite();
    this.appendChild(this.buttonImage, 2);

    this.qualityRenderer = true;

    this.lbl = new lime.Label().setText('').setFontFamily('Signika').setFontColor('#ffffff').setFontWeight(500).setFontSize(36).
        setAlign('center');

    if(rb.Mode.DEBUG)
    this.lbl.setStroke(new lime.fill.Stroke(1, '#ffffff'));

    this.appendChild(this.lbl, 3);

    this.animating = false;
    this.eventTarget = new goog.events.EventTarget();
    goog.events.listen(this.buttonImage, ['mousedown','touchstart'], this.animate, true, this);

    this.ios = (navigator.userAgent.match(/(iPad|iPhone|iPod)/g) ? true : false );
};

goog.inherits(rb.TileButton, lime.Sprite);

/**
 * Creates button by type
 * @return {rb.Button} New button.
 */
rb.TileButton.type = function(type) {

    var button = new rb.TileButton();

    if(type == "start" || type == "play")
    {
        button.backgroundAnimation.setFill('assets/button-blue-interaction-121x121.png');

        if(this.ios)
        button.backgroundAnimation.setRotation(45);
        else
        button.backgroundAnimation.setRotation(45);

        button.backgroundAnimation.setScale(1.5);
        button.backgroundAnimation.setHidden(true);
        button.buttonImage.setFill('assets/button-blue-start.png');

        button.lbl.setSize(121, 50)
        button.lbl.setText(type);
    }    
    else if(type == "game")
    {
        button.backgroundAnimation.setFill('assets/node-green-interaction.png');

        if(this.ios)
        button.backgroundAnimation.setRotation(45);
        else
        button.backgroundAnimation.setRotation(45);

        button.backgroundAnimation.setScale(1.5);
        button.backgroundAnimation.setHidden(true);
        button.buttonImage.setFill('assets/node-green.png');


        button.lbl.setSize(91, 40)
        button.lbl.setText(type);
        button.lbl.setText('99');     
    }    

    return button;
};

/**
 * Animates button on click
 */
rb.TileButton.prototype.animate = function(e) {

    var target = this;

    if(target.animating == false)
    {
        target.animating = true;

        target.backgroundAnimation.setHidden(false);

        var animation1 = new lime.animation.RotateBy(180).setDuration(0.5);
        var animation2 = new lime.animation.ScaleTo(1).setDuration(0.5);

        if(target.ios)
        {
            animation1 = new lime.animation.RotateBy(180).setDuration(0.5);
            animation1.enableOptimizations();
            animation2.enableOptimizations(); 
        }    

        target.backgroundAnimation.runAction(animation1);
        target.backgroundAnimation.runAction(animation2);

        goog.events.listen(animation1, lime.animation.Event.STOP, function(){

            target.backgroundAnimation.setRotation(45);

            target.backgroundAnimation.setScale(1.5);
            target.backgroundAnimation.setHidden(true);

            target.animating = false;


            target.eventTarget.dispatchEvent(target.lbl.getText());
        })
    } 
};

/**
 * Sets button text
 */
rb.TileButton.prototype.setText = function(s) {
    this.lbl.setText(s);
};

/**
 * Gets button text
 */
rb.TileButton.prototype.getText = function() {
    return this.lbl.getText();
};

/**
 * Returns event target. Dispatches events
 */
rb.TileButton.prototype.getEventTarget = function() {
    return this.eventTarget;
};

/**
 * @inheritDoc
 */
rb.TileButton.prototype.update = function() {

    var size = this.getSize();

    lime.Node.prototype.update.call(this);
};