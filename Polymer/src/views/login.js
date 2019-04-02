import { html, css } from 'lit-element';
import { PageViewElement } from '../components/page-view-element';

import '@polymer/paper-material';
import '@polymer/paper-input/paper-input';
import '@polymer/paper-button';

class LoginPage extends PageViewElement {
	static get styles() {
		return [
			css`
				:host {
					background: url('/img/login-background.jpg');
					background-size: cover;
					background-position: center;
					--paper-input-container-focus-color: var(--app-primary-color);
				}

				section {
					width: 100%;
					height: 100vh;
					display: flex;
					justify-content: center;
					align-items: center;
				}

				header {
					display: flex;
					justify-content: center;
				}

				img {
					width: 65px;
					height: 65px;
				}

				h1 {
					font-size: 37px;
					line-height: 65px;
					margin: 0;
				}

				h2 {
					font-weight: normal;
					margin: 35px 0 8px 0;
					font-size: 28px;
				}

				#login-card {
					padding: 35px;
					background: white;
					border-radius: 3px;
					width: 340px;
				}

				paper-button {
					margin: 0;
					text-transform: none;
					font-weight: 500;
				}

				#login-btn {
					background: var(--app-primary-color);
					float: right;
					color: white;
					margin-top: 36px;
				}

				#create-btn {
					margin: 36px 0 0 -9.12px;
				}

				@media (max-width: 500px) {
					#login-card {
						width: 100%;
						height: 100%;
						display: flex;
						flex-direction: column;
						justify-content: center;
					}
					#login-btn , #create-btn {
						float: none;
						display: block;
						margin: 14px 0 0 0;
						text-align: center;
					}
				}
			`
		]
	}

	render() {
		return html`
			<section>
				<paper-material id="login-card">
					<header>
						<img src="/img/logo.svg">
						<h1>Todo App</h1>
					</header>

					<h2>Login</h2>
					<paper-input label="Email"></paper-input>
					<paper-input label="Password" type="password"></paper-input>

					<a href="/">			
						<paper-button id="login-btn">Login</paper-button>
					</a>
					<paper-button id="create-btn">Use different account</paper-button>
				</paper-material>
			</section>
		`
	}
}

window.customElements.define('login-page', LoginPage);