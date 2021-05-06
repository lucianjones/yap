import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Server from './Server'
import { getServers } from '../store/servers'


function Home() {
    const [loaded, setLoaded] = useState(false);
    const servers = Object.values(useSelector((store) => store.servers));
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getServers());
        setLoaded(true);
    }, [dispatch, loaded]); 

    if (!loaded) {
        return (
            <h1>Loading...</h1>
        )
    } else {
        return (
            <div id='servers'>
                { servers.map(server => <Server key={server.id} server={server}/>) }
            </div>
        )
    }
}

export default Home;
