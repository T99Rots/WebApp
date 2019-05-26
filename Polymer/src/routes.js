import { Router } from 'schema-router';

const getParam = (param) => ({ params }) => params && params[param];

const router = window.router = new Router({
  default: {
    title: ({id}) => id[0].toLocaleUpperCase()+id.substr(1).toLocaleLowerCase(),
    script: ({id}) => `../views/${id}.js`,
    tagName: a => a.id ? `${a.id}-page` : false,
    tabNavigation: false
  },
  root: {
    id: 'home',
    title: false,
    tabNavigation: true
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
			id: 'login'
    },
    'products/:category': {
      id: 'products',
      title: getParam('category'),
      tabNavigation: true,
      subRoutes: {
        ':productName': {
          id: 'product',
          title: getParam('productName'),
          tabNavigation: true
        }
      }
    },
    admin: {
      id: 'admin',

    }
	}
});

export { router };