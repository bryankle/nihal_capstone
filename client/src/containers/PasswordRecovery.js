import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { reduxForm, Field } from 'redux-form';
import { Button, Form, Grid, Header, Segment } from 'semantic-ui-react';
import * as actions from '../actions';
import semanticFormField from '../components/SemanticForm';

class PasswordRecovery extends Component {

  onSubmit = (formProps) => {
    console.log("formprops are", formProps)
    this.props.passwordRecover(formProps, () => {
      this.props.history.push('/signin');
    });
  };

  render() {
    const { handleSubmit } = this.props; // handleSubmit provided by redux form
    return (
      <div className='passwordrecovery'>
        <style>{`
          body > div,
          body > div > div,
          body > div > div > div.passwordrecovery {
            height: 100%;
          }
          .passwordrecovery {
            padding-top: 5em
          }
        `}</style>
        <Grid textAlign='center' style={{ height: '100%' }} verticalAlign='middle'>
          <Grid.Column style={{ maxWidth: 500 }}>
            <Form size='large' onSubmit={handleSubmit(this.onSubmit)}>
              <Segment stacked>
                <Header as='h2' color='teal' textAlign='center'>
                  Password Recovery
                </Header>
                <Header as='h2' color='teal' textAlign='center'>
                  Please enter your account's email address.
                </Header>
                <Field name="email" component={semanticFormField} as={Form.Input} icon='mail' iconPosition='left' type="text" placeholder="Email" />
                <Button color='teal' fluid size='large'>
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
    errorMessage: state.auth.errorMessage,
    admin: state.auth.admin
  };
}

export default compose (
  connect(mapStateToProps, actions),
  reduxForm({ form: 'passwordrecovery'})
)(PasswordRecovery);

