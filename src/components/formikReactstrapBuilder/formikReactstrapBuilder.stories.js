import * as Yup from "yup";
import FormikReactstrapBuilder from "./formikReactstrapBuilder";
import { Input } from "../../models/index";
import React from "react";

export default {
	component: FormikReactstrapBuilder,
	title: "Components/FormikReactstrapBuilder"
};

const spec = [
	new Input("contract")
		.label("Numéro du bon de commande")
];

export const shows = () => <FormikReactstrapBuilder
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
