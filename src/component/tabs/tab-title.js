export default class TabTitle {

	static tag = 'tab-title'
	static style = require('./tab-title.styl')

	static template = `
		<content></content>
	`

	constructor() {
		this.tab = this.require('tab')
		this.on('mousedown', event=> event.prevent())
		this.on('click', ()=> this.tab.activate())
		this.bindClass('__active', 'tab.status is tab.ACTIVE')
	}

}

