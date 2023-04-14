import * as Yup from "yup";
import { Dropdown, Input } from "./models/index.js";
import FormikReactstrapBuilder from "./components/formikReactstrapBuilder/formikReactstrapBuilder.js";
import React from "react";

export default {
	component: FormikReactstrapBuilder,
	title: "Example"
};

const spec = [
	new Input("name").label("Name"),
	new Input("age").number()
		.label("Age"),
	new Dropdown("job", ({ values }) => values.age > 18)
		.label("What's your job")
		.option("fireman", "Fireman")
		.option("cop", "Cop")
];

const personData = {
	name: "Benjamin Van Ryseghem",
	age: 35,
	job: "fireman"
};

const validation = Yup.object().shape({
	age: Yup.number().positive()
		.integer()
		.required("Required"),
	name: Yup.string().required("Required")
});

function CreateAPersonForm() {
	return (
		<FormikReactstrapBuilder
			inline
			initialValues={{
				name: "",
				age: 12
			}}
			spec={spec}
			validationSchema={validation}
			onSubmit={(values, { setSubmitting }) => {
				alert(JSON.stringify(values, null, 2));
				setTimeout(() => {
					setSubmitting(false);
				}, 1000);
			}}
		/>
	);
}

function ViewAPersonForm({ person }) {
	return <FormikReactstrapBuilder inline readOnly initialValues={person} spec={spec}/>;
}

export const create = () => <CreateAPersonForm/>;
export const show = {
	render: ({ person }) => <ViewAPersonForm person={person}/>,
	args: {
		person: personData
	}
};
