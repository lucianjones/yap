import socketio from "socket.io-client";

const SOCKET_URL = process.env.SOCKET_URL;

export const socket = socketio.connect(SOCKET_URL, {
	"force new connection": true,
});
