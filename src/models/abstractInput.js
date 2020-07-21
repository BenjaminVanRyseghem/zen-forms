// import "./abstractInput.scss";

export default class AbstractInput {
	constructor(id, showFn = () => true) {
		if (id === undefined) {
			throw new Error("[AbstractInput/constructor] `id` is mandatory");
		}

		this._id = id;
		this._showFn = showFn;
	}

	id() {
		return this._id;
	}

	shouldShow(...args) {
		return this._showFn(...args);
	}

	label(label) {
		if (label === undefined) {
			return this._label;
		}

		this._label = label;
		return this;
	}

	render(renderer, ...args) {
		let [{ values }] = args || [{}];
		if (!this._showFn(values)) {
			return null;
		}

		return this.renderContent(renderer, ...args);
	}

	// eslint-disable-next-line react/require-render-return,no-unused-vars
	renderContent(renderer, ...args) {
		throw Error("[AbstractInput/renderContent] Must be overridden");
	}
}
