import React, { Component } from 'react';
import { View, Text, Dimensions, Platform, StatusBar } from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { colors } from '../../config/';
import { HeaderProfileButton } from './';
import { TouchableDebounce } from '../../lib';

const { width, height } = Dimensions.get('window');

class Header extends Component {
  handleChangeText = () => {
    this.props.handleChangeText(this.searchBar.getValue());
  }

  renderChatButton() {
    if (this.props.showChatBadge) {
      return (
        <TouchableDebounce onPress={this.props.onPressChat}>
          <Icon name='forum' color='white' size={24} style={{ paddingRight: 20 }} />
          <Icon
            name='circle'
            color={colors.secondary.normal}
            size={12}
            style={{ position: 'absolute', paddingLeft: 15, paddingTop: 12 }}
          />
        </TouchableDebounce>
      );
    }
    return (
      <TouchableDebounce onPress={this.props.onPressChat}>
        <Icon name='forum' color='white' size={24} style={{ paddingRight: 20 }} />
      </TouchableDebounce>
    );
  }

  renderButtons = () => {
    if (!this.props.mainButtons) {
      return null;
    }
    return (
      <View style={styles.buttonContainerStyle}>
        {this.renderChatButton()}
        <HeaderProfileButton onPress={this.props.onPressProfile} />
      </View>
    );
  }

  renderTitle = () => {
    return (
      <Text style={styles.headerStyle}>
        {this.props.title}
      </Text>
    );
  }

  renderHeader = () => {
    return (
      <View
        style={styles.normalContainerStyle}
        backgroundColor={colors.primary.normal}
      >
        {this.renderTitle()}
        {this.renderButtons()}
      </View>
    );
  }

  render() {
    return (
      <View>
        <StatusBar />
        {this.renderHeader()}
      </View>
    );
  }
}

const styles = {
  normalContainerStyle: {
    justifyContent: 'space-between',
    height: 64,
    marginTop: (Platform.OS === 'ios') ? height * 0.03 : 0,
    flexDirection: 'row',
  },
  headerStyle: {
    fontSize: 20,
    fontFamily: 'AvenirLTStd-Heavy',
    color: 'white',
    paddingLeft: 0.05 * width,
    alignSelf: 'center',
  },
  buttonContainerStyle: {
    paddingRight: 0.05 * width,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignSelf: 'center',
  },
};

const mapStateToProps = (state) => {
  return { showChatBadge: state.global.showChatBadge };
};

export default connect(mapStateToProps)(Header);
