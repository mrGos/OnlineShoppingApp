/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Text, View,FlatList,Image,RefreshControl,ActivityIndicator,StyleSheet,TouchableOpacity,SafeAreaView } from 'react-native';
import { SearchBar } from 'react-native-elements';
import FAIcon from 'react-native-vector-icons/FontAwesome'


import {getAllProduct} from '../../../Api/ProductApi/getProduct';
import {pageSizeDefault} from '../../../Common/PaginationDefault';


const screen = require('Dimensions');
const window = screen.get('window');
const numColumns = 2;

export default class Products extends Component {

  constructor(props){
    super(props);    
    this.state = {
      searchbarTxt:'',
      containerStyle: styles.flatContainer,
      itemStyle: styles.itemContainer,
      page:0,
      totalPages:1,
      refreshing: false,
      //dataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}),
      dataSource:[]
    };
  }


  componentDidMount(){
    this.loadData();
    //this.CrawlProductData("",0,pageSizeDefault());
  }



//  CrawlProductData(keyword,page,pageSize){
//   getAllProduct(keyword,page,pageSize)
//     .then((responseJson) => {
//       console.log('lengthItems='+responseJson.Items.length+'- page= '+this.state.page+'- totalPage'+ this.state.totalPages);
//       if(this.state.page<this.state.totalPages&&responseJson.Items.length!=0){
//           console.log( "current "+this.state.page+"- total:"+responseJson.TotalPages);
//           this.setState({      
//             //dataSource: this.state.dataSource.cloneWithRows(responseJson.Items),  
//             dataSource: this.state.dataSource.concat(responseJson.Items),
//             totalPages: responseJson.TotalPages,
//             refreshing:false,
    
//             page:this.state.page+1,
//           });
//           console.log(this.state.dataSource.length)
       
//       }else{
//         console.log('het du lieu, page= '+ this.state.page+'- total='+this.state.totalPages)
//       }
      
//     })
//     .catch((error) => {
//       console.log('is it here?')
//       console.error(error);
//     });
//   }


  loadData = () => {
    console.log('loaddata page', this.state.page)
    getAllProduct('',this.state.page,2)
      .then((responseJson) => {
        console.log(responseJson);
        console.log( "current "+this.state.page+"- total:"+responseJson.TotalPages);
        this.setState({      
          dataSource: responseJson.Items,
          totalPages: responseJson.TotalPages,
          refreshing:false,
        });
        console.log(this.state)
      })
      .catch((error) => {
        console.log('is it here?')
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
    //this.CrawlProductData("",this.state.page,pageSizeDefault())
  } 
  
  onClickItem(item){
    this.props.navigation.navigate('Details', {
      item: item
    });
  }

  onSearchSubmmit(){
    if(this.state.searchbarTxt!=''){
      this.props.navigation.navigate('Search', {
        txt: this.state.searchbarTxt
      });
    }
    console.log('onSubmit: '+this.state.searchbarTxt);
  }

  pageDown = () => {
    if (this.state.page>0){
        this.setState ({
            page: this.state.page -1 
        }, this.loadData)
    }
  }

  pageUp = () =>{
      if (this.state.page < this.state.totalPages-1){
          this.setState ({
              page: this.state.page +1 
          },this.loadData)
      }
  }

  ViewItem(item){
    return(
      <TouchableOpacity onPress={()=> this.onClickItem(item)}>
        <View style={styles.itemContainer}>
                <Image source={{uri:item.Image}} style={styles.imgItem}/> 
                <Text style={{flex:1}}>{item.Name}</Text> 
                <Text style={{flex:1}}>Giá: {item.Price}</Text>                
        </View>
      </TouchableOpacity> 
    );
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
        <SafeAreaView style = {{flex: 1, backgroundColor: 'rgb(57,62,66)'}}>
          <View>
            <SearchBar
                //lightTheme
                round              
                clearIcon={true}
                searchIcon={true} // You could have passed `null` too
                //onClear={someMethod}
                onChangeText={(searchbarTxt) => this.setState({searchbarTxt})}
                onSubmitEditing={this.onSearchSubmmit.bind(this)}
                value ={this.state.searchbarTxt}
            />     
            <View style ={styles.page}>
                <FAIcon
                    onPress = {this.pageDown}
                    name = 'chevron-left'
                    style = {{
                        color: 'black',
                        fontSize: 20
                    }}
                />
                <Text style = {{color: 'black', fontSize: 20}}>{this.state.page+1}</Text>
                <FAIcon
                    onPress = {this.pageUp}
                    name = 'chevron-right'
                    style = {{
                        color: 'black',
                        fontSize: 20
                    }}
                />
            </View>   
            <FlatList                                  
              refreshControl = {
                <RefreshControl
                  refreshing={this.state.refreshing}              //bool IsRefresh indicator
                  //onRefresh={this.loadNewData.bind(this)}         // If yes, do function
                  onRefresh={this.loadData}
                />
              }
              
              onEndReached={this.onEndReached.bind(this)}
              onEndReachedThreshold={1}
              
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
        </SafeAreaView>
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
    resizeMode: "stretch"
  },
  page:{
    flexDirection: 'row',
    
    justifyContent: 'space-around',
    height: 20,
  },

});



