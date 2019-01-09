import React from 'react';
import {Text, View, StyleSheet, Dimensions, Image} from 'react-native';

import getHome from '../../../Api/HomeApi/homeAPI'
import Swiper from 'react-native-swiper'

import bannerImage from './TempImage/banner.jpg' 

const {height} = Dimensions.get('window');
const {width} = Dimensions.get('window');

const imageWidth = width - 40;
const imageHeight = (imageWidth/933 ) * 456 ;

class Collection extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            refreshing: false,
            data : [],
            error: null,
        }
    }

    loadData(){
        getHome()
        .then((responseJS)=>{
            console.log('SLIDES:...........')
            console.log(responseJS.Slides);
            this.setState({
                data: responseJS.Slides,
                refreshing: false 
            })
        })
    }

    componentDidMount(){
        this.loadData()
    }

    render(){
        return(
            <View style = {styles.wrapper}>   
                    <Swiper 
                        height = {200} 
                        loop={false}
                        loadMinimal = {false} 
                        style = {styles.body}
                        dot={<View style={{backgroundColor: 'rgba(0,0,0,.2)', width: 5, height: 5, borderRadius: 4, marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: 3}} />}
                        activeDot={<View style={{backgroundColor: '#000', width: 8, height: 8, borderRadius: 4, marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: 3}} />}
                        paginationStyle={{bottom: -1,}}
                    > 
                        {
                            this.state.data.map((item, i)=> {
                                return (
                                    <View 
                                        style ={{flex: 1}} 
                                        key = {i}                                        
                                    >
                                        <View style={styles.itemContainer}>
                                            <Image source={{uri:item.Image}}  style={styles.imgItem}/>                                                          
                                        </View>
                                    </View>
                                )
                            })
                        }
                    </Swiper>
            </View>
        );  
    }
}

export default Collection


const styles = StyleSheet.create({
    wrapper :{
        backgroundColor : 'rgb(233,233,238)',
        shadowOpacity: 0.2,
        borderRadius: 3
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
        flexDirection: 'column',
        alignItems: 'stretch',
        flexWrap: 'wrap',
        height : 250,
        shadowColor: '#2E272B',
        shadowOffset : {
            width: 0,
            height: 3,
        },
    },
    textLastedProduct: {
        fontSize: 20,
        color : 'black'
    },
    itemContainer:{
        marginBottom: 10,
        shadowOpacity: 0.2,        
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      },
      imgItem:{
        width: width-20,
        ///window.height/2,
        flex:9, 
        resizeMode: "stretch"
      },      
})