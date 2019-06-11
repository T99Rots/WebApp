import { createAPI } from './remote-object-client';
import {
  store
} from './store';
import {
  LOGOUT_SUCCESS
} from './actions/user';

const connectHandler = async (api) => {
  const token = localStorage.token;
  const userId = localStorage.userId;
  if(token && userId) {
    if(!await api.users.identify({
      token,
      userId
    })) {
      store.dispatch({
        type: LOGOUT_SUCCESS
      });
      localStorage.removeItem('token');
      localStorage.removeItem('userId');
    }
  }
}

const api = createAPI(`ws://${location.hostname}:8391`, connectHandler);

export default api;
window.api = api;