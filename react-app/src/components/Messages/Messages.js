import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import MessageInput from "../MessageInput";
import { getMessages,putMessage, deleteMessage } from "../../store/messages";
import "./Messages.css";

function Messages({ serverId, channelId }) {
    const [edit, setEdit] = useState(-1);
    const [body, setBody] = useState('');
	const dispatch = useDispatch();
	const messages = Object.values(useSelector((store) => store.messages));
	const user = useSelector((store) => store.session.user);

	useEffect(() => {
		dispatch(getMessages(channelId));
	}, [channelId, dispatch]);

	function dateParser(str) {
		const split = str.slice(0, -1).split("T");
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
				{" "}
				{messages.map((message) => (
					<>
						{" "}
						{message.user_id !== user.id && (
							<div class="not-yours" key={message.id}>
								<div class="name-date">
									<h3> {message.username} </h3>{" "}
									<p> {dateParser(message.created_at)} </p>{" "}
								</div>{" "}
								<p> {message.body} </p>{" "}
							</div>
						)}{" "}
						{message.user_id === user.id && (
							<div class="yours" key={message.id}>
								<div class="name-date">
									<h3> {message.username} </h3>{" "}
									<p> {dateParser(message.created_at)} </p>{" "}
								</div>{" "}
								<p> {message.body} </p>{" "}
							</div>
						)}{" "}
                        {message.user_id === user.id && (
                            <button onClick={() =>delBtn(message)}>Delete</button>
                        )}
                        {(message.user_id === user.id && edit !== message.id) && (
                            <button onClick={() =>setEdit([message.id, message.channel_id])}>Edit</button>
                        )}
                        {edit[0] === message.id && (
                                <form onSubmit={editMessage}>
                                    <input
                                        type="text"
                                        placeholder="Edit your message..."
                                        name="body"
                                        value={body}
                                        onChange={(e) => setBody(e.target.value)}
                                    />
                                    <button type="submit">
                                        Save
                                    </button>
                                </form>
                        )}
					</>
				))}{" "}
			</div>{" "}
			<MessageInput serverId={serverId} channelId={channelId} />{" "}
		</div>
	);
}

export default Messages;
