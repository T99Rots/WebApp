import { LitElement, html, css } from 'lit-element';
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
        #login-content {
          color: black;
          width: 280px;
          padding: 30px 40px;
        }
        #options-content {
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
      `
    ]
	}

	render() {
    return html`
			<paper-menu-button 
        horizontal-align="right" 
        no-overlap
        ?hidden="${this._loggedIn || this._compactLayout}"
        ?opened="${this._accountOptionsOpened && !this._loggedIn}"
        @opened-changed=${e => store.dispatch(updateAccountDropDownState(e.detail.value))}>
        <paper-icon-button icon="account-circle" slot="dropdown-trigger"></paper-icon-button>
        <div id="login-content" slot="dropdown-content">
          <h3>Login</h3>
          <paper-button>
            <img id="google-logo" src="/img/google-logo.svg">
            Login using google
          </paper-button>
          <h4>Or login using email</h4>
          <paper-input label="Email"></paper-input>
          <paper-input label="Password" type="password"></paper-input>
          <paper-button id="login-button" @click="${this._login}">Login</paper-button>
          <footer>
            <a is="router-link" class="underline" page-id="register">Create account</a>
            <a is="router-link" class="underline" page-id="account-recovery">Forgot password?</a>
          </footer>
        </div>
			</paper-menu-button>
      <paper-menu-button
        horizontal-align="right" 
        no-overlap
        ?opened="${this._accountOptionsOpened && this._loggedIn}"
        ?hidden="${!this._loggedIn}"
        @opened-changed=${e => store.dispatch(updateAccountDropDownState(e.detail.value))}
        id="options-dropdown">
        <paper-icon-button icon="account-circle" slot="dropdown-trigger"></paper-icon-button>
        <div id="options-content" slot="dropdown-content" role="listbox">
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
          <paper-icon-item @click="${this._logout}">
            <iron-icon icon="exit-to-app" slot="item-icon"></iron-icon>
            Logout
          </paper-icon-item>           
        </div>
      </paper-menu-button>
      <a page-id="account" is="router-link" ?hidden="${this._loggedIn || !this._compactLayout}">
        <paper-icon-button icon="account-circle"></paper-icon-button>
      </a>
		`
  }
  
  _login () {
    store.dispatch(updateAccountDropDownState(false));
    this._loggedIn = true;
    console.log('aiyuhyifafas')
  }

  _logout () {
    store.dispatch(updateAccountDropDownState(false));
    this._loggedIn = false;
  }

	static get properties () {
		return {
      _compactLayout: Boolean,
      _admin: Boolean,
      _accountOptionsOpened: Boolean,
      _loggedIn: Boolean
		}
  }

  firstUpdated() {
    this._loggedIn = false;
  }
  
  stateChanged(state) {
    this._accountOptionsOpened = state.app.accountOptionsOpened;
    // this._loggedIn = true;
    this._admin = true; // state.app.user.isAdmin
    this._compactLayout = state.app.compactLayout;
  }
}

window.customElements.define('account-options', AccountOptions);