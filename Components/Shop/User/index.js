
import React, { Component } from 'react';
import {
  StyleSheet, Text, View, Image, ScrollView, Dimensions, TouchableOpacity, StatusBar, SafeAreaView, Alert
} from 'react-native';
import { Button } from 'react-native-elements'

import global from '../../../Common/global'
import Home from './../Home/HomeView'

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

const COLOR_TEXT = 'black'
const COLOR_THEME = '#F5F5F5'/*'rgba(47,44,60,1)'*/



const IMAGE_SIZE = SCREEN_WIDTH - 80;


class User extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fontLoaded: false,
      ModalSwipeToClose: true,
      username: global.displayName
    };
  }


  componentWillMount(){
    console.log('user will mount');
    console.log(this.props);
  }
  componentDidMount() {
    this.setState({ fontLoaded: true });
  }

  logout = () => {
    global.auth= false
    global.displayName = ''
    this.props.navigation.navigate('Login')
  }

  gotoWishList= ()=>{
    this.props.navigation.navigate('WishList')
  }

  render() {
    return (
      <View style={{flex: 1, backgroundColor: COLOR_THEME}}>
        <StatusBar
          barStyle="light-content"
        />
        { this.state.fontLoaded ?
          <SafeAreaView style = {{flex: 1}}>
            <View style={{flex: 1, backgroundColor: COLOR_THEME}}>
              <ScrollView style={{flex: 1}}>
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                  <Image
                    source={{ uri: 'https://static.pexels.com/photos/428336/pexels-photo-428336.jpeg' }}
                    style={{ width: IMAGE_SIZE, height: IMAGE_SIZE, borderRadius: 10}}
                  />
                </View>
                <View style={{flex: 1, marginTop: 20, justifyContent: 'center', alignItems: 'center'}}>
                  <Text style={{flex: 1, fontSize: 26, color: COLOR_TEXT}}>
                    {this.state.username}
                  </Text>
                </View>
                <Button
                  containerStyle={{ marginVertical: 20 }}
                  style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
                  buttonStyle={{height: 50, width: 250, backgroundColor: 'transparent', borderWidth: 2, borderColor: COLOR_TEXT, borderRadius: 30}}
                  title="Your WishList"
                  titleStyle={{ fontSize: 20, color: COLOR_TEXT, textAlign: 'center' }}
                  onPress={() => this.gotoWishList()}
                  activeOpacity={0.5}
                />
                <Button
                  containerStyle={{ marginVertical: 20 }}
                  style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
                  buttonStyle={{height: 50, width: 250, backgroundColor: 'transparent', borderWidth: 2, borderColor: COLOR_TEXT, borderRadius: 30}}
                  title="Logout"
                  titleStyle={{ fontSize: 20, color: COLOR_TEXT, textAlign: 'center' }}
                  onPress={() => this.logout()}
                  activeOpacity={0.5}
                />
              </ScrollView>
            </View> 
          </SafeAreaView>:
          <Text>Loading...</Text>
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  navBar: {
    height: 60,
    justifyContent: 'center',
    alignContent: 'center'
  },
  nameHeader: {
    color: COLOR_TEXT,
    fontSize: 22,
    textAlign: 'center'
  },
  infoTypeLabel: {
    fontSize: 15,
    textAlign: 'right',
    color: 'rgba(126,123,138,1)',
    //fontFamily: 'regular',
    paddingBottom: 10,
  },
  infoAnswerLabel: {
    fontSize: 15,
    color: COLOR_TEXT,
    //fontFamily: 'regular',
    paddingBottom: 10,
  }
});


const stylesCount = StyleSheet.create({
  row: {
      flex: 1, 
      flexDirection:'row',
  },
  fontStyle: {
      fontSize : 15,
  },
  titleStyle:{
      flex: 1,
      flexDirection: 'column', 
      alignItems: 'flex-end',
      marginRight: 5,
  },
  valueStyle:{
      flex: 1,
  }
})
export default User