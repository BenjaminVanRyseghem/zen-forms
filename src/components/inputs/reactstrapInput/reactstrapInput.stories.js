import { action } from "@storybook/addon-actions";
import React from "react";
import ReactstrapInput from "./reactstrapInput";

const field = {
	name: "test"
};

const form = {
	errors: {},
	touched: {}
};

export default {
	component: ReactstrapInput,
	title: "Components/ReactstrapInput"
};

export const shows = () => <ReactstrapInput
	field={field}
	form={form}
	label="Test input"
	onChange={action("onChange")}
/>;
