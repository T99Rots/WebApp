export const ADD_ITEM_TO_CART = 'ADD_ITEM_TO_CART';
export const REMOVE_ITEM_FROM_CART = 'REMOVE_ITEM_FROM_CART';
export const SET_CART_ITEM_COUNT = 'SET_CART_ITEM_COUNT';

export const addItemToCart = (itemId) => ({
  type: ADD_ITEM_TO_CART,
  id: itemId
});

export const removeItemFromCart = (itemId) => ({
  type: REMOVE_ITEM_FROM_CART,
  id: itemId
});

export const setCartItemCount = (itemId, count) => ({
  type: SET_CART_ITEM_COUNT,
  id: itemId,
  count
})