import React, { Component } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { reduxForm, Field } from "redux-form";
import fileDownload from "react-file-download";
import {
  Button,
  Form,
  Grid,
  Header,
  Image,
  Message,
  Segment,
  Input
} from "semantic-ui-react";
import * as actions from "../../actions";
import { Link } from "react-router-dom";
import semanticFormField from "../../components/SemanticForm";
import requireAdmin from "../requireAdmin";
const checkboxOptions = [
  {
    value: "1",
    text: "East",
    key: "1"
  },
  {
    value: "2",
    text: "Central",
    key: "2"
  },
  {
    value: "3",
    text: "West",
    key: "3"
  }
];
const adminOptions = [
  {
    value: "0",
    text: "User",
    key: "0"
  },
  {
    value: "1",
    text: "Admin",
    key: "1"
  }
];

class BusReceived extends Component {
  constructor() {
    super();
    this.state = {
      user_id: "",
      employees: [],
      fetching: true
    };
  }
  componentDidMount() {
    this.setState({
      user_id: this.props.user_id
    });
    this.props
      .getRecipients()
      .then(response => {
        console.log("response says", response);
        let users = response.data;
        for (let i = 0; i < users.length; i++) {
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

  onSubmit = formProps => {
    console.log("look at the formprops", formProps);
    this.props.getAwardsReceived(formProps).then(response => {
      console.log("response says", response.data);
      // TODO: Determine page to redirect to after admin adds user
      // this.props.history.push("/");
      fileDownload(response.data, "awardsreceived.csv");
      this.setState({ fetching: false });
    });
  };
  render() {
    const { handleSubmit } = this.props; // handleSubmit provided by redux form

    if (this.state.fetching == true) {
      return (
        <div className="login-form">
          <style>{`
        body > div,
        body > div > div,
        body > div > div > div.login-form {
          height: 100%;
        }
        .login-form {
          padding-top: 5em
        }
      `}</style>
          <Grid
            textAlign="center"
            style={{ height: "100%" }}
            verticalAlign="middle"
          >
            {" "}
            <Grid.Column style={{ maxWidth: 450 }}>
              <Segment stacked>
                <Header as="h2" color="teal" textAlign="center">
                  Awards Received by User
                </Header>

                <Form size="large" onSubmit={handleSubmit(this.onSubmit)}>
                  {/*
                <Field
                  name="first_name"
                  component={semanticFormField}
                  as={Form.Input}
                  icon="lock"
                  iconPosition="left"
                  type="text"
                  placeholder="First Name"
                />
                <Field
                  name="last_name"
                  component={semanticFormField}
                  as={Form.Input}
                  icon="lock"
                  iconPosition="left"
                  type="text"
                  placeholder="Last Name"
                />
                <Field
                  name="email"
                  component={semanticFormField}
                  as={Form.Input}
                  icon="mail"
                  iconPosition="left"
                  type="text"
                  placeholder="Email"
                />
            */}
                  <Field
                    name="recipientID"
                    component={semanticFormField}
                    as={Form.Dropdown}
                    size="lg"
                    options={this.state.employees}
                    type="text"
                    placeholder="Choose Award Recipient"
                  />
                  {/*
                <Field
                  name="password"
                  component={semanticFormField}
                  as={Form.Input}
                  icon="lock"
                  iconPosition="left"
                  type="password"
                  placeholder="Password"
                />
                <Field
                  name="region_id"
                  component={semanticFormField}
                  as={Form.Dropdown}
                  //icon="lock"
                  options={checkboxOptions}
                  placeholder="My Dropdown"
                  iconPosition="left"
                  type="text"
                  placeholder="Region"
                />{" "}
                <Field
                  name="admin"
                  component={semanticFormField}
                  as={Form.Dropdown}
                  //icon="lock"
                  options={adminOptions}
                  placeholder="My Dropdown"
                  iconPosition="left"
                  type="text"
                  placeholder="Admin or User"
                />
                */}

                  <Button color="teal" fluid size="large">
                    Submit
                  </Button>
                </Form>
              </Segment>
            </Grid.Column>
          </Grid>
        </div>
      );
    } else {
      return (
        <div className="login-form">
          <style>{`
                  body > div,
                  body > div > div,
                  body > div > div > div.login-form {
                    height: 100%;
                  }
                  .login-form {
                    padding-top: 5em
                  }
                `}</style>
          <Grid
            textAlign="center"
            style={{ height: "100%" }}
            verticalAlign="middle"
          >
            {" "}
            <Grid.Column style={{ maxWidth: 450 }}>
              <Segment stacked>
                <Header as="h2" color="teal" textAlign="center">
                  Downloading CSV File
                </Header>
              </Segment>
            </Grid.Column>
          </Grid>
        </div>
      );
    }
  }
}

function mapStateToProps(state) {
  return { errorMessage: state.auth.errorMessage };
}

export default compose(
  connect(
    mapStateToProps,
    actions
  ),
  reduxForm({ form: "query" }),
  requireAdmin
)(BusReceived);
