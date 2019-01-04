import React from 'react';
import { Text, TouchableOpacity, View, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';

import { colors } from '../../config';

const { width } = Dimensions.get('window');

const LoginButton = (props) => {
  const { logoutButtonStyle, textStyle, iconStyle } = styles;

  return (
    <TouchableOpacity activeOpacity={0.3} style={{ alignSelf: 'center', elevation: 10, paddingTop: 0, paddingBottom: 20 }} onPress={props.onPress}>
      <LinearGradient colors={[colors.secondary.light, colors.secondary.normal]} style={logoutButtonStyle} start={{ x: 0, y: 1 }} end={{ x: 1, y: 0 }}>
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <Icon name={props.iconName} style={iconStyle} />
      </View>
      <View style={{ flex: 2, justifyContent: 'center' }}>
        <Text style={textStyle}>{props.title}</Text>
      </View>
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = {
  logoutButtonStyle: {
    flexDirection: 'row',
    width: 0.96 * width,
    height: 55,
    borderRadius: 37.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textStyle: {
    color: 'white',
    fontSize: 15,
    paddingRight: 40,
  },
  iconStyle: {
    fontSize: 35,
    color: 'white',
    paddingLeft: 20,
    paddingTop: 10,
    paddingBottom: 10,
  },
};

export { LoginButton };
