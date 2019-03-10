import { LitElement, html } from 'lit-element';
import { connect } from 'pwa-helpers/connect-mixin';
import { store } from '../store';
import './page-view-element';

class ViewContainer extends connect(store)(LitElement) {
  render () {
    for (const page of this._pages) {
      let elem;
      if (!(page in this._pageElements)) {
        this._pageElements[page] = document.createElement(page);
        elem = this._pageElements[page];
        elem.className = 'page';
      }
      else {
        elem = this._pageElements[page];
      }
      if (page === this._page) {
        elem.setAttribute('active', '');
      }
      else {
        elem.removeAttribute('active');
      }
    }
    return html`
      <style>
        .page {
          display: none;
        }
        .page[active] {
          display: block;
        }
      </style>
      ${Object.values(this._pageElements)}
    `;
  }

  static get properties () {
    return {
      _pages: Array
    };
  }

  constructor () {
    super();
    this._pageElements = {};
  }

  stateChanged (state) {

    const getTagNames = (pages) => {
      const arr = [];
      const checkTag = (page) => {
        if (!('id' in page || 'tagName' in page)) return;
        arr.push(page.tagName || `${page.id}-page`);
      };
      const subTags = (subPages) => {
        Object.keys(subPages).forEach((a) => {
          checkTag(subPages[a]);
          if ('subPages' in subPages[a]) subTags(subPages[a].subPages);
        });
      };
      checkTag(pages['404']);
      checkTag(pages.root);
      subTags(pages.pages);
      return arr;
    };

    this._pages = state.app.pages ? getTagNames(state.app.pages) : [];
    this._page = state.app.page.tagName || 'assignments-page';
  }
}

customElements.define('view-container', ViewContainer);