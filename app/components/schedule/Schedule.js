import React, { Component } from 'react';
import { View } from 'react-native';

import { Header } from '../header';

class Schedule extends Component {
    render() {
        return (
            <View>
                <Header title='Class Schedule' />
            </View>
        );
    }
}

export { Schedule };
