import robot from 'robotjs';
import Jimp from 'jimp';
import { WebSocket } from 'ws';

import { ICoordinates } from '../types';

import { PRINT_SCREEN_IMAGE_SIZE } from '../constants';

const printScreenController = (ws: WebSocket): void => {
  const { x, y }: ICoordinates = robot.getMousePos();

  const capturedScreen: robot.Bitmap = robot.screen.capture(x, y, PRINT_SCREEN_IMAGE_SIZE.height, PRINT_SCREEN_IMAGE_SIZE.width);

  new Jimp({ data: capturedScreen.image, width: PRINT_SCREEN_IMAGE_SIZE.height, height: PRINT_SCREEN_IMAGE_SIZE.width }, (err: Error, image: Jimp) => {
    if(err) {
        console.log(err);
    }
    
    image.getBuffer(Jimp.MIME_PNG, (err: Error | null, buffer: any) => {
        if(err) {
            console.log(err);
        }

        const buffedData: Buffer = Buffer.from(buffer, 'base64');

        ws.send('prnt_scrn ' + buffedData.toString('base64'));
    });
  });
};

export { printScreenController };
