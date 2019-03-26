import { LitElement, html, css } from 'lit-element';
import { notificationIcon } from './icons';
import { connect } from 'pwa-helpers/connect-mixin';
import { store } from '../store';

import '@polymer/paper-menu-button';

class NotificationsButton extends connect(store)(LitElement) {
	static get styles() {
		return [
			css`
				:host {
					display: block;
				}
				.icon-btn {
					min-width: 0;
					min-height: 0;
					border-radius: 50%;
					height: 48px;
					width: 48px;
				}
				svg {
					fill: currentColor;
				}
				#content {
					color: black;
					width: 100vw;
				}
			`
		]
	}

	render() {
		return html`
			<paper-menu-button horizontal-align="right" no-overlap>
				<paper-button class="icon-btn" slot="dropdown-trigger">
					<paper-badge label="5">
						${notificationIcon}
					</paper-badge>
				</paper-button>
				<div id="content" role="listbox" slot="dropdown-content">
					<paper-item>Notification 1</paper-item>
					<paper-item>Notification 2</paper-item>
					<paper-item>Notification 3</paper-item>
					<paper-item>Notification 4</paper-item>
					<paper-item>Notification 5</paper-item>
					<paper-item>Notification 6</paper-item>
					<paper-item>Notification 7</paper-item>
					<paper-item>Notification 8</paper-item>
				</div>
			</paper-menu-button>
		`
	}

	static get properties () {
		return {
			notifications: Array
		}
	}

	stateChanged(state) {
		this.notifications = [
			{
				title: 'Take out the trash',
				details: 'Your todo \'Take out the trash\' is planned in 10 minutes'
			}
		]
	}
}

window.customElements.define('notifications-button', NotificationsButton);