export const NAVIGATE = 'NAVIGATE';
export const DRAWER_STATE_UPDATE = 'DRAWER_STATE_UPDATE';
export const TOGGLE_ACCOUNT_SELECTOR = 'TOGGLE_ACCOUNT_SELECTOR';

export const navigate = (path) => (dispatch, getState) => {

}

export const updateDrawerState = state => (dispatch, getState) => {
	const currentState = getState().app.drawerOpened;
	if(state !== currentState) {
		dispatch({
			type: DRAWER_STATE_UPDATE,
			state
		});	
	}
}

export const toggleAccountSelector = {
	type: TOGGLE_ACCOUNT_SELECTOR
}