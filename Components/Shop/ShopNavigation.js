import React, { Component } from 'react';
import { View, Image, Text,Platform } from 'react-native';
import TabNavigator from 'react-native-tab-navigator';
import { createBottomTabNavigator,createStackNavigator } from 'react-navigation';
import Ionicons from 'react-native-vector-icons/Ionicons';

import ContactInfo from './ContactInfo/ContactInfo';
import Products from './Products/Products';
import Category from './Categories/CategoryView';
import Home from './Home/HomeView';
import Cart from './Cart/CartView';
import Details from './Products/DetailsView';
import Search from './Products/SearchResult'



const ProductStack = createStackNavigator({
    Products: { screen: Products,navigationOptions:{ header:null} },
    Details: { screen: Details },
    Search:{screen:Search}
  });

export default createBottomTabNavigator({
    Home: { screen: Home, 
            navigationOptions:{
                tabBarIcon:({tintColor})=>(<Ionicons  
                                    name={Platform.OS === "ios" ? "ios-home" : "md-home"} 
                                    color ={tintColor}
                                    size={24} />)
            }      
    },
    Category: { screen: Category, 
        navigationOptions:{
            tabBarIcon:({tintColor})=>(<Ionicons  
                                name={Platform.OS === "ios" ? "ios-list" : "md-list"} 
                                color ={tintColor}
                                size={24}/>)
        }    
    },
    Product: { screen: ProductStack, 
        navigationOptions:{
            tabBarIcon:({tintColor})=>(<Ionicons  
                                name={Platform.OS === "ios" ? "ios-wallet" : "md-wallet"} 
                                color ={tintColor}
                                size={24}/>)
        }    
    },
    Cart: { screen: Cart, 
        navigationOptions:{
            tabBarIcon:({tintColor})=>(<Ionicons  
                                name={Platform.OS === "ios" ? "ios-cart" : "md-cart"} 
                                color ={tintColor}
                                size={24}/>)
        }    
    },
    Info: { screen: ContactInfo, 
        navigationOptions:{
            tabBarIcon:({tintColor})=>(<Ionicons  
                                name={Platform.OS === "ios" ? "ios-call" : "md-call"} 
                                color ={tintColor}
                                size={24}/>)
        }    
    }
  
},
  {
   initialRouteName:'Product',
   navigationOptions: {
    header: null 
    },
   tabBarOptions:{
       activeTintColor:'tomato',
       inactiveTintColor:'gray'
   }
});