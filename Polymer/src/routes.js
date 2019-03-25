import { Router, defaultScript, defaultTitle } from './schema-router/router';

import {
	dashboardIcon,
	notInterestedIcon
} from './components/icons';

const router = new Router({
  default: {
    title: defaultTitle,
    script: defaultScript,
		tagName: a => a.id ? `${a.id}-page` : false,
		icon: notInterestedIcon,
    drawer: true,
    header: true,
		search: false
  },
  root: {
    redirect: '/todo'
  },
  404: {
    script: 'page-404.js',
    tagName: 'page-404',
    id: '404',
    title: 'Page not found'
  },
  pages: {
		todo: {
			id: 'todo',
			subPages: {
				all: {
					id: 'all',
					title: 'All todo\'s'
				},
				shared: {
					id: 'shared',
					title: 'Shared with me'
				}
			}
		},
		completed: {
			id: 'completed'
		},
		shared: {
			id: 'shared',
			title: 'Shared with me'
		}
	},
	templates: {
		todoList: {
			script: 'todo-list.js',
			tagName: 'todo-list-page'
		}
	}
});

const navigate = router.navigate;

export {
	router,
	navigate
}

'/todo\'s/shared'