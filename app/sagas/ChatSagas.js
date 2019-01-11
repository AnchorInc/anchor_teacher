import firebase from 'react-native-firebase';
import { eventChannel } from 'redux-saga';
import {
  put,
  takeLatest,
  all,
  call,
  cancel,
  take,
  takeEvery,
} from 'redux-saga/effects';

import { actionTypes } from '../config';
import { syncMessages, syncChats, createChat } from '../actions';


function* messageListenerSaga(action) {
  const chatId = yield call(getChatId, action);

  const ref = firebase.firestore().collection('conversations').doc(chatId).collection('messages')
  .orderBy('timeStamp');

  const channel = yield call(messagesEventListener, ref);
  while (firebase.auth().currentUser) {
    const messages = yield take(channel);

    // if there are no messages then create a new chat
    if (messages.length === 0) {
      yield put(createChat(action));
    }

    // update the redux store
    yield put(syncMessages(messages));
  }
  channel.close();
}

// gets all the chats for the user
function* chatListenerSaga() {
  const ref = firebase.firestore();
  if (!ref) yield cancel();

  const channel = yield call(chatEventListener, ref);

  while (firebase.auth().currentUser) {
    // get the data emitted from the channel
    const chats = yield take(channel);
    yield put(syncChats(chats));
  }
  channel.close();
}

function createChatSaga(action) {
  const ref = firebase.firestore().collection('conversations');

  firebase.firestore().collection('teachers')
  .doc(action.teacherUID).onSnapshot((snapshot) => {
    ref.add({
      teacherId: action.teacherUID,
      teacherName: snapshot.data().displayName,
      teacherPhotoURL: snapshot.data().photoURL,
      studentId: firebase.auth().currentUser.uid,
      studentName: firebase.auth().currentUser.displayName,
      studentPhotoURL: firebase.auth().currentUser.photoURL,
    });
  });
}

function* deleteChatSaga(action) {
  const ref = firebase.firestore().collection('conversations')
  .where('teacherId', '==', firebase.auth().currentUser.uid)
  .where('studentId', '==', action.studentUID);
  const docs = (yield call([ref, ref.get])).docs;

  yield all(docs.map(doc => call([doc.ref, doc.ref.delete])));
}

function* updateMessagesSaga(action) {
  const chatId = yield call(getChatId, action);

  if (chatId) {
    const messageRef = firebase.firestore().collection('conversations').doc(chatId).collection('messages');
    yield call([messageRef, messageRef.add], action.chat);

    const latestMessageRef = firebase.firestore().collection('conversations').doc(chatId);
    yield call([latestMessageRef, latestMessageRef.update], { latestMessage: action.chat });
  } else {
    const ref = firebase.firestore().collection('conversations').doc();
    yield call([firebase.firestore(), firebase.firestore().runTransaction], async (transaction) => {
      transaction.set(ref, {
        studentId: action.studentUID,
        teacherId: firebase.auth().currentUser.uid,
      });
      transaction.set(ref.collection('messages').doc(), action.chat);
    });
  }
}

function* getChatId(action) {
  const ref = firebase.firestore().collection('conversations')
  .where('teacherId', '==', firebase.auth().currentUser.uid)
  .where('studentId', '==', action.studentUID);

  const docs = yield call([ref, ref.get]);
  let chatId;

  docs.forEach((doc) => {
    chatId = doc.id;
  });

  return chatId;
}

const chatEventListener = (ref) => {
  const channel = eventChannel((emitter) => {
    return ref.collection('conversations')
    .where('teacherId', '==', firebase.auth().currentUser.uid)
    .onSnapshot((snapshot) => {
      const chats = [];
      snapshot.docChanges.forEach((change) => {
        const chat = change.doc.data();
        chats.push(chat);
      });
      emitter(chats);
    });
  });
  return channel;
};

const messagesEventListener = (ref) => {
  const channel = eventChannel((emitter) => {
    return ref.onSnapshot((snapshot) => {
      const messages = [];
      snapshot.docChanges.forEach((change) => {
        messages.push(change.doc.data());
      });
      emitter(messages);
    });
  });
  return channel;
};

export function* watchChatRequests() {
  yield all([
    takeLatest(actionTypes.MESSAGE.GET, messageListenerSaga),
    takeEvery(actionTypes.MESSAGE.UPDATE, updateMessagesSaga),
    takeLatest(actionTypes.CHAT.GET, chatListenerSaga),
    takeEvery(actionTypes.CHAT.CREATE, createChatSaga),
    takeEvery(actionTypes.CHAT.DELETE, deleteChatSaga),
  ]);
}
