import React, { Component } from 'react';
import DashboardLayout from '../../../hoc/DashboardLayout';
import FormFields from '../../ui/FormFields';
import { Validate } from '../../ui/Validate';
import CircularProgress from '@material-ui/core/CircularProgress';

import FirebaseUploader from '../../ui/FirebaseUploader';
import firebaseDB, { playersDB, firebase } from '../../../firebase';


class AddEditPlayers extends Component {
    state = {
        isLoading: true,
        playerID: '',
        formType: '',
        formError: false,
        formSuccess: '',
        defaultImg: '',
        formData: {
            name: {
                element: 'input',
                value: '',
                config: {
                    label: 'Player Name',
                    name: 'name_input',
                    type: 'text'
                },
                validation: {
                    required: true,
                },
                valid: false,
                validationMessage: '',
                showLabel: true
            },
            lastname: {
                element: 'input',
                value: '',
                config: {
                    label: 'Player Last Name',
                    name: 'lastname_input',
                    type: 'text'
                },
                validation: {
                    required: true,
                },
                valid: false,
                validationMessage: '',
                showLabel: true
            },
            number: {
                element: 'input',
                value: '',
                config: {
                    label: 'Player Number',
                    name: 'lnumber_input',
                    type: 'text'
                },
                validation: {
                    required: true,
                },
                valid: false,
                validationMessage: '',
                showLabel: true
            },
            position: {
                element: 'select',
                value: '',
                config: {
                    label: 'Select a position',
                    name: 'select_position',
                    type: 'select',
                    options: [
                        { key: "Keeper", value: "Keeper" },
                        { key: "Defender", value: "Defender" },
                        { key: "Midfielder", value: "Midfielder" },
                        { key: "Forward", value: "Forward" },
                    ]
                },
                validation: {
                    required: true,
                },
                valid: false,
                validationMessage: '',
                showLabel: true
            },
            image: {
                element: 'image',
                value: '',
                validation: {
                    required: true
                },
                valid: false
            }

        }
    };

    updateForm(e, content = '') {
        const newFormData = { ...this.state.formData };
        const newElement = { ...newFormData[e.id] };

        if (content === '') {
            //store value of user input/select
            newElement.value = e.event.target.value;
        } else {
            //store picture filename return from firebase
            newElement.value = content;
        }

        let isValid = Validate(newElement);
        newElement.valid = isValid[0];
        newElement.validationMessage = isValid[1];
        // console.log(isValid);

        newFormData[e.id] = newElement;
        this.setState({
            formData: newFormData,
            formError: false
        })
    };

    updateFields = (player, playerID, formType, defaultImg) => {
        const newFormData = { ...this.state.formData }
        for (let key in newFormData) {
            newFormData[key].value = player[key];
            newFormData[key].valid = true
        }

        this.setState({
            playerID,
            defaultImg,
            formType,
            formData: newFormData
        })
    }


    componentDidMount() {
        const playerID = this.props.match.params.id;
        if (!playerID) {
            //New Player
            this.setState({
                isLoading: false,
                formType: 'Add Player'
            })
        } else {
            //Edit Player
            firebaseDB.ref(`players/${playerID}`).once('value')
                .then((snapshot => {
                    console.log('snapshot', snapshot)
                    const playerData = snapshot.val();
                    console.log('playerData', playerData)
                    firebase.storage().ref('players').child(playerData.image).getDownloadURL()
                        .then((url) => {
                            this.updateFields(playerData, playerID, 'Edit Player', url);
                            this.setState({
                                isLoading: false
                            });
                        }).catch((e) => {
                            this.updateFields({
                                ...playerData,
                                image: ''
                            }, playerID, 'Edit Player', '');
                            this.setState({
                                isLoading: false
                            });
                        });
                }));

        }
    }

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
            if (this.state.formType === 'Edit Player') {
                //save EDIT PLAYER
                firebaseDB.ref(`players/${this.state.playerID}`).update(dataSubmit)
                    .then(() => {
                        this.successForm('Successfully update player')
                    })
            } else {
                //save ADD PLAYER
                playersDB.push(dataSubmit).then(() => {
                    this.props.history.push('/players')
                }).catch((e) => {
                    this.setState({
                        formError: true
                    })
                });
            }
            console.log(dataSubmit);
            //SUBMIT FORM
        } else {
            this.setState({
                formError: true
            })
        }
    };

    successForm(message) {
        this.setState({
            formSuccess: message
        });

        setTimeout(() => {
            this.setState({
                formSuccess: ''
            })
        }, 2000);
    };

    storeFileName = (filename) => {
        console.log('filename', filename);
        this.updateForm({ id: 'image' }, filename);
    }

    resetImage = () => {
        const newFormData = { ...this.state.formData };
        newFormData['image'].value = '';
        newFormData['image'].valid = false;
        this.setState({
            defaultImg: '',
            formData: newFormData
        })

    }


    render() {
        console.log('isLoading', this.state.isLoading)
        return (
            <DashboardLayout>
                <div className="editplayers_dialog_wrapper">
                    <h2>
                        {this.state.formType}
                    </h2>
                    <div>
                        <div className="admin_progress">
                            {
                                this.state.isLoading ? <CircularProgress thickness={8} style={{ color: '#98c5e9', marginTop: '100px' }} /> : ''
                            }
                        </div>
                        <form onSubmit={(e) => this.submitForm(e)}>
                            <FirebaseUploader
                                dir="players"
                                tag={"Player image"}
                                defaultImg={this.state.defaultImg}
                                defaultImgName={this.state.formData.image.value}
                                resetImage={() => this.resetImage()}
                                fileName={(filename) => this.storeFileName(filename)}
                            ></FirebaseUploader>

                            <FormFields
                                id={'name'}
                                formData={this.state.formData.name}
                                change={(e) => this.updateForm(e)}
                            />

                            <FormFields
                                id={'lastname'}
                                formData={this.state.formData.lastname}
                                change={(e) => this.updateForm(e)}
                            />

                            <FormFields
                                id={'number'}
                                formData={this.state.formData.number}
                                change={(e) => this.updateForm(e)}
                            />

                            <FormFields
                                id={'position'}
                                formData={this.state.formData.position}
                                change={(e) => this.updateForm(e)}
                            />

                            <div className="success_label">{this.state.formSuccess}</div>
                            {this.state.formError ?
                                <div className="error_label">Error. Something is wrong</div> : ''
                            }

                            <div className="admin_submit">
                                <button onClick={(e) => this.submitForm(e)}>
                                    {this.state.formType}
                                </button>
                            </div>
                        </form>
                    </div>

                </div>
            </DashboardLayout>
        );
    }
}

export default AddEditPlayers;