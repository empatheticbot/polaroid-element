import { Alignment, updateStyles } from './utils'

/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-function */
export class PolaroidImageElement extends HTMLElement {
  align?: Alignment = undefined
  rotate = 0
  offset = 24
  borderThickness = 3
  borderColor = 'black'
  caption?: string | null
  wrapperElement: HTMLDivElement
  captionElement: HTMLParagraphElement
  // eslint-disable-next-line custom-elements/no-constructor
  constructor() {
    super()
    this.attachShadow({ mode: 'open' })
    const slot = document.createElement('slot')
    this.wrapperElement = document.createElement('div')
    this.wrapperElement.style.padding = '1rem'
    this.wrapperElement.style.background = 'white'
    this.wrapperElement.style.border = `${this.borderThickness}px solid ${this.borderColor}`

    this.wrapperElement.style.display = 'flex'
    this.wrapperElement.style.flexDirection = 'column'
    this.wrapperElement.style.gap = '.5rem'
    this.wrapperElement.style.alignItems = 'center'

    this.captionElement = document.createElement('p')
    this.captionElement.style.textAlign = 'center'
    this.captionElement.style.fontStyle = 'italic'
    this.captionElement.style.margin = '0'
    this.captionElement.style.minHeight = '1rem'
    this.wrapperElement.appendChild(slot)
    this.wrapperElement.appendChild(this.captionElement)
    this.shadowRoot?.appendChild(this.wrapperElement)
  }

  static get observedAttributes(): string[] {
    return ['rotate', 'align', 'offset', 'caption']
  }

  connectedCallback(): void {
    this.update()
  }

  update(): void {
    this.align = this.getAttribute('align') as Alignment
    this.caption = this.getAttribute('caption')

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

    updateStyles(
      this,
      this.wrapperElement,
      this.rotate,
      this.align,
      this.offset
    )
    this.captionElement.style.maxWidth = `${img.width}px`
    this.captionElement.textContent = this.caption
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
