import React, { Component } from 'react';
import { View, Text, Image, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import moment from 'moment';

import { colors } from '../../config';
import { deleteChat } from '../../actions';

import { TouchableDebounce } from '../../lib';

const { width } = Dimensions.get('window');

class ChatDetail extends Component {
  state = { showDeleteChatModal: false };

  onLongPress = () => {
    this.setState({ showDeleteChatModal: true });
  }

  showDeleteChatModal = () => {
    if (this.state.showDeleteChatModal) {
      this.props.dialogbox.confirm({
        content: 'Delete this chat?',
        ok: {
          text: 'Yes',
          style: {
            color: colors.secondary.normal,
          },
          callback: () => {
            this.props.deleteChat(this.props.studentUID);
          },
        },
        cancel: {
          text: 'No',
          style: {
            color: colors.secondary.normal,
          },
        },
      }).then(() => this.setState({ showDeleteChatModal: false }));
    }
  }

  render() {
    console.log(this.props);
    return (
        <TouchableDebounce onPress={this.props.onPress} onLongPress={() => this.onLongPress()}>
          {this.showDeleteChatModal()}
          <View style={{ flexDirection: 'row', padding: 20, paddingRight: 10, alignItems: 'center' }}>
            <Image style={styles.profileStyle} source={{ uri: this.props.imageURL }} />
            <View style={{ flexDirection: 'column', width: 0.8 * width }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: 0.8 * width }}>
                <View style={{ flexDirection: 'row' }}>
                  <Text style={{ fontFamily: 'AvenirLTStd-Heavy', color: this.props.unread ? 'black' : '#7f7f7f', fontSize: 18, padding: 10, paddingBottom: 0 }}>
                    {this.props.displayName}
                  </Text>
                  <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: this.props.unread ? colors.secondary.blue : 'white', top: 18 }} />
                </View>
                <Text style={styles.timeStyle}>
                  {moment(this.props.timeStamp.toDate()).format('LT')}
                </Text>
              </View>
              <Text style={styles.messageStyle} numberOfLines={1}>
                {this.props.text}
              </Text>
            </View>
          </View>
          <View style={{ paddingLeft: 20 }}>
            <View style={{ width, height: 0.5, backgroundColor: '#eeeeee' }} />
          </View>
        </TouchableDebounce>
    );
  }
}

const styles = {
  profileStyle: {
    width: 0.13 * width,
    height: 0.13 * width,
    borderRadius: (0.13 * width) / 2,
  },
  timeStyle: {
    fontFamily: 'AvenirLTStd-Light',
    color: colors.other.darkGray,
    fontSize: 14,
    padding: 10,
    paddingBottom: 0,
  },
  messageStyle: {
    fontFamily: 'AvenirLTStd-Book',
    color: 'black',
    fontSize: 16,
    padding: 10,
    paddingTop: 5,
  },
};

export default connect(null, { deleteChat })(ChatDetail);
