import { LitElement, html, css } from 'lit-element';

class PaperExpandingItem extends LitElement {
	constructor() {
		super();
		this.opened = false;
	}

	static get properties() {
		return {
			header: String,
			opened: Boolean
		}
	}
	
	static get styles() {
		return css`
			:host {
				height: 100%;
			}

			#scrim {
				display: none;
				position: fixed;
				width: 100%;
				height: 100vh;
				top: 0;
				transition: background 0.2s linear;
				z-index: 100;
			}
		`
	}

	render() {
		return html`
			<div id="wrapper" ?opened="${this.opened}">
				<div id="scrim" visible></div>
				<div id="contentContainer">
					<slot></slot>
					<slot name="item-expanded-header"></slot>
					<slot name="item-expanded-body"></slot>
				</div>			
			</div>
		`
	}

	open() {
		this.opened = true;
	}

	close() {
		this.opened = false;
	}

	toggle() {
		this.opened = !this.opened;
	}
}

window.customElements.define('paper-expanding-item', PaperExpandingItem);