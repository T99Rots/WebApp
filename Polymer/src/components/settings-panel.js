import { LitElement, html, css } from 'lit-element';
import '@polymer/paper-material';

class SettingsPanel extends LitElement {
	static get styles () {
		return css`
			h2 {
				font-weight: normal;
				font-size: 16px;
				margin: 25px 0 5px 0;
			}

			paper-material {
				background: white;
				font-size: 16px;
				padding: 20px;
				border-radius: 3px;
			}
		`
	}

  render () {
    return html`
			<h2>${this.section}</h2>
			<paper-material>
				<slot></slot>
			</paper-material>
    `;
  }

  static get properties () {
    return {
      section: String
    };
  }
}

customElements.define('settings-panel', SettingsPanel);