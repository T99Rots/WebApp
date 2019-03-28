import { html, css } from 'lit-element';
import { PageViewElement } from '../components/page-view-element';

import '@polymer/paper-material';
import '@polymer/paper-fab';
import '@polymer/paper-input/paper-input';
import '@polymer/paper-button';

class LoginPage extends PageViewElement {
	static get styles() {
		return [
			css`
				section {
					width: 100%;
					height: 100vh;
					display: flex;
					justify-content: center;
					align-items: center;
				}

				paper-fab {
					position: absolute;
					right: -28px;
					top: 40px;
				}

				h2 {
					font-weight: normal;
					margin-top: 35px;
					font-size: 32px;
				}

				#login-card {
					padding: 20px;
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
				}

				#create-btn {
					margin-left: -9.12px;
				}
			`
		]
	}

	render() {
		return html`
			<section>
				<paper-material id="login-card">
					<paper-fab icon="add"></paper-fab>
					<h2>Login</h2>
					<paper-input label="Email"></paper-input>
					<paper-input label="Password" type="password"></paper-input>

					<paper-button id="create-btn">Use different account</paper-button>
					<paper-button id="login-btn">Login</paper-button>
				</paper-material>
			</section>
		`
	}
}

window.customElements.define('login-page', LoginPage);