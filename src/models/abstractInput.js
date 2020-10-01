// import "./abstractInput.scss";

export default class AbstractInput {
	constructor(id, showFn = () => true) {
		if (id === undefined) {
			throw new Error("[AbstractInput/constructor] `id` is mandatory");
		}

		this._id = id;
		this._showFn = showFn;
		this._transform = null;
		this._format = null;
		this._disabled = false;
		this._readOnly = false;
	}

	id() {
		return this.baseId();
	}

	baseId() {
		return this._id;
	}

	disabled(boolOrFn = true) {
		this._disabled = boolOrFn;
		return this;
	}

	isDisabled() {
		return this._disabled;
	}

	readOnly(boolOrFn = true) {
		this._readOnly = boolOrFn;
		return this;
	}

	isReadOnly() {
		return this._readOnly || (() => false);
	}

	onClick(fn) {
		this._onClick = fn;
		return this;
	}

	getClickHandler() {
		return this._onClick;
	}

	shouldShow(...args) {
		return this._showFn(...args);
	}

	label(label) {
		this._label = label;
		return this;
	}

	getLabel() {
		return this._label;
	}

	transform(fn) {
		if (fn === undefined) {
			return this._transform;
		}

		this._transform = fn;
		return this;
	}

	format(fn) {
		if (fn === undefined) {
			return this._format;
		}

		this._format = fn;
		return this;
	}

	render(renderer, ...args) {
		let [options] = args || [{}];
		if (!this._showFn(options)) {
			return null;
		}

		return this.renderContent(renderer, ...args);
	}

	// eslint-disable-next-line react/require-render-return,no-unused-vars
	renderContent(renderer, ...args) {
		throw Error("[AbstractInput/renderContent] Must be overridden");
	}
}
