import React, { Component } from 'react';
import { ScrollView, Text , View, RefreshControl, ActivityIndicator,SafeAreaView,StyleSheet} from 'react-native';
import { Card,Button,Header } from 'react-native-elements'
import Drawer from 'react-native-drawer';
import MIcon from 'react-native-vector-icons/MaterialIcons'
import Collection from './Collection'
import TopProduct from './TopProduct'
import LastedProduct from './LastedProduct'

export default class Home extends Component {
    constructor(props){
        super(props);
        this.state = {
            refreshing: false,
            refreshingTopProduct: false,
        }
    }

    componentWillMount(){
        // console.log('home mount');
        // console.log('props ',this.props);
        // console.log('state ',this.state);
    }

    handleRefresh(){
        console.log('handle Refresh');
        this.setState = {
            refreshing : true,
            refreshingTopProduct :true,
        };
        console.log('state ',this.state);
    }
    componentDidMount(){
        // console.log('home did mount');
        // console.log('props ',this.props);
        // console.log('state ',this.state);
    }
    
    closeControlPanel = () => {
        this._drawer.close()
      };
      openControlPanel = () => {
        this._drawer.open()
      };

    render(){
        
        if (this.state.refreshing){
            return (
                <View style ={{flex: 1, padding: 30}}>
                    <ActivityIndicator/>
                </View>
            );
        }
        

        return( 

            <Drawer
                tapToClose={true}
                openDrawerOffset={0.5} // 50% gap on the right side of drawer
                ref={(ref) => this._drawer = ref}
                content={
                <View style={{ flex:1, backgroundColor:"blue"}}></View>
                }
            >

            <SafeAreaView style={{flex: 1}}>
                <ScrollView
                    refreshControl = {
                        <RefreshControl 
                            refreshing= {this.state.refreshing}
                            onRefresh = {this.handleRefresh}
                        />
                    }
                >   
                    <Header         
                        placement="left"               
                        leftComponent={<MIcon name='menu' onPress={()=>{this.openControlPanel()}} style ={{color: 'white'}} size= {25}/>}
                        centerComponent={{ text: 'HOME', style: { color: '#fff' } }}
                        rightComponent={{ icon: 'home', color: '#fff' }}
                        backgroundColor='black'
                    />
                    <Collection {...this.props} />
                    <TopProduct {...this.props} />
                    <LastedProduct {...this.props}/>
                    
                </ScrollView>
            </SafeAreaView>
            </Drawer>
        );
    }
}
