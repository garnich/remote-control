import * as fs from 'fs';
import * as path from 'path';
import * as http from 'http';

export const httpServer = http.createServer(function (req, res) {
    const __dirname = path.resolve(path.dirname(''));
    const file_path = __dirname + (req.url === '/' ? '/front/index.html' : '/front' + req.url);
    
    const readStream = fs.createReadStream(file_path);

    readStream.on('open', () => readStream.pipe(res));
    readStream.on('error', (err) => res.end(err));
});
