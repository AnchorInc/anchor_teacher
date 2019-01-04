import React, { Component } from 'react';
import { View, Text, TouchableWithoutFeedback } from 'react-native';
import { connect } from 'react-redux';
import moment from 'moment';

import { colors } from '../../config';

class ChatBubble extends Component {
  getDirection = () => {
    return (this.props.message.senderID === this.props.user.uid) ? 'right' : 'left';
  }

  render() {
    return (
      <TouchableWithoutFeedback onPress={this.props.onPress}>
        <View style={styles[this.getDirection()].container}>
          <View style={styles.topContainerStyle}>
            <Text style={styles[this.getDirection()].infoStyle}>
              {this.props.message.senderName}
            </Text>
            <Text style={styles[this.getDirection()].infoStyle}>
              {moment(this.props.message.timeStamp).format('LT')}
            </Text>
          </View>
          <Text style={styles[this.getDirection()].message}>
            {this.props.message.text}
          </Text>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = {
  left: {
    container: {
      borderRadius: 20,
      borderBottomLeftRadius: 0,
      marginTop: 8,
      marginRight: 130,
      marginLeft: 10,
      paddingHorizontal: 10,
      paddingVertical: 5,
      alignSelf: 'flex-start',
      backgroundColor: colors.other.chatBubble,
    },
    message: {
      color: 'black',
      padding: 10,
      paddingTop: 5,
      fontFamily: 'AvenirLTStd-Roman',
      fontSize: 16,
    },
    infoStyle: {
      color: 'black',
      padding: 10,
      paddingBottom: 0,
      fontSize: 12,
      fontFamily: 'AvenirLTStd-Light',
    },
  },
  right: {
    container: {
      borderRadius: 20,
      borderBottomRightRadius: 0,
      marginTop: 8,
      marginRight: 10,
      marginLeft: 130,
      paddingHorizontal: 10,
      paddingVertical: 5,
      alignSelf: 'flex-end',
      backgroundColor: colors.primary.light,
    },
    message: {
      color: 'white',
      padding: 10,
      paddingTop: 5,
      fontFamily: 'AvenirLTStd-Roman',
      fontSize: 16,
    },
    infoStyle: {
      color: 'white',
      padding: 10,
      paddingBottom: 0,
      fontSize: 12,
      fontFamily: 'AvenirLTStd-Light',
    },
  },
  topContainerStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
};

const mapStateToProps = (state) => {
  let user;
  if (state.user.user) {
    user = state.user.user;
  }
  return { user };
};

export default connect(mapStateToProps)(ChatBubble);
