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
import '@polymer/iron-icons/communication-icons.js';
import '@polymer/paper-icon-button';
import '@polymer/paper-button';
import '@polymer/paper-item/paper-icon-item';
import '@polymer/paper-item';
import '@polymer/paper-input/paper-input';

class AccountOptions extends connect(store)(LitElement) {
	static get styles() {
    return [
      sharedStyles,
      css`
        :host {
          display: block;
          --paper-menu-button-dropdown-background: var(--notification-dropdown-content-background, white);
          --paper-input-container-focus-color: var(--app-primary-color);
        }
        paper-menu-button[logged-in] #logged-in-content {
          display: block;
        }
        paper-menu-button[logged-in] #logged-out-content {
          display: none;
        }
        #logged-in-content {
          display: none;
        }
        paper-menu-button {
          padding: 0;
        }
        #account-link {
          display: none;
        }
        #google-logo {
          width: 16px;
          height: 16px;
          margin-right: 5px;
        }
        h3 {
          margin: 0;
          font-weight: normal;
          font-size: 18px;
          margin-bottom: 10px;
        }
        h4 {
          margin: 0;
          margin-top: 25px;
          font-weight: normal;
          font-size: 15.5px;
        }
        #content {
          color: black;
          width: 280px;
          padding: 30px 40px;
        }
        paper-menu-button[logged-in] #content {
          color: black;
          width: 280px;
          padding: 0;
          width: 240px;
        }
        #login-button {
          margin-top: 15px;
        }
        paper-button {
          width: 100%;
          margin: 0;
        }
        a {
          text-decoration: none;
          color: black;
        }
        footer {
          margin-top: 6px;
          display: flex;
          justify-content: space-between;
          font-size: 14px;
        }
        @media (max-width: 765px) {
          paper-menu-button {
            display: none;
          }
          #account-link {
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
        ?logged-in="${this._loggedIn}"
        ?opened="${this._accountOptionsOpened}"
        @opened-changed=${e => store.dispatch(updateAccountDropDownState(e.detail.value))}>
        <paper-icon-button icon="account-circle" slot="dropdown-trigger"></paper-icon-button>
        <div id="content" slot="dropdown-content">
          <div id="logged-out-content">
            <h3>Login</h3>
            <paper-button>
              <img id="google-logo" src="/img/google-logo.svg">
              Login using google
            </paper-button>
            <h4>Or login using email</h4>
            <paper-input label="Email"></paper-input>
            <paper-input label="Password" type="password"></paper-input>
            <paper-button id="login-button">Login</paper-button>
            <footer>
              <a is="router-link" class="underline" page-id="register">Create account</a>
              <a is="router-link" class="underline" page-id="password-reset">Forgot password?</a>
            </footer>
          </div>
          <div id="logged-in-content" role="listbox">
            <paper-icon-item>
              <iron-icon icon="account-circle" slot="item-icon"></iron-icon>
              My account
            </paper-icon-item>
            <paper-icon-item>
              <iron-icon icon="history" slot="item-icon"></iron-icon>
              Order history
            </paper-icon-item>
            <paper-icon-item ?hidden="${!this._admin}">
              <iron-icon icon="business" slot="item-icon"></iron-icon>
              Back office
            </paper-icon-item>
            <paper-icon-item>
              <iron-icon icon="exit-to-app" slot="item-icon"></iron-icon>
              Logout
            </paper-icon-item>           
          </div>
        </div>
			</paper-menu-button>
      <a page-id="account" is="router-link" id="account-link">
        <paper-icon-button icon="account-circle"></paper-icon-button>
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
    this._accountOptionsOpened = state.app.accountOptionsOpened;
    this._loggedIn = false;
    this._admin = true; // state.app.user.isAdmin
  }
}

window.customElements.define('account-options', AccountOptions);