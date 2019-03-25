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
		const getElement = (page) => {
			const getProperty = (propertyName) => {
				let property;
				if(propertyName in page) {
					property = page[propertyName];
				} else if (propertyName in this.pageConfig.default) {
					property = this.pageConfig.default[propertyName];
				}
				if(typeof property === 'function') {
					property = property(page);
				}
				return property;
			}
			
			const redirect = getProperty('redirect');
			const id = page.id;

			if(!redirect && id) {
				const tagName = getProperty('tagName');
				let element;
	
				if(id in this._pageElements) {
					element = this._pageElements[id];
				} else {
					element = document.createElement(tagName);
					element.className = 'page';
					this._pageElements[id] = element;
				}
	
				if(this.page === id) {
					element.setAttribute('active', '');
				} else {
					element.removeAttribute('active');
				}
	
				if('subPages' in page) {
					getElements(page.subPages);
				}
			}

		}

		const getElements = (pages) => {
			for(const page of Object.values(pages)) getElement(page);
		}

		if(this.pageConfig) {
			getElements(this.pageConfig.pages);
			getElement(this.pageConfig.root);
			getElement(this.pageConfig['404']);	
		}

    return html`
      ${Object.values(this._pageElements)}
    `;
  }

  static get properties () {
    return {
			pages: Object,
			page: String
    };
  }

  constructor () {
    super();
    this._pageElements = {};
  }
}

customElements.define('view-container', ViewContainer);