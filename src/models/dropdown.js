import AbstractInput from "./abstractInput";

export default class Dropdown extends AbstractInput {
	constructor() {
		super(...arguments); // eslint-disable-line prefer-rest-params

		this._values = [];
		this._multiple = false;
	}

	multiple() {
		this._multiple = true;
		return this;
	}

	isMultiple() {
		return this._multiple;
	}

	value(key, label, conditionFn = () => true) {
		this._values.push({
			key,
			label,
			conditionFn
		});

		return this;
	}

	values() {
		return this._values;
	}

	renderContent(renderer, ...args) {
		return renderer.renderAsDropdown(this, ...args);
	}
}
