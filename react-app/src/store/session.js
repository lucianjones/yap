// constants
const SET_USER = "session/SET_USER";
const REMOVE_USER = "session/REMOVE_USER";
const GET_USER = "session/GET_USER";

const setUser = (user) => ({
  type: SET_USER,
  payload: user,
});

const removeUser = () => ({
  type: REMOVE_USER,
});

const get_user = (user) => ({
  type: GET_USER,
  payload: user,
});

export const getUser = (id) => async (dispatch) => {
  const response = await fetch(`/api/users/${id}`, {
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });
  const user = await response.json();
  if (user.errors) {
    return;
  }
  dispatch(get_user(user));
};

// thunks
export const authenticate = () => async (dispatch) => {
  const response = await fetch("/api/auth", {
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();
  if (data.errors) {
    return;
  }
  dispatch(setUser(data));
};

export const login = (email, password) => async (dispatch) => {
  const response = await fetch("/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });
  const data = await response.json();
  if (data.errors) {
    return data;
  }
  dispatch(setUser(data));
  return {};
};

export const logout = () => async (dispatch) => {
  await fetch("/api/auth/logout", {
    headers: {
      "Content-Type": "application/json",
    },
  });
  dispatch(removeUser());
};

export const signUp = (username, email, password) => async (dispatch) => {
  const response = await fetch("/api/auth/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username,
      email,
      password,
    }),
  });
  const data = await response.json();
  dispatch(setUser(data));
};

// reducer

const initialState = { user: null };

// useSelector(state => state.session.user)

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_USER:
      return { user: action.payload };
    case REMOVE_USER:
      return { user: null };
    case GET_USER:
      return { user: action.payload };
    default:
      return state;
  }
}
