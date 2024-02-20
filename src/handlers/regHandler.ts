import DBStorage from '../db/storage';

export const regHandler = (data: string): string => {
    const messageData = JSON.parse(data);

    const { name } = messageData;

    const isUserExist = DBStorage.getUserByName(name);

    if (isUserExist) {
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

    DBStorage.addUser(messageData);

    return JSON.stringify({
        type: "reg",
        data: JSON.stringify({
            name,
            index: 0,
            error: false,
            errorText: '',
        }),
        id: 0
    })
};
