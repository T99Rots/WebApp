import { Router, defaultScript, defaultTitle } from 'schema-router';

import {
	notInterestedIcon,
	inboxIcon,
	todayIcon,
	dateRangeIcon,
	labelIcon,
	settingsIcon
} from './components/icons';

const router = window.router = new Router({
  default: {
    title: defaultTitle,
    script: defaultScript,
		tagName: a => a.id ? `${a.id}-page` : false,
		icon: notInterestedIcon,
		header: true,
		drawer: true
  },
  root: {
    redirect: '/inbox'
  },
  404: {
    tagName: 'page-404',
    id: '404',
    title: 'Page not found'
  },
  pages: {
		inbox: {
			id: 'inbox',
			template: 'todoList',
			icon: inboxIcon
		},
		today: {
			id: 'today',
			template: 'todoList',
			icon: todayIcon
		},
		week: {
			id: 'week',
			title: 'Next 7 days',
			template: 'todoList',
			icon: dateRangeIcon
		},
		projects: {
			id: 'projects',
			template: 'todoList'
		},
		labels: {
			id: 'labels',
			template: 'todoList',
			icon: labelIcon
		},
		settings: {
			id: 'settings',
			icon: settingsIcon
		},
		login: {
			id: 'login',
			hidden: true,
			header: false,
			drawer: false
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