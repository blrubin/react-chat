import React from 'react';

class Users extends React.Component {

  render() {
    const users = this.props.users.map((user, i) => {
      return (
        <li key={i}>
          {user}
        </li>
      );
    });
    return (
      <ul className='user-list' id='user-list'>
        { users }
      </ul>
    );
  }
}

Users.defaultProps = {
  users: []
};

export default Users;
