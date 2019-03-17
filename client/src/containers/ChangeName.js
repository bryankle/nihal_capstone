import React, {Component} from "react"
import { connect } from 'react-redux';
import { compose } from 'redux';
import { reduxForm, Field } from 'redux-form';
import { Button, Form, Grid, Header, Segment } from 'semantic-ui-react';
import * as actions from '../actions';
import semanticFormField from '../components/SemanticForm';
import requireEmployee from './requireEmployee'


class ChangeName extends Component {
    constructor() {
        super();
        this.state = {
            user_id: "",
            firstName: "",
            lastName: ""
        };
    }

    componentDidMount() {
        this.setState({
            user_id: this.props.user_id
        })
        this.props.getFullName(this.props.user_id)
          .then(response => {
            let fullName = response.data
            this.setState({ firstName: fullName[0].first_name });
            this.setState({ lastName: fullName[0].last_name });
              
          })
          .catch(error => console.log(error.response));
      }

    onSubmit = (formProps) => {
        formProps.userID = this.state.user_id;
        if (formProps.firstName == null) {
            formProps.firstName = this.state.firstName
        }
        if (formProps.lastName == null) {
            formProps.lastName = this.state.lastName
        } 
        this.props.changeName(formProps, () => {
            console.log(formProps);
          this.props.history.push('/feature');
        });
      };


    render() {
        const { handleSubmit } = this.props; 
        return (
            <div className='changename'>
                <style>{`body > div,
                        body > div > div,
                        body > div > div > div.changename {
                        height: 100%;
                        }
                        .changename {
                        padding-top: 5em
                        }
                `}</style>
                <Grid textAlign='center' style={{ height: '100%' }} verticalAlign='middle'>
                    <Grid.Column style={{ maxWidth: 500 }}>
                        <Form size='large' onSubmit={handleSubmit(this.onSubmit)}>
                            <Segment stacked>
                                <Header as='h2' color='teal' textAlign='center'>
                                    Your name in our system is {this.state.firstName} {this.state.lastName}.
                                </Header>
                                <Header as='h2' color='teal' textAlign='center'>
                                    Use this form to change your name.
                                </Header>
                                <Field name="firstName" component={semanticFormField} as={Form.Input} icon="user" iconPosition="left" type="text" placeholder="First Name" value={this.state.firstName} />
                                <Field name="lastName" component={semanticFormField} as={Form.Input} icon="user" iconPosition="left" type="text" placeholder="Last Name" value={this.state.lastName}/>
                                <Button color='teal' fluid size='large' disabled={this.props.pristine}>
                                    Submit
                                </Button>
                            </Segment>
                        </Form>
                    </Grid.Column>
                </Grid>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return { 
        user_id: state.auth.user_id
     };
}
export default compose (connect(mapStateToProps, actions), reduxForm({ form: 'changename'}), requireEmployee)(ChangeName);