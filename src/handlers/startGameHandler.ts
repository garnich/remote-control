import DBStorage from '../db/storage';
import { Server } from 'ws';
import { WebSocketWithID } from '../http_server';
import {IShips} from '../types';

export const startGameHandler = (messageData: string, ws: WebSocketWithID) => {
  const getData = (msg: string): IShips => JSON.parse(msg);

  const { ships, indexPlayer, gameId } = getData(messageData);

  DBStorage.addShips({ ships, indexPlayer, gameId });

  const response = {
    type: 'start_game',
    data: JSON.stringify({
      ships,
      currentPlayerIndex: indexPlayer,
    }),
    id: ws.id,
  };

  ws.send(JSON.stringify(response));
};
