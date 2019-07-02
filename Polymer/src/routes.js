import { Router } from 'schema-router';

const getParam = (param) => ({ params }) => params && params[param];

const router = window.router = new Router({
  default: {
    title: ({id}) => id[0].toLocaleUpperCase()+id.substr(1).toLocaleLowerCase(),
    script: ({id}) => `../views/${id}.js`,
    tagName: a => a.id ? `${a.id}-page` : false,
    navigation: false,
    header: true,
    accountOptions: true,
    cart: true
  },
  root: {
    id: 'home',
    title: false,
    navigation: true
  },
  404: {
    tagName: 'page-404',
    id: '404',
    title: 'Page not found'
  },
  routes: {
		checkout: {
      id: 'checkout'
    },
    cart: {
      id: 'cart'
    },
		login: {
      id: 'login',
      template: 'login'
    },
    register: {
      id: 'register',
      template: 'login'
    },
    'account-recovery': {
      id: 'password-recovery',
      template: 'login'
    },
    'products/:category': {
      id: 'products',
      title: getParam('category'),
      navigation: true
    },
    'product/:productId': {
      id: 'productNameless',
      redirect: ({params}) => ({
        id: 'product',
        params: {
          ...params,
          productName: 'no product name'
        }
      }),
      navigation: true,
      subRoutes: {
        ':productName': {
          navigation: true,
          id: 'product',
          title: getParam('productName')
        }
      }
    },
    admin: {
      id: 'admin'
    }
  },
  templates: {
    login: {
      script: '../views/login.js',
      tagName: 'login-page',
      header: false
    }
  }
});

export { router };