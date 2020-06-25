import AbstractInput from "./abstractInput";

export default class TextArea extends AbstractInput {
	render(renderer, ...args) {
		return renderer.renderAsTextArea(this, ...args);
	}
}
