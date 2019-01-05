import React, { Component } from 'react';
import { Dimensions, Image, View } from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { TouchableDebounce } from '../../lib/';

const { width } = Dimensions.get('window');

class HeaderProfileButton extends Component {
  renderProfile = () => {
    if (this.props.photoURL != null) {
      return <Image style={styles.profileStyle} source={{ uri: this.props.photoURL }} />;
    }
    return <Icon name='account-circle' color='white' size={24} />;
  }

  render() {
    return (
      <TouchableDebounce onPress={this.props.onPress}>
        <View>
          {this.renderProfile()}
        </View>
      </TouchableDebounce>
    );
  }
}

const styles = {
  profileStyle: {
    width: 0.07 * width,
    height: 0.07 * width,
    borderRadius: (0.07 * width) / 2,
    paddingLeft: 5,
    paddingRight: 5,
  },
};

const mapStateToProps = (state) => {
  let photoURL;
  if (state.user.user) {
    photoURL = state.user.user.photoURL;
  }
  return { photoURL };
};

export default connect(mapStateToProps)(HeaderProfileButton);
