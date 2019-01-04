import React from 'react';
import { View, Text, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { Card, CardSection } from '../../lib';

const { width } = Dimensions.get('window');

const TeacherApproval = () => {
  return (
    <View style={{ width: 0.5 * width, alignSelf: 'center' }}>
      <Card style={{ flexDirection: 'row' }}>
        <CardSection>
          <View style={styles.textContainerStyle}>
            <Icon style={{ paddingLeft: 10, paddingRight: 10 }} name='clock' size={18} color='black' />
            <Text style={styles.approvalStyle}>Pending Approval...</Text>
          </View>
        </CardSection>
      </Card>
    </View>
  );
};

const styles = {
  approvalStyle: {
    fontSize: 14,
    color: 'black',
    fontFamily: 'AvenirLTStd-Medium',
    paddingLeft: 10,
    paddingRight: 10,
  },
  textContainerStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    paddingBottom: 5,
  },
};

export { TeacherApproval };
