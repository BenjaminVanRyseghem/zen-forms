import AbstractInput from "./abstractInput";

export default class TextArea extends AbstractInput {
	constructor() {
		super(...arguments); // eslint-disable-line prefer-rest-params

		this._placeholder = null;
	}

	placeholder(placeholder) {
		if (placeholder === undefined) {
			return this._placeholder;
		}

		this._placeholder = placeholder;
		return this;
	}

	renderContent(renderer, ...args) {
		return renderer.renderAsTextArea(this, ...args);
	}
}
