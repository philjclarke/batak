goog.provide('rb.Level3');

goog.require('rb.Game');

goog.require('rb.Variables');

/**
 * Level3 scene.
 * @constructor
 * @extends lime.Scene
 */
rb.Level3 = function() {
    rb.Game.call(this);

    var layer = new lime.Layer();
    this.appendChild(layer);    

    var instructions_lbl = new lime.Label().setFontFamily('HelveticaNeueW01-45Ligh').setFontColor('#ffffff').setFontSize(24).
    setPosition(150, 200).setText('Test').setSize(425, 100).setAnchorPoint(0, 0).setStroke(new lime.fill.Stroke(1, '#ffffff'));
    layer.appendChild(instructions_lbl);

    this.targetNumbers = this.generateNumbers(0, 0, 50);

    this.tile = null;

    this.reset();
};

goog.inherits(rb.Level3, rb.Game);

rb.Level3.prototype.addEventListeners = function()
{
    for (var i = 0; i < this.board.nodeTargets.length; i++)
    {    
        goog.events.listen(this.board.nodeTargets[i],['mousedown','touchstart'], goog.partial(this.pressHandler, this));
    };
}

rb.Level3.prototype.removeEventListeners = function()
{
    for (var i = 0; i < this.board.nodeTargets.length; i++)
    {    
        goog.events.unlisten(this.board.nodeTargets[i],['mousedown','touchstart'], goog.partial(this.pressHandler, this));
    };
}

rb.Level3.prototype.pressHandler = function(level, e)
{
    if(this.selected_)
    {
        level.setScore(1);
        level.setResponseTime();

        level.board.reset();


        // level.board.setRandomNumbers(level.oddNumbers, level.TARGETS, level.evenNumbers, 1);
    }    
    else
    {
        //negative feedback
    }    
}

rb.Level3.prototype.reset = function()
{
    var randomNumber = Math.floor(Math.random() * rb.LEVEL3.OPERATORS.length);
    var operator = rb.LEVEL3.OPERATORS[randomNumber];

    this.board.setRandomNumbers(this.targetNumbers, rb.LEVEL3.TILES);

    this.tile = this.board.selectRandom();
    var tileNum = parseInt(this.tile.getNumber());
    var b = null;

    console.log(this.tile.getNumber());

    var question = null;
    var factorsArray = null;

    if(operator == "x")
    {
        factorsArray = this.findFactors(tileNum);
        console.log(factorsArray);

        randomNumber = Math.floor(Math.random() * factorsArray.length);

        console.log("/", factorsArray[randomNumber]);

        b = this.tile.getNumber() / factorsArray[randomNumber];

        question = factorsArray[randomNumber] + "*" + b;

        console.log("x", question, "answer", tileNum);
    }  
    else if(operator == "+")
    {
        randomNumber = Math.floor(Math.random() * tileNum) + 1;
        b = tileNum - randomNumber;

        question = b + "+" + randomNumber;

        console.log("+", question, "answer", tileNum);
    }
    else if(operator == "-")
    {
        randomNumber = Math.floor(Math.random() * (1 + rb.LEVEL3.MAX_SUBTRACTION - tileNum)) + tileNum;

        b = tileNum + randomNumber;

        question = b + "-" + randomNumber;

        console.log("-", question, "answer", tileNum);
    }


    /*
    console.log(this.targetNumbers);

    console.log(this.findFactors(50));

    // Set board
    this.board.setRandomNumbers(this.targetNumbers, 12); 
    */
}