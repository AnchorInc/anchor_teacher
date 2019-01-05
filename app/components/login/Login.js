import React, { Component } from 'react';
import { View, Text, StatusBar, Dimensions, Image } from 'react-native';
import { connect } from 'react-redux';
import DialogBox from 'react-native-dialogbox';
import LinearGradient from 'react-native-linear-gradient';

import { colors } from '../../config';
import {
  googleLoginRequest,
  fbLoginRequest,
  closeErrorMessage,
  showErrorMessage,
  resetLogin,
} from '../../actions';
import { LoginButton } from './';
import { Spinner } from '../../lib';

import logo from '../../images/logo.png';

const { width, height } = Dimensions.get('window');

class Login extends Component {
  showErrorMessage = () => {
    if (this.props.loginFail) {
      this.dialogbox.tip({
        title: 'Error',
        content: this.props.message,
        style: {
            textColor: colors.primary.normal,
        },
      }).then(() => this.closeErrorMessage());
    }
  }

  closeErrorMessage = () => {
    this.props.resetLogin();
    this.props.closeErrorMessage();
  }

  renderPickerCarousel = ({ item }) => {
    return (
      <Text style={{ alignSelf: 'center', paddingTop: 10, textAlign: 'center', fontSize: 14, fontFamily: 'AvenirLTStd-Heavy', color: '#757575' }}>
        {item.toUpperCase()}
      </Text>
    );
  }

  render() {
    const {
      loginContainerStyle,
      containerStyle,
      logoStyle,
    } = styles;
    return (
      <View style={{ flex: 1 }}>
        {this.showErrorMessage()}
        <StatusBar />
        <View style={containerStyle}>
          <Image
            style={logoStyle}
            source={logo}
            resizeMode='contain'
          />
        </View>
        <View style={{ backgroundColor: 'white', flex: 1.5, justifyContent: 'space-around' }}>
          <View style={loginContainerStyle}>
            <LoginButton title='Sign in with Facebook' iconName='facebook' onPress={this.props.fbLoginRequest} />
            <LoginButton title='Sign in with Google' iconName='google' onPress={this.props.googleLoginRequest} />
          </View>
        </View>
        <Spinner visible={this.props.loading} title='Authenticating' />
        <DialogBox ref={(dialogbox) => { this.dialogbox = dialogbox; }} />
      </View>
    );
  }
}

const styles = {
  containerStyle: {
    flex: 2,
    justifyContent: 'center',
    backgroundColor: colors.primary.normal,
  },
  loginContainerStyle: {
    alignItems: 'center',
  },
  logoStyle: {
    alignSelf: 'center',
    width: 0.5 * width,
    height: 0.6 * height,
  },
};

const mapStateToProps = (state) => {
  return {
    errorMessage: state.global.errorMessage,
    error: state.global.error,
    loginFail: state.auth.loginFail,
    loading: state.auth.loading,
    message: state.auth.message,
  };
};

export default connect(mapStateToProps, { googleLoginRequest, fbLoginRequest, closeErrorMessage, showErrorMessage, resetLogin })(Login);
