import firebase from 'react-native-firebase';

<<<<<<< HEAD
=======
<<<<<<< HEAD
// setup channel for misc notifications
const miscChannel = new firebase.notifications.Android.Channel('misc_channel', 'Misc Channel', firebase.notifications.Android.Importance.Max);
miscChannel
.setShowBadge(true)
.setSound('5');

// setup channel for chat notifications
const chatChannel = new firebase.notifications.Android.Channel('chat_channel', 'Chat Channel', firebase.notifications.Android.Importance.Max);
chatChannel
=======
>>>>>>> setup
// setup channel for chat notifications
const chatChannel = new firebase.notifications.Android.Channel('chat_channel', 'Chat Channel', firebase.notifications.Android.Importance.Max);
chatChannel
.setLockScreenVisibility(firebase.notifications.Android.Visibility.Private)
<<<<<<< HEAD
=======
>>>>>>> c8ae2d4bca23f0d82a73b2e5bbce8971ba671aae
>>>>>>> setup
.setShowBadge(true)
.setSound('10');

// create the channels and connect to firebase
<<<<<<< HEAD
export const notifications = firebase.notifications().android.createChannel(chatChannel);
=======
<<<<<<< HEAD
firebase.notifications().android.createChannels([miscChannel, chatChannel]);
=======
export const notifications = firebase.notifications().android.createChannel(chatChannel);
>>>>>>> c8ae2d4bca23f0d82a73b2e5bbce8971ba671aae
>>>>>>> setup
