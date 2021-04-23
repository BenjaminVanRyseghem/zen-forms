export default function isRequired(name, validationSchema) {
	if (!validationSchema) {
		return false;
	}

	let isValidated = validationSchema.fields[name];

	return isValidated && validationSchema.fields[name].tests.some((test) => test.OPTIONS.name === "required");
}
