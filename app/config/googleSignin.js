import { GoogleSignin } from 'react-native-google-signin';
import { gsigninConfig } from './';

// google sign in config
export default GoogleSignin.configure({
  webClientId: gsigninConfig.webClientId,
  forceConsentPrompt: true,
  iosClientId: gsigninConfig.iosClientId,
});
