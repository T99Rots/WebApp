import { LitElement, html, css } from 'lit-element';
import './page-view-element';

class ViewContainer extends LitElement {
	static get styles () {
		return css`
			:host {
				display: block;
			}
			.page {
				display: none;
			}
			.page[active] {
				display: block;
			}
		`
	} 

  render () {
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

		const tagNames = getTagNames(this.pages);

    for (const tagName of tagNames) {
      let elem;
      if (!(tagName in this._pageElements)) {
        this._pageElements[tagName] = document.createElement(tagName);
        elem = this._pageElements[tagName];
        elem.className = 'page';
      }
      else {
        elem = this._pageElements[tagName];
      }
      if (tagName === this.page.tagName) {
        elem.setAttribute('active', '');
      }
      else {
        elem.removeAttribute('active');
      }
    }
    return html`
      ${Object.values(this._pageElements)}
    `;
  }

  static get properties () {
    return {
			pages: Object,
			page: Object
    };
  }

  constructor () {
    super();
    this._pageElements = {};
  }
}

customElements.define('view-container', ViewContainer);