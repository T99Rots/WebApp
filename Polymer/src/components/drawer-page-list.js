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
				fill: var(--page-list-icon-color, var(--page-list-color, currentColor));
			}
			paper-button[selected] {
				color: var(--page-list-selected-color,#3f51b5);
				z-index: 2;
				position: relative;
			}
			paper-button[selected] svg {
				fill: var(--page-list-selected-color, #3f51b5)
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
		let elements;

		if(Array.isArray(this.pages)) {
			elements = this.pages.filter(page => !page.hidden && page.route && page.route.split('/').length < 3).map(page => html`
				<a href="${page.route}">
					<paper-button ?selected="${this.page === page.id}">
						${page.icon}
						${page.title}
					</paper-button>
				</a>
			`)
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