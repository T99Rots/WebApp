import {
	NAVIGATE,
	DRAWER_STATE_UPDATE,
	UPDATE_COMPACT_LAYOUT,
  UPDATE_CART_STATE,
  UPDATE_ACCOUNT_DROP_DOWN_STATE
} from '../actions/app';

import { router } from '../routes';

const initialState = {
	pages: router.resolveAll(),
	page: {
		title: 'Loading...'
	},
  drawerOpened: false,
  cartOpened: false
}

const app = (state = initialState, action) => {
	switch(action.type) {
		case NAVIGATE:
			return {
				...state,
				page: action.page
			}
		case DRAWER_STATE_UPDATE:
			return {
				...state,
				drawerOpened: action.state
			}
		case UPDATE_COMPACT_LAYOUT:
			return {
				...state,
				compactLayout: action.compactLayout
      }
    case UPDATE_CART_STATE:
      return {
        ...state,
        cartOpened: action.state
      }
    case UPDATE_ACCOUNT_DROP_DOWN_STATE:
      return {
        ...state,
        accountOptionsOpened: action.state
      }
		default:
			return state;
	}
}

export default app;