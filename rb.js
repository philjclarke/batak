//set main namespace
goog.provide('rb');


//get requirements
goog.require('lime.Director');
goog.require('lime.GlossyButton');
goog.require('lime.Layer');
goog.require('lime.animation.Animation');
goog.require('lime.animation.FadeTo');
goog.require('lime.Scene');
goog.require('lime.transitions.Dissolve');
goog.require('lime.transitions.SlideInRight');
goog.require('rb.Board');
goog.require('rb.Button');
goog.require('rb.TileButton');
goog.require('rb.Level1');
// goog.require('rb.Level2');
// goog.require('rb.Level3');

goog.require('rb.Help');
goog.require('rb.LevelIntro');
goog.require('rb.Variables');

//constant iPad size
rb.WIDTH = 720;
rb.HEIGHT = 1004;

// entrypoint
rb.start = function() {

	rb.director = new lime.Director(document.body, rb.WIDTH, rb.HEIGHT);
	rb.director.makeMobileWebAppCapable(); // Add support for adding game to Springboard as a web application on iOS devices

	// rb.showSplash();

	rb.loadGame();

	/*
    //enable for non-seeded random. useful for debugging
    var pseudoRandom = new goog.testing.PseudoRandom(109);
    pseudoRandom.install();
	*/
	
	// rb.loadMenu();
};

rb.showSplash = function() {

    var scene = new lime.Scene(),
	    layer = new lime.Layer().setPosition(0, 0);
	
	var background = new lime.Sprite().setSize(rb.WIDTH,rb.HEIGHT).
	    setFill('#f9f8f7').setAnchorPoint(0,0);
	layer.appendChild(background);

	var logo = new lime.Sprite().setFill('assets/screen1-x145y266-HexBG-f9f8f7.gif').setAnchorPoint(0.5, 0.5).setPosition(rb.WIDTH / 2, rb.HEIGHT / 2).setOpacity(0);
	layer.appendChild(logo);

	var fade = new lime.animation.FadeTo(1).setDuration(1);

	if(rb.Mode.DEBUG)
		fade.setDuration(0);
	
	logo.runAction(fade)

	scene.appendChild(layer);

	rb.director.replaceScene(scene);

	var test = this;

	goog.events.listen(fade, lime.animation.Event.STOP, function(){
	    rb.showStart();
	})
}

rb.showStart = function() {

	var startScene = new lime.Scene(),
	    layer = new lime.Layer().setPosition(0, 0); 

	if(rb.Mode.DEBUG)
	{
		var background = new lime.Sprite().setSize(rb.WIDTH,rb.HEIGHT).
		    setFill('#272628').setAnchorPoint(0,0);
		layer.appendChild(background);
	}    

	var logo = new lime.Sprite().setFill('assets/screen2-x96y135-HexBG-272528.gif').setAnchorPoint(0.5, 0.5).setPosition(rb.WIDTH / 2, rb.HEIGHT * 0.40);
	layer.appendChild(logo);

	var startButton = new rb.TileButton.type("start").setAnchorPoint(0.5, 0.5).setPosition(rb.WIDTH / 2, rb.HEIGHT * 0.85);

	layer.appendChild(startButton);

	console.log(startButton.getSize());

	startScene.appendChild(layer);

	if(rb.Mode.DEBUG)
	rb.director.replaceScene(startScene);
	else
	rb.director.replaceScene(startScene, lime.transitions.SlideInRight);

	goog.events.listen(startButton.getEventTarget(), 'start', function(e){

	  rb.loadLevel('level ' + rb.GAME.Level);
	});
}

rb.loadLevel = function(level) {

    var levelIntro = new rb.LevelIntro(level, rb.LEVEL1.INTRO_TEXT, rb.GAME.HighScore);

	if(rb.Mode.DEBUG)
	rb.director.replaceScene(levelIntro);
	else
	rb.director.replaceScene(levelIntro, lime.transitions.SlideInRight);

	goog.events.listen(levelIntro.getEventTarget(), 'play', function(e){
	
	  rb.loadGame(1);
	});
}

rb.loadGame = function() {

	switch(rb.GAME.Level)
	{
		case 1:
			scene = new rb.Level1();
		break;
		case 2:
			scene = new rb.Level2();
		break;
		case 3:
			scene = new rb.Level3();
		break;				
	}

	scene.setPosition(0, 0)

	rb.director.replaceScene(scene, lime.transitions.SlideInRight);
}












































// load menu scene
rb.loadMenu = function() {
    var scene = new lime.Scene(),
	    layer = new lime.Layer().setPosition(rb.WIDTH / 2, 0);

	if(rb.isBrokenChrome()) layer.setRenderer(lime.Renderer.CANVAS);

	var btns = new lime.Layer().setPosition(0, 430);
	layer.appendChild(btns);
	var move = new lime.animation.MoveBy(-rb.WIDTH, 0).enableOptimizations();

	btn = rb.makeButton('Start').setPosition(0, 320);
	goog.events.listen(btn, 'click', function() {
	   	// rb.usemode = rb.Mode.TIMED;
	    // btns.runAction(move);

	    rb.newgame(rb.Level1);
	});
	btns.appendChild(btn);

	/*
	btn = rb.makeButton('Help').setPosition(0, 440);
	goog.events.listen(btn, 'click', function() {
	    rb.loadHelpScene();
	});
	btns.appendChild(btn);
	*/

    //second area that will slide in
    var btns2 = new lime.Layer().setPosition(rb.WIDTH, 0);
    btns.appendChild(btns2);

    var lbl = new lime.Label().setText('Select board size:').setFontColor('#fff').setFontSize(24).setPosition(0, 140);
    btns2.appendChild(lbl);

    btn = rb.makeButton('6x6').setPosition(0, 200);
	goog.events.listen(btn, 'click', function() {
	    rb.newgame(6);
	});
	btns2.appendChild(btn);

    btn = rb.makeButton('7x7').setPosition(0, 320);
	goog.events.listen(btn, 'click', function() {
	    rb.newgame(7);
	});
	btns2.appendChild(btn);

    btn = rb.makeButton('8x8').setPosition(0, 440);
	goog.events.listen(btn, 'click', function() {
	    rb.newgame(8);
	});
	btns2.appendChild(btn);

	scene.appendChild(layer);
	//lime logo
	rb.builtWithLime(scene);

	// set current scene active
	rb.director.replaceScene(scene, lime.transitions.SlideInRight);
};

// helper for same size buttons
rb.makeButton = function(text) {
    var btn = new rb.Button(text).setSize(300, 90);
    return btn;
};

rb.isBrokenChrome = function(){
   return (/Chrome\/9\.0\.597/).test(goog.userAgent.getUserAgentString());
}

/*
rb.makeButton = function(size){

	return btn;
}*/

// load new game scene
rb.newgame = function(level) {

    var scene = new rb.Level3();
    scene.setPosition(0, 0)
	rb.director.replaceScene(scene, lime.transitions.SlideInRight);
};

// load new help scene
rb.loadHelpScene = function() {
	/*
    var scene = new rb.Help();

	rb.builtWithLime(scene);
	rb.director.replaceScene(scene, lime.transitions.Dissolve);
	*/
};

// add lime credintials to a scene
rb.builtWithLime = function(scene) {

	/*

    var lm = new lime.Sprite().setFill('assets/lime.png');
    var txt = new lime.Label().setText('Built with').setFontColor('#fff').setFontSize(24).setPosition(290, 960);
    var btn = new lime.Button(lm).setScale(.3).setPosition(410, 960);
    goog.events.listen(btn, 'click', function() {
        window.location.href = 'http://www.limejs.com/';
    });
    scene.appendChild(txt);
    scene.appendChild(btn);

    */
};

//this is required for outside access after code is compiled in ADVANCED_COMPILATIONS mode
goog.exportSymbol('rb.start', rb.start);
