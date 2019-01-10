import React, { Component } from 'react'
import {TextInput, FlatList, StyleSheet, View, Button,SafeAreaView,Image, TouchableOpacity, Text, ScrollView,Alert } from 'react-native'
import {AutoGrowingTextInput} from 'react-native-autogrow-textinput';

import  orderCard from '../../../Api/CartApi/orderCard'
import createOrder from  './../../../Api/CartApi/createOrder'
import saveCart from '../../../Api/CartApi/saveCart';

class CheckOrder extends Component{
    constructor(props){
        super(props);
        this.state={
            name: null, 
            phoneNumber: null,
            address: null,
            phoneNumberValidate: false,
            price: 0,
            count: 0,
            discount: 0,
            data: []
        }
    }
   
    componentWillMount(){
        this.setState({
            data: this.props.navigation.getParam('data'),
            price: this.props.navigation.getParam('price'),
            count: this.props.navigation.getParam('quantity')
        }, ()=>{
           // console.log(this.props.navigation.getParam('data'))
            //console.log(this.props.navigation.getParam('price'))
            //console.log(this.props.navigation.getParam('quantity'))
            //console.log(this.state)
        })
       
    }
    componentDidMount(){
        //console.log('cart check')
        //console.log(this.state.data)
    }

    componentDidUpdate(prevPros, preState){
        //console.log('did update');
        //console.log(this.props, this.state);
    }

    validatePhoneNumber(phoneNumber){
        const val = /(09|01[2|6|8|9])+([0-9]{8})\b/
        //console.log('validate phone number: ',phoneNumber,val.test(phoneNumber))
        return val.test(phoneNumber)
    }

    _onChangeName(text) {
        this.setState({ name: text.nativeEvent.text || '' });
    }

    _onChangePhoneNumber(text) {
        this.setState({ 
            phoneNumber: text.nativeEvent.text || '' 
        }, () =>{
            this.setState({
                phoneNumberValidate: this.validatePhoneNumber(this.state.phoneNumber)
            })
        });
    }

    _onChangeAddress(text) {
        this.setState({ address: text.nativeEvent.text || '' });
    }

    sendData =  () =>{
        let orderViewModel = {
            CustomerName:  this.state.name,
            CustomerAddress:this.state.address,
            CustomerEmail: '',
            CustomerMobile:this.state.phoneNumber,
            CustomerMessage:'',
            PaymentMethod: 'CASH',
            BankCode: null,
            Status: false,            
            //'card': this.state.data
        };  
        let listcart=  [];
        listcart.concat(this.state.data);
         createOrder(orderViewModel,listcart)
        .then(resJSON => {
            //console.log(resJSON.data.status);
            if(resJSON.data.status==true){
                this.setState({
                    data:[]
                },
                ()=>{
                    
                    Alert.alert(
                        'Annoucement',
                        'Your Order is successful',
                        [                         
                          {text: 'OK', onPress: () => {
                            saveCart(this.state.data);
                            this.props.navigation.pop();
                          }},
                        ],
                        { cancelable: false }
                      )
                    //this.props.navigation.pop()
                })
                
            }else{
                Alert.alert(
                    'Annoucement',
                    'Your Order is unsuccessful',
                    // [                         
                    //   {text: 'OK', onPress: () => {
                    //     saveCart(this.state.data);
                    //     this.props.navigation.pop();
                    //   }},
                    // ],
                    { cancelable: true }
                  )
            }
        })
        .catch((error) => {
            console.error('send data Error'+ error);
          });
    }

    renderItem = ({item}) => {
        return (
            <TouchableOpacity>
                <View style = {styles.Itemcontainer}>
                    <View>
                        <Image
                            resizeMode = 'contain'
                            style ={{flex: 1,
                                alignSelf: 'stretch',
                                alignContent: 'center',
                                justifyContent: 'center',
                                height: 100, 
                                width: 120,
                                borderTopLeftRadius: 5,
                                borderBottomLeftRadius: 5,
                            }}
                            source = {{uri:item.Image}}
                            
                        />
                    </View>
                    <View style= {styles.ItemInfo}>
                        <View/>
                        <View style ={styles.nameHost}>
                            <Text style= {{fontWeight: 'bold', fontSize: 15,}}>
                                {item.Name}
                            </Text>    
                        </View>
                        <View>
                            <Text>Số lượng: {item.Quantity}</Text>
                        </View>
                        <View style ={styles.nameCategory}>
                            <Text >
                                Đơn giá: {item.Price}
                            </Text>
                        </View>
                        <View />
                    </View>
                </View>
            </TouchableOpacity>
        )
    }

    render(){
        return (
            <SafeAreaView style ={{flex: 1}}>
                <ScrollView style = {{flex: 1}}>
                    <View style = {styles.container}>
                        <View style = {styles.input}>                 
                            <Text style= {{ fontSize: 20,}}> Name: </Text>
                            <AutoGrowingTextInput
                                value={this.state.textValue}
                                onChange={(text) => this._onChangeName(text)}
                                style={styles.textInput}
                                placeholder={'Enter your name'}
                                placeholderTextColor='#66737C'
                                maxHeight={200}
                                minHeight={30}
                                enableScrollToCaret
                                ref={(r) => { this._textInput = r; }}
                            />
                            <Text style= {{ fontSize: 20,}}> Phone number: </Text>

                            <AutoGrowingTextInput
                                value={this.state.textValue}
                                onChange={(text) => this._onChangePhoneNumber(text)}
                                style={styles.textInput}
                                placeholder={'Enter your phone number'}
                                placeholderTextColor='#66737C'
                                maxHeight={200}
                                minHeight={30}
                                enableScrollToCaret
                                ref={(r) => { this._textInput = r; }}
                                blurOnSubmit={false}
                                errorStyle={{textAlign: 'center', fontSize: 12}}
                                errorMessage={this.state.phoneNumberValidate ? null : 'Please enter a valid email address'}
                            />
                            <Text style= {{ fontSize: 20, borderBottomWidth:2}}> Address: </Text>
                            <AutoGrowingTextInput
                                value={this.state.textValue}
                                onChange={(text) => this._onChangeAddress(text)}
                                style={styles.textInput}
                                placeholder={'Enter your Address'}
                                placeholderTextColor='#66737C'
                                maxHeight={200}
                                minHeight={30}
                                enableScrollToCaret
                                ref={(r) => { this._textInput = r; }}
                            />    
                            <View style={{height :90}}>
                                <View style={stylesCount.row}>
                                    <View style= {stylesCount.titleStyle}>
                                        <Text style={stylesCount.fontStyle}>Số lượng sản phẩm: </Text>
                                    </View>
                                    <Text style ={[stylesCount.valueStyle,stylesCount.fontStyle]}>{this.state.count} </Text>
                                </View>
                                <View style={stylesCount.row}>
                                    <View style= {stylesCount.titleStyle}>
                                        <Text style={stylesCount.fontStyle}>Số tiền: </Text>
                                    </View>    
                                    <Text style ={[stylesCount.valueStyle,stylesCount.fontStyle]}>{this.state.price}</Text>
                                </View>
                                <View style={stylesCount.row}>
                                    <View style= {stylesCount.titleStyle}>
                                        <Text style={stylesCount.fontStyle}>Giảm giá: </Text>
                                    </View>
                                    <Text style ={[stylesCount.valueStyle,stylesCount.fontStyle]}>{this.state.discount}</Text>
                                </View>
                                <View style={stylesCount.row}>
                                    <View style= {stylesCount.titleStyle}>
                                        <Text style={stylesCount.fontStyle}>Tổng tiền: </Text> 
                                    </View>
                                    <Text style ={[stylesCount.valueStyle,stylesCount.fontStyle]}>{this.state.price-this.state.discount}</Text> 
                                </View>
                            </View>
                            <View style={{height:10}}/>      

                            <FlatList
                                data = {this.state.data}
                                keyExtractor = {(item, index)=> index.toString()}
                                renderItem = {this.renderItem}
                            />
                
                        </View>
                        <View style ={{justifyContent: 'flex-end', alignItems: 'center'}}>
                            <TouchableOpacity 
                                style = {styles.buttonStyle}
                                onPress = {this.sendData}
                            >
                                <Text style = {{fontSize: 20,fontWeight: 'bold'}}>Đặt hàng</Text> 
                            </TouchableOpacity> 
                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView>
        )
    }
}


const styles = StyleSheet.create({
    container:{
        flex: 1,
        margin: 10,
    },
    textInput: {
        paddingLeft: 10,
        fontSize: 17,
        flex: 1,
        backgroundColor: 'white',
        borderWidth: 0,
      },
    input: {
        flex :1, 
    },
    textInput:{
        fontSize: 20,
        margin: 5,
    },
    buttonStyle:{
        height: 50, 
        width: 250, 
        alignItems : 'center',
        justifyContent: 'center',
        backgroundColor: 'rgb(233,233,240)', 
        borderWidth: 2, 
        borderColor: 'black', 
        borderRadius: 30,
    },
    Itemcontainer:{
        flex: 1,
        flexDirection: 'row',
        //backgroundColor: 'red',
        margin: 5,
        borderRadius: 5
    },
    ItemInfo:{
        flexDirection: 'column',
        justifyContent: 'space-around'
    },
})


const stylesCount = StyleSheet.create({
    row: {
        flex: 1, 
        flexDirection:'row',
    },
    fontStyle: {
        fontSize : 15,
    },
    titleStyle:{
        flex: 1,
        flexDirection: 'column', 
        alignItems: 'flex-end',
    },
    valueStyle:{
        flex: 1,
    }
})

export default CheckOrder
