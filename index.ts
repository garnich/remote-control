import { WebSocketServer, WebSocket, createWebSocketStream } from 'ws';
import internal from 'stream';
import { env } from 'process'
import { config } from 'dotenv';

import { httpServer } from './src/http_server/index';
import { baseController } from './src/controllers/baseController';

import { 
  STATIC_SERVER_START_MSG, 
  WS_SERVER_START_MSG, 
  WS_SERVER_CLOSE_MSG, 
  CLIENT_ERROR_MSG, 
  WS_ERROR_MSG, 
  mainStreamSettings 
} from './src/constants';
 
config();

const HTTP_PORT: number = Number(env.CLIENT_PORT) || 3000;
const WS_PORT: number = Number(env.WS_PORT) || 8080;

try {
    httpServer.listen(HTTP_PORT);
    
    console.log(`${STATIC_SERVER_START_MSG} ${HTTP_PORT}`);
} catch (e) {
    console.log(`${CLIENT_ERROR_MSG}`, e);
}

try {
    const wss = new WebSocketServer({ port: WS_PORT });

    wss.on('connection', (ws: WebSocket) => {
      createWebSocketStream(ws, mainStreamSettings).on('data', (data: string) => {
        baseController(ws, data.toString());
      });
    });

    wss.on('close', () => console.log(WS_SERVER_CLOSE_MSG))

    console.log(`${WS_SERVER_START_MSG} ${WS_PORT}`);

    process.on('SIGINT', () => {
      console.log(WS_SERVER_CLOSE_MSG);
      wss.close();
      process.exit();
    });
  } catch (e) {
    console.log(`${WS_ERROR_MSG}`, e);
  }
