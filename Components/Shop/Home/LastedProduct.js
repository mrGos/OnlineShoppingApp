import React from 'react'
import {Text, View , StyleSheet, Image, ActivityIndicator, Dimensions, FlatList, TouchableOpacity} from 'react-native'

import {getLasted} from '../../../Api/HomeApi'

import Swiper from 'react-native-swiper'

import sp1 from './TempImage/sp1.jpeg'
import sp2 from './TempImage/sp2.jpeg'
import sp3 from './TempImage/sp3.jpeg'
import sp4 from './TempImage/sp4.jpeg'

const {height, width} = Dimensions.get('window');

const imageWidth = (width - 40)/2-10;
const imageHeight = (361/((width - 40)/2))*114-10;

class LastedProduct extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            refreshing: false,
            data : [],
            error: null,
            dataTest : [
                {
                    Image: '/TempImage/sp1.jpeg',
                    Name: 'test1',
                    Price: '1'
                },
                {
                    Image: '/TempImage/sp1.jpeg',
                    Name: 'test2',
                    Price: '2'
                },
                
            ]
        }
    }

    loadData(){
        
        console.log('loaddata')
        getLasted(2)
        .then((responseJS)=>{
            //console.log(responseJS);
            this.setState({
                data: responseJS,
                refreshing: false 
            })
        })
    }

    componentWillMount(){
        //console.log('topproduct mount');
        //console.log('props ',this.props);
        //console.log('state ',this.state);
    }
    
    componentDidMount(){
        this.loadData()
        //console.log('topproduct did mount');
        //console.log('props ',this.props);
        //console.log('state ',this.state);
        
    }

    componentDidUpdate(prevProps, prevState){
        //console.log(this.props, this.state)
    }
    

    render(){
        return(
            <View style = {styles.wrapper}>
                <View style = {styles.textContainer} >
                    <Text style= {styles.textLastedProduct}> Lasted Product </Text>
                </View>
                    <Swiper 
                        height = {400} 
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
                                    <TouchableOpacity 
                                        style ={{flex: 1}} 
                                        key = {i}
                                        onPress= {()=> {
                                            this.props.navigation.navigate('Details', {
                                                item: item
                                              });
                                        }}
                                    >
                                        <View style={styles.itemContainer}>
                                            <Image source={{uri:item.Image}} style={styles.imgItem}/> 
                                            <Text style={{flex:1}}>{item.Name}</Text> 
                                            <Text style={{flex:1}}>Giá: {item.Price}</Text>                
                                        </View>
                                    </TouchableOpacity>
                                )
                            })
                        }
                    </Swiper>
            </View>
        );  
    }
}

const styles = StyleSheet.create({
    wrapper :{
        margin: 10,
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
        height : 350,
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
        marginLeft: 20,
        marginRight: 20,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      },
      imgItem:{
        width: 300,///window.width/2-20,
        height:300,///window.height/2,
        flex:9, 
        resizeMode: "stretch"
      },
})



export default LastedProduct