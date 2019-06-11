import api from '../api'
import { router } from '../routes';
import { updateAccountDropDownState } from './app';

export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILED = 'LOGIN_FAILED';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAILED = 'REGISTER_FAILED';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const CLEAR_ERRORS = 'CLEAR_ERRORS';

const REQUIRED_ERROR = 'This field is required';

export const login = ({password, email}) => async (dispatch, getState) => {
  const page = getState().app.page.id

  if(!password || !email) {
    const errors = {};
    if(!password) errors.password = REQUIRED_ERROR;
    if(!email) errors.email = REQUIRED_ERROR;

    dispatch({
      type: LOGIN_FAILED,
      errors
    })
    return;
  }

  const res = await api.users.login({password, email});

  if(res.success) {
    dispatch(updateAccountDropDownState(false));
    dispatch({
      type: LOGIN_SUCCESS
    });
    localStorage.userId = res.userId;
    localStorage.token = res.token;
    if(page === 'login') router.navigateId('home', {replace: true});
  } else {
    dispatch({
      type: LOGIN_FAILED,
      errors: res.errors
    });
  }
}

export const register = ({email, name, password, confirmation}) => async (dispatch, getState) => {
  if(!(email && name && password && confirmation)) {
    const errors = {};

    if(!password) errors.password = REQUIRED_ERROR;
    if(!email) errors.email = REQUIRED_ERROR;
    if(!name) errors.name = REQUIRED_ERROR;
    if(!confirmation) errors.confirmation = REQUIRED_ERROR;

    dispatch(registerFailed(errors));
    return;
  }

  if(password !== confirmation) {
    dispatch(registerFailed({
      confirm: 'This does not match the password'
    }))
  }

  // if()

  const res = await api.users.register({email, name, password});

  if(res.success) {
    dispatch(updateAccountDropDownState(false));  
    dispatch({
      type: REGISTER_SUCCESS
    })
    localStorage.userId = res.userId;
    localStorage.token = res.token;
    router.navigateId('home', {replace: true});
  } else {
    dispatch(registerFailed(res.errors));
  }
}

const registerFailed = (errors) => ({
  type: REGISTER_FAILED,
  errors: errors
})

export const logout = (callAPI = true) => async (dispatch) => {
  if (callAPI) await api.users.logout();
  
  dispatch(updateAccountDropDownState(false));
  dispatch({
    type: LOGOUT_SUCCESS
  })
  localStorage.removeItem('token');
  localStorage.removeItem('userId');
}

export const clearErrors = () => (dispatch, getState) => {
  const state = getState();
  if(
    Object.keys(state.user.loginErrors).length > 0
    ||Object.keys(state.user.registerErrors).length > 0
  ) {
    dispatch({
      type: CLEAR_ERRORS
    })
  }
}