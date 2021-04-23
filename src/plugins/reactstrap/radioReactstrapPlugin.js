/* eslint-disable no-invalid-this */
import { ReactstrapRadio, ReactstrapRadioGroup } from "../../components/inputs/reactstrapInput/reactstrapInput";
import AbstractPlugin from "../../models/abstractPlugin";
import { Field } from "formik";
import objectPath from "object-path";
import React from "react";

export default class RadioReactstrapPlugin extends AbstractPlugin {
	register(_this) {
		super.register(_this);

		this.registerFunction(_this, "renderAsRadioGroup", function renderAsRadioGroup(radioGroup, options) {
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
		});

		this.registerFunction(_this, "renderAsRadio", function renderAsRadio(radio, options) {
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
		});
	}
}
