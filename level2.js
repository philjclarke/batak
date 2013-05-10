goog.provide('rb.Level2');

goog.require('rb.Game');

goog.require('rb.Variables');

/**
 * Level2 scene.
 * @constructor
 * @extends lime.Scene
 */
rb.Level2 = function() {
    // Call everything in this scope
    rb.Game.call(this);

    //empty layer for contents
    var layer = new lime.Layer();
    this.appendChild(layer);    

    // Call parents constructor
    // goog.base(this);

    var instructions_lbl = new lime.Label().setFontFamily('HelveticaNeueW01-45Ligh').setFontColor('#ffffff').setFontSize(24).
    setPosition(150, 200).setText('Hit an Even number').setSize(425, 100).setAnchorPoint(0, 0).setStroke(new lime.fill.Stroke(1, '#ffffff'));
    layer.appendChild(instructions_lbl);

    // Variables need to be set in level class // TEMP
    this.TARGETS = 12;

    this.oddNumbers = this.board.generateNumbers(2, 1, 50);
    this.evenNumbers = this.board.generateNumbers(2, 0, 50);

    this.board.setRandomNumbers(this.oddNumbers, this.TARGETS, this.evenNumbers, 1);

    this.addEventListeners();

    console.log("rb.LEVEL3", rb.LEVEL3);
};

goog.inherits(rb.Level2, rb.Game);

rb.Level2.prototype.addEventListeners = function()
{
    for (var i = 0; i < this.board.nodeTargets.length; i++)
    {    
        goog.events.listen(this.board.nodeTargets[i],['mousedown','touchstart'], goog.partial(this.pressHandler, this));

    };
}

rb.Level2.prototype.removeEventListeners = function()
{
    for (var i = 0; i < this.board.nodeTargets.length; i++)
    {    
        goog.events.unlisten(this.board.nodeTargets[i],['mousedown','touchstart'], goog.partial(this.pressHandler, this));
    };
}

rb.Level2.prototype.pressHandler = function(level, e)
{
    if(this.selected_)
    {
        level.setScore(1);
        level.setResponseTime();

        level.board.reset();
        level.board.setRandomNumbers(level.oddNumbers, level.TARGETS, level.evenNumbers, 1);
    }    
    else
    {
        //negative feedback
    }    
}