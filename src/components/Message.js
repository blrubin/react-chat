import React from 'react';

class Message extends React.Component {
  render() {

    const fromMe = this.props.fromMe ? 'from-me' : '';

    return (
      <div className={`message ${fromMe}`}>
        <div className='username'>
          { this.props.username }
        </div>
        <div className='message-body'> 
          <div className='message-content'>
            { this.props.message }
          </div>
          <div className='time-stamp'>
            { this.props.timeStamp }
          </div>
        </div>
      </div>
    );
  }
}

Message.defaultProps = {
  message: '',
  username: '',
  timeStamp: '',
  fromMe: false
};

export default Message;
