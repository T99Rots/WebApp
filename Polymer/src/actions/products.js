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

export const getProducts = (category) => async (dispatch) => {
  dispatch({
    type: GET_PRODUCTS,
    products: await api.products(category)
  });
}

export const getProduct = (productId) => async (dispatch) => {
  dispatch({
    type: GET_PRODUCT,
    products: await api.products(productId)
  });
}