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
				background: red;
				width: 100%;
				height: 72px;
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

			:host([opened]) #scrim {
				display: block;
				background: rgba(0,0,0,0.5);
			}

			#contentContainer {
				width: 100%;
				background: red;
				height: 72px;
			}

			:host([opened]) #contentContainer {

			}
		`
	}

	firstUpdated() {
		this._contentContainer = this.renderRoot.getElementById('contentContainer');
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

	updated(changedProperties) {
		if(changedProperties.has('opened')) {
			if(this.opened) {
				document.body.style.overflow = 'hidden';
				const {top, left, width, height} = this._contentContainer.getBoundingClientRect();
				this._contentContainer.style = `
					position: fixed;
					width: ${width}px;
					height: ${height}px;
					top: ${top}px;
					left: ${left}px;
					background: blue;
				`
			} else {
				this._contentContainer.style = '';
				document.body.style.overflow = '';
			}
		}
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