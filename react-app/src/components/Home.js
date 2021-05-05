import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getServers } from '../store/servers';


function Home() {
    const [loaded, setLoaded] = useState(false);
    const [showServer, setShowServer] = useState(-1);
    const [showChannel, setShowChannel] = useState([-1]);
    const dispatch = useDispatch();
    //const user = useSelector((store) => store.session.user);
    const servers = Object.values(useSelector((store) => store.server));

    useEffect(() => {
        dispatch(getServers());
        setLoaded(true);
    }, [dispatch]); 

    function serverToggle(id) {
        if (showServer !== id) {
            setShowServer(id)
        } else {
            setShowServer(-1)
        }
    }

    function channelToggle(id, messages) {
        if (showChannel[0] !== id) {
            setShowChannel([id, ...messages])
            console.log(showChannel)
        } else {
            setShowChannel([-1])
        }
    }


    if (!loaded) {
        return (
            <h1>Loading...</h1>
        )
    } else {
        return (
            <>
            { servers.map(server => (
                <div key={ server.id }>
                    <h1 onClick={() => serverToggle(server.id)}>{ server.server_name }</h1>
                    { server.id === showServer && server.channels.map(channel => (
                        <p key={ channel.id } onClick={() => channelToggle(channel.id, channel.messages)} >{ channel.channel_name }</p>
                    ))}
                </div>
            ))}
            { showChannel[0] !== -1 && (
                <>
                { showChannel.slice(1).map((message) => (
                    <p key={message.id}>{message.body}</p>
                ))}
                </>
            )}
            </>
        )
    }
}

export default Home;
