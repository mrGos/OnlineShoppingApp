import React from 'react'
import {ScrollView, Text, View , StyleSheet, Image, Dimensions, FlatList,TouchableOpacity} from 'react-native'

import * as API from '../../../Api/CategoriesApi'


import sp1 from '../Home/TempImage/sp1.jpeg'
import sp2 from '../Home/TempImage/sp2.jpeg'
import sp3 from '../Home/TempImage/sp3.jpeg'
import sp4 from '../Home/TempImage/sp4.jpeg'
import sp5 from '../Home/TempImage/sp5.jpeg'

const {height, width} = Dimensions.get('window');

const imageWidth = (width - 40)/2-10;
const imageHeight = (361/((width - 40)/2))*114-10;

class Category extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            refreshing: false,
            data : [],
            error: null,
        }
    }



    renderItem = ({item}) =>{
        console.log(item);
        return(
            <TouchableOpacity
                onPress= {()=> {
                    this.props.navigation.navigate('CategoryDetail', {
                        item: item
                      });
                }}
            >
                <View style={stylesProductList.productContainer}>
                    <Text style = {stylesProductList.productName}> {item.Name}</Text>
                </View>
            </TouchableOpacity>
        );
    }

    loadData = () =>{
        console.log('loaddata Cateogory View');
        API.getAllCategory()
        .then((responseJS)=>{
            this.setState({
                data: responseJS,
                refreshing: false 
            })
        })
        console.log('Cateogory View state', this.state);
    }

    componentDidMount(){
        console.log('Cateogory View did mount');
        this.loadData();
    }

    render(){
        return(
            <ScrollView>
                <View style = {styles.wrapper}>
                    <View style = {styles.body}>
                        <FlatList
                            data = {this.state.data}
                            keyExtractor = {(item, index)=> index.toString()}
                            renderItem = {this.renderItem}
                            horizontal = {false}
                            numColumns = {2}
                        />
                    </View>
                </View>
            </ScrollView>
        );  
    }
}

export default Category

const styles = StyleSheet.create({
    wrapper :{
        flex: 2,
        marginTop:20,
        backgroundColor : 'rgb(233,233,238)',
    },
    body:{
        marginTop:10,
        flexDirection: 'row',
        justifyContent: 'space-around',
        flexWrap: 'wrap',
        flexGrow: 1,
        flexBasis: 0,
    },
})

const stylesProductList = StyleSheet.create({
    productContainer:{
        margin: 10,
        alignItems: 'center',
        borderRadius: 10,
        backgroundColor: 'red',
        height: 30,
        flexGrow: 1,
        flexBasis: 0,
        flex: 1,
    },
    productImage:{
        backgroundColor: 'red',
        height: imageHeight,
        width: imageWidth
    },
    productName:{
        alignItems: 'center',
        color : 'black',
        fontWeight: 'bold',
        fontSize: 20,
    },
})