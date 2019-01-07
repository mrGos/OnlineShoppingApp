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

import ShopNavigation from './Shop/ShopNavigation'
import Drawer from 'react-native-drawer';
import MIcon from 'react-native-vector-icons/MaterialIcons'
import { Card,Button,Header } from 'react-native-elements'

export default class App extends Component {
constructor(props){
  super(props)
    
}

// closeControlPanel = () => {
//   this._drawer.close()
// };
// openControlPanel = () => {
//   this._drawer.open()
// };

  render() {
    return (   
      // <Drawer
      //     tapToClose={true}
      //     openDrawerOffset={0.3} // 30% gap on the right side of drawer
      //     ref={(ref) => this._drawer = ref}
      //     content={
      //     <View style={{ flex:1, backgroundColor:"blue"}}></View>
      //     }
      //  >
      //     <View>
      //       <Header         
      //           placement="left"               
      //           leftComponent={<MIcon name='menu' onPress={()=>{this.openControlPanel()}} style ={{color: 'white'}} size= {25}/>}
      //           centerComponent={{ text: 'HOME', style: { color: '#fff' } }}
      //           rightComponent={{ icon: 'home', color: '#fff' }}
      //           backgroundColor='black'
      //       />
      //     </View>
          <ShopNavigation/>
      //</Drawer>      
                                   
    );
  }
}



