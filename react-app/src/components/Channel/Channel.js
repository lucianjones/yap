import React from "react";
import { getMessages } from "../../store/messages";
import { useDispatch } from "react-redux";
import "./Channel.css";

function Channel({ sid, channel, channel_id, server_id }) {
	const { channelId, setChannelId } = channel_id;
	const { setServerId } = server_id;
    const dispatch = useDispatch()

	function click() {
		if (channelId === channel.id) {
		 	setChannelId(-1)
		} else {
			setChannelId(-1)
		 	setChannelId(channel.id);
		}
		channelId === channel.id ? setServerId(-1) : setServerId(sid);
        dispatch(getMessages(channel.id))
	}
	return (
		<button className="channel-button" onClick={click}>
			{channel.channel_name}
		</button>
	);
}

export default Channel;
