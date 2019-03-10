import { LitElement, html } from 'lit-element';
import { store } from '../store';

class DrawerPageList extends LitElement {
  render () {
    const elems = [];
    for (const k in this._pages) {
      if (!this._pages[k].hidden) {
        elems.push(
          html`<a ?selected="${this._page.url.replace(/^\/+/, '').startsWith(k)}"
            href="/${k}">${this._pages[k].icon}${this._pages[k].title}</a>`
        );
      }
    }
    return html`
      <style>
        .drawer-list {
          box-sizing: border-box;
          width: 100%;
          height: 100%;
          background: var(--drawer-list-background, white);
          position: relative;
        }
        .drawer-list > a {
          display: block;
          text-decoration: none;
          color: var(--drawer-list-text-color);
          padding: 10px;
					margin: 6px;
          font-weight: 600;
					border-radius: 5px;
        }
        .drawer-list > a > svg {
          vertical-align: middle;
          padding-right: 30px;
          fill: currentColor;
        }
        .drawer-list > a[selected] {
          color: var(--drawer-list-selected-color);
          background: var(--drawer-list-selected-background, green);
        }
      </style>
      <div class="drawer-list">
				${elems}
      </div>
    `;
  }

  static get properties () {
    return {
      pages: Object,
      page: Object
    };
  }
}

customElements.define('drawer-page-list', DrawerPageList);