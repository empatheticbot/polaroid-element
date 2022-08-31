const delay = async (number) => {
  return new Promise((reslove) => {
    setTimeout(() => reslove(), number)
  })
}

describe('template custom element', function () {
  describe('element creation', function () {
    it('creates from document.createElement', function () {
      const el = document.createElement('template-custom')
      assert.equal('TEMPLATE-CUSTOM', el.nodeName)
    })

    it('creates from constructor', function () {
      const el = new window.TemplateCustomElement()
      assert.equal('TEMPLATE-CUSTOM', el.nodeName)
    })
  })

  describe('renders', function () {
    beforeEach(function () {
      document.body.innerHTML = `
        <div id="mocha-fixture">
          <template-custom></template-custom>
        </div>
      `
    })
    it('renders text of component', async function () {
      const templateElement = document.querySelector('template-custom')
      expect(templateElement.textContent).to.equal('hello world!!')
    })
  })
})
