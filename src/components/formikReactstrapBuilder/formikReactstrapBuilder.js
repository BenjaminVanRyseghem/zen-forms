import { Button, FormGroup } from "reactstrap";
import ReactstrapInput, { ReactstrapRadio } from "../inputs/reactstrapInput/reactstrapInput";
import { Field } from "formik";
import FormikBuilder from "../formikBuilder/formikBuilder";
import PropTypes from "prop-types";
import React from "react";

export default class FormikReactstrapBuilder extends FormikBuilder {
	static defaultProps = {
		grid: {
			size: 8,
			type: "md"
		}
	};

	static propTypes = {
		...FormikBuilder.propTypes,
		grid: PropTypes.shape({
			size: PropTypes.number,
			type: PropTypes.string
		}),
		readOnly: PropTypes.bool
	};

	renderAsRadioGroup(radioGroup, ...args) {
		let inline = radioGroup.isInlined();

		return (
			<FormGroup row className="radio-group" tag="fieldset">
				{radioGroup.label() && <div className="col-form-label">{radioGroup.label()}</div>}
				<div className="radio-group-content">
					{radioGroup.children().map((child) => child.render(this, {
						...args,
						name: radioGroup.id(),
						inline
					}))}
				</div>
			</FormGroup>
		);
	}

	renderAsRadio(radio, { name, inline }) {
		return (
			<Field
				component={ReactstrapRadio}
				id={radio.id()}
				inline={inline}
				label={` ${radio.label()}`}
				name={name}
				type="radio"
				value={radio.id()}
			/>
		);
	}

	renderAsDropdown(dropdown, { validationSchema, values, setFieldValue, readOnly }) {
		let children = dropdown.values();
		let id = dropdown.id();
		return (
			<Field
				key={id}
				component={ReactstrapInput}
				id={id}
				label={dropdown.label()}
				multiple={dropdown.isMultiple()}
				name={id}
				readOnly={readOnly}
				type="select"
				validationSchema={validationSchema}
			>
				{children.map(({ key, label, conditionFn }) => {
					if (!conditionFn(values)) {
						if (key === values[id] && children[0].key !== key) {
							setFieldValue(id, children[0].key);
						}
						return null;
					}

					return <option key={key} value={key}>{label}</option>;
				})}
			</Field>
		);
	}

	renderAsInput(input, { validationSchema, readOnly }) {
		let addMinMax = input.type() === "date" || input.type() === "number";

		return (
			<Field
				key={input.id()}
				component={ReactstrapInput}
				id={input.id()}
				label={input.label()}
				max={addMinMax ? input.max() : ""}
				min={addMinMax ? input.min() : ""}
				multiple={input.isMultiple()}
				name={input.id()}
				placeholder={input.getPlaceholder()}
				readOnly={readOnly}
				type={input.type()}
				validationSchema={validationSchema}
			/>
		);
	}

	renderAsTextArea(textArea, { validationSchema, readOnly }) {
		return (
			<Field
				key={textArea.id()}
				component={ReactstrapInput}
				id={textArea.id()}
				label={textArea.label()}
				name={textArea.id()}
				readOnly={readOnly}
				type="textarea"
				validationSchema={validationSchema}
			/>
		);
	}

	cssClass() {
		return `formikReactstrapBuilder grid-type-${this.props.grid.type || "md"} grid-size-${this.props.grid.size || 8}`;
	}

	buildFormikProps(formikProps) {
		return {
			readOnly: this.props.readOnly,
			...super.buildFormikProps(formikProps)
		};
	}

	renderSubmit(formProps) {
		if (this.props.readOnly) {
			return null;
		}

		let { submitProps = {} } = formProps;

		return (
			<Button disabled={formProps.isSubmitting} type="submit" {...submitProps}>Soumettre</Button>
		);
	}
}
