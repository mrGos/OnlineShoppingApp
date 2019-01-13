import React, { Component } from 'react';
import { StyleSheet, Text, View, ImageBackground, Dimensions,Alert } from 'react-native';
import { Input, Button } from 'react-native-elements'
import global from '../../../Common/global'
// import { Font } from 'expo';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as API from '../../../Api/AuthApi'

import {auth} from '../../../Common/global'

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

const COLOR_TEXT = 'black'


class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fontLoaded: false,
      email: '',
      email_valid: true,
      password: '',
      login_failed: false,
      showLoading: false
    };
  }

  
  
  componentWillUpdate(nextProps, nextState) {
    console.log(nextState)
  }
  

  async componentDidMount() {
    this.setState({ fontLoaded: true });
  }

  validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  submitLoginCredentials() {
    console.log('here');

    const { showLoading } = this.state;
    this.login();
  }

  login = () => {
    console.log(global.auth)
    
    API.Login(this.state.email, this.state.password)
    .then((response)=>{
      if (response=='LoginFailed'){
          Alert.alert('Unsucess', 'Your account is incorrect');
      }
      else{
        console.log(response)
        global.displayName = response.UserName
        console.log(global)
        global.auth= true
        this.props.navigation.navigate('User')
      }
    })

    
       
  }

  render() {
    const { email, password, email_valid, showLoading } = this.state;

    return (
      <View style={styles.container}>
        { this.state.fontLoaded ?
          <View style={styles.loginView}>
            <View style={styles.loginTitle}>
              <View style={{flexDirection: 'row'}}>
                <Text style={styles.travelText}>LOGIN</Text>
              </View>
            </View>
            <View style={styles.loginInput}>
              <Input
                leftIcon={
                  <Icon
                    name='user-o'
                    color='rgba(171, 189, 219, 1)'
                    size={25}
                  />
                }
                containerStyle={{marginVertical: 10}}
                onChangeText={email => this.setState({email})} //email_valid: this.validateEmail(email)})}
                value={email}
                inputStyle={{marginLeft: 10, color: COLOR_TEXT, width: 250}}
                keyboardAppearance='light'
                placeholder='Email'
                autoFocus={false}
                autoCapitalize='none'
                autoCorrect={false}
                keyboardType='email-address'
                returnKeyType='next'
                ref={ input => this.emailInput = input }
                blurOnSubmit={false}
                placeholderTextColor={COLOR_TEXT}
                errorStyle={{textAlign: 'center', fontSize: 12}}
                errorMessage={email_valid ? null : 'Please enter a valid email address'}
              />
              <Input
                leftIcon={
                  <Icon
                    name='lock'
                    color='rgba(171, 189, 219, 1)'
                    size={25}
                  />
                }
                containerStyle={{marginVertical: 10}}
                onChangeText={(password) => this.setState({password})}
                value={password}
                inputStyle={{marginLeft: 10, color: COLOR_TEXT, width:250}}
                secureTextEntry={true}
                keyboardAppearance='light'
                placeholder='Password'
                autoCapitalize='none'
                autoCorrect={false}
                keyboardType='default'
                returnKeyType='done'
                ref={ input => this.passwordInput = input}
                blurOnSubmit={true}
                placeholderTextColor={COLOR_TEXT}
              />
            </View>
            <Button
              title='LOG IN'
              activeOpacity={1}
              underlayColor='transparent'
              onPress={this.submitLoginCredentials.bind(this)}
              loading={showLoading}
              loadingProps={{size: 'small', color: COLOR_TEXT}}
              disabled={ !email_valid || password.length < 1}
              buttonStyle={{height: 50, width: 250, backgroundColor: 'transparent', borderWidth: 2, borderColor: COLOR_TEXT, borderRadius: 30}}
              containerStyle={{marginVertical: 10}}
              titleStyle={{fontWeight: 'bold', color: COLOR_TEXT}}
            />
            <View style={styles.footerView}>
              <Text style={{color: 'grey'}}>
                New here?
              </Text>
              <Button
                title='Create an Account'
                clear
                activeOpacity={0.5}
                titleStyle={{color: COLOR_TEXT, fontSize: 15}}
                containerStyle={{marginTop: -10}}
                onPress={() => this.props.navigation.navigate('SignUp')}
              />
            </View>
          </View> :
          <Text>Loading...</Text>
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    backgroundColor: 'white',
    alignItems: 'center'
  },
  bgImage: {
    flex: 1,
    top: 0,
    left: 0,
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    justifyContent: 'center',
    alignItems: 'center'
  },
  loginView: {
    marginTop: 50,
    backgroundColor: 'transparent',
    width: 250,
    height: 400,
    //backgroundColor: 'green'
  },
  loginTitle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  travelText: {
    color: COLOR_TEXT,
    fontSize: 30,
    //fontFamily: 'bold'
  },
  plusText: {
    color: COLOR_TEXT,
    fontSize: 30,
    //fontFamily: 'regular'
  },
  loginInput: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerView: {
    marginTop: 20,
    flex: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
  }
});

export default Login