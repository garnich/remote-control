export interface IMessage {
  type: string;
  data: string;
  id: number
}

export interface IUser {
  name: string,
  id: number,
}

export interface IUserData extends IUser {
  password: string,
}

export interface IRoomUsers {
  name: string;
  index: number;
}

export interface IRoom {
  roomId: number;
  roomUsers: IRoomUsers[];
}

export interface IGame {
  idGame: number;
  players: IUser[] | IRoomUsers;
}

interface IPosition {
  x: number;
  y: number;
}

export interface IShip {
  position: IPosition;
  direction: boolean;
  length: number;
  type: string;
  hits?: boolean[];
}

export interface IShips {
  gameId: number;
  ships: IShip[];
  indexPlayer: number;
}
