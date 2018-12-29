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
const numColumns = 1 ;

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
    getAllProduct('',this.state.page,pageSizeDefault)
      .then((responseJson) => {
        console.log(responseJson);
        console.log( "current "+this.state.page+"- total:"+responseJson.TotalPages);
        this.setState({      
          dataSource: [...this.state.dataSource,...responseJson.Items],
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

  loadMore = () =>{
    if (this.state.page < this.state.totalPages-1){
      this.setState({
        page: this.state.page+1,
      },this.loadData)
    }
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

  renderButton = () =>{
    return(
      <TouchableOpacity 
        style = {styles.buttonStyle}
        onPress = {this.loadMore}
      >
        <Text style = {{fontSize: 20,fontWeight: 'bold'}}>Loadmore</Text> 
      </TouchableOpacity>
    )
  }

  resetData = () => {
    this.setState({
      page: 0,
      dataSource: [],
    }, this.loadData)
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
        <SafeAreaView style = {{flex: 1, backgroundColor: 'transparent'}}>
          <View>
            <SearchBar
                //lightTheme
                round          
                style = {styles.SearchBar}    
                clearIcon={true}
                searchIcon={true} // You could have passed `null` too
                //onClear={someMethod}
                onChangeText={(searchbarTxt) =>  this.setState({searchbarTxt})}
                onSubmitEditing={this.onSearchSubmmit.bind(this)}
                value ={this.state.searchbarTxt}
            />     
              
            
            <FlatList                                  
              refreshControl = {
                <RefreshControl
                  refreshing={this.state.refreshing}              //bool IsRefresh indicator
                  //onRefresh={this.loadNewData.bind(this)}         // If yes, do function
                  onRefresh={this.resetData}
                />
              }
              
              ListFooterComponent={this.renderButton}
              //onEndReachedThreshold={1}
              
              //read each data row by render Row with rowItem
              contentContainerStyle={{backgroundColor: 'transparent'}}//this.state.containerStyle}
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
  SearchBar:{
    backgroundColor: 'transparent'
  },
  itemContainer:{
    marginBottom: 10,
    shadowOpacity: 0.2,
    marginLeft: 20,
    marginRight: 20,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonStyle:{
    height: 50, 
    width: 250, 
    alignSelf: 'center',
    alignItems : 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent', 
    borderWidth: 2, 
    borderColor: 'black', 
    borderRadius: 30,
    marginBottom:100,
  },
  flatContainer:{    
    flexDirection:'column',
    backgroundColor:'#CCC'
  },
  imgItem:{
    width: 300,///window.width/2-20,
    height:300,///window.height/2,
    flex:9, 
    resizeMode: "stretch"
  },
  page:{
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    height: 30,
  },

});

{/* <View style ={styles.page}>
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
</View>  */}
