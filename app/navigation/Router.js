import React from 'react';
import { NavigationActions, createStackNavigator, createBottomTabNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/MaterialIcons';

import {
  AppSetup,
  Chat,
  ChatsOverview,
  Batches,
  Login,
  Main,
  TeacherProfile,
  TeacherProfileEditing,
  Settings,
  BatchSettings,
} from '../components';

import { colors } from '../config';

const TabNavigatorConfig = {
  navigationOptions: ({ navigation }) => ({
    tabBarIcon: ({ focused }) => {
      const { routeName } = navigation.state;
      let iconName;
      switch (routeName) {
        case 'Classes':
          iconName = 'home';
          break;
        case 'Batches':
          iconName = 'home';
          break;
        case 'Search':
          iconName = 'search';
          break;
        case 'Settings':
          iconName = 'settings';
          break;
        default:
          iconName = 'home';
          break;
      }
      return (
        <Icon
          size={22}
          name={iconName}
          color={focused ? colors.secondary.normal : colors.other.bbIconNormal}
        />
      );
    },
  }),
  animationEnabled: false,
  tabBarPosition: 'bottom',
  swipeEnabled: false,
  backBehavior: 'none',
  tabBarOptions: {
    showLabel: false,
    style: {
      backgroundColor: colors.other.bgNormal,
    },
  },
};

export const Tabs = createBottomTabNavigator({
  Batches: { screen: Batches },
  Settings: { screen: Settings },
}, TabNavigatorConfig);

const StackConfig = {
  navigationOptions: {
    header: null,
  },
  headerMode: 'none',
};
export const NavStack = createStackNavigator({
  Batches: { screen: Tabs },
  TeacherProfile: { screen: TeacherProfile },
  TeacherProfileEditing: { screen: TeacherProfileEditing },
  ChatsOverview: { screen: ChatsOverview },
  Chat: { screen: Chat },
  BatchSettings: { screen: BatchSettings },
}, StackConfig);

export const MainStack = createStackNavigator({
  AppSetup: { screen: AppSetup },
  Login: { screen: Login },
  Main: { screen: Main },
  TeacherProfileEditing: { screen: TeacherProfileEditing },
  Chat: { screen: Chat },
}, StackConfig);

const defaultGetStateForAction = MainStack.router.getStateForAction;

MainStack.router.getStateForAction = (action, state) => {
  // Prevent access to the 'goback' nav prop
  if (
    state &&
    action.type === NavigationActions.BACK &&
    (state.routes[state.index].routeName === 'AppSetup' ||
      state.routes[state.index].routeName === 'Login' ||
      state.routes[state.index].routeName === 'Main'
    )
  ) { return null; }

  return defaultGetStateForAction(action, state);
};
