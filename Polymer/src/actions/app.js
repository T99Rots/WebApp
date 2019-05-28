export const NAVIGATE = 'NAVIGATE';
export const DRAWER_STATE_UPDATE = 'DRAWER_STATE_UPDATE';
export const UPDATE_COMPACT_LAYOUT = 'UPDATE_DRAWER_LAYOUT';
export const UPDATE_CART_STATE = 'UPDATE_CART_STATE';
export const UPDATE_ACCOUNT_DROP_DOWN_STATE = 'UPDATE_ACCOUNT_DROP_DOWN_STATE';

export const navigate = (page) => (dispatch) => {
	import(page.script);

	dispatch({
		type: NAVIGATE,
		page: page
	});

  dispatch(updateDrawerState(false));
  dispatch(updateCartState(false));
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

export const updateCartState = (state) => (dispatch, getState) => {
  const { cartOpened } = getState().app;
  if(cartOpened !== state) {
    dispatch({
      type: UPDATE_CART_STATE,
      state
    })
  }
}

export const updateAccountDropDownState = (state) => (dispatch, getState) => {
  const { accountDropDownOpened } = getState().app;
  if(accountDropDownOpened !== state) {
    dispatch({
      type: UPDATE_ACCOUNT_DROP_DOWN_STATE,
      state
    })
  }
}

export const updateCompactLayout = (match) => (dispatch) => {
	dispatch({
		type: UPDATE_COMPACT_LAYOUT,
		compactLayout: match
  });
  if(!match) {
    dispatch(updateDrawerState(false));
  } else {
    dispatch(updateCartState(false));
  }
}