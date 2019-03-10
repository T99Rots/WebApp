import {
	dashboardIcon
} from './components/icons';

export default {
  default: {
    title: a => a.id ? a.id[0].toUpperCase() + a.id.substr(1, Infinity) : 'Title not found',
    script: a => a.id ? `${a.id}.js` : false,
    tagName: a => a.id ? `${a.id}-page` : false,
    drawer: true,
    header: true,
    search: false,
    // redirect all pages to the login page when you aren't logged in
    redirect: () => isLoggedIn() ? false : '/login'
  },
  root: {
    redirect: () => isLoggedIn() ? '/assignments' : '/login'
  },
  404: {
    script: 'page-404.js',
    tagName: 'page-404',
    id: '404',
    title: 'Page not found'
  },
  pages: {
		dashboard: {
			id: 'dashboard',
			icon: dashboardIcon
		}
  }
};