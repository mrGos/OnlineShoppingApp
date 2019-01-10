import React, { Component } from 'react';
import { View, Text,StyleSheet,Image,FlatList,SafeAreaView ,TouchableOpacity} from 'react-native';
import { Button } from 'react-native-elements'
import FAIcon from 'react-native-vector-icons/FontAwesome'

import getLikedCart from './../../../Api/CartApi/getLikedCart'
import saveLikedCart from './../../../Api/CartApi/saveLikedCart'

const numColumns = 1;
const screen = require('Dimensions');
const window = screen.get('window');

export default class WishList extends Component {
    constructor(props){
        super(props)
        this.state={
            wishlist:[],
            price: 0, 
            quantity: 0,   
        }

        this.Crawlwishlist = this.Crawlwishlist.bind(this)
        this._onClickIncreaseQuantity = this._onClickIncreaseQuantity.bind(this)
        this._onClickRemove = this._onClickRemove.bind(this)
        
        const { navigation } = this.props;         
        
         navigation.addListener('didFocus', () => {
             this.Crawlwishlist();       
           });
    }


    _onClickRemove(productId) {
        try{
            const newwishlist = this.state.wishlist.filter(e => e.ID !== productId);
            this.setState({ wishlist: newwishlist ,},
                ()=> {
                    this.updatePriceAndQuantity()
                    saveCart(this.state.wishlist)  
                }            
            );
           
        }catch(e){
            //console.log('error= '+e)
        }
    }


    _keyExtractor = (item) => item.Name;


    Crawlwishlist(){
        getCart()
        .then(resJSON => {
            this.setState({wishlist:resJSON},()=>{
                this.updatePriceAndQuantity();
            }/*()=>{this.Flag = true;}*/)                        
        });
        
    }

    componentWillMount(){
        console.log('cartview will mount');
        this.Crawlwishlist();
        //console.log(this.state);
    }

    _onClick = (item) =>{
        //console.log(this.state)
        this.props.navigation.navigate('Details', {
            item: item
          });
    }


      ViewItem(item){        
        return(
            <SafeAreaView style={{flex: 1}}>
                <View style={styles.itemContainer}>
                    <TouchableOpacity onPress={()=>this.Crawlwishlist._onClick(item)}>
                        <Image source={{uri:item.Image}} style={styles.imgItem}/>
                    </TouchableOpacity>
                    <View style={styles.content}>
                        <View style={styles.contentTop}>
                            <FAIcon
                                name="remove"      
                                size={30}              
                                onPress = {()=>this._onClickRemove(item.ID)}                             
                            />
                        </View>
                        <View style={styles.contentMiddle}>
                            <Text style={{}}>{item.Name}</Text> 
                            <Text style={{fontSize:24}}>Giá: {item.Price}</Text> 
                        </View>                         
                    </View>               
                </View>
            </SafeAreaView>
        );
      }

    render(){        
        
        if (this.state.wishlist.length==0){
            return(
                <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                    <Text style={{fontSize:25}}>YOUR WISHLIST IS EMPTY</Text>
                    
                </View>
            );
        }
        return(
            <View style={{ flex: 1, }}>
               <FlatList                
                    //read each data row by render Row with rowItem
                    contentContainerStyle={styles.flatContainer}
                    data={this.state.wishlist}  
                    keyExtractor={this._keyExtractor}
                    numColumns = {numColumns}        
                    renderItem={ ({item}) =>              
                        this.ViewItem(item)                  
                    }
                />
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
      height:120,//window.height/4,
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
      height:100,//window.height/4-20,
      flex:1, 
      resizeMode: "stretch",
      alignSelf: 'center'
    },
    content:{
        flex:3,
        flexDirection:'column',
    },
    contentTop:{
        flex:1,
        paddingRight: 10,
        justifyContent: 'flex-start',
        alignItems:'flex-end',
    },
    contentMiddle:{
        flex:2,
        flexDirection:'column',
        alignItems:'center'
    },
    contentBottom:{
        flex:1,
        flexDirection:'row',
        justifyContent:'space-around',
        alignItems: 'center',
    },
    btnStyle:{
        //backgroundColor: "#2baf2b",
        //backgroundColor: "black",
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
      },
      btnPayment:{
        //backgroundColor: "#2baf2b",
        backgroundColor: "navy",
        height:60,
        borderColor: "transparent",
        borderWidth: 0,
        borderRadius: 5
      }
  
  });