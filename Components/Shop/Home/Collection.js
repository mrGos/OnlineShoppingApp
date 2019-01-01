import React from 'react';
import {Text, View, StyleSheet, Dimensions, Image} from 'react-native';

import bannerImage from './TempImage/banner.jpg' 

const {height} = Dimensions.get('window');
const {width} = Dimensions.get('window');

const imageWidth = width - 40;
const imageHeight = (imageWidth/933 ) * 456 ;

class Collection extends React.Component{
    render(){
        return(
            <View style ={styles.wrapper}>
                <View style = {{flew :1, justifyContent :'center', paddingBottom:10 }} > 
                    <Text style = {styles.textCollection}> Spring Collection</Text>
                </View>
                <View style = {styles.body}>
                    <Image source={bannerImage} style = {styles.imageCollection} />
                </View>
            </View>
        );
    }
}

export default Collection


const styles = StyleSheet.create({
    wrapper :{
        margin: 10,
        marginTop: 20,
        marginBottom: 20,
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
    textCollection:{
        fontSize: 20,
        color : '#AFAFAF'
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
        marginBottom: 10,
    },
    imageCollection: {
        height : imageHeight,
        width : imageWidth
    }
})