import React, { Component } from 'react';
import { View, Text,StyleSheet,Image,FlatList,SafeAreaView } from 'react-native';
import { Button } from 'react-native-elements'
import FAIcon from 'react-native-vector-icons/FontAwesome'

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
            price: 0, 
            quantity: 0,   
        }
        //this.Flag = false 
        
        //saveCart([])
        this.CrawlCartData = this.CrawlCartData.bind(this)
        this._onClickIncreaseQuantity = this._onClickIncreaseQuantity.bind(this)
        //this.getParam = this.getParam.bind(this)
        //this.addProductToCart = this.addProductToCart.bind(this)
        this._onClickRemove = this._onClickRemove.bind(this)
        
        const { navigation } = this.props;         
        
         navigation.addListener('didFocus', () => {
             this.CrawlCartData();       
           });
    }

/*
    getParam(){             
        const productParam = this.props.navigation.getParam('productParam', 'NO-Param');
        if(productParam != 'NO-Param'){
            this.addProductToCart(productParam)            
            console.log(productParam.Name)
        }else{
            console.log('NO PARAM')
        }
    }*/
/*
    addProductToCart(product) { 
        try{       
            if(this.Flag){
                console.log('cartDataInit= '+this.state.cartData)
            
              const isExist = this.state.cartData.some(e => e.ID === product.ID);
              console.log('check cartData= '+this.state.cartData)
              if (!isExist){
                product.Quantity+=1;
                this.setState(
                    {
                      cartData: this.state.cartData.concat(product)
                    },
                    ()=> saveCart(this.state.cartData)
                );
                
                console.log('check Save DATA'+ this.state.cartData)
              }else{
                console.log('sp da ton tai')
              } 
            }            
        }catch(e){
            console.log('Error add: '+e)
            
        }
        
       
    }
*/

    updatePriceAndQuantity (){
        let sumPrice = 0;
        let Quantity = 0;
        this.state.cartData.forEach(e => {
            sumPrice = sumPrice + e.Price*e.Quantity;
            Quantity = Quantity + e.Quantity; 
        })
        this.setState({
            price:sumPrice,
            quantity: Quantity,
        },()=> {})   
        // },()=> {console.log(this.state, sumPrice)})
    }

    _onClickIncreaseQuantity(productId) {
        console.log('_onClickIncreaseQuantity');
            //console.log(this.props);
            //console.log(this.state);
        const newCart = this.state.cartData.map(e => {
            if (e.ID !== productId) return e;
            e.Quantity+=1;
            return e;
        });
        this.setState({ 
            cartData: newCart}, 
            () => {
                this.updatePriceAndQuantity();
                saveCart(this.state.cartData)
            }
        );
    }

    _onClickDecreaseQuantity(product) {
        console.log('_onClickDecreaseQuantity');
            //console.log(this.props);
            //console.log(this.state);
        if(product.Quantity>0){
            const newCart = this.state.cartData.map(e => {
                if (e.ID !== product.ID) return e;
                e.Quantity -=1
                return e;
            });
            this.setState({ 
                cartData: newCart}, 
                () => {
                    this.updatePriceAndQuantity()
                    saveCart(this.state.cartData)
                }
            );
        }
    }

    _onClickRemove(productId) {
        //console.log('_onClickRemove');
       // console.log(this.props);
        //console.log(this.state);
        try{
            const newCartData = this.state.cartData.filter(e => e.ID !== productId);
            this.setState({ cartData: newCartData ,},
                ()=> {
                    this.updatePriceAndQuantity()
                    saveCart(this.state.cartData)  
                }            
            );
           
        }catch(e){
            //console.log('error= '+e)
        }
    }


    _keyExtractor = (item) => item.Name;


    CrawlCartData(){
        getCart()
        .then(resJSON => {
            this.setState({cartData:resJSON},()=>{
                this.updatePriceAndQuantity();
            }/*()=>{this.Flag = true;}*/)                        
        });
        
    }

    componentWillMount(){
        console.log('cartview will mount');
        this.CrawlCartData();
        this.updatePriceAndQuantity();
        //console.log(this.state);
    }

    render(){        
        
        if (this.state.cartData.length==0){
            return(
                <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                    <Text style={{fontSize:25}}>YOUR CART IS EMPTY</Text>
                    
                </View>
            );
        }
        return(
            <View style={{ flex: 1, }}>
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
                <Button
                  title="TIẾN HÀNH THANH TOÁN"                    
                  titleStyle={{ fontWeight: "500" }}
                  buttonStyle={styles.btnPayment}
                  onPress = {()=>this._onClick()}
                  containerStyle={{ marginTop: 20 }}
                />
            </View>
        );
    }

    _onClick = () =>{
        //console.log(this.state)
        this.props.navigation.navigate('CheckOrder',{data: this.state.cartData, price: this.state.price, quantity: this.state.quantity})
    }


      ViewItem(item){        
        return(
            <SafeAreaView style={{flex: 1}}>
                <View style={styles.itemContainer}>
                    <Image source={{uri:item.Image}} style={styles.imgItem}/>
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
                        <View style={styles.contentBottom}>
                            <View/>
                            <FAIcon
                                name = 'minus'
                                style ={{color: 'red'}}
                                size = {30}
                                onPress = {()=>this._onClickDecreaseQuantity(item)}                              
                            />     
                            <Text>{item.Quantity}</Text>       
                            <FAIcon
                                name = 'plus'
                                style = {{color: 'green'}}
                                size = {30}
                                onPress = {()=>this._onClickIncreaseQuantity(item.ID)}                              
                            />  
                            <View/>
                        </View> 
                    </View>               
                </View>
            </SafeAreaView>
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