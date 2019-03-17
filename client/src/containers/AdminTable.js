import React, { Component } from 'react';
import requireAuth from './requireAuth';
import requireAdmin from './requireAdmin';
import { connect } from 'react-redux';
import { compose } from 'redux';
import * as actions from '../actions';
import { Icon, Label, Menu, Table, Container, Button } from 'semantic-ui-react'

const TableExamplePagination = () => (
    <Container>
        <Table celled>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Employee ID</Table.HeaderCell>
          <Table.HeaderCell>Employee Name</Table.HeaderCell>
          <Table.HeaderCell>Header</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
  
      <Table.Body>
        <Table.Row>
          <Table.Cell>
            <Label ribbon>First</Label>
          </Table.Cell>
          <Table.Cell>Cell</Table.Cell>
          <Table.Cell>Cell</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>Cell</Table.Cell>
          <Table.Cell>Cell</Table.Cell>
          <Table.Cell>Cell</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>Cell</Table.Cell>
          <Table.Cell>Cell</Table.Cell>
          <Table.Cell>Cell</Table.Cell>
        </Table.Row>
      </Table.Body>
  
      <Table.Footer>
        <Table.Row>
          <Table.HeaderCell colSpan='3'>
            <Menu floated='right' pagination>
              <Menu.Item as='a' icon>
                <Icon name='chevron left' />
              </Menu.Item>
              <Menu.Item as='a'>1</Menu.Item>
              <Menu.Item as='a'>2</Menu.Item>
              <Menu.Item as='a'>3</Menu.Item>
              <Menu.Item as='a'>4</Menu.Item>
              <Menu.Item as='a' icon>
                <Icon name='chevron right' />
              </Menu.Item>
            </Menu>
          </Table.HeaderCell>
        </Table.Row>
      </Table.Footer>
    </Table>
    </Container>
  )

class AdminTable extends Component {

  componentDidMount() {
    this.props.getEmployee();
  }
  render() {

    const rows = this.props.users.map(user => {
      const { user_id, email, first_name, last_name, region_id } = user;
      console.log(user_id, email, first_name, last_name, region_id);
      return (
        <Table.Row>
          <Table.Cell>{user_id}</Table.Cell>
          <Table.Cell>{email}</Table.Cell>
          <Table.Cell>{first_name === null ? 'None' : first_name} </Table.Cell>
          <Table.Cell>{last_name === null ? 'None' : last_name} </Table.Cell>
          <Table.Cell>{region_id} </Table.Cell>
          <Table.Cell>
            <Button primary>Edit</Button>
            <Button negative>Delete</Button>
          </Table.Cell>
        </Table.Row>
      )
    })
    console.log('rows', rows);
    console.log('props', this.props);
      return (
          <div style={{'padding-top': '5em'}}>Welcome to the admin table.
     

            <Container>
                <Table celled>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Employee ID</Table.HeaderCell>
                  <Table.HeaderCell>First Name</Table.HeaderCell>
                  <Table.HeaderCell>Last Name</Table.HeaderCell>
                  <Table.HeaderCell>Region</Table.HeaderCell>
                  <Table.HeaderCell>Admin</Table.HeaderCell>
                  <Table.HeaderCell>Operation</Table.HeaderCell>
                </Table.Row>
              </Table.Header>
          
              <Table.Body>
                {rows}
              </Table.Body>
          
              <Table.Footer>
                <Table.Row>
                  <Table.HeaderCell colSpan='6'>
                    <Menu floated='right' pagination>
                      <Menu.Item as='a' icon>
                        <Icon name='chevron left' />
                      </Menu.Item>
                      <Menu.Item as='a'>1</Menu.Item>
                      <Menu.Item as='a'>2</Menu.Item>
                      <Menu.Item as='a'>3</Menu.Item>
                      <Menu.Item as='a'>4</Menu.Item>
                      <Menu.Item as='a' icon>
                        <Icon name='chevron right' />
                      </Menu.Item>
                    </Menu>
                  </Table.HeaderCell>
                </Table.Row>
              </Table.Footer>
            </Table>
            </Container>


          </div>
      )
  }
}

function mapStateToProps(state) {
  return { users: state.admin.users };
}

// export default requireAdmin(AdminTable);
export default compose (connect(mapStateToProps, actions), requireAdmin)(AdminTable);
