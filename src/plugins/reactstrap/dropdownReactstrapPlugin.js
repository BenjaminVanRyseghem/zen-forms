/* eslint-disable no-invalid-this */
import AbstractPlugin from "../../models/abstractPlugin";
import { Field } from "formik";
import objectPath from "object-path";
import React from "react";
import ReactstrapInput from "../../components/inputs/reactstrapInput/reactstrapInput";

/**
 * TODO: Write jsdoc
 * @class
 */
export default class DropdownReactstrapPlugin extends AbstractPlugin {
	register(_this) {
		super.register(_this);

		this.registerFunction(_this, "renderAsDropdown", function renderAsDropdown(dropdown, options) {
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
		});
	}
}
