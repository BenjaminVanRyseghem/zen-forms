import AbstractInput from "./abstractInput";

const types = "button checkbox color date datetime email file hidden image month number password radio range reset search submit tel text time url week".split(" ");

export default class Input extends AbstractInput {
	constructor() {
		super(...arguments); // eslint-disable-line prefer-rest-params

		this._type = "text";
		this._min = undefined;
		this._max = undefined;
		this._multiple = false;
		this._placeholder = undefined;
		this._compact = false;
		this._step = 1;
	}

	step(number) {
		this._step = number;
		return this;
	}

	getStep() {
		return this._step;
	}

	type() {
		return this._type;
	}

	placeholder(string) {
		this._placeholder = string;
		return this;
	}

	getPlaceholder() {
		return this._placeholder;
	}

	compact() {
		this._compact = true;
		return this;
	}

	isCompact() {
		return this._compact;
	}

	min(min) {
		if (min === undefined) {
			return this._min;
		}

		this._min = min;
		return this;
	}

	max(max) {
		if (max === undefined) {
			return this._max;
		}

		this._max = max;
		return this;
	}

	multiple() {
		this._multiple = true;
		return this;
	}

	isMultiple() {
		return this._multiple;
	}

	renderContent(renderer, ...args) {
		return renderer.renderAsInput(this, ...args);
	}
}

types.forEach((type) => {
	Input.prototype[type] = function() { // eslint-disable-line func-names
		this._type = type;
		return this;
	};
});
