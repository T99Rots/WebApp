import { LitElement, html, css } from 'lit-element';

class CubicBezier {
  constructor(...args) {
    if(typeof args[0] === 'string') {
      switch(args[0]) {
        case 'ease':
          this.points = [.25,.1,.25,1];
          break;
        case 'ease-in':
          this.points = [.42,0,1,1];
          break;
        case 'ease-out':
          this.points = [0,0,.58,1];
          break;
        case 'ease-in-out':
          this.points = [.42,0,.58,1];
          break;
        default:
          this.points = [0,0,1,1];
      }
    } else {
      if(args.length < 4) {
        this.points = [0,0,1,1];
      } else {
        this.points = args.slice(0,4);
      }
    }
  }

  toString() {
    return `cubic-bezier(${this.points.join()})`;
  }

  getPositionAt(t) {
    return 3 * t * Math.pow(1 - t, 2) * this.points[1] + 3 * t * t * (1 - t) * this.points[3] + t * t * t * 1
  }
}

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
        const px = n => `${n}px`;
				this._contentContainer.style = `
					position: fixed;
          background: blue;
          width: ${width}px;
          left: ${left}px;
        `
        const animation = this._contentContainer.animate(
          [
            {top: px(top), height: px(height)},
            {top: px(0), height: '100vh'}
          ],
          {
            duration: 200,
            // easing: 'ease-in-out'
          }
        )
        
        animation.addEventListener('finish', e => {
          this._contentContainer.style = `
            position: fixed;
            background: blue;
            width: ${width}px;
            left: ${left}px;
            top: 0px;
            height: 100vh;
          `
        });

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