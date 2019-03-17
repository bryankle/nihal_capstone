import React, { Component } from 'react';
import requireAuth from './requireAuth';
import requireAdmin from './requireAdmin';
import { connect } from 'react-redux';
import { compose } from 'redux';
import * as actions from '../actions';
import { Icon, Label, Menu, Table, Container, Button } from 'semantic-ui-react'

class EditUser extends Component {

  render() {

    // console.log('rows', rows);
      return (
          <div style={{'padding-top': '5em'}}>Welcome to the edit paeg.
     


          </div>
      )
  }
}

function mapStateToProps(state) {
  return { users: state.admin.users };
}

// export default requireAdmin(EditUser);
export default compose (connect(mapStateToProps, actions), requireAdmin)(EditUser);
