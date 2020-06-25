# zen-forms

A React library to build forms with optional validation, in a declarative way.

The main goal is to be able to define the form content once and for all, and use
it for viewing an entity as well as editing it.

It also aims to a strict separation between form's content, form's validation and form's UI.

It's build on top of [formik](https://github.com/formik/formik), [reactstrap-formik](https://github.com/shoaibkhan94/reactstrap-formik), and [yup](https://github.com/jquense/yup).

## Example

```js
const spec = [
    new Input("name")
        .label("Name"),
    new Input("age")
        .number()
        .label("Age"),
    new Dropdown("job", (values) => values.age > 18)
		.label("What's your job")
		.value("fireman", "Fireman")
		.value("cop", "Cop")
]

const validation = Yup.object().shape({
                   	name: Yup.string().required("Required"),
                   	age: Yup
                   		.number()
                   		.positive()
                   		.integer()
                   		.required("Required")
                   });

// ...

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
    return (
        <FormikReactstrapBuilder
        		inline
                readOnly
        		initialValues={person}
        		spec={spec}
        	/>
    );
}
``` 

## Custom Input

By subclassing `AbstractInput`, you can easily create your own custom input.

```js
export default class GroupedInput extends AbstractInput {
	constructor() {
		super(...arguments); // eslint-disable-line prefer-rest-params

		this._children = [];
	}

	child(input) {
		this._children.push(input);
		return this;
	}

	children() {
		return this._children;
	}

	render(renderer, ...args) {
		return renderer.renderAsGroupedInput(this, ...args);
	}
}

class MyFormBuilder extends FormikReactstrapBuilder {
    renderAsGroupedInput(groupedInput, ...args) {
    		let [{ validationSchema, values }] = args;
    
    		if (!groupedInput.shouldShow(values)) {
    			return null;
    		}
    
    		let required = groupedInput.children().some((child) => isRequired(child.id(), validationSchema));
    		let id = groupedInput.id();
    
    		return (
    			<FormGroup className="reactstrapGroupedInput grouped-input" id={id}>
    				<Label className={required ? "required" : ""}>{groupedInput.label()}</Label>
    				<div className="content">
    					<div className="flex-container">
    						{groupedInput.children().map((child) => child.render(this, ...args))}
    					</div>
    				</div>
    			</FormGroup>
    		);
    	}
}
```

## License

Copyright (c) 2020 Benjamin Van Ryseghem

---
Distributed under the MIT license. If you want to know more, see the [LICENSE.md](./LICENSE.md) file.
