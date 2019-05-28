import { html, css, LitElement } from 'lit-element';
import { connect } from 'pwa-helpers/connect-mixin';
import { updateMetadata } from 'pwa-helpers/metadata';
import { installMediaQueryWatcher } from 'pwa-helpers/media-query';
import { router } from '../routes';

//importing the actions required by this app
import {
	navigate,
	updateDrawerState,
	updateCompactLayout
} from '../actions/app'
import { store } from '../store';

import {
  drawerIcon
} from '../components/shop-icons'

import sharedStyles from '../components/shared-styles';

//importing web components used on this page
import '@polymer/iron-icons/iron-icons.js';
import '@polymer/paper-icon-button';
import '@polymer/paper-item';
import '@polymer/app-layout/app-header/app-header.js';
import '@polymer/app-layout/app-toolbar/app-toolbar.js';
import '@polymer/app-layout/app-scroll-effects/effects/waterfall.js';
import '@polymer/app-layout/app-drawer/app-drawer';
import '@polymer/paper-tabs';
import '@polymer/paper-menu-button';
import '@polymer/paper-button';
import '../components/paper-badge';
import '../components/shop-tabs';
import '../components/view-container';
import '../components/shopping-cart';
import '../components/account-options';

//the main custom element
class TodoApp extends connect(store)(LitElement) {

	static get styles () {
		return [
      sharedStyles,
      css`
        :host {
          display: block;
          min-height: calc(100vh - 130px;);
          padding-top: 130px;

          --app-primary-color: #172c50;

          --app-header-background-color: rgba(255,255,255,0.9);
          --app-header-text-color: black;
          
          --app-drawer-width: 256px;

          --paper-badge-background: rgb(23, 44, 80);
        }

        [hidden] {
          display: none;
        }

        app-header {
          background: var(--app-header-background-color);
          color: var(--app-header-text-color);
          position: fixed;
          left: 0;
          top: 0;
          right: 0;
          width: 100%;
          z-index: 11;
        }

        app-toolbar {
          z-index: 11;
        }

        [main-title] {
          text-align: center;  
        }
        
        [main-title] a {
          font-weight: 600;
          font-size: 16px;
          line-height: 48px;
          margin: 0;
          letter-spacing: 0.3em;
          text-decoration: none;
          color: black;
        }

        app-drawer {
          z-index: 13;
        }

        app-drawer a {
          color: rgb(117,117,117);
          text-decoration: none;
        }

        view-container {
          width: 100%;
          max-width: 1440px;
          margin: auto;
        }

        .underline {
          transition: color 0.2s ease-in-out;
        }

        .underline:hover {
          color: black;
        }

        #menu-btn {
          display: none;
        }

        #left-bar-item, #right-bar-item {
          width: 88px;
          display: flex;
          justify-content: space-between;
        }

        shopping-cart {
          z-index: 12;
        }

        @media (max-width: 765px) {
          #menu-btn {
            display: block;
          }
          :host {
            padding-top: 64px;
          }
        }
      `
    ]
	}

	render() {
		return html`
      <app-header condenses reveals effects="waterfall" slot="header">
        <app-toolbar>
          <div id="left-bar-item">
            <paper-icon-button
              @click="${() => store.dispatch(updateDrawerState(true))}"
              id="menu-btn"
              icon="menu">
            </paper-icon-button>
          </div>
          <div main-title id="logo">
            <a is="router-link" page-id="home">SHOP</a>
          </div>
          <div id="right-bar-item">
            <account-options></account-options>
            <shopping-cart></shopping-cart>
          </div>
        </app-toolbar>
        ${this._compactLayout? '': html`<shop-tabs 
          ?hidden="${!['home','products','product'].includes(this._page.id)}"
          .categories="${this._categories}"
          .router="${router}"
          sticky>
        </shop-tabs>`}
      </app-header>
      <app-drawer ?opened="${this._drawerOpened}">
        ${this._categories && this._categories.map(category => html`
          <a page-id="products" params="category: ${category.id}" is="router-link">
            <paper-item>
              <p class="underline">${category.name}</p>
            </paper-item>
          </a>
        `)}
      </app-drawer>
      <view-container .router="${router}"></view-container>
      <footer>
        
      </footer>
		`
	}

	firstUpdated() {
		router.addEventListener('page-change', e => {
      store.dispatch(navigate(e.page));
		})
		store.dispatch(navigate(router.activePage));
		installMediaQueryWatcher('(max-width: 765px)', match => store.dispatch(updateCompactLayout(match)));
	}

	updated(changedProps) {
		if(changedProps.has('_page')) {
			updateMetadata({
				title: `Jap Tuning${this._page.title?' - ' + this._page.title: ''}`,
				description: this._page.title
			})
		}
	}

	static get properties () {
		return {
			_page: Object,
			_categories: Array,
      _drawerOpened: Boolean,
      _compactLayout: Boolean
    }
	}

	stateChanged(state) {
		this._page = state.app.page;
    this._categories = state.app.categories;
    this._drawerOpened = state.app.drawerOpened;
    this._compactLayout = state.app.compactLayout;
    if(state.app.page.id === 'login') {
      this.setAttribute('login','');
    } else {
      this.removeAttribute('login');
    }
	}

}

customElements.define('todo-app', TodoApp);