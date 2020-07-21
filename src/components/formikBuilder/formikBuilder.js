import "./formikBuilder.scss";
import { Field, Form, Formik } from "formik";
import PropTypes from "prop-types";
import React from "react";

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

	buildFormikProps(formikProps) {
		let {
			additionalData, // eslint-disable-line no-unused-vars
			formClassName, // eslint-disable-line no-unused-vars
			initialValues, // eslint-disable-line no-unused-vars
			inline, // eslint-disable-line no-unused-vars
			onSubmit, // eslint-disable-line no-unused-vars
			spec, // eslint-disable-line no-unused-vars
			validationSchema, // eslint-disable-line no-unused-vars
			...rest
		} = this.props;
		return {
			...formikProps,
			validationSchema: this.props.validationSchema,
			additionalData: this.props.additionalData,
			builder: this,
			...rest
		};
	}

	renderAsTextArea(textArea, { errors, touched }) {
		return (
			<>
				<Field as="textarea" id={textArea.id()} name={textArea.id()}/>
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
			<div id={group.id()}>
				{group.children().map((child) => child.render(this, ...args))}
			</div>
		);
	}

	renderAsRadioGroup(radioGroup, ...args) {
		return (
			<div aria-labelledby={radioGroup.id()} className={radioGroup.isInlined() ? "inline" : ""} role="group">
				{radioGroup.children().map((child) => child.render(this, {
					...args,
					name: radioGroup.id(),
					inline: radioGroup.isInlined()
				}))}
			</div>
		);
	}

	renderAsRadio(radio, { name, inline }) {
		return (
			<label key={radio.id()}>
				<Field id={radio.id()} inline={inline} name={name} type="radio" value={radio.id()}/>
				{radio.label()}
			</label>
		);
	}

	renderAsDropdown(dropdown) {
		return (
			<Field as="select" id={dropdown.id()} name={dropdown.id()}>
				{dropdown.values().map(({ key, label }) => <option key={key} value={key}>{label}</option>)}
			</Field>
		);
	}

	renderAsInput(input, { errors, touched }) {
		return (
			<>
				<Field id={input.id()} name={input.id()} placeholder={input.getPlaceholder()}/>
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
							{ className: this.props.formClassName },
							this.renderChildren(formProps),
							!this.props.submitOnChange && this.renderSubmit(formProps)
						);
					}}
				</Formik>
			</div>
		);
	}
}
