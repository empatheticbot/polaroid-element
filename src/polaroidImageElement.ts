import { Alignment, updateStyles } from './utils'

/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-function */
export class PolaroidImageElement extends HTMLElement {
  align?: Alignment = undefined
  rotate = 0
  offset = 24

  static get observedAttributes(): string[] {
    return ['rotate', 'align', 'offset']
  }

  connectedCallback(): void {
    this.update()
  }

  update(): void {
    this.align = this.getAttribute('align') as Alignment
    const r = this.getAttribute('rotate')
    if (r) {
      this.rotate = parseFloat(r)
    }
    const o = this.getAttribute('offset')
    if (o) {
      this.offset = parseInt(o)
    }
    // new MutationObserver(() => {
    // eslint-disable-next-line custom-elements/no-dom-traversal-in-connectedcallback
    const img = this.querySelector('img')

    if (!img) {
      throw Error(`'img' element is required to be passed to polaroid-image`)
    }

    updateStyles(this, img, this.rotate, this.align, this.offset)
  }

  disconnectedCallback(): void {}

  attributeChangedCallback(
    attrName: string,
    oldValue: string,
    newValue: string
  ): void {
    console.log(attrName)
    this.update()
  }
}

if (!customElements.get('polaroid-image')) {
  window.PolaroidImageElement = PolaroidImageElement
  customElements.define('polaroid-image', PolaroidImageElement)
}

declare global {
  interface Window {
    PolaroidImageElement: typeof PolaroidImageElement
  }
  interface HTMLElementTagNameMap {
    'polaroid-image': PolaroidImageElement
  }
}
