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
        router-link {
          color: black;
          text-decoration: none;
        }
			`
		]
	}

	render() {
    return html`
      ${this._categories.map(({image, title, id}) => html`
        <div class="item">
          <shop-image src="${image}"></shop-image>
          <h2>${title}</h2>
          <router-link page-id="products" params="category: ${id}">
            <paper-button>
              Shop now
            </paper-button>
          </router-link>
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
    this._categories = state.products.categories;
  }
}

window.customElements.define('home-page', HomePage);