import { LitElement, html, css } from 'lit-element';

class PaperBadge extends LitElement {
	static get styles () {
		return css`
			#container {
				position: relative;
			}
			#container::before {
				content: var(--paper-badge-label-content, "0");
				position: absolute;
				left: calc(100% - 5px);
				bottom: calc(100% - 10px);
				background: var(--paper-badge-background, rgb(255, 64, 129));
				color: var(--paper-badge-color, white);
				width: 20px;
				height: 20px;
				text-align: center;
				border-radius: 50%;
				line-height: 20px;
				font-size: 11px;
			}
			:host([disabled]) #container::before {
				display: none;
			}
		`
	}

  render () {
    return html`
      <div id="container" style='--paper-badge-label-content: "${this.label}"'>
				<slot></slot>
			</div>
    `;
  }

  static get properties () {
    return {
      label: String
    };
  }
}

customElements.define('paper-badge', PaperBadge);