import { FormFeedback, FormGroup, Input, Label } from "reactstrap";
import isRequired from "../../../helpers/isRequired";
import objectPath from "object-path";
import React from "react";

export function ReactstrapRadio(ref) {
	let {
		field,
		form,
		groupClassName = "",
		validationSchema,
		inline,
		value,
		groupName,
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
		<FormGroup check className={`reactstrapRadio radio ${groupClassName} ${inputProps.readOnly ? "read-only" : ""}`} data-id={dataId} inline={inline}>
			<Label check className={required ? "required" : ""}>
				{!inputProps.readOnly && <Input
					{...inputProps}
					checked={objectPath.get(form.values, groupName) === value}
					disabled={inputProps.disabled || inputProps.readOnly}
					required={required}
					type="radio"
					value={value}
				/>}
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
		compact,
		format, // eslint-disable-line no-unused-vars
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

	if ((type === "checkbox" || type === "radio") && compact) {
		return (
			<FormGroup check className={`reactstrapInput compact ${type} ${groupClassName}`} data-type={type}>
				{rest.label && <Label check className={required ? "required" : ""}>
					<Input
						{...inputProps}
						checked={inputProps.value}
						disabled={inputProps.disabled || inputProps.readOnly}
						required={required}
					/>
					{rest.label}
				</Label>}
				{touched[field.name] && errors[field.name]
					? <FormFeedback>{errors[field.name]}</FormFeedback>
					: ""}
			</FormGroup>
		);
	}

	if ((type === "checkbox" || type === "radio" || type === "select") && inputProps.readOnly) {
		inputProps.disabled = true;
	}

	return (
		<FormGroup className={`reactstrapInput ${type} ${groupClassName}`} data-type={type}>
			{rest.label && <Label className={required ? "required" : ""}>{rest.label}</Label>}
			<Input
				{...inputProps}
				required={required}
				value={format ? format(inputProps.value, ref) : inputProps.value}
				onClick={inputProps.onClick
					? function onClick(event) { return inputProps.onClick(event, ref); }
					: undefined}
			/>
			{touched[field.name] && errors[field.name]
				? <FormFeedback>{errors[field.name]}</FormFeedback>
				: ""}
		</FormGroup>
	);
}
