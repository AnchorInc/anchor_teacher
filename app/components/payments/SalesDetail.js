import React, { Component } from 'react';
import { Text, Dimensions, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import { colors } from '../../config';
import { Card } from '../../lib';

const { width } = Dimensions.get('window');

class SalesDetail extends Component {
  _onPressMore = () => {
    console.log('pressed!');
  }

  render() {
    return (
    <TouchableOpacity style={{ padding: 10, elevation: 5 }} activeOpacity={0.3} onPress={() => this._onPressMore()}>
        <LinearGradient colors={[colors.secondary.light, colors.secondary.normal]} style={styles.detailButtonStyle} start={{ x: 0, y: 1 }} end={{ x: 1, y: 0 }}>
            <Text style={styles.textStyle}>
                Monthly Sales: ₹2.7 Lakhs
            </Text>
        </LinearGradient>
    </TouchableOpacity>
    );
  }
}

const styles = {
  textStyle: {
    fontSize: 16,
    color: 'white',
    fontFamily: 'AvenirLTStd-Heavy',
    padding: 5,
  },
  detailButtonStyle: {
    width: 0.96 * width,
    borderRadius: (0.96 * width) / 2,
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
  },
};

export { SalesDetail };
