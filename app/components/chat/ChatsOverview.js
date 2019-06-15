import React, { Component } from 'react';
import { View, FlatList, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import DialogBox from 'react-native-dialogbox';

import { ChatDetail } from '.';
import { getChats, hideChatBadge } from '../../actions';
import { Header } from '../header';

const { width, height } = Dimensions.get('window');

class ChatsOverview extends Component {
  constructor(props) {
    super(props);
    this.state = { chats: [] };

    this.props.getChats(this.props.user.uid);
  }

  componentDidMount() {
    if (this.props.showChatBadge) {
      this.props.hideChatBadge();
    }
  }

  componentWillReceiveProps(nextProps) {
    if ((this.state.chats.length === 0) && nextProps.chats) {
      this.state.chats = nextProps.chats;
      this.state.chats.sort((x, y) => { return y.latestMessage.timeStamp - x.latestMessage.timeStamp; });
    } else {
      this.state.chats.forEach((chat) => {
        if (chat.studentId === nextProps.chats[0].studentId) {
          const index = this.state.chats.indexOf(chat);
          this.state.chats[index] = nextProps.chats[0];
          this.state.chats.sort((x, y) => { return y.latestMessage.timeStamp - x.latestMessage.timeStamp; });
        }
      });
    }
  }

  navigateChatScreen = (chat) => {
    this.props.navigation.navigate('Chat', { chat });
  }

  renderChats = ({ item }) => {
    return (
      <ChatDetail
        displayName={item.studentName}
        dialogbox={this.dialogbox}
        imageURL={item.studentPhotoURL}
        text={item.latestMessage.text}
        timeStamp={item.latestMessage.timeStamp}
        unread={item.latestMessage.unread}
        teacherUID={this.props.user.uid}
        studentUID={item.studentId}
        onPress={() => {
          const chat = {
            uid: item.studentId,
            title: item.studentName,
          };
          this.navigateChatScreen(chat);
        }}
      />
    );
  }

  render() {
    return (
      <View style={{ backgroundColor: 'white', width, height }}>
        <Header title='Chats' />
        <FlatList
          data={this.state.chats}
          renderItem={this.renderChats}
          keyExtractor={() => (Math.floor((Math.random() * 100000000) + 1)).toString()}
          contentContainerStyle={{ flex: 1, backgroundColor: 'white' }}
        />
        <DialogBox ref={(dialogbox) => { this.dialogbox = dialogbox; }} />
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  let user;
  let chats;
  if (state.user.user) {
    user = state.user.user;
  }
  if (state.chat.chats) {
    chats = state.chat.chats;
  }
  return { user, chats, showChatBadge: state.global.showChatBadge };
};

export default connect(mapStateToProps, { getChats, hideChatBadge })(ChatsOverview);
