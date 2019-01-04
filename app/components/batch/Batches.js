import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';

import { Header } from '../header';
import { FAB } from '../../lib/FAB';


class Batches extends Component {
  navigateProfile = () => {
    this.props.navigation.navigate('TeacherProfile', { action: 'account-settings-variant' });
  }

  navigateChat = () => {
    this.props.navigation.navigate('ChatsOverview');
  }

  addBatch = () => {
    this.props.navigation.navigate('BatchSettings');
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Header title='Home' onPressProfile={this.navigateProfile} onPressChat={() => this.navigateChat()} mainButtons />
        <FAB icon='add' onPress={this.addBatch} />
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  let user;
  if (state.user.user) {
    user = state.user.user;
  }
  return { user };
};

export default connect(mapStateToProps)(Batches);
