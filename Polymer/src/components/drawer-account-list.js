import { LitElement, html, css } from 'lit-element';

import '@polymer/paper-item/paper-icon-item';
import {
	settingsIcon,
	addIcon
} from './icons';

class DrawerAccountList extends LitElement {
	static get styles () {
		return css`
			#container {
				display: flex;
				flex-direction: column;
				width: 100%;
				position: relative;
				top: -3px;
			}

			paper-icon-item {
				padding-top: 4px;
				padding-bottom: 4px;
				cursor: pointer;
			}

			.avatar {
				display: flex;
				box-sizing: border-box;
				width: 40px;
				height: 40px;
				border-radius: 50%;
				background-size: cover;
				background-position: center;
				justify-content: center;
				align-items: center;
			}

			.avatar svg {
				width: 24px;
				height: 24px;
				fill: var(--account-list-icon-color,currentColor);
			}
		`
	}

  render () {
    return html`
      <div role="listbox" id="container">
				${this.accounts && this.accounts.map(account => html`
					<paper-icon-item @click="${this._selectAccount(account)}">
						<div class="avatar" slot="item-icon" style="background-image: url('${account.avatar || '/img/profile.png'}')"></div>
						${account.name}
					</paper-icon-item>
				`)}
				<paper-icon-item>
					<div class="avatar" slot="item-icon">
						${addIcon}
					</div>
					Add account
				</paper-icon-item>
				<paper-icon-item>
					<div class="avatar" slot="item-icon">
						${settingsIcon}
					</div>
					Manage accounts
				</paper-icon-item>
			</div>
    `;
  }

	_addAccount () {
		this.dispatchEvent(new CustomEvent('add-account'));
	}

	_selectAccount (account) {
		this.dispatchEvent(new CustomEvent('add-account', {
			detail: account
		}));
	}
	
	_manageAccounts () {
		this.dispatchEvent(new CustomEvent('manage-accounts'));
	}

  static get properties () {
    return {
      accounts: Array
    };
  }
}

customElements.define('drawer-account-list', DrawerAccountList);