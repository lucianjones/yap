import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import MessageInput from "../MessageInput";
import { getMessages, putMessage, deleteMessage } from "../../store/messages";
import "./Messages.css"

function Messages({ serverId, channelId }) {
    const [edit, setEdit] = useState(-1);
    const [body, setBody] = useState('');
	const dispatch = useDispatch();
	const messages = Object.values(useSelector((store) => store.messages));
	const user = useSelector((store) => store.session.user);

	function dateParser(str) {
		const split = str.slice(0, -1).split("T");
        split[0] = split[0].split('-').join('/')
        split[1] = split[1].slice(0, 5)
        console.log(`str: ${str} split: ${split}`)
		return `${split[0]} ${split[1]}`;
	};

    const delBtn = (message) => {
        dispatch(deleteMessage(message)); 
    };

    function editMessage(e) {
        e.preventDefault();
        const update = {
            body: body,
            message_id: edit[0],
            channel_id: edit[1]
        }
        console.log(update)
        dispatch(putMessage(update))
        setEdit(-1);
        setBody('');
    };
    
	return (
		<div id="main">
			<div id="messages">
				{messages.map((message) => (
                    <div key={message.id} style={{'display': 'flex', 'flex-direction': 'column'}}>
						{message.user_id !== user.id && (
							<div className="not-yours" >
								<div className="name-date">
									<h3> {message.username} </h3>
									<p> {dateParser(message.created_at)} </p>
								</div>
								<p> {message.body} </p>
							</div>
						)}
						{message.user_id === user.id && (
							<div className="yours" key={message.id}>
								<div className="name-date">
									<h3> {message.username} </h3>
									<p> {dateParser(message.created_at)} </p>
								</div>
								<p> {message.body} </p>
                                {message.user_id === user.id && (
                                    <button id='dt-btn' className='edit-delete' onClick={() =>delBtn(message)}>Delete</button>
                                )}
                                {(message.user_id === user.id && edit !== message.id) && (
                                    <button  className='edit-delete' onClick={() =>setEdit([message.id, message.channel_id])}>Edit</button>
                                )}
                                {edit[0] === message.id && (
                                    <form onSubmit={editMessage}>
                                         <input
                                            id='msg-edit-input'
                                            type="text"
                                            placeholder="Edit your message..."
                                            name="body"
                                            value={body}
                                            onChange={(e) => setBody(e.target.value)}
                                        />
                                        <button id='msg-edit-save' type="submit">
                                             Save
                                        </button>
                                     </form>
                                )}
							</div>
						)}
                    </div>
				))}
			</div>
			<MessageInput serverId={serverId} channelId={channelId} />
		</div>
	);
}

export default Messages;
