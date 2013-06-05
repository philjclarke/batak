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
    this.backgroundAnimationIncorrect = new lime.Sprite().setAnchorPoint(0.5, 0.5).setPosition(0, 0);

    if(rb.Mode.DEBUG)
    this.backgroundAnimation.setStroke(new lime.fill.Stroke(1, '#ffffff'));

    this.appendChild(this.backgroundAnimationIncorrect, 1);
    this.appendChild(this.backgroundAnimation, 2);

    this.getSize().clone();

    this.buttonImage = new lime.Sprite();
    this.appendChild(this.buttonImage, 3);

    this.qualityRenderer = true;

    this.lbl = new lime.Label().setText('').setFontFamily(rb.GAME.FONT).setFontColor('#ffffff').setFontWeight(500).setFontSize(36).
        setAlign('center');

    if(rb.Mode.DEBUG)
    this.lbl.setStroke(new lime.fill.Stroke(1, '#ffffff'));

    this.appendChild(this.lbl, 3);

    this.animating = false;

    this.selected = true;
    this.paused = false;

    this.ios = (navigator.userAgent.match(/(iPad|iPhone|iPod)/g) ? true : false );
};

goog.inherits(rb.TileButton, lime.Sprite);

/**
 * Creates button by type
 * @return {rb.Button} New button.
 */
rb.TileButton.type = function(type, eventTarget, tileUp, tileDown, tileSelect, tileIncorrect, textColor) {

    var button = new rb.TileButton();

    button.tileUp = tileUp
    button.tileDown = tileDown

    button.type = type;
    button.eventTarget = eventTarget;

    button.backgroundAnimation.setHidden(true);
    button.backgroundAnimation.setFill(button.tileDown);

    button.buttonImage.setFill(button.tileUp);

    if(type == "game")
    {
        button.tileSelect = tileSelect
        button.tileIncorrect = tileIncorrect
           
        button.backgroundAnimation.setScale(1.5);

        button.backgroundAnimationIncorrect.setHidden(true);
        button.backgroundAnimationIncorrect.setFill(button.tileIncorrect);
        button.backgroundAnimationIncorrect.setScale(1.5);

        // Paused by default
        button.paused = true;
        button.selected = false;

        button.lbl.setHidden(true);

        if(textColor != undefined)
        button.lbl.setFontColor(textColor);

        if(textColor != undefined)
        button.lbl.setFontFamily(rb.GAME.FONT_NUMBERS);

        button.lbl.setSize(91, 40);

        button.circle = new lime.Circle().setSize(91,91).setFill('#FFFFFF');
        button.circle.setHidden(true);
        button.appendChild(button.circle, 4);

        goog.events.listen(button, ['mousedown','touchstart'], button.animate, true, button);
    }    
    else
    {
        button.buttonImage.setSize(181, 181);
        button.backgroundAnimation.setSize(191, 191);
        button.backgroundAnimation.setScale(1.5);

        if(type == "restart level" || type == "start again" || type == "reaction times" )
        {
            button.lbl.setSize(145, 80)  
        }    
        else
        {
            button.lbl.setSize(181, 45)          
        }  

        button.lbl.setText(type); 

        goog.events.listen(button.buttonImage, ['mousedown','touchstart'], button.animate, true, button);
    } 

    return button;
};

/**
 * Prevents animation
 */
rb.TileButton.prototype.pause = function(e) {
    this.paused = true;
}

/**
 * Allows animation
 */
rb.TileButton.prototype.unpause = function(e) {
    this.paused = false;

    this.lbl.setHidden(false);
}

/**
 * Animates button on click
 */
rb.TileButton.prototype.animate = function(e) {

    var target = this;

    if(target.animating == false && target.paused == false)
    {
        var animation;

        target.animating = true;

        
        if(target.type == 'game')  
        {
            if(target.selected)
            {
                target.backgroundAnimation.setScale(1.8);
                target.backgroundAnimation.setHidden(false);
            }    
            else
            {
                target.backgroundAnimationIncorrect.setScale(1.5);
                target.backgroundAnimationIncorrect.setHidden(false);
            }    
        }    
        else
        {
             target.backgroundAnimation.setScale(1.5);
             target.backgroundAnimation.setHidden(false);
        }    

        if(target.ios)
        {
            animation = new lime.animation.ScaleTo(0.9).setDuration(0.5).enableOptimizations();
        }    
        else
        {
            animation = new lime.animation.ScaleTo(0.9).setDuration(0.5);
        }     

        if(target.type == 'game' && target.selected == false)
        {
            target.backgroundAnimationIncorrect.runAction(animation);
        }
        else
        {
            target.backgroundAnimation.runAction(animation);
        }    

        goog.events.listen(animation, lime.animation.Event.STOP, function(){

            // target.backgroundAnimation.setHidden(true);
            
            target.animating = false;

            if(target.type == 'game')
            {  
                target.backgroundAnimationIncorrect.setHidden(true);
            }
            else
            { 
                target.eventTarget.dispatchEvent(target.lbl.getText());
            }
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
 * Select target. Show highlight
 */
rb.TileButton.prototype.select = function(highlight) {
    if (this.selected) return;

    var size = this.getSize().clone();

    if(highlight)
    {
        this.highlight = new lime.Sprite().setFill(this.tileSelect);
        this.appendChild(this.highlight, 100);       
    }    

    this.selected = true;
};

/**
 * Remove selection highlight
 */
rb.TileButton.prototype.deselect = function() {
    if (!this.selected) return;

    this.removeChild(this.highlight);

    this.selected = false;
};

/**
 * Remove selection highlight
 */
rb.TileButton.prototype.flash = function() {

    this.circle.setHidden(false)

    lime.scheduleManager.callAfter(function(){
        
         this.circle.setHidden(true)

     }, this, 175);
};

/**
 * @inheritDoc
 */
rb.TileButton.prototype.update = function() {

    var size = this.getSize();

    lime.Node.prototype.update.call(this);
};