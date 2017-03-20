require('../styles/ChatApp.css');

import React from 'react';
import io from 'socket.io-client';
import config from '../config';

import Users from './Users';
import Messages from './Messages';
import ChatInput from './ChatInput';

class ChatApp extends React.Component {
  socket = {};
  constructor(props) {
    super(props);
    this.state = { messages: [], users: []};
    this.handleSendMessage = this.handleSendMessage.bind(this);

    this.socket = io(config.api, { query: `username=${props.username}` }).connect();

    this.socket.on('server:message', message => {
      this.addMessageToList(message);
    });

    this.socket.on('server:usersupdated', onlineUsers => {
      this.updateUsers(onlineUsers);
    });
  }

  handleSendMessage(message, timeStamp) {
    const messageObject = {
      username: this.props.username,
      timeStamp: timeStamp,
      message
    };
    this.socket.emit('client:message', messageObject);

    messageObject.fromMe = true;
    this.addMessageToList(messageObject);
  }

  addMessageToList(message) {
    const messages = this.state.messages;
    messages.push(message);
    this.setState({ messages });
  }

  updateUsers(onlineUsers) {
    const users = onlineUsers;
    this.setState({ users: users });
  }

  render() {
    return (
      <div className="container">
        <h3>Chat</h3>
        <Users users={this.state.users} />
        <Messages messages={this.state.messages} />
        <ChatInput onSend={this.handleSendMessage} />
      </div>
    );
  }

}
ChatApp.defaultProps = {
  username: 'Anonymous'
};

export default ChatApp;
