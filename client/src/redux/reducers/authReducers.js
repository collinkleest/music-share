import {LOGIN, LOGOUT, SPOTIFY} from "../constants/index";

const initialState = {
    loggedIn: false,
    cookies: {},
    spotifyToken: ''
}

const authReducer = (state = initialState, action) => {
  switch (action.type){
      case LOGIN:
          return {
              loggedIn: true,
              cookies: state.cookies,
              spotifyToken: state.spotifyToken
            };
      case LOGOUT:
          return {
              loggedIn: false,
              cookies: state.cookies,
              spotifyToken: state.spotifyToken
            };
      case SPOTIFY:
          return {
              loggedIn: state.loggedIn,
              cookies: state.cookies,
              spotifyToken: action.payload
          }
      default:
          return state
  }
}

export { authReducer };