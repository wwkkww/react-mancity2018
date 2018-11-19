import React, { Component } from 'react';
import Fade from 'react-reveal/Fade';
import FormFields from '../../ui/FormFields';
import {Validate} from '../../ui/Validate';

class Enroll extends Component {
    state= {
        formError: false,
        formSuccess: '',
        formData: {
            email: {
                element: 'input',
                value: '',
                config: {
                    name: 'email_input',
                    type: 'email',
                    placeholder: 'Enter your email'
                },
                validation: {
                    required: true,
                    email: true
                },
                valid: false,
                validationMessage: ''
            }
        }
    };

    submitForm(e){
        e.preventDefault();
        let dataSubmit = {};
        let validForm = true; 

        for(let key in this.state.formData) {
            dataSubmit[key] = this.state.formData[key].value;
            validForm = this.state.formData[key].valid && validForm;
        }

        if(validForm){
            console.log(dataSubmit);
            this.resetFormSuccess();
        } else {
            this.setState({
                formError: true
            })
        }
    }

    updateForm(e){
        // console.log(e.event.target.value);
        const newFormData = {...this.state.formData};
        const newElement = {...newFormData[e.id]};

        newElement.value = e.event.target.value;
        let isValid = Validate(newElement);
        newElement.valid = isValid[0];
        newElement.validationMessage = isValid[1];
        // console.log(isValid);

        newFormData[e.id] = newElement;
        console.log(newFormData);
        this.setState({
            formData: newFormData,
            formError: false
        })
    };

    resetFormSuccess(){
        const newFormData = {...this.state.formData};

        for (let key in newFormData) {
            newFormData[key].value = '';
            newFormData[key].valid = false;
            newFormData[key].validationMessage = '';
        };

        this.setState({
            formError: false,
            forData: newFormData,
            formSuccess: "Thank you for enroll"
        });
        this.clearSuccessMessage();
    };

    clearSuccessMessage(){
        setTimeout(()=> {
            this.setState({
                formSuccess: ''
            })
        }, 1500);
    };

    render() {
        return (
            <Fade>
                <div className='enroll_wrapper'>
                    <form onSubmit={(e)=>this.submitForm(e)}>
                        <div className="enroll_title">
                            Enter your email:
                        </div>
                        <div className="enroll_input">
                            <FormFields 
                                id={'email'}
                                formData={this.state.formData.email}
                                change={(e) => this.updateForm(e)}
                            />
                            {this.state.formError ? 
                                <div className="error_label">Failed to enroll</div> : null
                            }
                            <div className="success_label">{this.state.formSuccess}</div>
                            <button onClick={(e)=>this.submitForm(e)}>Enroll</button>
                        </div>
                    </form>
                </div>
            </Fade>
        );
    }
}

export default Enroll;