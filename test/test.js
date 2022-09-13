const delay = async (number) => {
  return new Promise((reslove) => {
    setTimeout(() => reslove(), number)
  })
}

describe('template custom element', function () {
  describe('element creation', function () {
    it('creates from document.createElement', function () {
      const el = document.createElement('polaroid-image')
      assert.equal('polaroid-image', el.nodeName)
    })

    it('creates from constructor', function () {
      const el = new window.PolaroidImgElement()
      assert.equal('polaroid-image', el.nodeName)
    })
  })

  describe('renders', function () {
    beforeEach(function () {
      document.body.innerHTML = `
        <div id="mocha-fixture">
          <polaroid-image></polaroid-image>
        </div>
      `
    })
    it('renders text of component', async function () {
      const templateElement = document.querySelector('polaroid-image')
      expect(templateElement.textContent).to.equal('hello world!!')
    })
  })
})
