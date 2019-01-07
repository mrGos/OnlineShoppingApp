import React from 'react'
import {SafeAreaView,Text, View , StyleSheet, Image, ActivityIndicator, Dimensions,RefreshControl,  FlatList, TouchableOpacity, Platform} from 'react-native'
import FAIcon from 'react-native-vector-icons/FontAwesome'

//import * as API from '../../../Api/CategoriesApi'
//import getAllProduct from '../../../Api/ProductApi/getAllProduct';
import getGategory from '../../../Api/CategoriesApi/getCategory'
import {pageSizeDefault} from '../../../Common/PaginationDefault';

const {height, width} = Dimensions.get('window');

const imageWidth = (width - 40)/2-10;
const imageHeight = (361/((width - 40)/2))*114-10;

class CategoryDetail extends React.PureComponent{
    constructor(props){
        super(props);
        const { navigation } = this.props; 
        this.state = {
            IDCategory: navigation.getParam('item').ID,
            refreshing: false,
            data : [],
            error: null,
            searchbarTxt:'',
            totalPage: 0,
            page: 1,
            totalPages: 0,
        }
    }

    componentWillMount(){
        console.log('category detail mount');
        console.log(this.props);
        console.log(this.state);
    }
    
    componentDidMount(){
        this.loadData()
        console.log('category detail did mount');
    }
    
    pageDown = () => {
        if (this.state.page>1){
            this.setState ({
                page: this.state.page -1 
            }, this.loadData)
        }
    }

    pageUp = () =>{
        if (this.state.page < this.state.totalPages){
            this.setState ({
                page: this.state.page +1 
            }, this.loadData)
        }
    }

    loadData = () => {
        console.log('loaddata')
       getGategory(this.state.IDCategory, this.state.page,pageSizeDefault())
        .then((responseJS)=>{
            console.log(responseJS);
            this.setState({
                data: responseJS.Items,
                totalPages : responseJS.TotalPages,
                refreshing: false 
            })
        })
        .catch(err=> console.log(err));
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
    
    render(){
        if(this.state.data.length==0){
            return(
            <View style={styles.nodatastyle}>
                <Text style={{fontSize:30}}>NO DATA</Text>
            </View>
            );
        }else{
            return(
                <SafeAreaView style= {{flex: 1}}>
                    <View style = {styles.wrapper}>
                        <View style = {styles.textContainer} >
                            <Text style= {styles.textTopProduct}> {this.props.navigation.getParam('item').Name} </Text>
                        </View>
                        <View style ={styles.page}>
                            <FAIcon
                                onPress = {this.pageDown}
                                name = 'chevron-left'
                                style = {{
                                    color: 'black',
                                    fontSize: 20
                                }}
                            />
                            <Text style = {{color: 'black', fontSize: 20}}>{this.state.page}</Text>
                            <FAIcon
                                onPress = {this.pageUp}
                                name = 'chevron-right'
                                style = {{
                                    color: 'black',
                                    fontSize: 20
                                }}
                            />
                        </View>
    
                        <View style = {styles.body}>
                            <FlatList
                            style={styles.listStyle}
                                refreshControl = {
                                    <RefreshControl 
                                        refreshing = {this.state.refreshing}
                                        onRefresh = {this.loadData.bind(this)}
                                    />
                                } 
                                data = {this.state.data}
                                keyExtractor = {(item, index)=> index.toString()}
                                renderItem = {this.renderItem}
                                horizontal = {false}
                                numColumns = {2}
                            />
                        </View>
                    </View>
                </SafeAreaView>
            );
        }
          
    }
}

const styles = StyleSheet.create({
    wrapper :{
        flex:1,
        margin: 10,
        backgroundColor : '#E9E9EE',
        marginBottom:70,
    },
    textContainer:{
        justifyContent :'center', 
        alignItems: 'center',
        paddingTop: Platform.OS === 'ios' ? 0 : 50,
        height : 40 + (Platform.OS === 'ios' ? 0 : 50),
        paddingBottom: 5,
    },
    page:{
        flexDirection: 'row',
        
        justifyContent: 'space-around',
        height: 25,
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
        color : 'black'
    },
    nodatastyle:{
        justifyContent:'center',
        flex:1,
        alignItems:'center',
    },
    listStyle:{
        marginTop:30
    }
})


const stylesProductList = StyleSheet.create({
    productContainer:{
        marginBottom: 10,
        shadowOpacity: 0.2,
        marginLeft: 10,
        marginRight: 10,
        alignItems: 'center'
    },
    productImage:{
        height: imageHeight,
        width: imageWidth
    },
    productName:{
        color : 'black',
    },
    productPrice:{

        color : 'black',
    }
})

export default CategoryDetail