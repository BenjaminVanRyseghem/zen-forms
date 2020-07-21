import AbstractInput from "./abstractInput";

export default class TextArea extends AbstractInput {
	renderContent(renderer, ...args) {
		return renderer.renderAsTextArea(this, ...args);
	}
}
