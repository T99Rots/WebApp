import {
  REGISTER_SUCCESS,
  REGISTER_FAILED,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  LOGOUT_SUCCESS,
  CLEAR_ERRORS
} from '../actions/user';

const initialState = {
  loggedIn: localStorage.userId && localStorage.token,
  loginErrors: {},
  registerErrors: {}
}

const user = (state = initialState, action) => {
  switch(action.type) {
    case REGISTER_SUCCESS:
      return {
        ...state,
        loggedIn: true
      }
    case REGISTER_FAILED:
      return {
        ...state,
        loggedIn: false,
        registerErrors: action.errors
      }
    case LOGIN_SUCCESS:
      return {
        ...state,
        loggedIn: true
      }
    case LOGIN_FAILED:
      return {
        ...state,
        loggedIn: false,
        loginErrors: action.errors
      }
    case LOGOUT_SUCCESS:
      return {
        ...state,
        loggedIn: false
      }
    case CLEAR_ERRORS:
      return {
        loginErrors: {},
        registerError: {}
      }
    default:
      return state
  }
}

export default user;