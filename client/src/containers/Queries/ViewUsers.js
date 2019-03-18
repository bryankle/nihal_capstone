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

class ViewUsers extends Component {
  constructor() {
    super();
    this.state = {
      user_id: "",
      users: [],
      selections: {}
    };
  }

  onSubmit = formProps => {
    let selections = this.state.selections;
    let deleteIDs = Object.keys(selections);
    formProps = deleteIDs;
    this.props.deleteUsers(formProps, () => {
      this.props.history.push("/feature");
    });
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
                  Delete Users
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
                  Delete Selected Users
                </Button>
              </Segment>
            </Form>
          </Grid.Column>
        </Grid>
      </div>
    );
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
)(ViewUsers);
