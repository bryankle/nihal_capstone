import React, { Component } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { reduxForm, Field } from "redux-form";
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
import { CSVToArray } from "../../actions/helpers";
import { formatChartData } from "../../actions/helpers";
import semanticFormField from "../../components/SemanticForm";
import requireAdmin from "../requireAdmin";
import Chart from "react-google-charts";
import fileDownload from "react-file-download";
const checkboxOptions = [
  {
    value: "0",
    text: "Awards Received",
    key: "0"
  },
  {
    value: "1",
    text: "Awards Sent",
    key: "1"
  }
];
const options = {
  title: "Total Business Awards Received by User",
  //hAxis: { title: "Age", viewWindow: { min: 0, max: 15 } },
  // vAxis: { title: "Weight", viewWindow: { min: 0, max: 15 } },
  legend: "none"
};

var array = [];
class BusTotal extends Component {
  constructor() {
    super();
    this.state = {
      user_id: "",
      employees: [],
      fetching: true,
      results: []
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
    console.log("look at the formprops", formProps.awardsReceived);
    if (formProps.awardsReceived == 0) {
      console.log("hello you selected received");

      this.props.getAwardTotal().then(response => {
        array = CSVToArray(response.data);

        //formatChartData(data)
        var array2 = formatChartData(array);
        //var array2 = doIt(array);
        this.setState({ results: array2 });
        console.log("this state results", this.state.results);
        console.log("new array original", array);
        console.log("new array after the conversion", array2);
        console.log("response says", response.data);
        this.setState({ fetching: false });
        //fileDownload(response.data, "awardtotal.csv");
      });
    }
    if (formProps.awardsReceived == 1) {
      console.log("hello you selected sent");

      options.title = "Total Business Awards Sent by User";
      this.props.getAwardTotalSent().then(response => {
        array = CSVToArray(response.data);

        //formatChartData(data)
        var array2 = formatChartData(array);
        //var array2 = doIt(array);
        this.setState({ results: array2 });
        console.log("this state results", this.state.results);
        console.log("new array original", array);
        console.log("new array after the conversion", array2);
        console.log("response says", response.data);
        this.setState({ fetching: false });
        //fileDownload(response.data, "awardtotal.csv");
      });
    }
  };

  render() {
    const { handleSubmit } = this.props; // handleSubmit provided by redux form
    console.log("in the render this.state", this.state.results);
    if (this.state.fetching == false) {
      return (
        <div className="App">
          <Header as="h2" color="teal" textAlign="center">
            Total Awards Received
          </Header>
          <Chart
            chartType="ColumnChart"
            width="100%"
            options={options}
            height="400px"
            data={this.state.results}
          />
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
              <Header as="h2" color="teal" textAlign="center">
                Total Awards Received
              </Header>

              <Form size="large" onSubmit={handleSubmit(this.onSubmit)}>
                <Segment stacked>
                  <Field
                    name="awardsReceived"
                    component={semanticFormField}
                    as={Form.Dropdown}
                    //icon="lock"
                    options={checkboxOptions}
                    placeholder="My Dropdown"
                    iconPosition="left"
                    type="text"
                    placeholder="Award Type"
                  />{" "}
                  {
                    //<div>{this.props.errorMessage}</div>}
                  }
                  <Button color="teal" fluid size="large">
                    Submit
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
  return { errorMessage: state.auth.errorMessage };
}
export default compose(
  connect(
    mapStateToProps,
    actions
  ),
  reduxForm({ form: "query" }),
  requireAdmin
)(BusTotal);
