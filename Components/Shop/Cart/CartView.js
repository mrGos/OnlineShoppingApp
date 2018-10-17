import React, { Component } from 'react';
import { View, Text,StyleSheet,Image,FlatList } from 'react-native';
import { Button } from 'react-native-elements'

import getCart from '../../../Api/CartApi/getCart'
import saveCart from '../../../Api/CartApi/saveCart'

const numColumns = 1;
const screen = require('Dimensions');
const window = screen.get('window');

export default class Cart extends Component {
    constructor(props){
        super(props)
        this.state={
            cartData:[],
            count:0
        }
        //saveCart([])
        this.CrawlCartData = this.CrawlCartData.bind(this)


    }


    componentWillUpdate(){
        this.CrawlCartData()
        
        console.log('cart update data= ' +this.state.cartData)
    }

    _keyExtractor = (item) => item.Name;


    CrawlCartData(){
        getCart()
        .then(resJSON => {
            this.setState({cartData:resJSON})            
        });
    }

    render(){
        
        
        if (this.state.cartData.length==0){
            return(
                <View>
                    <Text>GIỎ HÀNG RỖNG</Text>
                </View>
            );
        }
        return(
            <View style={{ flex: 1,  }}>
               <FlatList                
                //read each data row by render Row with rowItem
                contentContainerStyle={styles.flatContainer}
                data={this.state.cartData}  
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
        this.CrawlCartData();
        console.log('cartDataInit check= ' + this.state.cartData)
        console.log('cartData init size= '+ this.state.cartData.length)
      }

      ViewItem(item){        
        return(

            <View style={styles.itemContainer}>
                    { <Image source={{uri:item.Image}} style={styles.imgItem}/> }
                    <View style={styles.content}>
                        <View style={styles.contentTop}>
                            <Button
                                title="Xóa"                    
                                titleStyle={{ fontWeight: "20" }}
                                buttonStyle={styles.btnStyle}
                                //onPress = {()=>this._onClick(item)}                              
                            />
                        </View>
                        <View style={styles.contentMiddle}>
                            <Text style={{}}>{item.Name}</Text> 
                            <Text style={{fontSize:24}}>Giá: {item.Price}</Text> 
                        </View>
                        <View style={styles.contentBottom}>
                            <Button
                                    title="+"                    
                                    titleStyle={{ fontWeight: "20" }}
                                    buttonStyle={styles.buttonAddStyle}
                                    //onPress = {()=>this._onClick(item)}                              
                                />  
                            <Text>{item.Quantity}</Text>      
                            <Button
                                    title="-"                    
                                    titleStyle={{ fontWeight: "20" }}
                                    buttonStyle={styles.buttonSubtractStyle}
                                    //onPress = {()=>this._onClick(item)}                              
                                />                                                            
                        </View>

                        
                    </View>               
            </View>

        );
      }
}

const styles = StyleSheet.create({
  
    itemContainer:{
      flex: 1,
      marginBottom: 5,   
      marginLeft: 5,
      marginRight: 5,   
      height:window.height/4,
      backgroundColor: '#FFF',
      flexDirection:'row',
      justifyContent: 'center',
      borderWidth:1,
      borderRadius:10,
      borderColor: "transparent"
    },
    
    flatContainer:{    
      flexDirection:'column',
      backgroundColor:'#CCC'
    },
    imgItem:{
      marginTop:5,      
      height:window.height/4-20,
      flex:1, 
      resizeMode: "stretch"
    },
    content:{
        flex:3,
        flexDirection:'column',
    },
    contentTop:{
        flex:1,
        alignItems:'flex-end',
        paddingTop:5
    },
    contentMiddle:{
        flex:3,
        flexDirection:'column',
        alignItems:'center'
    },
    contentBottom:{
        flex:1,
        flexDirection:'row-reverse',
        justifyContent:'space-between'
    },
    btnStyle:{
        //backgroundColor: "#2baf2b",
        backgroundColor: "black",
        height:25,
        width:60,
        borderColor: "transparent",
        borderWidth: 0,
        borderRadius: 2,
      },
      buttonAddStyle:{
        backgroundColor: "green",
        height:25,
        width:60,
        borderColor: "transparent",
        borderWidth: 0,
        borderRadius: 2,
        marginRight:30,
      },
      buttonSubtractStyle:{
        backgroundColor: "red",
        height:25,
        width:60,
        borderColor: "transparent",
        borderWidth: 0,
        borderRadius: 2,
        marginLeft:30,
      }
  
  });