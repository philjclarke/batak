goog.provide('rb.Variables');

rb.Mode = {
    DEBUG: false, 
    BACKGROUND_DEBUG: false, 
    BACKGROUND_COLOR: '#aaaaaa' 
};    

/*
 INTRO_TEXT: '<p>Have a go at our reaction test and see if you can<br/>get the highest score!</p><p>Each level gives you more to think about.<br/>Can you improve your results over time?<br/>Practice makes perfect!</p>',
*/

rb.GAME = {
    INTRO_TEXT: 'Have a go at our reaction test and see if you can get the highest score! Each level gives you more to think about. Can you improve your results over time?',
    SIS_LOGO: 'assets/sis-reaction-test-logo.png',
    FONT: 'FrutigerNeue1450W01-Reg',
    FONT_NUMBERS: 'arial, sans-serif',
    HEADER_HEIGHT: 95,    
    BUTTON_Y: 810,
    HighScore: '010',  
    LEVELS: 3,
    localStorageStatus: false,   
    localStorage: null, 
    LOCAL_STORAGE_ID: 'reactionTestScores_00005',
    currentLevel: 1
};

rb.RESULTS = {
    INTRO_TEXT: ''
};

rb.NAV = {
    START_CONTINUE_UP: 'assets/start-play-button.png',
    START_CONTINUE_DOWN: 'assets/start-play-animation.png',
    RESTART_UP: 'assets/restart-button-grey.png',
    RESTART_DOWN: 'assets/restart-grey-animation.png' 
}

rb.SCORES = {
    level1BestScore: 0,
    level1BestART: null,
    level2BestScore: 0,
    level2BestART: null,
    level3BestScore: 0,
    level3BestART: null     
};

rb.LEVEL1 = {
    score: 0,
    bestScore: 0,
    art: 0,
    bestART: null,
    TILES: 12,
    INTRO_TEXT: 'Hit the buttons as quickly as possible as they light up.',
    TIME: 30,
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
    INTRO_TEXT: 'Follow the instructions and hit the right number as quickly as you can. Do you know your odds and evens?',
    TIME: 30,
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
    TIME: 30,
    INTRO_TEXT: 'Follow the instructions and hit the right number as quickly as you can. How\'s your maths?',
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
    TEXT_HIGHLIGHT_COLOR: '#0095e0'  
};

// 006699