import React from 'react';
import Messages from './Messages'

function Channel({ serverId, channel, state }) {
    const { messages, setMessages } = state

    function click() {
        messages === channel.id ? setMessages(-1) : setMessages(channel.id)
    }
    return (
        <div id='messages'>
            <button onClick={click}>
                { channel.channel_name }
            </button>
            { messages === channel.id && <Messages serverId={serverId} channelId={channel.id}/> }
        </div>
    )
}

export default Channel;
