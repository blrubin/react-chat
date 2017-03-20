import React from 'react';

class ChatInput extends React.Component {

  constructor(props) {
    super(props);
    this.state = { chatInput: '' };

    this.handleTextChange = this.handleTextChange.bind(this);
    this.handleSubmitMessage = this.handleSubmitMessage.bind(this);
  }

  handleTextChange(e)  {
    this.setState({ chatInput: e.target.value });
  }

  handleSubmitMessage(e) {
    e.preventDefault();
    const currentTime = new Date();
    var hours = currentTime.getHours();
    const ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12 || 12;
    const minutes = ('0'+currentTime.getMinutes()).slice(-2);
    const timeStamp = hours + ':' + minutes + ' ' + ampm;
    this.props.onSend(this.state.chatInput, timeStamp);
    this.setState({ chatInput: '' });
  }

  render() {
    return (
      <form className="chat-input" onSubmit={this.handleSubmitMessage}>
        <input type="text"
          onChange={this.handleTextChange}
          value={this.state.chatInput}
          placeholder="Write a message..."
          required />
      </form>
    );
  }
}

ChatInput.defaultProps = {
};

export default ChatInput;
