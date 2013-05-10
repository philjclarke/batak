goog.provide('rb.Gem');

goog.require('lime.Circle');

/**
 * Single bubble object
 * @constructor
 * @extends lime.Sprite
 */
rb.Gem = function() {
    goog.base(this);

    // grphical body obejct
    this.circle = new lime.Sprite();
    this.appendChild(this.circle);

    this.selected_ = false;

    this.index = -1;

    this.qualityRenderer = true;

    this.lbl = new lime.Label().setText("").setFontSize(34).setFontColor('#fff').setFontFamily('HelveticaNeueW01-45Ligh');
    this.appendChild(this.lbl, 2);
};

goog.inherits(rb.Gem, lime.Sprite);

// not used any more. only length is important
rb.Gem.colors = ['#F00', '#F90', '#0C0', '#0CC', '#00C', '#96F'];

/**
 * Generate bubble with random color
 * @return {rb.Gem} New bubble.
 */
rb.Gem.random = function() {
    var id = Math.floor(Math.random() * rb.Gem.colors.length);
    //var color = rb.Gem.colors[id];
    var gem = new rb.Gem();
    gem.index = id;
    gem.circle.setFill('assets/button_off.png');

    return gem;
};

/**
 * Select bubble. Show highlight
 */
rb.Gem.prototype.setNumber = function(n) {
    this.lbl.setText(n);
};


/**
 * Select bubble. Show highlight
 */
rb.Gem.prototype.getNumber = function() {
    return this.lbl.getText();
};

/**
 * Select bubble. Show highlight
 */
rb.Gem.prototype.select = function() {
    if (this.selected_) return;

    var size = this.getSize().clone();

    console.log(size);

    this.highlight = new lime.Sprite().setSize(size).setFill('assets/button_on.png');
    this.appendChild(this.highlight, 1);

    this.selected_ = true;
};

/**
 * Remove selection highlight form bubble.
 */
rb.Gem.prototype.deselect = function() {
    if (!this.selected_) return;

    this.removeChild(this.highlight);

    this.selected_ = false;
};

/**
 * @inheritDoc
 */
rb.Gem.prototype.update = function() {

    // make circle size relative form bubble size
    // todo: replace with AutoResize mask
    var size = this.getSize();
    // this.circle.setSize(size.width * .75, size.height * .75);

    lime.Node.prototype.update.call(this);
};
