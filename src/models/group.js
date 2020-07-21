import AbstractInput from "./abstractInput";

export default class Group extends AbstractInput {
	constructor(id, showFn = () => true) {
		if (typeof id === "function") {
			showFn = id; // eslint-disable-line no-param-reassign
			id = null; // eslint-disable-line no-param-reassign
		}

		super(id, showFn); // eslint-disable-line prefer-rest-params

		this._children = [];
	}

	child(...child) {
		this._children.push(...child);
		return this;
	}

	children() {
		return this._children;
	}

	renderContent(renderer, ...args) {
		return renderer.renderAsGroup(this, ...args);
	}
}
