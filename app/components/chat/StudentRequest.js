import React from 'react';
import { View, Text, TouchableOpacity, Dimensions } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { Card, CardSection } from '../../lib';

const { width } = Dimensions.get('window');

const StudentRequest = () => {
  return (
    <View style={{ width: 0.96 * width, alignSelf: 'center', marginBottom: 8 }}>
      <Card style={{ flexDirection: 'row' }}>
        <CardSection>
          <View style={styles.textContainerStyle}>
            <Text style={styles.requestHeaderStyle}>Class Request</Text>
          </View>
          <Text style={styles.requestBodyStyle}>Nithin Srinivasan is interested in learning Basketball from you</Text>
          <View style={{ paddingBottom: 10, flexDirection: 'row', alignSelf: 'center', justifyContent: 'center', width: 0.85 * width }}>
            <TouchableOpacity onPress={() => console.log('accept')} style={{ flex: 1 }}>
              <LinearGradient colors={['#07D067', '#2AF598']} start={{ x: 0, y: 1 }} end={{ x: 1, y: 0 }} style={{ flex: 1, borderRadius: 5, justifyContent: 'center', alignItems: 'center' }}>
                <Icon name='check' size={24} color='white' style={{ padding: 10 }} />
              </LinearGradient>
            </TouchableOpacity>
            <View style={{ width: 10 }} />
            <TouchableOpacity onPress={() => console.log('deny')} style={{ flex: 1 }}>
              <LinearGradient colors={['#e53935', '#e35d5b']} start={{ x: 0, y: 1 }} end={{ x: 1, y: 0 }} style={{ flex: 1, borderRadius: 5, justifyContent: 'center', alignItems: 'center' }}>
                <Icon name='close' size={24} color='white' style={{ padding: 10 }} />
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </CardSection>
      </Card>
    </View>
  );
};

const styles = {
  requestHeaderStyle: {
    fontSize: 14,
    color: 'black',
    fontFamily: 'AvenirLTStd-Heavy',
    paddingLeft: 10,
    paddingRight: 10,
  },
  requestBodyStyle: {
    fontSize: 14,
    color: 'black',
    fontFamily: 'AvenirLTStd-Medium',
    paddingLeft: 10,
    paddingRight: 10,
    textAlign: 'center',
    paddingBottom: 10,
  },
  textContainerStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    paddingBottom: 5,
  },
};

export { StudentRequest };
