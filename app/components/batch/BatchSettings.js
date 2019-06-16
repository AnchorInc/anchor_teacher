import React, { Component } from 'react';
import {
  Dimensions,
  ScrollView,
  View,
  StatusBar,
  Text,
  Button,
  TimePickerAndroid,
  TouchableOpacity,
} from 'react-native';
import { connect } from 'react-redux';
import { TextField } from 'react-native-material-textfield';
import moment from 'moment';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { Header } from '../header';
import { FAB } from '../../lib';
import { colors } from '../../config';

const { width } = Dimensions.get('window');

class BatchSettings extends Component {
  state = {
    batch: {
      size: null,
      maxSize: null,
      days: {
        Monday: false,
        Tuesday: false,
        Wednesday: false,
        Thursday: false,
        Friday: false,
        Saturday: false,
        Sunday: false,
      },
      startTime: null,
      endTime: null,
    },
  };

  setLocation = () => {
    console.log('setting location');
  }

  pickStartTime = () => {
    TimePickerAndroid.open().then((data) => {
      if (data.action === 'timeSetAction') {
        this.setState((prevState) => {
          const newState = prevState;
          newState.batch.startTime = new Date(1970, 1, 1, data.hour, data.minute);
          return newState;
        });
      }
    }).catch((err) => {
      console.log(err);
    });
  }

  pickEndTime = () => {
    TimePickerAndroid.open().then((data) => {
        if (data.action === 'timeSetAction') {
          this.setState((prevState) => {
            const newState = prevState;
            newState.batch.endTime = new Date(1970, 1, 1, data.hour, data.minute);
            return newState;
          });
        }
    }).catch((err) => {
      console.log(err);
    });
  }

  showStartTime = () => {
    if (this.state.batch.startTime) {
      return (
      <Text style={{ ...styles.containerStyle, marginTop: 15, marginLeft: 15 }}>
        {moment(this.state.batch.startTime).format('LT')}
      </Text>
      );
    }
    return null;
  }

  showEndTime = () => {
    if (this.state.batch.endTime) {
      return (
      <Text style={{ ...styles.containerStyle, marginTop: 15, marginLeft: 15 }}>
        {moment(this.state.batch.endTime).format('LT')}
      </Text>
      );
    }
    return null;
  }

  save = () => {
    console.log('Saving Batch!');
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <StatusBar />
        <Header title='Add a Batch' />
        <ScrollView
          keyboardShouldPersistTaps='always'
          contentContainerStyle={{ paddingBottom: 15 }}
        >
          <View style={{ ...styles.containerStyle, margin: 15 }}>
            <TextField
              containerStyle={styles.textInputStyle}
              label='Class Name'
              value={this.state.className}
              titleFontSize={14}
              ref={this.maxSizeRef}
              tintColor={colors.primary.light}
            />
            <TouchableOpacity activeOpacity={0.3} style={{ alignSelf: 'center', elevation: 10, padding: 10 }} onPress={this.setLocation}>
              <LinearGradient colors={[colors.secondary.light, colors.secondary.normal]} style={styles.buttonStyle} start={{ x: 0, y: 1 }} end={{ x: 1, y: 0 }}>
                <Icon name='map-marker' size={20} color='white' style={{ padding: 3 }} />
                <Text style={styles.textStyle}>
                  Set Location
                </Text>
              </LinearGradient>
            </TouchableOpacity>
            <Button
              style={styles.containerStyle}
              onPress={this.pickStartTime}
              title="Choose Start Time"
            />
            {this.showStartTime()}
            <Button
              style={styles.containerStyle}
              onPress={this.pickEndTime}
              title="Choose End Time"
            />
            {this.showEndTime()}
          </View>
        </ScrollView>
        <FAB icon='save' onPress={this.save} />
      </View>
    );
  }
}
const styles = {
  textInputStyle: {
    width: 0.85 * width,
    paddingBottom: 0,
  },
  containerStyle: {
    paddingBottom: 5,
    paddingLeft: 15,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  textStyle: {
    fontSize: 17,
    color: 'white',
    fontFamily: 'AvenirLTStd-Heavy',
    padding: 3,
  },
  buttonStyle: {
    width: 0.4 * width,
    height: 50,
    borderRadius: 37.5,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
};

const mapStateToProps = (state) => {
  let user;
  if (state.user.user) {
    user = state.user.user;
  }
  return { user };
};

export default connect(mapStateToProps)(BatchSettings);
