import React from 'react';
import './Channel.css'

function Channel({ sid, channel, channel_id, server_id }) {
    const { channelId, setChannelId } = channel_id
    const { setServerId } = server_id

    function click() {
        channelId === channel.id ? setChannelId(-1) : setChannelId(channel.id)
        channelId === channel.id ? setServerId(-1) : setServerId(sid)
    }
    return (
            <button class='channel-button' onClick={click}>
                { channel.channel_name }
            </button>
    )
}

export default Channel;
