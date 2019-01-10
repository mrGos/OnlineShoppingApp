import React, { Component } from 'react';
import { StyleSheet, Text, View, ImageBackground, Dimensions, Alert } from 'react-native';
import { Input, Button } from 'react-native-elements'

// import { Font } from 'expo';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as API from '../../../Api/AuthApi'


const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

const COLOR_TEXT = 'black'


class SignUp extends Component {
    constructor(props) {
        super(props);

        this.state = {
        fontLoaded: false,
        userName: '',
        email: '',
        email_valid: true,
        password_valid: true,
        password: '',
        rePassword: '',
        login_failed: false,
        showLoading: false
        };
    }

    async componentDidMount() {
        this.setState({ fontLoaded: true });
    }

    componentWillUpdate(){
        console.log(this.state)
    }

    validateEmail(email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }

    validatePassword(password){
        if (password.length<8)
            return false
        if (this.state.password.length<8)
            return false
        // const a = password.normalize()
        // const b = this.state.password.normalize()
        // return a===b;
        return password==this.state.password;
    }

    submitLoginCredentials() {
        const { showLoading } = this.state;
        console.log(this.state)
        this.setState({
        showLoading: !showLoading
        });
        this.signUp();
    }

    signUp = () => {
        const data = {
            'username': this.state.userName,
            'email': this.state.email,
            'password': this.state.password
        }
        API.SignUp(this.state.userName, this.state.email, this.state.password)
        .then((response)=>{
            if (response==='exited'){
                Alert.alert('Annoucement', 'Account Exited');
                return 
            }
            else{
                console.log(response)
                global.username = response.UserName
                console.log(global)
                global.auth= true
                Alert.alert('Success', 'sign up successful')
                this.props.navigation.navigate('User')
            }
        })
    }

    render() {
        const { userName, email, password, rePassword, email_valid, password_valid, showLoading } = this.state;

        return  (
            <View style={styles.container}>
                { this.state.fontLoaded ?
                <View style={styles.loginView}>
                    <View style={styles.loginTitle}>
                        <View style={{flexDirection: 'row'}}>
                            <Text style={styles.travelText}>SIGN UP</Text>
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
                            onChangeText={userName => this.setState({userName})}
                            value={userName}
                            inputStyle={{marginLeft: 10, color: COLOR_TEXT, width: 250}}
                            keyboardAppearance='light'
                            placeholder='User name'
                            autoFocus={false}
                            autoCapitalize='none'
                            autoCorrect={false}
                            keyboardType = 'default'
                            returnKeyType='next'
                            ref={ input => this.userName = input }
                            blurOnSubmit={false}
                            placeholderTextColor={COLOR_TEXT}
                        />
                        <Input
                            leftIcon={
                            <Icon
                                name='user-o'
                                color='rgba(171, 189, 219, 1)'
                                size={25}
                            />
                            }
                            containerStyle={{marginVertical: 10}}
                            onChangeText={email => this.setState({email, email_valid: this.validateEmail(email)})}
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
                            onChangeText={(password) => this.setState({password, password_valid: this.validatePassword(rePassword)})}
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
                        title='SIGN UP'
                        activeOpacity={1}
                        underlayColor='transparent'
                        onPress={this.submitLoginCredentials.bind(this)}
                        loading={showLoading}
                        loadingProps={{size: 'small', color: COLOR_TEXT}}
                        //disabled={ !email_valid || !password_valid|| password.length < 8}
                        buttonStyle={{height: 50, width: 250, backgroundColor: 'transparent', borderWidth: 2, borderColor: COLOR_TEXT, borderRadius: 30}}
                        containerStyle={{marginVertical: 10}}
                        titleStyle={{fontWeight: 'bold', color: COLOR_TEXT}}
                    />
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
        height: 500,
    },
    loginTitle: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    travelText: {
        color: COLOR_TEXT,
        fontSize: 30,
    },
    plusText: {
        color: COLOR_TEXT,
        fontSize: 30,
    },
    loginInput: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: 300,
        paddingBottom: 20,
    },
    footerView: {
        marginTop: 20,
        flex: 0.5,
        justifyContent: 'center',
        alignItems: 'center',
    }
});

export default SignUp