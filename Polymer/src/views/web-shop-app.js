import { html, css, LitElement } from 'lit-element';
import { connect } from 'pwa-helpers/connect-mixin';
import { updateMetadata } from 'pwa-helpers/metadata';
import { installMediaQueryWatcher } from 'pwa-helpers/media-query';
import { router } from '../routes';
import { store } from '../store';

//importing the actions required by this app
import {
	navigate,
	updateDrawerState,
	updateCompactLayout
} from '../actions/app';

import {
  getCategories
} from '../actions/products';

import products from '../reducers/products';
store.addReducers({
  products
});

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
class WebShop extends connect(store)(LitElement) {

	static get styles () {
		return [
      sharedStyles,
      css`
        :host {
          display: block;
          min-height: 100vh;

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
        
        [main-title] router-link {
          font-weight: 600;
          font-size: 16px;
          line-height: 48px;
          margin: 0;
          letter-spacing: 0.3em;
          text-decoration: none;
          color: var(--app-header-text-color);
          pointer-events: auto;
        }

        app-drawer {
          z-index: 13;
        }

        app-drawer router-link {
          color: rgb(117,117,117);
          text-decoration: none;
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

        #logo {
          flex-shrink: 0;
        }

        #left-bar-item, #right-bar-item {
          display: flex;
          width: 50%;
          justify-content: flex-start;
        }

        #left-bar-item:not(:first-child) > *,
        #right-bar-item:not(:first-child) > * {
          padding-left: 8px;
        }

        #right-bar-item {
          justify-content: flex-end;
        }

        shopping-cart {
          z-index: 12;
        }

        @media (max-width: 765px) {
          #menu-btn {
            display: block;
          }
        }
      `
    ]
	}

	render() {
		return html`
      <app-header
        id="header"
        condenses
        reveals
        ?hidden="${!this._header}"
        effects="waterfall"
        slot="header">
        <app-toolbar>
          <div id="left-bar-item">
            <paper-icon-button
              ?hidden="${!this._page.navigation}"
              @click="${() => store.dispatch(updateDrawerState(true))}"
              id="menu-btn"
              icon="menu">
            </paper-icon-button>
          </div>
          <div main-title id="logo">
            <router-link page-id="home">SHOP</router-link>
          </div>
          <div id="right-bar-item">
            <account-options ?hidden="${!this._accountOptions}"></account-options>
            <shopping-cart ?hidden="${!this._cart}"></shopping-cart>
          </div>
        </app-toolbar>
        ${this._compactLayout? '': html`<shop-tabs 
          ?hidden="${!this._page.navigation}"
          .categories="${this._categories}"
          .router="${router}"
          sticky>
        </shop-tabs>`}
      </app-header>
      <app-drawer ?opened="${this._drawerOpened}">
        ${this._categories && this._categories.map(category => html`
          <router-link page-id="products" params="category: ${category.id}">
            <paper-item>
              <p class="underline">${category.name}</p>
            </paper-item>
          </router-link>
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
    store.dispatch(getCategories());
		installMediaQueryWatcher('(max-width: 765px)', match => store.dispatch(updateCompactLayout(match)));
	}

  update(changedProps) {
    // Sometimes the header doesn't update the layout when the height changed 
    const header = this.renderRoot.getElementById('header');
    if(header) header.resetLayout();
    super.update(changedProps);
  }

	updated(changedProps) {
		if(changedProps.has('_title')) {
			updateMetadata({
				title: `Shop ${this._title?' - ' + this._title: ''}`,
				description: this._title
			})
    }
	}

	static get properties () {
		return {
			_page: Object,
			_categories: Array,
      _drawerOpened: Boolean,
      _compactLayout: Boolean,
      _header: Boolean,
      _title: String
    }
	}

	stateChanged({
    products: {
      categories,
      product
    },
    app: {
      page,
      drawerOpened,
      compactLayout
    }
  }) {
    this._categories = categories;
		this._page = page;
    this._drawerOpened = drawerOpened;
    this._compactLayout = compactLayout;
    this._cart = page.cart;
    this._accountOptions = page.accountOptions;
    this._header = page.header;

    if(page.id === 'product') {
      if(product) this._title = product.title;
    } else if(page.id === 'products') {
      if(categories) {
        const category = categories.find(category => category._id === page.params.category);
        if(category) {
          this._title = category.title;
        }
      }
    } else {
      this._title = page.title;
    }
	}
}

customElements.define('web-shop', WebShop);