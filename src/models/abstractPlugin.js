/**
 * TODO: Write jsdoc
 * @class
 */
export default class AbstractPlugin {
	register(_this) { // eslint-disable-line no-unused-vars

	}

	registerExtensions() {}

	registerFunction(_this, name, fn) {
		_this[name] = fn.bind(_this);
	}

	extends(klass, name, fn) {
		klass.prototype[name] = fn;
	}
}
