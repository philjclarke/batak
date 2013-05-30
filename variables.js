goog.provide('rb.Variables');

rb.Mode = {
    DEBUG: false, 
    BACKGROUND_DEBUG: false, 
    BACKGROUND_COLOR: '#aaaaaa' 
};    

rb.GAME = {
    INTRO_TEXT: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
    FONT: 'FrutigerNeue1450W01-Reg',  
    FONT_NUMBERS: 'arial, sans-serif',  
    HEADER_HEIGHT: 95,     
    HighScore: "010",   
    LEVELS: 3,  
    currentLevel: 1
};

rb.RESULTS = {
    INTRO_TEXT: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
};

rb.NAV = {
    START_CONTINUE_UP: 'assets/start-play-button.png',
    START_CONTINUE_DOWN: 'assets/start-play-animation.png',
    RESTART_UP: 'assets/restart-button-grey.png',
    RESTART_DOWN: 'assets/restart-grey-animation.png' 
}

rb.LEVEL1 = {
    score: 0,
    bestScore: 0,
    art: 0,
    bestART: null,
    TILES: 12,
    INTRO_TEXT: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    TIME: 10,
    LEVEL_IMAGE: 'assets/level_1_diagram.png',
    LEVEL_THUMB: 'assets/icon_green_black_bg.png',
    TILE_UP: 'assets/node-green.png',    
    TILE_SELECT: 'assets/node-green-stroke.png',
    TILE_DOWN: 'assets/node-green-interaction-whole.png',
    TILE_INCORRECT: 'assets/node-incorrect.png',
    TILE_COUNTDOWN_UP: 'assets/node-green-stroke-large.png',
    TILE_COUNTDOWN_DOWN: 'assets/node-green-interaction-whole.png',       
    LINE_COLOR: '#ADC261',
    TEXT_COLOR: '#FFFFFF',
    TEXT_HIGHLIGHT_COLOR: '#77B800'
};

rb.LEVEL2 = {
    score: 0,
    bestScore: 0,
    art: 0,
    bestART: null,
    TILES: 12,
    INTRO_TEXT: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    TIME: 20,
    LEVEL_IMAGE: 'assets/level_2_diagram.png',
    LEVEL_THUMB: 'assets/icon_orange_black_bg.png',
    TILE_UP: 'assets/node-orange-stroke.png',    
    TILE_SELECT: 'assets/node-orange-stroke.png', 
    TILE_DOWN: 'assets/node-orange-interaction-whole.png',
    TILE_INCORRECT: 'assets/node-incorrect.png',
    TILE_COUNTDOWN_UP: 'assets/node-orange-stroke-large.png',
    TILE_COUNTDOWN_DOWN: 'assets/node-orange-interaction-whole.png',       
    LINE_COLOR: '#FF6600',
    TEXT_COLOR: '#333333',
    TEXT_HIGHLIGHT_COLOR: '#FF6600'       
};

rb.LEVEL3 = {
    score: 0,
    bestScore: 0,
    art: 0,
    bestART: null,    
    TILES: 12,
    TIME: 20,
    INTRO_TEXT: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    MAX_SUBTRACTION: 50,
    OPERATORS: ["+", "x", "-"],
    LEVEL_IMAGE: 'assets/level_3_diagram.png',
    LEVEL_THUMB: 'assets/icon_blue_black_bg.png',    
    TILE_UP: 'assets/node-blue-stroke.png',   
    TILE_SELECT: 'assets/node-blue-stroke.png',
    TILE_DOWN: 'assets/node-blue-interaction-whole.png',
    TILE_INCORRECT: 'assets/node-incorrect.png',
    TILE_COUNTDOWN_UP: 'assets/node-blue-stroke-large.png',
    TILE_COUNTDOWN_DOWN: 'assets/node-blue-interaction-whole.png',      
    LINE_COLOR: '#006699',
    TEXT_COLOR: '#333333',
    TEXT_HIGHLIGHT_COLOR: '#006699'  
};