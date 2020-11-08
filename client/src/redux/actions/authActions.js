import {SPOTIFY, LOGIN, LOGOUT} from "../constants/index";

const LogoutAction = () => {
    return { type: LOGOUT}
}

const LoginAction = () => {
  return { type: LOGIN };
};

const getSpotifyToken = (payload) => {
  return {
    type: SPOTIFY,
    payload: payload,
  }
}
export {LogoutAction, getSpotifyToken, LoginAction}