import { socket } from "../socket/socket";

const GET_MESSAGES = "messages/GET_MESSAGES";

const POST_MESSAGE = "messages/POST_MESSAGE";

const PUT_MESSAGE = "messages/PUT_MESSAGE";

const DELETE_MESSAGE = "messages/DELETE_MESSAGE";

const get_messages = (messages) => ({
  type: GET_MESSAGES,
  payload: messages,
});

const post_message = (messages) => ({
  type: POST_MESSAGE,
  payload: messages,
});

const put_message = () => ({
    type: PUT_MESSAGE,
});

const delete_message = () => ({
    type: DELETE_MESSAGE,
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
  dispatch(post_message(result.messages));
  socket.emit("message_update", { room: message.channel_id });
};

export const putMessage = (update) => async (dispatch) => {
    await fetch(`/api/messages/${update.message_id}`, {
        method: "PUT",
        header: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ update: update }),
    })
    dispatch(put_message());
    socket.emit("message_update", { room: update.channel_id });
  }

export const deleteMessage = (message) => async (dispatch) => {
    await fetch(`/api/messages/${message.id}`, {
        method: "DELETE",
        header: { "Content-Type": "application/json" },
        credentials: "include",
    })
    dispatch(delete_message());
    socket.emit("message_update", { room: message.channel_id }); 
}

export default function messages(state, action) {
  switch (action.type) {
    case GET_MESSAGES:
      return { ...action.payload };
    case POST_MESSAGE:
      return { ...action.payload };
    case PUT_MESSAGE:
          return { ...state };
    case DELETE_MESSAGE:
          return { ...state }; 
    default:
      return { ...state };
  }
}
