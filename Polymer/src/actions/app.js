export const NAVIGATE = 'NAVIGATE';
export const DRAWER_STATE_UPDATE = 'DRAWER_STATE_UPDATE';
export const TOGGLE_ACCOUNT_SELECTOR = 'TOGGLE_ACCOUNT_SELECTOR';

export const navigate = (path) => (dispatch, getState) => {

}

export const updateDrawerState = state => (dispatch, getState) => {
	const {drawerOpened, accountSelectorOpened} = getState().app;
	if(state !== drawerOpened) {
		dispatch({
			type: DRAWER_STATE_UPDATE,
			state
		});
		if(state&&accountSelectorOpened) {
			dispatch(toggleAccountSelector);
		}
	}
}

export const toggleDrawer = () => (dispatch, getState) => {
	const { drawerOpened } = getState().app;
	dispatch(updateDrawerState(!drawerOpened));
}

export const toggleAccountSelector = {
	type: TOGGLE_ACCOUNT_SELECTOR
}