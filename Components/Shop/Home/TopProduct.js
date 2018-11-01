import React from 'react'
import {Text, View , StyleSheet, Image, Dimensions} from 'react-native'

import sp1 from './TempImage/sp1.jpeg'
import sp2 from './TempImage/sp2.jpeg'
import sp3 from './TempImage/sp3.jpeg'
import sp4 from './TempImage/sp4.jpeg'

const {height, width} = Dimensions.get('window');

const imageWidth = (width - 40)/2-10;
const imageHeight = (361/((width - 40)/2))*114-10;

class TopProduct extends React.Component{
    render(){
        return(
            <View style = {styles.wrapper}>
                <View style = {styles.textContainer} >
                    <Text style= {styles.textTopProduct}> Top Product </Text>
                </View>
                <View style = {styles.body}>
                    <View style={styles.productContainer}>
                        <Image source={sp1} style = {styles.productImage}/>
                        <Text style = {styles.productName}> Product name</Text>
                        <Text style = {styles.productPrice}> Product price</Text>
                    </View>
                    <View style={styles.productContainer}>
                        <Image source={sp2} style = {styles.productImage}/>
                        <Text style = {styles.productName}> Product name</Text>
                        <Text style = {styles.productPrice}> Product price</Text>
                    </View>
                    <View style={styles.productContainer}>
                        <Image source={sp3} style = {styles.productImage}/>
                        <Text style = {styles.productName}> Product name</Text>
                        <Text style = {styles.productPrice}> Product price</Text>
                    </View>
                    <View style={styles.productContainer}>
                        <Image source={sp4} style = {styles.productImage}/>
                        <Text style = {styles.productName}> Product name</Text>
                        <Text style = {styles.productPrice}> Product price</Text>
                    </View>
                </View>
            </View>
        );  
    }
}

export default TopProduct

const styles = StyleSheet.create({
    wrapper :{
        margin: 10,
        backgroundColor : '#FFF',
        shadowOpacity: 0.2,
    },
    textContainer:{
        justifyContent :'center', 
        shadowColor: '#2E272B',
        shadowOffset : {
            width: 0,
            height: 3,
        },
        height : 40,
        paddingBottom: 5
    },
    body:{
        flexDirection: 'row',
        justifyContent: 'space-around',
        flexWrap: 'wrap',
        shadowColor: '#2E272B',
        shadowOffset : {
            width: 0,
            height: 3,
        },
    },
    textTopProduct: {
        fontSize: 20,
        color : '#AFAFAF'
    },
    productContainer:{
        shadowColor: '#2E272B',
        shadowOffset : {
            width: 0,
            height: 3,
        },
        marginBottom: 10,
        shadowOpacity: 0.2,
    },
    productImage:{
        height: imageHeight,
        width: imageWidth
    },
    productName:{
        color : '#A3A30A',
    },
    productPrice:{

        color : '#D3D3CF',
    }
})
