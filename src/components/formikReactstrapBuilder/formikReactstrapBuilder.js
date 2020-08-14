import { Button, FormGroup } from "reactstrap";
import ReactstrapInput, { ReactstrapRadio } from "../inputs/reactstrapInput/reactstrapInput";
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

	renderAsRadioGroup(radioGroup, options, ...args) {
		let inline = radioGroup.isInlined();

		if (options.readOnly) {
			let value = objectPath.get(options.values, radioGroup.id());
			let selected = radioGroup.children().find((child) => child.id() === value);
			if (!selected) {
				selected = radioGroup.children().find((child) => undefined !== objectPath.get(options.values, child.id()));
			}

			if (!selected) {
				return null;
			}

			return (
				<FormGroup
					key={radioGroup.id()}
					row
					className="radio-group"
					data-id={radioGroup.id()}
					id={this.buildElementId(options.formId, radioGroup.id())}
					tag="fieldset"
				>
					{radioGroup.label() && <div className="col-form-label">{radioGroup.label()}</div>}
					<div className="radio-group-content">
						{selected && selected.render(this, {
							...options,
							name: radioGroup.id(),
							inline
						}, ...args)}
					</div>
				</FormGroup>
			);
		}

		return (
			<FormGroup
				key={radioGroup.id()}
				row
				className="radio-group"
				data-id={radioGroup.id()}
				id={this.buildElementId(options.formId, radioGroup.id())}
				tag="fieldset"
			>
				{radioGroup.label() && <div className="col-form-label">{radioGroup.label()}</div>}
				<div className="radio-group-content">
					{radioGroup.children().map((child) => child.render(this, {
						...options,
						name: radioGroup.id(),
						inline
					}, ...args))}
				</div>
			</FormGroup>
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
				label={` ${this.resolve(radio.label(), options)}`}
				name={name}
				readOnly={readOnly}
				value={radio.id()}
			/>
		);
	}

	renderAsDropdown(dropdown, options) {
		let { formId, validationSchema, values, setFieldValue, readOnly } = options;
		let children = dropdown.options();
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
				label={this.resolve(dropdown.label(), options)}
				multiple={this.resolve(dropdown.isMultiple(), options)}
				name={id}
				readOnly={readOnly}
				type="select"
				validationSchema={validationSchema}
			>
				{children.map(({ key, label, conditionFn }) => {
					if (!conditionFn(options)) {
						if (key === values[id] && children[0].key !== key) {
							setFieldValue(id, children[0].key);
						}
						return null;
					}

					return <option key={key} value={key}>{this.resolve(label, options)}</option>;
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
				id={this.buildElementId(formId, input.id())}
				label={this.resolve(input.label(), options)}
				max={addMinMax ? input.max() : undefined}
				min={addMinMax ? input.min() : undefined}
				multiple={this.resolve(input.isMultiple(), options)}
				name={input.id()}
				placeholder={this.resolve(input.getPlaceholder(), options)}
				readOnly={readOnly || input.isReadOnly()(options)}
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
				label={this.resolve(textArea.label(), options)}
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
