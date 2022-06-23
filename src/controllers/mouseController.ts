import { WebSocket } from 'ws';
import robot from 'robotjs';

import { ICoordinates } from '../types';

import { WRONG_PARAM_MSG, MOUSE } from '../constants';

const moveUp = (offset: number, ws: WebSocket): void => {
  try {
    const { x, y }: ICoordinates = robot.getMousePos();

    robot.moveMouse(x, y - offset);

    ws.send(MOUSE.UP);
  } catch (e) {
    console.log(WRONG_PARAM_MSG);
  }
};

const moveDown = (offset: number, ws: WebSocket): void => {
  try {
    const { x, y }: ICoordinates = robot.getMousePos();

    robot.moveMouse(x, y + offset);

    ws.send(MOUSE.DOWN);
  } catch (e) {
    console.log(WRONG_PARAM_MSG);
  }
};

const moveLeft = (offset: number, ws: WebSocket): void => {
  try {   
    const { x, y }: ICoordinates = robot.getMousePos();

    robot.moveMouse(x - offset, y);

    ws.send(MOUSE.LEFT);
  } catch (e) {
    console.log(WRONG_PARAM_MSG);
  }
};

const moveRight = (offset: number, ws: WebSocket): void => {
  try {
    const { x, y }: ICoordinates = robot.getMousePos();

    robot.moveMouse(x + offset, y);

    ws.send(MOUSE.RIGHT);
  } catch (e) {
    console.log(WRONG_PARAM_MSG);
  }
};

const getPosition = (ws: WebSocket): void => {
  try {
    const { x, y }: ICoordinates = robot.getMousePos();

    const pos: string = `${MOUSE.POS} ${x},${y}`;
    
    ws.send(pos);
  } catch (e) {
    console.log(WRONG_PARAM_MSG);
  }
};

export { moveUp, moveDown, moveLeft, moveRight, getPosition };