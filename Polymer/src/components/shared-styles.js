import { css } from 'lit-element';

export default css`
  :host(.page) {
    display: block;
    width: 100%;
    max-width: 1440px;
    margin: auto;
    padding-top: 130px;
  }
  :host {
    --paper-input-container-focus-color: var(--app-primary-color);
  }
  [hidden] {
    display: none!important;
  }
  paper-button {
    border: 2px solid black;
    padding: 12px 44px;
    font-size: 14px;
  }
  .underline {
    position: relative;
    cursor: pointer;
  }
  .underline::after {
    position: absolute;
    bottom: 0;
    left: 50%;
    content: ' ';
    background: black;
    width: 0px;
    height: 1px;
    transition: 0.115s ease-in-out;
    transition-property: width left;
  }
  .underline:hover::after {
    width: 100%;
    left: 0%;
  }
  @media (max-width: 765px) {
    :host(.page) {
      padding-top: 64px;
    }
  }
` 