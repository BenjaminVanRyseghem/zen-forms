import AbstractInput from "./abstractInput";

export default class Dropdown extends AbstractInput {
	constructor() {
		super(...arguments); // eslint-disable-line prefer-rest-params

		this._options = [];
		this._multiple = false;
	}

	multiple() {
		this._multiple = true;
		return this;
	}

	isMultiple() {
		return this._multiple;
	}

	option(key, label, conditionFn = () => true) {
		this._options.push({
			key,
			label,
			conditionFn
		});

		return this;
	}

	options() {
		return this._options;
	}

	renderContent(renderer, ...args) {
		return renderer.renderAsDropdown(this, ...args);
	}
}
