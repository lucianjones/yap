import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';

import MessageInput from './MessageInput';
import { getMessages } from '../store/messages'
import { socket } from '../socket/socket'

function Messages({ serverId, channelId }) {
    const dispatch = useDispatch()
    const messages = Object.values(useSelector(store => store.messages))

    socket.once('dispatch_messages', () => {
        dispatch(getMessages(channelId))
    });

    useEffect(() => {
        dispatch(getMessages(channelId))
    },[channelId, dispatch]);

    return (
        <div id='messages'>
            { messages?.map(message => (
                <div key={ message?.id }>
                    { message?.user_id }
                    <p>{ message?.body }</p>
                </div>
            )) }
            <MessageInput serverId={ serverId } channelId={ channelId }/>
        </div>
    );
};

export default Messages;
