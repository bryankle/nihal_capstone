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
import Chart from "react-google-charts";
import { convertCSVToArray } from "convert-csv-to-array";

import ReactDOM from "react-dom";

// This will parse a delimited string into an array of
// arrays. The default delimiter is the comma, but this
// can be overriden in the second argument.
function CSVToArray(strData, strDelimiter) {
  // Check to see if the delimiter is defined. If not,
  // then default to comma.
  strDelimiter = strDelimiter || ",";

  // Create a regular expression to parse the CSV values.
  var objPattern = new RegExp(
    // Delimiters.
    "(\\" +
      strDelimiter +
      "|\\r?\\n|\\r|^)" +
      // Quoted fields.
      '(?:"([^"]*(?:""[^"]*)*)"|' +
      // Standard fields.
      '([^"\\' +
      strDelimiter +
      "\\r\\n]*))",
    "gi"
  );

  // Create an array to hold our data. Give the array
  // a default empty first row.
  var arrData = [[]];

  // Create an array to hold our individual pattern
  // matching groups.
  var arrMatches = null;

  // Keep looping over the regular expression matches
  // until we can no longer find a match.
  while ((arrMatches = objPattern.exec(strData))) {
    // Get the delimiter that was found.
    var strMatchedDelimiter = arrMatches[1];

    // Check to see if the given delimiter has a length
    // (is not the start of string) and if it matches
    // field delimiter. If id does not, then we know
    // that this delimiter is a row delimiter.
    if (strMatchedDelimiter.length && strMatchedDelimiter != strDelimiter) {
      // Since we have reached a new row of data,
      // add an empty row to our data array.
      arrData.push([]);
    }

    // Now that we have our delimiter out of the way,
    // let's check to see which kind of value we
    // captured (quoted or unquoted).
    if (arrMatches[2]) {
      // We found a quoted value. When we capture
      // this value, unescape any double quotes.
      var strMatchedValue = arrMatches[2].replace(new RegExp('""', "g"), '"');
    } else {
      // We found a non-quoted value.
      var strMatchedValue = arrMatches[3];
    }

    // Now that we have our value string, let's add
    // it to the data array.
    arrData[arrData.length - 1].push(strMatchedValue);
  }

  // Return the parsed data.
  return arrData;
}
function doIt(myThingee) {
  var keys = Object.keys(myThingee);
  console.log("keys are here", keys);
  var value;

  for (var key in keys) {
    value = parseInt(myThingee[key], 10);
    console.log("Whats happening here in the for loop", value);

    if (!isNaN(value)) {
      myThingee[key] = value;
      console.log("Whats happening here should be converting to number", keys);
    }
  }
  return myThingee;
}
function formatChartData(data) {
  //var
  for (var i = 0, length = data.length; i < length; i++) {
    console.log("data values", data[i][1]);
    if (!isNaN(data[i][1])) {
      data[i][1] = parseInt(data[i][1], 10);
      console.log("data values", data[i].value1);
      //data[i].value2 = parseFloat(data[i].value2);
    }
  }
  return data;
}
const checkboxOptions = [
  {
    value: "1",
    text: "Awards Received",
    key: "1"
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
  /*
 onSubmit = formProps => {
    console.log("look at the formprops", formProps);
    this.props.getAwardTotal(formProps, () => {
      // TODO: Determine page to redirect to after admin adds user
      this.props.history.push("/");
    });
  };
  */
  onSubmit = formProps => {
    console.log("look at the formprops", formProps);

    this.props.getAwardTotal().then(response => {
      array = CSVToArray(response.data);
      var datas = [
        ["Element", "Density"],
        ["Copper", 8.94], // RGB value
        ["Silver", 10.49], // English color name
        ["Gold", 19.3],
        ["Platinum", 21.45] // CSS-style declaration
      ];
      //formatChartData(data)
      var array2 = formatChartData(array);
      //var array2 = doIt(array);
      this.setState({ results: array2 });
      console.log("this state results", this.state.results);
      console.log("new array original", array);
      console.log("new array after the conversion", array2);
      console.log("and here is the data thats preloaded", datas);
      console.log("response says", response.data);

      this.setState({ fetching: false });
      // TODO: Determine page to redirect to after admin adds user
      //this.props.history.push("/");
      fileDownload(response.data, "AwardTotals.csv");
    });
  };
  renderresults() {
    return (
      <div className="App">
        <Chart
          chartType="ColumnChart"
          width="100%"
          height="400px"
          data={this.state.results}
          //data={datas}
        />
      </div>
    );
  }
  handleReset = () => {
    // since our views are dependent on `haveData` and `fetching`, we can just set those to false
    this.setState({
      fetching: false
      //haveData: false
    });
  };
  render() {
    const { handleSubmit } = this.props; // handleSubmit provided by redux form
    console.log("in the render this.state", this.state.results);
    if (this.state.fetching == false) {
      return (
        <div className="App">
          <Chart
            chartType="ColumnChart"
            width="100%"
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
                 */}
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
//const rootElement = document.getElementById("root");
//ReactDOM.render(<BusTotal />, rootElement);
