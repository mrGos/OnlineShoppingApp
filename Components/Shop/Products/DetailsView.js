import React, {Component} from 'react';
import {Text, View,Image,StyleSheet,ScrollView,Alert} from 'react-native';
import { Card,Button } from 'react-native-elements'
import { WebView } from 'react-native';

import saveCart from '../../../Api/CartApi/saveCart'
import getCart from '../../../Api/CartApi/getCart'

import saveLikedCart from '../../../Api/CartApi/saveLikedCart'
import getLikedCart from '../../../Api/CartApi/getLikedCart'

import global from './../../../Common/global'

const screen = require('Dimensions');
const window = screen.get('window');

export default class Products extends Component {
  
  constructor(props){
    super(props)
    this.state={
      cartData:[],
      wishlist:[],
      Flag:false
    }
    this.CrawlCartData= this.CrawlCartData.bind(this)
    this.addProductToCart = this.addProductToCart.bind(this)
    this._onClick = this._onClick.bind(this)
    this._onWishListClick = this._onWishListClick.bind(this)
    this.addProductToWishList = this.addProductToWishList.bind(this)
    
    const { navigation } = this.props; 

    item = navigation.getParam('item', 'NO-ID');
    navigation.addListener('didFocus', () => {      
        this.setState({},()=>
        {
          this.CrawlCartData()          
        })      
    });
  }

  componentWillMount(){
    console.log(this.props);
  }
  
  addProductToWishList(product){
    
      if(global.auth===true){
        try{
          let isExist = this.state.wishlist.some(e => e.ID === product.ID);      
          if (!isExist){        
            product.Quantity=1;
            //console.log('flag add sucess= '+this.state.Flag)
            this.setState(
                {
                  wishlist: this.state.wishlist.push(product),Flag:false 
                },
            );            
            saveLikedCart(this.state.wishlist)
            Alert.alert('Success','Product is added to your Wish List')
            this.props.navigation.navigate('Products');
            this.props.navigation.navigate('Home');
          }else{
            //console.log('sp da ton tai va '+ this.state.Flag)
            console.log('move to htis')
            Alert.alert('Annoucement','Product is exist in your Wish List')
          } 
        }catch(e){

        }
      }else{
        Alert.alert('Unsucess','You need to Login')
      }
      
  }

  addProductToCart(product) {
    //this.CrawlCartData();
    console.log('cartDataInit= '+this.state.cartData)
    try{
      const isExist = this.state.cartData.some(e => e.ID === product.ID);
      console.log('check cartData= '+this.state.cartData)
      if (!isExist && this.state.Flag){
        product.Quantity=1;
        
        this.setState(
            {
              cartData: this.state.cartData.push(product),Flag:false 
            },
        );
        
        saveCart(this.state.cartData)
        Alert.alert('Success','Product is added to your Cart')
        this.props.navigation.navigate('Products');
        this.props.navigation.navigate('Cart');
      }else{
        Alert.alert('Annoucement','Product is exist in your Cart')
      } 
    }catch(e){

    }
   
  }

CrawlCartData(){
  getCart()
  .then(resJSON => {
     this.setState({cartData:resJSON, Flag:true})            
  });

  getLikedCart()
  .then(resJSON => {
    this.setState({wishlist:resJSON})            
 });
}

  _onClick(product){
    //console.log('product data'+product)
    this.addProductToCart(product);
  }

  _onWishListClick(product){
    //console.log('product data'+product)
    this.addProductToWishList(product);
  }

  
    render(){

      //console.log(item.Name);
      
      return(
          <ScrollView style={styles.container} >
            <Card
            title={item.Name}>              
              <Image source={{uri:item.Image}} style={styles.imgItem}/>
              <View style={{flex:1,justifyContent:'center', alignSelf:'center'}}>
                <Text>Giá: {item.Price} VND</Text>
                <Text>Bảo hành: {item.Warranty} tháng</Text>
                <Text>Mô tả: {item.Description}</Text>                
                {/* <Text>Content: {item.Content} </Text> */}


              </View>
              <Button
                  title="ADD TO CART"          
                  icon={{name: 'home', size: 32}}       
                  titleStyle={{ fontWeight: "700" }}
                  buttonStyle={styles.btnStyle}
                  onPress = {()=>this._onClick(item)}
                  containerStyle={{ marginTop: 20 }}
                />
              <Button  
                title="ADD TO WISHLIST"                    
                  titleStyle={{ fontWeight: "700" }}
                  buttonStyle={styles.wishbutton}
                  onPress = {()=>this._onWishListClick(item)}
                  containerStyle={{ marginTop: 5 }} 
                />

            </Card>
  
          </ScrollView>
      );
  }

  componentDidMount(){
    //this.CrawlCartData()
    //this.setState({},()=> this.CrawlCartData())
    console.log('INIT DATA CART= '+ this.state.cartData)
  }

}

const styles = StyleSheet.create({  
    container:{
    flex: 1,
    //backgroundColor:"#4FC3F7"
    backgroundColor:"white"
  },

  imgItem:{
    height:350,
    flex:9,
    resizeMode: "stretch" 
  },
  btnStyle:{
    //backgroundColor: "#2baf2b",
    backgroundColor: "black",
    height:80,
    borderColor: "transparent",
    borderWidth: 0,
    borderRadius: 5
  },
  wishbutton:{
    backgroundColor: "red",
    height:80,
    borderColor: "transparent",
    borderWidth: 0,
    borderRadius: 5,
  }
});