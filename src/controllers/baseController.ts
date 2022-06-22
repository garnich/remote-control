import { WebSocket } from 'ws';

import { moveUp, moveDown, moveLeft, moveRight, getPosition } from './mouseController';

import { WRONG_PARAM_MSG, MOUSE } from '../constants';

export const baseController = (ws: WebSocket, data: string) => {
  const param = data.split(' ');
  const coordParam = Number(param[1]);
  
  switch (param[0]) {
    case MOUSE.UP:
        moveUp(coordParam, ws);
      break;
    case MOUSE.DOWN:
        moveDown(coordParam, ws);
      break;
    case MOUSE.LEFT:
        moveLeft(coordParam, ws);
      break;
    case MOUSE.RIGHT:
        moveRight(coordParam, ws);
      break;
    case MOUSE.POS:
        getPosition(ws);
      break;
    default:
      console.log(WRONG_PARAM_MSG);
  }
};