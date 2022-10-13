import { Alignment, updateStyles } from './utils'

/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-function */
export class PolaroidImageElement extends HTMLElement {
  align?: Alignment = undefined
  rotate = 0
  beginRotation = 0
  endRotation = 13
  beginWidth = 600
  endWidth = 1200
  offset = 24
  borderThickness = 3
  borderColor = 'black'
  caption?: string | null
  wrapperElement: HTMLDivElement
  captionElement: HTMLParagraphElement
  resizeObserver?: ResizeObserver
  // eslint-disable-next-line custom-elements/no-constructor
  constructor() {
    super()
    this.attachShadow({ mode: 'open' })
    const slot = document.createElement('slot')
    this.wrapperElement = document.createElement('div')
    this.wrapperElement.style.padding = '1rem'
    this.wrapperElement.style.background = 'white'
    this.wrapperElement.style.backgroundClip = 'padding-box'
    this.wrapperElement.style.border = `${this.borderThickness}px solid ${this.borderColor}`

    this.wrapperElement.style.display = 'flex'
    this.wrapperElement.style.flexDirection = 'column'
    this.wrapperElement.style.gap = '.5rem'
    this.wrapperElement.style.alignItems = 'center'

    this.wrapperElement.setAttribute('part', 'container')

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
    return [
      'begin-rotation',
      'end-rotation',
      'begin-width',
      'end-width',
      'align',
      'offset',
      'caption',
    ]
  }

  connectedCallback(): void {
    this.update()
    this.resizeObserver = new ResizeObserver((entries) => {
      const body = entries[0]
      if (body) {
        this.update()
      }
    })
    this.resizeObserver.observe(document.body)
  }

  update(): void {
    this.align = this.getAttribute('align') as Alignment
    this.caption = this.getAttribute('caption')
    this.rotate = 0
    const width = window.innerWidth
    const beginRotation = this.getAttribute('begin-rotation')
    const endRotation = this.getAttribute('end-rotation')
    const beginWidth = this.getAttribute('begin-width')
    const endWidth = this.getAttribute('end-width')
    if (beginRotation) {
      this.beginRotation = parseFloat(beginRotation)
    }
    if (endRotation) {
      this.endRotation = parseFloat(endRotation)
    }
    if (beginWidth) {
      this.beginWidth = parseFloat(beginWidth)
    }
    if (endWidth) {
      this.endWidth = parseFloat(endWidth)
    }
    const r = this.getAttribute('rotate')
    if (r) {
      this.rotate = parseFloat(r)
    }
    const o = this.getAttribute('offset')
    if (o) {
      this.offset = parseInt(o)
    }

    if (width < this.beginWidth) {
      this.rotate = this.beginRotation
      this.align = 'none'
    } else if (width > this.endWidth) {
      this.rotate = this.endRotation
    } else {
      const ratio =
        (width - this.beginWidth) / (this.endWidth - this.beginWidth)
      this.rotate = this.endRotation * ratio
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

  disconnectedCallback(): void {
    this.resizeObserver?.disconnect()
  }

  attributeChangedCallback(
    attrName: string,
    oldValue: string,
    newValue: string
  ): void {
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
