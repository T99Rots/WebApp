import {
	NAVIGATE,
	DRAWER_STATE_UPDATE,
	TOGGLE_ACCOUNT_SELECTOR,
	UPDATE_DRAWER_LAYOUT
} from '../actions/app';

import { router } from '../routes';

const initialState = {
	pages: router.resolveAll(),
	page: {
		title: 'Loading...'
	},
	drawerOpened: false,
	accountSelectorOpened: false
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
		case UPDATE_DRAWER_LAYOUT:
			return {
				...state,
				expandedDrawerLayout: action.expandedDrawerLayout
			}
		case TOGGLE_ACCOUNT_SELECTOR:
			return {
				...state,
				accountSelectorOpened: !state.accountSelectorOpened
			}
		default:
			return state;
	}
}

export default app;