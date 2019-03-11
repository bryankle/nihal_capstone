import React, {Component} from "react"
import { connect } from 'react-redux';
import { compose } from 'redux';
import { reduxForm, Field } from 'redux-form';
import { Button, Form, Grid, Header, Segment } from 'semantic-ui-react';
import * as actions from '../actions';
import semanticFormField from '../components/SemanticForm';
import requireEmployee from './requireEmployee'
import SignatureCanvas from 'react-signature-canvas'

const awardTypeOptions = [
    {
      value: "1",
      text: "Employee of the Day",
      key: "1"
    },
    {
      value: "2",
      text: "Employee of the Week",
      key: "2"
    },
    {
      value: "3",
      text: "Employee of the Century",
      key: "3"
    }
  ];

class CreateAward extends Component {
    constructor() {
        super();
        this.state = {
            user_id: "",
            employees: [],
            hasSignature: false,
            trimmedDataURL: null
        };
    }

    sigPad = {}
    clear = (event) => {
        event.preventDefault();
        this.sigPad.clear()
      }
      trim = (event) => {
        event.preventDefault();
        if (this.sigPad.isEmpty()) {
            return;
        }
        this.setState({trimmedDataURL: this.sigPad.getTrimmedCanvas()
          .toDataURL('image/png')})
      }

    componentDidMount() {
        this.setState({
            user_id: this.props.user_id
        })
        this.props.getSignature(this.props.user_id)
          .then(response => {
              let sig = response.data
              if (sig[0].signature_path != null) {
                this.setState({ hasSignature: true });
              }
          })
          .catch(error => console.log(error.response));
        this.props.getRecipients()
          .then(response => {
            console.log("response says", response);
            let users = response.data
            for(let i = 0; i < users.length; i++){
                users[i].value = users[i].user_id;
                users[i].text = users[i].name;
                users[i].key = users[i].user_id;
                delete users[i].user_id;
                delete users[i].name;
            }
            this.setState({ employees: users });
          })
          .catch(error => console.log(error.response));
      }

    onSubmit = (formProps) => {
        formProps.senderID = this.state.user_id;
        if (this.state.hasSignature === false) {
            formProps.sigPath = this.state.trimmedDataURL
        }
        console.log("form props:", formProps);
        this.props.createAward(formProps, () => {
            console.log(formProps);
            // TODO: Determine page to redirect to after award created
          this.props.history.push('/feature');
        });
      };


    render() {
        const { handleSubmit } = this.props; 
        console.log("senderID is ", this.state.user_id)
        console.log(this.state.employees)
        let users = this.state.employees;
        let {trimmedDataURL} = this.state

        console.log("useroptions", users)
        const styleBorder = {
            border: '2px solid black'
        }

        return (
            <div className='createaward'>
                <style>{`body > div,
                        body > div > div,
                        body > div > div > div.createaward {
                        height: 100%;
                        }
                        .createaward {
                        padding-top: 5em
                        }
                `}</style>
                <Grid textAlign='center' style={{ height: '100%' }} verticalAlign='middle'>
                    <Grid.Column style={{ maxWidth: 500 }}>
                        <Header as='h2' color='teal' textAlign='center'>
                            Create an Award
                        </Header>
                        <Form size='large' onSubmit={handleSubmit(this.onSubmit)}>
                            <Segment stacked>
                                <Field name="awardType" component={semanticFormField} as={Form.Dropdown} options={awardTypeOptions} type="text" placeholder="Choose Type of Award" />
                                <Field name="recipientID" component={semanticFormField} as={Form.Dropdown} options={this.state.employees} type="text" placeholder="Choose Award Recipient" />
                                <Field name="email" component={semanticFormField} as={Form.Input} icon='mail' iconPosition='left' type="text" placeholder="Email" />
                                <Field name="date" component={semanticFormField} as={Form.Input} icon='calendar' iconPosition='left' type="date"/>
                                <Field name="time" component={semanticFormField} as={Form.Input} icon='clock' iconPosition='left' type="time" />
                                {/* <div>{this.props.errorMessage}</div> */}
                                <div>
                                {this.state.hasSignature ?                                 
                                <Button color='teal' fluid size='large'>
                                    Submit
                                </Button> : (
                                    <React.Fragment>
                                <h5>You don't have a signature on file yet. Please add one now.</h5> 
                                <div>
                                    <div style={styleBorder}>
                                        <SignatureCanvas canvasProps={{width: 400, height: 150}}
                                        ref={(ref) => { this.sigPad = ref }} />
                                    </div><br />
                                    <div>
                                        <button onClick={this.trim}>
                                        Keep this Signature
                                        </button> <br />
                                        <button onClick={this.clear}>
                                        Clear
                                        </button>

                                    </div>
                                    {trimmedDataURL
                                        ? <div><h5>Preview of Signature. Click Submit if ready to create award!</h5><img
                                        src={trimmedDataURL} />
                                        <Button color='teal' fluid size='large'>
                                            Submit
                                        </Button></div>
                                        : null}
                                    </div>
                                    <br />
                                    </React.Fragment>
                                 )}
                                </div>

                            </Segment>
                        </Form>
                    </Grid.Column>
                </Grid>
            </div>
        )
    }
}
// function mapStateToProps(state) {
//     return { errorMessage: state.auth.errorMessage };
//   }
function mapStateToProps(state) {
    return { 
        user_id: state.auth.user_id
     };
}
export default compose (connect(mapStateToProps, actions), reduxForm({ form: 'createaward'}), requireEmployee)(CreateAward);