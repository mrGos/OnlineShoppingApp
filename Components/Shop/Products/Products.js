/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Text, View,FlatList,Image,RefreshControl,ActivityIndicator,StyleSheet,Dimensions } from 'react-native';
import { SearchBar } from 'react-native-elements';

import getAllProduct from '../../../Api/ProductApi/getAllProduct';
import {pageSizeDefault} from '../../../Common/PaginationDefault';


const screen = require('Dimensions');
const window = screen.get('window');
const numColumns = 2;

export default class Products extends Component {

  constructor(props){
    super(props);    
    this.state = {

      containerStyle: styles.flatContainer,
      itemStyle: styles.itemContainer,
      page:0,
      totalPages:1,
      refreshing: false,
      //dataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}),
      dataSource:[]
    };
  }



 CrawlProductData(keyword,page,pageSize){

  getAllProduct(keyword,page,pageSize)
    .then((responseJson) => {
      console.log('lengthItems='+responseJson.Items.length+'- page= '+this.state.page+'- totalPage'+ this.state.totalPages);
      if(this.state.page<this.state.totalPages&&responseJson.Items.length!=0){
          console.log( "current "+this.state.page+"- total:"+responseJson.TotalPages);
          this.setState({      
            //dataSource: this.state.dataSource.cloneWithRows(responseJson.Items),  
            dataSource: this.state.dataSource.concat(responseJson.Items),
            totalPages: responseJson.TotalPages,
            refreshing:false,
    
            page:this.state.page+1,
          });
          console.log(this.state.dataSource.length)
       
      }else{
        console.log('het du lieu, page= '+ this.state.page+'- total='+this.state.totalPages)
      }
      
    })
    .catch((error) => {
      console.error(error);
    });
}

  loadNewData(){
    this.setState({
      page:0,
      totalPages:1,
      refreshing: false,
      //dataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}),
      dataSource: []
    });
    console.log('refresh: data='+this.state.dataSource.length+' - refreshing:'+this.state.refreshing+'- page='+this.state.page)
    this.CrawlProductData("",0,pageSizeDefault());  
      
  }

  _keyExtractor = (item, index) => item.Name;
 
  onEndReached = () => {    
    this.CrawlProductData("",this.state.page,pageSizeDefault())
  } 
  
  render() {

    if(this.state.refreshing){
      return(
        <View style={{flex: 1, padding: 20}}>
          <ActivityIndicator/>
        </View>
      )
    }

    return (           
          
        <View>
          <SearchBar
              lightTheme
              round
              //icon={{ type: 'icon', name: 'search' }}
              searchIcon={true} // You could have passed `null` too
              //onChangeText={someMethod}
              //onClear={someMethod}
          />
          <View style={styles.header}>

          </View>          
          <FlatList                                  
            refreshControl = {
              <RefreshControl
                refreshing={this.state.refreshing}              //bool IsRefresh indicator
                onRefresh={this.loadNewData.bind(this)}         // If yes, do function
                

              />
            }
            
            onEndReached={this.onEndReached.bind(this)}
            onEndReachedThreshold={0.7}
            
            //read each data row by render Row with rowItem
            contentContainerStyle={this.state.containerStyle}
            data={this.state.dataSource}  
            keyExtractor={this._keyExtractor}
            numColumns = {numColumns}        
            renderItem={ ({item}) =>              
                this.ViewItem(item)           
            }
            
          />
        </View>
            
    );
  }

  componentDidMount(){
    this.CrawlProductData("",0,pageSizeDefault());
  }

  ViewItem(item){
    return(
        <View style={styles.itemContainer}>
                { <Image source={{uri:item.Image}} style={styles.imgItem}/> }
                <Text style={{flex:1}}>{item.Name}</Text> 
                <Text style={{flex:1}}>Giá: {item.Price}</Text>                
        </View> 
    );
  }

}

const styles = StyleSheet.create({
  
  itemContainer:{
    flex: 1,
    margin: 5,
    width: window.width/2,
    height:window.height/2,
    backgroundColor: '#FFF',
    alignItems:'center',
    justifyContent: 'center',
    borderWidth:1,
    borderRadius:10
  },
  
  flatContainer:{    
    flexDirection:'column',
    backgroundColor:'#CCC'
  },
  imgItem:{
    width: window.width/2-20,
    height:window.height/2,
    flex:9, 
  },
  header:{
    height:35,

  }
});



