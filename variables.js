goog.provide('rb.Variables');

rb.Mode = {
    DEBUG: true 
};    

rb.GAME = {
    INTRO_TEXT: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    FONT: 'FrutigerNeue1450W01-Reg',  
    FONT_NUMBERS: 'arial, sans-serif',  
    HEADER_HEIGHT: 78,     
    HighScore: "010",   
    LEVELS: 3,  
    currentLevel: 1
};

rb.RESULTS = {
    INTRO_TEXT: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
};

rb.LEVEL1 = {
    score: 0,
    bestScore: 0,
    art: 0,
    bestART: 0,
    TILES: 12,
    INTRO_TEXT: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    TIME: 5,
    LEVEL_IMAGE: 'assets/level_1_diagram.png',
    TILE_UP: 'assets/node-green.png',    
    TILE_SELECT: 'assets/countdown-green.png', 
    TILE_DOWN: 'assets/node-green-interaction-whole.png'
};

rb.LEVEL2 = {
    score: 0,
    bestScore: 0,
    art: 0,
    bestART: 0,
    TILES: 12,
    INTRO_TEXT: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    TIME: 20,
    LEVEL_IMAGE: 'assets/level_2_diagram.png',
    TILE_UP: 'assets/node-orange.png',    
    TILE_SELECT: 'assets/countdown-orange.png', 
    TILE_DOWN: 'assets/node-orange-interaction-whole.png'        
};

rb.LEVEL3 = {
    score: 0,
    bestScore: 0,
    art: 0,
    bestART: 0,    
	TILES: 12,
    TIME: 5,
	INTRO_TEXT: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    MAX_SUBTRACTION: 100,
    MAX_DIVISION: 100,
    OPERATORS: ["x", "-", "+"],
    LEVEL_IMAGE: 'assets/level_3_diagram.png',
    TILE_UP: 'assets/node-blue.png',    
    TILE_SELECT: 'assets/countdown-blue.png', 
    TILE_DOWN: 'assets/node-blue-interaction-whole.png'       
};