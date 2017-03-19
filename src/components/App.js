require('../styles/App.css');
require('../styles/Login.css');

import React from 'react';
import ChatApp from './ChatApp';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = { username = '' };

    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handleUsernameSubmit = this.handleUsernameSubmit.bind(this);
  }

  handleUsernameChange(e) {
    this.setState({ username: e.target.value });
  }

  handleUsernameSubmit(e) {
    e.preventDefault();
    this.setState({ submitted: true, username: this.state.username });
  }

  render() {
    if(this.state.submitted) {
      return (
        <ChatApp username={this.state.username} />
      );
    }
    return (
      <form onSubmit={this.handleUsernameSubmit} className="username-container">
        <h1>Chat</h1>
        <div>
          <input
            type="text"
            onChange={this.handleUsernameChange}
            placeholder="Choose a username..."
            required />
        </div>
        <input type="submit" value="Sign in" />
      </form>
    );
  }

}
App.defaultProps = {
};

export default App;
