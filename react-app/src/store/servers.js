const GET_SERVERS = "servers/GET_SERVERS";

const GET_SERVER = "servers/GET_SERVER";

const POST_SERVER = "servers/POST_SERVER";

const PUT_SERVER = "server/PUT_SERVER";

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

export const putServer = (server_name, isPublic, server_id) => async (dispatch) => {
    const response = await fetch(`/api/servers/${server_id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        crossDomain: true,
        body: JSON.stringify({ server_name: server_name, public: isPublic }),
    });
    const server = await response.json();
    if (server.errors) return;
    dispatch(put_server(server));
    return server;
};
        

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
    default:
      return state;
  }
}
