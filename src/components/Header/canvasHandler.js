// https://stackoverflow.com/a/6271865
export class CanvasHandler {
	constructor(data) {
		this.root = data.root

		this.canvas = data.canvas
		this.maskCanvas = document.createElement('canvas')

		this.fill = data.fill
		this.arcRadius = data.arcRadius
		this.arcBlur = data.arcBlur

		this.draw()

		this.root.addEventListener('mousemove', ({ clientX: x, clientY: y }) =>
			this.draw(x, y))

		window.addEventListener('resize', this.draw.bind(this))
	}

	draw(x, y) {
		this.setSize()

		this.ctx = this.canvas.getContext('2d')
		this.maskCtx = this.maskCanvas.getContext('2d')

		let fill = this.fill
		if (typeof this.fill === 'object' && this.fill.length > 1) {
			fill = this.maskCtx.createLinearGradient(0, 0, this.canvas.width, this.canvas.height);

			this.fill.forEach((color, i, arr) =>
				fill.addColorStop(i * (1 / (arr.length - 1)), color))
		}

		this.maskCtx.fillStyle = fill
		this.maskCtx.fillRect(0, 0, window.innerWidth, window.innerHeight)
		this.maskCtx.globalCompositeOperation = 'xor'
		this.maskCtx.arc(x, y, this.arcRadius, 0, 2 * Math.PI)
		this.maskCtx.filter = `blur(${this.arcBlur}px)`
		this.maskCtx.fill()

		this.ctx.drawImage(this.maskCanvas, 0, 0)
	}

	setSize() {
		this.canvas.width = window.innerWidth
		this.canvas.height = window.innerHeight
		this.maskCanvas.width = this.canvas.width
		this.maskCanvas.height = this.canvas.height
	}
}