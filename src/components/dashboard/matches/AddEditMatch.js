import React, { Component } from 'react';
import DashboardLayout from '../../../hoc/DashboardLayout';
import FormFields from '../../ui/FormFields';
import { Validate } from '../../ui/Validate';
import firebaseDB, { matchDB, teamsDB, matchesDB } from '../../../firebase';
import { FirebaseLooper } from '../../ui/FirebaseLooper';

class AddEditMatch extends Component {
    state = {
        matchID: '',
        formType: '',
        formError: false,
        formSuccess: '',
        teams: [],
        formData: {
            date: {
                element: 'input',
                value: '',
                config: {
                    label: 'Event Date',
                    name: 'date_input',
                    type: 'date'
                },
                validation: {
                    required: true,
                },
                valid: false,
                validationMessage: '',
                showLabel: true
            },
            local: {
                element: 'select',
                value: '',
                config: {
                    label: 'Select local team',
                    name: 'select_local',
                    type: 'select',
                    options: []
                },
                validation: {
                    required: true,
                },
                valid: false,
                validationMessage: '',
                showLabel: false
            },
            resultLocal: {
                element: 'input',
                value: '',
                config: {
                    label: 'Result Local',
                    name: 'result_local_input',
                    type: 'text'
                },
                validation: {
                    required: true,
                },
                valid: false,
                validationMessage: '',
                showLabel: false
            },
            away: {
                element: 'select',
                value: '',
                config: {
                    label: 'Select away team',
                    name: 'select_away',
                    type: 'select',
                    options: []
                },
                validation: {
                    required: true,
                },
                valid: false,
                validationMessage: '',
                showLabel: false
            },
            resultAway: {
                element: 'input',
                value: '',
                config: {
                    label: 'Result Away',
                    name: 'result_away_input',
                    type: 'text'
                },
                validation: {
                    required: true,
                },
                valid: false,
                validationMessage: '',
                showLabel: false
            },
            referee: {
                element: 'input',
                value: '',
                config: {
                    label: 'Referee',
                    name: 'referee_input',
                    type: 'text'
                },
                validation: {
                    required: true,
                },
                valid: false,
                validationMessage: '',
                showLabel: true
            },
            stadium: {
                element: 'input',
                value: '',
                config: {
                    label: 'Stadium',
                    name: 'stadium_input',
                    type: 'text'
                },
                validation: {
                    required: true,
                },
                valid: false,
                validationMessage: '',
                showLabel: true
            },
            result: {
                element: 'select',
                value: '',
                config: {
                    label: 'Team result',
                    name: 'select_result',
                    type: 'select',
                    options: [{
                        key: 'W',
                        value: 'W'
                    }, {
                        key: 'L',
                        value: 'L'
                    }, {
                        key: 'D',
                        value: 'D'
                    }, {
                        key: 'n/a',
                        value: 'n/a'
                    }]
                },
                validation: {
                    required: true,
                },
                valid: false,
                validationMessage: '',
                showLabel: true
            },
            final: {
                element: 'select',
                value: '',
                config: {
                    label: 'Game played',
                    name: 'select_played',
                    type: 'select',
                    options: [{
                        key: 'Yes',
                        value: 'Yes'
                    }, {
                        key: 'No',
                        value: 'No'
                    }]
                },
                validation: {
                    required: true,
                },
                valid: false,
                validationMessage: '',
                showLabel: true
            }
        }

    };

    updateForm(e) {
        const newFormData = { ...this.state.formData };
        const newElement = { ...newFormData[e.id] };
        console.log(e.event.target);

        newElement.value = e.event.target.value;
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

    submitForm(e) {
        e.preventDefault();
        let dataSubmit = {};
        let validForm = true;
        // console.log('props',this.props);

        for (let key in this.state.formData) {
            dataSubmit[key] = this.state.formData[key].value;
            validForm = this.state.formData[key].valid && validForm;
        }

        // console.log('TeamsObj', this.state.teams);
        this.state.teams.forEach((team)=> {
            if(team.shortName === dataSubmit.local) {
                dataSubmit['localThmb'] = team.thmb
            }
            if(team.shortName === dataSubmit.away) {
                dataSubmit['awayThmb'] = team.thmb
            }
        });

        if (validForm) {
            if(this.state.formType === 'Edit Match') {
                firebaseDB.ref(`matches/${this.state.matchID}`).update(dataSubmit)
                .then(()=>{
                    this.successForm('Update Success');
                }).catch((e)=> {
                    console.log('Error', e.message);
                    this.setState({
                        formError: true
                    })
                })
            }
            console.log('dataSubmit', dataSubmit)
        } else {
            matchesDB.push(dataSubmit).then(()=> {
                this.props.history.push('/matches');
            }).catch((e)=>{
                this.setState({
                    formError: true
                })
            });
        }
    };

    successForm(message) {
        this.setState({
            formSuccess: message
        });

        setTimeout(()=>{
            this.setState({
                formSuccess: ''
            })
        }, 2000);
    };

    updateFields(match, teamArray, teamsObj, type, matchID) {
        const newFormData = {
            ...this.state.formData,
        };

        for (let key in newFormData) {
            if (match) {
                newFormData[key].value = match[key];
                newFormData[key].valid = true;
            }
            if (key === 'local' || key === 'away') {
                newFormData[key].config.options = teamArray;
            }
        };
        // console.log('newFormData', newFormData);
        this.setState({
            matchID,
            formType: type,
            teams: teamsObj,
            formData: newFormData
        })
    };

    componentDidMount() {
        const matchID = this.props.match.params.id;

        const getTeams = (match, type) => {
            teamsDB.once('value').then((snapshot) => {
                const teamsObj = FirebaseLooper(snapshot);
                // console.log(teamsObj);
                const teamArray = [];
                snapshot.forEach((child) => {
                    teamArray.push({
                        key: child.val().shortName,
                        value: child.val().shortName
                    })
                });
                this.updateFields(match, teamArray, teamsObj, type, matchID)
            })
        }; 

        if (!matchID) {
            //ADD NEW MATCH
            getTeams(false, 'Add Match');
        } else {
            //EDIT MATCH DATA
            firebaseDB.ref(`matches/${matchID}`).once('value')
                .then((snapshot) => {
                    const match = snapshot.val();
                    // console.log(match);
                    getTeams(match, 'Edit Match');
                })
        };

        
    };

    render() {
        return (
            <DashboardLayout>
                <div className="editmatch_dialog_wrapper">
                    <h2>
                        {this.state.formType}
                    </h2>
                    <div>
                        <form onSubmit={(e) => this.submitForm(e)}>
                            <FormFields
                                id={'date'}
                                formData={this.state.formData.date}
                                change={(e) => this.updateForm(e)}
                            />

                            <div className="select_team_layout">
                                <div className="label_inputs">Local</div>
                                <div className="wrapper">
                                    <div className="left">
                                        <FormFields
                                            id={'local'}
                                            formData={this.state.formData.local}
                                            change={(e) => this.updateForm(e)}
                                        />
                                    </div>
                                    <div>
                                        <FormFields
                                            id={'resultLocal'}
                                            formData={this.state.formData.resultLocal}
                                            change={(e) => this.updateForm(e)}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="select_team_layout">
                                <div className="label_inputs">Away</div>
                                <div className="wrapper">
                                    <div className="left">
                                        <FormFields
                                            id={'away'}
                                            formData={this.state.formData.away}
                                            change={(e) => this.updateForm(e)}
                                        />
                                    </div>
                                    <div>
                                        <FormFields
                                            id={'resultAway'}
                                            formData={this.state.formData.resultAway}
                                            change={(e) => this.updateForm(e)}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="split_fields">
                                <FormFields
                                    id={'referee'}
                                    formData={this.state.formData.referee}
                                    change={(e) => this.updateForm(e)}
                                />

                                <FormFields
                                    id={'stadium'}
                                    formData={this.state.formData.stadium}
                                    change={(e) => this.updateForm(e)}
                                />
                            </div>

                            <div className="split_fields last">
                                <FormFields
                                    id={'result'}
                                    formData={this.state.formData.result}
                                    change={(e) => this.updateForm(e)}
                                />

                                <FormFields
                                    id={'final'}
                                    formData={this.state.formData.final}
                                    change={(e) => this.updateForm(e)}
                                />
                            </div>

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

export default AddEditMatch;