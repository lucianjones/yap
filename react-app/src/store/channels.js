const POST_CHANNEL = 'channels/POST_CHANNEL';

const post_channel = (channel) => ({
    type: POST_CHANNEL,
    payload: channel,
});

export const postChannel = (server_id, channelName, isPublic) => async(dispatch) => {
    console.log(server_id)
    const response = await fetch('/api/channels', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        crossDomain: true,
        body: JSON.stringify({ 
            "server_id": server_id,
            "channel_name": channelName,
            "public": isPublic
        })
    });

    const channel = await response.json()
    if (channel.errors) return;
    dispatch(post_channel(channel));
    return channel
};

export default function channels(state = {}, action) {
    switch(action.type) {
        case POST_CHANNEL:
            return action.payload
        default:
            return state;
    }
}
    
