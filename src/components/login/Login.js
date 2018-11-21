import React, { Component } from 'react';
import FormFields from '../ui/FormFields';
import { Validate } from '../ui/Validate';
import { firebase } from '../../firebase';
import 'firebase/auth';

class Login extends Component {

    state = {
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
            },
            password: {
                element: 'input',
                value: '',
                config: {
                    name: 'password_input',
                    type: 'password',
                    placeholder: 'Enter your password'
                },
                validation: {
                    required: true
                },
                valid: false,
                validationMessage: ''
            }
        }
    };

    submitForm(e) {
        e.preventDefault();
        let dataSubmit = {};
        let validForm = true;
        // console.log('props',this.props);

        for (let key in this.state.formData) {
            dataSubmit[key] = this.state.formData[key].value;
            validForm = this.state.formData[key].valid && validForm;
        }

        if (validForm) {
            firebase.auth().signInWithEmailAndPassword(
                dataSubmit.email,
                dataSubmit.password
            ).then(() => {
                console.log('user is auth')
                this.props.history.push('/dashboard');
            }).catch((e)=> {
                this.setState({
                    formError: true
                });
                console.log(e.message);
            });
            console.log('dataSubmit', dataSubmit);
        } else {
            console.log('formError');
            this.setState({
                formError: true
            })
        }
    };

    updateForm(e) {
        // console.log(e.event.target.value);
        const newFormData = { ...this.state.formData };
        const newElement = { ...newFormData[e.id] };

        newElement.value = e.event.target.value;
        let isValid = Validate(newElement);
        newElement.valid = isValid[0];
        newElement.validationMessage = isValid[1];
        // console.log(isValid);

        newFormData[e.id] = newElement;
        //  console.log(newFormData);
        this.setState({
            formError: false,
            formData: newFormData
        })
    };

    render() {
        return (
            <div className="container">
                <div className="signin_wrapper" style={{ margin: '100px' }}>
                    <form onSubmit={(e) => this.submitForm(e)}>
                        <h2>Please Login</h2>
                        <FormFields
                            id={'email'}
                            formData={this.state.formData.email}
                            change={(e) => this.updateForm(e)}
                        />
                        <FormFields
                            id={'password'}
                            formData={this.state.formData.password}
                            change={(e) => this.updateForm(e)}
                        />

                        {this.state.formError ? 
                            <div className="error_label">Failed to log in. Please try again</div> : null
                        }
                        <button onClick={(e) => this.submitForm(e)}>Log In</button>

                    </form>
                </div>
            </div>
        );
    }
}

export default Login;