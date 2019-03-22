import { html, css, LitElement } from 'lit-element';
import { connect } from 'pwa-helpers/connect-mixin';
import { installRouter } from 'pwa-helpers/router';
import { updateMetadata } from 'pwa-helpers/metadata';

//importing the actions required by this app
import {
	navigate,
	updateDrawerState,
	toggleAccountSelector
} from '../actions/app'
import { store } from '../store';

//importing web components used on this page
import '@polymer/app-layout/app-drawer/app-drawer.js';
import '@polymer/app-layout/app-header/app-header.js';
import '@polymer/app-layout/app-toolbar/app-toolbar.js';
import '@polymer/app-layout/app-scroll-effects/effects/waterfall.js';
import '@polymer/paper-item/paper-icon-item';
import '../components/drawer-page-list';
import '../components/view-container';
import { dropDownIcon, dropUpIcon, personIcon } from '../components/icons';

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

			[hidden] {
				display: none;
			}

			app-header {
				position: fixed;
				top: 0;
				left: 0;
				width: 100%;
				background: var(--app-header-background-color);
				color: var(--app-header-text-color);
				z-index: 9;
			}

			button {
				background: none;
				border: none;
				cursor: pointer;
			}

			button:focus {
				outline: none;
			}

			app-drawer {
				z-index: 10;
				background: var(--app-drawer-background-color);
				color: var(--app-drawer-text-color);
			}

			#drawer-header {
				padding: 0 15px 18px 15px;
				border-bottom: 1px solid #eee;
				cursor: pointer;
			}

			#profile-picture-container {
				display: flex;
				align-items: center;
				height: 100px;
			}

			#drawer-header h2 , p {
				margin: 0;
			}

			#account-selection-indicator {
				float: right;
				position: relative;
				top: -30px;
			}

			#account-selector paper-icon-item {
				padding-top: 4px;
				padding-bottom: 4px;
			}

			.avatar-big {
				width: 60px;
				height: 60px;
				background-size: cover;
				background-position: center;
				border-radius: 50%;
				display: inline-block;
			}

			.avatar {
				display: inline-block;
				box-sizing: border-box;
				width: 40px;
				height: 40px;
				border-radius: 50%;
				background: url('/img/profile.png');
				background-size: cover;
				background-position: center;
			}

			drawer-page-list {
				margin-top: 5px;
			}

			app-header svg {
				fill: var(--app-header-text-color);
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
			<app-header condenses reveals effects="waterfall">
				<app-toolbar>
					<button @click="${this._menuButtonClicked}">${menuIcon}</button>
					<h1>Todo App</h1>
				</app-toolbar>
			</app-header>

			<app-drawer 
				.opened=${this._drawerOpened || true}
				@opened-changed=${this._drawerOpenedChanged}>
				<div id="drawer-header" @click="${() => store.dispatch(toggleAccountSelector)}">
					<div id="profile-picture-container">
						<div class="avatar avatar-big" style="background-image: url('/img/woman.jpg')"></div>
					</div>
					<h2>George Johnson</h2>
					<p>george.johnson@gmail.com</p>
					<div id="account-selection-indicator">
						${this._accountSelectorOpened? dropUpIcon: dropDownIcon}
					</div>
				</div>
				<drawer-page-list .pages="${this._pages}" ?hidden="${this._accountSelectorOpened}"></drawer-page-list>
				<div role="listbox" id="account-selector" ?hidden="${!this._accountSelectorOpened}">
					${this._accounts.map(account => html`
						<paper-icon-item>
							<div class="avatar" slot="item-icon"></div>
							${account.name}
						</paper-icon-item>
					`)}
				</div>
			</app-drawer>

			<view-container .pages="${this._pages}" .page="${this._page}"></view-container>
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
			_accountSelectorOpened: Boolean
		}
	}

	stateChanged(state) {
		this._page = state.app.page;
		this._drawerOpened = state.app.drawerOpened;
		this._pages = state.app.pages;
		this._accountSelectorOpened = state.app.accountSelectorOpened;
		this._accounts = [
			{
				name: 'Jack Benton',
				email: 'jackyboii@gmail.com',
				avatar: '/img/woman.jpg'
			},
			{
				name: 'Bli A',
				email: 'youwotm9@gmail.com',
				avatar: '/img/woman.jpg'
			},
			{
				name: 'Katie Jackson',
				email: 'the.kate.1993@gmail.com',
				avatar: '/img/woman.jpg'
			}
		]
	}

}

customElements.define('todo-app', TodoApp);