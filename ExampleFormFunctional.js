import React from 'react';
import ReactDOM from 'react-dom';

function createFormState(form) {
    return Object.keys(form).reduce((formControls, controlName) => {
        formControls[controlName] = {
            value: form[controlName] || "",
            validity: {},
            validationMessage: "",
            dirty: false
        };

        return formControls;
    }, {});
}

function ExampleFormFunctional() {
    const [form, setForm] = React.useState(createFormState({ name: "", phone: "" }));

    const handleFormInput = event => {
        event.preventDefault();

        const {
            name,
            value,
            placeholder,
            valueAsNumber,
            required,
            minLength, maxLength,
            min, max,
            validity,
            validationMessage } = event.target;

        setForm({
            ...form,
            [name]: {
                value,
                validity,
                validationMessage: getValidationMessage(event),
                dirty: true
            }
        });
    }

    const getValidationMessage = event => {
        const {
            name,
            value,
            placeholder,
            valueAsNumber,
            required,
            minLength, maxLength,
            min, max,
            validity,
            validationMessage } = event.target;

        let message = "";

        if (validity.valid) {
            message = "";
        } else if (validity.valueMissing) {
            message = placeholder + " is required"
        } else if (validity.tooShort || validity.tooLong) {
            message = placeholder + " must be " + minLength + " to " + maxLength
        } else if (validity.patternMismatch) {
            message = placeholder + " is not valid"
        }

        /* event.target.setValidationMessage(message); */

        return message;
    }

    const handleFormInputBlur = event => {
        const {
            name,
            value,
            placeholder,
            valueAsNumber,
            required,
            minLength, maxLength,
            min, max,
            validity,
            validationMessage } = event.target;

        if (form[name].dirty) { return; }

        setForm({
            ...form,
            [name]: {
                ...form[name],
                validationMessage: getValidationMessage(event),
                dirty: true
            }
        });
    }

    const handleFormSubmit = event => {
        event.preventDefault();

        console.log(
            event.target.checkValidity() ?
                "Form submitted!" : "Form is not valid.");
    }

    return (
        <div className="form">
            <form name="example" noValidate onSubmit={handleFormSubmit}>
                <div className="form-control">
                    <input type="text" name="name"
                        value={form.name.value}
                        placeholder="Name" minLength={3} maxLength={15} required
                        onChange={handleFormInput}
                        onBlur={handleFormInputBlur}></input>
                    <span className="error-message">
                        {form.name.validationMessage}
                    </span>
                </div>
                <div className="form-control">
                    <input type="tel" name="phone"
                        value={form.phone.value}
                        placeholder="Phone" pattern="(9|8|7)[0-9]{9}" required
                        onChange={handleFormInput}
                        onBlur={handleFormInputBlur}></input>
                    <span className="error-message">
                        {form.phone.validationMessage}
                    </span>
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

ReactDOM.render(<ExampleFormFunctional />, document.querySelector("#app"));
