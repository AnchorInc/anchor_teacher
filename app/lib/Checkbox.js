import React, { Component } from 'react';
import { View, Text, CheckBox } from 'react-native';

class Checkbox extends Component {
  state = { checked: false };
  componentWillMount() {
    this.setState({ checked: false });
  }

  render() {
    return (
      <View style={{ ...styles.containerStyle, flexDirection: 'row' }}>
        <CheckBox
          value={this.state.checked}
          onValueChange={() => this.setState((prevState, props) => {
            return { checked: !prevState.checked };
          })}
        />
        <Text style={{ marginTop: 5 }}> {this.props.text}</Text>
      </View>
    );
  }
}

const styles = {
  containerStyle: {
    paddingBottom: 5,
    paddingLeft: 15,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
}

export { Checkbox };
