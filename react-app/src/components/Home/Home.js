import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Server from "../Server";
import Messages from "../Messages";
import { getServers, putServer } from "../../store/servers";
import ServerFormModal from "../ServerFormModal";
import { getMessages } from "../../store/messages";
import { socket } from "../../socket/socket";
import "./Home.css";

function Home() {
	const [loaded, setLoaded] = useState(false);
	const [channelId, setChannelId] = useState(-1);
	const [serverId, setServerId] = useState(-1);
    const [editServer, setEditServer] = useState(-1);
    const [serverName, setServerName] = useState('');
    const [isPublic, setIsPublic] = useState(true)
	const servers = Object.values(useSelector((store) => store.servers));
    const user = useSelector((store) => store.session.user);
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

    function put_server(e) {
        e.preventDefault();
        const update = {
            server_name: serverName,
            isPublic: isPublic,
            server_id: editServer,
        }
        dispatch(putServer(update));
        setEditServer(-1);
        setServerName('');
        setIsPublic(true);
    }
    console.log(editServer)

	if (!loaded) {
		return <h1>Loading...</h1>;
	} else {
		return (
			<div id="home">
				<div id="sidebar">
					<ServerFormModal />
					<div id="servers">
						{servers.map((server) => (
                            <>
							<Server
								key={server.id}
								server={server}
								channel_id={{ channelId, setChannelId }}
								server_id={{ serverId, setServerId }}
							/>
                            {user.id === server.user_id && editServer !== server.id && (
                                <button onClick={() => setEditServer(server.id)}>
                                    Edit
                                </button>
                                    )}
                            {editServer === server.id && (
                                <form onSubmit={put_server}>
                                    <input
                                        type='text'
                                        name='server_name'
                                        value={serverName}
                                        onChange={(e) => setServerName(e.target.value)}
                                    />
                                    <input
                                        type='checkbox'
                                        name='public'
                                        value={isPublic}
                                        onChange={(e) => setIsPublic(e.target.value)}
                                    />
                                    <button type='submit'>
                                        Save
                                    </button>
                                </form>
                            )}
                            </>
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
