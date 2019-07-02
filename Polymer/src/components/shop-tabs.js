import { LitElement, html, css } from 'lit-element';

import '@polymer/paper-tabs';

class ShopTabs extends LitElement {
  constructor() {
    super();
    this._routerInstalled = false;
  }

  static get styles() {
    return css`
      :host {
        display: flex;
        justify-content: center;
        height: 66px;
        align-items: center;
        --paper-tabs-selection-bar-color: black;
        --paper-tab-ink: black;
        --paper-tabs-content: {
          display: block;
        };
      }
      
      paper-tabs {
        justify-content: center;
        height: 37px;
      }

      paper-tab {
        width: 100px;
        font-weight: normal;
        height: 37px;
        padding: 0;
        margin: 0 10px;
        font-size: 13px;
      }

      paper-tab:focus router-link {
        font-weight: normal;
      }

      router-link {
        display: flex;
        justify-content: center;
        align-items: center;
        color: inherit;
        text-decoration: none;
        height: 37px;
      }
    `
  }
  
  static get properties () {
    return {
      router: Object,
      categories: Array,
      _activeCategory: String
    }
  }

  updated(changedProps) {
    if(!this._routerInstalled && changedProps.has('router')) {
      this._routerInstalled = true;
      const changeHandler = (page) => {
        this._activeCategory = page.params.category || null;
      }
      router.addEventListener('page-change', ({page}) => changeHandler(page));
      changeHandler(router.activePage);
    }
  }

  render() {
    return html`
      <paper-tabs selected="${this.categories && this.categories.findIndex(({_id}) => _id === this._activeCategory)}">
        ${this.categories && this.categories.map(({title, _id}) => html`
          <paper-tab>
            <router-link page-id="products" params="category: ${_id}">
              ${title}
            </router-link>
          </paper-tab>
        `)}
      </paper-tabs>
    `
  }
}

window.customElements.define('shop-tabs', ShopTabs);