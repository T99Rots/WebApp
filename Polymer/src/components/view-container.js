import { LitElement, html, css } from 'lit-element';
import './page-view-element';

class ViewContainer extends LitElement {
  constructor() {
    super();
    this._routerInstalled = false;
    this._pageElements = {};
  }

	static get styles () {
		return css`
			:host {
				display: block;
				position: relative;
			}
      :not([active]) {
        display: none;
      }
		`
	} 

  render () {
		if(this._page) {
      if(!(this._page.id in this._pageElements) && this._page.tagName) {
        this._pageElements[this._page.id] = document.createElement(this._page.tagName);
      }
		}

		for(const [id, element] of Object.entries(this._pageElements)) {
			if(id === this._page.id) {
        element.setAttribute('active','');
			} else {
        element.removeAttribute('active');
			}
		}

    return html`
      ${Object.values(this._pageElements)}
    `;
  }

  static get properties () {
    return {
      _page: Object,
      router: Object 
    };
  }

  updated(changedProps) {
    if(!this._routerInstalled && changedProps.has('router')) {
      this.router.addEventListener('page-change', ({page}) => {
        this._page = page;
      });
      this._page = router.activePage;
    }
  }
}

customElements.define('view-container', ViewContainer);