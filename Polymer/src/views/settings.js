import { html, css } from 'lit-element';
import { PageViewElement } from '../components/page-view-element';

import '../components/settings-panel';

import '@polymer/paper-button';
import '@polymer/paper-item';

class SettingsPage extends PageViewElement {
	static get styles() {
		return [
			css`
				section {
					width: 690px;
					max-width: calc(100% - 60px);
					margin: auto;
				}

				settings-panel {
					--settings-panel-color: var()
				}

				@media (max-width: 450px) {
					section {
						max-width: 100%;
						width: 100%;
					}
				}
			`
		]
	}

	render() {
		return html`
			<section>
				<settings-panel section="Account">
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate labore nobis eveniet? Accusamus porro ut quo dolores amet eaque velit, dolor aut quae aliquid, ab omnis ducimus excepturi tempora pariatur?
				</settings-panel>
				<settings-panel section="Notifications">
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate labore nobis eveniet? Accusamus porro ut quo dolores amet eaque velit, dolor aut quae aliquid, ab omnis ducimus excepturi tempora pariatur?
				</settings-panel>
				<settings-panel section="Theme">
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate labore nobis eveniet? Accusamus porro ut quo dolores amet eaque velit, dolor aut quae aliquid, ab omnis ducimus excepturi tempora pariatur?
				</settings-panel>
				<settings-panel section="Account">
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate labore nobis eveniet? Accusamus porro ut quo dolores amet eaque velit, dolor aut quae aliquid, ab omnis ducimus excepturi tempora pariatur?
				</settings-panel>
			</section>
		`
	}
}

window.customElements.define('settings-page', SettingsPage);