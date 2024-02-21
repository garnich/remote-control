import DBStorage from '../db/storage';
import { IUserData } from "../types";

export const regHandler = (messageData: string, id: number): string => {

    const getData = (msg: string): IUserData => JSON.parse(msg)

    const { name, password } = getData(messageData);

    const isUserNameExist = DBStorage.getUserByName(name);

    if (isUserNameExist) {
        return JSON.stringify({
            type: "reg",
            data: JSON.stringify({
                name,
                index: 0,
                error: true,
                errorText: `User: ${name} already exist. Choose another login name.`,
            }),
            id: 0
        })
    }

    DBStorage.addUser({ name, password, id });

    return JSON.stringify({
        type: "reg",
        data: JSON.stringify({
            name,
            index: id,
            error: false,
            errorText: '',
        }),
        id: 0
    })
};
