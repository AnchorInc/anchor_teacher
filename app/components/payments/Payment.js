import React, { Component } from 'react';
import { View } from 'react-native';

import { Header } from '../header';
import { PaymentDetail, SalesDetail } from './';

class Payment extends Component {
    render() {
        return (
            <View>
                <Header title='Payment Tracking' />
                <SalesDetail />
                <PaymentDetail />
            </View>
        );
    }
}

export { Payment };
