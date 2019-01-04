import React from 'react';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { colors } from '../config';

const FAB = ({ icon, onPress }) => {
  return (
    <TouchableOpacity style={styles.buttonStyle} onPress={onPress}>
      <Icon color='white' name={icon} size={24} />
    </TouchableOpacity>
  );
};

const styles = {
  buttonStyle: {
    backgroundColor: colors.secondary.normal,
    width: 56, // Follow Material Design Guidelines
    height: 56, // Follow Material Design Guidelines
    borderRadius: 29,
    elevation: 5,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-end',
    position: 'absolute',
    bottom: 16, // Follow Material Design Guidelines
    right: 16, // Follow Material Design Guidelines
    flexDirection: 'row',
  },
};

export { FAB };
