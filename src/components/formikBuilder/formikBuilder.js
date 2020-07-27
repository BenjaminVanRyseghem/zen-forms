import "./formikBuilder.scss";
import { Field, Form, Formik } from "formik";
import PropTypes from "prop-types";
import React from "react";

const nextId = (() => {
	let id = 0;
	return () => `zen-form-${id++}`;
})();

export default class FormikBuilder extends React.Component {
	static defaultProps = {
		additionalData: {},
		component: Form,
		formClassName: "",
		inline: false,
		onSubmit: () => {},
		submitOnChange: false
	};

	static propTypes = {
		additionalData: PropTypes.object,
		component: PropTypes.oneOfType([
			PropTypes.func,
			PropTypes.string
		]),
		formClassName: PropTypes.string,
		formId: PropTypes.string,
		initialValues: PropTypes.object.isRequired,
		inline: PropTypes.bool,
		onSubmit: PropTypes.func,
		spec: PropTypes.array.isRequired,
		submitOnChange: PropTypes.bool,
		validationSchema: PropTypes.object
	};

	state = {};

	cssClass() {
		return "formikBuilder";
	}

	buildElementId(formId, id) {
		return `${formId}-${id}`;
	}

	buildFormikProps(formikProps) {
		let {
			additionalData, // eslint-disable-line no-unused-vars
			formClassName, // eslint-disable-line no-unused-vars
			initialValues, // eslint-disable-line no-unused-vars
			inline, // eslint-disable-line no-unused-vars
			onSubmit, // eslint-disable-line no-unused-vars
			spec, // eslint-disable-line no-unused-vars
			validationSchema, // eslint-disable-line no-unused-vars
			formId,
			...rest
		} = this.props;
		return {
			...formikProps,
			validationSchema: this.props.validationSchema,
			additionalData: this.props.additionalData,
			builder: this,
			formId: formId || nextId(),
			...rest
		};
	}

	renderAsTextArea(textArea, { errors, touched, formId }) {
		return (
			<>
				<Field as="textarea" data-id={textArea.id()} id={this.buildElementId(formId, textArea.id())} name={textArea.id()}/>
				{
					this.props.validationSchema && errors[textArea.id()] && touched[textArea.id()]
						? <div>{errors[textArea.id()]}</div>
						: null
				}
			</>
		);
	}

	renderAsGroup(group, ...args) {
		if (!group.id()) {
			return group.children().map((child) => child.render(this, ...args));
		}

		return (
			<div key={group.id()} data-id={group.id()} id={this.buildElementId(args[0].formId, group.id())}>
				{group.children().map((child) => child.render(this, ...args))}
			</div>
		);
	}

	renderAsRadioGroup(radioGroup, ...args) {
		return (
			<div
				key={radioGroup.id()}
				aria-labelledby={radioGroup.id()}
				className={radioGroup.isInlined() ? "inline" : ""}
				data-id={radioGroup.id()}
				id={this.buildElementId(args[0].formId, radioGroup.id())}
				role="group"
			>
				{radioGroup.children().map((child) => child.render(this, {
					...args,
					name: radioGroup.id(),
					inline: radioGroup.isInlined()
				}))}
			</div>
		);
	}

	renderAsRadio(radio, { name, inline, formId }) {
		return (
			<label key={radio.id()} data-id={radio.id()}>
				<Field id={this.buildElementId(formId, radio.id())} inline={inline} name={name} type="radio" value={radio.id()}/>
				{radio.label()}
			</label>
		);
	}

	renderAsDropdown(dropdown, { formId }) {
		return (
			<Field key={dropdown.id()} as="select" data-id={dropdown.id()} id={this.buildElementId(formId, dropdown.id())} name={dropdown.id()}>
				{dropdown.values().map(({ key, label }) => <option key={key} value={key}>{label}</option>)}
			</Field>
		);
	}

	renderAsInput(input, { errors, formId, touched }) {
		return (
			<>
				<Field
					key={input.id()}
					data-id={input.id()}
					id={this.buildElementId(formId, input.id())}
					name={input.id()}
					placeholder={input.getPlaceholder()}
				/>
				{
					this.props.validationSchema && errors[input.id()] && touched[input.id()]
						? <div>{errors[input.id()]}</div>
						: null
				}
			</>
		);
	}

	renderChildren(formProps) {
		return this.props.spec.map((input) => input.render(this, formProps));
	}

	renderSubmit(formProps) {
		return (
			<button disabled={formProps.isSubmitting} type="submit">Soumettre</button>
		);
	}

	render() {
		return (
			<div className={`zen-form ${this.cssClass()} ${this.props.inline ? "inline" : ""}`}>
				<Formik
					initialValues={this.props.initialValues}
					validationSchema={this.props.validationSchema}
					onSubmit={this.props.onSubmit}
				>
					{(formikProps) => {
						if (this.props.submitOnChange) {
							((fn) => {
								formikProps.getFieldProps = (...args) => {
									let props = fn(...args);

									((innerFn) => {
										props.onChange = (...innerArgs) => {
											innerFn(...innerArgs);
											formikProps.handleSubmit();
										};
									})(props.onChange);

									return props;
								};
							})(formikProps.getFieldProps);
						}
						let formProps = this.buildFormikProps(formikProps);

						return React.createElement(
							this.props.component || Form,
							{
								className: this.props.formClassName,
								id: this.props.formId
							},
							this.renderChildren(formProps),
							!this.props.submitOnChange && this.renderSubmit(formProps)
						);
					}}
				</Formik>
			</div>
		);
	}
}
