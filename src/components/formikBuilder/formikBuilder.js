import "./formikBuilder.scss";
import { Field, Form, Formik } from "formik";
import PropTypes from "prop-types";
import React from "react";

export default class FormikBuilder extends React.Component {
	static defaultProps = {
		additionalData: {},
		formClassName: "",
		inline: false,
		onSubmit: () => {}
	};

	static propTypes = {
		additionalData: PropTypes.object,
		formClassName: PropTypes.string,
		initialValues: PropTypes.object.isRequired,
		inline: PropTypes.bool,
		onSubmit: PropTypes.func,
		spec: PropTypes.array.isRequired,
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
				<Field id={input.id()} name={input.id()}/>
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
						let formProps = this.buildFormikProps(formikProps);
						return (
							<Form className={this.props.formClassName}>
								{this.renderChildren(formProps)}
								{this.renderSubmit(formProps)}
							</Form>
						);
					}}
				</Formik>
			</div>
		);
	}
}
