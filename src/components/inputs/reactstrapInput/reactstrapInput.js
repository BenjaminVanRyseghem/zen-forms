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
	let dataId = rest["data-id"];
	delete rest["data-id"];
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

	return (
		<FormGroup check className={`reactstrapRadio radio ${groupClassName}`} data-id={dataId} inline={inline}>
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

	if (type === "checkbox" || type === "radio") {
		return (
			<FormGroup check className={`reactstrapInput ${type} ${groupClassName}`} data-type={type}>
				{rest.label && <Label check className={required ? "required" : ""}>
					<Input {...inputProps} checked={inputProps.value} required={required}/>
					{rest.label}
				</Label>}
				{touched[field.name] && errors[field.name]
					? <FormFeedback>{errors[field.name]}</FormFeedback>
					: ""}
			</FormGroup>
		);
	}

	return (
		<FormGroup className={`reactstrapInput ${type} ${groupClassName}`} data-type={type}>
			{rest.label && <Label className={required ? "required" : ""}>{rest.label}</Label>}
			<Input {...inputProps} required={required}/>
			{touched[field.name] && errors[field.name]
				? <FormFeedback>{errors[field.name]}</FormFeedback>
				: ""}
		</FormGroup>
	);
}
