import {
	NAVIGATE,
	DRAWER_STATE_UPDATE,
	UPDATE_COMPACT_LAYOUT,
  UPDATE_CART_STATE
} from '../actions/app';

import { router } from '../routes';

const initialState = {
	pages: router.resolveAll(),
	page: {
		title: 'Loading...'
	},
  drawerOpened: false,
  cartOpened: false,
  categories: [
    {name: 'Men\'s Outerwear', id: 'mens-outerwear', preview: '/img/mens_outerwear.jpg'},
    {name: 'Ladies Outerwear', id: 'ladies-outerwear', preview: '/img/ladies_outerwear.jpg'},
    {name: 'Men\'s T-Shirts', id: 'mens-t-shirts', preview: '/img/mens_tshirts.jpg'},
    {name: 'Ladies T-Shirts', id: 'ladies-t-shirts', preview: '/img/ladies_tshirts.jpg'}
  ]
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
		default:
			return state;
	}
}

export default app;