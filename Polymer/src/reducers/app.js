import {
	NAVIGATE,
	DRAWER_STATE_UPDATE
} from '../actions/app';

import pages from '../page-config';

const initialState = {
	pages,
	page: {
		drawer: true,
		header: true,
		title: 'Loading...'
	},
	drawerOpened: false
}

const app = (state = initialState, action) => {
	switch(action.type) {
		case NAVIGATE:
			return {
				...state
			}
		case DRAWER_STATE_UPDATE:
			return {
				...state,
				drawerOpened: action.state
			}
		default:
			return state;
	}
}

export default app;