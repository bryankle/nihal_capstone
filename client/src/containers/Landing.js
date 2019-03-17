import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Button, Container, Header, Icon } from "semantic-ui-react";
import logo from "../img/showcase.jpg";
import "../App.css";
const HomepageHeading = ({ mobile }) => (
  <Container text>
    <Header
      as="h1"
      content="Nihal Employee Recognition"
      inverted
      style={{
        color: "#f7f7f7",
        //backgroundColor: "#d6d6d6",
        backgroundColor: "teal",
        opacity: 0.9,
        fontSize: mobile ? "2em" : "4em",
        fontWeight: "normal",
        marginBottom: 0,
        marginLeft: 80,
        marginRight: 80,
        marginTop: mobile ? "1.5em" : "3em",

        //width: "500px",
        //textalign: "center",
        //height: "50px",
        padding: "30px"
      }}
    />
    <Header
      as="h2"
      content=""
      inverted
      style={{
        fontSize: mobile ? "1.5em" : "1.7em",
        fontWeight: "normal",
        marginTop: mobile ? "0.5em" : "1.5em"
      }}
    />
    <Link to="/signin">
      <Button
        as="a"
        inverted={!true}
        color="teal"
        style={{
          marginLeft: "0.5em",
          marginBottom: ".5em",
          width: "250px"
        }}
      >
        Get Started
        <Icon name="right arrow" />
      </Button>
    </Link>
  </Container>
);

export default HomepageHeading;
