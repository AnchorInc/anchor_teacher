import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';

import { colors } from '../config';

const { width } = Dimensions.get('window');

const ListDetail = ({ title, value, children }) => {
  return (
    <View style={styles.containerStyle}>
      <Text style={styles.titleTextStyle}>
        {title}
      </Text>
      <Text style={styles.valueTextStyle}>
        {value}
      </Text>
      {children}
      <View style={{ width, height: StyleSheet.hairlineWidth, backgroundColor: '#b5b5b5' }} />
    </View>
  );
};

const styles = {
  titleTextStyle: {
    fontFamily: 'AvenirLTStd-Heavy',
    fontSize: 14,
    paddingBottom: 5,
    color: colors.primary.light,
  },
  valueTextStyle: {
    fontFamily: 'AvenirLTStd-Medium',
    fontSize: 16,
    color: 'black',
    paddingBottom: 4,
  },
  containerStyle: {
    padding: 10,
    paddingLeft: 15,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
};

export { ListDetail };
