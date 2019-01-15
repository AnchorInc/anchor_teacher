import React, { Component } from 'react';
import { Text, View, Dimensions, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import { colors } from '../../config';
import { Card, CardSection } from '../../lib';

const { width } = Dimensions.get('window');

class PaymentDetail extends Component {
  _onPressMore = () => {
    console.log('pressed!');
  }

  render() {
    return (
    <Card style={{ flex: 1, flexDirection: 'row' }}>
        <CardSection>
            <View style={{ padding: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <View>
                <Text style={[styles.textStyle, { fontFamily: 'AvenirLTStd-Heavy' }]}>11th Grade IB Math HL</Text>
              </View>
              <View style={styles.viewStyle}>
                <Text style={styles.classNumberStyle}>₹835</Text>
              </View>
            </View>
        </CardSection>
        <CardSection>
          <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
            <View style={{ alignItems: 'center' }}>
              <Text style={[styles.textStyle, { fontFamily: 'AvenirLTStd-Heavy' }]}>Paid</Text>
              <Text style={styles.textStyle}>8</Text>
            </View>
            <View style={{ alignItems: 'center' }}>
              <Text style={[styles.textStyle, { fontFamily: 'AvenirLTStd-Heavy' }]}>Not Paid</Text>
              <Text style={styles.textStyle}>4</Text>
            </View>
          </View>
        </CardSection>
        <TouchableOpacity activeOpacity={0.3} onPress={() => this._onPressMore()}>
            <LinearGradient colors={[colors.secondary.light, colors.secondary.normal]} style={styles.detailButtonStyle} start={{ x: 0, y: 1 }} end={{ x: 1, y: 0 }}>
                <Text style={styles.moreTextStyle}>
                  See More
                </Text>
            </LinearGradient>
        </TouchableOpacity>
    </Card>
    );
  }
}

const styles = {
  textStyle: {
    fontSize: 16,
    color: 'black',
    fontFamily: 'AvenirLTStd-Medium',
    padding: 5,
  },
  classNumberStyle: {
    color: colors.secondary.normal,
    fontSize: 18,
    fontFamily: 'AvenirLTStd-Heavy',
    padding: 5,
  },
  viewStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
},
  seeMoreStyle: {
    width: 0.96 * width,
    height: (0.58 * width),
    justifyContent: 'center',
    alignItems: 'center',
  },
  moreTextStyle: {
    fontSize: 14,
    color: 'white',
    fontFamily: 'AvenirLTStd-Medium',
    paddingBottom: 0,
  },
  detailButtonStyle: {
    width: 0.96 * width,
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
  },
};

export { PaymentDetail };
