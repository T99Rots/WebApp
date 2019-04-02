import { html, css } from 'lit-element';
import { PageViewElement } from '../components/page-view-element';

import sharedStyles from '../components/shared-styles';

import '../components/paper-expanding-item';

class TodoListPage extends PageViewElement {
	static get styles() {
		return [
			css`

			`
		]
	}

	render() {
		return html`
			<paper-expanding-item>
				test
			</paper-expanding-item>
		`
	}
}

window.customElements.define('todo-list-page', TodoListPage);