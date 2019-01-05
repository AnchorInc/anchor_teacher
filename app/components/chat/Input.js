import React, { Component } from 'react';
import {
  TextInput,
  View,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { colors } from '../../config';

const { width } = Dimensions.get('window');

class Input extends Component {
  state={
    message: '',
    blank: true,
  };

  render() {
    return (
      <View style={{ alignItems: 'center', justifyContent: 'space-around', flexDirection: 'row' }}>
        <View
          style={{
            justifyContent: 'flex-start',
            alignSelf: 'center',
            alignItems: 'center',
            flexDirection: 'row',
            backgroundColor: 'white',
            borderWidth: 0.25,
            borderColor: '#eeeeee',
            elevation: 3,
            width: 0.8 * width,
            margin: 10,
            minHeight: 44,
            maxHeight: 120,
            borderRadius: 22,
          }}
        >
          <TextInput
            style={styles.inputStyle}
            placeholder="Type a message..."
            placeholderTextColor='gray'
            underlineColorAndroid='transparent'
            multiline
            value={this.state.message}
            onChangeText={(message) => {
              if (message !== '') {
                this.setState({ message, blank: false });
              } else {
                this.setState({ message, blank: true });
              }
            }}
            returnKeyType='send'
            ref={(ref) => { this.input = ref; }}
            selectionColor={colors.primary.light}
          />
        </View>
        <TouchableOpacity
          onPress={() => {
            this.input.clear();
            this.setState({ message: '', blank: true });
            this.props.onPress(this.state.message);
          }}
          disabled={this.state.blank}
          style={{
            height: 44,
            width: 44,
            borderRadius: 22,
            backgroundColor: (this.state.blank) ? colors.other.darkGray : colors.primary.normal,
            elevation: 3,
            justifyContent: 'center',
            alignItems: 'center',
            margin: 10,
          }}
        >
          <Icon name='send' size={24} color='white' />
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = {
  inputStyle: {
    width: 0.75 * width,
    alignSelf: 'center',
    padding: 10,
    fontFamily: 'AvenirLTStd-Heavy',
    fontSize: 16,
    color: 'black',
    paddingLeft: 20,
  },
};

export { Input };
