goog.provide('rb.TileCountDown');

goog.require('lime.Circle');

goog.require('lime.animation.Delay');
goog.require('lime.animation.FadeTo');
goog.require('lime.animation.RotateBy');
goog.require('lime.animation.RotateTo');
goog.require('lime.animation.ScaleTo');
goog.require('lime.animation.Sequence');
goog.require('lime.animation.Spawn');
goog.require('lime.animation.Loop');

/**
 * Start button constructor
 * @constructor
 * @extends lime.Sprite
 */
rb.TileCountDown = function(level, eventTarget) {

    this.eventTarget = eventTarget;

    lime.Sprite.call(this);

    this.backgroundAnimation = new lime.Sprite().setAnchorPoint(0.5, 0.5).setPosition(0, 0).setSize(91,91);
    
    this.backgroundAnimation.setHidden(true);
    this.backgroundAnimation.setScale(2);
    
    if(rb.Mode.DEBUG)
    this.backgroundAnimation.setStroke(new lime.fill.Stroke(1, '#ffffff'));

    this.appendChild(this.backgroundAnimation, this.getNumberOfChildren() - 1);

    this.getSize().clone();

    this.qualityRenderer = true;

    this.buttonImages = new Array();

    this.buttonImage = new lime.Sprite().setSize(151,151);
    this.buttonImage.setFill(level.TILE_COUNTDOWN_UP);

    this.buttonAnimationImage = new lime.Sprite().setSize(151,151);
    this.buttonAnimationImage.setFill(level.TILE_COUNTDOWN_DOWN);

    this.appendChild(this.buttonAnimationImage, this.getNumberOfChildren() - 1);

    this.appendChild(this.buttonImage, this.getNumberOfChildren() - 1);

    this.lbl = new lime.Label().setText('ready').setFontFamily(rb.GAME.FONT).setFontColor('#1e1e1e').setFontWeight(500).setFontSize(48).
        setAlign('center');

    if(rb.Mode.DEBUG)
    this.lbl.setStroke(new lime.fill.Stroke(1, '#ffffff'));

    this.lbl.setSize(100, 60)

    this.appendChild(this.lbl, this.getNumberOfChildren() - 1);

    this.animating = false;

    this.counterIndex = null;

    this.ios = (navigator.userAgent.match(/(iPad|iPhone|iPod)/g) ? true : false);

    this.countDownIndex = 0;
    this.countDownArray = ["3", "2", "1", "GO"];

    this.buttonImage.setHidden(false);
    this.buttonAnimationImage.setHidden(false);
};

goog.inherits(rb.TileCountDown, lime.Sprite);

/**
 * Start count down
 */
rb.TileCountDown.prototype.startCountDown = function(e) {

    lime.scheduleManager.scheduleWithDelay(this.updateCounter, this, 1000, 4);
};

/**
 * Show time up node
 */
rb.TileCountDown.prototype.showTimeUp = function(e) {

    this.lbl.setText('time');

    this.setHidden(false);
    this.buttonImage.setHidden(false);

    this.buttonAnimationImage.setScale(1.5);
    this.buttonAnimationImage.setHidden(false);

    this.animate(this.buttonAnimationImage, 1, 'time up');
    this.lbl.setSize(100, 60);
    // this.lbl.setFontSize(36);
    // this.lbl.setPosition(3, -5);
};

/**
 * Animates button on click
 */
rb.TileCountDown.prototype.animate = function(sprite, time, type) {

    var target = this;

    if(target.animating == false)
    {
        var animation;

        this.selected = false;

        target.animating = true;

        if(target.ios)
        {
            animation = new lime.animation.ScaleTo(1).setDuration(time).enableOptimizations();
        }    
        else
        {
            animation = new lime.animation.ScaleTo(1).setDuration(time);
        }    

        sprite.runAction(animation);

        goog.events.listen(animation, lime.animation.Event.STOP, function(){

            sprite.setHidden(true);
            sprite.setScale(1.5);

            target.animating = false;

            if(target.countDownIndex > 3)   
            {
                this.countDownIndex = 0;
                
                if(type == 'time up')
                {
                    lime.scheduleManager.callAfter(function(){
                        
                        target.eventTarget.dispatchEvent(type);

                        // Hide self
                        target.setHidden(true);

                     }, this, 1000);
                } 
                else if(type == 'countdown finished')
                {
                    target.setHidden(true);

                    target.eventTarget.dispatchEvent("countdown finished");
                }  
            }
        })
    } 
};

/**
 * Updates image counter
 */
rb.TileCountDown.prototype.updateCounter = function(s) {

    this.lbl.setText(this.countDownArray[this.countDownIndex]);
    
    this.buttonAnimationImage.setHidden(false);
    this.buttonAnimationImage.setScale(1.5);

    this.setChildIndex(this.buttonAnimationImage, this.getNumberOfChildren() - 1);
    this.setChildIndex(this.buttonImage, this.getNumberOfChildren() - 1);

    this.setChildIndex(this.lbl, this.getNumberOfChildren() - 1);

    this.animate(this.buttonAnimationImage, 0.5, 'countdown finished');

    this.countDownIndex = this.countDownIndex + 1;
};

/**
 * Sets button text
 */
rb.TileCountDown.prototype.setText = function(s) {

    this.lbl.setText(s);
};

/**
 * Gets button text
 */
rb.TileCountDown.prototype.getText = function() {

    return this.lbl.getText();
};

/**
 * Returns event target. Dispatches events
 */
rb.TileCountDown.prototype.getEventTarget = function() {

    return this.eventTarget;
};

/**
 * @inheritDoc
 */
rb.TileCountDown.prototype.update = function() {

    var size = this.getSize();

    lime.Node.prototype.update.call(this);
};