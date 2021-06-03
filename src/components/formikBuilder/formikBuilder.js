/* eslint max-lines: [2, 350] */

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
		initialValues: {},
		noSubmitButton: false,
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
		initialValues: PropTypes.object,
		inline: PropTypes.bool,
		noSubmitButton: PropTypes.bool,
		onChange: PropTypes.func,
		onSubmit: PropTypes.func,
		spec: PropTypes.array.isRequired,
		submitOnChange: PropTypes.bool,
		validationSchema: PropTypes.object
	};

	static register(plugin) {
		this.plugins = this.plugins || [];
		this.plugins.push(plugin);
		plugin.registerExtensions(this);
		return this;
	}

	constructor() {
		super(...arguments); // eslint-disable-line prefer-rest-params

		this.constructor.plugins = this.constructor.plugins || [];
		this.constructor.plugins.forEach((plugin) => {
			plugin.register(this);
		});
	}

	state = {};

	resolve(value, ...args) {
		if (typeof value === "function") {
			return value(...args);
		}

		return value;
	}

	cssClass() {
		return "formikBuilder";
	}

	buildElementId(first, ...others) {
		let result = `${first}`;
		others.forEach((each) => (result += `-${each}`));

		return result;
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
				<Field
					as="textarea"
					data-id={textArea.id()}
					id={this.buildElementId(formId, textArea.id())}
					name={textArea.id()}
				/>
				{
					this.props.validationSchema && errors[textArea.id()] && touched[textArea.id()]
						? <div>{errors[textArea.id()]}</div>
						: null
				}
			</>
		);
	}

	renderAsGroup(group, ...args) {
		let children = group.children()
			.map((child) => this.renderChild(child, ...args))
			.filter((each) => each);
		if (!children.length) {
			return null;
		}
		if (group.getLabel() && group.isBordered()) {
			return (
				<div key={group.baseId()} className="group bordered" data-id={group.baseId()} id={this.buildElementId(args[0].formId, group.id())}>
					<div className="label">{group.getLabel()}</div>
					{children}
				</div>
			);
		}

		if (!group.id()) {
			return children;
		}

		return (
			<div key={group.baseId()} data-id={group.baseId()} id={this.buildElementId(args[0].formId, group.id())}>
				{children}
			</div>
		);
	}

	renderAsRadioGroup(radioGroup, ...args) {
		return (
			<div
				key={radioGroup.id()}
				aria-labelledby={radioGroup.id()}
				className={this.resolve(radioGroup.isInlined(), ...args) ? "inline" : ""}
				data-id={radioGroup.id()}
				id={this.buildElementId(args[0].formId, radioGroup.id())}
				role="group"
			>
				{radioGroup.children().map((child) => this.renderChild(child, {
					...args,
					name: radioGroup.id(),
					inline: this.resolve(radioGroup.isInlined(), ...args)
				}))}
			</div>
		);
	}

	renderAsRadio(radio, { name, inline, formId }) {
		return (
			<label key={radio.id()} data-id={radio.id()}>
				<Field
					id={this.buildElementId(formId, radio.id())}
					inline={inline}
					name={name}
					type="radio"
					value={radio.id()}
				/>
				{radio.getLabel()}
			</label>
		);
	}

	renderAsDropdown(dropdown, options) {
		let { formId } = options;
		return (
			<Field
				key={dropdown.id()}
				as="select"
				data-id={dropdown.id()}
				id={this.buildElementId(formId, dropdown.id())}
				name={dropdown.id()}
			>
				{this.resolve(dropdown.options(), options).map(({ value, label }) => <option
					key={value}
					value={value}
				>
					{this.resolve(label, options)}
				</option>)}
			</Field>
		);
	}

	renderAsInput(input, options) {
		let { errors, formId, touched } = options;
		return (
			<>
				<Field
					key={input.id()}
					className={input.isCompact() ? "compact" : ""}
					data-id={input.id()}
					disabled={this.resolve(input.isDisabled(), options)}
					id={this.buildElementId(formId, input.id())}
					name={input.id()}
					placeholder={input.getPlaceholder()}
					onClick={input.getClickHandler()}
				/>
				{
					this.props.validationSchema && errors[input.id()] && touched[input.id()]
						? <div>{errors[input.id()]}</div>
						: null
				}
			</>
		);
	}

	renderChild(child, options) {
		if (child === null || child === undefined) {
			return null;
		}

		if (typeof child === "function") {
			return this.renderChildren(child(options), options);
		}

		if (React.isValidElement(child) || typeof child === "string") {
			return React.cloneElement(child, options);
		}

		if (child.constructor === Array) {
			return this.renderChildren(child, options);
		}

		return child.render(this, options);
	}

	renderChildren(children, options) {
		if (children === null) {
			return null;
		}

		if (children.constructor !== Array) {
			return this.renderChild(children, options);
		}

		return children.map((node) => this.renderChild(node, options));
	}

	renderSpec(children, options) {
		return this.renderChildren(children, options);
	}

	renderSubmit(formProps) {
		if (this.props.noSubmitButton || this.props.submitOnChange) {
			return null;
		}

		return (
			<button disabled={formProps.isSubmitting} type="submit">Soumettre</button>
		);
	}

	renderContent(formProps) {
		return React.createElement(
			this.props.component || Form,
			{
				className: this.props.formClassName,
				id: this.props.formId
			},
			this.renderSpec(this.props.spec, formProps),
			this.renderSubmit(formProps)
		);
	}

	isDirty() {
		return this.formikProps.dirty;
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
						this.formikProps = formikProps;
						let formProps = this.buildFormikProps(formikProps);

						((fn) => {
							formikProps.getFieldProps = (...args) => {
								let props = fn(...args);
								((innerFn) => {
									props.onChange = (...innerArgs) => {
										let [{ _targetInst, target }] = innerArgs;
										if (_targetInst) {
											let { transform } = _targetInst.pendingProps;
											if (transform) {
												target.value = transform(target.value, formProps, ...args);
											}
										}
										innerFn(...innerArgs);
										if (this.props.onChange) {
											this.props.onChange(...innerArgs);
										}
										if (this.props.submitOnChange) {
											formikProps.handleSubmit();
										}
									};
								})(props.onChange);

								return props;
							};
						})(formikProps.getFieldProps);

						return this.renderContent(formProps);
					}}
				</Formik>
			</div>
		);
	}
}
