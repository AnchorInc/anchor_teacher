import React, { Component } from 'react';
import { TouchableOpacity } from 'react-native';

class TouchableDebounce extends Component {
  state = { disabled: false, interval: null };
  componentWillMount() {
    this.setState({ disabled: false });
  }

  componentWillUnmount() {
    if (this.state.interval) {
      clearInterval(this.state.interval);
    }
  }

  render() {
    return (
      <TouchableOpacity
        style={this.props.style}
        activeOpacity={this.props.activeOpacity}
        disabled={this.state.disabled}
        onPress={() => {
            this.props.onPress();
            this.setState({
              disabled: true,
              interval: setInterval(() => this.setState({ disabled: false }), 500),
            });
          }
        }
        onLongPress={this.props.onLongPress}
      >
        {this.props.children}
      </TouchableOpacity>
    );
  }
}

export { TouchableDebounce };
