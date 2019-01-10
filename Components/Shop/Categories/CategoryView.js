// import React from 'react'
// import {SafeAreaView,ScrollView, Text, View , StyleSheet, Image, Dimensions, FlatList,TouchableOpacity} from 'react-native'

// import * as API from '../../../Api/CategoriesApi'


// import sp1 from '../Home/TempImage/sp1.jpeg'
// import sp2 from '../Home/TempImage/sp2.jpeg'
// import sp3 from '../Home/TempImage/sp3.jpeg'
// import sp4 from '../Home/TempImage/sp4.jpeg'
// import sp5 from '../Home/TempImage/sp5.jpeg'

// const {height, width} = Dimensions.get('window');

// const imageWidth = (width - 40)/2-10;
// const imageHeight = (361/((width - 40)/2))*114-10;

// class Category extends React.Component {
//     constructor(props){
//         super(props);
//         this.state = {
//             refreshing: false,
//             data : [],
//             error: null,
//         }
//     }



//     renderItem = ({item}) =>{
//         console.log(item);
//         return(
//             <TouchableOpacity
//                 onPress= {()=> {
//                     this.props.navigation.navigate('CategoryDetail', {
//                         item: item
//                       });
//                 }}
//             >
//                 <View style={stylesProductList.productContainer}>
//                     <Text style = {stylesProductList.productName}> {item.Name}</Text>
//                 </View>
//             </TouchableOpacity>
//         );
//     }

//     loadData = () =>{
//         console.log('loaddata Cateogory View');
//         API.getAllCategory()
//         .then((responseJS)=>{
//             this.setState({
//                 data: responseJS,
//                 refreshing: false 
//             })
//         })
//         console.log('Cateogory View state', this.state);
//     }

//     componentDidMount(){
//         console.log('Cateogory View did mount');
//         this.loadData();
//     }

//     render(){
//         return(
//             <SafeAreaView style ={{flex: 1}}>
//                 <ScrollView>
//                     <View style = {styles.wrapper}>
//                         <View style = {styles.body}>
//                             <FlatList
//                                 data = {this.state.data}
//                                 keyExtractor = {(item, index)=> index.toString()}
//                                 renderItem = {this.renderItem}
//                                 horizontal = {false}
//                                 numColumns = {1}
//                             />
//                         </View>
//                     </View>
//                 </ScrollView>
//             </SafeAreaView>
//         );  
//     }
// }

// export default Category

// const styles = StyleSheet.create({
//     wrapper :{
//         flex: 2,
//         marginTop:20,
//         backgroundColor : 'rgb(233,233,238)',
//     },
//     body:{
//         marginTop:10,
//         flexDirection: 'row',
//         justifyContent: 'space-around',
//         flexWrap: 'wrap',
//         flexGrow: 1,
//         flexBasis: 0,
//     },
// })

// const stylesProductList = StyleSheet.create({
//     productContainer:{
//         margin: 10,
//         alignItems: 'center',
//         borderRadius: 10,
//         //backgroundColor: 'red',
//         height: 40,
//         flexGrow: 1,
//         flexBasis: 0,
//         flex: 1,
//         shadowColor: '#2E272B',
//         shadowOffset : {
//             width: 0,
//             height: 3,
//         },
        
//     },
//     productImage:{
//         backgroundColor: 'red',
//         height: imageHeight,
//         width: imageWidth
//     },
//     productName:{
//         alignItems: 'center',
//         color : 'black',
//         fontWeight: 'bold',
//         fontSize: 20,
//     },
// })

import React from 'react'
import {SafeAreaView,ScrollView, Text, View , StyleSheet, Image, Dimensions, FlatList,TouchableOpacity} from 'react-native'

import * as API from '../../../Api/CategoriesApi'
import getCategories from '../../../Api/CategoriesApi/getAsyncStorageCategories'
import saveCategories from '../../../Api/CategoriesApi/saveCategories'

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
            categories:[]
        }        
        
    }

    onPressCategory (item){
        const isExist = this.state.categories.some(e => e.ID === item.ID);
        console.log('prepare passing Category: '+item.Name);
        if(!isExist){
            this.setState({
                categories:this.state.categories.concat(item)            
            },
            async ()=>{
                saveCategories(this.state.categories)
               await this.props.navigation.navigate('Products',{
                    //CategoryItem:item
                }); 
            }
            )
        }else{
            this.props.navigation.navigate('Products',{
                //CategoryItem:item
            }); 
        }                      
    }
    renderItem = ({item}) =>{
        //console.log(item.Name);
        return(
            <TouchableOpacity
                onPress= {()=> {
                    this.props.navigation.navigate('CategoryDetail', {
                        item: item
                      });
                }}
               
                //onPress ={()=>this.onPressCategory(item)}
            >
                <View style={stylesProductList.productContainer}>
                    <Text style = {stylesProductList.productName}> {item.Name}</Text>
                </View>
                <Image
                    source={{uri:item.Image}} style={styles.imgItem}
                />
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

    // renderItem({ item, index }) {
    //     console.log(item);
    //     if (item.empty){
    //         return (
    //             <View style={[styles.listItem, styles.listItemEmpty]} />
    //         )
    //     }
    //     console.log('here');
    //     return (
    //         <TouchableOpacity 
    //             style ={styles.listItem}
    //             onPress= {()=> {
    //                 this.props.navigation.navigate('CategoryDetail', {
    //                     item: item
    //                     });
    //             }}
    //         >
    //             <Image
    //                source={{uri:item.Image}}
    //                 imageStyle = {{
    //                     resizeMode: 'cover',
    //                 }}
    //                 style = {{
    //                     // flex: 1,
    //                     // alignSelf: 'stretch',
    //                     // borderRadius: 10,
    //                     // height : 100,
    //                     // alignItems: 'center',
    //                     // justifyContent : 'center',
    //                     // backgroundColor: 'blue'
    //                     width:200,
    //                     height:200
                        
    //                 }}
    //             >
    //                 {/* <Text size = 'large' bold = {true} > {item.Name}</Text> */}
    //             </Image>
    //         </TouchableOpacity>
    //     )
    // }

    createRow = (data, column) => {
        const rows = Math.floor(data.length/ column);
        let lastRowElements = data.length - rows * column;

        while (lastRowElements !== column) {
            data.push({
                id: `empty-${lastRowElements}`,
                name: `empty-${lastRowElements}`,
                empty: true,
            });
            lastRowElements += 1;
        }

        return data;
    }

    render(){
        return(
            <SafeAreaView style ={{flex: 1}}>
                <ScrollView>
                    <View style = {styles.wrapper}>
                        <View style = {styles.body}>
                            <FlatList
                                data = {this.state.data}
                                keyExtractor = {(item, index)=> index.toString()}
                                renderItem = {this.renderItem}
                                horizontal = {false}
                                numColumns = {1}
                            />
                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView>
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
    listItem:{
        flex: 1,
        backgroundColor: "#dcda48",
        flexGrow: 1,
        margin: 7,
        height: 100,
        flexBasis: 0
    },
})

const stylesProductList = StyleSheet.create({
    productContainer:{
        margin: 10,
        alignItems: 'center',
        borderRadius: 10,
        //backgroundColor: 'red',
        height: 40,
        flexGrow: 1,
        flexBasis: 0,
        flex: 1,
        shadowColor: '#2E272B',
        shadowOffset : {
            width: 0,
            height: 3,
        },
        
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
    imgItem:{
        width:100,
        height:200
    }
})