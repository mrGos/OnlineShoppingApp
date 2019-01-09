import React, { Component } from 'react';
import { View, Text,FlatList,Image,TouchableOpacity,StyleSheet } from 'react-native';

import {getAllProduct} from '../../../Api/ProductApi/getProduct';
import {pageSizeDefault} from '../../../Common/PaginationDefault';

const numColumns = 2;
const screen = require('Dimensions');
const window = screen.get('window');

export default class SearchResultView extends Component {
constructor(props){
    super(props)
    var txtSearching =''
    this.state={
        dataSource:[]
    }
    
}

CrawlProductData(keyword,page,pageSize){

    getAllProduct(keyword,page,pageSize)
      .then((responseJson) => {       
        if(responseJson.Items.length!=0){
            this.setState({ 
              dataSource: responseJson.Items
            });
            console.log(this.state.dataSource.length)
         
        }else{
          console.log('khong tim thay du lieu')
        }
        
      })
      .catch((error) => {
        console.error(error);
      });
  }
  _keyExtractor = (item, index) => item.Name;

  onClickItem(item){
    this.props.navigation.navigate('Details', {
      item: item
    });
  }

    render(){
        const { navigation } = this.props;
        txtSearching = navigation.getParam('txt', 'NO-TXT');
        console.log(this.state.dataSource.length)
        if(this.state.dataSource.length!=0){
            return(
                <View style={{ flex: 1 }}>
                    <Text style={styles.resultStyle}> Kết quả tìm kiếm "{txtSearching}": </Text>
                    <FlatList                                
                        
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
        }else{
            return(
                <View>
                    <Text style={styles.resultStyle}> Không tìm thấy kết quả </Text>
                </View>
            );
        }

    }

    ViewItem(item){
        return(
          <TouchableOpacity onPress={()=> this.onClickItem(item)}>
            <View style={styles.itemContainer}>
                    { <Image source={{uri:item.Image}} style={styles.imgItem}/> }
                    <Text style={{flex:1}}>{item.Name}</Text> 
                    <Text style={{flex:1}}>Giá: {item.Price}</Text>                
            </View>
          </TouchableOpacity> 
        );
      }

    componentDidMount(){
        this.CrawlProductData(txtSearching,0,pageSizeDefault()+3);
      }
}

const styles = StyleSheet.create({
  
    itemContainer:{
      flex: 1,
      margin: 5,
      width: window.width/2,
      height:window.height/2,
      backgroundColor: '#E9E9EF',
      alignItems:'center',
      justifyContent: 'center',
    },
    
    flatContainer:{    
      flexDirection:'column',
      backgroundColor:'#E9E9EF'
    },
    imgItem:{
      width: window.width/2-20,
      height:window.height/2,
      flex:9, 
      resizeMode: "stretch"
    },
    resultStyle:{
        fontSize:24,
        marginBottom:20,
        fontWeight: 'bold',
        // font-family: 'lucida grande', tahoma, verdana, arial, sans-serif;
        fontFamily: 'sans-serif',
    },
  
  });