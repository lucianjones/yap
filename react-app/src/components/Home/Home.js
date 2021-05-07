import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Server from "../Server";
import Messages from "../Messages";
import { getServers } from "../../store/servers";
import ServerFormModal from "../ServerFormModal";
import { getMessages } from "../../store/messages";
import { socket } from "../../socket/socket";
import "./Home.css";

function Home() {
	const [loaded, setLoaded] = useState(false);
	const [channelId, setChannelId] = useState(-1);
	const [serverId, setServerId] = useState(-1);
	const servers = Object.values(useSelector((store) => store.servers));
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getServers());
		setLoaded(true);
	}, [dispatch, loaded]);

	useEffect(() => {
		if (channelId !== -1) {
			socket.on("dispatch_messages", () => {
				dispatch(getMessages(channelId));
				socket.off("dipatch_messages", () => console.log("off"));
			});
		}
	}, [channelId, dispatch]);

	if (!loaded) {
		return <h1>Loading...</h1>;
	} else {
		return (
			<div id="home">
				<div id="sidebar">
					<ServerFormModal />
					<div id="servers">
						{servers.map((server) => (
							<Server
								key={server.id}
								server={server}
								channel_id={{ channelId, setChannelId }}
								server_id={{ serverId, setServerId }}
							/>
						))}
					</div>
				</div>
				{channelId !== -1 && (
					<Messages serverId={serverId} channelId={channelId} />
				)}
			</div>
		);
	}
}

export default Home;
