/* eslint-disable no-invalid-this */
import AbstractPlugin from "../../models/abstractPlugin";
import { Field } from "formik";
import objectPath from "object-path";
import React from "react";
import ReactstrapInput from "../../components/inputs/reactstrapInput/reactstrapInput";

export default class InputReactstrapPlugin extends AbstractPlugin {
	register(_this) {
		super.register(_this);

		this.registerFunction(_this, "renderAsInput", function renderAsInput(input, options) {
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
		});
	}
}
