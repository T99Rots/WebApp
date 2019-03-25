import { LitElement, html, css } from 'lit-element';
import '@polymer/paper-button';

class DrawerPageList extends LitElement {
	static get styles () {
		return css`
			.drawer-list {
				box-sizing: border-box;
				width: 100%;
				height: 100%;
				position: relative;
				margin-top: 10px;
			}
			.drawer-list > a {
				display: block;
				text-decoration: none;
			}
			paper-button {
				color: var(--page-list-color, black);
				font-weight: 600;
				display: flex;
				justify-content: left;
				border-radius: 5px;
				margin: 4px 8px;
				text-transform: none;
			}
			paper-button svg {
				vertical-align: middle;
				margin-right: 20px;
				margin-left: 3px;
				fill: currentColor;
			}
			paper-button[selected] {
				color: var(--page-list-selected-color,#3f51b5);
				z-index: 2;
				position: relative;
			}
			paper-button[selected]::before {
				border-radius: 5px;
				z-index: -1;
				content: "";
				position: absolute;
				top: 0; 
				left: 0;
				width: 100%; 
				height: 100%;   
				background: var(--page-list-selected-color, #3f51b5);
				opacity: .3;
			}
		`
	}

  render () {
		console.log(this.pages);
		const elements = [];
		
		if(this.pages) {
			for(const [route, page] of Object.entries(this.pageConfig.pages)) {
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
				const hidden = getProperty('hidden');
	
				if(!hidden) {
					const icon = getProperty('icon');
					const title = getProperty('title');
		
					elements.push(
						html`
							<a href="/${route}">
								<paper-button ?selected="${this.page === page.id}">
									${icon}
									${title}
								</paper-button>
							</a>
						`
					);
				}
			}
		}

    return html`
      <div class="drawer-list">
				${elements}
      </div>
    `;
  }

  static get properties () {
    return {
      pages: Array,
      page: Object
    };
  }
}

customElements.define('drawer-page-list', DrawerPageList);