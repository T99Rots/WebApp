import { html, css } from 'lit-element';
import { PageViewElement } from '../components/page-view-element';
import { connect } from 'pwa-helpers/connect-mixin';
import { repeat } from 'lit-html/directives/repeat.js';

import SharedStyles from '../components/shared-styles';
import { store } from '../store';

class ProductsPage extends connect(store)(PageViewElement) {
	static get styles() {
		return [
      SharedStyles,
      css`
        #banner {
          height: 320px;
          margin-bottom: 32px;
        }

        #grid {
          display: flex;
          flex-direction: row;
          flex-wrap: wrap;
          justify-content: space-between;
          margin: 0 10px 32px 10px;
          padding: 0;
          list-style: none;
        }

        #grid li {
          -webkit-flex: 1 1;
          flex: 1 1;
          -webkit-flex-basis: 33%;
          flex-basis: 33%;
          max-width: 33%;
        }

        #grid router-link {
          display:block;
          text-decoration: none;
        }

        @media (max-width: 765px) {
          #banner {
            display: none;
          }

          #grid  li {
            -webkit-flex-basis: 50%;
            flex-basis: 50%;
            max-width: 50%;
          }
        }
      `
		]
	}

  static get properties () {
    return {
      _products: Array,
      _banner: String  
    }
  }

	render() {
    return html`
      <shop-image
        src="${this._banner}"
        placeholder="${this._category.placeholder}" class="hero-image">
      </shop-image>

      <header>
        <h1>${this._category.title}</h1>
        <span>${this._getPluralizedQuantity(this._category.items)}</span>
      </header>

      <ul id="grid">
        ${repeat(this._products, item => item._id, item => html`
          <li>
            <a href="/detail/${this._category.name}/${item.name}">
              <shop-list-item .item="${item}"></shop-list-item>
            </a>
          </li>
        `)}
      </ul>

		`
  }
  
}

window.customElements.define('products-page', ProductsPage);