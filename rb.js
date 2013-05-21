//set main namespace
goog.provide('rb');

//get requirements
goog.require('lime.Director');
goog.require('rb.GameManager');

//constant iPad size
rb.WIDTH = 720;
rb.HEIGHT = 1004;

// entrypoint
rb.start = function() {

	rb.director = new lime.Director(document.body, rb.WIDTH, rb.HEIGHT);
	rb.director.makeMobileWebAppCapable(); // Add support for adding game to Springboard as a web application on iOS devices

	new rb.GameManager();
};

//this is required for outside access after code is compiled in ADVANCED_COMPILATIONS mode
goog.exportSymbol('rb.start', rb.start);