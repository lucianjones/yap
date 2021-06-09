import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Server from "../Server";
import Messages from "../Messages";
import { getServers, putServer, deleteServer } from "../../store/servers";
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
        function sock() {
		if (channelId !== -1) {
			socket.on("dispatch_messages", () => {
				dispatch(getMessages(channelId));
                console.log(channelId)
				socket.off("dipatch_messages", () => console.log("off"));
			});
		}
        }
        sock()
	}, [channelId, dispatch]);

    async function put_server(e) {
        e.preventDefault();
        const update = {
            server_name: serverName,
            isPublic: `${isPublic}`,
        }
        await dispatch(putServer(update, editServer));
		await dispatch(getServers());
        setEditServer(-1);
        setServerName('');
        setIsPublic(true);
    }

    function delete_server(id) {
        dispatch(deleteServer(id));
    }

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
                            <div id='server-mod'>
                                {user.id === server.user_id && editServer !== server.id && (
                                    <button id='edit-button' onClick={() => setEditServer(server.id)}>
                                        Edit
                                    </button>
                                )}
                                {user.id === server.user_id && (
                                    <button id='delete-button' onClick={() => delete_server(server.id)}>
                                        Delete 
                                    </button>
                                )}
                            </div>
                            {editServer === server.id && (
                                <form id='edit-server' onSubmit={put_server}>
                                    <label>
                                        Name
                                    </label>
                                    <input
                                        type='text'
                                        name='server_name'
                                        value={serverName}
                                        id='edit-server-input' 
                                        onChange={(e) => setServerName(e.target.value)}
                                    />
                                    <div>
                                        <label>
                                            Public
                                        </label>
                                        <input
                                            type='checkbox'
                                            name='public'
                                            value={isPublic}
                                            onChange={(e) => setIsPublic(e.target.value)}
                                        />
                                    </div>
                                    <button id='save-edit' type='submit'>
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
