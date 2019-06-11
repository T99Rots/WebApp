import { LitElement, html, css } from 'lit-element';
import { connect } from 'pwa-helpers/connect-mixin';
import { store } from '../store';

import sharedStyles from './shared-styles';

import {
  updateAccountDropDownState
} from '../actions/app'

import {
  login,
  register,
  logout,
  clearErrors
} from '../actions/user';

import user from '../reducers/user';

store.addReducers({
  user
})

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
        .logo {
          width: 16px;
          height: 16px;
          margin-right: 5px;
        }
        h3 {
          margin: 0 0 10px 0;
          font-weight: normal;
          font-size: 18px;
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
        paper-icon-item {
          cursor: pointer;
        }
        #login-button {
          margin-top: 15px;
        }
        paper-button {
          width: 100%;
          margin: 0 0 10px 0;
        }
        router-link {
          text-decoration: none;
          color: black;
        }
        footer {
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
            <img class="logo" src="/img/google-logo.svg">
            Login using Google
          </paper-button>
          <paper-button>
            <img class="logo" src="/img/facebook-logo.svg">
            Login using Facebook
          </paper-button>
          <h4>Or login using email</h4>
          <paper-input label="Email" id="email" @focus="${this._onFieldFocus}"></paper-input>
          <paper-input label="Password" id="password" type="password" @focus="${this._onFieldFocus}"></paper-input>
          <paper-button id="login-button" @click="${this._login}">Login</paper-button>
          <footer>
            <router-link class="underline" page-id="register">Create account</router-link>
            <router-link class="underline" page-id="account-recovery">Forgot password?</router-link>
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
      <router-link page-id="login" ?hidden="${this._loggedIn || !this._compactLayout}">
        <paper-icon-button icon="account-circle"></paper-icon-button>
      </router-link>
		`
  }
  
  _onFieldFocus () {
    store.dispatch(clearErrors())
  }

  _login () {
    store.dispatch(login({
      email: this.shadowRoot.getElementById('email').value,      
      password: this.shadowRoot.getElementById('password').value
    }));
  }

  _logout () {
    store.dispatch(logout());
  }

	static get properties () {
		return {
      _compactLayout: Boolean,
      _admin: Boolean,
      _accountOptionsOpened: Boolean,
      _loggedIn: Boolean
		}
  }

  stateChanged(state) {
    this._accountOptionsOpened = state.app.accountOptionsOpened;
    this._compactLayout = state.app.compactLayout;
    this._loggedIn = state.user.loggedIn;
    this._admin = state.user.isAdmin;
    this._loginErrors = state.user.loginErrors;
    this._registerErrors = state.user.registerErrors;
  }
}

window.customElements.define('account-options', AccountOptions);