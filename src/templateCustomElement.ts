/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-function */
export class TemplateCustomElement extends HTMLElement {
  state = 'hello world!!'

  static get observedAttributes(): string[] {
    return []
  }

  connectedCallback(): void {
    this.textContent = this.state
  }

  disconnectedCallback(): void {}

  attributeChangedCallback(
    attrName: string,
    oldValue: string,
    newValue: string
  ): void {}
}

if (!customElements.get('template-custom')) {
  window.TemplateCustomElement = TemplateCustomElement
  customElements.define('template-custom', TemplateCustomElement)
}

declare global {
  interface Window {
    TemplateCustomElement: typeof TemplateCustomElement
  }
  interface HTMLElementTagNameMap {
    'template-custom': TemplateCustomElement
  }
}
