import React from 'react';

function createFormState(...controls) {
	return controls.reduce((form, controlName) => {
  	form[controlName] = {
    	value: "", 
      validity: {}, 
      validationMessage: "", 
      dirty: false 
    };
    
    return form;
  }, {});
}

class ExampleForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      exampleForm: createFormState("name", "phone")
    };
    
    this.handleFormInput = this.handleFormInput.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleFormInputFocusOut = this.handleFormInputFocusOut.bind(this);
    this.getValidationMessage = this.getValidationMessage.bind(this);
  }
  
  handleFormSubmit(event) {
  	event.preventDefault();
    
    console.log(event.target.checkValidity() ? "Form submitted!": "Form is not valid.");
  }
  
  handleFormInput(event) {
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
    validationMessage} = event.target;
    
    const {
    	exampleForm
    } = this.state;
    
    this.setState({ 
    	exampleForm: {
      	...exampleForm,
      	[name]: { value, validity, 
        	validationMessage: this.getValidationMessage(event), dirty: true }
     	}
    });
  }
  
  handleFormInputFocusOut(event) {
  	const {
    name, 
    value, 
    placeholder,
    valueAsNumber,
    required, 
    minLength, maxLength, 
    min, max, 
    validity, 
    validationMessage} = event.target;
    
  	const {
    	exampleForm
    } = this.state;
    
    if(exampleForm[event.target.name].dirty) { return; }
    
  	this.setState({ 
    	exampleForm: {
      	...exampleForm,
      	[name]: { 
        	...exampleForm[name], 
          dirty: true, 
          validationMessage: this.getValidationMessage(event) 
        }
     	}
    });
  }
  
  getValidationMessage(event) {
  	const {
    name, 
    value, 
    placeholder,
    valueAsNumber,
    required, 
    minLength, maxLength, 
    min, max, 
    validity, 
    validationMessage} = event.target;
    
    let message = "";
    
    if(validity.valid) {
    	message = "";
    } else if(validity.valueMissing) {
    	message = placeholder + " is required"
    } else if(validity.tooShort || validity.tooLong) {
    	message = placeholder + " must be " + minLength + " to " + maxLength
    } else if(validity.patternMismatch) {
    	message = placeholder + " is not valid"
    }
    
    /* event.target.setValidationMessage(message); */
    
    return message;
  }
  
  render() {
    return (
      <div className="form">
        <form name="example" noValidate onSubmit={this.handleFormSubmit}>
        <div className="form-control">
          <input type="text" name="name" 
            value={this.state.exampleForm.name.value} 
            placeholder="Name" minLength={3} maxLength={15} required 
            onChange={this.handleFormInput} 
            onBlur={this.handleFormInputFocusOut}></input>
          <span className="error-message">
             {this.state.exampleForm.name.validationMessage}
          </span>
        </div>
        <div className="form-control">
          <input type="tel" name="phone" 
            value={this.state.exampleForm.phone.value} 
            placeholder="Phone" pattern="(9|8|7)[0-9]{9}" required 
            onChange={this.handleFormInput} 
            onBlur={this.handleFormInputFocusOut}></input>
          <span className="error-message">
             {this.state.exampleForm.phone.validationMessage}
          </span>
        </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    )
  }
}
