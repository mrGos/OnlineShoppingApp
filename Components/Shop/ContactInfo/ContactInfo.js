
import call from 'react-native-phone-call'
import React, {Component} from 'react';
import {Linking, Alert, AppRegistry,Platform, StyleSheet, Text, View,Dimensions} from 'react-native';
import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Button,Header } from 'react-native-elements';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});


const args = {
  number: '16520570', // String value with the number to call
  prompt: false // Optional boolean property. Determines if the user should be prompt prior to the call 
}

const {width} = Dimensions.get('window')
const screen = require('Dimensions');
const window = screen.get('window');


export default class App extends Component {

  

  constructor(props){
    super(props);
    this.state={
      region:{
        latitude: 10.870555,
        longitude: 106.802781,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
      }
    }
  }


  render() {
    return (
      <View style={{flex:1,backgroundColor:'#E9E9EF'}} >
          <Header         
                        placement="left"  
                        centerComponent={{ text: 'Contact Us', style: { color: '#fff' } }}
                        backgroundColor='black'
                    />

          <View
            style={{
              borderBottomColor: 'white',
              borderBottomWidth: 5,
              borderWidth:1,
              marginBottom:10
            }}
          />

          <MapView
            style={{flex:0.9}}
            region={this.state.region}
          >
            <MapView.Marker title={'This Is Our Shop'} coordinate = {this.state.region}/>
          </MapView>
          <View style={styles.instructions} >

          <View
            style={{
              borderBottomColor: 'black',
              borderBottomWidth: 10,
            }}
          />

          <Button
 
          icon={{name: 'home', size: 32}}

          buttonStyle={{backgroundColor: '#ff4f00', borderRadius: 0,width: width, flexWrap: 'wrap'}}

          textStyle={{textAlign: 'right'}}
          onPress={() =>Linking.openURL('https://www.google.com/maps/place/Tr%C6%B0%E1%BB%9Dng+%C4%90%E1%BA%A1i+h%E1%BB%8Dc+C%C3%B4ng+ngh%E1%BB%87+Th%C3%B4ng+tin+%C4%90HQG-HCM/@10.8686102,106.7979616,17z/data=!4m13!1m7!3m6!1s0x31752766e791a68d:0xe4f6a1ac07ae6952!2zNTEgxJDGsOG7nW5nIHPhu5EgMTgsIFBoxrDhu51uZyBMaW5oIFRydW5nLCBUaOG7pyDEkOG7qWMsIEjhu5MgQ2jDrSBNaW5oLCBWaeG7h3QgTmFt!3b1!8m2!3d10.8644167!4d106.7906767!3m4!1s0x317527587e9ad5bf:0xafa66f9c8be3c91!8m2!3d10.8702111!4d106.8028928')}
          title={`Quarter 6, Linh Trung ward, Thu Duc district`}
        />
   
          <View
            style={{
              borderBottomColor: 'black',
              borderBottomWidth: 1,
            }}
          />

          <Button

          icon={{name: 'phone', size: 32}}

          buttonStyle={{backgroundColor: '#ff4f00', borderRadius: 0,width: width, flexWrap: 'wrap'}}

          textStyle={{textAlign: 'right'}}
          onPress={() => {
                        call(args).catch(console.error);
                    }}
          title={`016520570`}
          />

          <View
            style={{
              borderBottomColor: 'black',
              borderBottomWidth: 1,
            }}
          />

          <Button
    
          icon={{name: 'mail', size: 32}}

          buttonStyle={{backgroundColor: '#ff4f00', borderRadius: 0,width: width, flexWrap: 'wrap'}}

          textStyle={{textAlign: 'right'}}
          onPress={() => Linking.openURL('mailto:16520570@gm.uit.edu.vn')}
          title={`16520570@gm.uit.edu.vn`}
        />


          </View>
      </View>
        
              
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'left',
    color: '#333333',
    marginLeft:0,
    marginBottom: 0,
  },
  bottomView:{
    width: '100%', 
    height: 70, 
    backgroundColor: '#FF9800', 
    justifyContent: 'center', 
    alignItems: 'center',
    position: 'absolute',
    bottom: 0
  },
  buttonStyle:{
    backgroundColor: "#ff4f00",
    width:window.width-10,
    height:60,
    justifyContent:"center",
    marginLeft:5,
    borderColor: "transparent",
    borderWidth: 0,
    borderRadius: 5
  }
});





