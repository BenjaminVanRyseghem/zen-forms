import AbstractPlugin from "../models/abstractPlugin";
import { Button } from "reactstrap";
import Dropdown from "./reactstrap/dropdownReactstrapPlugin";
import Input from "./reactstrap/inputReactstrapPlugin";
import PropTypes from "prop-types";
import Radio from "./reactstrap/radioReactstrapPlugin";
import React from "react";
import TextArea from "./reactstrap/textAreaReactstrapPlugin";

/**
 * Plugin adding support for Reactstrap.
 */
export default class ReactstrapPlugin extends AbstractPlugin {
	registerExtensions(klass) {
		klass.defaultProps = {
			grid: {
				size: 8,
				type: "md"
			}
		};

		klass.propTypes = {
			...klass.propTypes,
			grid: PropTypes.shape({
				size: PropTypes.number,
				type: PropTypes.string
			}),
			readOnly: PropTypes.bool
		};
	}

	register(_this) {
		super.register(_this);

		new Dropdown().register(_this);
		new Input().register(_this);
		new Radio().register(_this);
		new TextArea().register(_this);

		this.registerFunction(_this, "cssClass", function cssClass() {
			return `formikReactstrapBuilder grid-type-${this.props.grid.type} grid-size-${this.props.grid.size}`; // eslint-disable-line no-invalid-this
		});

		this.registerFunction(_this, "buildFormikProps", function buildFormikProps(formikProps, _super) {
			return {
				readOnly: this.props.readOnly, // eslint-disable-line no-invalid-this
				..._super.buildFormikProps(formikProps),
				validationSchema: this.props.readOnly ? undefined : this.props.validationSchema // eslint-disable-line no-invalid-this
			};
		});

		this.registerFunction(_this, "renderSubmit", function renderSubmit(formProps) {
			if (this.props.readOnly || this.props.noSubmitButton || this.props.submitOnChange) { // eslint-disable-line no-invalid-this
				return null;
			}

			let { submitProps = {} } = formProps;

			return (
				<Button color="primary" disabled={formProps.isSubmitting} type="submit" {...submitProps}>Soumettre</Button>
			);
		});
	}
}

export {
	Dropdown,
	Input,
	Radio,
	TextArea
};
