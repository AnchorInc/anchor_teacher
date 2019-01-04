import React from 'react';
import { Platform, View, Modal, Text, ActivityIndicator, Dimensions } from 'react-native';

import { colors } from '../config';

const { width, height } = Dimensions.get('window');

const Spinner = (props) => {
  return (
    <Modal visible={props.visible} transparent animationType='fade' onRequestClose={() => {}}>
      <View style={styles.modalStyle}>
        <View style={styles.containerStyle}>
          <ActivityIndicator color='white' size={(Platform.OS === 'ios') ? 0 : 35} />
          <Text style={styles.textStyle}>{props.title}</Text>
        </View>
      </View>
    </Modal>
  );
};

const styles = {
  modalStyle: {
    width,
    height,
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerStyle: {
    backgroundColor: colors.primary.normal,
    width: 0.8 * width,
    height: 0.3 * width,
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row',
    borderRadius: 2,
  },
  textStyle: {
    color: 'white',
    fontSize: 20,
    fontFamily: 'AvenirLTStd-Heavy',
  },
};

export { Spinner };
