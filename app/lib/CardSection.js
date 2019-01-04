import React from 'react';
import { View } from 'react-native';

const CardSection = ({ children }) => {
  return (
    <View style={styles.sectionStyle}>
      { children }
    </View>
  );
};

const styles = {
  sectionStyle: {
    backgroundColor: 'white',
    justifyContent: 'flex-start',
    flexDirection: 'column',
    position: 'relative',
  },
};

export { CardSection };
