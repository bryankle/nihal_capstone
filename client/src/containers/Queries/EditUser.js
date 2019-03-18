import React, { Component } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { reduxForm, Field } from "redux-form";
import {
  Button,
  Form,
  Grid,
  Header,
  Segment,
  Table,
  Checkbox
} from "semantic-ui-react";
import * as actions from "../../actions";
import semanticFormField from "../../components/SemanticForm";
import requireAdmin from "../requireAdmin";
import update from "immutability-helper";

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

class EditUsers extends Component {
  constructor() {
    super();
    this.state = {
      user_id: "",
      users: [],
      selections: {},
      edit: false,
      newform: false
    };
  }

  onSubmit = formProps => {
    if (this.state.newform == false) {
      this.setState({ newform: true });
      let selections = this.state.selections;
      let deleteIDs = Object.keys(selections);
      formProps.user_id = deleteIDs[0];
      // formProps = deleteIDs;
      console.log("delete id!!!!!!!!!!!!!!!!", formProps);
      //this.props.deleteUsers(formProps, () => {
      this.setState({ edit: true });
      //this.props.history.push("/feature");
      //});
    } else {
      let selections = this.state.selections;
      let deleteIDs = Object.keys(selections);
      //formProps = deleteIDs;
      //formProps.user_id = deleteIDs;
      console.log("fofffffff", formProps);
      this.props.editUser(formProps, () => {
        //this.setState({ edit: true });
        this.props.history.push("/feature");
      });
    }
  };

  componentDidMount() {
    this.setState({
      user_id: this.props.user_id
    });
    console.log("this userid", this.props.user_id);
    this.props
      .getUsers()
      .then(response => {
        console.log("response says", response);
        let userList = response.data;
        this.setState({ users: userList });
      })
      .catch(error => console.log(error.response));
  }

  handleSelect = id => {
    console.log("my select", this.state.selections);
    this.setState(prevState => {
      if (prevState.selections[id]) {
        return update(prevState, {
          selections: { $unset: [id] }
        });
      }
      return update(prevState, {
        selections: { [id]: { $set: true } }
      });
    });
    this.isDisabled();
  };

  isDisabled = () => {
    if (Object.keys(this.state.selections).length > 0) return true;
  };

  render() {
    const { handleSubmit } = this.props;
    if (this.state.edit == true) {
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
            <Grid.Column style={{ maxWidth: 450 }}>
              <Form size="large" onSubmit={handleSubmit(this.onSubmit)}>
                <Segment stacked>
                  <Header as="h2" color="teal" textAlign="center">
                    Edit a user
                  </Header>
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
                  {/* <div>{this.props.errorMessage}</div> */}
                  <Button color="teal" fluid size="large">
                    Submit
                  </Button>
                </Segment>
              </Form>
            </Grid.Column>
          </Grid>
        </div>
      );
    } else {
      return (
        <div className="viewawards">
          <style>{`body > div,
                      body > div > div,
                      body > div > div > div.viewawards {
                      height: 100%;
                      }
                      .viewawards {
                      padding-top: 5em
                      }
              `}</style>
          <Grid
            textAlign="center"
            style={{ height: "100%" }}
            verticalAlign="middle"
          >
            <Grid.Column style={{ maxWidth: 800 }}>
              <Form size="large" onSubmit={handleSubmit(this.onSubmit)}>
                <Segment stacked>
                  <Header as="h2" color="teal" textAlign="center">
                    Edit Users
                  </Header>
                  <Table celled>
                    <Table.Header>
                      <Table.Row>
                        <Table.HeaderCell />
                        <Table.HeaderCell>Name</Table.HeaderCell>
                        <Table.HeaderCell>Email</Table.HeaderCell>
                        <Table.HeaderCell>Admin (1)</Table.HeaderCell>
                      </Table.Row>
                    </Table.Header>
                    <Table.Body>
                      {this.state.users.map(users => (
                        <Table.Row key={users.user_id}>
                          <Table.Cell collapsing>
                            <Checkbox
                              onChange={() => this.handleSelect(users.user_id)}
                            />
                          </Table.Cell>
                          <Table.Cell>{users.name}</Table.Cell>
                          <Table.Cell>{users.email}</Table.Cell>
                          <Table.Cell>{users.admin}</Table.Cell>
                        </Table.Row>
                      ))}
                    </Table.Body>
                  </Table>
                  <Button
                    color="teal"
                    fluid
                    size="large"
                    disabled={!this.isDisabled()}
                  >
                    Edit Selected User
                  </Button>
                </Segment>
              </Form>
            </Grid.Column>
          </Grid>
        </div>
      );
    }
  }
}

function mapStateToProps(state) {
  return {
    user_id: state.auth.user_id
  };
}
export default compose(
  connect(
    mapStateToProps,
    actions
  ),
  reduxForm({ form: "viewusers" }),
  requireAdmin
)(EditUsers);
