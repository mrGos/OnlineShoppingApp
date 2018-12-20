import React, { Component } from 'react';
import { ScrollView, Text , View, RefreshControl, ActivityIndicator,SafeAreaView} from 'react-native';

import Collection from './Collection'
import TopProduct from './TopProduct'

export default class Home extends Component {
    constructor(props){
        super(props);
        this.state = {
            refreshing: false,
            refreshingTopProduct: false,
        }
    }

    componentWillMount(){
        console.log('home mount');
        console.log('props ',this.props);
        console.log('state ',this.state);
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
        console.log('home did mount');
        console.log('props ',this.props);
        console.log('state ',this.state);
    }
    
    render(){
        
        if (this.state.refreshing){
            return (
                <View style ={{flex: 1, padding: 30}}>
                    <ActivityIndicator/>
                </View>
            );
        }
        

        return( 
            <SafeAreaView style={{flex: 1}}>
                <ScrollView
                    refreshControl = {
                        <RefreshControl 
                            refreshing= {this.state.refreshing}
                            onRefresh = {this.handleRefresh}
                        />
                    }
                >
                    <Collection />
                    <TopProduct {...this.props} 
                    />
                </ScrollView>
            </SafeAreaView>
        );
    }
}