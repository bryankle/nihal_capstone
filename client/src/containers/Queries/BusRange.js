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

class BusRange extends Component {
  constructor() {
    super();
    this.state = {
      user_id: "",
      employees: [],
      fields: false,
      fieldError: false
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

  /*onSubmit = formProps => {
    console.log("look at the formprops", formProps);
    this.props.getAwardRange(formProps, () => {
      // TODO: Determine page to redirect to after admin adds user
      this.props.history.push("/");
    });
  };*/
  onSubmit = formProps => {
    console.log("look at the formprops", formProps);
    this.props.getAwardRange(formProps).then(response => {
      console.log("response says", response.data);
      // TODO: Determine page to redirect to after admin adds user
      this.props.history.push("/");
      fileDownload(response.data, "daterange.csv");
    });
  };

  render() {
    const { handleSubmit } = this.props; // handleSubmit provided by redux form
    console.log("help", this.state.fields);

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
                Award Type Issued by Range of Dates
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
               
                <Field
                  name="recipientID"
                  component={semanticFormField}
                  as={Form.Dropdown}
                  options={this.state.employees}
                  type="text"
                  placeholder="Choose Award Winner"
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
                  */}
                <Field
                  name="awardtypeID"
                  component={semanticFormField}
                  as={Form.Dropdown}
                  //icon="lock"
                  options={checkboxOptions}
                  placeholder="My Dropdown"
                  iconPosition="left"
                  type="text"
                  placeholder="Award Type"
                  value={this.state.fields}
                  onChange={this.onInputChange}
                  error={this.state.fieldError}
                />
                Start Date
                <Field
                  name="beginning"
                  component={semanticFormField}
                  as={Form.Input}
                  icon="calendar"
                  iconPosition="left"
                  type="date"
                />
                End Date
                <Field
                  name="end"
                  component={semanticFormField}
                  as={Form.Input}
                  icon="calendar"
                  iconPosition="left"
                  type="date"
                />
                {/*}
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
                <Button color="teal">Submit</Button>
              </Form>
            </Segment>
          </Grid.Column>
        </Grid>
      </div>
    );
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
)(BusRange);
