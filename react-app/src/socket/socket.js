import socketio from "socket.io-client";

const SOCKET_URL = 'http://localhost:5000';

export const socket = socketio.connect(SOCKET_URL, {'force new connection': true});
