import Platform from 'ui-js/core/platform'
import Notificator from './notificator/notificator'
import Gallery from './gallery/gallery'
import Confirm from './confirm/confirm'
import Roulette from './roulette/roulette'
import AdminPanel from './admin-panel/admin-panel'
import Promise from 'ui-js/core/promise'


export default class App {

	static styles = [require('./app.styl')]
	static selector = 'my-app'
	static components = [Gallery, Confirm, Notificator, Roulette, AdminPanel]

	static template = `
		<confirm #confirm></confirm>
		<notificator #notificator></notificator>

		<roulette #roulette></roulette>
		<admin-panel [roulette]='roulette'></admin-panel>
	`

	constructor() {
		this.audioContext = new AudioContext()
		this.soundBuffersLoadPromises = {}

		this.platform = new Platform()
		this.fontSize = 70
		this.bindHostClasses()
		this.initHandlers()
	}


	initHandlers() {
		this.watch('fontSize', this.updateFonts.bind(this))
		ui.dom.on('resize', this.updateFonts.bind(this))
		this.host.on('init', this.updateFonts.bind(this))
	}


	bindHostClasses() {
		this.bindClass('__ms', 'platform.ms')
		this.bindClass('__ie', 'platform.ie')
		this.bindClass('__edge', 'platform.edge')
		this.bindClass('__chrome', 'platform.chrome')
		this.bindClass('__firefox', 'platform.firefox')
	}


	playSound(url, volume = 1) {
		this.loadSound(url).then((buffer)=>
			this.playSoundBuffer(buffer, volume)
		)
	}


	playSoundBuffer(buffer, volume) {
		let gainNode = this.audioContext.createGain()
		gainNode.gain.value = volume
		let source = this.audioContext.createBufferSource()
		source.buffer = buffer
		source.connect(gainNode)
		gainNode.connect(this.audioContext.destination)
		source.start(0)
	}


	loadSound(url) {
		if (this.soundBuffersLoadPromises[url]) {
			return this.soundBuffersLoadPromises[url]
		}

		let promise = new Promise()
		let request = new XMLHttpRequest()
		request.open('GET', url, true)
		request.responseType = 'arraybuffer'

		request.addEventListener('load', ()=> {
			let audioData = request.response
			this.audioContext.decodeAudioData(audioData, promise.resolve, promise.reject)
		})

		request.send()
		this.soundBuffersLoadPromises[url] = promise
		return promise
	}


	gallery(urls) {
		this.locals.gallery.open(urls)
	}


	alert(message) {
		this.locals.notificator.alert(message)
	}


	error(message) {
		this.locals.notificator.error(message)
	}


	warning(message) {
		this.locals.notificator.warning(message)
	}


	confirm(text) {
		return this.locals.confirm.confirm(text)
	}


	updateFonts() {
		let fontSize = this.host.width() / this.fontSize
		this.host.style.fontSize = "#{fontSize}px"
		this.host.renderStyle()
	}

}

