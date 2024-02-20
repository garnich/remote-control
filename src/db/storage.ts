interface IUser {
    name: string,
    password: string
}

class DBStorage {
    public users: IUser[];

    constructor() {
        this.users = [];
    }

    addUser(userData: IUser): IUser[] {
        this.users.push(userData);

        return this.users;
    }

    getUserByName(name: string): IUser | undefined {
        return this.users.find((user: IUser) => user.name === name);
    }
}

export default new DBStorage();
