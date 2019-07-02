import { LitElement, html, css } from 'lit-element';
import sharedStyles from '../components/shared-styles';

class ProductsListItem extends LitElement {
  static get styles () {
    return [
      sharedStyles,
      css`
        :host {
          display: flex;
          flex-direction: column;
          text-align: center;
          margin: 0 48px;
        }
        shop-image {
          margin: 32px 0 16px;
        }
        shop-image::before {
          content: "";
          display: block;
          padding-top: 100%;
        }
        .title {
          color: black;
          font-weight: bold;
          font-size: 13px;
        }
        .price {
          color: rgb(117, 117, 117);
          font-size: 13px;
        }
        @media (max-width: 765px) {
          :host {
            margin: 0 12px;
          }
        }
      `
    ]
  }

  render() {
    const item = this.item || {};
    return html`
      <shop-image src="${item.image}" alt="${item.title}"></shop-image>
      <div class="title">${item.title}</div>
      <span class="price">${item.price ? `$${item.price.toFixed(2)}` : null}</span>
    `;
  }

  static get properties() {
    return {
      item: Object
    }
  }
}

customElements.define('product-list-item', ProductsListItem);