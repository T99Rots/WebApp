import { LitElement, html, css } from 'lit-element';

class DrawerPageList extends LitElement {
	static get styles () {
		return css`
			.drawer-list {
				box-sizing: border-box;
				width: 100%;
				height: 100%;
				background: var(--drawer-list-background, white);
				position: relative;
				margin-top: 14px;
			}
			.drawer-list > a {
				display: block;
				text-decoration: none;
				color: var(--drawer-list-text-color);
				padding: 11px;
				margin: 8px;
				font-weight: 600;
				border-radius: 5px;
			}
			.drawer-list > a > svg {
				vertical-align: middle;
				padding-right: 30px;
				fill: currentColor;
			}
			.drawer-list > a[selected] {
				color: var(--drawer-list-selected-color, #39843c);
				background: var(--drawer-list-selected-background, rgba(76,175,80,0.2));
			}
		`
	}

  render () {
		console.log(this.pages);
    const elems = [];
    for (const k in this.pages) {
      if (!this.pages[k].hidden) {
				const page = this.pages[k];
				let icon = this.pages[k].icon;
				let title = this.pages[k].title;
				if(typeof icon == 'function') icon = icon(this.pages[k]);
				if(typeof title == 'function') title = title(this.pages[k]);
				
        elems.push(
          html`<a ?selected="${this.page && this.page.url.replace(/^\/+/, '').startsWith(k)}"
            href="/${k}">${icon}${title}</a>`
        );
      }
    }
    return html`
      <div class="drawer-list">
				<a href="#" class="page" selected>Home</a>
				<a href="#" class="page">Dashboard</a>
				<a href="#" class="page" selected>Todo's</a>
				<a href="#" class="page">About</a>
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