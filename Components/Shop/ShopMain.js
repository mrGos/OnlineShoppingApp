import React, { Component } from 'react';
import { View, Image, Text } from 'react-native';
import TabNavigator from 'react-native-tab-navigator';
import { createBottomTabNavigator } from 'react-navigation';

import ContactInfo from './ContactInfo/ContactInfo';
import Products from './Products/Products';



export default class ShopMain extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            selectedTab: 'home',
        };
        createBottomTabNavigator({
            Home: ContactInfo,
            Settings: Products,
          });
       
    }

    render(){
        return(
            
            <View style={{flex:1}}>
               <TabNavigator tabBarStyle={{backgroundColor:"white"}}>  

               {/* Home TAB */}
                <TabNavigator.Item
                    selected={this.state.selectedTab === 'home'}                    
                    renderIcon={() => <Image source={require("../../Images/Icons/Home.png")} />}
                    renderSelectedIcon={() => <Image source={require("../../Images/Icons/Home_active.png")} />}
                    onPress={() => this.setState({ selectedTab: 'home' })}>

                    <View style={{flex:1,backgroundColor:"yellow"}}></View>
                </TabNavigator.Item>

                {/* Category TAB */}
                <TabNavigator.Item
                    selected={this.state.selectedTab === 'category'}
                    renderIcon={() => <Image source={require("../../Images/Icons/Categorize.png")} />}
                    renderSelectedIcon={() => <Image source={require("../../Images/Icons/Categorize_active.png")} />}
                    onPress={() => this.setState({ selectedTab: 'category' })}>

                    <View style={{flex:1,backgroundColor:"red"}}></View>
                </TabNavigator.Item>

                 {/* Product TAB */}   
                 <TabNavigator.Item
                    selected={this.state.selectedTab === 'product'}
                    
                    renderIcon={() => <Image source={require("../../Images/Icons/Product.png")} />}
                    renderSelectedIcon={() => <Image source={require("../../Images/Icons/Product_active.png")} />}
                    onPress={() => this.setState({ selectedTab: 'product' })}>

                    <Products/>
                </TabNavigator.Item>

                {/* Cart TAB */}
                <TabNavigator.Item
                    selected={this.state.selectedTab === 'cart'}
                    renderIcon={() => <Image source={require("../../Images/Icons/Cart.png")} />}
                    renderSelectedIcon={() => <Image source={require("../../Images/Icons/Cart_active.png")} />}
                    badgeText="1"
                    onPress={() => this.setState({ selectedTab: 'cart' })}>

                    <View style={{flex:1,backgroundColor:"tomato"}}></View>
                </TabNavigator.Item>
                
                {/* Info TAB */}
                <TabNavigator.Item
                    selected={this.state.selectedTab === 'contact'}
                    renderIcon={() => <Image source={require("../../Images/Icons/Info.png")} />}
                    renderSelectedIcon={() => <Image source={require("../../Images/Icons/Info_active.png")} />}
                    onPress={() => this.setState({ selectedTab: 'contact' })}>

                    <View style={{flex:1,backgroundColor:"orange"}}></View>
                </TabNavigator.Item>

            </TabNavigator>
        </View>
                            
        );
    }
}