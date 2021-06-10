const GET_SERVERS = "servers/GET_SERVERS";

const GET_SERVER = "servers/GET_SERVER";

const POST_SERVER = "servers/POST_SERVER";

const PUT_SERVER = "servers/PUT_SERVER";

const DELETE_SERVER = 'servers/DELETE_SERVER';

const GET_SERVER_QUERY = 'servers/GET_SERVER_QUERY';

const JOIN_SERVER = 'servers/JOIN_SERVER';

const get_servers = (servers) => ({
  type: GET_SERVERS,
  payload: servers,
});

const get_server = (server) => ({
  type: GET_SERVER,
  payload: server,
});

const post_server = (server) => ({
  type: POST_SERVER,
  payload: server,
});

const put_server = (server) => ({
    type: PUT_SERVER,
    payload: server,
})

const delete_server = (server) => ({
    type: DELETE_SERVER,
    payload: server,
})

const get_server_query = (servers) => ({
    type: GET_SERVER_QUERY,
    payload: servers,
});

const join_server = (server) => ({
    type: JOIN_SERVER,
    payload: server,
});

export const getServers = () => async (dispatch) => {
  const response = await fetch("/api/servers", {
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    crossDomain: true,
  });

  const servers = await response.json();
  if (servers.errors) return;
  dispatch(get_servers(servers.servers));
};

export const getServer = (id) => async (dispatch) => {
  const response = await fetch(`/api/servers/${id}`, {
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    crossDomain: true,
  });
  const server = await response.json();
  if (server.errors) return;
  dispatch(get_server(server));
};

export const postServer = (serverName, isPublic) => async (dispatch) => {
  const response = await fetch("/api/servers", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    crossDomain: true,
    body: JSON.stringify({ server_name: serverName, public: isPublic }),
  });
  const server = await response.json();
  if (server.errors) return;
  dispatch(post_server(server));
  return server;
};

export const putServer = (update, serverId) => async (dispatch) => {
    const response = await fetch(`/api/servers/${serverId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        crossDomain: true,
        body: JSON.stringify({ update: update }),
    });
    const server = await response.json();
    if (server.errors) return;
    dispatch(put_server(server));
    return server;
};

export const deleteServer = (id) => async (dispatch) => {
    const response = await fetch(`/api/servers/${id}`, {
        method: 'DELETE',
        headers: { "Content-Type": "application/json" }, 
        credentials: "include",
        crossDomain: true,
    })
    const server = await response.json()
    if (server.errors) return;
    dispatch(delete_server());
}

export const getServerQuery = (query) => async (dispatch) => {
    const response = await fetch(`/api/servers/search?query=${query}`, {
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        crossDomain: true,
    });
    const servers = await response.json();
    if (servers.errors) return;
    dispatch(get_server_query(servers));
    return servers.results
}

export const joinServer = (id) => async (dispatch) => {
    const response = await fetch(`/api/servers/join/${id}`, {
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        crossDomain: true,
    });
    const server = await response.json();
    if (server.errors) return;
    dispatch(join_server(server));
}
        

export default function servers(state = {}, action) {
  switch (action.type) {
    case GET_SERVERS:
      return { ...action.payload };
    case GET_SERVER:
      return { ...state, server: action.payload };
    case POST_SERVER:
      return { ...state, server: action.payload };
    case PUT_SERVER:
          return { ...state, server: action.payload };
    case DELETE_SERVER:
          delete state.server
          return { ...state } 
    case GET_SERVER_QUERY:
          return { ...state };
    case JOIN_SERVER:
          const serv = action.payload
          return { ...state, serv  }
    default:
      return state;
  }
}
