import React, { useState, useEffect } from 'react';

import Channel from './Channel';
import { socket } from '../socket/socket'
import ChannelFormModal from './ChannelFormModal'

function Server({ server }) {
    const [channels, setChannels] = useState(false);
    const [messages, setMessages] = useState(-1);
    

    useEffect(() => {
        if (!channels) {
            server.channels.forEach(channel => {
                socket.emit('leave', { 'room': channel.id })
            })
        } else {
            server.channels.forEach(channel => {
                socket.emit('join', { 'room': channel.id })
            })
        }
    }, [channels, server.channels])


        return (
            <div id='channels'>
                <button onClick={() => channels ? setChannels(false) : setChannels(true)}>
                    { server?.server_name }
                </button>
                { channels && <ChannelFormModal server_id={server?.id}/> }
                { channels && server.channels.map(channel => (
                    <Channel key={ channel.id } serverId={ server?.id } channel={ channel } state={{ messages, setMessages }}/>
                ))}
            </div>
    );
};

export default Server;
