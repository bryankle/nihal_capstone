import React, {Component} from "react"
import { connect } from 'react-redux';
import { compose } from 'redux';
import { reduxForm, Field } from 'redux-form';
import { Button, Form, Grid, Header, Segment } from 'semantic-ui-react';
import * as actions from '../actions';
import semanticFormField from '../components/SemanticForm';
import requireEmployee from './requireEmployee'


class ChangePassword extends Component {
    constructor() {
        super();
        this.state = {
            user_id: "",
        };
    }

    componentDidMount() {
        this.setState({
            user_id: this.props.user_id
        })
      }

    onSubmit = (formProps) => {
        formProps.userID = this.state.user_id;
        if (formProps.password1 != formProps.password2) {
            return
        }

        this.props.changePassword(formProps, () => {
            console.log(formProps);
            this.props.signout()
          this.props.history.push('/signin');
        });
      };


    render() {
        const { handleSubmit } = this.props; 
        return (
            <div className='changepassword'>
                <style>{`body > div,
                        body > div > div,
                        body > div > div > div.changepassword {
                        height: 100%;
                        }
                        .changepassword {
                        padding-top: 5em
                        }
                `}</style>
                <Grid textAlign='center' style={{ height: '100%' }} verticalAlign='middle'>
                    <Grid.Column style={{ maxWidth: 500 }}>
                        <Form size='large' onSubmit={handleSubmit(this.onSubmit)}>
                            <Segment stacked>
                                <Header as='h2' color='teal' textAlign='center'>
                                    Enter a new password
                                </Header>
                                You will need to sign in using the new password after hitting submit.
                                <Field name="password1" component={semanticFormField} as={Form.Input} icon="lock" iconPosition="left" type="password" placeholder="New Password" />
                                <Field name="password2" component={semanticFormField} as={Form.Input} icon="lock" iconPosition="left" type="password" placeholder="Re-enter New Password"/>
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
export default compose (connect(mapStateToProps, actions), reduxForm({ form: 'changepassword'}), requireEmployee)(ChangePassword);