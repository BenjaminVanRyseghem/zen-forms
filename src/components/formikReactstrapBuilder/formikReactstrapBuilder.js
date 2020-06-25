import { Button } from "reactstrap";
import { Field } from "formik";
import FormikBuilder from "../formikBuilder/formikBuilder";
import PropTypes from "prop-types";
import React from "react";
import ReactstrapInput from "../inputs/reactstrapInput/reactstrapInput";

export default class FormikReactstrapBuilder extends FormikBuilder {
	static propTypes = {
		...FormikBuilder.propTypes,
		readOnly: PropTypes.bool
	};

	renderAsDropdown(dropdown, { validationSchema, values, setFieldValue, readOnly }) {
		if (!dropdown.shouldShow(values)) {
			return null;
		}

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

	renderAsInput(input, { validationSchema, values, readOnly }) {
		if (!input.shouldShow(values)) {
			return null;
		}

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
				readOnly={readOnly}
				type={input.type()}
				validationSchema={validationSchema}
			/>
		);
	}

	renderAsTextArea(textArea, { validationSchema, values, readOnly }) {
		if (!textArea.shouldShow(values)) {
			return null;
		}

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
		return "formikReactstrapBuilder";
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
