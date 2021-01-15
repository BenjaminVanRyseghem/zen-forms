import ReactstrapInput, { ReactstrapRadio, ReactstrapRadioGroup } from "../inputs/reactstrapInput/reactstrapInput";
import { Button } from "reactstrap";
import { Field } from "formik";
import FormikBuilder from "../formikBuilder/formikBuilder";
import objectPath from "object-path";
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

	renderAsRadioGroup(radioGroup, options) {
		let { formId, readOnly, values } = options;

		let inline = this.resolve(radioGroup.isInlined(), options);

		let children = radioGroup.children();

		if (readOnly && !objectPath.get(values, radioGroup.id())) {
			return null;
		}

		return (
			<Field
				key={radioGroup.id()}
				component={ReactstrapRadioGroup}
				data-id={radioGroup.id()}
				id={this.buildElementId(formId, radioGroup.id())}
				label={` ${this.resolve(radioGroup.getLabel(), options)}`}
				name={radioGroup.id()}
				radios={children}
				readOnly={readOnly}
				renderRadio={(child) => child.render(this, {
					...options,
					name: radioGroup.id(),
					inline
				})}
				validationSchema={options.validationSchema}
				value={objectPath.get(values, radioGroup.id())}
			/>
		);
	}

	renderAsRadio(radio, options) {
		let { formId, name, inline, readOnly } = options;

		return (
			<Field
				key={radio.id()}
				component={ReactstrapRadio}
				data-id={radio.id()}
				groupName={name}
				id={this.buildElementId(formId, name, radio.id())}
				inline={inline}
				label={` ${this.resolve(radio.getLabel(), options)}`}
				name={name}
				readOnly={readOnly}
				value={radio.id()}
			/>
		);
	}

	renderAsDropdown(dropdown, options) {
		let { formId, validationSchema, values, setFieldValue, readOnly } = options;
		let children = this.resolve(dropdown.options(), options);
		let id = dropdown.id();

		if (readOnly && undefined === objectPath.get(values, dropdown.id())) {
			return null;
		}

		return (
			<Field
				key={id}
				component={ReactstrapInput}
				data-id={id}
				id={this.buildElementId(formId, id)}
				label={this.resolve(dropdown.getLabel(), options)}
				multiple={this.resolve(dropdown.isMultiple(), options)}
				name={id}
				readOnly={readOnly}
				type="select"
				validationSchema={validationSchema}
			>
				{children.map(({ value, label, conditionFn = () => true }) => {
					if (!conditionFn(options)) {
						if (value === values[id] && children[0].value !== value) {
							setFieldValue(id, children[0].value);
						}
						return null;
					}

					return <option key={value} value={value}>{this.resolve(label, options)}</option>;
				})}
			</Field>
		);
	}

	renderAsInput(input, options) {
		let { formId, validationSchema, readOnly, values } = options;
		let addMinMax = input.type() === "date" || input.type() === "number";

		if (readOnly && !values[input.baseId()] && undefined === objectPath.get(values, input.id())) {
			return null;
		}

		return (
			<Field
				key={input.id()}
				compact={this.resolve(input.isCompact(), options)}
				component={ReactstrapInput}
				data-id={input.id()}
				disabled={this.resolve(input.isDisabled(), options)}
				formIsReadOnly={readOnly}
				format={input.format()}
				helper={input.getHelper()}
				id={this.buildElementId(formId, input.id())}
				label={this.resolve(input.getLabel(), options)}
				max={addMinMax ? input.max() : undefined}
				min={addMinMax ? input.min() : undefined}
				multiple={this.resolve(input.isMultiple(), options)}
				name={input.id()}
				placeholder={this.resolve(input.getPlaceholder(), options)}
				readOnly={readOnly || this.resolve(input.isReadOnly(), options)}
				step={this.resolve(input.getStep(), options)}
				transform={input.transform()}
				type={this.resolve(input.type(), options)}
				validationSchema={validationSchema}
				onClick={input.getClickHandler()}
			/>
		);
	}

	renderAsTextArea(textArea, options) {
		let { formId, validationSchema, readOnly, values } = options;

		if (readOnly && undefined === objectPath.get(values, textArea.id())) {
			return null;
		}

		return (
			<Field
				key={textArea.id()}
				component={ReactstrapInput}
				data-id={textArea.id()}
				id={this.buildElementId(formId, textArea.id())}
				label={this.resolve(textArea.getLabel(), options)}
				name={textArea.id()}
				placeholder={this.resolve(textArea.placeholder(), options)}
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
			...super.buildFormikProps(formikProps),
			validationSchema: this.props.readOnly ? undefined : this.props.validationSchema
		};
	}

	renderSubmit(formProps) {
		if (this.props.readOnly) {
			return null;
		}

		let { submitProps = {} } = formProps;

		return (
			<Button color="primary" disabled={formProps.isSubmitting} type="submit" {...submitProps}>Soumettre</Button>
		);
	}
}
