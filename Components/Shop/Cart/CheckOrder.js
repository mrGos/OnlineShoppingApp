// import React, { Component } from 'react'
// import {TextInput, FlatList, StyleSheet, View, Button,SafeAreaView,Image, TouchableOpacity, Text} from 'react-native'
// import {AutoGrowingTextInput} from 'react-native-autogrow-textinput';

// import  orderCard from '../../../Api/CartApi/orderCard'


// class CheckOrder extends Component{
//     constructor(props){
//         super(props);
//         this.state={
//             name: null,
//             phoneNumber: null,
//             address: null,
//             data: []
//         }
//     }
//     renderItem = (rawitem) => {
//         console.log('CheckOrder Item: ', rawitem)
//         const {item}= rawitem
//         return (
//             <TouchableOpacity>
//                 <View style = {styles.Itemcontainer}>
//                     <View>
//                         <Image
//                             resizeMode = 'contain'
//                             style ={{flex: 1,
//                                 alignSelf: 'stretch',
//                                 alignContent: 'center',
//                                 justifyContent: 'center',
//                                 height: 100, 
//                                 width: 120,
//                                 borderTopLeftRadius: 5,
//                                 borderBottomLeftRadius: 5,
//                             }}
//                             source = {{uri:item.Image}}
                            
//                         />
//                     </View>
//                     <View style= {styles.ItemInfo}>
//                         <View/>
//                         <View style ={styles.nameHost}>
//                             <Text size= 'normal' bold = {true} color = 'red'>
//                                 {item.Name}
//                             </Text>    
//                         </View>
//                         <View style ={styles.nameCategory}>
//                             <Text size= 'small' bold = {false}>
//                                 {item.Price}
//                             </Text>
//                         </View>
//                         <View />
//                     </View>
//                 </View>
//             </TouchableOpacity>
//         )
//     }

//     componentWillMount(){
//         console.log(this.props.navigation.getParam('data'))
//         this.setState({
//             data: this.props.navigation.getParam('data')
//         })
       
//     }
//     componentDidMount(){
//         console.log('cart check')
//         console.log(this.state.data)
//     }

//     _onChangeName(text) {
//         this.setState({ name: text.nativeEvent.text || '' });
//     }

//     _onChangePhoneNumber(text) {
//         this.setState({ phoneNumber: text.nativeEvent.text || '' });
//     }

//     _onChangeAddress(text) {
//         this.setState({ address: text.nativeEvent.text || '' });
//     }

//     sendData = () =>{
//         const data = {
//             'name' : this.state.name,
//             'phoneNumber' : this.state.phoneNumber,
//             'address' :this.state.address,
//             'card': this.state.data
//         }
//         console.log('is it here?')
//         orderCard(data);
//     }
//     render(){
//         return (
//             <SafeAreaView style ={{flex: 1}}>
//                 <View style = {styles.container}>
//                     <View style = {styles.input}>
//                         <Text style= {{ fontSize: 20,}}> Name: </Text>
//                         <AutoGrowingTextInput
//                             value={this.state.textValue}
//                             onChange={(text) => this._onChangeName(text)}
//                             style={styles.textInput}
//                             placeholder={'Enter your name'}
//                             placeholderTextColor='#66737C'
//                             maxHeight={200}
//                             minHeight={30}
//                             enableScrollToCaret
//                             ref={(r) => { this._textInput = r; }}
//                         />
//                         <Text style= {{ fontSize: 20,}}> Phone number: </Text>
//                         <AutoGrowingTextInput
//                             value={this.state.textValue}
//                             onChange={(text) => this._onChangePhoneNumber(text)}
//                             style={styles.textInput}
//                             placeholder={'Enter your phone number'}
//                             placeholderTextColor='#66737C'
//                             maxHeight={200}
//                             minHeight={30}
//                             enableScrollToCaret
//                             ref={(r) => { this._textInput = r; }}
//                         />
//                         <Text style= {{ fontSize: 20, borderBottomWidth:2}}> Address: </Text>
//                         <AutoGrowingTextInput
//                             value={this.state.textValue}
//                             onChange={(text) => this._onChangeAddress(text)}
//                             style={styles.textInput}
//                             placeholder={'Enter your Address'}
//                             placeholderTextColor='#66737C'
//                             maxHeight={200}
//                             minHeight={30}
//                             enableScrollToCaret
//                             ref={(r) => { this._textInput = r; }}
//                         />    
//                         <View style={{height:10}}/>      
//                         <FlatList
//                             data = {this.state.data}
//                             keyExtractor = {(item, index)=> index.toString()}
//                             renderItem = {this.renderItem}
//                         />
//                     </View>
//                     <View style ={{justifyContent: 'flex-end', alignItems: 'center'}}>
//                         <TouchableOpacity 
//                             style = {styles.buttonStyle}
//                             onPress = {this.sendData}
//                         >
//                             <Text style = {{fontSize: 20,fontWeight: 'bold'}}>Đặt hàng</Text> 
//                         </TouchableOpacity>
//                     </View>
//                 </View>
//             </SafeAreaView>
//         )
//     }
// }

// export default CheckOrder

// const styles = StyleSheet.create({
//     container:{
//         flex :1,
//         margin: 10,
//     },
//     textInput: {
//         paddingLeft: 10,
//         fontSize: 17,
//         flex: 1,
//         backgroundColor: 'white',
//         borderWidth: 0,
//       },
//     input: {
//         flex :1, 
//     },
//     textInput:{
//         fontSize: 20,
//         height: 25,
//         margin: 5,
//     },
//     buttonStyle:{
//         height: 50, 
//         width: 250, 
//         alignItems : 'center',
//         justifyContent: 'center',
//         backgroundColor: 'transparent', 
//         borderWidth: 2, 
//         borderColor: 'black', 
//         borderRadius: 30,
//     },
//     Itemcontainer:{
//         flex: 1,
//         flexDirection: 'row',
//         //backgroundColor: 'red',
//         margin: 5,
//         borderRadius: 5
//     },
//     ItemInfo:{
//         flexDirection: 'column',
//         justifyContent: 'space-around'
//     },
// })

import React, { Component } from 'react'
import {TextInput, FlatList, StyleSheet, View, Button,SafeAreaView,Image, TouchableOpacity, Text} from 'react-native'
import {AutoGrowingTextInput} from 'react-native-autogrow-textinput';

import  orderCard from '../../../Api/CartApi/orderCard'


class CheckOrder extends Component{
    constructor(props){
        super(props);
        this.state={
            name: null, 
            phoneNumber: null,
            address: null,
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
            console.log(this.props.navigation.getParam('data'))
            console.log(this.props.navigation.getParam('price'))
            console.log(this.props.navigation.getParam('quantity'))
            console.log(this.state)
        })
       
    }
    componentDidMount(){
        console.log('cart check')
        console.log(this.state.data)
    }

    _onChangeName(text) {
        this.setState({ name: text.nativeEvent.text || '' });
    }

    _onChangePhoneNumber(text) {
        this.setState({ phoneNumber: text.nativeEvent.text || '' });
    }

    _onChangeAddress(text) {
        this.setState({ address: text.nativeEvent.text || '' });
    }

    sendData = () =>{
        const data = {
            'name' : this.state.name,
            'phoneNumber' : this.state.phoneNumber,
            'address' :this.state.address,
            'card': this.state.data
        }
        console.log('is it here?')
        orderCard(data);
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
                            <Text size= 'normal' bold = {true} color = 'red'>
                                {item.Name}
                            </Text>    
                        </View>
                        <View style ={styles.nameCategory}>
                            <Text size= 'small' bold = {false}>
                                {item.Price}
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
                        <View style={{flex: 1}}>
                            <View style={{flex: 1, flexDirection:'row'}}>
                                <View style= {stylesCount.titleStyle}>
                                    <Text style={stylesCount.fontStyle}>Số lượng sản phẩm: </Text>
                                </View>
                                <Text style ={[stylesCount.valueStyle,stylesCount.fontStyle]}>{this.state.count} </Text>
                            </View>
                            <View style={{flex: 1, flexDirection:'row'}}>
                                <View style= {stylesCount.titleStyle}>
                                    <Text style={stylesCount.fontStyle}>Số tiền: </Text>
                                </View>    
                                <Text style ={[stylesCount.valueStyle,stylesCount.fontStyle]}>{this.state.price}</Text>
                            </View>
                            <View style={{flex: 1, flexDirection:'row'}}>
                                <View style= {stylesCount.titleStyle}>
                                    <Text style={stylesCount.fontStyle}>Giảm giá: </Text>
                                </View>
                                <Text style ={[stylesCount.valueStyle,stylesCount.fontStyle]}>{this.state.discount}</Text>
                            </View>
                            <View style={{flex: 1, flexDirection:'row'}}>
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
            </SafeAreaView>
        )
    }
}

export default CheckOrder

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
        backgroundColor: 'transparent', 
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
    fontStyle: {
        fontSize : 15,
    },
    titleStyle:{
        flex: 1,
        flexDirection: 'column', 
        alignItems: 'flex-end'
    },
    valueStyle:{
        flex: 1
    }
})