import { Component } from 'react';
import { connect } from 'react-redux';
import firebase from 'react-native-firebase';
import SplashScreen from 'react-native-splash-screen';

import { startUserListener } from '../../actions';

// used to setup everything beforet the main app loads
class AppSetup extends Component {
  componentDidMount() {
    // splash screen is already showing
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.checkUserPermissions();
        this.props.startUserListener();
        SplashScreen.hide();
        return this.props.navigation.navigate('Main');
      }
      SplashScreen.hide();
      return this.props.navigation.navigate('Login');
    });
  }

  checkUserPermissions = () => {
    const enabled = firebase.messaging().hasPermission();
    if (!enabled) {
      firebase.messaging().requestPermission()
      .then(() => {
        console.log('user granted permission');
      })
      .catch(() => {
        console.log('user rejected permission');
      });
    } else {
      console.log('user granted permission');
    }
  }

  render() {
    return null;
  }
}

const mapStateToProps = (state) => {
  let user;
  if (state.user.user) {
    user = state.user.user;
  }
  return { user };
};

const mapFunctionsToProps = {
  startUserListener,
};

export default connect(mapStateToProps, mapFunctionsToProps)(AppSetup);
