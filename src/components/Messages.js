import React from 'react';

import Message from './Message';

class Messages extends React.Component {

  componentDidUpdate() {
    const messagesContainer = document.getElementById('messages');
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }

  render() {
    const messages = this.props.messages.map((message, i) => {
      return (
        <Message
          key={i}
          username={message.username}
          message={message.message}
          fromMe={message.fromMe} />
      );
    });
    return (
      <div className='messages' id='messages'>
        { messages }
      </div>
    );
  }
}

Messages.defaultProps = {
  messages: []
};

export default Messages;
