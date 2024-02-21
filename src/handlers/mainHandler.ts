import { Server } from 'ws';
import { regHandler } from "./regHandler";
import {joinRoomHandler, roomHandler} from "./roomHandler";
import { IMessage } from "../types";
import DBStorage from "../db/storage";
import { WebSocketWithID } from "../http_server";

export const mainHandler = (ws: WebSocketWithID, wss: Server, data: string): string | string[] => {
    const message: IMessage = JSON.parse(data as string);
    const type = message.type;

    if(type === 'reg') {
        ws.send(regHandler(message.data, ws.id as number));
    }

    if(type === 'create_room') {
        roomHandler(ws, wss);
    }

    if(type === 'add_user_to_room') {
        joinRoomHandler(message.data, ws, wss);
    }

    return '';
};
