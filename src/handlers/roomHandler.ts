import DBStorage from '../db/storage';
import { Server } from 'ws';
import { WebSocketWithID } from "../http_server";

export const roomHandler = (ws: WebSocketWithID, wss: Server): void => {
  const indexRoom = DBStorage.createRoom();

  ws.send(JSON.stringify({
    type: 'add_user_to_room',
    data: JSON.stringify({
      indexRoom,
    }),
    id: 0
  }));

  const userId = ws.id as number
  const userName = DBStorage.getUserById(userId)?.name;

  if(userName) {
    DBStorage.updateRoom(indexRoom, userName, userId);
  }
    const roomsWithOneUser = DBStorage.getRoomsWithOneUser();

    if (roomsWithOneUser.length) {
      wss.clients.forEach((client) => {
        client.send(
          JSON.stringify({
            type: 'update_room',
            data: JSON.stringify(roomsWithOneUser),
            id: 0,
          })
        );
      });
    }
};

export const joinRoomHandler = (messageData: string, ws: WebSocketWithID, wss: Server) => {
  const getData = (msg: string): { indexRoom: number } => JSON.parse(msg);

  const { indexRoom } = getData(messageData);

  const activeRoom = DBStorage.getRoomById(indexRoom);

  const singlePlayer = activeRoom?.roomUsers[0];

  if(singlePlayer && singlePlayer?.index !== ws.id) {
    const secondPlayer = DBStorage.getUserById(ws.id as number);

    const { idGame } = DBStorage.createGame([{ name: singlePlayer.name, id: singlePlayer.index }, secondPlayer!], indexRoom);
    wss.clients.forEach((client: WebSocketWithID) => {
      if(client.id === ws.id) {
        client.send(JSON.stringify({
          type: "create_game",
          data: JSON.stringify({
            idGame,
            idPlayer: ws.id,
          }),
          id: 0
        }));

        DBStorage.removeFullRoomsAndRoomWithUserInGame(client.id as number);

      } else if (client.id === singlePlayer.index) {
        client.send(JSON.stringify({
          type: "create_game",
          data: JSON.stringify({
            idGame,
            idPlayer: singlePlayer.index,
          }),
          id: 0
        }));
      }
    });
  }

  const rooms = DBStorage.getAll().rooms;

  wss.clients.forEach((client: WebSocketWithID) => {
    client.send(
      JSON.stringify({
        type: 'update_room',
        data: JSON.stringify(rooms),
        id: 0,
      })
    );
  });
};
