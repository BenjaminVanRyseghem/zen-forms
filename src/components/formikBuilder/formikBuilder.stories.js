import * as Yup from "yup";
import FormikBuilder from "./formikBuilder";
import { Input } from "../../models/index";
import React from "react";

export default {
	component: FormikBuilder,
	title: "Components/FormikBuilder"
};

const spec = [
	new Input("contract")
		.label("Numéro du bon de commande")
];

export const shows = () => <FormikBuilder
	initialValues={{
		email: "benjamin.vanryseghem@gmail.com"
	}}
	spec={spec}
	validationSchema={Yup.object().shape({
		email: Yup.string()
			.email("Invalid email")
			.required("Required")
	})}
/>;
