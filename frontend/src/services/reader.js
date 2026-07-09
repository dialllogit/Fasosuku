import * as pdfjsLib from 'pdfjs-dist';
import { createWatermark, disableContentCopy } from './watermark';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

export class SecureReader {
  constructor(containerId, pdfUrl, userData) {
    this.container = document.getElementById(containerId);
    this.pdfUrl = pdfUrl;
    this.userData = userData;
    this.currentPage = 1;
    this.numPages = 0;
    this.pdf = null;

    // Disable copy protections
    disableContentCopy();
  }

  async init() {
    try {
      this.pdf = await pdfjsLib.getDocument(this.pdfUrl).promise;
      this.numPages = this.pdf.numPages;
      await this.renderPage(this.currentPage);
    } catch (error) {
      console.error('Error loading PDF:', error);
    }
  }

  async renderPage(pageNum) {
    const page = await this.pdf.getPage(pageNum);
    const viewport = page.getViewport({ scale: 1.5 });

    const canvas = document.createElement('canvas');
    canvas.width = viewport.width;
    canvas.height = viewport.height;

    const context = canvas.getContext('2d');
    await page.render({ canvasContext: context, viewport }).promise;

    // Apply watermark
    createWatermark(
      canvas,
      this.userData.name,
      this.userData.phone,
      this.userData.email
    );

    this.container.innerHTML = '';
    this.container.appendChild(canvas);
  }

  async nextPage() {
    if (this.currentPage < this.numPages) {
      this.currentPage++;
      await this.renderPage(this.currentPage);
    }
  }

  async prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      await this.renderPage(this.currentPage);
    }
  }
}
