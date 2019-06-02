import { html, css } from 'lit-element';
import { PageViewElement } from '../components/page-view-element';
import { connect } from 'pwa-helpers/connect-mixin';

import SharedStyles from '../components/shared-styles';
import { store } from '../store';

import '@polymer/app-layout/app-header/app-header';
import '@polymer/app-layout/app-toolbar/app-toolbar';
import '@polymer/paper-material';
import '@polymer/paper-input/paper-input';
import '@polymer/paper-button';
import '@polymer/paper-icon-button'
import '../components/login-container';

class LoginPage extends connect(store)(PageViewElement) {
	static get styles() {
		return [
      SharedStyles,
      css`
				:host {
					background: url('/img/login-background2.jpg');
					background-size: cover;
					background-position: center;
          --paper-input-container-focus-color: var(--app-primary-color);
          max-width: unset!important;
          min-height: calc(100vh - 130px);
          position: relative;
        }

        app-header {
          position: fixed;
          left: 0;
          top: 0;
          right: 0;
          width: 100%;
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
          color: white;
          pointer-events: auto;
        }

        paper-material {
          display: flex;
          width: 100%;
          max-width: 960px;
          min-height: 650px;
          margin: auto;
          background: white;
        }

        .middle-panel {
          background: rgb(40,43,49);
          width: 100%;
          color: white;
          display: flex;
          justify-content: center;
          align-item: center;
          flex-direction: column;
          padding: 20px;
          text-align: center;
        }

        .middle-panel h3 {
          font-size: 34px;
          margin: 0;
          font-weight: normal;
        }

        .middle-panel p {
          margin: 30px;
        }

        .middle-panel a {
          color: white;
          text-decoration: none;
        }

        .middle-panel paper-button {
          border-color: white;
        }

        .side-panel {
          width: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          text-align: center;
        }

        .side-panel h2 {
          font-size: 34px;
          margin: 0 0 15px 0;
          font-weight: normal;
        }

        .side-panel p {
          margin: 40px 0 0 0;
          color: rgb(117,117,117);
        }

        .side-panel paper-input {
          text-align: left;
          width: 340px;
        }

        .side-panel paper-button {
          margin: 30px auto 0 auto;
        }

        #link-container {
          display: flex;
          justify-content: center;
        }

        .side-panel a {
          color: black;
          margin: 30px 0 0 0;
          text-decoration: none;
        }

        .compact-container {
          display: flex;
          justify-content: center;
          align-items: center;
          text-align: center;
          width: 100%;
        }

        .compact-container > div {
          max-width: 450px;
          width: 100%;
          padding: 64px 25px 25px 25px;
        }

        .compact-container h2 {
          font-weight: normal;
          font-size: 18px;
        }

        .compact-container p {
          color: rgb(117,117,117);
        }

        .compact-container a {
          display: block;
          color: black;
          text-decoration: none;
          margin-top: 25px;
        }

        .compact-container paper-input {
          text-align: left;
        }

        .compact-container paper-button {
          width: 100%;
          margin-top: 25px;
        }

        @media(max-width: 1050px) {
          :host(.page) {
            padding-top: 0;
            display: flex;
            min-height: 100vh;
            background: none;
          }

          paper-material {
            margin: 0;
            max-width: unset;
          }

          [main-title] a {
            color: black;
          }
        }

        @media(max-width: 835px) {
          app-header {
            background: var(--app-header-background-color);
            color: var(--app-header-text-color);
          }

          paper-material {
            display: none;
          }
        }

        @media(min-width: 836px) {
          .compact-container {
            display: none;
          }
        }
      `
		]
	}

	render() {
    return html`
      <app-header>
        <app-toolbar>
          <div main-title>
            <a is="router-link" page-id="home">SHOP</a>
          </div>
        </app-toolbar>
      </app-header>
      <paper-material elevation="2" id="login-card">
        <login-container 
          active-side="${['login','account-recovery'].includes(this._page.id)? 'right': 'left'}">
          <div slot="left" class="side-panel">
            <div>
              <h2>Sign in</h2>
              <paper-icon-button src="/img/google-logo.svg"></paper-icon-button>
              <paper-icon-button src="/img/facebook-logo.svg"></paper-icon-button>
              <p>Or login using email</p>
              <paper-input label="Email"></paper-input>
              <paper-input label="Password" type="password"></paper-input>
              <div id="link-container">
                <a is="router-link" class="underline" page-id="account-recovery">Forgot your password?</a>
              </div>
              <paper-button>Sign in</paper-button>
            </div>
          </div>
          <div slot="middle-left" class="middle-panel">
            <div>
              <h3>Already have an account?</h3>
              <p>Simply login to your account by clicking the login button</p>
              <a is="router-link" page-id="login">
                <paper-button>sing in</paper-button>
              </a>
            </div>
          </div>
          <div slot="right" class="side-panel">
            <div>
              <h2>Create account</h2>
              <paper-icon-button src="/img/google-logo.svg"></paper-icon-button>
              <paper-icon-button src="/img/facebook-logo.svg"></paper-icon-button>
              <p>Or create an account using email</p>
              <paper-input label="Email"></paper-input>
              <paper-input label="Name"></paper-input>
              <paper-input label="Password" type="password"></paper-input>
              <paper-input label="Confirm password" type="password"></paper-input>
              <paper-button>Sign in</paper-button>
            </div>
          </div>
          <div slot="middle-right" class="middle-panel">
            <div>
              <h3>Don't have an account?</h3>
              <p>Simply create your account by clicking the signup button</p>
              <a is="router-link" page-id="register">
                <paper-button>sing up</paper-button>
              </a>
            </div>
          </div>
        </login-container>
      </paper-material>
      <div
        class="compact-container"
        id="compact-login-container"
        ?hidden="${this._page.id !== 'login'}">
        <div>
          <h2>Sign in</h2>
          <paper-icon-button src="/img/google-logo.svg"></paper-icon-button>
          <paper-icon-button src="/img/facebook-logo.svg"></paper-icon-button>
          <p>Or login using email</p>
          <paper-input label="Email"></paper-input>
          <paper-input label="Password" type="password"></paper-input>
          <a is="router-link" class="underline" page-id="account-recovery">Forgot your password?</a>
          <paper-button>Sign in</paper-button>
          <a is="router-link" class="underline" page-id="register">Don't have an account?</a> </div>
        </div>
      <div
        class="compact-container"
        id="compact-register-container"
        ?hidden="${this._page.id !== 'register'}">
        <div>
          <h2>Create account</h2>
          <paper-icon-button src="/img/google-logo.svg"></paper-icon-button>
          <paper-icon-button src="/img/facebook-logo.svg"></paper-icon-button>
          <p>Or create an account using email</p>
          <paper-input label="Email"></paper-input>
          <paper-input label="Name"></paper-input>
          <paper-input label="Password" type="password"></paper-input>
          <paper-input label="Confirm password" type="password"></paper-input>
          <paper-button>Sign in</paper-button>
          <a is="router-link" class="underline" page-id="login">Already have an account?</a>
        </div>
      </div>
      <div 
        class="compact-container"
        id="compact-account-recovery-container" 
        ?hidden="${this._page.id !== 'account-recovery'}">
      </div>
		`
  }
  
  static get properties () {
    return {
      _page: Object
    }
  }

  stateChanged(state) {
    this._page = state.app.page;
  }
}

window.customElements.define('login-page', LoginPage);