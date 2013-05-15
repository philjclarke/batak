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
rb.TileCountDown = function() {
    // goog.base(this);
    lime.Sprite.call(this);

    this.backgroundAnimation = new lime.Sprite().setAnchorPoint(0.5, 0.5).setPosition(0, 0);
    this.backgroundAnimation.setFill('assets/node-green-interaction.png');
    
    this.backgroundAnimation.setHidden(true);
    this.backgroundAnimation.setScale(1.5);
    
    if(rb.Mode.DEBUG)
    this.backgroundAnimation.setStroke(new lime.fill.Stroke(1, '#ffffff'));

    this.appendChild(this.backgroundAnimation, this.getNumberOfChildren() - 1);

    this.getSize().clone();

    this.qualityRenderer = true;

    this.buttonImages = new Array();

    this.buttonImageBlue = new lime.Sprite();
    this.buttonImageBlue.setFill('assets/countdown-blue.png');

    this.buttonImageOrange = new lime.Sprite();
    this.buttonImageOrange.setFill('assets/countdown-orange.png');

    this.buttonImageGreen = new lime.Sprite();
    this.buttonImageGreen.setFill('assets/countdown-orange.png');

    this.appendChild(this.buttonImageBlue, this.getNumberOfChildren() - 1);
    this.appendChild(this.buttonImageOrange, this.getNumberOfChildren() - 1);
    this.appendChild(this.buttonImageGreen, this.getNumberOfChildren() - 1);

    this.lbl = new lime.Label().setText('').setFontFamily('FrutigerNeue1450W01-Bol 1196308').setFontColor('#1e1e1e').setFontWeight(500).setFontSize(36).
        setAlign('center');

    if(rb.Mode.DEBUG)
    this.lbl.setStroke(new lime.fill.Stroke(1, '#ffffff'));

    this.lbl.setSize(91, 40)

    this.appendChild(this.lbl, this.getNumberOfChildren() - 1);

    this.animating = false;
    this.eventTarget = new goog.events.EventTarget();
    goog.events.listen(this.buttonImageBlue, ['mousedown','touchstart'], this.animate, true, this);

    this.counterIndex = null;

    this.ios = (navigator.userAgent.match(/(iPad|iPhone|iPod)/g) ? true : false);

    this.countDownArray = ["3", "2", "1", "GO"];
    this.backgroundImageArray = [this.buttonImageBlue, this.buttonImageOrange, this.buttonImageGreen, this.buttonImageGreen];
    this.animationImageArray = ["node-blue-interaction-whole.png", "node-orange-interaction-whole.png", "node-green-interaction-whole.png", "node-green-interaction-whole.png"];

    for (var i = 0; i < this.backgroundImageArray.length; i++) 
    {
        this.backgroundImageArray[i].setHidden(true);
    };    
};

goog.inherits(rb.TileCountDown, lime.Sprite);

/**
 * Start count down
 */
rb.TileCountDown.prototype.startCountDown = function(e) {
    lime.scheduleManager.scheduleWithDelay(this.updateCounter, this, 1000, 4);
};

/**
 * Animates button on click
 */
rb.TileCountDown.prototype.animate = function(e) {

    var target = this;

    if(target.animating == false)
    {
        var animation;

        this.selected = false;

        target.animating = true;

        target.backgroundAnimation.setHidden(false);

        if(target.ios)
        {
            animation = new lime.animation.ScaleTo(1).setDuration(0.5).enableOptimizations();
        }    
        else
        {
            animation = new lime.animation.ScaleTo(1).setDuration(0.5);
        }    

        target.backgroundAnimation.runAction(animation);

        goog.events.listen(animation, lime.animation.Event.STOP, function(){

            target.backgroundAnimation.setHidden(true);
            target.backgroundAnimation.setScale(1.5);

            target.animating = false;

            if(target.backgroundImageArray.length == 0)   
            {
                target.eventTarget.dispatchEvent('end');

                // Hide self
                target.setHidden(true);
            }
        })
    } 

    /*
    var target = this;

    if(target.animating == false)
    {
        target.animating = true;

        this.counterIndex = 3;
        this.lbl.setText('');

        target.backgroundAnimation.setHidden(false);

        this.backgroundAnimation.setRotation(45);

        var animationStart = new lime.animation.ScaleTo(1.5).setDuration(1).enableOptimizations();


        var animationRotate1 = new lime.animation.RotateBy(0).setDuration(1).enableOptimizations();
        var animationRotate2 = new lime.animation.RotateBy(180).setDuration(1).enableOptimizations();
        var animationRotate3 = new lime.animation.RotateBy(180).setDuration(1).enableOptimizations();

        var animationEnd = new lime.animation.Loop(
            new lime.animation.RotateBy(180).setDuration(1).enableOptimizations()  
        );

        // target.backgroundAnimation.runAction(animationEnd);

        
        if(target.ios)
        {
            animationStart.enableOptimizations();
            animationRotate1.enableOptimizations();
            animationRotate2.enableOptimizations();
            animationRotate3.enableOptimizations();
            animationEnd.enableOptimizations();
            animationSequence1.enableOptimizations();
        }       
        

        var animationEnd = new lime.animation.Spawn(
            new lime.animation.RotateBy(180).setDuration(1).enableOptimizations(),   
            new lime.animation.ScaleTo(0.9).setDuration(1).enableOptimizations(),
            new lime.animation.Delay().setDuration(1).enableOptimizations()
        );

        var animationSequence1 = new lime.animation.Sequence(
            new lime.animation.RotateBy(180).setDuration(1).enableOptimizations(),
            new lime.animation.RotateBy(180).setDuration(1).enableOptimizations()
        );

        target.lbl.setText('3');

        target.backgroundAnimation.runAction(animationStart); 
       
        // target.backgroundAnimation.runAction(animationEnd);

        target.backgroundAnimation.runAction(animationStart); 

        goog.events.listen(animationStart, lime.animation.Event.STOP, function(){
            
            target.lbl.setText('2');

            target.backgroundAnimation.runAction(new lime.animation.RotateBy(180).setDuration(1).enableOptimizations());

        
        });




        goog.events.listen(animationRotate2, lime.animation.Event.STOP, function(){
        
            target.lbl.setText('1');

            target.backgroundAnimation.runAction(animationRotate3);
        }); 

        goog.events.listen(animationRotate3, lime.animation.Event.STOP, function(){
        
            target.lbl.setText('GO');

            target.backgroundAnimation.runAction(animationEnd);
        }); 

        goog.events.listen(animationEnd, lime.animation.Event.STOP, function(){
        
            target.backgroundAnimation.setHidden(true);

            target.setHidden(true);

            target.eventTarget.dispatchEvent('end');
        });       
    }
         */   
};

/**
 * Sets button text
 */
rb.TileCountDown.prototype.updateCounter = function(s) {

    this.lbl.setText(this.countDownArray.shift());

    for (var i = 0; i < this.backgroundImageArray.length; i++) 
    {
        this.backgroundImageArray[i].setHidden(false);
    };

    // this.buttonImage.setFill('assets/' + this.backgroundImageArray.shift());

    this.backgroundAnimation.setFill('assets/' + this.animationImageArray.shift());
    this.animate();

    console.log("boom");
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