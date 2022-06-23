import { WebSocket } from 'ws';
import robot from 'robotjs';
 
import { drawCircleHelper, drawSquareHelper, drawRectangleHelper } from '../helper/helper';

import { WRONG_PARAM_MSG, DRAW } from '../constants';

const drawCircle = (offset: number, ws: WebSocket): void => {
  try {    
    drawCircleHelper(offset, robot);

    ws.send(DRAW.CIRCLE);
  } catch (e) {
    console.log(WRONG_PARAM_MSG);
  }
};

const drawRectangle = (measurements: number[], ws: WebSocket): void => {
  try {    
    drawRectangleHelper(measurements, robot);

    ws.send(`${DRAW.RECTANGLE} ${measurements[0]} ${measurements[1]}`);
  } catch (e) {
    console.log(WRONG_PARAM_MSG);
  }
};

const drawSquare = (offset: number, ws: WebSocket): void => {
  try {   
    drawSquareHelper(offset, robot);

    ws.send(DRAW.SQUARE);
  } catch (e) {
    console.log(WRONG_PARAM_MSG);
  }
};

export { drawCircle, drawRectangle, drawSquare };
