import { html, css } from 'lit-element';
import { PageViewElement } from '../components/page-view-element';
import { connect } from 'pwa-helpers/connect-mixin';

import SharedStyles from '../components/shared-styles';
import { store } from '../store';

import '@polymer/app-layout/app-header/app-header';
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
          --login-container-transition: 0.4s ease-in-out;
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
          text-align: center;  
        }
        
        app-header router-link {
          font-weight: 600;
          font-size: 16px;
          line-height: 64px;
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

        .middle-panel router-link {
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

        .link-container {
          display: flex;
          justify-content: center;
          margin: 30px 0 0 0;
        }

        .side-panel router-link {
          color: black;
          text-decoration: none;
        }

        .page-switch {
          display: none;
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

          app-header router-link {
            color: black;
          }
        }

        @media(max-width: 835px) {
          app-header {
            background: var(--app-header-background-color);
            color: var(--app-header-text-color);
          }

          :host {
            --login-container-middle-width: 0px;
          }

          .page-switch {
            display: block
          }
        }

        @media(max-width: 475px) {
          .content-container {
            width: calc(100% - 60px);
          }

          .side-panel paper-input, paper-button {
            width: 100%;
          }
        }
      `
		]
	}

	render() {
    return html`
      <app-header>
        <router-link main-title page-id="home">SHOP</router-link>      
      </app-header>
      <paper-material elevation="2" id="login-card">
        <login-container 
          active-side="${['login','account-recovery'].includes(this._page.id)? 'right': 'left'}">
          <div slot="left" class="side-panel">
            <div class="content-container">
              <h2>Sign in</h2>
              <paper-icon-button src="/img/google-logo.svg"></paper-icon-button>
              <paper-icon-button src="/img/facebook-logo.svg"></paper-icon-button>
              <p>Or login using email</p>
              <paper-input label="Email"></paper-input>
              <paper-input label="Password" type="password"></paper-input>
              <div class="link-container">
                <router-link class="underline" page-id="account-recovery">Forgot your password?</router-link>
              </div>
              <paper-button>Sign in</paper-button>
              <div class="link-container page-switch">
                <router-link page-id="register" class="underline">Don't have an account?</router-link>
              </div>
            </div>
          </div>
          <div slot="middle-left" class="middle-panel">
            <h3>Already have an account?</h3>
            <p>Simply login to your account by clicking the login button</p>
            <router-link page-id="login">
              <paper-button>sing in</paper-button>
            </router-link>
          </div>
          <div slot="right" class="side-panel">
            <div class="content-container">
              <h2>Create account</h2>
              <paper-icon-button src="/img/google-logo.svg"></paper-icon-button>
              <paper-icon-button src="/img/facebook-logo.svg"></paper-icon-button>
              <p>Or create an account using email</p>
              <paper-input label="Email"></paper-input>
              <paper-input label="Name"></paper-input>
              <paper-input label="Password" type="password"></paper-input>
              <paper-input label="Confirm password" type="password"></paper-input>
              <paper-button>Sign up</paper-button>
              <div class="link-container page-switch">
                <router-link class="underline" page-id="login">Already have an account?</router-link>
              </div>
            </div>
          </div>
          <div slot="middle-right" class="middle-panel">
            <h3>Don't have an account?</h3>
            <p>Simply create your account by clicking the signup button</p>
            <router-link page-id="register">
              <paper-button>sing up</paper-button>
            </router-link>
          </div>
        </login-container>
      </paper-material>
		`
  }

  login () {
    
  }

  register () {

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