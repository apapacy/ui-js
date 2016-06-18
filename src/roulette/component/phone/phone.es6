import Text from '../text/text'


export default class Phone extends Text {

	static selector = 'phone'

	test(value) {
		let numbers = value.match(/\d/img)
		if (!numbers) return false
		return numbers.length >= 10
	}

}




