const WRONG_PARAM_MSG = 'wrong parametre';
const MOUSE = {
    UP: 'mouse_up',
    DOWN: 'mouse_down',
    LEFT: 'mouse_left',
    RIGHT: 'mouse_right',
    POS: 'mouse_position'
};

const DRAW = {
    CIRCLE: 'draw_circle',
    RECTANGLE: 'draw_rectangle',
    SQUARE: 'draw_square'
}

const PRINT_SCREEN = 'prnt_scrn';
const PRINT_SCREEN_IMAGE_SIZE = { height: 200, width: 200};

const STATIC_SERVER_START_MSG = 'HTTP server started on port: ';
const WS_SERVER_START_MSG = 'Websocket server started on port: ';
const CLIENT_ERROR_MSG = 'HTTP server err ';
const WS_ERROR_MSG = 'Websocket server err ';


export { 
    WRONG_PARAM_MSG, 
    MOUSE, 
    DRAW, 
    PRINT_SCREEN, 
    PRINT_SCREEN_IMAGE_SIZE, 
    STATIC_SERVER_START_MSG, 
    WS_SERVER_START_MSG, 
    CLIENT_ERROR_MSG, 
    WS_ERROR_MSG 
};
