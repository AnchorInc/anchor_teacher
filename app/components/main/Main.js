import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import firebase from 'react-native-firebase';

import { showChatBadge } from '../../actions';
import { NavStackContainer } from '../../navigation/Router';

class Main extends Component {
  componentDidMount() {
    // called when the notification is tapped and the app is in the background
    this.onNotificationOpened = firebase.notifications().onNotificationOpened((notificationOpen) => {
      const { title, senderID, screen } = notificationOpen.notification.data;
      this.openScreen(screen, { uid: senderID, title });
    });

    // called when the app is opened by a notification tap
    firebase.notifications().getInitialNotification()
    .then((notificationOpen) => {
      if (!notificationOpen) return;

      console.log('opened by a notification');
      const { title, senderID, screen } = notificationOpen.notification.data;
      this.openScreen(screen, { uid: senderID, title });
      firebase.notifications().removeAllDeliveredNotifications();
    });

    // listens for messages
    this.onMessage = firebase.messaging().onMessage((message) => {
      console.log(message);
      this.props.showChatBadge();
    });
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.donePref) {
      this.props.navigation.navigate('TeacherProfileEditing');
    }
  }

  componentWillUnmount() {
    this.onNotificationOpened();
    this.onMessage();
  }

  openScreen = (screen, data) => {
    console.log(data);
    if (data) {
      return this.props.navigation.navigate(screen, { chat: data });
    }
    return this.props.navigation.navigate(screen);
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <NavStackContainer />
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  let donePref;
  if (state.user.user) {
    donePref = state.user.user.donePref;
  }
  return { donePref };
};

export default connect(mapStateToProps, { showChatBadge })(Main);
