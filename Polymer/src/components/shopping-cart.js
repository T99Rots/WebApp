import { LitElement, html, css } from 'lit-element';
import { repeat } from 'lit-html/directives/repeat.js';
import { connect } from 'pwa-helpers/connect-mixin';
import { store } from '../store';

import {
  updateCartState
} from '../actions/app';

import sharedStyles from './shared-styles';

import '@polymer/paper-menu-button';
import '@polymer/iron-icons/iron-icons.js';
import '@polymer/paper-icon-button';
import '@polymer/paper-button';
import '@polymer/paper-item/paper-icon-item';
import '@polymer/paper-item';
import '../components/paper-badge';

const formatPrice = (price) => `€ ${Math.floor(price)}.${(Math.floor((price%1)*100)+'00').substr(0,2)}`

class ShoppingCart extends connect(store)(LitElement) {
	static get styles() {
    return [
      sharedStyles,
      css`
        :host {
          display: block;
          --paper-menu-button-dropdown-background: var(--notification-dropdown-content-background, white);
        }
        paper-menu-button {
          padding: 0;
        }
        #cart-link {
          display: none;
        }
        h3 {
          margin: 0;
          font-weight: normal;
          font-size: 18px;
        }
        #content {
          color: black;
          width: 350px;
          padding: 40px;
        }
        paper-icon-item {
          padding: 0;
          border-bottom: 1px solid lightgray;
        }
        paper-icon-item:first-child {
          border-top: 1px solid lightgray;
        }
        paper-button {
          width: 100%;
          margin: 0;
        }
        .detail {
          width: 100px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-left: 20px;
          font-size: 14px;
          color: rgb(117, 117, 117)
        }
        .price {
          color: black;
        }
        router-link {
          text-decoration: none;
          color: black;
        }
        header {
          display: flex;
          justify-content: space-between;
          padding-bottom: 10px;
          align-items: center;
        }
        header router-link {
          font-size: 14px;
        }
        footer {
          padding-top: 20px;
          display: flex;
          justify-content: center;
          flex-wrap: wrap;
          align-items: center;
        }
        footer router-link {
          flex-shrink: 0;
          width: 100%;
        }
        footer p {
          width: 50%;
          font-size: 15px;
        }
        footer p:nth-child(2n) {
          text-align: right;
        }
        #total {
          font-size: 18px;
        }
        @media (max-width: 765px) {
          paper-menu-button {
            display: none;
          }
          #cart-link {
            display: block;
          }
        }
      `
    ]
	}

	render() {
    const total = this._cart? formatPrice(this._cart.reduce((total, item) => total+(item.price*item.amount), 0)): formatPrice(0);
    const itemCount = this._cart? this._cart.reduce((total, item) => item.amount+total,0): '';
    return html`
			<paper-menu-button 
        horizontal-align="right" 
        no-overlap
        ?opened="${this._cartOpened}"
        @opened-changed=${e => store.dispatch(updateCartState(e.detail.value))}>
        <paper-badge label="${itemCount}" slot="dropdown-trigger">
          <paper-icon-button icon="shopping-cart"></paper-icon-button>
        </paper-badge>
				<div id="content" slot="dropdown-content">
          <header>
            <h3>Your Cart</h3>
            <router-link page-id="cart" class="underline">Edit cart</router-link>
          </header>
					<div role="listbox">
            ${this._cart && repeat(this._cart, item => item.id, item => html`          
              <paper-icon-item>
                <div class="avatar" style="background-image: url('${item.photo}')" slot="item-icon"></div>
                <paper-item-body two-line>
                  <div primary>${item.name}</div>
                  <div secondary>${item.description}</div>
                </paper-item-body>
                <div class="detail">
                  <p class="amount">Qty: ${item.amount}</p>
                  <p class="price">${formatPrice(item.price * item.amount)}</p>
                </div>
              </paper-icon-item>
            `)}
					</div>
          <footer>
            <p>Total</p>
            <p id="total">${total}</p>
            <router-link page-id="checkout">
              <paper-button>Checkout</paper-button>
            </router-link>
          </footer>
				</div>
			</paper-menu-button>
      <router-link page-id="cart" id="cart-link">
        <paper-badge label="${itemCount}">
          <paper-icon-button icon="shopping-cart"></paper-icon-button>
        </paper-badge>
      </router-link>
		`
	}

  firstUpdated() {
    this._cart = new Array(5).fill(null).map((...args) => ({
      id: new Array(4).fill(null).map(a=>Math.random().toString(36).substr(2)).join(''),
      name: 'product '+args[1],
      description: 'The most amazing potato made since 1970, available in red, green and orange',
      price: Math.floor(Math.random()*5000)/100,
      amount: Math.floor(Math.random()*5)+1,
      photo: 'https://d30g5rxy3ee0r1.cloudfront.net/wp-content/uploads/2016/04/407506_by_laratyler_1462072196_potato.jpg'
    })) 
  }

	static get properties () {
		return {
      _cart: Array,
      _cartOpened: Boolean
		}
  }
  
  stateChanged(state) {
    this._cartOpened = state.app.cartOpened;
  }
}

window.customElements.define('shopping-cart', ShoppingCart);
