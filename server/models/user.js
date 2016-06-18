'use strict';

var _class, _temp, _class2, _temp2;

var _model = require('../lib/model');

var _model2 = _interopRequireDefault(_model);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Sector = (_temp = _class = function (_Model) {
	_inherits(Sector, _Model);

	function Sector() {
		_classCallCheck(this, Sector);

		return _possibleConstructorReturn(this, Object.getPrototypeOf(Sector).apply(this, arguments));
	}

	return Sector;
}(_model2.default), _class.schema = {
	size: Number
}, _temp);
var User = (_temp2 = _class2 = function (_Model2) {
	_inherits(User, _Model2);

	function User() {
		_classCallCheck(this, User);

		return _possibleConstructorReturn(this, Object.getPrototypeOf(User).apply(this, arguments));
	}

	return User;
}(_model2.default), _class2.schema = {
	name: String,
	sectors: [Sector]
}, _temp2);


_asyncToGenerator(regeneratorRuntime.mark(function _callee() {
	var sector, sector2, user, sectors;
	return regeneratorRuntime.wrap(function _callee$(_context) {
		while (1) {
			switch (_context.prev = _context.next) {
				case 0:
					_context.prev = 0;
					_context.next = 3;
					return Sector.add({
						size: 236
					});

				case 3:
					sector = _context.sent;
					_context.next = 6;
					return Sector.add({
						size: 1005
					});

				case 6:
					sector2 = _context.sent;
					_context.next = 9;
					return User.add({
						name: 'Ашот',
						sectors: [sector]
					});

				case 9:
					user = _context.sent;
					_context.next = 12;
					return user.sectors;

				case 12:
					sectors = _context.sent;

					user.sectors = [sector, sector, sector];

					_context.next = 16;
					return user.save();

				case 16:
					_context.t0 = console;
					_context.next = 19;
					return user.sectors;

				case 19:
					_context.t1 = _context.sent;

					_context.t0.log.call(_context.t0, _context.t1);

					_context.next = 26;
					break;

				case 23:
					_context.prev = 23;
					_context.t2 = _context['catch'](0);

					console.error(_context.t2);

				case 26:
				case 'end':
					return _context.stop();
			}
		}
	}, _callee, this, [[0, 23]]);
}))();

//# sourceMappingURL=user.js.map