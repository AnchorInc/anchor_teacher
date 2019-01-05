import firebase from 'react-native-firebase';

// setup channel for misc notifications
const miscChannel = new firebase.notifications.Android.Channel('misc_channel', 'Misc Channel', firebase.notifications.Android.Importance.Max);
miscChannel
.setShowBadge(true)
.setSound('5');

// setup channel for chat notifications
const chatChannel = new firebase.notifications.Android.Channel('chat_channel', 'Chat Channel', firebase.notifications.Android.Importance.Max);
chatChannel
.setShowBadge(true)
.setSound('10');

// create the channels and connect to firebase
firebase.notifications().android.createChannels([miscChannel, chatChannel]);
