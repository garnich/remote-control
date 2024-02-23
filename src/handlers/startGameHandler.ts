import DBStorage from '../db/storage';
import { WebSocketWithID } from '../http_server';
import { Server } from "ws";
import {IShips, IUser} from '../types';

export const startGameHandler = (messageData: string, ws: WebSocketWithID, wss: Server) => {
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

  const players = DBStorage.getAll().games.filter(game => game.idGame === gameId)![0].players;
  const firstPlayerId = (players as IUser[])[0].id;

  wss.clients.forEach((client: WebSocketWithID) => {
    if (client.id === indexPlayer) {
      client.send(JSON.stringify(response));
      client.send(JSON.stringify({
        type: 'turn',
        data: JSON.stringify({currentPlayer: firstPlayerId}),
        id: 0,
      }));
    }
  });
};
