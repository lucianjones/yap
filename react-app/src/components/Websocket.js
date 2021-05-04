import React from 'react';
import { io } from 'socket.io-client';

function Websocket() {
    
    const socket = io();
    socket.on('connect', function() {
        console.log('connected')
        socket.emit('my event', {data: 'I\'m connected!'});
    });

    socket.onAny((event, ...args) => {
        console.log(`######### Response-event: ${event} ############`)
    });

    const click = () => socket.emit('my event', {hello: 'hello'})

    return(
        <>
            <button onClick={click}>Click Me</button>
        </>
    )
}

export default Websocket;
