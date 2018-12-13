import React, { Component } from 'react'
import {TextInput, FlatList, StyleSheet, View, Button,SafeAreaView, TouchableOpacity, Text} from 'react-native'
class CheckOrder extends Component{
    constructor(props){
        super(props);
        this.state={
            name: null,
            phoneNumber: null,
            destination: null,
        }
    }
    renderItem = () => {

    }

    sendData = () =>{

    }
    render(){
        return (
            <SafeAreaView>
                <View style = {styles.container}>
                    <View sytle = {styles.input}>
                        <TextInput style = {styles.textInput} placeholder = 'name'/>
                        <TextInput style = {styles.textInput} placeholder = 'phoneNumber'/>
                        <TextInput style = {styles.textInput} placeholder = 'Address'/>
                        <FlatList
                            data = {this.props.data = []}
                            keyExtractor = {(item, index)=> index.toString()}
                            renderItem = {this.renderItem}
                        />
                    </View>
                    <View style ={{justifyContent: 'flex-start', alignItems: 'center'}}>
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
        flex :1,
        margin: 10,
        backgroundColor: 'blue'
    },
    input: {
        flex :1, 
        backgroundColor: 'blue'
    },
    textInput:{
        fontSize: 20,
        height: 25,
        margin: 5,
        backgroundColor: 'yellow'
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

    }
})