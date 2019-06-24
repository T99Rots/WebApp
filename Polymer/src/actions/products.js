import api from '../api'

export const GET_PRODUCTS = 'GET_PRODUCTS';
export const GET_PRODUCT = 'GET_PRODUCT';
export const GET_CATEGORIES = 'GET_CATEGORIES';

export const getCategories = () => async (dispatch) => {
  dispatch({
    type: GET_CATEGORIES,
    categories: await api.categories()
  });
}