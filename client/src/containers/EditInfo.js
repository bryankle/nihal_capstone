import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import { Menu, Grid } from "semantic-ui-react";

class EditInfo extends Component {
    render() {
        return (
            <div className='editinfo'>
            <style>{`body > div,
                    body > div > div,
                    body > div > div > div.editinfo {
                    height: 100%;
                    }
                    .editinfo {
                    padding-top: 5em
                    }
            `}</style>
            <Grid textAlign='center' style={{ height: '100%' }} verticalAlign='middle'>
                <Grid.Column style={{ maxWidth: 300 }}>
                    <Menu vertical>
                    <Menu.Item href='/changename'>
                        Change Name
                    </Menu.Item>
                    <Menu.Item href='/changepassword'>
                        Change Password
                    </Menu.Item>
                    </Menu>
                    </Grid.Column>
                </Grid>
        </div>
        )
    }
}

export default connect(null, actions)(EditInfo);