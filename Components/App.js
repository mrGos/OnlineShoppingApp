/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Text, View} from 'react-native';
import getUrl from '../Common/UrlConfig'; 
import Products from './Shop/Products/Products'
import ShopMain from './Shop/ShopMain'

export default class App extends Component {
constructor(props){
  super(props)
    
}
  

  render() {
    return (   
            <ShopMain/>                    
    );
  }
}



