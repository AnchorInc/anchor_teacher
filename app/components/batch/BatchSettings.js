import React, { Component } from 'react';
import {
  Dimensions,
  ScrollView,
  View,
  StatusBar,
  Text,
  Button,
  TimePickerAndroid,
} from 'react-native';
import { connect } from 'react-redux';
import { TextField } from 'react-native-material-textfield';
import RNGooglePlaces from 'react-native-google-places';
import moment from 'moment';
import { TextCheckbox } from './';
// import firebase from 'react-native-firebase';

import { Header } from '../header';
import { FAB } from '../../lib';
import { colors, userTypes } from '../../config';

const { width } = Dimensions.get('window');

class BatchSettings extends Component {
  state = {
    teacher: null,
    batch: {
      location: null,
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

  componentWillMount() {
    if (this.props.user.type === userTypes.STUDENT) {
      console.log('Student Batch Settings not yet implemented');
    } else {
      this.setState({ teacher: this.props.user });
    }
  }

  setLocation = () => {
    RNGooglePlaces.openPlacePickerModal().then((place) => {
      this.setState((prevState) => {
        const newState = prevState;
        newState.batch.location = place;
        return newState;
      });
    }).catch(error => console.log('Google Places Place Picker Error:', error));
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
      return (<Text style={{ ...styles.containerStyle, marginTop: 15, marginLeft: 15 }}>
        {moment(this.state.batch.startTime).format('LT')}
      </Text>);
    }
    return null;
  }

  showEndTime = () => {
    if (this.state.batch.endTime) {
      return (<Text style={{ ...styles.containerStyle, marginTop: 15, marginLeft: 15 }}>
        {moment(this.state.batch.endTime).format('LT')}
      </Text>);
    }
    return null;
  }

  displayLocation = () => {
    if (this.state.batch.location) {
      return <Text style={{ ...styles.containerStyle, marginTop: 15, marginLeft: 15 }}>{this.state.batch.location.address}</Text>;
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
          {this.displayLocation()}
          <View style={{ ...styles.containerStyle, margin: 15 }}>
            <Button
              style={styles.containerStyle}
              onPress={this.setLocation}
              title="Set Location"
            />
            <TextField
              containerStyle={styles.textInputStyle}
              label='Maximum Size'
              value={this.state.maxSize}
              keyboardType='numeric'
              returnKeyType='next'
              titleFontSize={14}
              renderAccessory={this.showClearTextButton}
              ref={this.maxSizeRef}
              tintColor={colors.primary.light}
            />
            <TextCheckbox
              text='Sunday'
              value={this.state.batch.days.Sunday}
              onValueChange={value => this.setState((prevState) => {
                  const newState = prevState;
                  newState.batch.days.Sunday = value;
                  return newState;
                })
              }
            />
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
};

const mapStateToProps = (state) => {
  let user;
  if (state.user.user) {
    user = state.user.user;
  }
  return { user };
};

export default connect(mapStateToProps)(BatchSettings);
