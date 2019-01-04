import React, { Component } from 'react';
import { Text, View, TouchableOpacity, Dimensions, Switch, Linking, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { logoutUser, updateUser } from '../../actions';
import { Header } from '../header';
import { Card, CardSection } from '../../lib';
import { colors } from '../../config';

const { width } = Dimensions.get('window');

class Settings extends Component {
  state = {
    chatSwitchValue: this.props.user.showChatNotification,
    classSwitchValue: this.props.user.showClassNotification,
  };

  openUrl = (url) => {
    Linking.canOpenURL(url)
    .then((supported) => {
      if (!supported) {
        return console.log('cant open url');
      }
      return Linking.openURL(url);
    }).catch(err => console.error('An error occurred', err));
  }

  render() {
    return (
      <View>
        <Header title='Settings' />
        <ScrollView>
          <Card>
            <CardSection>
              <Text style={styles.cardHeaderStyle}>
                Notification Settings
              </Text>
            </CardSection>
            <CardSection>
              <View style={{ padding: 15, paddingBottom: 0 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                  <View>
                    <Text style={styles.settingTitleStyle}>
                      Chat Notification
                    </Text>
                    <Text style={styles.settingInfoStyle}>
                      Receive notfications for incoming chats
                    </Text>
                  </View>
                  <Switch
                    value={this.state.chatSwitchValue}
                    onValueChange={(value) => {
                      this.setState({ chatSwitchValue: value });
                      this.props.updateUser({ showChatNotification: value });
                    }}
                    style={{ padding: 10 }}
                  />
                </View>
                <View style={{ width, height: 0.5, backgroundColor: '#eeeeee' }} />
              </View>
            </CardSection>
            <CardSection>
              <View style={{ padding: 15, paddingBottom: 0 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                  <View>
                    <Text style={styles.settingTitleStyle}>
                      Class Notification
                    </Text>
                    <Text style={styles.settingInfoStyle}>
                      Receive notfications for upcoming classes
                    </Text>
                  </View>
                  <Switch
                    value={this.state.classSwitchValue}
                    onValueChange={(value) => {
                      this.setState({ classSwitchValue: value });
                      this.props.updateUser({ showClassNotification: value });
                    }}
                    style={{ padding: 10 }}
                  />
                </View>
              </View>
            </CardSection>
          </Card>
          <View style={{ height: 20 }} />
          <Card>
            <CardSection>
              <Text style={styles.cardHeaderStyle}>
                Support
              </Text>
            </CardSection>
            <CardSection>
              <View style={{ padding: 15, paddingBottom: 0 }}>
                <TouchableOpacity onPress={() => this.openUrl('mailto:learnwithanchor@gmail.com')}>
                  <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <View>
                      <Text style={styles.settingTitleStyle}>
                        Contact Us
                      </Text>
                      <Text style={styles.settingInfoStyle}>
                        learnwithanchor@gmail.com
                      </Text>
                    </View>
                    <Icon style={{ padding: 15 }} name='arrow-top-right' size={24} />
                  </View>
                </TouchableOpacity>
                <View style={{ width, height: 0.5, backgroundColor: '#eeeeee' }} />
              </View>
            </CardSection>
            <CardSection>
              <View style={{ padding: 15, paddingBottom: 0 }}>
                <TouchableOpacity onPress={() => this.openUrl('https://learnwithanchor.squarespace.com')}>
                  <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <View>
                      <Text style={styles.settingTitleStyle}>
                        Help
                      </Text>
                      <Text style={styles.settingInfoStyle}>
                        Need any help? We got your back
                      </Text>
                    </View>
                    <Icon style={{ padding: 15 }} name='headset' size={24} />
                  </View>
                </TouchableOpacity>
                <View style={{ width, height: 0.5, backgroundColor: '#eeeeee' }} />
              </View>
            </CardSection>
            <CardSection>
              <View style={{ padding: 15, paddingBottom: 0 }}>
                <TouchableOpacity onPress={() => this.openUrl('http://play.google.com/store/apps/details?id=com.google.android.apps.maps')}>
                  <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <View>
                      <Text style={styles.settingTitleStyle}>
                        Rate Us
                      </Text>
                      <Text style={styles.settingInfoStyle}>
                        Help us out by rating us on the play store!
                      </Text>
                    </View>
                    <Icon style={{ padding: 15 }} name='star' size={24} />
                  </View>
                </TouchableOpacity>
                <View style={{ width, height: 0.5, backgroundColor: '#eeeeee' }} />
              </View>
            </CardSection>
          </Card>
          <View style={{ height: 20 }} />
          <TouchableOpacity activeOpacity={0.3} style={{ alignSelf: 'center', elevation: 10, padding: 10 }} onPress={this.props.logoutUser.bind(this)}>
            <LinearGradient colors={[colors.secondary.light, colors.secondary.normal]} style={styles.logoutButtonStyle} start={{ x: 0, y: 1 }} end={{ x: 1, y: 0 }}>
              <Text style={styles.logoutTextStyle}>
                Logout
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        </ScrollView>
      </View>
    );
  }
}

const styles = {
  logoutTextStyle: {
    fontSize: 17,
    color: 'white',
    fontFamily: 'AvenirLTStd-Heavy',
    paddingBottom: 5,
  },
  logoutButtonStyle: {
    width: 0.96 * width,
    height: 55,
    borderRadius: 37.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardHeaderStyle: {
    padding: 15,
    fontFamily: 'AvenirLTStd-Heavy',
    fontSize: 17,
    color: 'black',
  },
  settingTitleStyle: {
    color: 'black',
    paddingBottom: 5,
    fontFamily: 'AvenirLTStd-Medium',
    fontSize: 15,
  },
  settingInfoStyle: {
    fontSize: 13,
  },
};

const mapStateToProps = (state) => {
  let user;
  if (state.user.user) {
    user = state.user.user;
  }
  return { user };
};

export default connect(mapStateToProps, { logoutUser, updateUser })(Settings);
