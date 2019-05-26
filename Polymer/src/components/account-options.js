import { LitElement, html, css } from 'lit-element';
import { repeat } from 'lit-html/directives/repeat.js';
import { connect } from 'pwa-helpers/connect-mixin';
import { store } from '../store';

import sharedStyles from './shared-styles';

import {
  updateAccountDropDownState
} from '../actions/app'

import '@polymer/paper-menu-button';
import '@polymer/iron-icons/iron-icons.js';
import '@polymer/paper-icon-button';
import '@polymer/paper-button';
import '@polymer/paper-item/paper-icon-item';
import '@polymer/paper-item';
import '@polymer/paper-material';
import '../components/paper-badge';

class AccountOptions extends connect(store)(LitElement) {
	static get styles() {
    return [
      sharedStyles,
      css`
        :host {
          display: block;
          --paper-menu-button-dropdown-background: var(--notification-dropdown-content-background, white);
        }
        paper-menu-button {
          padding: 0;
        }
        #cart-link {
          display: none;
        }
        h3 {
          margin: 0;
          font-weight: normal;
          font-size: 18px;
        }
        #content {
          color: black;
          width: 350px;
          padding: 40px;
        }
        paper-icon-item {
          padding: 0;
          border-bottom: 1px solid lightgray;
        }
        paper-icon-item:first-child {
          border-top: 1px solid lightgray;
        }
        paper-button {
          width: 100%;
          margin: 0;
        }
        .detail {
          width: 100px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-left: 20px;
          font-size: 14px;
          color: rgb(117, 117, 117)
        }
        .price {
          color: black;
        }
        a {
          text-decoration: none;
          color: black;
        }
        header {
          display: flex;
          justify-content: space-between;
          padding-bottom: 10px;
          align-items: center;
        }
        header a {
          font-size: 14px;
        }
        footer {
          padding-top: 20px;
          display: flex;
          justify-content: center;
          flex-wrap: wrap;
          align-items: center;
        }
        footer a {
          flex-shrink: 0;
          width: 100%;
        }
        footer p {
          width: 50%;
          font-size: 15px;
        }
        footer p:nth-child(2n) {
          text-align: right;
        }
        #total {
          font-size: 18px;
        }
        @media (max-width: 765px) {
          paper-menu-button {
            display: none;
          }
          #cart-link {
            display: block;
          }
        }
      `
    ]
	}

	render() {
    return html`
			<paper-menu-button 
        horizontal-align="right" 
        no-overlap
        ?opened="${this._cartOpened}"
        @opened-changed=${e => store.dispatch(updateAccountDropDownState(e.detail.value))}>
        
			</paper-menu-button>
      <a page-id="account" is="router-link" id="account-link">
        <paper-icon-button icon="shopping-cart"></paper-icon-button>
      </a>
		`
	}

	static get properties () {
		return {
      _cart: Array,
      _cartOpened: Boolean
		}
  }
  
  stateChanged(state) {
    this._cartOpened = state.app.cartOpened;
  }
}

window.customElements.define('account-options', AccountOptions);