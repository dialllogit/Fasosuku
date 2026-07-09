import * as pdfjsLib from 'pdfjs-dist'

pdfjsLib.GlobalWorkerOptions.workerSrc = `/pdf.worker.min.js`

export class PdfReader {
  constructor(canvasId, options = {}) {
    this.canvas = document.getElementById(canvasId)
    this.ctx = this.canvas.getContext('2d')
    this.currentPage = 1
    this.totalPages = 0
    this.pdfDoc = null
    this.scale = options.scale || 1.5
    this.watermarkOptions = options.watermark || {}
  }

  async loadPdf(pdfUrl) {
    try {
      this.pdfDoc = await pdfjsLib.getDocument(pdfUrl).promise
      this.totalPages = this.pdfDoc.numPages
      await this.renderPage(1)
    } catch (error) {
      console.error('Error loading PDF:', error)
      throw error
    }
  }

  async renderPage(pageNum) {
    if (pageNum < 1 || pageNum > this.totalPages) return

    try {
      const page = await this.pdfDoc.getPage(pageNum)
      const viewport = page.getViewport({ scale: this.scale })

      this.canvas.width = viewport.width
      this.canvas.height = viewport.height

      const renderContext = {
        canvasContext: this.ctx,
        viewport: viewport
      }

      await page.render(renderContext).promise
      this.addWatermark()
      this.currentPage = pageNum
    } catch (error) {
      console.error('Error rendering page:', error)
    }
  }

  addWatermark() {
    const { name = 'Student', phone = '', email = '' } = this.watermarkOptions
    const text = `${name} - ${phone} - ${email}`
    const opacity = 0.08

    this.ctx.save()
    this.ctx.globalAlpha = opacity
    this.ctx.font = '24px Arial'
    this.ctx.fillStyle = '#000000'
    this.ctx.rotate(-Math.PI / 4)

    for (let x = -this.canvas.width; x < this.canvas.width * 2; x += 200) {
      for (let y = -this.canvas.height; y < this.canvas.height * 2; y += 200) {
        this.ctx.fillText(text, x, y)
      }
    }

    this.ctx.restore()
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.renderPage(this.currentPage + 1)
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.renderPage(this.currentPage - 1)
    }
  }

  goToPage(pageNum) {
    this.renderPage(pageNum)
  }
}
