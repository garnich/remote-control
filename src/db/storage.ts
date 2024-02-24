import { IUser, IRoom, IGame, IUserData, IRoomUsers, IShips, IWinner } from "../types";

class DBStorage {
    public users: IUserData[];
    public rooms: IRoom[];
    public games: IGame[];
    public shipsPos: IShips[];
    public winners: IWinner[];

    constructor() {
        this.users = [];
        this.rooms = [];
        this.games = []
        this.shipsPos = [];
        this.winners = [];
    }

    getAll() {
        return {
            users: this.users,
            rooms: this.rooms,
            games: this.games,
            ships: this.shipsPos,
            winners: this.winners,
        }
    }

    addUser(userData: IUserData): IUserData[] {
        this.users.push(userData);

        return this.users;
    }

    getWinners(): IWinner[] {
        return this.winners;
    }

    addWinner(id: number): void {
        const user = this.users.find((user) => user.id === id)!;
        const winnerIdx = this.winners.findIndex((winner) => winner.name === user.name);

        if (winnerIdx < 0) {
            this.winners.push({
                name: user.name,
                wins: 1,
            })
        } else {
            const winner = this.winners[winnerIdx];
            winner.wins++;
        }
    }

    createGame(usersData: IUser[] | IRoomUsers, roomId: number): IGame {
        const newGame = {
            idGame: Date.now(),
            players: usersData
        }

        this.games.push(newGame);

        this.rooms = this.rooms.filter((room) => room.roomId !== roomId)

        return newGame;
    }

    createRoom(): number {
        const newRoom = {
            roomId: Date.now(),
            roomUsers: []
        };

        this.rooms.push(newRoom);

        return newRoom.roomId;
    }

    updateRoom(id: number, name: string, userId: number): void {
        const existRoom = this.rooms.find((room) => {
            return room.roomId === id;
        });

        existRoom!.roomUsers.push({
            name,
            index: userId
        });
    }

    removeFullRoomsAndRoomWithUserInGame(id: number): void {
        this.rooms = this.rooms.filter((room) => room.roomUsers.length < 2 && room.roomUsers[0].index !== id)
    }

    getRoomsWithOneUser(): IRoom[] {
        return this.rooms.filter((room) => {
            return room.roomUsers.length === 1;
        });
    }

    getUserByName(name: string): IUser | undefined {
        return this.users.find((user: IUser) => user.name === name);
    }

    getUserById(id: number): IUser | undefined {
        return this.users.find((user: IUser) => user.id === id);
    }

    getRoomById(id: number): IRoom | undefined {
        return this.rooms.find((room: IRoom) => room.roomId === id);
    }

    getDefendPlayerId(indexPlayer: number, gameId: number): number {
        const currentGame = this.games.filter((game) => game.idGame === gameId);
        const defendPlayer = (currentGame[0].players as IUser[]).filter((player :IUser) => player.id !== indexPlayer);
        return defendPlayer[0].id;
    }

    addShips(shipData: IShips): void {
        this.shipsPos.push(shipData);
    }

    getShipsDataByIds(gameId: number, playerId: number): IShips {
        return this.shipsPos.find(ship => ship.gameId === gameId && ship.indexPlayer === playerId)!
    }
}

export default new DBStorage();
