const GET_SERVERS = 'servers/GET_SERVERS'

const GET_SERVER = 'servers/GET_SERVER'

const get_servers = (servers) => ({
    type: GET_SERVERS,
    payload: servers,
});

const get_server = (server) => ({
    type: GET_SERVER,
    payload: server,
});

export const getServers = () => async(dispatch) => {
    const response = await fetch('/api/servers', {
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        crossDomain: true
    });

    const servers = await response.json();
    if (servers.errors) return;
    dispatch(get_servers(servers.servers));
};

export const getServer = (id) => async(dispatch) => {
    const response = await fetch(`/api/servers/${id}`, {
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        crossDomain: true
    });
    const server = await response.json()
    if (server.errors) return;
    dispatch(get_server(server))
};


export default function servers(state = {}, action) {
    switch(action.type) {
        case GET_SERVERS:
            return { ...action.payload } 
        case GET_SERVER:
            return { ...state, server: action.payload }
        default:
            return state;
    }
}

