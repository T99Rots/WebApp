export const NAVIGATE = 'NAVIGATE';
export const DRAWER_STATE_UPDATE = 'DRAWER_STATE_UPDATE';
export const TOGGLE_ACCOUNT_SELECTOR = 'TOGGLE_ACCOUNT_SELECTOR';
export const UPDATE_DRAWER_LAYOUT = 'UPDATE_DRAWER_LAYOUT';

export const navigate = (page) => (dispatch, getState) => {
	import(`../views/${page.script}`);

	dispatch({
		type: NAVIGATE,
		page: page
	});

	dispatch(updateDrawerState(false))
}

export const updateDrawerState = state => (dispatch, getState) => {
	const {drawerOpened, accountSelectorOpened, expandedDrawerLayout} = getState().app;
	if(state !== drawerOpened && !expandedDrawerLayout) {
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

export const updateDrawerLayout = (match) => (dispatch) => {
	dispatch({
		type: UPDATE_DRAWER_LAYOUT,
		expandedDrawerLayout: !match
	});
}