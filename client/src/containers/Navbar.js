import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Button, Container, Menu } from "semantic-ui-react";
import "../App.css";

class Navbar extends Component {
  state = {};
  componentWillMount() {
    this.setState({ fixed: true });
  }
  renderLinks() {
    if (this.props.authenticated) {
      // Navbar for admin
      if (this.props.admin) {
        return (
          <div>
            <Link to="/admin-table">
              <Button
                as="a"
                inverted={!true}
                color="teal"
                style={{ marginLeft: "0.5em" }}
              >
                Admin Table
              </Button>
            </Link>
            {/* <Link to="/admin-feature">
              <Button
                as="a"
                inverted={!true}
                color="teal"
                style={{ marginLeft: "0.5em" }}
              >
                Admin Feature
              </Button>
            </Link> */}
            <Link to="/create-user">
              <Button
                as="a"
                inverted={!true}
                color="teal"
                style={{ marginLeft: "0.5em" }}
              >
                Create User
              </Button>
            </Link>
            <Link to="/businessinformation">
              <Button
                as="a"
                inverted={!true}
                color="teal"
                style={{ marginLeft: "0.5em" }}
              >
                Business Information
              </Button>
            </Link>
            <Link to="/signout">
              <Button
                as="a"
                inverted={!true}
                color="teal"
                style={{ marginLeft: "0.5em" }}
              >
                Sign Out
              </Button>
            </Link>
          </div>
        );
      }
      // Navbar for regular user
      else {
        return (
          <div>
            <Link to="/feature">
              <Button
                as="a"
                inverted={!true}
                color="teal"
                style={{ marginLeft: "0.5em" }}
              >
                Recent Awards
              </Button>
            </Link>
            <Link to="/createaward">
              <Button
                as="a"
                inverted={!true}
                color="teal"
                style={{ marginLeft: "0.5em" }}
              >
                Create Award
              </Button>
            </Link>
            <Link to="/viewawards">
              <Button
                as="a"
                inverted={!true}
                color="teal"
                style={{ marginLeft: "0.5em" }}
              >
                View Awards
              </Button>
            </Link>
            <Link to="/editinfo">
              <Button
                as="a"
                inverted={!true}
                color="teal"
                style={{ marginLeft: "0.5em" }}
              >
                Edit My Info
              </Button>
            </Link>
            <Link to="/signout">
              <Button
                as="a"
                inverted={!true}
                color="teal"
                style={{ marginLeft: "0.5em" }}
              >
                Sign Out
              </Button>
            </Link>
          </div>
        );
      }
    } else {
      return (
        <div>
          <Link to="/signin">
            <Button as="a" inverted={!true}>
              Sign in
            </Button>
          </Link>
        </div>
      );
    }
  }

  render() {
    console.log("Navbar props:", this.props);
    const { fixed } = this.state;
    return (
      <Menu
        fixed={fixed ? "top" : null}
        inverted={fixed}
        secondary={!fixed}
        size="large"
        color="grey"
      >
        <Container>
          <Menu.Item active>
            <Link to="/">Home</Link>
          </Menu.Item>
          <Menu.Item position="right">{this.renderLinks()}</Menu.Item>
        </Container>
      </Menu>
    );
  }
}

function mapStateToProps(state) {
  console.log("state", state);
  return {
    authenticated: state.auth.authenticated,
    admin: state.auth.admin,
    user_id: state.auth.user_id
  };
}

export default connect(mapStateToProps)(Navbar);
