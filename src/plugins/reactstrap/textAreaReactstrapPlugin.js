/* eslint-disable no-invalid-this */
import AbstractPlugin from "../../models/abstractPlugin";
import { Field } from "formik";
import objectPath from "object-path";
import React from "react";
import ReactstrapInput from "../../components/inputs/reactstrapInput/reactstrapInput";

export default class TextAreaReactstrapPlugin extends AbstractPlugin {
	register(_this) {
		super.register(_this);

		this.registerFunction(_this, "renderAsTextArea", function renderAsTextArea(textArea, options) {
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
		});
	}
}
