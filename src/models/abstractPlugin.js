/**
 * Abstract class for plugins.
 * It provides convenient methods to extends classes and register new functions.
 * @class
 */
export default class AbstractPlugin {
	register(_this) {} // eslint-disable-line no-unused-vars

	registerExtensions(klass) {} // eslint-disable-line no-unused-vars

	registerFunction(_this, name, fn) {
		let _super = { // eslint-disable-line no-underscore-dangle
			[name]: _this[name].bind(_this)
		};

		_this[name] = (...args) => fn.bind(_this)(...args, _super);
	}

	extends(klass, name, fn) {
		klass.prototype[name] = fn;
	}
}
