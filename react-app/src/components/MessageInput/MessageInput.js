import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { postMessage } from '../../store/messages';
import './MessageInput.css'

function MessageInput({ serverId, channelId }) {
    const [body, setBody] = useState('');

    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user)
    
    function submitMessage(e) {
        e.preventDefault();
        const message = { 
            user_id: user.id,
            server_id: serverId,
            channel_id: channelId,
            body: body,
        };
        dispatch(postMessage(message));
        setBody('');
    }

    return (
        <div>
            <form id='msg-form' onSubmit={ submitMessage }>
                 <input 
                     id='msg-input'
                     type='text'
                     placeholder='Send a message...'
                     name='body'
                     value={body}
                     onChange={ e => setBody(e.target.value) }
                 />
                 <button id='msg-btn' type='submit'>Send</button>
            </form>
        </div>
        )
}

export default MessageInput;
