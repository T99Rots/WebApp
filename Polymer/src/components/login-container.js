import { LitElement, html, css } from 'lit-element';

class LoginContainer extends LitElement {
	static get styles () {
		return css`
      :host {
        display: flex;
        overflow: hidden;
        width: 100%;
      }
      #moving-container {
        width: calc(200% - var(--login-container-middle-width, 340px));
        flex-shrink: 0;
        display: flex;
        position: relative;
        transition: left var(--login-container-transition, 0.5s ease-in-out);
        left: calc(0px - (100% - var(--login-container-middle-width, 340px)));
      }
      :host([active-side="right"]) #moving-container {
        left: 0;
      }
      #middle-container {
        width: var(--login-container-middle-width, 340px);
        display: flex;
        overflow: hidden;
      }
      #left-container, #right-container {
        width: calc((100% - var(--login-container-middle-width, 340px)) / 2);
        display: flex;
        overflow: hidden;
      }
      #middle-inner-container {
        position: relative;
        transition: left var(--login-container-transition, 0.5s ease-in-out);
        width: 200%;
        left: 0;
        flex-shrink: 0;
        display: flex;
      }
      :host([active-side="right"]) #middle-inner-container {
        left: -100%;
      }
      #middle-left-container, #middle-right-container {
        width: 50%;
        display: flex;
      }
      #right-inner-container, #left-inner-container {
        display: flex;
        position: relative;
        left: calc(100% + var(--login-container-middle-width, 340px));
        width: 100%;
        transition: left var(--login-container-transition, 0.5s ease-in-out);
      }
      #right-inner-container {
        left: 0;
      }
      :host([active-side="right"]) #left-inner-container {
        left: 0;
      }
      :host([active-side="right"]) #right-inner-container {
        left: calc(-100% - var(--login-container-middle-width, 340px));
      }
		`
	}

  render () {
    return html`
      <div id="moving-container">
        <div id="left-container">
          <div id="left-inner-container">
            <slot name="left"></slot>
          </div>
        </div>
        <div id="middle-container">
          <div id="middle-inner-container">
            <div id="middle-left-container">
              <slot name="middle-left"></slot>
            </div>
            <div id="middle-right-container">
              <slot name="middle-right"></slot>
            </div>
          </div>
        </div>
        <div id="right-container">
          <div id="right-inner-container">
            <slot name="right"></slot>
          </div>
        </div>
      </div>
    `;
  }
}

customElements.define('login-container', LoginContainer);