// import "./abstractInput.scss";

export default class AbstractInput {
	constructor(id, showFn = () => true) {
		if (!id) {
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

	// eslint-disable-next-line react/require-render-return,no-unused-vars
	render(renderer) {
		throw Error("[AbstractInput/render] Must be overridden");
	}
}
