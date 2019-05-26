import {

} from '../actions/cart';

const initialState = {
  items: new Array(5).fill(null).map((...args) => ({
    id: new Array(4).fill(null).map(()=>Math.random().toString(36).substr(2)).join(''),
    name: 'product '+args[1],
    description: 'The most amazing potato made since 1970, available in red, green and orange',
    price: Math.floor(Math.random()*5000)/100,
    amount: Math.floor(Math.random()*5)+1,
    photo: 'https://d30g5rxy3ee0r1.cloudfront.net/wp-content/uploads/2016/04/407506_by_laratyler_1462072196_potato.jpg'
  })) 
}

const cart = (state = initialState, action) => {
  switch(action.type) {

  }
} 