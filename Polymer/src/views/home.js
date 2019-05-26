import { html, css } from 'lit-element';
import { PageViewElement } from '../components/page-view-element';
import { connect } from 'pwa-helpers/connect-mixin'
import '@polymer/paper-button';

import '@polymer/paper-button';
import sharedStyles from '../components/shared-styles';
import '../components/shop-image';

import { store } from '../store';

class HomePage extends connect(store)(PageViewElement) {
	static get styles() {
		return [
      sharedStyles,
      css`
        .item {
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 100%;
          margin-bottom: 40px;
        }
        shop-image {
          height: 320px;
          width: 100%;
        }
        h2 {
          margin: 32px 0;
          font-weight: normal;
          font-size: 17px;
        }
        a {
          color: black;
          text-decoration: none;
        }
			`
		]
	}

	render() {
    console.log('-----', this._categories);
    return html`
      ${this._categories.map(({preview, name, id}) => html`
        <div class="item">
          <shop-image src="${preview}"></shop-image>
          <h2>${name}</h2>
          <a page-id="products" params="category: ${id}" is="router-link">
            <paper-button>
              Shop now
            </paper-button>
          </a>
        </div>        
      `)}
		`
  }
  
  static get properties () {
    return {
      _categories: Array
    }
  }

  stateChanged(state) {
    this._categories = state.app.categories;
  }
}

window.customElements.define('home-page', HomePage);