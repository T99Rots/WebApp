import { LitElement, html, css } from 'lit-element';
import './page-view-element';

class ViewContainer extends LitElement {
	static get styles () {
		return css`
			:host {
				display: block;
				position: relative;
			}
			:host > * {
				display: none;
			}
			:host > *[active] {
				display: block;
			}
		`
	} 

  render () {
		if(this.page && !(this.page.tagName in this._pageElements) && this.page.tagName) {
			this._pageElements[this.page.tagName] = document.createElement(this.page.tagName);
		}

		for(const [tagName, element] of Object.entries(this._pageElements)) {
			if(tagName === this.page.tagName) {
				if(!element.hasAttribute('active')) {
					element.setAttribute('active','');
				}
			} else {
				if(element.hasAttribute('active')) {
					element.removeAttribute('active');
				}
			}
		}

    return html`
      ${Object.values(this._pageElements)}
    `;
  }

  static get properties () {
    return {
			page: Object
    };
  }

  constructor () {
		super();
    this._pageElements = {};
  }
}

customElements.define('view-container', ViewContainer);