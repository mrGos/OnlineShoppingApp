import React, { Component } from 'react';
import { ScrollView, Text } from 'react-native';

import Collection from './Collection'
import TopProduct from './TopProduct'

export default class Home extends Component {
    
    render(){
        return( 
            <ScrollView>
                <Collection />
                <TopProduct />
            </ScrollView>
        );
    }
}