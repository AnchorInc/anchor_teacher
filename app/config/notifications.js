import firebase from 'react-native-firebase';

// setup channel for chat notifications
const chatChannel = new firebase.notifications.Android.Channel('chat_channel', 'Chat Channel', firebase.notifications.Android.Importance.Max);
chatChannel
.setLockScreenVisibility(firebase.notifications.Android.Visibility.Private)
.setShowBadge(true)
.setSound('10');

// create the channels and connect to firebase
export const notifications = firebase.notifications().android.createChannel(chatChannel);
