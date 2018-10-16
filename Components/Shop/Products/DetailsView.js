import React, {Component} from 'react';
import {Text, View,Image,StyleSheet,ScrollView} from 'react-native';
import { Card,Button } from 'react-native-elements'

const screen = require('Dimensions');
const window = screen.get('window');

export default class Products extends Component {
  

    render(){
      const { navigation } = this.props;
      const item = navigation.getParam('item', 'NO-ID');
      //console.log(item);
      
      return(
          <ScrollView style={styles.container} >
            <Card
            title={item.Name}>
              <Image source={{uri:item.Image}} style={styles.imgItem}/>
              <View style={{flex:1,justifyContent:'center', alignSelf:'center'}}>
                <Text>Giá: {item.Price}</Text>
                <Text>Bảo hành: {item.Warranty} tháng</Text>
                <Text>Mô tả: {item.Description}</Text>
              </View>
              <Button
                  title="THÊM VÀO GIỎ HÀNG"                    
                  titleStyle={{ fontWeight: "700" }}
                  buttonStyle={styles.btnStyle}
                  containerStyle={{ marginTop: 20 }}
                />

            </Card>
  
          </ScrollView>
      );
  }

}

const styles = StyleSheet.create({  
    container:{
    flex: 1,
    //backgroundColor:"#4FC3F7"
    backgroundColor:"white"
  },

  imgItem:{
    height:400,
    flex:9,
    resizeMode: "stretch" 
  },
  btnStyle:{
    //backgroundColor: "#2baf2b",
    backgroundColor: "black",
    height:80,
    borderColor: "transparent",
    borderWidth: 0,
    borderRadius: 5
  }
});