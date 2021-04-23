import AbstractInput from "./abstractInput";

export class Radio extends AbstractInput {
	renderContent(renderer, ...args) {
		return renderer.renderAsRadio(this, ...args);
	}
}

export default class RadioGroup extends AbstractInput {
	constructor() {
		super(...arguments); // eslint-disable-line prefer-rest-params

		this._children = [];
		this._inline = false;
	}

	inline() {
		this._inline = true;
		return this;
	}

	isInlined() {
		return this._inline;
	}

	radio(...radio) {
		this._children.push(...radio);
		return this;
	}

	children() {
		return this._children;
	}

	renderContent(renderer, ...args) {
		return renderer.renderAsRadioGroup(this, ...args);
	}
}
