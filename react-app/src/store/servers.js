const GET_SERVERS = 'servers/GET_SERVERS'

const get_servers = (servers) => ({
    type: GET_SERVERS,
    payload: servers,
});

export const getServers = () => async(dispatch) => {
    const response = await fetch('/api/servers', {
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        crossDomain: true
    });

    const servers = await response.json();
    if (servers.errors) return;
    dispatch(get_servers(servers));
};

export default function servers(state = {}, action) {
    switch (action.type) {
        case GET_SERVERS:
            const servers = action.payload.servers
            return { ...state, ...servers}

        default:
            return state;
    }
}

