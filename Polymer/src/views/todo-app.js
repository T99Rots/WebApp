import { html, css, LitElement } from 'lit-element';
import { connect } from 'pwa-helpers/connect-mixin';
import { installRouter } from 'pwa-helpers/router';
import { updateMetadata } from 'pwa-helpers/metadata';

//importing the actions required by this app
import {
	navigate,
	updateDrawerState
} from '../actions/app'
import { store } from '../store';

//importing web components used on this page
import '@polymer/app-layout/app-drawer/app-drawer.js';
import '@polymer/app-layout/app-header/app-header.js';
import '../components/drawer-page-list';
import '../components/view-container';

import { menuIcon } from '../components/icons';

//the main custom element
class TodoApp extends connect(store)(LitElement) {

	static get styles () {
		return css`
			:host {
				display: block;

				--app-primary-color: #212121;
				--secondary-color: #4caf50;

				--app-light-background: white;
				--app-medium-background: #E1E2E1;
				--app-dark-background: #E1E2E1;

				--app-light-text-color: white;
				--app-dark-text-color: var(--app-primary-color);

				--app-header-background-color: var(--app-primary-color);
				--app-header-text-color: var(--app-light-text-color);

				--app-drawer-background-color: var(--app-medium-background);
				--app-drawer-text-color: var(--app-dark-text-color);
			}

			:host([theme="dark"]) {
				--app-light-background: #424242;
				--app-medium-background: #303030;
				--app-dark-background: #212121;

				--app-drawer-text-color: var(--app-light-text-color);
			}

			app-header {
				position: fixed;
				top: 0;
				left: 0;
				width: 100%;
			}

			@media (min-width: 377.8px) {
        :host {
          --app-drawer-width: 340px;
        }
      }
		`
	}

	render() {
		return html`
			<app-header>
				<button @click="${this._menuButtonClicked}">${menuIcon}</button>
				<h1>Todo App</h1>
			</app-header>

			<app-drawer 
				.opened=${this._drawerOpened}
				@opened-changed=${this._drawerOpenedChanged}>
				<drawer-page-list .pages="${this._pages}"></drawer-page-list>
			</app-drawer>

			<view-container></view-container>
			<h1>test</h1>
		`
	}

	_menuButtonClicked() {
		store.dispatch(updateDrawerState(true));
	}

	_drawerOpenedChanged(e) {
		store.dispatch(updateDrawerState(e.target.opened));
	}

	firstUpdated() {
		// installRouter(location => store.dispatch(navigate(decodeURIComponent(location.pathname))));
	}

	updated(changedProps) {
		if(changedProps.has('_page')) {
			updateMetadata({
				title: this._page.title,
				description: this._page.title
			})
		}
	}

	static get properties () {
		return {
			_page: Object,
			_pages: Object,
			_drawerOpened: Boolean,
		}
	}

	stateChanged(state) {
		this._page = state.app.page;
		this._drawerOpened = state.app.drawerOpened;
		this._pages = state.app.pages
	}

}

customElements.define('todo-app', TodoApp);