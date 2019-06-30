import { html, css } from 'lit-element';
import { PageViewElement } from '../components/page-view-element';
import { connect } from 'pwa-helpers/connect-mixin';
import { repeat } from 'lit-html/directives/repeat.js';

import { 
  getProducts
} from '../actions/products';

import '../components/product-list-item';
import '../components/shop-image';
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
          width: 100%;
        }

        header {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        header h1 {
          margin: 0 0 4px 0;
          font-size: 18px;
          font-weight: 400;
        }

        header span {
          font-size: 10;
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
      _category: String,
      _products: Array,
      _banner: String,
      _title: String
    }
  }

	render() {
    return html`
      <shop-image
        src="${this._banner}"
        id="banner">
      </shop-image>

      <header>
        <h1>${this._title}</h1>
        <span>${this._products.length} ${this._products.length === 1? 'item': 'items'}</span>
      </header>

      <ul id="grid">
        ${repeat(this._products, item => item._id, item => html`
          <li>
            <a href="/detail/${this._category.name}/${item.name}">
              <product-list-item .item="${item}"></product-list-item>
            </a>
          </li>
        `)}
      </ul>
		`
  }

  update(changedProps) {
    if(changedProps.has('_category')) {
      store.dispatch(getProducts(this._category))
    }
    super.update(changedProps);
  }

  stateChanged({products: {products, categories}, app: {page}}) {
    if(
      page.id === 'products'
      &&page.params.category
      ) {
      const categoryObj = categories.find((category) => category._id === page.params.category);
      this._category = page.params.category;
      this._banner = categoryObj.image;
      this._title = categoryObj.title;
    }
    this._products = products;
  }
  
}

window.customElements.define('products-page', ProductsPage);