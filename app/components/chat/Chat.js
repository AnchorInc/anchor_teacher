import React, { Component } from 'react';
import { View, FlatList, Platform } from 'react-native';
import { connect } from 'react-redux';
import AndroidKeyboardAdjust from 'react-native-android-keyboard-adjust';

import { Header } from '../header';
import { updateMessages, getMessages, hideChatBadge } from '../../actions';
import { ChatBubble, Input } from './';

class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      myLatestMessage: {},
      studentUID: this.props.navigation.state.params.chat.uid,
    };
    this.props.getMessages(this.state.studentUID);
  }

  componentWillMount() {
    if (Platform.OS === 'android') AndroidKeyboardAdjust.setAdjustResize();
  }

  componentDidMount() {
    if (this.props.showChatBadge) {
      this.props.hideChatBadge();
    }
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps);
    if (!nextProps.messages) return;

    if (this.state.messages.length === 0) {
      const messages = nextProps.messages.reverse();
      this.setState({ messages });
    } else {
      nextProps.messages.forEach((message) => {
        if (this.state.myLatestMessage) {
          if (new Date(message.timeStamp).getTime() !== new Date(this.state.myLatestMessage.timeStamp).getTime()) {
            this.setState({ messages: nextProps.messages.concat(this.state.messages) });
          }
        }
      });
    }
  }

  onSend = (message) => {
    const messageData = {
      text: message,
      timeStamp: new Date(),
      senderName: this.props.user.displayName,
      senderID: this.props.user.uid,
      recipientID: this.props.navigation.state.params.chat.uid,
      recipientType: 'students',
      senderImageURL: this.props.user.photoURL,
    };
    const messages = [messageData, ...this.state.messages];
    this.setState({ messages, myLatestMessage: messageData });
    this.props.updateMessages(messageData, this.state.studentUID);
  }

  renderMessages = ({ item }) => {
    return <ChatBubble message={item} />;
  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <Header title={this.props.navigation.state.params.chat.title} />
        <FlatList
          keyboardShouldPersistTaps='always'
          data={this.state.messages}
          inverted
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ backgroundColor: 'white', justifyContent: 'flex-end', flexGrow: 1 }}
          keyExtractor={() => (Math.floor((Math.random() * 100000000) + 1)).toString()}
          renderItem={this.renderMessages}
          ref={(ref) => { this.messages = ref; }}
        />
        <Input onPress={this.onSend} />
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  let user;
  let messages;
  if (state.user.user) {
    user = state.user.user;
  }
  if (state.chat.messages) {
    messages = state.chat.messages;
  }
  return { user, messages, showChatBadge: state.global.showChatBadge };
};

export default connect(mapStateToProps, { updateMessages, getMessages, hideChatBadge })(Chat);
