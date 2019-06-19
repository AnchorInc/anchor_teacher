import React, { Component } from 'react';
import {
  Dimensions,
  ScrollView,
  View,
  Text,
  TimePickerAndroid,
  TouchableOpacity,
} from 'react-native';
import { connect } from 'react-redux';
import { TextField } from 'react-native-material-textfield';
import moment from 'moment';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import MapView, { Marker } from 'react-native-maps';
import RNGooglePlaces from 'react-native-google-places';

import { Header } from '../header';
import { Card, CardSection } from '../../lib';
import { colors } from '../../config';

const { width, height } = Dimensions.get('window');

// TODO: make it prettier and fix up saving the batch

class BatchSettings extends Component {
  constructor(props) {
    super(props);

    this.classNameRef = this.updateRef.bind(this, 'className');
    this.sizeRef = this.updateRef.bind(this, 'size');
    this.maxSizeRef = this.updateRef.bind(this, 'maxSizeRef');
  }

  state = {
    className: '',
    location: null,
    size: 0,
    maxSize: 0,
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
    regionDelta: {
      latitudeDelta: 0.0061,
      longitudeDelta: 0.0082,
    },
  };

  onRegionChange = (region) => {
    this.setState({ region });
  }

  setLocation = () => {
    console.log('setting location');
    RNGooglePlaces.openAutocompleteModal()
    .then((place) => {
      this.setState({ location: place.location });
      console.log(this.state);
    })
    .catch(error => console.log(error.message));
  }

  displayLocation = () => {
    if (!this.state.location) {
      return (
        <CardSection>
          <View style={{
            justifyContent: 'center',
            alignItems: 'center',
            height: 0.4 * height,
            }}
          >
            <Icon size={30} name='map-marker' color='#727272' />
            <Text style={{
              padding: 10,
              paddingTop: 30,
              color: '#727272',
              fontSize: 20,
              fontFamily: 'AvenirLTStd-Heavy',
              }}
            >
              Set a Location for this Batch
            </Text>
          </View>
        </CardSection>
      );
    }
    const region = {
      latitude: this.state.location.latitude,
      longitude: this.state.location.longitude,
      longitudeDelta: this.state.regionDelta.longitudeDelta,
      latitudeDelta: this.state.regionDelta.latitudeDelta,
    };
    return (
      <MapView
        region={region}
        style={{
          flex: 1,
          height: 0.4 * height,
        }}
      >
        <Marker coordinate={region} />
      </MapView>
    );
  }

  pickStartTime = () => {
    TimePickerAndroid.open().then((data) => {
      if (data.action === 'timeSetAction') {
        this.setState({
          startTime: new Date(1970, 1, 1, data.hour, data.minute),
        });
      }
    }).catch((err) => {
      console.log(err);
    });
  }

  pickEndTime = () => {
    TimePickerAndroid.open().then((data) => {
        if (data.action === 'timeSetAction') {
          this.setState({
            endTime: new Date(1970, 1, 1, data.hour, data.minute),
          });
        }
    }).catch((err) => {
      console.log(err);
    });
  }

  showTime = (time) => {
    if (time) {
      return (
        <CardSection>
          <View style={styles.displayContainerStyle}>
            <Text style={{ ...styles.displayTextStyle, color: 'white' }}>
              {moment(time).format('LT')}
            </Text>
          </View>
        </CardSection>
      );
    }
    return (
      <CardSection>
        <View style={styles.displayContainerStyle}>
          <Text style={{ ...styles.displayTextStyle, color: 'white' }}>
            00:00 AM
          </Text>
        </View>
      </CardSection>
    );
  }

  saveBatch = () => {
    console.log('saving batch');
  }

  onChangeText = (text) => {
    ['className', 'size', 'maxSize']
    .map(name => ({ name, ref: this[name] }))
    .forEach(({ name, ref }) => {
      if (ref.isFocused()) {
        this.setState({ [name]: text });
        this.setState({ value: text });
      }
    });
  }

  updateRef(name, ref) {
    this[name] = ref;
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Header title="Add Batch" />
        <ScrollView showsVerticalScrollIndicator={false}>
          <Card>
            <CardSection>
            <View style={styles.inputContainerStyle}>
              <TextField
                containerStyle={styles.textInputStyle}
                label='Class Name'
                value={this.state.className}
                titleFontSize={14}
                onChangeText={this.onChangeText}
                ref={this.classNameRef}
                tintColor={colors.primary.light}
              />
            </View>
            </CardSection>
            <CardSection>
            <View style={styles.inputContainerStyle}>
              <TextField
                containerStyle={styles.textInputStyle}
                keyboardType='numeric'
                label='Current Batch Size'
                value={this.state.size}
                titleFontSize={14}
                onChangeText={this.onChangeText}
                ref={this.classNameRef}
                tintColor={colors.primary.light}
              />
            </View>
            </CardSection>
            <CardSection>
            <View style={styles.inputContainerStyle}>
              <TextField
                containerStyle={styles.textInputStyle}
                keyboardType='numeric'
                label='Max Batch Size'
                value={this.state.maxSize}
                titleFontSize={14}
                onChangeText={this.onChangeText}
                ref={this.classNameRef}
                tintColor={colors.primary.light}
              />
            </View>
            </CardSection>
          </Card>
          <Card>
            {this.showTime(this.state.startTime)}
            <CardSection>
            <TouchableOpacity activeOpacity={0.3} style={{ alignSelf: 'center', elevation: 10, padding: 10 }} onPress={this.pickStartTime}>
              <LinearGradient colors={[colors.secondary.light, colors.secondary.normal]} style={styles.buttonStyle} start={{ x: 0, y: 1 }} end={{ x: 1, y: 0 }}>
                {/* <Icon name='timer' size={20} color='white' style={{ padding: 3 }} /> */}
                <Text style={styles.textStyle}>Pick Start Time</Text>
              </LinearGradient>
            </TouchableOpacity>
            </CardSection>
          </Card>
          <Card>
            {this.showTime(this.state.endTime)}
            <CardSection>
            <TouchableOpacity activeOpacity={0.3} style={{ alignSelf: 'center', elevation: 10, padding: 10 }} onPress={this.pickEndTime}>
              <LinearGradient colors={[colors.secondary.light, colors.secondary.normal]} style={styles.buttonStyle} start={{ x: 0, y: 1 }} end={{ x: 1, y: 0 }}>
                {/* <Icon name='timer' size={20} color='white' style={{ padding: 3 }} /> */}
                <Text style={styles.textStyle}>Pick End Time</Text>
              </LinearGradient>
            </TouchableOpacity>
            </CardSection>
          </Card>
          <Card>
            {this.displayLocation()}
            <CardSection>
            <TouchableOpacity activeOpacity={0.3} style={{ alignSelf: 'center', elevation: 10, padding: 10 }} onPress={this.setLocation}>
              <LinearGradient colors={[colors.secondary.light, colors.secondary.normal]} style={styles.buttonStyle} start={{ x: 0, y: 1 }} end={{ x: 1, y: 0 }}>
                {/* <Icon name='map-marker' size={20} color='white' style={{ padding: 3 }} /> */}
                <Text style={styles.textStyle}>Set Location</Text>
              </LinearGradient>
            </TouchableOpacity>
            </CardSection>
          </Card>
        </ScrollView>
      </View>
    );
  }
}

const styles = {
  titleTextStyle: {
    paddingTop: 10,
    paddingLeft: 15,
    fontFamily: 'AvenirLTStd-Heavy',
    fontSize: 14,
    paddingBottom: 5,
    color: colors.primary.light,
  },
  textInputStyle: {
    width: 0.85 * width,
    paddingBottom: 0,
  },
  inputContainerStyle: {
    paddingBottom: 5,
    paddingLeft: 15,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  displayTextStyle: {
    fontFamily: 'AvenirLTStd-Heavy',
    fontSize: 55,
    height: 0.25 * height,
    alignSelf: 'center',
    // paddingTop: 0.06 * height,
  },
  displayContainerStyle: {
    backgroundColor: colors.primary.normal,
    width: 0.9 * width,
    alignSelf: 'center',
  },
  textStyle: {
    fontSize: 17,
    color: 'white',
    fontFamily: 'AvenirLTStd-Heavy',
    padding: 3,
  },
  buttonStyle: {
    width: 0.9 * width,
    height: 55,
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
