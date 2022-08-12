import {PORT} from './config.js';
import express from 'express';
import cors from 'cors';
import { Server as SocketServer} from "socket.io";
import morgan from 'morgan';
import http from "http";

const app = express();
const server = http.createServer(app);
const io = new SocketServer(server, {
    cors:{
        origin: '*'
    }
});

io.on('connection', (socket) => {
    socket.on("message", (message) => {
        socket.broadcast.emit("message", {
            body: message,
            from: socket.id
        });
    });
});

app.use(morgan('dev'));
app.use(cors());

server.listen(PORT);
console.log("Server is running on port: " + PORT);
