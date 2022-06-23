import robot from 'robotjs';
import Jimp from 'jimp';

import { PRINT_SCREEN_IMAGE_SIZE } from '../constants';

const printScreenController = (ws: any): void => {
  const { x, y } = robot.getMousePos();

  const capturedScreen = robot.screen.capture(x, y, PRINT_SCREEN_IMAGE_SIZE.height, PRINT_SCREEN_IMAGE_SIZE.width);

  new Jimp({ data: capturedScreen.image, width: PRINT_SCREEN_IMAGE_SIZE.height, height: PRINT_SCREEN_IMAGE_SIZE.width }, (err: Error, image: any) => {
    image.getBuffer(Jimp.MIME_PNG, (err: Error, buffer: string) => {

      const buffedData: Buffer = Buffer.from(buffer, 'base64');

      ws.send('prnt_scrn ' + buffedData.toString('base64'));
    });
  });
};

export { printScreenController };
