import { html, css } from 'lit-element';
import { PageViewElement } from '../components/page-view-element';

import sharedStyles from '../components/shared-styles';

import '@polymer/paper-button';

class TodoListPage extends PageViewElement {
	static get styles() {
		return [
			css`
				:host {
					text-align: center;
					display: flex;
					align-items: center;
				}
				h1 {
					font-size: 120px;
				}
				paper-button {
					background: var(--app-primary-color);
					color: white;
					
				}
			`
		]
	}

	render() {
		return html`
			<h1>404</h1>
			<h2>Oops, this page does not exist</h2>
			<a href="/">
				<paper-button>Go back home</paper-button>
			</a>
		`
	}
}

window.customElements.define('todo-list-page', TodoListPage);