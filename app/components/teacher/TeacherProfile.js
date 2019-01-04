import React, { Component } from 'react';
import {
  Dimensions,
  Image,
  ScrollView,
  TouchableOpacity,
  Text,
  View,
  StatusBar,
  Platform,
} from 'react-native';
import { connect } from 'react-redux';
import StarRating from 'react-native-star-rating';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { colors } from '../../config';
import { ListDetail, TouchableDebounce, Spinner } from '../../lib';

const { width, height } = Dimensions.get('window');

class TeacherProfile extends Component {
  state = {
    batches: [],
    messages: [],
    time: '',
    place: '',
  };

  render() {
    if (this.props.user) {
      return (
        <View style={{ flex: 1 }}>
          <StatusBar />
          <View style={styles.headerContainerStyle}>
            <View style={styles.headerStyle}>
              <TouchableDebounce style={styles.iconStyle} onPress={() => this.props.navigation.goBack()}>
                <Icon name='arrow-left' size={24} color='white' />
              </TouchableDebounce>
              <Text style={styles.headerTextStyle}>
                {this.props.user.displayName}
              </Text>
              <TouchableDebounce style={styles.iconStyle} onPress={() => this.props.navigation.navigate('TeacherProfileEditing')}>
                <Icon name='account-settings' size={24} color='white' />
              </TouchableDebounce>
            </View>
            <View style={styles.profileContainerStyle}>
              <Image source={{ uri: this.props.user.photoURL }} style={styles.profileStyle} />
            </View>
          </View>
          <View style={styles.nameContainerStyle}>
            <Text style={styles.nameStyle}>
              {this.props.user.subject}
            </Text>
            <StarRating
              disabled
              halftarEnabled
              iconSet='MaterialCommunityIcons'
              emptyStar='star-outline'
              halfStar='star-half'
              starColor='#ffb300'
              emptyStarColor='#ffb300'
              starSize={25}
              rating={this.props.user.rating}
            />
          </View>
          <ScrollView>
            <ListDetail
              title={'Name'}
              value={this.props.user.displayName}
            />
            <ListDetail
              title={'Subject'}
              value={this.props.user.subject}
            />
            <ListDetail
              title={'Email'}
              value={this.props.user.email}
            />
            <ListDetail
              title={'Phone Number'}
              value={`+91 ${this.props.user.phone}`}
            />
            <ListDetail
              title={'Price'}
              value={`\u20b9 ${this.props.user.price} Per Class`}
            />
            <ListDetail
              title={'Timings'}
              value={this.state.time && this.state.place ? `From ${this.state.time} at ${this.state.place}` : 'No registered classes'}
            >
              <TouchableOpacity>
                <Text>See More</Text>
              </TouchableOpacity>
            </ListDetail>
          </ScrollView>
        </View>
      );
    } return (
      <Spinner title='Loading' />
    );
  }
}
const styles = {
  headerContainerStyle: {
    alignItems: 'center',
    marginTop: (Platform.OS === 'ios') ? height * 0.03 : 0,
  },
  headerStyle: {
    height: 0.3 * height,
    backgroundColor: colors.primary.normal,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width,
    padding: 15,
  },
  headerTextStyle: {
    fontFamily: 'AvenirLTStd-Heavy',
    fontSize: 20,
    color: 'white',
  },
  profileContainerStyle: {
    position: 'absolute',
    top: (height * 0.3) - ((0.27 * width) / 2),
    width: width * 0.26,
    height: width * 0.26,
    backgroundColor: colors.other.bgColor,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconStyle: {
    height: 0.08 * width,
    width: 0.08 * width,
    alignItems: 'center',
  },
  profileStyle: {
    width: width * 0.25,
    height: width * 0.25,
    borderRadius: (width * 0.25) / 2,
  },
  nameContainerStyle: {
    paddingTop: 0.125 * width,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 0.03125 * width,
  },
  nameStyle: {
    fontSize: 20,
    fontFamily: 'AvenirLTStd-Medium',
    color: 'black',
    padding: 5,
  },
  classStyle: {
    fontSize: 14,
    fontFamily: 'AvenirLTStd-Heavy',
    color: '#909094',
    paddingTop: 8,
  },
};

const mapStateToProps = (state) => {
  let user;
  if (state.user.user) {
    user = state.user.user;
  }
  return { user };
};

export default connect(mapStateToProps)(TeacherProfile);
