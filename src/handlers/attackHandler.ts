import { WebSocketWithID } from '../http_server';
import DBStorage from '../db/storage';
import {attackStatus, IAttackStatus, IShip, IShot} from '../types';
import { Server } from "ws";
import {updateWinnersHandler} from "./updatedWinnersHandler";

export const attackHandler = (messageData: string, ws: WebSocketWithID, wss: Server) => {
  const getData = (msg: string): IShot => JSON.parse(msg);
  const getRandomPos = () => Math.round(Math.random() * 10);

  const { x = getRandomPos(), y = getRandomPos(), indexPlayer , gameId} = getData(messageData);

  const defendPlayerId = DBStorage.getDefendPlayerId(indexPlayer, gameId)

  const { status, win } = getAttackStatus(gameId, defendPlayerId, x, y);

  win && DBStorage.addWinner(indexPlayer);

  const turnId = status === 'killed' ||  status === 'shot' ? indexPlayer : defendPlayerId;

  wss.clients.forEach((client: WebSocketWithID) => {
    if(client.id === indexPlayer || client.id === defendPlayerId) {
      client.send(JSON.stringify({
        type: 'attack',
        data: JSON.stringify({
          position: {x, y},
          currentPlayer: indexPlayer,
          status,
        }),
        id: indexPlayer,
      }));

      client.send(JSON.stringify({
        type: 'turn',
        data: JSON.stringify({currentPlayer: turnId}),
        id: 0,
      }));

      if (win) {
        client.send(JSON.stringify({
          type: 'finish',
          data: JSON.stringify({winPlayer: indexPlayer}),
          id: 0,
        }));

        client.send(updateWinnersHandler());
      }
    }
  });
};

const getAttackStatus = (gameId: number, playerId: number, xAttackPos: number, yAttackPos: number): IAttackStatus  => {
  const shipsUnderAttack = DBStorage.getShipsDataByIds(gameId, playerId).ships;

  const attackStatus: IAttackStatus= {
    status: 'miss',
    win: false
  };

  for (const ship of shipsUnderAttack) {
    const { position, direction, length, hits } = ship;
    const { x: xShipPos, y: yShipPos } = position;

    if (!hits) {
      ship.hits = Array(length).fill(false);
    }

    if (direction) {
      if (xAttackPos === xShipPos && yAttackPos >= yShipPos && yAttackPos < yShipPos + length) {
        attackStatus.status = getInterception(yAttackPos, yShipPos, ship);
      }
    } else {
        if (yAttackPos === yShipPos && xAttackPos >= xShipPos && xAttackPos < xShipPos + length) {
          attackStatus.status =  getInterception(xAttackPos, xShipPos, ship);
      }
    }
  }

  if (attackStatus.status === 'killed') {
    const attackResult = shipsUnderAttack.reduce((acc, ship) => {
      if(!ship.hits){
        acc.notAttacked += 1;
      } else if (acc.notAttacked === 0 && ship.hits!.every(hit => hit)) {
        acc.destroyed += 1;
      }

      return acc;
    }, { notAttacked: 0, destroyed: 0 });

    attackStatus.win = attackResult.notAttacked === 0 && attackResult.destroyed === shipsUnderAttack.length;
  }

  return attackStatus;
};

const getInterception = (attackPos: number, shipPos: number, ship: IShip): attackStatus => {
  const hitIdx = attackPos - shipPos;
  ship.hits![hitIdx] = true;

  const isFlooded = Boolean(ship.hits!.filter((hit) => hit).length);

  return isFlooded ? 'killed' : 'shot';
};
