goog.provide('rb.StartButton');


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
rb.StartButton = function() {
    goog.base(this);

    this.backgroundAnimation = new lime.Sprite().setAnchorPoint(1, 0.5).setPosition(0, 0).setStroke(new lime.fill.Stroke(1, '#ffffff'));
    this.appendChild(this.backgroundAnimation, 1);

    this.getSize().clone();

    this.buttonImage = new lime.Sprite();
    this.appendChild(this.buttonImage, 2);

    this.qualityRenderer = true;

    this.lbl = new lime.Label().setText('start').setFontFamily('Signika').setFontColor('#ffffff').setFontWeight(500).setFontSize(36).
        setAlign('center').setSize(121, 50).setStroke(new lime.fill.Stroke(1, '#ffffff'));
    this.appendChild(this.lbl, 3);

    goog.events.listen(this,['mousedown','touchstart'], this.animate);
};

goog.inherits(rb.StartButton, lime.Sprite);


/**
 * Generate bubble with random color
 * @return {rb.StartButton} New start buttons.
 */
rb.StartButton.type = function(type) {

    var button = new rb.StartButton();

    button.backgroundAnimation.setFill('assets/button-blue-interaction-121x61.png');
    button.backgroundAnimation.setRotation(315);
    button.backgroundAnimation.setScale(2);
    button.buttonImage.setFill('assets/button-blue-start.png');

    button.animate();

    return button;
};


rb.StartButton.prototype.animate = function() {


    var animation1 = new lime.animation.RotateBy(720).setDuration(1);

    var animation2 = new lime.animation.Sequence(
        new lime.animation.Delay().setDuration(0.5),
        new lime.animation.ScaleTo(1, 1).setDuration(0.5)
    );

    this.backgroundAnimation.runAction(animation1);
    this.backgroundAnimation.runAction(animation2);
};


/**
 * @inheritDoc
 */
rb.StartButton.prototype.update = function() {

    // make circle size relative form bubble size
    // todo: replace with AutoResize mask
    var size = this.getSize();

    console.log(size.width);

    // this.circle.setSize(size.width * .75, size.height * .75);

    lime.Node.prototype.update.call(this);
};


/**
 * 
 */
rb.Gem.prototype.setText = function(s) {
    this.lbl.setText(s);
};


/**
 * 
 */
rb.Gem.prototype.getText = function() {
    return this.lbl.getText();
};
