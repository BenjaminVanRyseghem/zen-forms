import { FormFeedback, FormGroup, Input, Label } from "reactstrap";
import isRequired from "../../../helpers/isRequired";
import React from "react";

export function ReactstrapRadio(ref) {
	let {
		field,
		form,
		groupClassName = "",
		validationSchema,
		inline,
		...rest
	} = ref;
	let { touched, errors } = form;
	let required = isRequired(field.name, validationSchema);
	let inputProps = Object.assign(
		{},
		rest,
		field,
		{
			invalid: Boolean(touched[field.name] && errors[field.name])
		}
	);

	let { type = "text" } = inputProps;

	return (
		<FormGroup check className={`reactstrapRadio ${type} ${groupClassName}`} inline={inline}>
			<Label check className={required ? "required" : ""}>
				<Input {...inputProps} required={required}/>
				{rest.label}
			</Label>
			{touched[field.name] && errors[field.name]
				? <FormFeedback>{errors[field.name]}</FormFeedback>
				: ""}
		</FormGroup>
	);
}

export default function ReactstrapInput(ref) {
	let {
		field,
		form,
		groupClassName = "",
		validationSchema,
		...rest
	} = ref;
	let { touched, errors } = form;
	let required = isRequired(field.name, validationSchema);
	let inputProps = Object.assign(
		{},
		rest,
		field,
		{
			invalid: Boolean(touched[field.name] && errors[field.name])
		}
	);

	let { type = "text" } = inputProps;

	return (
		<FormGroup className={`reactstrapInput ${type} ${groupClassName}`}>
			{rest.label && <Label className={required ? "required" : ""}>{rest.label}</Label>}
			<Input {...inputProps} required={required}/>
			{touched[field.name] && errors[field.name]
				? <FormFeedback>{errors[field.name]}</FormFeedback>
				: ""}
		</FormGroup>
	);
}
