import React, { Component } from 'react';
import { View, Image, Text,Platform } from 'react-native';
import TabNavigator from 'react-native-tab-navigator';
import { createBottomTabNavigator,createStackNavigator } from 'react-navigation';
import Ionicons from 'react-native-vector-icons/Ionicons';

import ContactInfo from './ContactInfo/ContactInfo';
import Products from './Products/Products';
import Category from './Categories/CategoryView';
import CategoryDetail from './Categories/CategoryDetail'
import Home from './Home/HomeView';
import Cart from './Cart/CartView';
import Details from './Products/DetailsView';
import Search from './Products/SearchResult'
import CheckOrder from './Cart/CheckOrder'
import Login from './Login'
import SignUp from './SignUp'

import User from './User'
import WishList from './Home/WishList'
import global from '../../Common/global'

const HomeStack = createStackNavigator({
    Home :{screen: Home,navigationOptions:{ header:null} },
   
    Details: { screen: Details }, 
})


const CategoryStack = createStackNavigator({
    Category :{screen: Category,navigationOptions:{ header:null} },
    CategoryDetail :{screen: CategoryDetail,navigationOptions:{ header:null} },
    Details: { screen: Details }, 
})

const ProductStack = createStackNavigator({
    Products: { screen: Products,navigationOptions:{ header:null} },
    Details: { screen: Details }, 
    Search:{screen:Search}
  });
const CartStack = createStackNavigator({
    Cart : {screen: Cart },
    CheckOrder: {screen: CheckOrder},
},{
    navigationOptions: {header: null}
})

export const AuthStack = createStackNavigator({
    Login: {screen: Login},
    User: {screen: global.auth?Login:User},
    WishList:{screen:WishList},
    SignUp: {screen: SignUp}

},{headerMode:'none'})

// const WishList = createStackNavigator({
//     WishList :{screen: WishList,navigationOptions:{ header:null} }
// })

export default createBottomTabNavigator({
    Home: { screen: HomeStack, 
            navigationOptions:{
                tabBarIcon:({tintColor})=>(<Ionicons  
                                    name={Platform.OS === "ios" ? "ios-home" : "md-home"} 
                                    color ={tintColor}
                                    size={24} />)
            }      
    },

    //AuthStack: {screen: AuthStack},
    Category: { screen: CategoryStack, 
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
    Cart: { screen: CartStack, 
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
   initialRouteName:'Home',
   navigationOptions: {
    header: null 
    },
   tabBarOptions:{
       activeTintColor:'tomato',
       inactiveTintColor:'gray'
   }
});