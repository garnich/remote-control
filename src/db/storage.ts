import {IUser, IRoom, IGame, IUserData, IRoomUsers} from "../types";

class DBStorage {
    public users: IUserData[];
    public rooms: IRoom[];
    public games: IGame[];

    constructor() {
        this.users = [];
        this.rooms = [];
        this.games = [];
    }

    getAll() {
        return {
            users: this.users,
            rooms: this.rooms,
            games: this.games
        }
    }

    addUser(userData: IUserData): IUserData[] {
        this.users.push(userData);

        return this.users;
    }

    createGame(usersData: IUser[] | IRoomUsers, roomId: number): IGame {
        const newGame = {
            idGame: this.games.length,
            players: usersData
        }

        this.games.push(newGame);

        this.rooms = this.rooms.filter((room) => room.roomId !== roomId)

        return newGame;
    }

    createRoom(): number {
        const rooms = this.rooms.push({
            roomId: this.rooms.length,
            roomUsers: []
        });

        return rooms - 1;
    }

    updateRoom(id: number, name: string): void {
        const existRoom = this.rooms.filter((room) => {
            return room.roomId === id;
        });

        existRoom[0].roomUsers.push({
            name,
            index: id
        });
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
}

export default new DBStorage();
