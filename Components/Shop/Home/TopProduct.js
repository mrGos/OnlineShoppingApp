import React from 'react'
import {Text, View , StyleSheet, Image, ActivityIndicator, Dimensions, FlatList, TouchableOpacity} from 'react-native'

import {getTopProduct} from '../../../Api/ProductApi/getProduct'


import sp1 from './TempImage/sp1.jpeg'
import sp2 from './TempImage/sp2.jpeg'
import sp3 from './TempImage/sp3.jpeg'
import sp4 from './TempImage/sp4.jpeg'

const {height, width} = Dimensions.get('window');

const imageWidth = (width - 40)/2-10;
const imageHeight = (361/((width - 40)/2))*114-10;

class TopProduct extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            refreshing: false,
            data : [],
            error: null,
        }
    }

    renderItem = ({item}) =>{
        return(
            <TouchableOpacity
                onPress= {()=> {
                    this.props.navigation.navigate('Details', {
                        item: item
                      });
                }}
            >
                <View style={stylesProductList.productContainer}>
                    <Image source={{uri:item.Image}} style = {stylesProductList.productImage}/>
                    <Text style = {stylesProductList.productName}> {item.Name}</Text>
                    <Text style = {stylesProductList.productPrice}> {item.price}</Text>
                </View>
            </TouchableOpacity>
        );
    }

    loadData(){
        
        console.log('loaddata')
        getTopProduct(4)
        .then((responseJS)=>{
            console.log(responseJS);
            this.setState({
                data: responseJS,
                refreshing: false 
            })
        })
    }

    componentWillMount(){
        console.log('topproduct mount');
        console.log('props ',this.props);
        console.log('state ',this.state);
    }
    
    componentDidMount(){
        this.loadData()
        console.log('topproduct did mount');
        console.log('props ',this.props);
        console.log('state ',this.state);
        
    }
    

    render(){
        return(
            <View style = {styles.wrapper}>
                <View style = {styles.textContainer} >
                    <Text style= {styles.textTopProduct}> Top Product </Text>
                </View>
                <View style = {styles.body}>
                    <FlatList
                        data = {this.state.data}
                        keyExtractor = {(item, index)=> index.toString()}
                        renderItem = {this.renderItem}
                        horizontal = {true}
                        //numColumns = {2}
                    />
                </View>
            </View>
        );  
    }
}

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
        flexDirection: 'column',
        //justifyContent: 'space-around',
        alignItems: 'stretch',//stretch,//baseline
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


const stylesProductList = StyleSheet.create({
    productContainer:{
        shadowColor: '#2E272B',
        shadowOffset : {
            width: 0,
            height: 3,
        },
        marginBottom: 10,
        shadowOpacity: 0.2,
        marginLeft: 10,
        marginRight: 10,
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

export default TopProduct