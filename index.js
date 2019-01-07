import { AppRegistry, Platform } from 'react-native';
import App from './app/index';
import { name as appName } from './app.json';
import { backgroundMessageListener, backgroundActionHandler } from './app/cloudmessaging';

AppRegistry.registerComponent(appName, () => App);
if (Platform.OS === 'android') {
  AppRegistry.registerHeadlessTask('RNFirebaseBackgroundMessage', () => backgroundMessageListener);
  AppRegistry.registerHeadlessTask('RNFirebaseBackgroundNotificationAction', () => backgroundActionHandler);
}
