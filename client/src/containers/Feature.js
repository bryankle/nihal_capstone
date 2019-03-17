import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import * as actions from '../actions';
// import { reduxForm } from 'redux-form';
import { Grid, Header, Segment, Table } from 'semantic-ui-react';
import requireEmployee from './requireEmployee';

class Feature extends Component {
    constructor() {
        super();
        this.state = {
            awards: []
        };
    }

    componentDidMount() {
        this.props.getAllAwards()
            .then(response => {
                console.log("response says", response);
                let allAwards = response.data
                this.setState({ awards: allAwards });
            })
            .catch(error => console.log(error.response));
    }
    
    render() {
        return (
            <div className='feature'>
                <style>{`body > div,
                        body > div > div,
                        body > div > div > div.feature {
                        height: 100%;
                        }
                        .feature {
                        padding-top: 5em
                        }
                `}</style>
                <Grid textAlign='center' style={{ height: '100%' }} verticalAlign='middle'>
                    <Grid.Column style={{ maxWidth: 800 }}>
                    <Segment stacked>
                        <Header as='h2' color='teal' textAlign='center'>
                                Nihal Employee Recognition Portal
                        </Header>
                        <Header as='h2' color='teal' textAlign='center'>
                                Recent Awards Submitted
                        </Header>
                                <Table celled>
                                    <Table.Header>
                                        <Table.Row>
                                            {/* <Table.HeaderCell /> */}
                                            <Table.HeaderCell>Sender</Table.HeaderCell>
                                            <Table.HeaderCell>Recipient</Table.HeaderCell>
                                            <Table.HeaderCell>Type of Award</Table.HeaderCell>
                                            <Table.HeaderCell>Date</Table.HeaderCell>
                                        </Table.Row>
                                    </Table.Header>
                                    <Table.Body>
                                        {this.state.awards.map(award => (
                                            <Table.Row key={award.award_id}>
                                                <Table.Cell>
                                                    {award.senderName}
                                                </Table.Cell>
                                                <Table.Cell>
                                                    {award.recipientName}
                                                </Table.Cell>
                                                <Table.Cell>
                                                    {award.award_name}
                                                </Table.Cell>
                                                <Table.Cell>
                                                    {award.date}
                                                </Table.Cell>
                                            </Table.Row>))}
                                    </Table.Body>
                                </Table>
                            </Segment>
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
export default compose(connect(mapStateToProps, actions), requireEmployee)(Feature);