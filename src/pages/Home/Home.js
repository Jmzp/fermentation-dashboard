import React from 'react';
import { Table } from 'react-bootstrap';
import { createUseStyles } from 'react-jss';
import { observer } from 'mobx-react';

const useStyles = createUseStyles({
  myLabel: {
    fontFamily: 'Poppins Regular',
  },
});

export const Home = () => {
  const classes = useStyles();
  return (
    <Table striped bordered hover size="sm">
      <thead>
        <tr>
          <th>#</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Username</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>1</td>
          <td className={classes.myLabel}>Mark</td>
          <td>Otto</td>
          <td>@mdo</td>
        </tr>
        <tr>
          <td>2</td>
          <td>Jacob</td>
          <td>Thornton</td>
          <td>@fat</td>
        </tr>
        <tr>
          <td>3</td>
          <td colSpan="2">Larry the Bird</td>
          <td>@twitter</td>
        </tr>
      </tbody>
    </Table>
  );
};

export default observer(Home);
