import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import MessageInput from "../MessageInput";
import { getMessages } from "../../store/messages";
import "./Messages.css";

function Messages({ serverId, channelId }) {
	const dispatch = useDispatch();
	const messages = Object.values(useSelector((store) => store.messages));
	const user = useSelector((store) => store.session.user);

	useEffect(() => {
		dispatch(getMessages(channelId));
	}, [channelId, dispatch]);

	function dateParser(str) {
		const split = str.slice(0, -1).split("T");
		return `${split[0]} ${split[1]}`;
	}

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
					</>
				))}{" "}
			</div>{" "}
			<MessageInput serverId={serverId} channelId={channelId} />{" "}
		</div>
	);
}

export default Messages;
