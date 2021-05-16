import { socket } from "../socket/socket";

const GET_MESSAGES = "messages/GET_MESSAGES";

const POST_MESSAGE = "messages/POST_MESSAGE";

const PUT_MESSAGE = "messages/PUT_MESSAGE";

const DELETE_MESSAGE = "messages/DELETE_MESSAGE";

const get_messages = (messages) => ({
  type: GET_MESSAGES,
  payload: messages,
});

const post_message = (message) => ({
  type: POST_MESSAGE,
  payload: message,
});

const put_message = (message) => ({
    type: PUT_MESSAGE,
    payload: message,
});

const delete_message = (message) => ({
    type: DELETE_MESSAGE,
    payload: message,
});

export const getMessages = (channel_id) => async (dispatch) => {
  if (channel_id === -1) return;
  const response = await fetch(`/api/messages/${channel_id}`, {
    header: { "Content-Type": "application/json" },
    credentials: "include",
  });

  const result = await response.json();
  dispatch(get_messages(result.messages));
};

export const postMessage = (message) => async (dispatch) => {
  const response = await fetch("/api/messages", {
    method: "POST",
    header: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ message: message }),
  });

  const result = await response.json();
  dispatch(post_message(result.message));
  socket.emit("message_update", { room: message.channel_id });
};

export const putMessage = (update) => async (dispatch) => {
    const response = await fetch(`/api/messages/${update.message_id}`, {
        method: "PUT",
        header: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ update: update }),
    })
    const result = await response.json();
    dispatch(put_message(result.message));
    socket.emit("message_update", { room: update.channel_id });
  }

export const deleteMessage = (message) => async (dispatch) => {
    await fetch(`/api/messages/${message.id}`, {
        method: "DELETE",
        header: { "Content-Type": "application/json" },
        credentials: "include",
    })
    dispatch(delete_message(message));
    socket.emit("message_update", { room: message.channel_id }); 
}

export default function messages(state = [], action) {
  switch (action.type) {
    case GET_MESSAGES:
      const allMessages = []
      action.payload.forEach((message) => {
        allMessages.push(message)
      })
      return allMessages ;
    case POST_MESSAGE:
      state.unshift(action.payload)
      return [ ...state ];
    case PUT_MESSAGE:
          const index = state.findIndex(message => message.id === action.payload.id) 
          state[index] = action.payload
          return [ ...state ];
    case DELETE_MESSAGE:
          state = state.filter(({ id }) => id !== action.payload.id)
          return [ ...state ]; 
    default:
      return [ ...state ];
  }
}
