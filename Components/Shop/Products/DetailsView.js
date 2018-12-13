import React, {Component} from 'react';
import {Text, View,Image,StyleSheet,ScrollView} from 'react-native';
import { Card,Button } from 'react-native-elements'

import saveCart from '../../../Api/CartApi/saveCart'
import getCart from '../../../Api/CartApi/getCart'

const screen = require('Dimensions');
const window = screen.get('window');

export default class Products extends Component {
  
  constructor(props){
    super(props)
    this.state={
      cartData:[],
      Flag:false
    }
    this.CrawlCartData= this.CrawlCartData.bind(this)
    this.addProductToCart = this.addProductToCart.bind(this)
    this._onClick = this._onClick.bind(this)
    
    
    const { navigation } = this.props; 

    item = navigation.getParam('item', 'NO-ID');
    navigation.addListener('didFocus', () => {      
        this.setState({},()=>this.CrawlCartData())      
    });
  }

  componentWillMount(){
    console.log(this.props);
  }
  
  addProductToCart(product) {
    //this.CrawlCartData();
    console.log('cartDataInit= '+this.state.cartData)
    try{
      const isExist = this.state.cartData.some(e => e.ID === product.ID);
      console.log('check cartData= '+this.state.cartData)
      if (!isExist && this.state.Flag){
        product.Quantity=1;
        console.log('flag add sucess= '+this.state.Flag)
        this.setState(
            {
              cartData: this.state.cartData.push(product),Flag:false 
            },
        );
        
        saveCart(this.state.cartData)
        this.props.navigation.navigate('Cart');
      }else{
        console.log('sp da ton tai va '+ this.state.Flag)
      } 
    }catch(e){

    }
   
  }

CrawlCartData(){
  getCart()
  .then(resJSON => {
     this.setState({cartData:resJSON, Flag:true})            
  });
}

  _onClick(product){
    console.log('product data'+product)
    this.addProductToCart(product);
      //  this.props.navigation.navigate('Cart',{
      //    productParam: product
      //  });
      
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
                <Text>Content: {item.Content/*.replace("<p>","").replace("</p>","")*/} </Text>
              </View>
              <Button
                  title="THÊM VÀO GIỎ HÀNG"                    
                  titleStyle={{ fontWeight: "700" }}
                  buttonStyle={styles.btnStyle}
                  onPress = {()=>this._onClick(item)}
                  containerStyle={{ marginTop: 20 }}
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
  }
});