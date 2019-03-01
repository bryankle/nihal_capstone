import React, { Component } from 'react';
import requireAuth from './requireAuth';
import requireAdmin from './requireAdmin';
import { Icon, Label, Menu, Table, Container } from 'semantic-ui-react'

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
    render() {
        return (
            <div style={{'padding-top': '5em'}}>Welcome to the admin table.
        <TableExamplePagination />

            </div>
        )
    }
}

export default requireAdmin(AdminTable);