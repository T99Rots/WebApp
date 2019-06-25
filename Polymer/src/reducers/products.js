import {
  GET_CATEGORIES,
  GET_PRODUCT,
  GET_PRODUCTS
} from '../actions/products';

const initialState = {
  categories: [],
  products: [],
  product: {}
}

const products = (state = initialState, action) => {
  switch(action.type) {
    case GET_CATEGORIES:
      return {
        ...state,
        categories: action.categories
      };
    case GET_PRODUCT:
      return {
        ...state,
        product: action.product
      }
    case GET_PRODUCTS:
      return {
        ...state,
        products: action.products
      }
    default:
      return state
  }
}

export default products;