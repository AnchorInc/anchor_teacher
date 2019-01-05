import React, { Component } from 'react';
import { setCustomText } from 'react-native-global-props';
import { Provider } from 'react-redux';
import { StatusBar } from 'react-native';

import { MainStackContainer } from './navigation/Router';
import { colors, store } from './config';

// get rid of annoying yellow box
console.disableYellowBox = true;

// set default font family
const customTextProps = {
  style: {
    fontFamily: 'AvenirLTStd-Book',
  },
};
setCustomText(customTextProps);

// set status bar variables globally
StatusBar.setBarStyle('light-content');
StatusBar.setBackgroundColor(colors.primary.dark);

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <MainStackContainer />
      </Provider>
    );
  }
}

export default App;
