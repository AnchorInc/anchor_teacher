import React, { Component } from 'react';
import { View } from 'react-native';

import { Header } from '../header';

class Payment extends Component {
    render() {
        return (
            <View>
                <Header title='Payment Tracking' />
            </View>
        );
    }
}

export { Payment };
