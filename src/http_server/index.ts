import * as fs from 'fs';
import * as path from 'path';
import * as http from 'http';
import WebSocket, { WebSocketServer } from 'ws';
import { mainHandler } from "../handlers/mainHandler";

export interface WebSocketWithID extends WebSocket {
    id?: number;
}

export const httpServer = http.createServer(function (req, res) {
    const __dirname = path.resolve(path.dirname(''));
    const file_path = __dirname + (req.url === '/' ? '/front/index.html' : '/front' + req.url);
    fs.readFile(file_path, function (err, data) {
        if (err) {
            res.writeHead(404);
            res.end(JSON.stringify(err));
            return;
        }
        res.writeHead(200);
        res.end(data);
    });
});

const wss = new WebSocketServer({ port: 3000 });

wss.on('connection', (ws: WebSocketWithID) => {
    ws.id = Date.now() * 10;
    ws.on('error', console.error);

    ws.on('message', (data: string) => mainHandler(ws, wss, data));
});
