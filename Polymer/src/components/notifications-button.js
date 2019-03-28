import { LitElement, html, css } from 'lit-element';
import { notificationIcon, settingsIcon } from './icons';
import { connect } from 'pwa-helpers/connect-mixin';
import { store } from '../store';

import '@polymer/paper-menu-button';
import '@polymer/paper-item/paper-icon-item';
import '@polymer/paper-item';
import '@polymer/paper-material';

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
					padding: 0;
					margin: 0;
				}
				svg {
					fill: currentColor;
				}
				#menu-header {
					display: flex;
					justify-content: space-between;
					padding: 0 8px 0 16px;
					align-items: center;
					background: var(--app-primary-color);
					color: white;
				}
				#menu-footer {
					display: flex;
					padding: 4px 0 14px 0;
					align-items: center;
					justify-content: center;
					color: var(--app-primary-color);
					font-size: 17px;
					cursor: pointer;
				}
				h2 {
					margin: 0;
					font-weight: normal;
					font-size: 18px;
				}
				#content {
					color: black;
					width: 400px;
				}
				.avatar {
					width: 48px;
					height: 48px;
					border-radius: 50%;
					background-size: cover;
					background-position: center;
				}
				paper-icon-item {
					cursor: pointer;
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
				<div id="content" slot="dropdown-content">
					<div id="menu-header">
						<h2>Notifications</h2>
						<paper-button class="icon-btn">
							${settingsIcon}
						</paper-button>
					</div>
					<div role="listbox">
						<paper-icon-item>
							<div class="avatar" style="background-image: url('/img/avatars/128.jpg')" slot="item-icon"></div>
							<paper-item-body two-line>
								<div>Notification 1</div>
								<div secondary>Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate labore nobis eveniet? Accusamus porro ut quo dolores amet eaque velit, dolor aut quae aliquid, ab omnis ducimus excepturi tempora pariatur?</div>
							</paper-item-body>
						</paper-icon-item>
						<paper-icon-item>
							<div class="avatar" style="background-image: url('/img/avatars/128_2.jpg')" slot="item-icon"></div>
							<paper-item-body two-line>
								<div>Notification 2</div>
								<div secondary>Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate labore nobis eveniet? Accusamus porro ut quo dolores amet eaque velit, dolor aut quae aliquid, ab omnis ducimus excepturi tempora pariatur?</div>
							</paper-item-body>
						</paper-icon-item>
						<paper-icon-item>
							<div class="avatar" style="background-image: url('/img/avatars/128_3.jpg')" slot="item-icon"></div>
							<paper-item-body two-line>
								<div>Notification 3</div>
								<div secondary>Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate labore nobis eveniet? Accusamus porro ut quo dolores amet eaque velit, dolor aut quae aliquid, ab omnis ducimus excepturi tempora pariatur?</div>
							</paper-item-body>
						</paper-icon-item>
						<paper-icon-item>
							<div class="avatar" style="background-image: url('/img/avatars/128_4.jpg')" slot="item-icon"></div>
							<paper-item-body two-line>
								<div>Notification 4</div>
								<div secondary>Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate labore nobis eveniet? Accusamus porro ut quo dolores amet eaque velit, dolor aut quae aliquid, ab omnis ducimus excepturi tempora pariatur?</div>
							</paper-item-body>
						</paper-icon-item>
						<paper-icon-item>
							<div class="avatar" style="background-image: url('/img/avatars/128_5.jpg')" slot="item-icon"></div>
							<paper-item-body two-line>
								<div>Notification 5</div>
								<div secondary>Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate labore nobis eveniet? Accusamus porro ut quo dolores amet eaque velit, dolor aut quae aliquid, ab omnis ducimus excepturi tempora pariatur?</div>
							</paper-item-body>
						</paper-icon-item>
					</div>
					<div id="menu-footer">
						See all recent activity
					</div>
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