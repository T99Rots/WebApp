import { html, css } from 'lit-element';
import { PageViewElement } from '../components/page-view-element';

import '@polymer/paper-button';
import '@polymer/iron-icons/iron-icons.js';

class Page404 extends PageViewElement {
	static get styles() {
		return [
			css`
				:host {
					text-align: center;
					display: flex;
          align-items: center;
          flex-direction: column;
          color: rgb(117,117,117);
        }
				h1 {
					font-size: 26px;
					margin: 0;
          padding: 50px 0;
          font-weight: normal;
        }
        a {
          text-decoration: none;
          color: black;
        }
				paper-button {
          border: 2px solid black;
          padding: 12px 44px;
          font-size: 14px;
        }
        iron-icon {
          width: 60px;
          height: 60px;
          fill: currentColor;
        }
			`
		]
	}

	render() {
    return html`
      <iron-icon icon="error"></iron-icon>
			<h1>Sorry, we could not find that page</h1>
			<a is="router-link" page-id="home">
				<paper-button>Go to the home page</paper-button>
			</a>
		`
	}
}

window.customElements.define('page-404', Page404);